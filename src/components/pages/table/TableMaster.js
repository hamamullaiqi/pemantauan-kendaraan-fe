import React, { Fragment, useMemo, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import { IoMdAdd, IoMdRefresh } from "react-icons/io";
import MainCard from "../../MainCard";
import useSWR from "swr";
import fetcher from "../../../helper/fetcher";
import dayjs from "dayjs";
import {
    Button,
    Typography,
    DatePicker,
    Space,
    Tag,
    Table,
    Pagination,
    Input,
    Modal,
    Form,
    Divider,
} from "antd";
import { useDispatch } from "react-redux";
import { PatchAPI, PostAPI } from "../../../redux";
import { DestroyAPI } from "../../../redux/reducer/apiHandling";

const { Search } = Input;
const PAGE = 1;
const PERPAGE = 10;

const CreateForm = ({
    isModalOpen,
    handleOk,
    handleCancel,
    title,
    onFinish,
    form,
    state,
    edited,
}) => {
    return (
        <Modal
            title={
                <Fragment>
                    <Typography style={{ fontSize: "1.4rem" }}>{`${
                        !!edited ? "Edit" : "Add"
                    } ${title}`}</Typography>
                    <Divider />
                </Fragment>
            }
            width={"50%"}
            style={{ top: 40 }}
            open={isModalOpen}
            // onOk={onFinish}
            // okButtonProps={{ disabled: typeof onFinish !== "function" }}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                name="basic"
                // style={{ maxWidth: 600 }}
                layout="vertical"
                initialValues={typeof state === "object" ? state : {}}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {!!form ? (
                    form({ state, edited })
                ) : (
                    <Typography>Empty</Typography>
                )}
                {!!form && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 8,
                            marginTop: 56,
                        }}
                    >
                        <Button type="default" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={typeof onFinish !== "function"}
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </div>
                )}
            </Form>
        </Modal>
    );
};

export default function TableMaster({
    url,
    columns,
    renderCreate,
    title,
    editable,
    deletable,
}) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(PAGE);
    const [perPage, setPerPage] = useState(PERPAGE);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({});
    const [refresh, setRefresh] = useState(dayjs().unix());

    const [openCreate, setOpenCreate] = useState(false);
    const [editData, setEditData] = useState(null);

    const formatedEditData = useMemo(() => {
        return !!editData ? editData : renderCreate?.state;
    }, [renderCreate?.state, editData]);

    const uri = useMemo(() => {
        return `${url}?page=${page}&perPage=${perPage}&search=${search}&filters=${
            Object.keys(filters).length !== 0 ? JSON.stringify(filters) : ""
        }&timestamp=${refresh}`;
    }, [page, perPage, search, filters, refresh, url]);

    const { data: datas, loading } = useSWR(uri, fetcher, {
        revalidateOnFocus: false,
    }) || { datas: [] };

    console.log(datas, loading);

    const onSearch = (val) => {
        setSearch(val);
    };

    const handleDelete = async (url, id) => {
        if (!url) throw Error("invalid url delete");
        if (!id) throw Error("invalid url key");
        const resp = await dispatch(
            DestroyAPI({
                url: `${url}/${id}`,
            })
        );
        if (resp?.payload?.status === "success") {
            setRefresh(dayjs().unix());
        }
    };

    const newColumns = useMemo(() => {
        const action = [
            {
                title: "Action",
                key: "action",
                render: (_, record) => (
                    <Space size="middle">
                        {!!editable?.url && (
                            <Button
                                onClick={() => {
                                    setEditData(record);
                                    setOpenCreate(!openCreate);
                                }}
                                type="default"
                            >
                                Edit
                            </Button>
                        )}
                        {!!deletable && (
                            <Button
                                type="primary"
                                onClick={() =>
                                    handleDelete(deletable?.url, record?.id)
                                }
                            >
                                Delete
                            </Button>
                        )}
                    </Space>
                ),
            },
        ];
        return !!editable || !!deletable ? [...columns, ...action] : columns;
    }, [columns]);

    const handleCreate = async ({ value, onSubmit, url, config, editUrl }) => {
        if (!url) throw Error("invalid url");
        let newValue = typeof onSubmit === "function" ? onSubmit(value) : value;
        const resp =
            !!editData && !!editUrl
                ? await dispatch(
                      PatchAPI({
                          url: `${editUrl}/${formatedEditData?.id}`,
                          data: newValue,
                          config: config,
                      })
                  )
                : await dispatch(
                      PostAPI({ url: url, data: newValue, config: config })
                  );
        if (resp?.payload?.status === "success") {
            setOpenCreate(!openCreate);
            setRefresh(dayjs().unix());
        }
    };

    if (!!editable && !renderCreate?.form) {
        console.warn("if edited content you mush add renderCreate.form props");
    }

    return (
        <div>
            <div
                id="title"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                }}
            >
                <div id="left">
                    <Typography.Title
                        level={3}
                        style={{ fontWeight: "bold", marginBottom: 0 }}
                    >
                        {title || ""}
                    </Typography.Title>
                    {/* <Typography.Text style={{ color: "rgb(153, 161, 183)" }}>
                        Home
                    </Typography.Text> */}
                </div>
                <div id="right" style={{ display: "flex", gap: 8 }}>
                    <Button icon={<HiOutlineFilter size={14} />}>Filter</Button>
                    {!!renderCreate && (
                        <Button
                            type="primary"
                            icon={<IoMdAdd size={14} />}
                            onClick={() => {
                                !!renderCreate.onClick &&
                                typeof renderCreate.onClick === "function"
                                    ? renderCreate.onClick()
                                    : setOpenCreate(!openCreate);
                                setEditData(null);
                            }}
                        >
                            Create
                        </Button>
                    )}
                </div>
            </div>

            <MainCard>
                <div>
                    <div
                        id="head"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div></div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <Search
                                placeholder="search.."
                                onSearch={onSearch}
                                enterButton
                                style={{ width: 240 }}
                                allowClear
                            />
                            <Button
                                icon={
                                    <IoMdRefresh
                                        size={14}
                                        onClick={() =>
                                            setRefresh(dayjs().unix())
                                        }
                                    />
                                }
                            />
                        </div>
                    </div>
                    <Table
                        className="table-in-page"
                        style={{
                            minHeight: `calc(100vh - 300px)`,
                            marginTop: 16,
                        }}
                        columns={newColumns}
                        dataSource={datas?.data?.rows}
                        scroll={{ y: `calc(100vh - 354px)` }}
                        pagination={false}
                    />
                    {!!datas && (
                        <div style={{ textAlign: "right" }}>
                            <Pagination
                                total={datas?.data?.count || 0}
                                current={datas?.data?.page || page}
                                pageSize={datas?.data?.perPage || perPage}
                                showSizeChanger
                                onChange={(pg, perPg) => {
                                    console.log(perPg);
                                    if (pg) {
                                        setPage(pg);
                                    }
                                    if (perPage) {
                                        setPerPage(perPg);
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>
            </MainCard>
            {!!openCreate && (
                <CreateForm
                    isModalOpen={openCreate}
                    handleCancel={() => setOpenCreate(!openCreate)}
                    handleOk={() => setOpenCreate(!openCreate)}
                    title={title}
                    form={renderCreate?.form}
                    onFinish={(value) =>
                        handleCreate({
                            value: value,
                            onSubmit: renderCreate.onSubmit,
                            url: renderCreate.url,
                            editUrl: editable.url,
                        })
                    }
                    state={formatedEditData}
                    edited={!!editData}
                />
            )}
        </div>
    );
}

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
import { PostAPI } from "../../../redux";

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
}) => {
    return (
        <Modal
            title={
                <Fragment>
                    <Typography
                        style={{ fontSize: "1.4rem" }}
                    >{`Add ${title}`}</Typography>
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
                {!!form ? form : <Typography>Empty</Typography>}
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

export default function TableMaster({ url, columns, renderCreate, title }) {
    const dispatch = useDispatch();
    const [page, setPage] = useState(PAGE);
    const [perPage, setPerPage] = useState(PERPAGE);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({});
    const [refresh, setRefresh] = useState(dayjs().unix());

    const [openCreate, setOpenCreate] = useState(false);

    const uri = useMemo(() => {
        return `${url}?page=${page}&perPage=${perPage}&search=${search}&filters=${
            Object.keys(filters).length !== 0 ? JSON.stringify(filters) : ""
        }&timestamp=${refresh}`;
    }, [page, perPage, search, filters, refresh, url]);

    const { data: datas, loading } = useSWR(uri, fetcher, {
        revalidateOnFocus: false,
    }) || { datas: [] };

    const onSearch = (val) => {
        setSearch(val);
    };

    const handleCreate = (value, onSubmit, url, config) => {
        if (!url) throw Error("invalid url");
        let newValue = typeof onSubmit === "function" ? onSubmit(value) : value;
        dispatch(PostAPI({ url: url, data: newValue, config: config }));
        setOpenCreate(!openCreate);
        setRefresh(dayjs().unix());
    };

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
                            onClick={() =>
                                !!renderCreate.onClick &&
                                typeof renderCreate.onClick === "function"
                                    ? renderCreate.onClick()
                                    : setOpenCreate(!openCreate)
                            }
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
                        columns={columns}
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
                    form={renderCreate.form}
                    onFinish={(value) =>
                        handleCreate(
                            value,
                            renderCreate.onSubmit,
                            renderCreate.url
                        )
                    }
                    state={renderCreate.state}
                />
            )}
        </div>
    );
}

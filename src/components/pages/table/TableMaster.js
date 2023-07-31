import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import { IoMdAdd, IoMdRefresh } from "react-icons/io";
import { BiExport } from "react-icons/bi";
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
    Row,
    Col,
} from "antd";
import { useDispatch } from "react-redux";
import { GetAPI, PatchAPI, PostAPI } from "../../../redux";
import { DestroyAPI } from "../../../redux/reducer/apiHandling";
import MainTable from "./MainTable";
import { useReactToPrint } from "react-to-print";

const { Search } = Input;
const { RangePicker } = DatePicker;
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
                            marginTop: 24,
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

const ExportDialog = ({ isModalOpen, handleCancel, onFinish, form, state }) => {
    const [newState, setNewState] = useState({
        document_type: "pdf",
        date: [dayjs(), dayjs().add(1, "days")],
        ...state,
    });
    return (
        <Modal
            title={
                <Fragment>
                    <Typography style={{ fontSize: "1.4rem" }}>
                        Export To Document
                    </Typography>
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
                initialValues={typeof newState === "object" ? newState : {}}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row gutter={16}>
                    <Col lg={12}>
                        <Form.Item
                            label="Document Type"
                            name="document_type"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Document Type Tidak Boleh Kosong!",
                                },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col lg={12}>
                        <Form.Item
                            label="Date Range "
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: "Date Tidak Boleh Kosong!",
                                },
                            ]}
                        >
                            <RangePicker
                                format={"DD/MM/YY"}
                                value={newState.document_type}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                {!!form ? (
                    <Fragment>
                        <Typography>Filters</Typography>
                        <div>{form({ state })}</div>
                    </Fragment>
                ) : (
                    <Typography>Empty</Typography>
                )}
                {!!form && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 8,
                            marginTop: 24,
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
                                Export Document
                            </Button>
                        </Form.Item>
                    </div>
                )}
            </Form>
        </Modal>
    );
};

export default function TableMaster({
    report,
    url,
    columns,
    renderCreate,
    renderExport,
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
    const [rangeDate, setRangeDate] = useState([
        dayjs().add(-7, "days"),
        dayjs(),
    ]);

    const [openCreate, setOpenCreate] = useState(false);
    const [openExport, setOpenExport] = useState(false);
    const [editData, setEditData] = useState(null);

    const formatedEditData = useMemo(() => {
        return !!editData ? editData : renderCreate?.state;
    }, [renderCreate?.state, editData]);

    const formatedFilters = useMemo(() => {
        let newValue = { ...filters };
        if (!!report) {
            newValue = {
                ...newValue,
                date: rangeDate,
            };
        }
        return newValue;
    }, [filters, report, rangeDate]);

    const uri = useMemo(() => {
        return `${url}?page=${page}&perPage=${perPage}&search=${search}&filters=${
            Object.keys(formatedFilters).length !== 0
                ? JSON.stringify(formatedFilters)
                : ""
        }&timestamp=${refresh}`;
    }, [page, perPage, search, refresh, url, formatedFilters]);

    const { data: datas, loading } = useSWR(uri, fetcher, {
        revalidateOnFocus: false,
    }) || { datas: [] };

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
        if (!url && !editData) throw Error("invalid url");
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

    const pdfRef = useRef(null);
    const [dtPdf, setDtPdf] = useState(null);

    const handlePDF = useReactToPrint({
        content: () => pdfRef.current,
    });

    const handleSubmitExport = async (value) => {
        const result = await dispatch(
            GetAPI({
                url: `${renderExport.url}?filters=${JSON.stringify(value)}`,
            })
        );
        if (!!result?.payload) {
            setDtPdf(result?.payload?.data?.data?.rows);
        }
    };
    console.log(dtPdf);

    useEffect(() => {
        if (!!dtPdf) {
            handlePDF();
        }
    }, [dtPdf]);

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
                    {!!report && (
                        <Button
                            icon={<BiExport size={14} />}
                            type="primary"
                            onClick={() => setOpenExport(!openExport)}
                        >
                            Export
                        </Button>
                    )}
                    {!!renderCreate?.url && (
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
                        <div>
                            {!!report && (
                                <RangePicker
                                    value={formatedFilters?.date}
                                    format={"DD/MM/YY"}
                                    onChange={(values) => setRangeDate(values)}
                                />
                            )}
                        </div>
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
                    <MainTable
                        columns={newColumns}
                        dataSource={datas?.data?.rows}
                        paginationProp={{
                            total: datas?.data?.count || 0,
                            current: datas?.data?.page || page,
                            pageSize: datas?.data?.perPage || perPage,
                            showSizeChanger: true,
                            onChange: (pg, perPg) => {
                                if (pg) {
                                    setPage(pg);
                                }
                                if (perPage) {
                                    setPerPage(perPg);
                                }
                            },
                        }}
                    />
                </div>
            </MainCard>
            {!!dtPdf && (
                <div ref={pdfRef} style={{ display: "none" }}>
                    {!!renderExport?.componentPDF &&
                        renderExport?.componentPDF(dtPdf)}
                </div>
            )}
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
            {!!openExport && (
                <ExportDialog
                    isModalOpen={openExport}
                    handleCancel={() => setOpenExport(!openExport)}
                    handleOk={() => setOpenExport(!openExport)}
                    form={renderExport?.form}
                    state={renderExport?.state}
                    onFinish={handleSubmitExport}
                />
            )}
        </div>
    );
}

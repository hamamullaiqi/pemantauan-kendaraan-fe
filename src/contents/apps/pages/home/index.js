import {
    Button,
    Typography,
    DatePicker,
    Space,
    Tag,
    Table,
    Pagination,
    Input,
} from "antd";
import React, { useMemo, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import { IoMdAdd, IoMdRefresh } from "react-icons/io";
import MainCard from "../../../../components/MainCard";
import useSWR from "swr";
import fetcher from "../../../../helper/fetcher";
import dayjs from "dayjs";

const { Search } = Input;

const PAGE = 1;
const PERPAGE = 10;
export default function Home() {
    const [page, setPage] = useState(PAGE);
    const [perPage, setPerPage] = useState(PERPAGE);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({});
    const [refresh, setRefresh] = useState(dayjs().unix());

    const uri = useMemo(() => {
        return `produk/paging?page=${page}&perPage=${perPage}&search=${search}&filters=${
            Object.keys(filters).length !== 0 ? JSON.stringify(filters) : ""
        }&timestamp=${refresh}`;
    }, [page, perPage, search, filters, refresh]);

    const { data: datas, loading } = useSWR(uri, fetcher, {
        revalidateOnFocus: false,
    }) || { datas: [] };
    console.log(datas);

    const onSearch = (val) => {
        setSearch(val);
    };
    const columns = [
        {
            title: "Nama",
            dataIndex: "nama",
            key: "nama",
            render: (text) => text,
        },
        {
            title: "Keterangan",
            dataIndex: "keterangan",
            key: "keterangan",
            render: (text) => text,
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

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
                        Home
                    </Typography.Title>
                    <Typography.Text style={{ color: "rgb(153, 161, 183)" }}>
                        Home
                    </Typography.Text>
                </div>
                <div id="right" style={{ display: "flex", gap: 8 }}>
                    <Button icon={<HiOutlineFilter size={14} />}>Filter</Button>
                    <Button type="primary" icon={<IoMdAdd size={14} />}>
                        Create
                    </Button>
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
                        scroll={{ x: "100%", y: `calc(100vh - 354px)` }}
                        pagination={false}
                        // pagination={{
                        //     position: ["bottomRight"],
                        //     total: datas?.data?.count,
                        //     current: datas?.data?.page,
                        //     pageSize: datas?.data?.perPage,
                        //     showSizeChanger: true,
                        //     onChange: (pg, perPg) => {
                        //         console.log(perPg);
                        //         if (pg) {
                        //             setPage(pg);
                        //         }
                        //         if (perPage) {
                        //             setPerPage(perPg);
                        //         }
                        //     },
                        // }}
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
        </div>
    );
}

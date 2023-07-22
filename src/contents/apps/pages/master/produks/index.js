import React, { useState } from "react";
import TableMaster from "../../../../../components/pages/table/TableMaster";
import { Form, Input } from "antd";

export default function Produk() {
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

        // {
        //     title: "Action",
        //     key: "action",
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <a>Invite {record.name}</a>
        //             <a>Delete</a>
        //         </Space>
        //     ),
        // },
    ];

    const [state, setState] = useState({
        nama: "",
        keterangan: "",
    });
    return (
        <TableMaster
            title={"Produk"}
            url={"produk/paging"}
            columns={columns}
            renderCreate={{
                // contentType: "multipart/form-data",
                state: state,
                url: "produk/add",
                // onSubmit: (row) => console.log(row),
                form: (
                    <div>
                        <Form.Item
                            label="Nama"
                            name="nama"
                            rules={[
                                {
                                    required: true,
                                    message: "Nama Tidak Boleh Kosong!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Keterangan"
                            name="keterangan"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: "Keterangan Tidak Boleh Kosong!",
                            //     },
                            // ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                ),
            }}
        />
    );
}

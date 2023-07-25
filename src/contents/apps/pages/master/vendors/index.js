import React, { useState } from "react";
import TableMaster from "../../../../../components/pages/table/TableMaster";
import { Form, Input } from "antd";

export default function Vendor() {
    const columns = [
        {
            title: "Nama",
            dataIndex: "nama",
            key: "nama",
            render: (text) => text,
        },
        {
            title: "Alamat",
            dataIndex: "alamat",
            key: "alamat",
            render: (text) => text,
        },
        {
            title: "Keterangan",
            dataIndex: "keterangan",
            key: "keterangan",
            render: (text) => text,
        },
    ];

    const [state, setState] = useState({
        nama: "",
        keterangan: "",
        alamat: "",
    });
    return (
        <TableMaster
            title={"Vendor"}
            url={"api/v1/vendor/paging"}
            columns={columns}
            editable={{ url: "api/v1/vendor/edit" }}
            deletable={{ url: "api/v1/vendor/delete" }}
            renderCreate={{
                // contentType: "multipart/form-data",
                state: state,
                url: "api/v1/vendor/add",
                // onSubmit: (row) => console.log(row),
                form: () => (
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
                            label="Alamat"
                            name="alamat"
                            rules={[
                                {
                                    required: true,
                                    message: "Alamat Tidak Boleh Kosong!",
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

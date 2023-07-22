import React, { useState } from "react";
import TableMaster from "../../../../../components/pages/table/TableMaster";
import { Form, Input, InputNumber } from "antd";

export default function User() {
    const columns = [
        {
            title: "User Name",
            dataIndex: "username",
            key: "username",
            render: (text) => text,
        },
        {
            title: "Full Name",
            dataIndex: "fullname",
            key: "fullname",
            render: (text) => text,
        },
        {
            title: "Level",
            dataIndex: "level",
            key: "level",
            render: (text) => text,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text) => text,
        },
        {
            title: "No Telp.",
            dataIndex: "no_telp",
            key: "no_telp",
            render: (text) => text,
        },
    ];

    const [state, setState] = useState({
        username: "",
        password: "",
        full_name: "",
        level: 0,
        email: "",
        no_telp: "",
        image: "",
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
                form: (
                    <div>
                        <Form.Item
                            label="User Name"
                            name="username"
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
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Password Tidak Boleh Kosong!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Full Name"
                            name="fullname"
                            rules={[
                                {
                                    required: true,
                                    message: "Full Name Tidak Boleh Kosong!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Level"
                            name="level"
                            rules={[
                                {
                                    required: true,
                                    message: "Level Tidak Boleh Kosong!",
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Email Tidak Boleh Kosong!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="No. Telp."
                            name="no_telp"
                            rules={[
                                {
                                    required: true,
                                    message: "No Telp. Tidak Boleh Kosong!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                ),
            }}
        />
    );
}

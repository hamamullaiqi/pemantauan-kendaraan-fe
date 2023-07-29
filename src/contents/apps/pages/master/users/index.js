import React, { useState } from "react";
import TableMaster from "../../../../../components/pages/table/TableMaster";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { levelToRole, levels } from "../../../../../redux/reducer/levelConvert";

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
      render: (text) => levelToRole(text),
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
    level: "",
    email: "",
    no_telp: "",
    image: "",
  });

  const optLevels = (arr = []) => {
    return arr.map((item) => ({ label: item.value, value: item.level }));
  };
  return (
    <TableMaster
      title={"Master Users"}
      url={"api/v1/user/paging"}
      columns={columns}
      editable={{ url: "api/v1/user/edit" }}
      deletable={{ url: "api/v1/user/delete" }}
      renderCreate={{
        // contentType: "multipart/form-data",
        state: state,
        url: "api/v1/user/add",
        // onSubmit: (row) => console.log(row),
        form: ({ edited }) => (
          <div>
            <Row gutter={32}>
              <Col lg={!!edited ? 24 : 12}>
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
              </Col>
              {!edited && (
                <Col lg={12}>
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
                </Col>
              )}
              <Col lg={12}>
                <Form.Item
                  label="Full Name"
                  name="full_name"
                  rules={[
                    {
                      required: true,
                      message: "Full Name Tidak Boleh Kosong!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={12}>
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
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    value={
                      optLevels(levels).find(
                        (item) => item.value === state.level
                      ) || {}
                    }
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      return input.length > 3
                        ? (option?.label.toLowerCase() ?? "").includes(
                            input.toLowerCase()
                          )
                        : false;
                    }}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={optLevels(levels)}
                  />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  // rules={[
                  //     {
                  //         required: true,
                  //         message:
                  //             "Email Tidak Boleh Kosong!",
                  //     },
                  // ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  label="No. Telp."
                  name="no_telp"
                  // rules={[
                  //     {
                  //         required: true,
                  //         message:
                  //             "No Telp. Tidak Boleh Kosong!",
                  //     },
                  // ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ),
      }}
    />
  );
}

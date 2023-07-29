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
  ];

  const [state, setState] = useState({
    nama: "",
    keterangan: "",
  });
  return (
    <TableMaster
      title={"Master Produk"}
      url={"api/v1/produk/paging"}
      columns={columns}
      editable={{ url: "api/v1/produk/edit" }}
      deletable={{ url: "api/v1/produk/delete" }}
      renderCreate={{
        // contentType: "multipart/form-data",
        state: state,
        url: "api/v1/produk/add",
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

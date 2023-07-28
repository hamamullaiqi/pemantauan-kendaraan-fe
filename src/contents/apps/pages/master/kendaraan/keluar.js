import React, { useState } from "react";
import TableMaster from "../../../../../components/pages/table/TableMaster";
import { Form, Input } from "antd";

export default function MasterKeluar() {
  const columns = [
    {
      title: "Np Kendaraan",
      dataIndex: "nomer_polisi",
      key: "nomer_polisi",
      render: (text) => text,
    },
    {
      title: "Nama",
      dataIndex: "nama_supir",
      key: "nama_supir",
      render: (text) => text,
    },
    {
      title: "Produk",
      dataIndex: "produk_id",
      key: "produk_id",
      render: (text) => text,
    },
    {
      title: "Vendor",
      dataIndex: "vendor_id",
      key: "vendor_id",
      render: (text) => text,
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      render: (text) => text,
    },
    {
      title: "Gross",
      dataIndex: "gross",
      key: "gross",
      render: (text) => text,
    },
    {
      title: "Tare",
      dataIndex: "tare",
      key: "tare",
      render: (text) => text,
    },
    {
      title: "Nett",
      dataIndex: "nett",
      key: "nett",
      render: (text) => text,
    },
  ];
  return (
    <TableMaster
      title={"Kendaraan Keluar"}
      url={"api/v1/kendaraan_masuk/paging"}
      columns={columns}
      editable={{ url: "api/v1/produk/edit" }}
      deletable={{ url: "api/v1/produk/delete" }}
    />
  );
}

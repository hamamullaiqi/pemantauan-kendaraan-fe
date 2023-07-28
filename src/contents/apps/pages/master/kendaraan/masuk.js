import React, { useState } from "react";
import TableMaster from "../../../../../components/pages/table/TableMaster";
import { Form, Input } from "antd";

export default function MasterMasuk() {
  const defaultValue = {
    nama_supir: "",
    produk_id: null,
    vendor_id: null,
    keterangan: "",
    gross: 0,
    tare: 0,
    nomer_polisi: "",
  };

  const columns = [
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
  ];
  return (
    <TableMaster
      title={"Produk"}
      url={"api/v1/kendaraan_masuk/paging"}
      columns={columns}
      //   editable={{ url: "api/v1/produk/edit" }}
      //   deletable={{ url: "api/v1/produk/delete" }}
    />
  );
}

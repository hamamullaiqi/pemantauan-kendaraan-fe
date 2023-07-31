import React, { Fragment, useState } from "react";
import TableMaster from "../../../../components/pages/table/TableMaster";
import { Col, Form, Input, Row } from "antd";
import SelectAsync from "../../../../components/SelectAsync";
import dayjs from "dayjs";
const { TextArea } = Input;

const defaultValue = {
  nama_supir: "",
  produk_id: null,
  vendor_id: null,
  keterangan: "",
  gross: 0,
  tare: 0,
  nomer_polisi: "",
};

const defaultValExport = {
  produk_id: null,
  vendor_id: null,
  nomer_polisi: "",
};

export default function KendaraanKeluar() {
  const columns = [
    {
      title: "No Polisi",
      dataIndex: "nomer_polisi",
      key: "nomer_polisi",
      render: (text) => text,
    },
    {
      title: "Nama Supir",
      dataIndex: "nama_supir",
      key: "nama_supir",
      render: (text) => text,
    },
    {
      title: "Produk",
      dataIndex: "produkMasuk",
      key: "produkKeluar",
      render: (row) => row?.nama || "",
    },
    {
      title: "Vendor",
      dataIndex: "vendorMasuk",
      key: "vendorKeluar",
      render: (row) => row?.nama || "",
    },

    {
      title: "Gross",
      dataIndex: "gross",
      key: "gross",
      align: "right",

      render: (text) => text,
    },
    {
      title: "Tare",
      dataIndex: "tare",
      key: "tare",
      align: "right",

      render: (text) => text,
    },
    {
      title: "Nett",
      dataIndex: "nett",
      key: "nett",
      align: "right",

      render: (text) => text,
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      render: (text) => text,
    },
    {
      title: "Tanggal Keluar",
      dataIndex: "waktu_keluar",
      key: "waktu_keluar",
      render: (text) => dayjs(text).format("DD/MM/YY HH:ss"),
    },
  ];

  const [state, setState] = useState(defaultValue);
  const [exportState, setExportState] = useState(defaultValExport);
  return (
    <TableMaster
      title={"Laporan Kendaraan Masuk"}
      url={"api/v1/kendaraan_keluar/paging"}
      report
      columns={columns}
      renderExport={{
        url: "",
        state: exportState,
        form: () => <Fragment></Fragment>,
      }}
    />
  );
}

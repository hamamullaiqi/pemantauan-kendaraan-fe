import React, { Fragment, useMemo, useState } from "react";
import TableMaster from "../../../../components/pages/table/TableMaster";
import { Col, Form, Input, Row, Typography } from "antd";
import SelectAsync from "../../../../components/SelectAsync";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { GetAPI } from "../../../../redux";
import {
    Document,
    PDFViewer,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
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
            title: "Tanggal Masuk",
            dataIndex: "waktu_masuk",
            key: "waktu_masuk",
            render: (text) => dayjs(text).format("DD/MM/YY HH:ss"),
        },
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
    ];

    const [state, setState] = useState(defaultValue);
    const [exportState, setExportState] = useState(defaultValExport);
    const dispatch = useDispatch();

    const data = [
        {
            id: "0f3c34e7-3cb3-4903-a1dd-2897a4d2755e",
            nama_supir: "apl",
            produk_id: "49643b90-bca5-4ec1-95fd-c2da7217cd88",
            vendor_id: "b84b8471-9524-4ade-8adb-691f5edbc4d3",
            waktu_masuk: "2023-07-29T10:39:25.000Z",
            keterangan: "",
            gross: 500,
            tare: 300,
            nett: 200,
            nomer_polisi: "B123456KL",
            petugas_id: "f2c666f1-dfa8-464d-8f6d-948ae68b8afe",
            vendorMasuk: {
                id: "b84b8471-9524-4ade-8adb-691f5edbc4d3",
                nama: "PT. NUSA",
                keterangan: "",
                alamat: "jakarta",
            },
            produkMasuk: {
                id: "49643b90-bca5-4ec1-95fd-c2da7217cd88",
                nama: "nugget4",
                keterangan: "exampel",
            },
        },
        {
            id: "44445536-d03a-4cc9-8514-c3864b1398c6",
            nama_supir: "aku",
            produk_id: "7649deef-ea13-4692-ad6b-6d8f4e305e49",
            vendor_id: "b84b8471-9524-4ade-8adb-691f5edbc4d3",
            waktu_masuk: "2023-07-29T07:55:18.000Z",
            keterangan: "",
            gross: 100,
            tare: 30,
            nett: 70,
            nomer_polisi: "b324723lo",
            petugas_id: "f2c666f1-dfa8-464d-8f6d-948ae68b8afe",
            vendorMasuk: {
                id: "b84b8471-9524-4ade-8adb-691f5edbc4d3",
                nama: "PT. NUSA",
                keterangan: "",
                alamat: "jakarta",
            },
            produkMasuk: {
                id: "7649deef-ea13-4692-ad6b-6d8f4e305e49",
                nama: "nugget8",
                keterangan: "exampel",
            },
        },
        {
            id: "a75cef50-2344-4f0e-90ad-46e7a6c4b74b",
            nama_supir: "ANDI",
            produk_id: "49643b90-bca5-4ec1-95fd-c2da7217cd88",
            vendor_id: "b84b8471-9524-4ade-8adb-691f5edbc4d3",
            waktu_masuk: "2023-07-28T17:38:19.000Z",
            keterangan: "edited\n",
            gross: 1000,
            tare: 50,
            nett: 50,
            nomer_polisi: "B9834KL",
            petugas_id: "f2c666f1-dfa8-464d-8f6d-948ae68b8afe",
            vendorMasuk: {
                id: "b84b8471-9524-4ade-8adb-691f5edbc4d3",
                nama: "PT. NUSA",
                keterangan: "",
                alamat: "jakarta",
            },
            produkMasuk: {
                id: "49643b90-bca5-4ec1-95fd-c2da7217cd88",
                nama: "nugget4",
                keterangan: "exampel",
            },
        },
    ];

    return (
        <Fragment>
            <TableMaster
                title={"Report Kendaraan Masuk"}
                url={"api/v1/kendaraan_masuk/paging"}
                report
                columns={columns}
                renderExport={{
                    url: "api/v1/kendaraan_masuk/paging",
                    componentPDF: (data) => {
                        const dt = !!data ? data : {};
                        return <div>Text PDF{dt?.nomer_polisi}</div>;
                    },
                    state: exportState,
                    // onSubmit: async (value, toPdf) => {
                    //     const result = await dispatch(
                    //         GetAPI({
                    //             url: `api/v1/kendaraan_masuk/paging?filters=${JSON.stringify(
                    //                 value
                    //             )}`,
                    //         })
                    //     );
                    // },
                    form: () => <Fragment></Fragment>,
                }}
            />
        </Fragment>
    );
}

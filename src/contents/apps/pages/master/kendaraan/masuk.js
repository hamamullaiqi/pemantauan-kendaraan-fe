import React, { useState } from "react";
import TableMaster from "../../../../../components/pages/table/TableMaster";
import { Col, Form, Input, Row } from "antd";
import SelectAsync from "../../../../../components/SelectAsync";
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

export default function MasterMasuk() {
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
            key: "produkMasuk",
            render: (row) => row?.nama || "",
        },
        {
            title: "Vendor",
            dataIndex: "vendorMasuk",
            key: "vendorMasuk",
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
            title: "Nama Petugas",
            dataIndex: "petugasMasuk",
            key: "petugasMasuk",
            render: (row) => row?.full_name || "-",
        },
    ];
    const [state, setState] = useState(defaultValue);
    return (
        <TableMaster
            title={"Master Kendaraan Masuk"}
            url={"api/v1/kendaraan_masuk/paging"}
            columns={columns}
            editable={{ url: "api/v1/kendaraan_masuk/edit" }}
            deletable={{ url: "api/v1/kendaraan_masuk/delete_masuk" }}
            renderCreate={{
                state: state,
                form: ({ state, edited }) => (
                    <Row gutter={16}>
                        <Col lg={8}>
                            <Form.Item
                                label="Vendor"
                                name="vendor_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vendor Tidak Boleh Kosong!",
                                    },
                                ]}
                            >
                                <SelectAsync
                                    url={"api/v1/vendor/all"}
                                    value={state?.produk_id}
                                    onChange={(val) => {
                                        setState({ ...state, vendor_id: val });
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={8}>
                            <Form.Item
                                label="No Polisi"
                                name="nomer_polisi"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "No Polisi Tidak Boleh Kosong!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col lg={8}>
                            <Form.Item
                                label="Nama Supir"
                                name="nama_supir"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Nama Supir Tidak Boleh Kosong!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col lg={12}>
                            <Form.Item
                                label="Produk"
                                name="produk_id"
                                rules={[
                                    {
                                        required: true,
                                        message: "Produk Tidak Boleh Kosong!",
                                    },
                                ]}
                            >
                                <SelectAsync
                                    url={"api/v1/produk/all"}
                                    value={state?.produk_id}
                                    onChange={(val) =>
                                        setState({ ...state, produk_id: val })
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={6}>
                            <Form.Item
                                label="Gross"
                                name="gross"
                                rules={[
                                    {
                                        required: true,
                                        message: "Gross Tidak Boleh Kosong!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col lg={6}>
                            <Form.Item
                                label="Tare"
                                name="tare"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tare Tidak Boleh Kosong!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col lg={24}>
                            <Form.Item label="Keterangan" name="keterangan">
                                <TextArea rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                ),
            }}
        />
    );
}

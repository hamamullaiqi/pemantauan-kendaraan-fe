import { Button, Col, Form, Input, Row, Select, Tabs, Typography } from "antd";
import MainCard from "../../../../components/MainCard";
import { Fragment, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import fetcher from "../../../../helper/fetcher";
import SelectAsync from "../../../../components/SelectAsync";
import { useDispatch } from "react-redux";
import { PostAPI } from "../../../../redux";
const { TextArea } = Input;

const TabsContent = ({ type, state, setState }) => {
    return (
        <Fragment>
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
                            onChange={(val) => {
                                console.log(val);
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
                                message: "No Polisi Tidak Boleh Kosong!",
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
                                message: "Nama Supir Tidak Boleh Kosong!",
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: 8,
                    marginTop: 24,
                }}
            >
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {!!type ? type : "Save"}
                    </Button>
                </Form.Item>
            </div>
        </Fragment>
    );
};

const defaultValue = {
    nama_supir: "",
    produk_id: null,
    vendor_id: null,
    keterangan: "",
    gross: 0,
    tare: 0,
    nomer_polisi: "",
};

export default function Home() {
    const dispatch = useDispatch();
    const [state, setState] = useState(defaultValue);
    const [tabValue, setTabValue] = useState("kendaraan_masuk");

    const uri = useMemo(() => {
        return tabValue === "kendaraan_masuk"
            ? "api/v1/kendaraan_masuk/add"
            : "api/v1/kendaraan_keluar/add";
    }, [tabValue]);

    const onFinish = (value) => {
        dispatch(PostAPI({ url: uri, data: value }));
    };
    const tabs = [
        {
            label: "kendaraan Masuk",
            key: "kendaraan_masuk",
            children: (
                <TabsContent state={state} setState={setState} type={"Masuk"} />
            ),
        },
        {
            label: "kendaraan Keluar",
            key: "kendaraan_keluar",
            children: (
                <TabsContent
                    state={state}
                    setState={setState}
                    type={"Keluar"}
                />
            ),
        },
    ];

    return (
        <div
            style={{
                height: "100%",
            }}
        >
            <Row
                style={{
                    height: "100%",
                    flexGrow: 1,
                }}
                gutter={16}
            >
                <Col lg={18} style={{ height: "inherit" }}>
                    <MainCard style={{ height: "100%" }}>
                        <Form
                            name="basic"
                            // style={{ maxWidth: 600 }}
                            layout="vertical"
                            initialValues={state}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Typography.Title level={4}>
                                Form Timbangan Kendaraan
                            </Typography.Title>
                            <Tabs
                                activeKey={tabValue}
                                onChange={(val) => setTabValue(val)}
                                centered
                                items={tabs}
                            />
                        </Form>
                    </MainCard>
                </Col>
                <Col lg={6} style={{ height: "inherit" }}>
                    <Typography.Title level={5}>Aktifitas</Typography.Title>
                </Col>
            </Row>
        </div>
    );
}

import {
    Button,
    Col,
    Form,
    Input,
    List,
    Row,
    Select,
    Tabs,
    Typography,
    theme,
} from "antd";
import MainCard from "../../../../components/MainCard";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import fetcher from "../../../../helper/fetcher";
import SelectAsync from "../../../../components/SelectAsync";
import { useDispatch } from "react-redux";
import { PostAPI } from "../../../../redux";
import dayjs from "dayjs";
const { TextArea } = Input;
const { useToken } = theme;
const { Search } = Input;

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
            <div
                style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: 8,
                    marginTop: 8,
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
    const { token } = useToken();
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const [state, setState] = useState(defaultValue);
    const [tabValue, setTabValue] = useState("kendaraan_masuk");
    const [timestamp, setTimestamp] = useState(dayjs().unix());
    const [search, setSearch] = useState("");

    const onSearch = (value) => {
        setSearch(value);
    };

    const uri = useMemo(() => {
        return tabValue === "kendaraan_masuk"
            ? "api/v1/kendaraan_masuk/add"
            : "api/v1/kendaraan_keluar/add";
    }, [tabValue]);

    const uriAktifitas = useMemo(() => {
        return `api/v1/kendaraan_masuk/paging?page=1&perPage=5&search=${search}&timestamp=${timestamp}`;
    }, [tabValue, timestamp, search]);

    const { data: result } = useSWR(uriAktifitas, fetcher);

    const onFinish = async (value) => {
        const result = await dispatch(PostAPI({ url: uri, data: value }));
        console.log(result?.payload?.status);
        if (result?.payload?.status === "success") {
            formRef.current?.resetFields();
            setTimestamp(dayjs().unix());
        }
    };
    const tabs = [
        {
            label: "kendaraan Masuk",
            key: "kendaraan_masuk",
            children: (
                <TabsContent
                    state={state}
                    setState={setState}
                    type={"Tambah Masuk"}
                />
            ),
        },
        {
            label: "kendaraan Keluar",
            key: "kendaraan_keluar",
            children: (
                <TabsContent
                    state={state}
                    setState={setState}
                    type={"Tambah Keluar"}
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
                <Col lg={16} style={{ height: "inherit" }}>
                    <MainCard style={{ height: "100%" }}>
                        <Form
                            name="basic"
                            ref={formRef}
                            // style={{ maxWidth: 600 }}
                            layout="vertical"
                            initialValues={state}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Typography.Title level={4}>
                                Form Input Data Kendaraan{" "}
                            </Typography.Title>
                            <Tabs
                                activeKey={tabValue}
                                onChange={(val) => {
                                    formRef?.current.setFieldsValue(
                                        defaultValue
                                    );
                                    setTabValue(val);
                                }}
                                centered
                                items={tabs}
                            />
                        </Form>
                    </MainCard>
                </Col>
                <Col lg={8} style={{ height: "inherit" }}>
                    <Typography.Title level={5}>
                        Aktfitas Kendaraan baru-baru ini
                    </Typography.Title>
                    <Search
                        placeholder="search.."
                        onSearch={onSearch}
                        enterButton
                        style={{ width: "100%" }}
                        allowClear
                    />
                    <List
                        itemLayout="vertical"
                        dataSource={result?.data?.rows || []}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
                                {/* <List.Item.Meta title={item?.nomer_polisi} /> */}
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            style={{
                                                fontWeight: "bold",
                                                color: token.colorPrimary,
                                            }}
                                        >
                                            {item?.nomer_polisi}
                                        </Typography>
                                        <Typography>
                                            {dayjs(item?.waktu_masuk).format(
                                                "DD/MMM/YY HH:ss"
                                            )}
                                        </Typography>
                                        <div style={{ textAlign: "right" }}>
                                            <Button
                                                size="small"
                                                onClick={() => {
                                                    setTabValue(
                                                        "kendaraan_keluar"
                                                    );
                                                    const value = {
                                                        nama_supir:
                                                            item?.nama_supir,
                                                        vendor_id:
                                                            item?.vendor_id,
                                                        produk_id:
                                                            item?.produk_id,
                                                        nomer_polisi:
                                                            item?.nomer_polisi,
                                                    };
                                                    setState(value);
                                                    formRef?.current?.setFieldsValue(
                                                        value
                                                    );
                                                }}
                                            >
                                                Select
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
        </div>
    );
}

import { blue, grey } from "@ant-design/colors";
import { ReloadOutlined } from "@ant-design/icons";
import {
    Button,
    Divider,
    Form,
    theme as themeBase,
    Input,
    Typography,
} from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { RiLockLine, RiUser3Line } from "react-icons/ri";
import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { useTheme } from "../../hook/useTheme";
import { login } from "../../redux/reducer/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PostAPI, forgotPassword } from "../../redux";

// import { CreateRandomString } from '../../login/utils';

const useStyle = createUseStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: ({ currentColorPrimary }) => currentColorPrimary,
    },
    wrapLogin: {
        backgroundColor: "white",
        borderRadius: 8,
        minWidth: 340,
        padding: 28,
    },
});

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const {
        token: { colorPrimary: BaseColorPrimary },
    } = themeBase.useToken();

    const currentColorPrimary = BaseColorPrimary;
    const classes = useStyle({ currentColorPrimary });

    const onFinished = useCallback((values) => {
        dispatch(forgotPassword(values));
    }, []);
    return (
        <div className={classes.root}>
            <div className={classes.wrapLogin}>
                <div>
                    <Typography.Title
                        style={{ color: currentColorPrimary }}
                        level={2}
                    >
                        Forgot Password
                    </Typography.Title>
                </div>
                <Divider className="my-3" />
                <div>
                    <Form
                        layout="horizontal"
                        labelAlign="left"
                        onFinish={onFinished}
                        labelCol={{
                            span: 24,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                    >
                        <Form.Item
                            name={"email"}
                            rules={[
                                {
                                    required: true,
                                    message: "Email Required",
                                },
                            ]}
                        >
                            <Input
                                autoFocus
                                size="large"
                                placeholder="Email"
                                prefix={<RiUser3Line color={grey[2]} />}
                            />
                        </Form.Item>

                        {/* <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                            <Button icon={<ReloadOutlined />} type="ghost" onClick={() => setRefresh(createRandomStr())} />
                            <Image
                                src={image}
                                height={64}
                                width={200}
                            />
                            <Form.Item name="captcha" rules={[{ required: true, message: 'Captha Required' }]} >
                                <Input size='large' placeholder='Captcha Result ' />
                            </Form.Item>
                        </div> */}
                        <Button
                            className="my-4"
                            block
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            Reset Password
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

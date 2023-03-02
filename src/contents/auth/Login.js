import { blue, grey } from "@ant-design/colors";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Divider, Form, theme as themeBase, Input, Typography } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { RiLockLine, RiUser3Line } from "react-icons/ri";
import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { useTheme } from "../../hook/useTheme";
import { login } from "../../redux/reducer/auth";

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

export default function Login({ apps, theme }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const {
    token: { colorPrimary:BaseColorPrimary },
  } = themeBase.useToken();
  const { colorPrimary } = theme || {colorPrimary:''}

  const currentColorPrimary = !!colorPrimary ? colorPrimary :  BaseColorPrimary
  const classes = useStyle({ currentColorPrimary });
  
  // const createRandomStr = () => {
  //     const timestamps = (new Date()).getTime();
  //     return timestamps + '_' + CreateRandomString(16);
  // }
  // const [refresh, setRefresh] = useState(createRandomStr());
  // const loadImage = () => {
  //     dispatch(GetAPI({ url: 'auth/captcha/' + refresh })).then((resp) => {
  //         if (!!resp?.payload) {
  //             setImage(resp.payload.data);
  //         }
  //     })
  // }
  // useEffect(() => {
  //     loadImage();
  // }, [refresh]);

  const onFinished = useCallback((values) => {
    console.log({ values });
    dispatch(login({ ...values, app: apps }));
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.wrapLogin}>
        <div>
          <Typography.Title style={{ color: currentColorPrimary }} level={2}>
            Login
          </Typography.Title>
          <Typography.Text className="text-sub-title">
            Sign in to {apps}
          </Typography.Text>
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
              name={"user"}
              rules={[{ required: true, message: "Username Required" }]}
            >
              <Input
                autoFocus
                size="large"
                placeholder="Username"
                prefix={<RiUser3Line color={grey[2]} />}
              />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[{ required: true, message: "Password Required" }]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                prefix={<RiLockLine color={grey[2]} />}
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
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Modal } from "antd";
import SiderBar from "./SiderBar";

export default function MySider({ collapsed, open, classes, siderBg, colorPrimary, handleClose, ...props }) {
  return (
    <Modal className="modal-sider"  transitionName="" open={open} onCancel={handleClose} footer={null}>
        <SiderBar classes={classes} siderBg={siderBg} collapsed={!open} colorPrimary={colorPrimary} />
    </Modal>
  );
}

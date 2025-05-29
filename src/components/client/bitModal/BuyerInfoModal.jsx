import { Form } from "antd";
import React from "react";
import { Button, Input, Modal, Select, Upload, Dropdown } from "antd";
import { ChevronDown, Gavel, Quote } from "lucide-react";
import {
  AppleOutlined,
  CreditCardOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

import Checkbox from "antd/es/checkbox/Checkbox";
const BuyerInfoModal = ({ setBuyerInfoModal, setPaymentModal }) => {
  const [form] = Form.useForm();
  const handleSubmitBuyerInfo = (values) => {
    console.log("Buyer info submitted: ", values);
    console.log("Form submitted!");
    setPaymentModal(true);
    setBuyerInfoModal(false);
    form.resetFields();
  };

  const handleCancel = ()=>{
    setBuyerInfoModal(false)
    console.log(`cancel modal`)
  }

  return (
    <div>
      <p className="text-[#263234] mt-4 mb-6 text-[16px] ">
        Please input your real data so that we can reach to you. Thank you.
      </p>

      <Form form={form} onFinish={handleSubmitBuyerInfo} layout="vertical">
        <Form.Item
          style={{ marginBottom: "0px" }}
          rules={[
            {
              required: true,
              message: "Please enter your name!",
            },
          ]}
          label={
            <span className=" font-medium text-sm text-[#263234] ">Name</span>
          }
          name="name"
        >
          <Input
            style={{
              border: "1px solid #A6ABAC ",
              padding: " 10px 14px ",
              color: "#818889",
              fontSize: "16px",
              lineHeight: "24px",
            }}
            placeholder="Enter your name"
          />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "0px", marginTop: "16px" }}
          label={
            <span className=" font-medium text-sm text-[#263234] ">
              Contact Number
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please enter your contact number!",
            },
          ]}
          name="contact"
        >
          <Input
            style={{
              border: "1px solid #A6ABAC ",
              padding: " 10px 14px ",
              color: "#818889",
              fontSize: "16px",
              lineHeight: "24px",
            }}
            placeholder="Enter contact number"
          />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "0px", marginTop: "16px" }}
          rules={[
            {
              required: true,
              message: "Please enter your email!",
              type: "email",
            },
          ]}
          label={
            <span className=" font-medium text-sm text-[#263234] ">Email</span>
          }
          name="email"
        >
          <Input
            style={{
              border: "1px solid #A6ABAC ",
              padding: " 10px 14px ",
              color: "#818889",
              fontSize: "16px",
              lineHeight: "24px",
            }}
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          style={{ marginTop: "12px" }}
          name="agree"
          valuePropName="checked"
          rules={[{ required: true, message: "Please agree to the terms!" }]}
        >
          <Checkbox
            style={{
              color: "#263234",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            I agree to the{" "}
            <span onClick={"openDonateTermModal"} className="underline">
              terms & conditions
            </span>{" "}
          </Checkbox>
        </Form.Item>

        <div className="flex flex-col lg:flex-row md:flex-row md:ml-32 md:gap-16 lg:justify-end  lg:gap-5   ">
          <div className="  ">
            <Button className=" missionModalBtn1" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          <div>
            <Button className=" missionModalBtn2" htmlType="submit">
              Next
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BuyerInfoModal;

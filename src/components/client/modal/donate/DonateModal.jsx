import React from "react";

import { Input, Button, Checkbox, Upload, Radio, Form } from "antd";
import { Link } from "react-router-dom";
import { showSuccessAlert } from "../../../../helper/showSuccessAlert";
const { Dragger } = Upload;
const DonateModal = ({
  setSecondModalOpen,
  setDonateTerm,
  setModalOpen
}) => {

  const [form] = Form.useForm()



  const handleFileChange = (info) => {
    console.log("File Upload Info:", info.fileList);
  };

  const uploadProps = {
    beforeUpload: () => false,
    multiple: false,
    onChange: handleFileChange,
    accept: ".jpg,.jpeg,.png,.pdf",
  };


  // submit modal

  const handleSubmit = (values) => {
    console.log("Form values:", values);
    console.log(values.email);
    form.resetFields(); // Reset form after submit
    setSecondModalOpen(false);
    showSuccessAlert();
  };


  const showDonateTermModal = () => {
    setDonateTerm(true);
  };

  const closeModal = () => {
    form.resetFields(); // Reset form after
    setModalOpen(true);
    setSecondModalOpen(false);
    console.log("Ishan")
  };

  return (
    <div>
      <h1 className=" text-[#263234] font-semibold leading-8 text-3xl mb-6  ">
        Donate
      </h1>

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* Name */}
        <Form.Item
          name="name"
          label="Name"
          style={{ marginBottom: "0px" }}
          rules={[
            { required: true, message: "Please input your name!" },
            { min: 6, message: "Name must be at least 6 characters!" },
          ]}
        >
          <Input
            style={{
              padding: "12px",
              border: "1px solid #A6ABAC",
              outline: "none",
            }}
            placeholder="Enter your name"
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          style={{ marginBottom: "0px", marginTop: "8px" }}
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Enter a valid email!" },
          ]}
        >
          <Input
            style={{
              padding: "12px",
              border: "1px solid #A6ABAC",
              outline: "none",
            }}
            type="email"
            placeholder="Enter your email address"
          />
        </Form.Item>

        {/* Item */}
        <Form.Item
          style={{ marginBottom: "0px", marginTop: "8px" }}
          name="item"
          label="Item"
          rules={[
            { required: true, message: "Please input the item name!" },
            {
              min: 6,
              message: "Item name must be at least 6 characters!",
            },
          ]}
        >
          <Input
            style={{
              padding: "12px",
              border: "1px solid #A6ABAC",
              outline: "none",
            }}
            placeholder="Enter item name"
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          style={{ marginBottom: "0px", marginTop: "8px" }}
          name="description"
          label="Item Description"
          rules={[
            {
              required: true,
              message: "Please input the item description!",
            },
            {
              min: 6,
              message: "Description must be at least 6 characters!",
            },
          ]}
        >
          <Input.TextArea
            style={{
              padding: "12px",
              border: "1px solid #A6ABAC",
              outline: "none",
            }}
            placeholder="Enter a description..."
            rows={4}
          />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          style={{ marginBottom: "0px", marginTop: "8px" }}
          name="image"
          label="Upload your Photo"
          rules={[
            {
              required: true,
              message: "Please upload an image!",
            },
          ]}
        >
          <Dragger {...uploadProps}>
            <div>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 14C3.55228 14 4 14.4477 4 15V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V15C20 14.4477 20.4477 14 21 14C21.5523 14 22 14.4477 22 15V19C22 19.7957 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7957 22 19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V15C2 14.4477 2.44772 14 3 14Z"
                    fill="#4B5557"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L17.7071 7.29289C18.0976 7.68342 18.0976 8.31658 17.7071 8.70711C17.3166 9.09763 16.6834 9.09763 16.2929 8.70711L12 4.41421L7.70711 8.70711C7.31658 9.09763 6.68342 9.09763 6.29289 8.70711C5.90237 8.31658 5.90237 7.68342 6.29289 7.29289L11.2929 2.29289Z"
                    fill="#4B5557"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C12.5523 2 13 2.44772 13 3V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V3C11 2.44772 11.4477 2 12 2Z"
                    fill="#4B5557"
                  />
                </svg>
              </span>
              <p className="text-start">
                Click or drag file to this area to upload
              </p>
              <p className=" text-sm text-start text-[#4B5557]">
                Supported format: JPG, JPEG, PNG, PDF
              </p>
            </div>
          </Dragger>
        </Form.Item>

        {/* Checkbox */}
        <Form.Item
          name="terms"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Please agree with the terms!"),
            },
          ]}
        >
          <Checkbox>
            I agree with Virtue Hope's{" "}
            <Link to={""} onClick={showDonateTermModal} className="underline">
              terms & conditions
            </Link>
            .
          </Checkbox>
        </Form.Item>

        {/* Modal Buttons */}

        <div className=" flex flex-col md:flex-row md:justify-end justify-start  lg:flex-row  lg:justify-end mt-5 mb-2">
          <Button onClick={closeModal} className="  navBtn1  ">
            Back
          </Button>
          <Button htmlType="submit" className="navBtn2">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DonateModal;

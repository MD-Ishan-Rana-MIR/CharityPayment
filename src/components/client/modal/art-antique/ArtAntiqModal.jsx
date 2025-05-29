import React, { useState } from "react";
import { Modal, Input, Button, Checkbox, Upload, Radio, Form, Select } from "antd";
import { Link } from "react-router-dom";
import { showSuccessAlert } from "../../../../helper/showSuccessAlert";
import useAxiosPublic from "../../../../pages/hooks/useAxiosPublic";
import Swal from "sweetalert2";

const { Dragger } = Upload;

const ArtAntiqModal = ({
  setAntiquesModal,
  setSupportModal,
  setDonateTerm,
}) => {
  const [donateFull, setDonateFull] = useState(false)
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileList, setFileList] = useState([]);
  const axiosPublic = useAxiosPublic();

  // Handle Upload Change
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Form Submit
  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();

    // Append regular form fields
    for (let key in values) {
      formData.append(key, values[key]);
    }

    // Append image files
    if (Array.isArray(fileList)) {
      fileList.forEach((file) => {
        formData.append("images[]", file.originFileObj);
      });
    }

    try {
      const res = await axiosPublic.post("/collect-table", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `<h1>Donation item under review.</h1>`,
          text: "Your auction listing is under review. Once done, it will be published & we’ll notify you via email.",
          showConfirmButton: true,
          timer: 2500,
        });

        form.resetFields();
        setFileList([]);
        setAntiquesModal(false);
      }
    } catch (error) {
      console.error(error);
      setError(
        error?.response?.data?.errors?.images?.[1] || "Something went wrong"
      );

      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeAnitqueModal = () => {
    setSupportModal(true);
    setAntiquesModal(false);
    setDonateFull(false)
    return form.resetFields()
  };

  const showDonateTermModal = () => {
    setDonateTerm(true);
  };

  return (
    <div>
      <h1 className=" text-[#263234] font-semibold leading-8 text-3xl mb-6  ">
        Donate Art, Antique or Collectables
      </h1>

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* Name */}
        <Form.Item
          name="name"
          label="Name"
          style={{ marginBottom: "0px" }}
          rules={[
            { required: true, message: "Please input your name!" },
            { min: 3, message: "Name must be at least 6 characters!" },
          ]}
        >
          <Input
            style={{
              padding: "12px",
              border: "1px solid #A6ABAC",
              outline: "none",
              color: "black !important"  // Ensure the color is black
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
          name="item_name"
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
            className=" inputText "
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
          name="images"
          label="Upload photos"
          rules={[
            {
              required: true,
              message: "Please upload at least one photo!",
            },
          ]}
        >
          <Upload.Dragger
            multiple
            listType="picture"
            beforeUpload={() => false} // Prevent auto upload
            accept=".jpg,.jpeg,.png,.pdf"
            fileList={fileList}
            onChange={handleFileChange}
          >
            <div>
              <span>
                {/* Your SVG icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 14C3.55228 14 4 14.4477 4 15V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V15C20 14.4477 20.4477 14 21 14C21.5523 14 22 14.4477 22 15V19C22 19.7957 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7957 22 19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V15C2 14.4477 2.44772 14 3 14Z"
                    fill="#4B5557"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.2929 2.29289C11.6834 1.90237 12.3166 1.90237 12.7071 2.29289L17.7071 7.29289C18.0976 7.68342 18.0976 8.31658 17.7071 8.70711C17.3166 9.09763 16.6834 9.09763 16.2929 8.70711L12 4.41421L7.70711 8.70711C7.31658 9.09763 6.68342 9.09763 6.29289 8.70711C5.90237 8.31658 5.90237 7.68342 6.29289 7.29289L11.2929 2.29289Z"
                    fill="#4B5557"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C12.5523 2 13 2.44772 13 3V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V3C11 2.44772 11.4477 2 12 2Z"
                    fill="#4B5557"
                  />
                </svg>
              </span>
              <p className="text-start">
                Click or drag files to this area to upload
              </p>
              <p className=" text-sm text-start text-[#4B5557]">
                Supported formats: JPG, JPEG, PNG, PDF
              </p>
            </div>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item
          label={
            <span className="text-sm text-[#263234] font-medium">
              I want to receive
            </span>
          }
          style={{ marginBottom: 0, marginTop: "16px" }}
        >
          <Form.Item name="donate_share" noStyle>
            <Select
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "5px",
                outline: 0,
                border: "none",
              }}
              placeholder="30% of net value"
              disabled={donateFull}
            >
              <Option value="30">30%</Option>
            </Select>
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Checkbox
            checked={donateFull}
            onChange={(e) => {
              const checked = e.target.checked;
              setDonateFull(checked);
              form.setFieldsValue({
                donate_share: checked ? "100" : "30", // or reset to previous value
              });
            }}
          >
            I want to donate 100%.
          </Checkbox>
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
            <Link onClick={showDonateTermModal} to={""} className="underline">
              terms & conditions
            </Link>
            .
          </Checkbox>
        </Form.Item>

        {/* Modal Buttons */}

        <div className=" flex flex-col md:flex-row md:justify-end justify-start  lg:flex-row  lg:justify-end mt-5 mb-2">
          <Button onClick={closeAnitqueModal} className="  navBtn1  ">
            Back
          </Button>
          <Button htmlType="submit" className="navBtn2" loading={loading}>
            Apply now
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ArtAntiqModal;

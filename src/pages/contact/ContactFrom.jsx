import React, { useState } from "react";
import {
  Form,
  Input,
  Upload,
  Button,
  Select,
  Checkbox,
  Modal,
  Alert,
} from "antd";
import AggrementPage from "../aggrement/AggrementPage";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { auctionMsg } from "../../helper/auctionMsg";
import { donactionMsg } from "../../helper/donactionMsg";
const { Option } = Select;
const ContactFrom = () => {
  const axiosPublic = useAxiosPublic();
  const [donateFull, setDonateFull] = useState(false);
  const [fileList, setFileList] = useState(null);
  const formData = new FormData();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // term & condiction modal useState
  const [openTermsModal, setOpenTermModal] = useState(false);

  const handleDonateImage = ({ fileList }) => {
    setFileList(fileList);
  };

  const opneModal = () => {
    setOpenTermModal(true);
  };
  const closeModal = () => {
    setOpenTermModal(false);
  };

  // 2nd modal end

  // Donated item from start

  const handleSubmitDonateFrom = async (values) => {
    const formData = new FormData();

    for (let key in values) {
      formData.append(key, values[key]);
    }

    if (Array.isArray(fileList)) {
      fileList.forEach((file) => {
        formData.append("images[]", file.originFileObj);
      });
    }

    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);

      const res = await axiosPublic.post("/collect-table", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      if (res.data.success) {
        donactionMsg()
        form.resetFields();
        setFileList([]);
        setDonateFull(false)
      }
    } catch (error) {
      console.error(error?.response?.data?.message);
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

      

      {/* error msg  */}

      {error && (
        <Alert
          message="Something went wrong"
          description={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          style={{ marginBottom: 16 }}
        />
      )}

  return (
    <>


      <div className="relative max-w-full -z-0 lg:pt-[91px] p-3 lg:p-0 bg-[url('/contact-bg-img.png')] bg-cover bg-center">
        <div className="max-w-[620px] mx-auto rounded -z-0 shadow border-[#a6abac] border px-6">
          <h1 className="mt-6 text-xl lg:text-2xl text-[#263234] font-semibold leading-8">
            Donated item submissions form
          </h1>
          <Form form={form} onFinish={handleSubmitDonateFrom} layout="vertical">
            {/* name  */}
            <Form.Item
              style={{ marginTop: "16px", marginBottom: "0px" }}
              label={
                <span className="text-[#263234] font-medium text-sm mb-1">
                  Name
                </span>
              }
              name="name"
            >
              <Input
                style={{
                  border: "1px solid #a6abac",
                  outline: 0,
                  padding: "10px 14px",
                  fontSize: "17px",
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

            {/* item name  */}

            <Form.Item
              style={{ marginTop: "16px", marginBottom: "0px" }}
              label={
                <span className="text-[#263234] font-medium text-sm mb-1">
                  Item
                </span>
              }
              name="item_name"
            >
              <Input
                style={{
                  border: "1px solid #a6abac",
                  outline: 0,
                  padding: "10px 14px",
                  fontSize: "17px",
                }}
                placeholder="Enter item name"
              />
            </Form.Item>

            {/* description  */}

            <Form.Item
              style={{ marginTop: "16px", marginBottom: "0px" }}
              label={
                <span className="text-[#263234] font-medium text-sm mb-1">
                  Item description
                </span>
              }
              name="description"
            >
              <Input.TextArea
                style={{
                  border: "1px solid #a6abac",
                  outline: 0,
                  padding: "10px 14px",
                  fontSize: "17px",
                }}
                placeholder="Enter a description..."
                autoSize={{ minRows: 7, maxRows: 8 }}
              />
            </Form.Item>

            {/* image  */}

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
                onChange={handleDonateImage}
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

            {/* Receive Percentage */}

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

            <Form.Item
              style={{ marginBottom: "0px" }}
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: "Please accept terms and condiction   ",
                },
              ]}
            >
              <Checkbox style={{ color: "#263234", fontSize: "14px" }}>
                I agree with Virtue Hope's{" "}
                <span
                  className=" underline "
                  onClick={opneModal}
                  style={{ color: "#263234" }}
                >
                  terms & conditions
                </span>
                .
              </Checkbox>
            </Form.Item>

            <Button
              loading={loading}
              style={{
                backgroundColor: "#403730",
                color: "white",
                border: "none",
                outline: "none",
                width: "171px",
                height: "44px",
                display: "block",
                margin: "10px 0px",
              }}
              htmlType="submit"
            >
              Submit my donation
            </Button>
          </Form>
        </div>

        <div className=" ">
          <Modal
            width={"70%"}
            open={openTermsModal}
            style={{ top: 0 }}
            // onOk={handleOk}
            onCancel={closeModal}
            footer={null} // remove if you want buttons
          >
            <AggrementPage></AggrementPage>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ContactFrom;

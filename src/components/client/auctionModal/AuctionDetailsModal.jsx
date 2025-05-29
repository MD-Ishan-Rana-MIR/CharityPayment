import ReCAPTCHA from "react-google-recaptcha";
import { Button, Form, Input, Select, Upload } from "antd";
import Dragger from "antd/es/upload/Dragger";
import Checkbox from "antd/es/checkbox/Checkbox";
import { useState } from "react";
import useAxiosPublic from "../../../pages/hooks/useAxiosPublic";
import { auctionMsg } from "../../../helper/auctionMsg";
import Swal from "sweetalert2";

const AuctionDetailsModal = ({
  setPersonalDetailsModal,
  setAuctionDetailsModal,
  setDonateTerm,
  isVerified,
  verified,
  setPaymentModal,
  auctionDetailsData,
  personalData,
  setUserDetailsModal,
}) => {
  const [fileList, setFileList] = useState(null); // To track the selected file
  const [form] = Form.useForm(); // Using Ant Design's Form hook

  const [donateFull, setDonateFull] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  function onChange(e) {
    isVerified(true);
  }
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async(values) => {
    const payload = {
      title: values.title,
      description: values.description,
      donate_share: values.donate_share,
      image: fileList[0]?.originFileObj,
    };
    console.log(values.donate_share);

    if (values.donate_share === "100") {
      // ✅ Direct API call
      const formData = new FormData();
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("donate_share", payload.donate_share);
      formData.append("image", payload.image);
      formData.append("name", personalData.name);
      formData.append("email", personalData.email);
      formData.append("contact_number", personalData.contact_number);
      formData.append("city", personalData.city);
      formData.append("address", personalData.address);
      formData.append("profile", personalData.profile);
      try {
        setLoading(true)
        const res = await axiosPublic.post(`/auction`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data?.success) {
          auctionMsg();
          setAuctionDetailsModal(false);
          setDonateFull(false);
          form.resetFields();
        }
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${error.response?.data?.message || "Upload failed!"}`,
          showConfirmButton: true,
          timer: 2000,
        });
      } finally {
        setLoading(false)
      }
    } else {
      // ✅ Partial donation → go to payment modal, API call later
      setAuctionDetailsModal(false);
      auctionDetailsData(payload); // Send to parent or save for next step
      setUserDetailsModal(true);
      setAuctionDetailsModal(false);
      form.resetFields()
    }
  };

  const openDonateTermModal = () => {
    setDonateTerm(true);
  };

  const cancelAuctionDetailsModal = () => {
    setAuctionDetailsModal(false);
    setPersonalDetailsModal(true);
    setUserDetailsModal(false)
    setDonateFull(false)
    form.resetFields();
  };

  return (
    <div>
      <div className="  ">
        <h1 className=" text-[#263234] font-semibold text-2xl leading-8 ">
          Auction details
        </h1>
        <div className=" flex items-center gap-2 mt-4  ">
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
                d="M8 18C8 17.4477 8.44772 17 9 17H15C15.5523 17 16 17.4477 16 18C16 18.5523 15.5523 19 15 19H9C8.44772 19 8 18.5523 8 18Z"
                fill="#F5851E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 22C9 21.4477 9.44772 21 10 21H14C14.5523 21 15 21.4477 15 22C15 22.5523 14.5523 23 14 23H10C9.44772 23 9 22.5523 9 22Z"
                fill="#F5851E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.05025 3.05025C8.36301 1.7375 10.1435 1 12 1C13.8565 1 15.637 1.7375 16.9497 3.05025C18.2605 4.36103 18.9978 6.13813 19 7.99162C19.0123 8.78605 18.8568 9.57416 18.5438 10.3045C18.2326 11.0306 17.7727 11.6833 17.1937 12.2206C16.5443 12.8733 16.2066 13.456 16.0735 14.1807C15.9738 14.7238 15.4525 15.0833 14.9093 14.9835C14.3662 14.8838 14.0067 14.3625 14.1065 13.8193C14.3324 12.589 14.9311 11.6547 15.7929 10.7929C15.8026 10.7831 15.8126 10.7736 15.8227 10.7643C16.2017 10.4154 16.5026 9.99017 16.7055 9.51666C16.9085 9.04315 17.0089 8.53205 17.0001 8.01696L17 8C17 6.67392 16.4732 5.40215 15.5355 4.46447C14.5979 3.52678 13.3261 3 12 3C10.6739 3 9.40215 3.52678 8.46447 4.46447C7.52678 5.40215 7 6.67392 7 8C7 8.79486 7.16385 9.74236 8.19272 10.7785C9.06407 11.5822 9.65861 12.6414 9.89067 13.8043C9.99874 14.3459 9.6473 14.8726 9.10569 14.9807C8.56409 15.0887 8.03741 14.7373 7.92933 14.1957C7.77899 13.4423 7.39218 12.7564 6.82519 12.238C6.8142 12.2279 6.80343 12.2176 6.79289 12.2071C5.29462 10.7088 5 9.20145 5 8C5 6.14348 5.7375 4.36301 7.05025 3.05025Z"
                fill="#F5851E"
              />
            </svg>
          </span>
          <div>
            <h1 className=" text-[16px] text-[#263234] leading-6 ">
              Please input your auction details to help buyer find out exactly
              their needs.
            </h1>
          </div>
        </div>
        {/* step */}
        <div>
          <p className=" text-[#263234] text-sm font-semibold mt-4 ">
            Step 1 of 2
          </p>
        </div>
        {/* step */}
        <div className="flex gap-3.5 mt-2.5 mb-6 ">
          <div className=" w-[33%] h-1.5 bg-[#457205] "></div>
          <div className=" w-[33%] h-1.5 bg-[#457205] "></div>
          <div className=" w-[33%] h-1.5 bg-[#E9EBEB] "></div>
        </div>

        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Auction title */}
          <Form.Item
            name="title"
            label="Auction title"
            style={{ marginBottom: "0px" }}
            rules={[{ required: true, message: "Please enter Auction title" }]}
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
          {/* Description */}
          <Form.Item
            style={{ marginBottom: "0px", marginTop: "8px" }}
            name="description"
            label="Item Description"
            rules={[
              {
                required: true,
                message: "Please enter the item description!",
              },
              {
                min: 6,
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
          {/* image  */}
          <Form.Item
            style={{ marginTop: "18px" }}
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            rules={[
              {
                required: true,
                message: "Please upload an image!",
              },
            ]}
          >
            <Upload.Dragger
              accept=".jpeg, .png, .jpg, .gif, .svg"
              beforeUpload={() => false} // Prevent automatic upload
              multiple={false}
              showUploadList={true}
              listType="picture"
              fileList={fileList}
              onChange={handleFileChange}
            >
              <div className="flex items-center gap-4 ">
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
                <p className="ant-upload-text">
                  Upload your photo of drag & drop here.
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

          {/* Terms Checkbox */}
          <Form.Item
            name="agreeTerms"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Checkbox>
              I agree with Virtue Hope's{" "}
              <span onClick={openDonateTermModal} className="underline">
                terms & conditions.
              </span>
            </Checkbox>
          </Form.Item>

          {/* captcha  */}
          <div className="   my-5 ">
            <Form.Item>
              <ReCAPTCHA
                sitekey="6Len-w8rAAAAAE68L5bXR-wOuwmID9i0xVW1Eqp1"
                onChange={onChange}
              />
            </Form.Item>
          </div>
          {/* Modal Buttons */}
          <div className=" flex flex-col md:flex-row md:justify-end justify-start  lg:flex-row  lg:justify-end mt-5 mb-2">
            <Button onClick={cancelAuctionDetailsModal} className="  navBtn1  ">
              Back
            </Button>
            <Button loading={loading} disabled={!verified} className="navBtn2" htmlType="submit">
              Proceed next step
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AuctionDetailsModal;

import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import {
  AppleOutlined,
  CreditCardOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import useAxiosPublic from "../../../pages/hooks/useAxiosPublic";
import { auctionMsg } from "../../../helper/auctionMsg";
import Swal from "sweetalert2";

const { Option } = Select;

const CardNumberModal = ({
  setAuctionDetailsModal,
  setPaymentModal,
  auctionData,
  personalData,
  setUserDetailsModal
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const name = personalData.name;
  const email = personalData.email;
  const contact_number = personalData.contact_number;
  const city = personalData.city;
  const address = personalData.address;
  const profile = personalData.profile;

  const title = auctionData.title;
  const description = auctionData.description;
  const image = auctionData.image;
  const donate_share = Number(auctionData.donate_share);
  const formData = new FormData();

  // const payload = {
  //   name,email,contact_number,city,address,photo,title,description,image,donate_share
  // }
  const axiosPublic = useAxiosPublic();
  const handleSubmit = async (values) => {
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact_number", contact_number);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("donate_share", Number(donate_share));
    formData.append("card_number", Number(values.card_number));
    formData.append("payment_type", values.payment_type);

    // Append photo (assuming it's a single image file)
    if (profile) {
      formData.append("profile", profile);
    }

    if (image) {
      formData.append("image", image); // only one image
    }

    try {
      setLoading(true)
      const res = await axiosPublic.post(`/auction`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success) {
        auctionMsg(); // Show toast or some custom alert
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.response?.data?.message || "Something went wrong!"}`,
        showConfirmButton: true,
        timer: 2500,
      });
    } finally {
      setLoading(false)
    }
    setPaymentModal(false)
    form.resetFields()
  };

  const backModal = () => {
    setUserDetailsModal(true);
    setPaymentModal(false);
  };

  return (
    <>
      <>
        <h1 className="text-[#263234] text-2xl font-semibold leading-8">
          Get paid
        </h1>
        <div className="flex items-center gap-2 mt-4">
          <div>
            {/* Payment Info Icon */}
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
                d="M8 18C8 17.4477 8.44772 17 9 17H15C15.5523 17 16 17.4477 16 18C16 18.5523 15.5523 19 15 19H9C8.44772 19 8 18.5523 8 18Z"
                fill="#F5851E"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 22C9 21.4477 9.44772 21 10 21H14C14.5523 21 15 21.4477 15 22C15 22.5523 14.5523 23 14 23H10C9.44772 23 9 22.5523 9 22Z"
                fill="#F5851E"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.05025 3.05025C8.36301 1.7375 10.1435 1 12 1C13.8565 1 15.637 1.7375 16.9497 3.05025C18.2605 4.36103 18.9978 6.13813 19 7.99162C19.0123 8.78605 18.8568 9.57416 18.5438 10.3045C18.2326 11.0306 17.7727 11.6833 17.1937 12.2206C16.5443 12.8733 16.2066 13.456 16.0735 14.1807C15.9738 14.7238 15.4525 15.0833 14.9093 14.9835C14.3662 14.8838 14.0067 14.3625 14.1065 13.8193C14.3324 12.589 14.9311 11.6547 15.7929 10.7929C15.8026 10.7831 15.8126 10.7736 15.8227 10.7643C16.2017 10.4154 16.5026 9.99017 16.7055 9.51666C16.9085 9.04315 17.0089 8.53205 17.0001 8.01696L17 8C17 6.67392 16.4732 5.40215 15.5355 4.46447C14.5979 3.52678 13.3261 3 12 3C10.6739 3 9.40215 3.52678 8.46447 4.46447C7.52678 5.40215 7 6.67392 7 8C7 8.79486 7.16385 9.74236 8.19272 10.7785C9.06407 11.5822 9.65861 12.6414 9.89067 13.8043C9.99874 14.3459 9.6473 14.8726 9.10569 14.9807C8.56409 15.0887 8.03741 14.7373 7.92933 14.1957C7.77899 13.4423 7.39218 12.7564 6.82519 12.238C6.8142 12.2279 6.80343 12.2176 6.79289 12.2071C5.29462 10.7088 5 9.20145 5 8C5 6.14348 5.7375 4.36301 7.05025 3.05025Z"
                fill="#F5851E"
              />
            </svg>
          </div>
          <div>
            <p className="text-[#263234]">
              Once your auction is sold out, you will get paid and donation
              amount will be funded to the Virtue Hope.
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div>
          <p className="text-[#263234] text-sm font-semibold mt-4">
            Step 3 of 3
          </p>
        </div>
        <div className="flex gap-3.5 mt-2.5 mb-6">
          <div className="w-[33%] h-1.5 bg-[#457205]"></div>
          <div className="w-[33%] h-1.5 bg-[#457205]"></div>
          <div className="w-[33%] h-1.5 bg-[#457205]"></div>
        </div>

        {/* Form Start */}
        <Form form={form} onFinish={handleSubmit} layout="vertical">


          {/* Payment Method */}
          <Form.Item
            name="payment_type"
            label={
              <span className="text-[#414651] text-[14px] font-medium">
                Choose a payment method
              </span>
            }
            rules={[
              { required: true, message: "Please select a payment method" },
            ]}
            style={{ marginBottom: "20px", marginTop: "12px" }}
          >
            <Select
              placeholder="Select Payment Method"
              bordered={false}
              style={{
                width: "100%",
                backgroundColor: "#f9f9f9",
                height: "45px",
                fontWeight: "500",
              }}
              className="shadow-sm hover:shadow-md focus:shadow-md transition-all"
            >
              <Option value="card">
                <CreditCardOutlined className="mr-2" /> Card
              </Option>
              <Option value="apple_pay">
                <AppleOutlined className="mr-2" /> Apple Pay
              </Option>
              <Option value="google_pay">
                <GoogleOutlined className="mr-2" /> Google Pay
              </Option>
              <Option value="paypal_pay">
                <span className="flex items-center gap-1">
                  {/* PayPal SVG included above */}
                  <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.9861 4.91069C16.0396 2.12819 13.7436 -0.0078125 10.5866 -0.0078125H4.05757C3.90538 -0.00776348 3.7582 0.0466044 3.64252 0.145507C3.52685 0.244409 3.45027 0.381351 3.42657 0.531687L0.810071 16.8797C0.798366 16.9538 0.802855 17.0295 0.823226 17.1017C0.843598 17.1738 0.879369 17.2407 0.928077 17.2978C0.976785 17.3548 1.03727 17.4006 1.10537 17.432C1.17348 17.4634 1.24758 17.4797 1.32257 17.4797H5.19107L4.58607 21.2657C4.57436 21.3398 4.57886 21.4156 4.59926 21.4878C4.61966 21.56 4.65548 21.6269 4.70424 21.684C4.753 21.741 4.81355 21.7868 4.88172 21.8181C4.94988 21.8495 5.02403 21.8657 5.09907 21.8657H8.25007C8.40257 21.8657 8.53807 21.8107 8.65357 21.7122C8.76907 21.6132 8.78807 21.4767 8.81157 21.3262L9.73657 15.8837C9.76007 15.7337 9.83657 15.5387 9.95257 15.4397C10.0681 15.3407 10.1691 15.2867 10.3211 15.2862H12.2501C15.3416 15.2862 17.9651 13.0892 18.4446 10.0327C18.7836 7.86269 17.8531 5.88919 15.9861 4.91069Z" fill="#001C64" />
                  </svg>

                  <span className=" font-semibold">PayPal</span>
                </span>
              </Option>
            </Select>
          </Form.Item>
          {/* Card Number */}
          <Form.Item
            name="card_number"
            label={
              <span className="text-[#414651] text-[14px] font-medium">
                Enter your card number
              </span>
            }
            rules={[{ required: true, message: "Card number is required" }]}
            style={{ marginBottom: "0px" }}
          >
            <Input
              className="py-3 px-4 placeholder:text-[16px] w-full"
              placeholder="Enter your card number"
              maxLength={19}
              style={{
                border: "1px solid #D5D7DA",
                outline: "none",
              }}
            />
          </Form.Item>

          {/* Buttons */}
          <div className="flex flex-col mt-4 lg:flex-row md:flex-row lg:justify-end lg:gap-8">
            <Button onClick={backModal} className="missionModalBtn1">
              Go Back
            </Button>
            <Button loading={loading} htmlType="submit" className="missionModalBtn2">
              Complete process
            </Button>
          </div>
        </Form>
      </>
    </>
  );
};

export default CardNumberModal;

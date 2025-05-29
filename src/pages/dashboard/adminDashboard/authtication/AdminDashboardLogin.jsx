import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePostLoginMutation } from "../../../../redux/dashboardFeatures/postLoginApi";
import toast from "react-hot-toast";

const AdminDashboardLogin = () => {
  const [postLogin, { isLoading, isError, isSuccess }] = usePostLoginMutation();
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = async (valus) => {
    const loginInfo = {
      email: valus.email,
      password: valus.password,
    };

    try {
      const res = await postLogin(loginInfo).unwrap();
      const token = res.data?.token;
      console.log(res);
      if (res.data?.token) {
        toast.success(res?.message);
        localStorage.setItem("admin_token", token);
        navigate("/admin/dashboard");
      }
    } catch (errors) {
      toast.error(errors.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#171F20] px-2 md:px-0">
      <div className="w-full max-w-[462px] mx-auto bg-[#263234] rounded-lg p-10 py-8">
        <div className="flex flex-col justify-center items-center">
          <img
            src="/dashboardPhoto/dashboardLoginLogo.png"
            alt="login logo"
            className="object-cover w-[30%]"
          />
          <h2 className="font-roboto  text-[#E9EBEB] text-[16px]">
            Virtue Hope
          </h2>
        </div>
        <div className="py-[24px]">
          <p className="font-roboto text-[24px] font-bold text-[#ffffff] ">
            Welcome back!
          </p>
        </div>

        <Form form={form} onFinish={onFinish}>
          <div>
            <p className="font-roboto font-bold text-[#E9EBEB] text-[16px]">
              Email
            </p>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Invalid email address!" },
              ]}
            >
              <Input
                id="email"
                placeholder="Enter your email"
                className="w-full  border p-2 rounded-md "
                style={{
                  backgroundColor: "transparent", color: "#ffffff",
                  caretColor: "white",
                }}

              />
            </Form.Item>
          </div>

          <div>
            <p className="font-roboto font-bold text-[#E9EBEB] text-[16px]">
              password
            </p>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="Enter your password"
                style={{
                  border: "1px solid #B6B6BA",
                  padding: "10px",
                  backgroundColor: "transparent",
                  color: "#ffffff",
                }}
              />
            </Form.Item>
          </div>

          <div className=" pb-2 pr-1">
            <Checkbox className="font-bold font-roboto text-[#E9EBEB]">
              Remember password
            </Checkbox>
          </div>

          {/* Submit Button */}
          <Form.Item>
            {/* <Button
              htmlType="submit"
              className="w-full hover:!bg-[#ffffff6e] hover:!text-[#ffffff] transition-all duration-300"
              style={{
                backgroundColor: "#ffffff",
                fontFamily: "Roboto",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "24px ",
                marginLeft: "0px",
              }}
            >
              Log in
            </Button> */}
            <button type="submit" className="w-full rounded-md bg-[#ffff] hover:bg-[#ffffff6e] " style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "16px",
              height: "40px",
              marginLeft: "0px",
            }}>
              Log in
            </button>
          </Form.Item>

          <Link to={"/admin/dashboard/forget-password"}>
            <h1 className="font-semibold font-roboto text-center underline text-[#ffffff]">
              Forgot password?
            </h1>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default AdminDashboardLogin;

import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router-dom";
import { usePostForgetPasswordMutation } from "../../../../redux/dashboardFeatures/postForgetPasswordApi";
import toast from "react-hot-toast";

const DashboardForgetPassword = () => {
  const [postForgetPassword] = usePostForgetPasswordMutation();
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      const res = await postForgetPassword({ email: value?.email }).unwrap();
      console.log(res);
      if (res.data) {
        toast.success(res?.message);
        form.resetFields();
        navigate(`/admin/dashboard/otp?email=${value?.email}`);
      }
    } catch (errors) {
      toast.error(errors?.data?.message);
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
            Forgot password
          </p>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} className="">
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
              id="forget_password_email"
                placeholder="Enter your email"
                className="w-full border border-gray-400 p-2 rounded-md"
              />
            </Form.Item>
          </div>
          {/* Submit Button */}
            <button type="submit" className="w-full rounded-md bg-[#ffff] hover:bg-[#ffffff6e] " style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "16px",
              height: "40px",
              marginLeft: "0px",
            }}>
              Get OTP
            </button>
          {/* </Link> */}
        </Form>
      </div>
    </div>
  );
};

export default DashboardForgetPassword;

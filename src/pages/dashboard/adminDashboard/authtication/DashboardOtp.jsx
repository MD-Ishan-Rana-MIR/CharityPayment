import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { usePostOtpMutation } from "../../../../redux/dashboardFeatures/postOtpApi";
import toast from "react-hot-toast";
import { usePostForgetPasswordMutation } from "../../../../redux/dashboardFeatures/postForgetPasswordApi";

const DashboardOtp = () => {
  const [postOtp] = usePostOtpMutation();
  const [postForgetPassword] = usePostForgetPasswordMutation();

  const [form] = useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchEmail = searchParams.get("email");


  const onFinish = async (value) => {

    try {
      const res = await postOtp({ otp: value.otp }).unwrap();
      const token = res.data?.token;
      console.log(res);
      if (res.data) {
        toast.success(res?.message);
        localStorage.setItem("admin_token", token);
        form.resetFields();
        navigate(`/admin/dashboard/create-new-password?email=${searchEmail}`);
      }
    } catch (errors) {
      toast.error(errors?.data?.message);
    }
  };




  // resent otp
  const handleResentOtp = async () => {
    try {
      const res = await postForgetPassword({ email: searchEmail }).unwrap();
      console.log(res);
      if (res.data) {
        toast.success(res?.message);
      }
    } catch (errors) {
      toast.error(errors?.data?.message);
    }
  }
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
            Enter the OTP
          </p>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div>
            <p className="font-roboto font-bold text-[#E9EBEB] text-[16px]">
              OTP code
            </p>
            <Form.Item
              name="otp"
              rules={[
                { required: true, message: "Please Enter your OTP!" },
                { pattern: /^[0-9]{4,6}$/, message: "Invalid OTP format!" }, // ✅ Ensures 4-6 digit number
              ]}
            >
              <Input
              id="dashboard_otp"
                type="text" // ✅ Use "text" instead of "number" to avoid auto-correction issues
                maxLength={6} // ✅ Limits OTP to 6 digits
                placeholder="Enter your OTP"
                style={{ border: "1px solid #B6B6BA", padding: "10px" }}
              />
            </Form.Item>
            <p
              onClick={handleResentOtp}
              className="cursor-pointer text-[#ffff] underline flex justify-end pb-6"
            >Resent otp</p>

          </div>
          {/* submit button */}
          <button type="submit" className="w-full rounded-md bg-[#ffff] hover:bg-[#ffffff6e] " style={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            fontSize: "16px",
            height: "40px",
            marginLeft: "0px",
          }}>
            Submit OTP
          </button>
        </Form>
      </div>
    </div>
  );
};

export default DashboardOtp;

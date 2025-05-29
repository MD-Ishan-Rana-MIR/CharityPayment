import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCreateNewPasswordMutation } from "../../../../redux/dashboardFeatures/postCreateNewPasswordApi";
import toast from "react-hot-toast";
import axios from "axios";

const DashboardCreateNewPassword = () => {
  const [createNewPassword] = useCreateNewPasswordMutation();
  const [form] = useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchEmail = searchParams.get("email");

  const onFinish = async (values) => {
    const updatePassword = {
      new_password: values.new_password,
      new_password_confirmation: values.new_password_confirmation,
      email: searchEmail,
    };


    try {
      const res = await createNewPassword(updatePassword).unwrap();
      console.log(res);

      if (res.data) {
        toast.success(res?.message);
        navigate("/admin/dashboard");
        form.resetFields();
      }
    } catch (error) {
      if(error){
        toast.error(error?.data?.message)
      }
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
            Create a new password
          </p>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} className="">
          <div>
            <p className="font-roboto font-bold text-[#E9EBEB] text-[16px]">
              New password
            </p>
            <Form.Item
              name="new_password"
              rules={[
                { required: true, message: "Please input your new password" },
              ]}
              hasFeedback
            >
              <Input.Password
              id="dashboard_new_password"
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

          <div>
            <p className="font-roboto font-bold text-[#E9EBEB] text-[16px]">
              Confirm new password
            </p>
            <Form.Item
              name="new_password_confirmation"
              dependencies={['new_password']}
              hasFeedback
              rules={[
                { required: true, message: "Please input your confirm new password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
              id="dashboard_password_confirmation"
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

          {/* Submit Button */}
          <button type="submit" className="w-full rounded-md bg-[#ffff] hover:bg-[#ffffff6e] " style={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            fontSize: "16px",
            height: "40px",
            marginLeft: "0px",
          }}>
            Save changes
          </button>
        </Form>
      </div>
    </div>
  );
};

export default DashboardCreateNewPassword;

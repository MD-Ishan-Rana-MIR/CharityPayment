import { Form, Input, Button, Upload, message } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../pages/hooks/useAxiosPublic";
import { imgUrl } from "../../../helper/imgUrl";

export default function UserForm({ updateProfileModal, setUpdateProfileModal }) {
  const axiosPublic = useAxiosPublic();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch user info (including image)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosPublic.get("/profile", config);
        const user = response.data?.data;


        form.setFieldsValue({
          full_name: user.full_name,
        });

        // Only set fileList if image exists
        if (user.image) {
          setFileList([
            {
              uid: "-1",
              name: "profile.jpg",
              status: "done",
              url: `${imgUrl}/${user.image}`, // must be accessible
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to load user info", err);
      }
    };

    fetchUserData();
  }, [form]);

  
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("full_name", values.full_name);

      const file = fileList[0];
      if (file?.originFileObj) {
        formData.append("image", file.originFileObj);
      }

      await axiosPublic.post("/update-profile?_method=PUT", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success("User information submitted successfully!");
      form.resetFields();
      setFileList([]);
      setUpdateProfileModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = updateProfileModal ? "hidden" : "auto";
  }, [updateProfileModal]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">User Information</h2>

      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Enter your full name"
            className="py-2"
          />
        </Form.Item>

        <Form.Item label="Upload Image" name="image">
          <Upload.Dragger
            name="image"
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
          >
            <Button
              icon={<UploadOutlined />}
              className="flex items-center bg-btnColor text-white font-semibold px-4 py-2 rounded-lg"
            >
              Upload Image
            </Button>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="lg:w-full bg-btnColor border-none h-11 font-semibold text-white rounded-lg"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

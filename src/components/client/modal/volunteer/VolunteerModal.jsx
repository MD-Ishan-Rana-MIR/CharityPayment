import { Alert, Form } from "antd";
import React, { useState } from "react";
import { Modal, Input, Button, Checkbox, Upload, Radio } from "antd";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../pages/hooks/useAxiosPublic";
import Swal from "sweetalert2";
const { Dragger } = Upload;

const VolunteerModal = ({ setIsVolunterModal, setGeneralTerm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();
  const closeVolunteerModal = () => {
    setIsVolunterModal(false);
  };

  const openGeneralTermModal = () => {
    setGeneralTerm(true);
  };

  const [fileList, setFileList] = useState([]);

  // Handle file change (dragging or selecting a file)
  const handleFileChange = (info) => {
    let files = [...info.fileList];
    setFileList(files);
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Append form fields to formData
    for (let key in values) {
      formData.append(key, values[key]);
    }

    // Append each file from fileList
    fileList.forEach((file) => {
      formData.append("upload_cv", file.originFileObj);
    });

    

    try {
      setLoading(true);
      const res = await axiosPublic.post("/create-volunteer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res)
      if (res.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `<h1>Application submitted successfully.</h1>`,
          text: "Your application is in under review. Once we’re done, will notify you via email that you have provided. Get in touch with us. Thanks.",
          showConfirmButton: false,
          timer: 2500,
        });
        return setIsVolunterModal(false);
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  {
    error && (
      <Alert
        message={error}
        type="error"
        showIcon
        closable
        onClose={() => setError(null)}
        className="mb-4"
      />
    );
  }

  return (
    <div>
      <h1 className="text-[#263234] font-semibold leading-8 text-3xl mb-6">
        Get Involved as a Volunteer
      </h1>

      <Form layout="vertical" onFinish={handleSubmit}>
        {/* Name Field */}
        <Form.Item
          style={{ marginBottom: "0px" }}
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please input your name!" },
            { min: 6, message: "Name must be at least 6 characters!" },
          ]}
        >
          <Input
            style={{
              border: "1px solid #A6ABAC",
              padding: "10px 14px",
              lineHeight: "24px",
              fontSize: "16px",
            }}
            placeholder="Enter your name"
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          style={{ marginBottom: "0px" }}
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Enter a valid email!" },
          ]}
        >
          <Input
            style={{
              border: "1px solid #A6ABAC",
              padding: "10px 14px",
            }}
            type="email"
            placeholder="Enter your email address"
          />
        </Form.Item>

        {/* Contact Number Field */}
        <Form.Item
          style={{ marginBottom: "0px" }}
          name="contact_number"
          label="Contact number"
          rules={[
            { required: true, message: "Please input your contact number!" },
          ]}
        >
          <Input
            style={{
              border: "1px solid #A6ABAC",
              padding: "10px 14px",
              lineHeight: "24px",
              fontSize: "16px",
            }}
            placeholder="Enter your contact number"
          />
        </Form.Item>

        {/* Location Field */}
        <Form.Item
          style={{ marginBottom: "0px" }}
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please input your location!" }]}
        >
          <Input
            style={{
              border: "1px solid #A6ABAC",
              padding: "10px 14px",
              lineHeight: "24px",
              fontSize: "16px",
            }}
            placeholder="Street, City name & State name"
          />
        </Form.Item>

        {/* Why Volunteer Field */}
        <Form.Item
          style={{ marginBottom: "0px" }}
          name="reason"
          label="Why do you want to be a Volunteer"
          rules={[
            {
              required: true,
              message: "Please input why you want to be a volunteer!",
            },
            { min: 6, message: "Description must be at least 6 characters!" },
          ]}
        >
          <Input.TextArea
            style={{
              border: "1px solid #A6ABAC",
              padding: "10px 14px",
              lineHeight: "24px",
              fontSize: "16px",
            }}
            placeholder="Enter a description..."
            rows={4}
          />
        </Form.Item>

        {/* File Upload Field */}
        <Form.Item
          style={{ marginBottom: "0px" }}
          name="upload_cv"
          label="Upload your CV"
          rules={[{ required: true, message: "Please Upload your CV!" }]}
        >
          <Upload.Dragger
            accept=".doc,.docx,.pdf,.jpg,.jpeg,.png"
            style={{ border: "2px dotted #E9EBEB" }}
            beforeUpload={() => false} // Prevent auto upload
            onChange={handleFileChange}
            listType="picture"
          >
            <div className="text-start">
              <p className="ant-upload-drag-icon">
                <span>{/* SVG Icon here */}</span>
              </p>
              <p className="ant-upload-text text-[#263234] font-semibold text-[16px] mb-1">
                Click or drag file to this area to upload
              </p>
              <p className="text-sm text-[#4B5557] leading-5 mt-2 mb-6">
                Supported format: JPG, JPEG, PNG, PDF
              </p>
            </div>
          </Upload.Dragger>
        </Form.Item>

        {/* Terms & Conditions Checkbox */}
        <Form.Item
          name="termsAndConditions"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: "Please accept the terms and conditions!",
            },
          ]}
        >
          <Checkbox>
            I agree with Virtue Hope's{" "}
            <Link onClick={openGeneralTermModal} className="underline">
              terms & conditions.
            </Link>
          </Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <div className="flex flex-col md:flex-row md:justify-end justify-start lg:flex-row lg:justify-end mt-5 mb-2">
          <Button onClick={closeVolunteerModal} className="navBtn1">
            Cancel
          </Button>
          <Button loading = {loading} htmlType="submit" className="navBtn2">
            Apply now
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default VolunteerModal;

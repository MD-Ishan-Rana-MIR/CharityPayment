import { Form } from "antd";
import { Modal, Input, Button, Checkbox, Upload, Radio } from "antd";

const DonerDetailsModal = ({setDonerDetailsModal,setModalOpen}) => {
  const [form] =Form.useForm()
  const handleSubmit = (values)=>{
    console.log(values);
    form.resetFields()
    setDonerDetailsModal(false)
    setModalOpen(true)
  }

  const closeDonerDetailsModal = () => {
    setDonerDetailsModal(false);
    form.resetFields()
  };


  return (
    <div>
      <h1 className=" text-[#263234] font-semibold leading-8 text-3xl mb-6  ">
        
      </h1>

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        {/* Name Field */}
        <Form.Item
          style={{ marginBottom: "0px" }}
          name="name"
          label={
            <span className="block! text-sm! font-medium! text-[#263234]! leading-5! ">
              {" "}
              Name{" "}
            </span>
          }
          // rules={[
          //   { required: true, message: "Please input your name!" },
          //   { min: 6, message: "Name must be at least 6 characters!" },
          // ]}
        >
          <div className="mb-2">
            <Input
              style={{
                border: "1px solid #A6ABAC  ",
                padding: "10px 14px ",
                lineHeight: "24px",
                fontSize: "16px",
              }}
              placeholder="Enter your name"
            />
          </div>
        </Form.Item>

        {/* Email Field */}

        <Form.Item
          style={{ marginBottom: "0px" }}
          label={
            <span className="block! text-sm! font-medium! text-[#263234]! leading-5! ">
              Email
            </span>
          }
          name="email"
          // rules={[
          //   { required: true, message: "Please input your email!" },
          //   { type: "email", message: "Enter a valid email!" },
          // ]}
        >
          <div className="mb-2">
            <Input
              style={{
                border: "1px solid #A6ABAC  ",
                padding: "10px 14px ",
              }}
              type="email"
              placeholder="Enter your email address"
            />
          </div>
        </Form.Item>

        {/* Contact Number Field */}

        <Form.Item
          style={{ marginBottom: "0px" }}
          label={
            <span className="block! text-sm! font-medium! text-[#263234]! leading-5! ">
              Contact number
            </span>
          }
          name="contactNumber"
          
        >
          <div className="mb-2">
            <Input
              style={{
                border: "1px solid #A6ABAC  ",
                padding: "10px 14px ",
                lineHeight: "24px",
                fontSize: "16px",
              }}
              placeholder="Enter your contact number"
            />
          </div>
        </Form.Item>

        

        {/* message*/}
        <Form.Item
          style={{ marginBottom: "0px" }}
          label={
            <span className="block! text-sm! font-medium! text-[#263234]! leading-5! ">
              Message
            </span>
          }
          name="description"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter your message!",
          //   },
          //   {
          //     min: 6,
          //     message: "Description must be at least 6 characters!",
          //   },
          // ]}
        >
          <div className="mb-2">
            <Input.TextArea
              style={{
                border: "1px solid #A6ABAC  ",
                padding: "10px 14px ",
                lineHeight: "24px",
                fontSize: "16px",
              }}
              placeholder="Enter a description..."
              rows={4}
            />
          </div>
        </Form.Item>

        {/* Modal Buttons */}

        <div className=" flex flex-col md:flex-row md:justify-end justify-start  lg:flex-row  lg:justify-end mt-5 mb-2">
          <Button onClick={closeDonerDetailsModal} className="  navBtn1  ">
            Cancel
          </Button>
          <Button htmlType="submit" className="navBtn2">
            Apply now
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DonerDetailsModal;

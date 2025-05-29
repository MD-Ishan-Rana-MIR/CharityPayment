import { Button, Divider, Form, Radio } from "antd";

const SupportModal = ({
  setSupportModal,
  setPaymentModal,
  setAntiquesModal,
}) => {
  const [form] = Form.useForm();

  //   open payment modal

  const openPaymentModal = () => {
    setPaymentModal(true);
    setSupportModal(false);
    console.log(`open payment modal`);
  };

  //  open Donate Art, Antique or Collectables

  const openArtAntiqueModal = ()=>{
    setAntiquesModal(true)
    setSupportModal(false);
  }

  return (
    <div>
      <Form form={form} layout="vertical">
        <Form.Item name="donation">
          <Radio.Group onChange={"handlePaymentChange"} className="w-full">
            <div className="flex flex-col gap-4">
              <Radio
                onClick={openPaymentModal}
                value="support"
                className="flex items-center pl-2 py-3.5! h-[54px] px-2! justify-between w-full  border border-[#A6ABAC] rounded-lg cursor-pointer"
              >
                <span className="text-[#263234] font-medium">Donate Money</span>
              </Radio>

              {/* Divider */}
              <Divider style={{ borderColor: "#A6ABAC", margin: "20px 0" }}>
                Or
              </Divider>

              {/* Luxurious Retreat Option */}
              <Radio
                onClick={openArtAntiqueModal}
                value="antique"
                className="flex items-center pl-2 py-3.5! h-[54px] px-2! justify-between w-full  border border-[#A6ABAC] rounded-lg cursor-pointer"
              >
                <span className="text-[#263234] font-medium">
                  Donate Art, Antique or Collectables
                </span>
              </Radio>
            </div>
          </Radio.Group>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SupportModal;

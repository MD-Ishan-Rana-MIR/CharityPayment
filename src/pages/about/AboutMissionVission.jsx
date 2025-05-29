import React, { useState, useEffect } from "react";
import { Modal, Form } from "antd";

import AggrementPage from "../aggrement/AggrementPage";
import ArtAntiqModal from "../../components/client/modal/art-antique/ArtAntiqModal";
import VolunteerModal from "../../components/client/modal/volunteer/VolunteerModal";
import DonateModal from "../../components/client/modal/donate/DonateModal";
import PaymentModal from "../../components/client/modal/payment/PaymentModal";
import DonerDetailsModal from "../../components/client/modal/doner-details/DonerDetailsModal";
import SupportModal from "../../components/client/modal/support-modal/SupportModal";
import GeneralTermCondictionModal from "../../components/client/GeneralTermCondictionModal/GeneralTermCondictionModal";
const AboutMissionVission = () => {
  // donate modal  terms & conditions. start

  // general  terms & conditions. modal start
  const [generalTerm, setGeneralTerm] = useState(false);

  const closeGeneralTermModal = () => {
    setGeneralTerm(false);
  };

  // general  terms & conditions. modal end

  // donate modal  terms & conditions. end

  // Donate Art, Antique or Collectables modal  terms & conditions. start

  const [donateTerm, setDonateTerm] = useState(false);

  const donateModalCanel = () => {
    setDonateTerm(false);
  };

  // Donate Art, Antique or Collectables modal  terms & conditions. end

  // doner details modal end

  // volunter modal useState
  const [supportModal, setSupportModal] = useState(false);
  // payment modal useState
  const [paymentModal, setPaymentModal] = useState(false);
  /* Donate Art, Antiques or Collectible useState   */
  const [antiquesModal, setAntiquesModal] = useState(false);

  // support modal start
  const openSupportModal = () => {
    setSupportModal(true);
  };
  const closeSupportModal = () => {
    setSupportModal(false);
  };

  // support modal end

  // volunter modal start
  const [isVolunterModal, setIsVolunterModal] = useState(false);
  const openVolunterModal = () => {
    setIsVolunterModal(true);
  };

  useEffect(() => {
    document.body.style.overflow =
      supportModal || paymentModal || antiquesModal || isVolunterModal
        ? "hidden"
        : "auto";
  }, [supportModal, paymentModal, antiquesModal, isVolunterModal]);

  return (
    <div className="  p-4 bg-[#ecebea]  ">
      <div className=" max-w-[1480px] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side - Image */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full z-0"></div>
            <img
              src="/img-2.png"
              alt="Supportive Women"
              className="relative z-10 w-full h-auto object-cover"
            />
          </div>

          {/* Right Side - Text */}
          <div className="bg-white shadow lg:pt-[127px] lg:px-[64px] p-4 rounded-2xl">
            <h3 className="lg:text-3xl text-xl font-thin text-[#403730]">
              Our mission & vision
            </h3>
            <h1 className="font-bold text-[#403730] text-3xl lg:text-[60px] leading-[60px] lg:mt-2">
              Healing Support for Women Survivors of Abuse and Trauma
            </h1>
            <p className="text-[#263234] pt-2 lg:pt-6 lg:pb-12 pb-6 leading-6 ">
              Hope is our purpose. Every action we take at Virtue Hope is driven
              by belief that healing begins with hope.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={openSupportModal}
                className="bg-[#403730] cursor-pointer text-white py-3 px-6 rounded-md font-medium hover:bg-[#2E2A26]"
              >
                Support survivors
              </button>
              <button
                onClick={openVolunterModal}
                className="bg-[#F6F6F7] cursor-pointer text-gray-800 py-3 ml-4 px-6 rounded-md font-bold"
              >
                Join our enthusiastic team
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* support modal start  */}

      <Modal
        title={
          <span className=" text-2xl mb-4 text-[#263234] font-semibold leading-8 block ">
            Choose How to Support
          </span>
        }
        open={supportModal}
        footer={null}
        closable={true}
        onCancel={closeSupportModal}
        centered
        width="500px"
        style={{ top: "0px" }}
      >
        <SupportModal
          setPaymentModal={setPaymentModal}
          setSupportModal={setSupportModal}
          setAntiquesModal={setAntiquesModal}
        />
      </Modal>

      {/* support modal end  */}

      {/* Payment Modal start */}

      <Modal
        open={paymentModal}
        footer={null}
        closable={false}
        centered
        width="400px"
        style={{ padding: "15px", top: 0 }}
      >
        <PaymentModal
          setPaymentModal={setPaymentModal}
          setSupportModal={setSupportModal}
        />
      </Modal>

      {/* Payment Modal end */}

      {/* Donate Art, Antiques or Collectibles modal start */}

      <Modal
        open={antiquesModal}
        footer={null}
        closable={false}
        centered
        // width="400px"
        style={{ padding: "15px", top: 0 }}
      >
        <ArtAntiqModal
          setSupportModal={setSupportModal}
          setAntiquesModal={setAntiquesModal}
          setPaymentModal={setPaymentModal}
          setDonateTerm={setDonateTerm}
        />
      </Modal>

      {/* Donate Art, Antiques or Collectibles modal end */}

      {/* start  Volunter Modal */}

      <div className=" w-[600px]  z-50 ">
        <Modal
          visible={isVolunterModal}
          footer={null}
          width={500}
          height={800}
          // bodyStyle={{ padding: "20px" }}
          destroyOnClose
          closable={false}
          style={{ top: 0 }}
        >
          <VolunteerModal
            setIsVolunterModal={setIsVolunterModal}
            setGeneralTerm={setGeneralTerm}
          />
        </Modal>
      </div>

      {/* end   Volunter Modal*/}

      {/* volunter general term and condiction modal start  */}
      <div className=" ">
        <Modal
          width={"80%"}
          open={generalTerm}
          style={{ top: 0 }}
          onCancel={closeGeneralTermModal}
          footer={null}
          zIndex={1100}
        >
          <GeneralTermCondictionModal/>
        </Modal>
      </div>
      {/* volunter general term and condiction modal end  */}

      {/* Donate Art, Antique or Collectables  Terms & Conditions modal start */}

      <div className=" ">
        <Modal
          width={"70%"}
          className="  "
          open={donateTerm}
          style={{ top: 0 }}
          // onOk={handleOk}
          onCancel={donateModalCanel}
          footer={null} // remove if you want buttons
          zIndex={1100} // higher z-index
        >
          {/* DonerDetailsModa */}
          <AggrementPage></AggrementPage>
        </Modal>
      </div>

      {/* Donate Art, Antique or Collectables  Terms & Conditions modal end */}
    </div>
  );
};

export default AboutMissionVission;

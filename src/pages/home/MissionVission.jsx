import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";

import AggrementPage from "../aggrement/AggrementPage";
import VolunteerModal from "../../components/client/modal/volunteer/VolunteerModal";
import ArtAntiqModal from "../../components/client/modal/art-antique/ArtAntiqModal";
import PaymentModal from "../../components/client/modal/payment/PaymentModal";
import SupportModal from "../../components/client/modal/support-modal/SupportModal";
import GeneralTermCondictionModal from "../../components/client/GeneralTermCondictionModal/GeneralTermCondictionModal";

export const MissionVission = () => {
  // general  terms & conditions. modal start
  const [generalTerm, setGeneralTerm] = useState(false);

  const closeGeneralTermModal = () => {
    setGeneralTerm(false);
  };

  // general  terms & conditions. modal end

  // Donate Art, Antique or Collectables modal  terms & conditions. start

  const [donateTerm, setDonateTerm] = useState(false);

  const donateModalCanel = () => {
    setDonateTerm(false);
  };

  // Donate Art, Antique or Collectables modal  terms & conditions. end

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
    <div>
      <div className="py-5 px-4 max-w-[1512px] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side - Image */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <img
              src="/img-2.png"
              alt="Supportive Women"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Side - Text */}
          <div className="bg-white shadow lg:pt-[127px] lg:px-[64px] p-4 rounded-2xl">
            <h3 className="lg:text-3xl text-xl font-thin text-[#403730]">
              Our mission & vision
            </h3>
            <h1 className="font-bold text-[#403730] lg:leading-[65px] text-3xl lg:text-[60px] lg:mt-2">
              Healing Support for Women Survivors of Abuse and Trauma
            </h1>
            <p className="text-[#263234] pt-2 lg:pt-6 lg:pb-12 pb-0 leading-6">
              Hope is our purpose. Every action we take at Virtue Hope is driven
              by belief that healing begins with hope.
            </p>

            {/* Buttons */}
            <div className="lg:mt-6 mt-3 flex flex-col lg:flex-row  md:flex-row   lg:gap-4">
              <Button
                onClick={openSupportModal}
                className=" homeBtn supportBtn "
              >
                Support survivors
              </Button>

              <Button onClick={openVolunterModal} className="volunteerBtn ">
                Join our enthusiastic team{" "}
              </Button>
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
            <VolunteerModal setIsVolunterModal={setIsVolunterModal} setGeneralTerm = {setGeneralTerm} />
          </Modal>
        </div>

        {/* end   Volunter Modal*/}
      </div>

      {/* Volunter modal terms conditions start   */}

      <div className=" ">
        <Modal
          width={"70%"}
          open={generalTerm}
          style={{ top: 0 }}
          onCancel={closeGeneralTermModal}
          footer={null}
          zIndex={1100}
        >
          <GeneralTermCondictionModal />
        </Modal>
      </div>
      {/* Volunter modal terms conditions end   */}

      {/* Donate Art, Antique or Collectables  Terms & Conditions modal start */}

      <div className=" ">
        <Modal
          width={"70%"}
          open={donateTerm}
          style={{ top: 0 }}
          onCancel={donateModalCanel}
          footer={null}
          zIndex={1100}
        >
          <AggrementPage></AggrementPage>
        </Modal>
      </div>

      {/* Donate Art, Antique or Collectables  Terms & Conditions modal end */}
    </div>
  );
};

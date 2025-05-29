import { Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import PersonalDetailModal from "../../components/client/auctionModal/PersonalDetailModal";
import AuctionDetailsModal from "../../components/client/auctionModal/AuctionDetailsModal";
import AggrementPage from "../aggrement/AggrementPage";
import CardNumberModal from "../../components/client/auctionModal/CardNumberModal";
import UserDetailsModal from "../../components/client/auctionModal/UserDetailsModal";

const AuctionBanner = () => {
  const [personalData, setPersonalData] = useState(null);
  const [auctionData, setAuctionData] = useState(null);

  const [auctionDetailsModal, setAuctionDetailsModal] = useState(false);
  const [personalDetailsModal, setPersonalDetailsModal] = useState(false);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);

  const [donateTerm, setDonateTerm] = useState(false);

  const donateModalCanel = () => {
    setDonateTerm(false);
  };

  const [form] = Form.useForm();

  const [verified, isVerified] = useState(false);

  const donateFull = Form.useWatch("donateFull", form);

  console.log("form auction detail page", !donateFull);

  // 2nd modal end

  // 3rd modal start

  // 3rd modal end

  // 1st 2nd 3rd modal overflow hidden start

  useEffect(() => {
    document.body.style.overflow =
      auctionDetailsModal || personalDetailsModal || paymentModal || userDetailsModal
        ? "hidden"
        : "auto";
  }, [auctionDetailsModal, personalDetailsModal, paymentModal,userDetailsModal]);

  return (
    <>
      <div className="pt-20  ">
        <div className="relative w-full h-[50vh] lg:h-[90vh]  bg-[url('/auctionBg-img.jpg')] bg-cover bg-center flex items-center">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Content */}
          <div className="relative  lg:mt-48 z-10 w-full max-w-7xl  mx-auto px-4 flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Heading */}
            <h1 className="text-[#ECEBEA]  text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Empower women to <br />
              <span className="font-bold">buy & list your</span> <br />
              auctions
            </h1>

            {/* Button */}
            <button
              onClick={() => {
                setPersonalDetailsModal(true);
              }}
              className="mt-4 sm:mt-6 cursor-pointer text-[#403730] bg-[#FFFFFF] font-bold text-sm sm:text-base hover:bg-[#403730] hover:text-white transition-all duration-500 rounded px-6 py-2.5"
            >
              Contribute your Auction
            </button>
          </div>
        </div>
      </div>
      {/* 1st slider modal  */}

      {/* first Modal Personal Details start */}

      <div className=" ">
        <Modal
          centered
          open={personalDetailsModal}
          closable={false}
          footer={null}
          width={600}
        >
          <PersonalDetailModal
            setPersonalDetailsModal={setPersonalDetailsModal}
            setAuctionDetailsModal={setAuctionDetailsModal}
            sendPersonalDataToParent={setPersonalData}
          />
        </Modal>
      </div>

      {/* First Modal Personal Details end  */}

      {/*  Second Modal Auction Details start */}
      <Modal
        centered
        open={auctionDetailsModal}
        closable={false} // Removes close (X) icon
        width={600}
        footer={null}
      >
        <AuctionDetailsModal
          setPersonalDetailsModal={setPersonalDetailsModal}
          setAuctionDetailsModal={setAuctionDetailsModal}
          setDonateTerm={setDonateTerm}
          isVerified={isVerified}
          verified={verified}
          donateFull={donateFull}
          setPaymentModal={setPaymentModal}
          auctionDetailsData={setAuctionData}
          personalData={personalData}
          setUserDetailsModal={setUserDetailsModal}
        />
      </Modal>
      {/* Second Modal Auction Details end */}

      {/* user details modal start  */}

      <Modal
        centered
        open={userDetailsModal}
        closable={false} // Removes close (X) icon
        width={600}
        footer={null}
      >
        <UserDetailsModal
          
          personalData={personalData}
          auctionData={auctionData}
          setUserDetailsModal = {setUserDetailsModal}
          setPaymentModal = {setPaymentModal}
          setAuctionDetailsModal = {setAuctionDetailsModal}
        />
      </Modal>

      {/* user details modal end  */}

      {/* Third Modal Payment modal start  */}

      {!donateFull && (
        <Modal
          title=""
          open={paymentModal}
          // onCancel={handleCancel}
          footer={null}
          width={400}
          closable={false}
        >
          <CardNumberModal
            setAuctionDetailsModal={setAuctionDetailsModal}
            setPaymentModal={setPaymentModal}
            personalData={personalData}
            auctionData={auctionData}
            setUserDetailsModal = {setUserDetailsModal}
          />
        </Modal>
      )}

      <div className=" ">
        <Modal
          width={"70%"}
          open={donateTerm}
          style={{ top: 0 }}
          zIndex={1100}
          onCancel={donateModalCanel}
          footer={null} // remove if you want buttons
        >
          <AggrementPage></AggrementPage>
        </Modal>
      </div>
    </>
  );
};

export default AuctionBanner;

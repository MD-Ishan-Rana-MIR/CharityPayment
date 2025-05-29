
import React, { useState } from "react";

const AggrementPage = () => {
  const [verified, isVerified] = useState(false);

  function onChange(value) {
    console.log("Captcha value:", value);
    isVerified(true);
    form.resetFields();
  }
  const [donateAll, setDonateAll] = useState(false);

  const onFinish = (values) => {
    console.log("Form values:", values);
  };
  return (
    <div className="   ">
      <div className=" lg:max-w-[1216px] mx-auto pb-4 lg:px-4">
        <p className="text-center text-[#403730] text-[16px] lg:text-xl font-semibold leading-6 ">
          Virtue Hope C.I.C. Donor Agreement
        </p>
        <p className="text-center text-[#263234] mt-1 lg:mt-3  lg:text-xl lg:leading-8 ">
          Registered Company No.: 16173113
        </p>
        <p className="text-center text-[#263234] mt-1 lg:mt-3  lg:text-xl lg:leading-8 ">
          Registered Office: 86-90 Paul Street, London, EC2A 4NE
        </p>

        <p className="text-center text-[#263234] mt-1 lg:mt-3 lg:text-xl lg:leading-8 ">
          Email: give@virtuehope.com
        </p>

        {/*1 Introduction */}

        <div>
          <p className=" font-semibold text-[16px] lg:text-2xl leading-9 mt-3 lg:mt-12 ">
            1. Introduction
          </p>
          <span className=" text-[#263234] lg:text-start text-justify lg:leading-8 lg:text-xl  lg:mt-5 block ">
            This Donor Agreement (“Agreement”) is made between the individual or
            organisation named below (“Donor”) and Virtue Hope C.I.C. (“Virtue
            Hope”), a Community Interest Company registered in England and
            Wales. By submitting an item to Virtue Hope for the purpose of
            resale or auction, you agree to the terms and conditions outlined in
            this Agreement.
          </span>
        </div>

        {/* 2. Donation Purpose */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-[16px] lg:text-2xl leading-9 lg:mt-12 ">
            2. Donation Purpose
          </p>

          <span className=" text-[#263234] lg:leading-8  lg:text-xl block lg:mt-5 ">
            All proceeds generated from the sale of donated items support Virtue
            Hope’s mission: to provide healing, empowerment, and wellbeing
            retreats for women recovering from abuse and trauma.
          </span>
        </div>

        {/* 3. Item Ownership and Authenticity */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-[16px] lg:text-2xl leading-9 lg:mt-12 ">
            3. Item Ownership and Authenticity
          </p>

          <ul className=" list-disc ml-5 text-[#263234] text-justify lg:leading-8 lg:text-xl block lg:mt-5 ">
            <li className="  ">
              The Donor affirms that they are the legal owner of the item(s)
              donated and have the right to donate it.
            </li>
            <li>
              The item is not under any lien, dispute, or third-party claim.
            </li>
            <li>
              Donor grants Virtue Hope full rights to display, photograph,
              market, and sell the item.
            </li>
            <li>
              Where applicable, the Donor agrees to provide background
              information, provenance, or certificates of authenticity.
            </li>
          </ul>
        </div>

        {/* 4. Revenue Share */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-[16px] lg:text-2xl leading-9 lg:mt-12">
            {" "}
            4. Revenue Share
          </p>

          <p className="text-[#263234] text-[16px] lg:text-xl leading-8 font-semibold lg:my-5 ">
            Upon successful sale of the donated item:
          </p>

          <ul className=" list-disc ml-5 text-[#263234] text-justify lg:text-start lg:leading-8 lg:text-xl block lg:mt-5  ">
            <li className="  ">Virtue Hope retains 70% of the net proceeds.</li>
            <li>
              Donor receives up to 30%, depending on the selection made at the
              time of submission.
            </li>
            <li>
              “Net proceeds” refer to the final sale price minus auction fees,
              commissions, delivery/shipping costs, and any applicable
              transaction fees.
            </li>
          </ul>
          <p className="text-[#263234] text-[16px] lg:text-xl lg:leading-8 lg:mt-7 mt-2 ">
            <span className="text-black font-semibold ">Note: </span>
            The final sale price may differ from the Donor’s estimated or
            perceived value. Sale outcomes are market-driven and cannot be
            guaranteed.
          </p>
        </div>

        {/* 5. Sale Disclaimer */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-[16px] lg:text-2xl leading-9 lg:mt-12">
            {" "}
            5. Sale Disclaimer
          </p>

          <ul className=" list-disc ml-5 text-[#263234]  lg:leading-8 text-justify lg:text-start lg:text-xl block lg:mt-5 ">
            <li>Submission of an item does not guarantee a sale.</li>
            <li>
              Virtue Hope reserves the right to decline or postpone the sale of
              any item at its discretion.
            </li>
            <li>Unsold items may, upon agreement, be:</li>
            <li>Returned to the Donor at their expense, or</li>
            <li>Held for future sale or auction.</li>
          </ul>
        </div>

        {/* 6. Item Condition */}

        <div className="mt-2 lg:mt-12">
          <p className="font-semibold text-[16px] lg:text-2xl leading-9 lg:mt-12">
            6. Item Condition
          </p>
          <p className="text-[#263234] text-[16px] lg:text-xl leading-8 font-semibold lg:my-5  ">
            All items must be:
          </p>

          <ul className=" list-disc ml-5 text-[#263234]  lg:leading-8 text-justify lg:text-start lg:text-xl block lg:mt-5 ">
            <li> In good, presentable showroom condition</li>
            <li> Free from major damage, stains, or structural flaws</li>
            <li> Clean and suitable for direct display or resale</li>
          </ul>
          <p className="text-[#263234] text-[16px] lg:text-xl lg:leading-8 lg:mt-7">
            Virtue Hope reserves the right to refuse any item that does not meet
            these requirements.
          </p>
        </div>

        {/* 7. Shipping Terms */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-[16px] lg:text-2xl lg:leading-9 lg:mt-12 ">
            7. Shipping Terms
          </p>

          <ul className=" list-disc ml-5 text-[#263234] text-justify my-2 lg:text-start  lg:leading-8 lg:text-xl block lg:mt-5 ">
            <li>
              Donors are responsible for shipping the item(s) to Virtue Hope or
              its designated third-party vendor (e.g., auction house).
            </li>
            <li>
              Shipping details will be provided by Virtue Hope once the item is
              approved.
            </li>
            <li>Reimbursement:</li>

            <li>
              Virtue Hope agrees to reimburse reasonable shipping costs,
              provided:
            </li>
            <li>Pre-approval was given</li>

            <li>Proof of postage and receipt is submitted</li>

            <li>Item is received in acceptable condition</li>

            <li>
              Reimbursement may occur after sale or upon receipt, as mutually
              agreed
            </li>

            <li>
              For high-value items, Virtue Hope may provide prepaid shipping
              labels upon request and approval.
            </li>
          </ul>
        </div>

        {/* 8. Liability */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-[16px] lg:text-2xl leading-9 lg:mt-12  ">
            {" "}
            8. Intellectual Property
          </p>

          <ul className=" list-disc ml-5 text-[#263234]  lg:leading-8 text-justify lg:text-start lg:text-xl block lg:mt-5 ">
            <li>
              Donors must ensure items are securely packaged and insured (where
              applicable).
            </li>
            <li>
              Virtue Hope is not responsible for any loss or damage incurred
              during shipping if arranged by the Donor.
            </li>
            <li>
              Items received in damaged or unacceptable condition may be
              returned or declined.
            </li>
          </ul>
        </div>

        {/*9. Use of Images and Promotion */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-[16px] lg:text-2xl leading-9 lg:mt-12">
            {" "}
            9. Use of Images and Promotion
          </p>

          <p className="text-[#263234] text-justify lg:text-start lg:text-xl lg:leading-8 font-semibold my-1 lg:my-5 ">
            The Donor grants Virtue Hope the right to use photographs or
            descriptions of the donated item(s) in marketing, social media,
            press releases, auction platforms, or promotional content.
          </p>
        </div>

        {/* 10. Data Protection */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-[16px] lg:text-2xl lg:leading-9 lg:mt-12  ">
            {" "}
            10. Data Protection
          </p>

          <p className="text-[#263234] text-justify lg:text-start lg:text-xl lg:leading-8 font-semibold my-1 lg:my-5  ">
            Donor details will be kept confidential and used only for internal
            records, donor acknowledgements, and necessary communications. All
            data is handled in accordance with the Data Protection Act and GDPR
            regulations.
          </p>
        </div>

        {/* 11. Agreement & Declaration */}

        <div className=" mt-2 lg:mt-12">
          <p className=" font-semibold text-[16px] lg:text-2xl lg:leading-9 lg:mt-12  ">
            {" "}
            11. Agreement & Declaration
          </p>

          <p className="text-[#263234]  lg:text-xl lg:leading-8 font-semibold text-justify lg:text-start my-2 lg:my-5 ">
            I confirm that I have read, understood, and agree to the terms of
            this Donor Agreement. I understand that my donation is voluntary and
            supports the mission of Virtue Hope C.I.C.
          </p>

          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AggrementPage;

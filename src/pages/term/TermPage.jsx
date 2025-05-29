import React from "react";

const TermPage = () => {
  return (
    <div>
      <div className="lg:pt-20 pt-5 max-w-[1216px] mx-auto pb-5 lg:pb-24 lg:px-4">
        <p className="text-center text-[#403730] font-semibold lg:leading-6 ">
          General Terms and Condition
        </p>
        <h1 className="text-center lg:mt-6 mt-2 text-[#263234] lg:leading-16 text-xl lg:text-5xl font-semibold  ">
          Virtue Hope C.I.C. Terms and Conditions
        </h1>
        {/* <p className="text-center text-[#263234] mt-2 lg:mt-6 text-lg lg:text-xl lg:leading-8 ">
      Email: give@virtuehope.com
    </p>
    <p className="text-center text-[#263234] mt-2 lg:mt-6 text-lg lg:text-xl lg:leading-8 ">
      Telephone: +123 4567 78958
    </p>
    <p className="text-center text-[#263234] mt-1 lg:mt-6 text-lg lg:text-xl lg:leading-8 ">
      Location: 86-90 Paul Street, London, EC2A 4NE
    </p> */}

        <div>
          <p className=" lg:my-3 my-1 lg:text-2xl text-justify lg:text-start text-[#263234] font-medium ">
            Welcome to the Virtue Hope C.I.C. (“Virtue Hope”, “we”, “us”, or
            “our”) website. These Terms and Conditions govern your use of our
            website and your participation in any item submissions, donations,
            auctions, or fundraising sales facilitated by Virtue Hope. By using
            our website or submitting an item for donation, you agree to the
            following terms:
          </p>
        </div>

        {/*1 Eligibility */}

        <div>
          <p className=" font-semibold text-xl lg:text-2xl lg:leading-9 mt-2 lg:mt-12 ">
            {" "}
            1. Eligibility
          </p>
          <span className=" text-justify lg:text-start text-[#263234] lg:leading-8 text-lg lg:text-xl mt-2 lg:mt-5 block ">
            You must be 18 years or older to submit items or participate in
            auctions through Virtue Hope. By doing so, you confirm you have the
            legal right to transfer ownership of the donated item(s).
          </span>
        </div>

        {/* 2. Donation and Revenue Split Policy */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-xl lg:text-2xl lg:leading-9 lg:mt-12 mt-2 ">
            {" "}
            2. Donation and Revenue Split Policy
          </p>

          <span className=" text-justify lg:text-start text-[#263234] lg:leading-8 text-lg lg:text-xl block lg:mt-5 mt-2 ">
            We accept donations of high-value items (art, antiques,
            collectibles, etc.) to support our charitable mission.
          </span>
          <p className="text-[#263234] text-[16px] lg:text-xl leading-8 font-semibold my-1 lg:my-5 ">
            Upon sale of a donated item:
          </p>

          <ul className=" text-justify lg:text-start list-disc ml-5 text-[#263234]  lg:leading-8 text-lg lg:text-xl block lg:mt-5 ">
            <li className="  ">
              Virtue Hope retains 70% of the net sale proceeds to reinvest into
              our charitable programs.
            </li>
            <li>
              The donor may receive up to 30%, based on their selection at the
              time of submission.
            </li>
          </ul>
          <p className="text-justify lg:text-start text-[#263234] text-[16px] lg:text-xl lg:leading-8 lg:mt-7 mt-2 ">
            <span className=" text-xl lg:text-2xl font-bold leading-8 "></span>{" "}
            This split is calculated after deduction of third-party fees (e.g.
            auction house fees, taxes, handling costs, and shipping).
          </p>
        </div>

        {/* 3. Condition of Donated Items */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-xl lg:text-2xl lg:leading-9 lg:mt-12 ">
            {" "}
            3. Condition of Donated Items
          </p>

          <span className=" text-[#263234] leading-8 text-lg lg:text-xl block lg:mt-5 ">
            To ensure quality and saleability:
          </span>

          <ul className=" text-justify lg:text-start list-disc ml-5 text-[#263234]  leading-8 text-lg lg:text-xl block lg:mt-5 ">
            <li className="  ">
              All donated items must be in good showroom condition (clean,
              presentable, and ready for sale).
            </li>
            <li>
              We do not accept items that are damaged, incomplete, or require
              restoration.
            </li>
            <li>
              We reserve the right to reject any item that does not meet our
              quality standards or align with our mission.
            </li>
          </ul>
        </div>

        {/* 4. Valuation and Pricing */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-xl lg:text-2xl leading-9 lg:mt-12">
            {" "}
            4. Valuation and Pricing
          </p>

          <p className="text-[#263234] text-[16px] lg:text-xl leading-8 font-semibold my-2 lg:my-5 ">
            All donated items will be subject to an evaluation process, which
            may include:
          </p>

          <ul className=" text-justify lg:text-start list-disc ml-5 text-[#263234]  leading-8 text-lg lg:text-xl block lg:mt-5  ">
            <li className="  ">
              Perceived Value: Based on donor’s own estimate.
            </li>
            <li>
              Expected Sale Price: Based on current market conditions and
              similar items.
            </li>
            <li>
              Professional Valuation (if applicable): From a certified appraiser
              or auction house.
            </li>
            <li>
              Actual Sale Price: Determined by final sale outcome via auction or
              private sale.
            </li>
          </ul>
          <p className="text-justify lg:text-start text-[#263234] text-[16px] lg:text-xl lg:leading-8 lg:mt-7 mt-2 ">
            Virtue Hope does not guarantee that an item will sell for its
            perceived or expected value.
          </p>
        </div>

        {/* 5. No Guarantee of Sale */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-xl lg:text-2xl lg:leading-9 lg:mt-12">
            {" "}
            5. No Guarantee of Sale
          </p>

          <p className="text-justify lg:text-start text-[#263234] text-[16px] lg:text-xl leading-8 font-semibold my-2 lg:my-5 ">
            Submission or acceptance of an item does not guarantee it will be
            sold.
          </p>

          <p className="text-[#263234] text-[16px] lg:text-xl leading-8 font-semibold my-1 lg:my-5 ">
            Some items may:
          </p>

          <ul className="text-justify lg:text-start list-disc ml-5 text-[#263234]  leading-8 text-lg lg:text-xl block lg:mt-5 ">
            <li>Be held for future campaigns</li>
            <li>Unsold items may, upon agreement, be:</li>
            <li>Be retained for in-house use or display</li>
            <li>Be sold at a later date</li>
          </ul>

          <p className="text-justify lg:text-start text-[#263234] text-[16px] lg:text-xl leading-8 lg:mt-7 mt-1">
            We are under no obligation to sell every donated item or provide a
            timeline for sale.
          </p>
        </div>

        {/* 6 Ownership and Transfer of Rights */}

        <div className="mt-2 lg:mt-12">
          <p className="font-semibold text-xl lg:text-2xl lg:leading-9 lg:mt-12">
            {" "}
            6. Ownership and Transfer of Rights
          </p>

          <p className="text-[#263234] text-[16px] lg:text-xl leading-8 font-semibold my-2 lg:my-5  ">
            Upon donation:
          </p>

          <ul className=" text-justify lg:text-start list-disc ml-5 text-[#263234]  leading-8 text-lg lg:text-xl block lg:mt-5 ">
            <li>
              {" "}
              You agree to transfer ownership of the item to Virtue Hope, unless
              a consignment agreement is explicitly made.
            </li>
            <li>
              {" "}
              By submitting the item, you confirm that you own the item outright
              and that it is free from encumbrances, liens, or legal claims.
            </li>
          </ul>
        </div>

        {/* 7 Use of Funds */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-xl lg:text-2xl leading-9 lg:mt-12 ">
            {" "}
            7. Use of Funds
          </p>

          <p className="text-justify lg:text-start text-[#263234] text-[16px] lg:text-xl leading-8 font-semibold my-1 lg:my-5  ">
            All funds raised through item sales are reinvested directly into
            Virtue Hope’s charitable objectives, which include the development
            of our wellbeing retreats, therapeutic programs, and outreach for
            survivors of abuse and trauma.
          </p>
        </div>

        {/* 8. Intellectual Property */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-xl lg:text-2xl lg:leading-9 lg:mt-12  ">
            {" "}
            8. Intellectual Property
          </p>

          <p className="text-justify lg:text-start text-[#263234] text-[16px] lg:text-xl leading-8 font-semibold my-2 lg:my-5 ">
            All images, videos, and descriptions submitted with your item may be
            used for marketing and promotional purposes. By submitting, you
            grant us a royalty-free, worldwide license to use these materials.
          </p>
        </div>

        {/* 9. Liability Disclaimer */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-xl lg:text-2xl lg:leading-9 lg:mt-12">
            {" "}
            9. Liability Disclaimer
          </p>

          <p className="text-justify lg:text-start text-[#263234] text-[16px] lg:text-xl lg:leading-8 font-semibold my-1 lg:my-5 ">
            Virtue Hope C.I.C. is not liable for:
          </p>

          <ul className=" text-justify lg:text-start list-disc ml-5 text-[#263234]  leading-8 text-lg lg:text-xl block lg:mt-5 ">
            <li>
              Damage or loss of items during transit (unless we arranged
              shipping)
            </li>
            <li>Market fluctuation affecting sale price</li>
            <li>Inaccurate donor-provided information</li>
            <li>Third-party actions (e.g. auction houses, couriers)</li>
          </ul>

          <p className="text-justify lg:text-start text-[#263234] text-[16px] lg:text-xl leading-8 lg:mt-7 mt-2">
            We will, however, take reasonable care in handling all accepted
            donations.
          </p>
        </div>

        {/* 10. Amendments */}

        <div className="mt-2 lg:mt-12">
          <p className=" font-semibold text-xl lg:text-2xl lg:leading-9 lg:mt-12  ">
            {" "}
            10. Amendments
          </p>

          <p className="text-justify lg:text-start text-[#263234] text-lg lg:text-xl lg:leading-8 lg:font-semibold my-2 lg:my-5  ">
            We reserve the right to update these Terms at any time. Changes will
            be posted on this page and apply from the date of posting.
          </p>
        </div>

        {/* 11. Governing Law */}

        <div className=" mt-2 lg:mt-12">
          <p className=" font-semibold text-xl lg:text-2xl lg:leading-9 lg:mt-12  ">
            {" "}
            11. Governing Law
          </p>

          <p className="text-justify lg:text-start text-[#263234] text-lg lg:text-xl lg:leading-8 lg:font-semibold my-2 lg:my-5 ">
            These Terms are governed by and construed in accordance with the
            laws of England and Wales. Any disputes will be subject to the
            exclusive jurisdiction of the English courts.
          </p>
        </div>

        {/* 12. Contact Us */}

        <div className=" mt-2 lg:mt-12">
          <p className=" font-semibold text-xl lg:text-2xl lg:leading-9 lg:mt-12  ">
            {" "}
            12. Contact Us
          </p>

          <p className="text-justify lg:text-start text-[#263234] text-lg lg:text-xl lg:leading-8 font-semibold my-2 lg:my-3 ">
            For any questions about these Terms or your donation:
          </p>
          <div>
            <p className="text-[#263234] text-justify lg:text-start  lg:leading-8 text-lg lg:text-xl block  ">
              Email: give@virtuehope.com
            </p>
            <p className="text-[#263234] text-justify lg:text-start  lg:leading-8 text-lg lg:text-xl block ">
              Registered Office: 86-90 Paul Street, London, EC2A 4NE
            </p>
            <p className="text-[#263234] text-justify lg:text-start  lg:leading-8 text-lg lg:text-xl block ">
              Company No.: 16173113
            </p>
            <p className="font-semibold text-xl lg:text-2xl lg:leading-9 lg:mt-12 my-2 ">
              13. Limitation of Liability – Therapeutic Services
            </p>
          </div>
          <div className=" my-2 ">
            <p className="text-[#263234]  leading-8 text-lg lg:text-xl block text-justify lg:text-start  ">
              Virtue Hope C.I.C. is committed to providing compassionate,
              trauma-informed therapeutic support and wellbeing services
              delivered by trained staff and trusted professionals. However, the
              effectiveness of therapeutic interventions may vary from person to
              person.
            </p>
          </div>

          <div>
            <p className="text-[#263234] text-lg lg:text-xl leading-8 font-semibold my-2 lg:my-3 ">
              By participating in any service, retreat, or program offered by
              Virtue Hope, you acknowledge and accept that:
            </p>

            <ul className=" text-justify lg:text-start  list-disc ml-5 text-[#263234]  leading-8 text-lg lg:text-xl block lg:mt-3 ">
              <li>
                No specific outcomes or results are guaranteed with respect to
                emotional, mental, or physical wellbeing.
              </li>
              <li>
                Participation in therapeutic services is voluntary, and
                individuals are encouraged to seek independent medical,
                psychological, or legal advice where necessary.
              </li>
              <li>
                Virtue Hope and its team will take reasonable care in the
                delivery of services but shall not be held liable for any injury
                (emotional or physical), loss, or damages resulting from
                participation in its services or any decision made based on
                those services.
              </li>
              <li>
                Virtue Hope’s services are not a substitute for professional
                clinical treatment or crisis support. In cases of emergency,
                users are encouraged to contact appropriate medical or emergency
                services.
              </li>
            </ul>
            <p className="text-justify lg:text-start  text-[#263234] text-[16px] lg:text-xl leading-8 lg:mt-7 mt-2">
              By engaging with Virtue Hope’s services, users agree to hold the
              organisation and its team inoffensive from any claims arising from
              participation, unless caused by proven negligence or misconduct.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermPage;

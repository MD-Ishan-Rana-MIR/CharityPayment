import React, { useEffect, useState } from "react";
import { Button, Radio, Form } from "antd";
import { FaCcMastercard } from "react-icons/fa";
import StripeForm from "./StripeForm";
import { useNavigate } from "react-router-dom";
const PaymentModal = ({ setSupportModal, setPaymentModal }) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const backSupportModal = () => {
    setSupportModal(true);
    setPaymentModal(false);
  };
  
  // open donation modal 
  
  const [paymentMethod, setPaymentMethod] = useState(null);
  
  const openDonationModal = (e)=>{
    setPaymentModal(false)
    setPaymentMethod(e.target.value)
  };

  console.log(`selected card is ${paymentMethod}`)



  // // back modal function

  // // const [paypalLoaded, setPaypalLoaded] = useState(false);

  // const onClose = () => {
  //   setModalOpen(false);
  //   setDonerDetailsModal(true);
  // };

;

  useEffect(() => {
    if (
      paymentMethod === "card" ||
      paymentMethod === "google_pay" ||
      paymentMethod === "apple_pay"
    ) {
      navigate(`/donate-from/${paymentMethod}`);
    }
  }, [paymentMethod]);




  const handlePaypalPayment = ()=>{
      navigate("/paypal-donate-from")
  }

  return (
    <div>
      <h1 className="mb-6 text-[#263234] text-2xl leading-9 font-semibold px-1.5 ">
        Please choose the way you want to Donate
      </h1>
      {/* Form Start */}
      <Form form={form} layout="vertical">
        <Form.Item name="donation">
          <Radio.Group onChange={openDonationModal} className="w-full">
            <div className="flex flex-col gap-4">
              {/* card */}
              <Radio
                value="card"
                className="w-full px-2! pl-2 h-[56px]  border border-[#A6ABAC] rounded-lg cursor-pointer "
              >
                <h1 className="block mt-3.5 text-[16px]  text-[#263234] leading-6 font-medium">
                  Card
                </h1>
                <span className="block lg:ml-[240px]! md:ml-[245px] ml-[158px] -mt-6 ">
                  {/* Apple Pay Icon */}
                  <FaCcMastercard className=" text-2xl " />
                </span>
              </Radio>
              {/* Apple Pay */}
              <Radio
                value="apple_pay"
                className="w-full pl-2  h-[56px]  border border-[#A6ABAC]  rounded-lg cursor-pointer "
              >
                <h1 className="block mt-3.5 text-[16px]  text-[#263234] leading-6 font-medium">
                  With Apple Pay
                </h1>
                <span className="block lg:ml-[240px]! md:ml-[220%] ml-[145%] -mt-6 ">
                  {/* Apple Pay Icon */}
                  <svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_180689_8357)">
                      <path
                        d="M19.3735 8.18824C17.7349 9.17647 16.7229 10.8706 16.7229 12.7529C16.7229 14.8706 18.0241 16.8 20 17.6C19.6145 18.8235 19.0361 19.9529 18.3133 20.9882C17.253 22.4471 16.1446 23.9529 14.506 23.9529C12.8675 23.9529 12.3855 23.0118 10.4578 23.0118C8.57831 23.0118 7.90361 24 6.36145 24C4.81928 24 3.75904 22.6353 2.55422 20.9412C0.963856 18.5882 0.0481928 15.8588 0 12.9882C0 8.32941 3.08434 5.83529 6.16867 5.83529C7.80723 5.83529 9.15663 6.87059 10.1687 6.87059C11.1325 6.87059 12.6747 5.78824 14.506 5.78824C16.4337 5.74118 18.2651 6.63529 19.3735 8.18824ZM13.6386 3.81176C14.4578 2.87059 14.8916 1.69412 14.9398 0.470588C14.9398 0.329412 14.9398 0.141176 14.8916 0C13.494 0.141176 12.1928 0.8 11.2771 1.83529C10.4578 2.72941 9.9759 3.85882 9.92771 5.08235C9.92771 5.22353 9.92771 5.36471 9.9759 5.50588C10.0723 5.50588 10.2169 5.55294 10.3133 5.55294C11.6145 5.45882 12.8193 4.8 13.6386 3.81176Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_180689_8357">
                        <rect width="20" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </Radio>

              {/* Google Pay */}
              <Radio
                value="google_pay"
                className="w-full pl-2 px-2! h-[56px]  border border-[#A6ABAC] rounded-lg cursor-pointer "
              >
                <h1 className="block mt-3.5 text-[16px] text-[#263234] leading-6 font-medium">
                  With Google Pay
                </h1>
                <span className="lg:ml-[240px]! md:ml-[200%] ml-[132%] block -mt-6 ">
                  {/* Google Pay Icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.255H17.92C17.665 15.63 16.89 16.795 15.725 17.575V20.335H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M11.9999 23C14.9699 23 17.4599 22.015 19.2799 20.335L15.7249 17.575C14.7399 18.235 13.4799 18.625 11.9999 18.625C9.13492 18.625 6.70992 16.69 5.84492 14.09H2.16992V16.94C3.97992 20.535 7.69992 23 11.9999 23Z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.845 14.09C5.625 13.43 5.5 12.725 5.5 12C5.5 11.275 5.625 10.57 5.845 9.91V7.06H2.17C1.4 8.59286 0.999321 10.2846 1 12C1 13.775 1.425 15.455 2.17 16.94L5.845 14.09Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M11.9999 5.375C13.6149 5.375 15.0649 5.93 16.2049 7.02L19.3599 3.865C17.4549 2.09 14.9649 1 11.9999 1C7.69992 1 3.97992 3.465 2.16992 7.06L5.84492 9.91C6.70992 7.31 9.13492 5.375 11.9999 5.375Z"
                      fill="#EA4335"
                    />
                  </svg>
                </span>
              </Radio>

              {/* paypal Pay */}
              <Radio
                onClick={handlePaypalPayment}
                value="paypal_pay"
                className="w-full pl-2 px-2! h-[56px]  border border-[#A6ABAC] rounded-lg cursor-pointer "
              >
                <h1 className="block mt-3.5 text-[16px] text-[#263234] leading-6 font-medium">
                  PayPal Pay
                </h1>
                <span className="block  lg:ml-[240px] md:ml-[242px] ml-[140%] -mt-6 ">
                  {/* paypal Pay Icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.9861 6.91069C19.0396 4.12819 16.7436 1.99219 13.5866 1.99219H7.05757C6.90538 1.99224 6.7582 2.0466 6.64252 2.14551C6.52685 2.24441 6.45027 2.38135 6.42657 2.53169L3.81007 18.8797C3.79837 18.9538 3.80285 19.0295 3.82323 19.1017C3.8436 19.1738 3.87937 19.2407 3.92808 19.2978C3.97678 19.3548 4.03727 19.4006 4.10537 19.432C4.17348 19.4634 4.24758 19.4797 4.32257 19.4797H8.19107L7.58607 23.2657C7.57436 23.3398 7.57886 23.4156 7.59926 23.4878C7.61966 23.56 7.65548 23.6269 7.70424 23.684C7.753 23.741 7.81355 23.7868 7.88172 23.8181C7.94988 23.8495 8.02403 23.8657 8.09907 23.8657H11.2501C11.4026 23.8657 11.5381 23.8107 11.6536 23.7122C11.7691 23.6132 11.7881 23.4767 11.8116 23.3262L12.7366 17.8837C12.7601 17.7337 12.8366 17.5387 12.9526 17.4397C13.0681 17.3407 13.1691 17.2867 13.3211 17.2862H15.2501C18.3416 17.2862 20.9651 15.0892 21.4446 12.0327C21.7836 9.86269 20.8531 7.88919 18.9861 6.91069Z"
                      fill="#001C64"
                    />
                    <path
                      d="M9.02798 13.4502L8.06448 19.5602L7.45948 23.3922C7.44777 23.4663 7.45227 23.542 7.47267 23.6143C7.49308 23.6865 7.52889 23.7534 7.57765 23.8104C7.62642 23.8675 7.68697 23.9132 7.75513 23.9446C7.82329 23.976 7.89745 23.9922 7.97248 23.9922H11.3075C11.4596 23.992 11.6066 23.9376 11.7222 23.8387C11.8378 23.7398 11.9143 23.6029 11.938 23.4527L12.817 17.8827C12.8407 17.7325 12.9172 17.5956 13.0328 17.4968C13.1484 17.398 13.2954 17.3437 13.4475 17.3437H15.411C18.5025 17.3437 21.1255 15.0887 21.605 12.0322C21.945 9.86266 20.853 7.88916 18.986 6.91016C18.981 7.14116 18.961 7.37166 18.9255 7.60016C18.446 10.6562 15.8225 12.9117 12.731 12.9117H9.65848C9.5065 12.9117 9.3595 12.9659 9.24393 13.0646C9.12836 13.1633 9.05179 13.3 9.02798 13.4502Z"
                      fill="#0070E0"
                    />
                    <path
                      d="M8.06398 19.5601H4.18398C4.10896 19.5601 4.03482 19.5439 3.96668 19.5125C3.89853 19.4812 3.83801 19.4354 3.78929 19.3783C3.74056 19.3213 3.70479 19.2544 3.68446 19.1821C3.66412 19.1099 3.65969 19.0342 3.67148 18.9601L6.28748 2.36908C6.31119 2.21879 6.38779 2.08191 6.50348 1.98309C6.61917 1.88427 6.76634 1.83001 6.91848 1.83008H13.587C16.7435 1.83008 19.0395 4.12758 18.986 6.91008C18.2005 6.49808 17.2775 6.26258 16.266 6.26258H10.7065C10.5545 6.26273 10.4075 6.31708 10.2919 6.41587C10.1763 6.51466 10.0998 6.65142 10.076 6.80158L9.02848 13.4501L8.06398 19.5601Z"
                      fill="#003087"
                    />
                  </svg>
                </span>
              </Radio>
            </div>
          </Radio.Group>
        </Form.Item>

        {/* Modal Buttons */}
        <div className=" flex flex-col md:flex-row md:justify-end  lg:flex-row justify-center lg:justify-end mt-5 mb-2">
          <Button
            onClick={backSupportModal}
            type="text"
            className=" missionModalBtn1 border! "
          >
            Back
          </Button>
          {/* <Button onClick={"handlieClickNextStep"} className="missionModalBtn2">
            Proceed next step
          </Button> */}
        </div>
      </Form>
    </div>
  );
};

export default PaymentModal;

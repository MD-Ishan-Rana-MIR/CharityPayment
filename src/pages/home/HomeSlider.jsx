import React, { useEffect, useState } from "react";

import { Button, Form, Input, Modal, Select, Dropdown, Upload, message } from "antd";
import { ChevronDown, ChevronUp, Gavel, Quote } from "lucide-react";
import { useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AggrementPage from "../aggrement/AggrementPage";
import AuctionDetailsModal from "../../components/client/auctionModal/AuctionDetailsModal";
import PersonalDetailModal from "../../components/client/auctionModal/PersonalDetailModal";
import CardNumberModal from "../../components/client/auctionModal/CardNumberModal";
import UserDetailsModal from "../../components/client/auctionModal/UserDetailsModal";
import AuctionSlider from "../auction/AuctionSlider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { imgUrl } from "../../helper/imgUrl";
import { LockOutlined, MailOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import toast from "react-hot-toast";
const HomeSlider = () => {
  const [donateTerm, setDonateTerm] = useState(false);
  const [userDetailsModal, setUserDetailsModal] = useState(false);

  const donateModalCanel = () => {
    setDonateTerm(false);
  };
  const [error, setError] = useState("")
  const openDonateTermModal = () => {
    setDonateTerm(true);
  };

  const [form] = Form.useForm();

  const [verified, isVerified] = useState(false);

  const donateFull = Form.useWatch("donateFull", form);




  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
    },
  });


  const [personalData, setPersonalData] = useState(null);
  const [auctionData, setAuctionData] = useState(null);

  // first slider start

  // 1st modal start

  const [auctionDetailsModal, setAuctionDetailsModal] = useState(false);
  const [personalDetailsModal, setPersonalDetailsModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);

  // 2nd modal end

  // 3rd modal start

  // 3rd modal end

  // 1st 2nd 3rd modal overflow hidden start

  useEffect(() => {
    document.body.style.overflow =
      auctionDetailsModal || personalDetailsModal || paymentModal
        ? "hidden"
        : "auto";
  }, [auctionDetailsModal, personalDetailsModal, paymentModal]);

  // 1st 2nd 3rd modal overflow hidden end

  // first slider end

  // 2nd slide start

  const [selectedKey, setSelectedKey] = useState(null); // To store selected item key
  const [selectedValue, setSelectedValue] = useState(""); // To store selected label
  const [customAmount, setCustomAmount] = useState(""); // To store custom input
  const items = [
    { key: "1", label: "$25" },
    { key: "2", label: "$30" },
    { key: "3", label: "$40" },
    { key: "4", label: "$50" },
    { key: "5", label: "Custom" },
  ];

  const [firstModal, setFirstModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    // Set value based on the key
    const selected = items.find((item) => item.key === key);
    setSelectedValue(selected?.label || "");
  };

  // first modal start

  const openFirstModal = () => {
    if (selectedValue && selectedValue !== "None") {
      setFirstModal(true);
    } else {
    }
  };

  const handleCancel = () => {
    setFirstModal(false);
  };

  const submitBuyerInfo = (values) => {
    setFirstModal(false);
    setSecondModal(true);
  };

  // first modal end

  // 2nd modal start

  const handleSecondCancelModal = () => {
    setSecondModal(false);
    setFirstModal(true);
  };

  useEffect(() => {
    document.body.style.overflow =
      firstModal || secondModal ? "hidden" : "auto";
  }, [firstModal, secondModal]);

  // 2nd slide end







  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPublic.get("/get-bit-auction");
        if (res.data.success) {
          setSliderData(res.data.data);
        }
      } catch (error) {
        setOpenLoginModal(true)
        console.error("Error fetching data", error);
      }
    };

    // Initial fetch
    fetchData();


  }, []);


  // registration modal start 

  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);

  const openUserRegModal = () => {
    setOpenLoginModal(false);
    setOpenRegistrationModal(true)
  };

  const closeRegModal = () => {
    setOpenRegistrationModal(false)
  };

  const [fileList, setFileList] = useState(null);
  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };



  const handleSubmitReg = async (values) => {
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    if (fileList[0]?.originFileObj) {
      formData.append("image", fileList[0].originFileObj);
    }

    try {
      setLoading(true);
      const res = await axiosPublic.post(`/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      if (res?.data?.success == true) {
        message.success(res.data.message);
        setOpenRegistrationModal(false)
        setRegOtpVerify(true);
        return form.resetFields();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  // registration modal end

  // registration otp verify start

  const [regOtpVerify, setRegOtpVerify] = useState(false);

  const closeRegOtpModal = () => {
    setRegOtpVerify(false)
  }

  const handleSubmitOtp = async (values) => {
    try {
      setLoading(true);

      const res = await axiosPublic.post(`/otp-verify`, { otp: values.otp });

      if (res.data.success) {
        form.resetFields()
        localStorage.setItem(`token`, res.data.data?.token);
        window.location.href = "/"
        message.success(res.data.message);
        return setRegOtpVerify(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return;
    } finally {
      form.resetFields();
      setLoading(false);
      setRegOtpVerify(false)
      return
    }
  };

  // registration otp verify end


  // login modal 

  const [openLoginModal, setOpenLoginModal] = useState(false);

  const closeLoginModal = async () => {
    setOpenLoginModal(false)
  };
  const handleOpenLogingModal = () => {
    setOpenLoginModal(true);
    setOpenRegistrationModal(false)
  }
  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      const res = await axiosPublic.post(`/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        message.success(res.data?.message);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem(`authId`, res.data.data.user.id);
        window.location.href = "/"
        form.resetFields();
        return setOpenLoginModal(false);
      }
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      message.error(
        `${error.response?.data?.message || "Something went wrong!"}`
      );
    } finally {
      form.resetFields()
      setLoading(false);
    }
  };


  // forget password modal start


  // forget password modal start

  const [forgetEmailModal, setForgetEmailModal] = useState(false);

  const [userEmail, setUserEmail] = useState(null);

  const openForgetEmailModal = () => {
    setForgetEmailModal(true)
    setOpenLoginModal(false)
  }

  const closeForgetEmailModal = () => {
    setForgetEmailModal(false)
    setOpenLoginModal(false)
  }


  const forgetPasswordEmailSubmit = async (values) => {
    try {
      setLoading(true);
      let res = await axiosPublic.post(`/forgot-password`, {
        email: values.email,
      });

      if (res.data.success) {
        toast.success(res.data?.message);
        setForgetEmailModal(false);
        setUserEmail(values.email)
        form.resetFields();
        setForgetOtpVerify(true)
        return;
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {

      setLoading(false);
      form.resetFields();
      return;
    }
  };



  // otp verify 


  const [fogetOtpVerify, setForgetOtpVerify] = useState(false);

  const closeForgetOptVerifyModal = () => {
    setForgetOtpVerify(false)
  }
  const [otp, setOtp] = useState("")
  const handleSubmitForgetOtpVerify = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      setLoading(true)
      const res = await axiosPublic.post(`/otp-verify`, { otp: otp })
      if (res) {
        localStorage.setItem("forgetToken", res.data?.data?.token)
        message.success(res.data?.message)
        setForgetOtpVerify(false);
        setNewPassword(true)
        return;

      }
      // You can use 'data' here if needed
    } catch (error) {
      console.log(error)
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };



  // set new password 

  const [newPassword, setNewPassword] = useState(false);

  const closeSetNewPasswordModal = () => {
    setNewPassword(false);
  };

  const setToken = localStorage.getItem("forgetToken");
  const setTokenConfig = {
    headers: {
      Authorization: `Bearer ${setToken} `
    }
  }

  const submitNewPasswordModal = async (values) => {
    try {
      setLoading(true);
      let res = await axiosPublic.post(
        `/create-new-password`,
        {
          email: values.email,
          new_password: values.new_password,
          new_password_confirmation: values.new_password_confirmation,
        },
        setTokenConfig
      );

      if (res) {
        message.success(`${res.data.message}`);
        setNewPassword(false);
        form.resetFields()
      }


    } catch (error) {
      console.log(error)
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };



  // forget password modal end 



  // forget password modal end 








  // States for each slide's bid selection and bid visibility
  const [selectedBids, setSelectedBids] = useState(
    new Array(sliderData.length).fill("") // Initializes an empty array for selected bids
  );
  const [showBids, setShowBids] = useState(
    new Array(sliderData.length).fill(false) // Initializes the visibility of bids
  );
  const [customBids, setCustomBids] = useState(
    new Array(sliderData.length).fill("") // Initializes empty custom bids for each slide
  );
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Bearer added
    },
  };
  const handleBidSubmit = async (index, bidPrice) => {
    try {
      setLoading(true);
      const auctionId = sliderData[index]?.id;

      if (!auctionId) {
        toast.error("Auction ID not found!");
        return;
      }

      if(!token){
        return setOpenLoginModal(true);
      }

      const res = await axiosPublic.post(`/bit-contributor?auction_id=${auctionId}`, {
        bit_online: bidPrice,
      }, config);

      console.log(`res is ${JSON.stringify(res)}`)


      if (res.data.success) {
        toast.success("Bid submitted successfully!");
        const res = await axiosPublic.get("/get-bit-auction");
        setSliderData(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to submit bid");
      }
    } catch (error) {      
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBidChange = (index, e) => {
    const newCustomBids = [...customBids];
    newCustomBids[index] = e.target.value;
    setCustomBids(newCustomBids);
  };

  const handleBidToggle = (index) => {
    const newShowBids = [...showBids];
    newShowBids[index] = !newShowBids[index];
    setShowBids(newShowBids);
  };

  const handleBidSelect = (index, price) => {
    const newSelectedBids = [...selectedBids];
    newSelectedBids[index] = price;
    setSelectedBids(newSelectedBids);
    setShowBids((prevState) => prevState.map(() => false));

    // handleBidSubmit(index, price); // 👈 Call API
  };

  const handleCustomBidSet = (index) => {
    const newSelectedBids = [...selectedBids];
    newSelectedBids[index] = customBids[index];
    setSelectedBids(newSelectedBids);

    const newCustomBids = [...customBids];
    newCustomBids[index] = "";
    setCustomBids(newCustomBids);

    setShowBids((prevState) => prevState.map(() => false));

    console.log(selectedBids[index])

    handleBidSubmit(index, selectedBids[index]); // 👈 Call API with selected custom bid
  };

  // 2nd modal end



  // date time calculate start

  const [timeLeft, setTimeLeft] = useState([]);

  // Util: Format updated_at as "DD HH:MM:SS"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${day} ${hour}:${minute}:${second}`;
  };

  // Util: Calculate time left until 7 days after updated_at
  const calculateTimeLeft = (updated_at, duration) => {
    const now = new Date();
    const endTime = new Date(updated_at).getTime() + duration * 24 * 60 * 60 * 1000;
    const difference = endTime - now.getTime();

    if (difference <= 0) return "Auction ended";

    const days = Math.floor(difference / (1000 * 3600 * 24));
    const hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
  };

  useEffect(() => {
    // Initial render
    setTimeLeft(
      sliderData.map(slide => calculateTimeLeft(slide.updated_at, slide.duration))
    );

    const interval = setInterval(() => {
      setTimeLeft(
        sliderData.map(slide => calculateTimeLeft(slide.updated_at, slide.duration))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [sliderData]);

























  return (
    <div className=" bg-[#ecebea] py-4 mb-5   ">
      <div className=" hidden 2xl:flex " >
        <div ref={sliderRef} className="keen-slider ">
          <div className="keen-slider__slide number-slide1">
            <div className="relative   ">
              <img
                src="/auctionBg-img.jpg"
                className="w-full  object-cover h-[85vh] rounded-2xl"
                alt="Auction Background"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 to-transparent rounded-2xl"></div>
              <div className="absolute left-0 pl-6 bottom-0">
                <p className="lg:text-5xl text-2xl text-white lg:pb-8 pb-2">
                  Empower women to <br />
                  <span className="font-bold">buy or list your</span> <br /> auctions
                </p>
                <div className="lg:pb-8 pb-4">
                  <button
                    onClick={() => setPersonalDetailsModal(true)}
                    className="bg-[#F6F6F7] text-[#172B4D] font-bold text-sm hover:bg-[#ecebea] transition-all duration-200 rounded px-6 py-2.5"
                  >
                    Contribute your Auction
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="keen-slider__slide  number-slide2 ">
            <div className="  ">
              <div div className="w-full  ">
                {sliderData.slice(0, 1).map((slide, index) => (
                  <div key={slide.id}>
                    <div className="bg-[#ecebea] ml-5 w-full rounded-2xl  ">
                      <div className="w-full">
                        <div className="bg-white shadow rounded-2xl flex lg:flex-row flex-col lg:justify-between px-6 py-4 gap-6">
                          {/* LEFT SECTION */}
                          <div className="">
                            <div className="  h-44 ">
                              <h1 className="font-semibold lg:text-5xl text-2xl lg:leading-12 text-black lg:pb-4">
                                {
                                  slide.title
                                }
                              </h1>
                            </div>
                            <p className="lg:mt-4 text-[#263234] lg:text-xl">
                              Estimated price :
                              <span className="text-[#263234] font-bold">
                                {" "}
                                {slide.budget}£
                              </span>
                            </p>

                            {/* Countdown */}
                            <div className="flex items-center gap-1 mt-1">
                              <div>
                                <span>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2C15 2.55228 14.5523 3 14 3H10C9.44772 3 9 2.55228 9 2Z"
                                      fill="#4B5557"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M15.7071 10.2929C16.0976 10.6834 16.0976 11.3166 15.7071 11.7071L12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071C10.9024 14.3166 10.9024 13.6834 11.2929 13.2929L14.2929 10.2929C14.6834 9.90237 15.3166 9.90237 15.7071 10.2929Z"
                                      fill="#4B5557"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M12 7C8.13401 7 5 10.134 5 14C5 17.866 8.13401 21 12 21C15.866 21 19 17.866 19 14C19 10.134 15.866 7 12 7ZM3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14C21 18.9706 16.9706 23 12 23C7.02944 23 3 18.9706 3 14Z"
                                      fill="#4B5557"
                                    />
                                  </svg>
                                </span>
                              </div>
                              <div>
                                <p className="text-[#263234] lg:text-xl font-semibold">
                                  {timeLeft[index] || "time"}
                                </p>
                                {/* <p>Created at: {formatDate(slide.updated_at)}</p> */}
                                {/* <p>Time left: {timeLeft[index]}</p> */}
                              </div>
                            </div>



                            {/* Contributor */}
                            <div className="flex items-center lg:gap-3 gap-1.5 lg:mt-6 mt-2.5">
                              <img
                                src={`${imgUrl}/${slide?.profile}  `}
                                className="w-12 h-12 rounded-full"
                                alt=""
                              />
                              <div>
                                <h1 className="text-sm font-semibold text-[#263234]">
                                  {slide?.name}
                                </h1>
                                <p className="text-[#4B5557] text-xs">
                                  {slide?.email}
                                </p>
                              </div>
                            </div>

                            {/* Quote */}
                            <div className="bg-[#e9ebeb] mt-6 lg:p-6 p-2.5 rounded-lg max-w-2xl mx-auto shadow-md  custom-scrollbar h-64 overflow-y-scroll   ">
                              <p className="text-lg leading-relaxed pb-14 ">
                                {slide?.description ||
                                  "I am honored to donate Whispers of Dawn to this auction in support of Healing and Hope for Women. This initiative empowers women facing adversity, providing them with the resources to rebuild their lives. We can create a masterpiece of change."}
                              </p>
                              <div className="lg:ml-20 -mt-9">
                                {/* <Quote className="text-gray-600 w-6 h-6" /> */}
                              </div>
                            </div>

                            {/* Bid Section and Price */}
                            <div className="flex my-12 flex-row justify-between gap-6">
                              {/* Price Button */}
                              <div>
                                <button className=" flex items-center gap-3  ">
                                  <p className=" text-[#263234] font-bold text-3xl ">
                                    £{slide.max_bit_online}
                                  </p>{" "}
                                  <span className=" text-xl text-[#4B5557] ">
                                    {" "}
                                    ({slide.total_bits}bids){" "}
                                  </span>
                                </button>
                              </div>

                              {/* Bid Button and Dropdown */}
                              <div className="relative flex flex-col items-end w-full">
                                <div className="flex">
                                  <button className="flex items-center gap-2 cursor-pointer bg-[#403730] text-white text-sm font-semibold px-2 py-2.5 hover:bg-[#2c241f] transition w-fit">
                                    £ {selectedBids[index]
                                      ? selectedBids[index]
                                      : slide.price}{" "}
                                    {/* Show selected bid or price */}
                                  </button>
                                  <button
                                    onClick={() => handleBidSubmit(index, selectedBids[index] || slide.price)}
                                    className="flex items-center gap-2 cursor-pointer bg-[#403730] text-white text-sm font-semibold px-4 py-2.5 hover:bg-[#2c241f] transition w-fit"
                                  >
                                    Bid online
                                  </button>
                                  <button className=" flex items-center bg-[#403730] text-white " onClick={() => handleBidToggle(index)}  >
                                    <Gavel className="w-4 h-4" />
                                    {showBids[index] ? (
                                      <ChevronUp className="w-4 h-4" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>

                                {/* Bid Price Options */}
                                {showBids[index] && (
                                  <AnimatePresence>
                                    {showBids && ( // showBidOptions ta state hisabe manage korte hobe
                                      <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3, type: "spring" }}
                                        className="absolute bottom-full right-0 mt-4 flex flex-col w-48"
                                      >
                                        {/* Map through the bid prices */}
                                        {slide?.bit_prices.map((price) => (
                                          <button
                                            key={price}
                                            onClick={() =>
                                              handleBidSelect(index, price)
                                            }
                                            className="bg-white border flex flex-row border-gray-300 text-sm px-4 py-2 hover:scale-105 rounded-lg hover:bg-gray-100 transition"
                                          >
                                            £{price}
                                          </button>
                                        ))}

                                        {/* Custom Bid Input */}
                                        <div className="flex flex-row items-center my-3 gap-2 mt-3">
                                          <input
                                            type="number"
                                            placeholder="Enter custom bid"
                                            value={customBids[index]}
                                            onChange={(e) =>
                                              handleBidChange(index, e)
                                            }
                                            className="border border-gray-300 text-sm px-4 hover:outline-none focus:outline-none py-2 rounded-lg w-32"
                                          />
                                          <button
                                            onClick={() => handleCustomBidSet(index)}
                                            className="bg-[#403730] text-white text-sm font-semibold px-4 py-2 rounded-lg"
                                          >
                                            Set
                                          </button>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* RIGHT IMAGE SECTION */}
                          <div className="relative">
                            <img
                              src={`${imgUrl}/${slide?.image} `}
                              className="lg:w-[532px] w-[100%] block mx-auto rounded-2xl lg:h-[690px] mb-6"
                              alt=""
                            />
                            <div className="absolute top-0 ml-3 mt-4 px-2 py-1 text-sm text-[#263234] bg-white rounded">
                              <button>Featured</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* small device  */}

      <div className=" 2xl:hidden block px-3 ">
        {/* 1st slide  */}
        <div>
          <div>
            <div className="relative   w-full h-auto">
              <img
                src="/auctionBg-img.jpg"
                className="w-full h-full object-cover rounded-2xl "
                alt=""
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 to-transparent rounded-2xl "></div>
              <div className="absolute left-0 pl-6 bottom-0">
                <p className="lg:text-5xl text-2xl text-white lg:pb-8 pb-2">
                  Empower women to <br />
                  <span className="font-bold">
                    buy or list your
                  </span> <br /> auctions
                </p>
                <div className="lg:pb-8 pb-4">
                  <button
                    onClick={() => setPersonalDetailsModal(true)}
                    className="bg-[#F6F6F7] cursor-pointer text-[#172B4D] font-bold text-sm hover:bg-[#ecebea] transition-all duration-200 rounded px-6 py-2.5"
                  >
                    Contribute your Auction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 2nd slide  */}
        <div className=" mt-4 2xl:hidden ">
          <div className="flex flex-col gap-y-7">
            {sliderData.map((slide, index) => (
              <div key={slide.id}>
                <div className="bg-[#ecebea]  rounded-2xl  ">
                  <div className="">
                    <div className="bg-white shadow rounded-2xl flex  flex-col py-6 gap-6 px-3 ">
                      {/* LEFT SECTION */}
                      <div className="">
                        <div className="">
                          <h1 className="font-semibold lg:text-5xl text-2xl lg:leading-12 text-black lg:pb-4">
                            {
                              "Capturing the first light of day in a serene landscape"
                            }
                          </h1>
                        </div>
                        <p className="lg:mt-4 text-[#263234] ">
                          Estimated price :
                          <span className="text-[#263234] font-bold">
                            {slide.budget}£
                          </span>
                        </p>

                        {/* Countdown */}
                        <div className="flex items-center gap-1 mt-1">
                          <div>
                            <span>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2C15 2.55228 14.5523 3 14 3H10C9.44772 3 9 2.55228 9 2Z"
                                  fill="#4B5557"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M15.7071 10.2929C16.0976 10.6834 16.0976 11.3166 15.7071 11.7071L12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071C10.9024 14.3166 10.9024 13.6834 11.2929 13.2929L14.2929 10.2929C14.6834 9.90237 15.3166 9.90237 15.7071 10.2929Z"
                                  fill="#4B5557"
                                />
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M12 7C8.13401 7 5 10.134 5 14C5 17.866 8.13401 21 12 21C15.866 21 19 17.866 19 14C19 10.134 15.866 7 12 7ZM3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14C21 18.9706 16.9706 23 12 23C7.02944 23 3 18.9706 3 14Z"
                                  fill="#4B5557"
                                />
                              </svg>
                            </span>
                          </div>
                          <div>
                            <p className="text-[#263234] lg:text-xl font-semibold">
                              {timeLeft[index] || "time"}
                            </p>
                            {/* <p>Created at: {formatDate(slide.updated_at)}</p> */}
                            {/* <p>Time left: {timeLeft[index]}</p> */}
                          </div>
                        </div>

                        {/* Contributor */}
                        <div className="flex items-center lg:gap-3 gap-1.5 lg:mt-6 mt-2.5">
                          <img
                            src={`${imgUrl}/${slide?.profile}  `}
                            className="w-12 h-12 rounded-full"
                            alt=""
                          />
                          <div>
                            <h1 className="text-sm font-semibold text-[#263234]">
                              {slide?.name}
                            </h1>
                            <p className="text-[#4B5557] text-xs">
                              {slide.email}
                            </p>
                          </div>
                        </div>

                        {/* Quote */}
                        <div className="bg-[#e9ebeb] mt-6 lg:p-6 p-2.5 rounded-lg  mx-auto shadow-md">
                          <p className="text-lg text-justify leading-relaxed">
                            {slide?.description ||
                              "I am honored to donate Whispers of Dawn to this auction in support of Healing and Hope for Women. This initiative empowers women facing adversity, providing them with the resources to rebuild their lives. We can create a masterpiece of change."}
                          </p>
                          {/* <div className="lg:ml-20 -mt-9">
                        <Quote className="text-gray-600 w-6 h-6" />
                      </div> */}
                        </div>

                        {/* Bid Section and Price */}
                        <div className=" my-4 flex flex-col gap-y-5 ">
                          {/* Price Button */}
                          <div>
                            <button className=" flex items-center gap-3    ">
                              <p className=" text-[#263234] font-bold text-3xl ">
                                £{slide.max_bit_online}
                              </p>{" "}
                              <span className=" text-xl text-[#4B5557] ">
                                {" "}
                                ({slide.total_bits}bids){" "}
                              </span>
                            </button>
                          </div>

                          {/* Bid Button and Dropdown */}
                          <div className="relative flex flex-col w-full">
                            <div className="flex">
                              <button className="flex items-center gap-2 cursor-pointer bg-[#403730] text-white text-sm font-semibold px-2 py-2.5 hover:bg-[#2c241f] transition w-fit">
                                £ {selectedBids[index]
                                  ? selectedBids[index]
                                  : slide.price}{" "}
                                {/* Show selected bid or price */}
                              </button>
                              <button
                                onClick={() => handleBidSubmit(index, selectedBids[index] || slide.price)}
                                className="flex items-center gap-2 cursor-pointer bg-[#403730] text-white text-sm font-semibold px-4 py-2.5 hover:bg-[#2c241f] transition w-fit"
                              >
                                Bid online
                              </button>
                              <button className=" flex items-center bg-[#403730] text-white " onClick={() => handleBidToggle(index)}  >
                                <Gavel className="w-4 h-4" />
                                {showBids[index] ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </button>
                            </div>

                            {/* Bid Price Options */}
                            {showBids[index] && (
                              <AnimatePresence>
                                {showBids && ( // showBidOptions ta state hisabe manage korte hobe
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, type: "spring" }}
                                    className="absolute bottom-full right-0 mt-4 flex flex-col w-48"
                                  >
                                    {/* Map through the bid prices */}
                                    {slide?.bit_prices.map((price) => (
                                      <button
                                        key={price}
                                        onClick={() =>
                                          handleBidSelect(index, price)
                                        }
                                        className="bg-white border flex flex-row border-gray-300 text-sm px-4 py-2 hover:scale-105 rounded-lg hover:bg-gray-100 transition"
                                      >
                                        £ {price}
                                      </button>
                                    ))}

                                    {/* Custom Bid Input */}
                                    <div className="flex flex-row items-center my-3 gap-2 mt-3">
                                      <input
                                        type="number"
                                        placeholder="Enter custom bid"
                                        value={customBids[index]}
                                        onChange={(e) =>
                                          handleBidChange(index, e)
                                        }
                                        className="border border-gray-300 text-sm px-4 hover:outline-none focus:outline-none py-2 rounded-lg w-32"
                                      />
                                      <button
                                        onClick={() => handleCustomBidSet(index)}
                                        className="bg-[#403730] text-white text-sm font-semibold px-4 py-2 rounded-lg"
                                      >
                                        Set
                                      </button>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT IMAGE SECTION */}
                      <div className="relative">
                        <img
                          src={`http://137.59.180.219:8000/${slide?.image}  `}
                          className="lg:w-[532px] w-[100%] block mx-auto rounded-2xl lg:h-[630px] mb-6"
                          alt=""
                        />
                        <div className="absolute top-0 ml-3 mt-4 px-2 py-1 text-sm text-[#263234] bg-white rounded">
                          <button>Featured</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
          setUserDetailsModal={setUserDetailsModal}
          setPaymentModal={setPaymentModal}
          setAuctionDetailsModal={setAuctionDetailsModal}
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
            setUserDetailsModal={setUserDetailsModal}
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


      {/* login modal  */}

      {
        openLoginModal && (
          <Modal
            open={openLoginModal}
            footer={null}
            closable={true}
            onCancel={closeLoginModal}
            centered
            maskClosable={false}
          // width="400px"
          // style={{ padding: "15px", top: 0 }}
          >

            <Form
              name="login"
              layout="vertical"
              onFinish={handleLogin}
              keyboard={false}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter your email"
                  className="py-2"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be minimum 6 characters." },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  className="py-2"
                />
              </Form.Item>

              <div className="flex justify-end mb-4">
                <span
                  onClick={openForgetEmailModal}
                  className="text-blue-600 cursor-pointer  hover:underline text-sm font-semibold"
                >
                  Forgot Password?
                </span>
              </div>

              <Form.Item>
                <Button
                  loading={loading}
                  disabled={loading}
                  type="primary"
                  htmlType="submit"
                  className="lg:w-full  bg-btnColor border-none h-11 font-bold text-white text-[14px] mt-1 rounded-lg"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center ">
              <span className="text-gray-600">Don't have an account? </span>
              <span
                onClick={openUserRegModal}
                className="text-blue-600 hover:underline font-semibold cursor-pointer "
              >
                Register
              </span>
            </div>

          </Modal>
        )
      }

      {/* registration modal  */}

      {
        openRegistrationModal && (
          <Modal
            open={openRegistrationModal}
            footer={null}
            closable={true}
            onCancel={closeRegModal}
            centered
          // width="400px"
          // style={{ padding: "15px", top: 0 }}
          >
            <div className="">
              {/* <Card className="lg:p-6"> */}
              <h2 className="text-2xl font-bold text-center mb-2 lg:mb-6">Register</h2>
              <Form
                name="register"
                layout="vertical"
                onFinish={handleSubmitReg}
                autoComplete="off"
                form={form}
              >
                {/* Name */}
                <Form.Item
                  label="Name"
                  name="full_name"
                  rules={[{ required: true, message: "Please input your name!" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your name"
                    className="py-2"
                  />
                </Form.Item>

                {/* Email */}
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Enter your email"
                    className="py-2"
                  />
                </Form.Item>

                {/* Password */}
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                    { min: 6, message: "Password must be minimum 6 characters." },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Enter your password"
                    className="py-2"
                  />
                </Form.Item>

                {/* Password Confirmation */}
                <Form.Item
                  label="Confirm Password"
                  name="password_confirmation"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("Passwords do not match!"));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm your password"
                    className="py-2"
                  />
                </Form.Item>

                {/* Photo Upload */}
                <Form.Item
                  label="Photo ID"
                  name="image"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: true, message: "Please upload your photo!" }]}
                >
                  <Upload.Dragger
                    beforeUpload={() => false}
                    fileList={fileList}
                    name="image"
                    listType="picture"
                    maxCount={1}
                    onChange={handleFileChange}
                  >
                    <UploadOutlined /> Click to Upload Your Photo
                  </Upload.Dragger>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                  <Button
                    loading={loading}
                    disabled={loading}
                    type="primary"
                    htmlType="submit"
                    className="lg:w-full bg-btnColor h-11 text-[14px] font-bold border-none py-2 my-3 rounded-lg cursor-pointer "
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>

              <div className="text-center mt-4">
                <span className="text-gray-600">Already have an account? </span>
                <span
                  onClick={handleOpenLogingModal}
                  className="text-green-600 hover:underline font-semibold cursor-pointer "
                >
                  Login
                </span>
              </div>



            </div>

          </Modal>
        )
      }

      {/* registration otp verify modal */}

      {
        regOtpVerify && (
          <Modal
            open={regOtpVerify}
            footer={null}
            closable={true}
            onCancel={closeRegOtpModal}
            centered
          // width="400px"
          // style={{ padding: "15px", top: 0 }}
          >

            <div className="text-center py-4">
              <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
              <p className="mb-6 text-sm">
                Enter the 6-digit code sent to your email.
              </p>

              <Form
                form={form}
                onFinish={handleSubmitOtp}
                layout="vertical"
                className="flex flex-col items-center"
                style={{ backgroundColor: "white", color: "black" }}
              >
                <Form.Item
                  label="OTP"
                  name="otp"
                  rules={[
                    { required: true, message: "Please input your OTP!" },
                    {
                      validator: (_, value) =>
                        value && value.toString().length === 6
                          ? Promise.resolve()
                          : Promise.reject("OTP must be 6 digits"),
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Enter your OTP"
                    className="w-full py-1"
                    controls={false}
                    maxLength={6} // visually prevent typing more than 6 digits
                  />
                </Form.Item>

                <Button
                  loading={loading}
                  disabled={loading}
                  htmlType="submit"
                  type="primary"
                  block
                  className="h-11 lg:w-full !w-20 rounded-lg block mx-auto font-semibold bg-btnColor border-none"
                >
                  Verify
                </Button>
              </Form>
            </div>

          </Modal>
        )
      }


      {/* forget password modal start  */}

      <Modal
        open={forgetEmailModal}
        footer={null}
        closable={true}
        onCancel={closeForgetEmailModal}
        maskClosable={false}
        centered
      >
        <Form form={form} onFinish={forgetPasswordEmailSubmit} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              className="py-2"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="lg:w-full bg-btnColor border-none h-11 font-bold text-white text-[14px] mt-1 rounded-lg"
            >
              Verify email
            </Button>
          </Form.Item>
        </Form>
      </Modal>




      {/* forget otp verify  */}


      <Modal
        open={fogetOtpVerify}
        footer={null}
        onCancel={closeForgetOptVerifyModal}
        centered
        maskClosable={false}
        // width="400px"
        style={{ padding: "15px", top: 0 }}
      >
        <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
          <form onSubmit={handleSubmitForgetOtpVerify} style={{ color: "black" }}>
            <label htmlFor="otp" style={{ display: "block", marginBottom: 8 }}>
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="number"
              placeholder="Enter your OTP"
              maxLength={6}
              value={otp}
              className=" hover:outline-0 focus:outline-none "
              onChange={(e) => setOtp(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: error ? "1px solid red" : "1px solid #ccc",
                borderRadius: 4,
                marginBottom: error ? 4 : 16,
                color: "black",
                fontSize: 16,
              }}
            />
            {error && (
              <div style={{ color: "red", marginBottom: 16, fontSize: 14 }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className=" bg-btnColor w-full py-2 text-white rounded-md font-semibold text-lg "
            >
              {loading ? "Verifying..." : "Verify Otp"}
            </button>
          </form>
        </div>
      </Modal>


      {/* set new password modal  */}

      <Modal
        open={newPassword}
        footer={null}
        closable={true}
        onCancel={closeSetNewPasswordModal}
        centered
        maskClosable={false}
      >
        <Form
          name="new_password_set"
          layout="vertical"
          onFinish={submitNewPasswordModal}
          autoComplete="off"
          initialValues={{ email: userEmail }}

        >
          <Form.Item label="Email" name="email">
            <Input
              disabled
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              className="py-2"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="new_password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be minimum 6 characters." },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              className="py-2"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="new_password_confirmation"
            dependencies={["new_password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },

            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
              className="py-2"
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="lg:w-full bg-btnColor border-none h-11 font-bold text-white text-[14px] mt-1 rounded-lg"
            >
              Set new password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* forget password modal end  */}
    </div>
  );
};

export default HomeSlider;

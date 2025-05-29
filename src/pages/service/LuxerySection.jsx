import { Button, Modal, Form, Input, Checkbox, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bookingSuccessAlert } from "../../helper/bookingMsg";
import { ArrowRightOutlined } from "@ant-design/icons";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import GeneralTermCondictionModal from "../../components/client/GeneralTermCondictionModal/GeneralTermCondictionModal";
import useAxiosPublic from "../hooks/useAxiosPublic";
import toast from "react-hot-toast";

const timeSlots = [
  { id: 1, slot: "10:00 AM" },
  { id: 2, slot: "11:00 AM" },
  { id: 3, slot: "12:00 PM" },
  { id: 4, slot: "2:00 PM" },
  { id: 5, slot: "4:00 PM" },
];

const bookedSlots = [
  { date: "2025-04-13", timeId: 1 },
  { date: "2025-04-14", timeId: 2 },
  { date: "2025-04-14", timeId: 3 },
  { date: "2025-04-14", timeId: 4 },
  { date: "2025-04-14", timeId: 5 },
  { date: "2025-04-14", timeId: 1 },
  { date: "2025-04-15", timeId: 3 },
  { date: "2025-04-16", timeId: 4 },
  { date: "2025-04-17", timeId: 5 },
  { date: "2025-04-18", timeId: 1 },
  { date: "2025-04-19", timeId: 2 },
  { date: "2025-04-20", timeId: 3 },
];

export const LuxerySection = () => {
  const axiosPublic = useAxiosPublic();
  const [loading,setLoading] = useState(false)
  // booking related function

  const [selectedDate, setSelectedDate] = useState(new Date());


  const [selectedTime, setSelectedTime] = useState(null);


  const formattedDate = format(selectedDate, "yyyy-MM-dd");


  const isTimeBooked = (timeId) => {
    return bookedSlots.some(
      (slot) => slot.date === formattedDate && slot.timeId === timeId
    );
  };

  const handleTimeClick = (time) => {
    if (!isTimeBooked(time.id)) {
      setSelectedTime(time.id);
    }
  };

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  // booking modal start

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelBookingModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // booking modal end

  const [form] = Form.useForm();

  // Form submit handler
  const handleBooking = async (values) => {
    try {
      const payload = {
        telephone_number: values.number,
        email: values.email,
        name: values.name,
        book_time: String(selectedTime),
        book_date: formattedDate,
      };
      setLoading(true)
      const res = await axiosPublic.post(`/create-book`, payload);
      setIsModalOpen(false);
      form.resetFields();
      bookingSuccessAlert();
    } catch (error) {
      setIsModalOpen(false);
      form.resetFields();
      return toast.error(`Something went wrong`)
    } finally {
      setLoading(false)
    }
  };

  // booking modal end

  // payment modal end

  // general  terms & conditions. modal start
  const [generalTerm, setGeneralTerm] = useState(false);

  const closeGeneralTermModal = () => {
    setGeneralTerm(false);
  };

  const openGeneralTermModal = () => {
    setGeneralTerm(true);
  };

  // general  terms & conditions. modal end

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  return (
    <div className="bg-[#ecebea] lg:mt-16 py-4 p-2 lg:p-0">
      <div className="max-w-[1480px] mx-auto">
        {/* First Row with Images and Text */}
        <div className="flex flex-col lg:flex-row py-4 items-center lg:justify-between gap-5">
          <div className="relative w-full lg:w-[629px] h-[300px] lg:h-[569px]">
            {/* Background Image */}
            <img
              src="./luxery-img2.jpg"
              className="w-full h-full object-cover rounded-2xl opacity-110"
              alt=""
            />
            {/* Left & Right Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 rounded-2xl"></div>
            {/* Bottom Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-transparent to-transparent rounded-2xl"></div>
            {/* Text Content */}
            <h1 className="absolute text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold bottom-11 left-5 lg:left-16 text-white">
              Luxury <br /> retreats
            </h1>
          </div>

          <div className="relative w-full lg:w-[831px] h-[300px] lg:h-[569px]">
            {/* Background Image */}
            <img
              src="./luxery-img1.jpg"
              className="w-full h-full object-cover rounded-2xl opacity-110"
              alt=""
            />
            {/* Bottom Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/100 to-transparent rounded-b-2xl"></div>
            {/* Text Content */}
            <h1 className="absolute text-3xl sm:text-4xl lg:text-5xl font-semibold lg:bottom-48 bottom-40 lg:left-16 left-5 text-white">
              Respite
            </h1>
            <p className="absolute font-semibold text-sm sm:text-lg lg:text-xl bottom-12 lg:left-16 left-5 text-white">
              Our respite care program offers a safe, supportive space for women
              to relax, recharge, and focus on well-being. With comfortable
              accommodations and compassionate staff, we provide a healing
              retreat that fosters hope and personal growth.
            </p>
          </div>
        </div>

        {/* Second Row with Image and Text */}
        <div className="flex flex-col lg:flex-row py-4   lg:justify-between gap-5">
          <div className="lg:max-w-[635px] w-full">
            <img
              src="./luxery-img-3.png"
              className="w-[100%] lg:max-w-[635px] h-[668px] rounded-2xl  object-cover "
              alt=""
            />
          </div>
          <div className="max-w-[825px] w-full rounded-2xl lg:h-[669px] lg:py-20 py-4 lg:pl-16 pl-4 lg:pr-[86px] pr-4 bg-white mx-auto">
            <h1 className="lg:text-[124px] text-4xl sm:text-5xl leading-none mt-3">
              Therapeutic <br />
            </h1>
            <span className="lg:text-7xl w-full text-3xl">wellbeing</span>
            <p className="text-justify lg:text-start lg:mt-6 mt-2 text-lg text-[#263234] leading-7">
              Our therapeutic wellbeing sessions offer a safe space for women to
              explore their feelings and experiences. With trained and
              empathetic counsellors, yoga teachers and other professionals you
              will navigate the complexities of trauma and begin to understand
              your emotions. Through personalised sessions, we aim to empower
              you, helping you find your voice and regain control of your life.
              You will learn coping strategies and gain insights that pave the
              way for healing by and personal growth. Take the courageous step
              towards recovery and discover the strength within you through our
              supportive wellness approach.
            </p>
            <div className="lg:mt-12 mt-5 ">
              <Button onClick={showModal} className=" luxeryBtn ">
                Start your Journey <ArrowRightOutlined />{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* booking modal */}
      <Modal
        title={
          <span className=" text-[#263234] text-2xl leading-9 font-semibold mt-6 ">
            Book Your Schedule
          </span>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 0 }}
        closable={false}
      >
        <p className=" text-[#263234] leading-8 font-semibold text-lg ">
          Basic information
        </p>

        <Form form={form} layout="vertical" onFinish={handleBooking}>
          {/* Name */}
          <Form.Item
            style={{ marginBottom: "0px", marginTop: "16px" }}
            label={
              <span className=" text-[#263234] font-semibold text-xs ">
                Name
              </span>
            }
            rules={[{ required: true, message: "Please enter a name" }]}
            name="name"
          >
            <Input
              className=" placeholder:text-[#818889] "
              style={{
                border: "1px solid #A6ABAC ",
                outline: "none",
                padding: "10px 14px",
                lineHeight: "24px",
                fontSize: "16px",
              }}
              placeholder="Enter your name"
            />
          </Form.Item>

          {/* Telephone number */}
          <Form.Item
            style={{ marginBottom: "0px", marginTop: "16px" }}
            rules={[
              { required: true, message: "Please enter your telephone number" },
            ]}
            label={
              <span className=" text-[#263234] font-semibold text-xs ">
                Telephone number
              </span>
            }
            name="number"
          >
            <Input
              style={{
                border: "1px solid #A6ABAC ",
                outline: "none",
                padding: "10px 14px",
                lineHeight: "24px",
                fontSize: "16px",
              }}
              placeholder="123"
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            style={{ marginBottom: "0px", marginTop: "16px" }}
            label="Email Address"
            rules={[
              { required: true, message: "Please enter your email address" },
            ]}
            name="email"
          >
            <Input
              type="email"
              style={{
                border: "1px solid #A6ABAC ",
                outline: "none",
                padding: "10px 14px",
                lineHeight: "24px",
                fontSize: "16px",
              }}
              placeholder="Enter your email"
            />
          </Form.Item>

          <div>
            <h1 className=" font-semibold text-2xl mt-3 text-[#263234] ">
              Bookings can be made from Monday to Friday.
            </h1>
          </div>

          {/* calender  */}
          <Form.Item style={{ marginBottom: "0px", marginTop: "20px" }}>
            <Calendar
              onChange={handleChange}
              value={selectedDate}
              minDate={new Date()} // disable past dates
              tileClassName={({ date }) => {
                if (
                  format(date, "yyyy-MM-dd") ===
                  format(selectedDate, "yyyy-MM-dd")
                ) {
                  return "bg-[#403730] text-white rounded-full space-x-4 ";
                }
                return "";
              }}
              className="w-full rounded-md"
            />
            <p className="mt-3 text-xl font-medium mb-1 text-[#263234] ">
              Selected Date:{" "}
              <span className="font-medium">
                {" "}
                {format(selectedDate, "EEEE, PPP")}
              </span>
            </p>
          </Form.Item>

          <Form.Item>
            <div className="">
              {timeSlots.every((time) => isTimeBooked(time.id)) ? (
                <p className="text-[#263234] text-lg font-medium ">
                  No available slots for this date
                </p>
              ) : (
                <ul className="mt-2 flex flex-wrap gap-3">
                  {timeSlots.map((time) => {
                    const booked = isTimeBooked(time.id);
                    const selected = selectedTime === time.id;

                    return (
                      <li
                        key={time.id}
                        onClick={() => handleTimeClick(time)}
                        className={`cursor-pointer px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                          booked
                            ? " text-gray-400 cursor-not-allowed"
                            : selected
                            ? "bg-[#403730] cursor-not-allowed hover:bg-[#2D2722] text-white"
                            : "bg-white  hover:bg-[#f0f0f0] text-[#403730] border-[#A6ABAC]"
                        }`}
                      >
                        {time.slot}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </Form.Item>

          {/* Choose a time */}

          {/* Terms */}
          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Please agree with terms and conditions",
              },
            ]}
          >
            <Checkbox>
              <span className=" text-[#263234] text-[14px] leading-5 ">
                I agree with Virtue Hope’s{" "}
                <Link
                  onClick={openGeneralTermModal}
                  className=" underline decoration-solid "
                  to={""}
                >
                  terms & conditions.
                </Link>
              </span>
            </Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <Button onClick={cancelBookingModal} className="serviceBtn2">
              Cancel
            </Button>
            <Button disabled = {loading} loading = {loading} className="serviceBtn3" htmlType="submit">
              Proceed next step
            </Button>
          </div>
        </Form>
      </Modal>

      {/* term condiction modal */}

      {/* general term and condiction modal start  */}
      <div className=" ">
        <Modal
          width={"80%"}
          open={generalTerm}
          style={{ top: 0 }}
          onCancel={closeGeneralTermModal}
          footer={null}
          zIndex={1100}
        >
          <GeneralTermCondictionModal />
        </Modal>
      </div>
      {/* general term and condiction modal end  */}
    </div>
  );
};

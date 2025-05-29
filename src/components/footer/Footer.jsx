import React, { useState } from "react";
import logo from "../../assets/image/logo.svg";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../pages/hooks/useAxiosPublic";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebookF, FaInstagramSquare, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
const Footer = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    setLoading(true);
    try {
      const res = await axiosPublic.post(`/subscriber`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Subscribed successfully.");
        setEmail("");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

  const exploreLinks = [
    { label: "Overview", to: "#" },
    { label: "About us", to: "/about" },
    { label: "Our mission", to: "#" },
    { label: "Podcast & success stories", to: "/podcast" },
    { label: "Way to help", to: "#" },
    { label: "Contact us", to: "/contact" },
  ];

  const involvedLinks = [
    { label: "Services", to: "/service" },
    { label: "Fundraising & Get Involved", to: "/fundraising-get-involved" },
    { label: "Auction Listing & Sale", to: "/auction" },
    { label: "Support Survivors", to: "" },
    { label: "General T&C", to: "/terms" },
  ];

  return (
    <>
      <div className="bg-[#ECEBEA] px-5 pt-8 lg:pt-16 lg:pb-12 pb-6 z-50">
        <div className="max-w-[1074px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between items-center lg:items-start">
            {/* Logo Section */}
            <div className="text-center mt-4 lg:text-left">
              <Link className="flex items-center justify-center lg:justify-start gap-4" to="/">
                <img src={logo} alt="Virtue Hope Logo" className="h-10" />
                <h1 className="text-2xl font-semibold text-[#263234]">Virtue Hope</h1>
              </Link>
              <p className="text-[#4B5557] mt-4">Empowering women through healing and hope.</p>
              <h1 className="text-[#4B5557] my-2 font-bold text-xl">Virtue Hope C.I.C</h1>
              <p className="text-[#4B5557] my-2">86-90 Paul Street, London, EC2A 4NE</p>
              <p className="text-[#4B5557] my-2">Registered Company No.: 16173113</p>
              <p className="text-[#4B5557] my-2">Email: NoReply@virtuehope.com</p>
              <div className=" flex items-center gap-x-3 mt-3 " >
                {/* youtube  */}
                <span>
                  <Link to={"https://www.youtube.com/@VirtueHope"}><FaYoutube   className="text-black"  size={20} /></Link>
                </span>
                <span>
                  <Link to={"https://www.instagram.com/virtue.hope/"}><FaInstagramSquare  className="text-black"  size={20} /></Link>
                </span>
                <span>
                  <Link to={"https://www.tiktok.com/@virtuehopecic_"}><FaTiktok size={20}  className="text-black"  /></Link>
                </span>
                <span>
                  <Link to={"https://www.facebook.com/profile.php?id=61575166415077"}><FaFacebookF  className="text-black"  size={20} /></Link>
                </span>
                <span>
                  <Link to={"https://www.linkedin.com/in/virtue-hope-cic-078531360/"}><FaLinkedin  className="text-black"  size={20} /></Link>
                </span>
                <span>
                  <Link to={"https://x.com/VirtueHopeCIC"}><IoLogoTwitter  className="text-black"  size={20} /></Link>
                </span>
              </div>
            </div>


            {/* Explore Section */}
            <div className="w-full lg:w-auto">
              <h2 className="font-semibold text-[#263234] text-sm ml-8 pt-3">Explore</h2>
              <ul className="mt-2 space-y-2 ml-8 text-sm font-semibold text-[#263234]">
                {exploreLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Get Involved Section */}
            <div className="w-full lg:w-auto">
              <h2 className="font-semibold text-[#263234] text-sm ml-8 pt-3">Get Involved</h2>
              <ul className="mt-2 space-y-2 ml-8 text-sm font-semibold text-[#263234]">
                {involvedLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:w-auto
            ml-6 text-center mt-3 lg:text-left">
              <h2 className="text-[#263234] font-semibold text-sm">Stay Up to Date</h2>
              <div className="flex flex-col lg:flex-row items-center gap-3 mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="border border-gray-300 bg-[#f4f5f7] px-3 py-2 shadow-md text-sm focus:outline-none"
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2 min-w-[120px] rounded text-sm font-bold text-white bg-[#403730] flex items-center justify-center"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                        />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Socials can stay the same or you can convert those to HeroIcons or any SVG lib */}
              <div className="flex justify-center lg:justify-start gap-3 mt-10 lg:mt-28">
                {/* Put your social icons here (SVGs already included in original) */}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1074px] lg:mt-16 mt-4 mx-auto">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between text-[#4B5557] font-thin">
            <p>© {new Date().getFullYear()} Virtue Hope. All rights reserved.</p>
            <ul className="flex gap-4">
              <li>
                <Link to="/terms">Terms</Link>
              </li>
              <li>
                <Link disabled to="#">Privacy</Link>
              </li>
              <li>
                <Link disabled to="">Cookies</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Footer;

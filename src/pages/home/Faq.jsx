import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
const Faq = () => {
  const axiosPublic = useAxiosPublic();
  const [loading,setLoading] = useState(false)
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosPublic.get(`/get-faqs`);
        setData(res.data.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-black via-gray-400 to-gray-700 pb-8">
          FAQs
        </h1>

        <div className="max-w-[1174px] mx-auto flex flex-col lg:flex-row gap-8 justify-between">
          {data.length === 0 ? (
            <>
              <motion.div
                className="flex h-[50vh] w-full items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="flex flex-col items-center text-center gap-4"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                  }}
                >
                  <Loader2 className="animate-spin text-[#403730] w-10 h-10" />
                  <h1 className="text-2xl font-semibold text-[#403730]">
                    Loading FAQs...
                  </h1>
                  <p className="text-gray-500 text-sm max-w-xs">
                    Please wait while we fetch the data
                  </p>
                </motion.div>
              </motion.div>
            </>
          ) : (
            <>
              {/* FAQ Section */}
              <div className="w-full lg:w-3/5">
                <div className="space-y-4">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-[#A6ABAC] shadow rounded"
                    >
                      <button
                        className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center"
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                      >
                        <p className="px-2 text-[#263234] text-lg sm:text-xl font-semibold mt-4 sm:mt-6">
                          {item?.question}
                        </p>
                        <span className="cursor-pointer">
                          {openIndex === index ? (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
                                fill="#4B5557"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 4C12.5523 4 13 4.44772 13 5V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V5C11 4.44772 11.4477 4 12 4Z"
                                fill="#4B5557"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
                                fill="#4B5557"
                              />
                            </svg>
                          )}
                        </span>
                      </button>
                      {openIndex === index && (
                        <div className="px-6 pt-2 pb-4 text-[#4B5557] text-sm sm:text-base">
                          {item?.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Information Box */}
              <div className="w-full lg:w-2/5 bg-white rounded p-6 sm:p-8 lg:p-[64px] text-center flex flex-col items-center justify-center">
                <div>
                  <svg
                    width="65"
                    height="64"
                    viewBox="0 0 65 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_179666_4037)">
                      <path
                        d="M0.5 24L31.316 43.612C31.668 43.872 32.084 44 32.5 44C32.916 44 33.332 43.872 33.684 43.612L64.5 24L33.7 0.399979C33.3535 0.140949 32.9326 0.000976562 32.5 0.000976562C32.0674 0.000976562 31.6465 0.140949 31.3 0.399979L0.5 24Z"
                        fill="#64B5F6"
                      />
                      <path
                        d="M52.5 0H12.5C10.296 0 8.5 1.796 8.5 4V48C8.5 49.104 9.396 50 10.5 50H54.5C55.604 50 56.5 49.104 56.5 48V4C56.5 1.796 54.708 0 52.5 0Z"
                        fill="#ECEFF1"
                      />
                      <path
                        d="M18.5 12H46.5C47.604 12 48.5 11.104 48.5 10C48.5 8.896 47.604 8 46.5 8H18.5C17.396 8 16.5 8.896 16.5 10C16.5 11.104 17.396 12 18.5 12ZM46.5 16H18.5C17.396 16 16.5 16.896 16.5 18C16.5 19.104 17.396 20 18.5 20H46.5C47.604 20 48.5 19.104 48.5 18C48.5 16.896 47.604 16 46.5 16ZM34.5 24H18.5C17.396 24 16.5 24.896 16.5 26C16.5 27.104 17.396 28 18.5 28H34.5C35.604 28 36.5 27.104 36.5 26C36.5 24.896 35.604 24 34.5 24Z"
                        fill="#90A4AE"
                      />
                      <path
                        d="M33.684 43.612C33.332 43.872 32.916 44 32.5 44C32.084 44 31.668 43.872 31.316 43.612L0.5 24V60C0.5 62.208 2.292 64 4.5 64H60.5C62.708 64 64.5 62.208 64.5 60V24L33.684 43.612Z"
                        fill="#1E88E5"
                      />
                      <path
                        d="M60.5 64H4.5C2.256 64 0.5 62.244 0.5 60C0.500179 59.6862 0.574122 59.3768 0.715865 59.0967C0.857607 58.8167 1.06318 58.574 1.316 58.388L31.316 38.388C31.668 38.128 32.084 38 32.5 38C32.916 38 33.332 38.128 33.684 38.388L63.684 58.388C63.9368 58.574 64.1424 58.8167 64.2841 59.0967C64.4259 59.3768 64.4998 59.6862 64.5 60C64.5 62.244 62.744 64 60.5 64Z"
                        fill="#2196F3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_179666_4037">
                        <rect
                          width="64"
                          height="64"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h1 className="mt-6 text-xl sm:text-2xl font-semibold">
                  Need More Information?
                </h1>
                <p className="mt-2 sm:mt-4 text-[#4B5557] text-sm sm:text-base">
                  Our platform simplifies payments and financial management for
                  charities and fundraising. Let us help you make a bigger
                  impact.
                </p>
                <div className="mt-5 sm:mt-8">
                  <Link to={"/contact"}><button className="bg-[#403730] px-6 py-3 text-white text-sm font-bold rounded">
                    Hit a mail us
                  </button></Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Faq;

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import useAxiosPublic from './../hooks/useAxiosPublic';
import { imgUrl } from './../../helper/imgUrl';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

// const testimonials = [
//   {
//     id: 1,
//     name: "Maria",
//     age: 52,
//     quote:
//       "Virtue Hope gave me the strength to heal and the courage to dream again.",
//     image: "/podcast-1.jpg",
//   },
//   {
//     id: 2,
//     name: "Sarah",
//     age: 34,
//     quote:
//       "For the first time in years, I felt safe and hopeful. Thank you, Virtue Hope.",
//     image: "/podcast-2.jpg",
//   },
//   {
//     id: 3,
//     name: "Anima",
//     age: 45,
//     quote:
//       "The women I met at Virtue Hope became my family. Together, we found strength.",
//     image: "/podcast-3.jpg",
//   },
//   {
//     id: 4,
//     name: "Lisa",
//     age: 40,
//     quote: "Virtue Hope showed me a new path to healing and empowerment.",
//     image: "/podcast-1.jpg",
//   },
// ];

export default function PodcastCarousel() {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [testimonials, settesTimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1); // default 1 item per page
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/get-podcast`);
        console.log("response is ", res.data?.data?.data)
        if (res.status === 200) {
          settesTimonials(res.data?.data?.data)
        }
      } catch (error) {

      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [])

  // Handle window resizing to update itemsPerPage
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setItemsPerPage(1); // Show 1 item per page for small and medium devices
    } else {
      setItemsPerPage(3); // Show 3 items per page for larger devices
    }
  };

  useEffect(() => {
    handleResize(); // Set initial items per page based on screen size
    window.addEventListener("resize", handleResize); // Add event listener for resize

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= testimonials.length - (itemsPerPage - 1)
        ? 0
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? testimonials.length - itemsPerPage : prevIndex - 1
    );
  };

  if (testimonials.length === 0) {
    return (
      <div>
        <div className=" flex flex-col justify-center items-center " >
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
                Loading podcast...
              </h1>
              <p className="text-gray-500 text-sm max-w-xs">
                Please wait while we fetch the data
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }


  return (
    <>
      <div className="hidden lg:block relative mt-12 max-w-[1432px] lg:px-16 z-50  mx-auto">
        <div className="flex overflow-hidden justify-between gap-6 flex-wrap">
          {testimonials
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((testimonial, index) => (
              <Link to={"/podcast"}>
                <div
                  key={testimonial.id}
                  className={`relative text-white rounded-lg transition-all duration-500 ${index === currentIndex ? " lg:transform translate-y-1/5 z-50 " : " "
                    }`}
                >
                  <div className="relative">
                    {/* Image with Linear Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/50 to-transparent rounded-2xl"></div>
                    <img
                      src={`${imgUrl}/${testimonial.thumbnail}`}
                      alt={testimonial.podcast_title}
                      className={`rounded-3xl object-cover lg:w-[363px] lg:h-[483px] h-[400px] w-full`}
                    />
                  </div>
                  {/* Text Section */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center w-[90%]">
                    <p className="italic text-xl sm:text-2xl font-medium leading-9">{`"${testimonial.description.slice(0, 25)}"`}...</p>
                    <p className="mt-2 font-bold">{`- ${testimonial.host_title}, ${testimonial.id}`}</p>
                  </div>
                </div>
              </Link>
            ))}

        </div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 hover:bg-[#403730] hover:text-white transition-all duration-700 cursor-pointer transform -translate-y-1/2 bg-white text-black z-40 p-2 rounded-full shadow-md"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 hover:bg-[#403730] hover:text-white transition-all duration-700 top-1/2 transform cursor-pointer -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4">
          {Array.from({
            length: Math.ceil(testimonials.length / itemsPerPage),
          }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${Math.floor(currentIndex / itemsPerPage) === index
                ? "bg-white scale-110"
                : "bg-gray-500"
                }`}
            ></div>
          ))}
        </div>
      </div>
      <div className=" lg:hidden block my-6 " >
        {
          testimonials.length > 0 ? <>
            {
              testimonials.map((testimonial, i) => {
                return (
                  <div className="  " key={i} >
                    <Link to="/podcast">
                      <div className="relative text-white rounded-lg transition-all duration-500">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/50 to-transparent rounded-2xl"></div>
                          <img
                            src={`${imgUrl}/${testimonial.thumbnail}`}
                            alt={testimonial.podcast_title}
                            className="rounded-3xl object-cover h-[400px] w-full"
                          />
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center w-[90%]">
                          <p className="italic text-xl font-medium leading-9">
                            "{testimonial.description.slice(0, 25)}"...
                          </p>
                          <p className="mt-2 font-bold">
                            - {testimonial.host_title}, {testimonial.id}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </> : <></>
        }
      </div>

    </>
  );
}

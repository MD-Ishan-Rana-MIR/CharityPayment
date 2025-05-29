import { useState, useEffect } from "react";

const items = [
  {
    id: 1,
    img: "sliderImg-4.jpg",
    heading: "Selection of long guns",
    title: "Estimated price: $599-$2,000",
    price: "$85,000",
  },
  {
    id: 2,
    img: "sliderImg-5.jpg",
    heading: "American made classic car 1947",
    title: "Estimated price: $9,000-$12,000",
    price: "$18,000",
  },
  {
    id: 3,
    img: "sliderImg-6.jpg",
    heading: "Capturing the first light of day",
    title: "Estimated price: $59-$200",
    price: "$180",
  },
  
];

export default function AutoCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    // Detect screen width and update visible items
    const updateView = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  useEffect(() => {
    // Auto-slide every 3 seconds
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" bg-[#ecebea] p-4 mt-6 " >
      <div className="relative max-w-[1512px] mx-auto">
        {/* Carousel Wrapper */}
        <div className="flex overflow-hidden space-x-4 transition-transform duration-700 ease-in-out">
          {items
            .concat(items) // Duplicate items for infinite loop effect
            .slice(startIndex, startIndex + visibleCount)
            .map((item) => (
              <div
                key={item.id}
                className={`relative ${
                  visibleCount === 1 ? "w-full" : "w-1/3"
                }`}
              >
                <button className=" text-[#263234] cursor-pointer text-sm font-medium px-3 bg-white py-1 rounded absolute mt-3 ml-6 " >Sold out</button>
                <img
                  src={item.img}
                  alt={item.title}
                  className=" lg:w-[542px] w-full p-1 bg-amber-50  lg:h-[608px] h-60 object-cover rounded-lg"
                />
                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 to-transparent rounded-b-lg"></div>
                {/* Text Content */}
                <div className="absolute bottom-5 left-5 text-white">
                  <h2 className="lg:text-3xl text-xl font-bold">{item.heading}</h2>
                  <p className="lg:text-lg text-xl lg:mt-2 ">{item.title}</p>
                  <p className="lg:text-2xl font-semibold">{item.price} <span>(sold out)</span> </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

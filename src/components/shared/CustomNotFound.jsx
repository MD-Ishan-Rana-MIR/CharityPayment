import { FiArrowDownRight, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const CustomNotFound = ({ offBack }) => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex flex-col justify-center items-center lg:h-[840px]">
        <h1 className="lg:text-6xl md:text-1xl text-base font-bold text-gray-600 uppercase text-center">
          data not found
        </h1>
        {!offBack && (
          <div 
          onClick={()=>navigate(-1)}
          className="flex gap-2 items-center justify-center pt-2 text-[#1b69ad] cursor-pointer">
            <FiArrowLeft size={20} color="#1b69ad" />

            {/* <Link className="text-[#1b69ad] " to={"/"}> */}
              Go Back
            {/* </Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomNotFound;

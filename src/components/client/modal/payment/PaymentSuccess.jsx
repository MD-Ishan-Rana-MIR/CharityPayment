import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className=" h-screen flex flex-col items-center justify-center  ">
      <div className=" w-[20%] rounded-md shadow h-[] ">
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg text-center border border-gray-200">
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 w-16 h-16" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your donation. Your support means a lot!
          </p>

          <div className="bg-gray-100 rounded-lg p-4 text-left text-sm text-gray-700">
            <p>
              <span className="font-medium">Transaction ID:</span> #TXN982374
            </p>
            <p>
              <span className="font-medium">Amount:</span> $20.00
            </p>
            <p>
              <span className="font-medium">Date:</span> April 13, 2025
            </p>
          </div>

          <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
            <Link to={"/"}>Go Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

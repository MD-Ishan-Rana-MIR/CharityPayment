import Swal from "sweetalert2";

export const bookingSuccessAlert = () => {
  Swal.fire({
    title:
      "<h2 class='lg:text-left lg:font-semibold text-sm lg:text-lg'>You’re done!</h2>",
    html: "<p class='text-left text-gray-600 text-sm lg:text-lg'>Congratulations, you’ve successfully booked for our service.</p>",
    showConfirmButton: false, // Hide default button
    footer:
      "<div class='flex justify-end'><button id='custom-btn' class='bg-black text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer '>Done</button></div>",
    customClass: {
      popup: "rounded-lg shadow-lg lg:p-6",
    },
    didOpen: () => {
      document.getElementById("custom-btn").addEventListener("click", () => {
        Swal.close();
      });
    },
  });
};

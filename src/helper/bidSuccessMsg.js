import Swal from "sweetalert2";

export const bidSuccessMsg = () => {
  Swal.fire({
    title:
      "<h2 class='lg:text-left lg:font-semibold text-sm lg:text-lg'>Bid submission successful.</h2>",
    html: "<p class='text-left text-gray-600 text-sm lg:text-lg'>We’ll notify you the bid update via email. Get in touch. thank you.</p>",
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

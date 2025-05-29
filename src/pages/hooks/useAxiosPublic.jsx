import axios from "axios";

// const backendUrl = `http://localhost:3000/api/v1`;
const backendUrl = `http://137.59.180.219:8000/api`;

const axiosPublic = axios.create({
  baseURL: backendUrl,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

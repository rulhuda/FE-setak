import axios from "axios";

const axiosPrivate = axios.create({
  withCredentials: true,
})

export default axiosPrivate;
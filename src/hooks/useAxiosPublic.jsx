import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://need-blood-server.vercel.app",
});

function useAxiosPublic() {
  return axiosPublic;
}

export default useAxiosPublic;

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function CreateDonation() {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("10:00");
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });
  const [selectedUpazila, setSelectedUpazila] = useState({ id: "", name: "" });

  //   get district
  useEffect(() => {
    axiosPublic.get("/districts").then((response) => {
      setDistricts(response.data);
    });
  }, [axiosPublic]);

  //   get upazilas
  useEffect(() => {
    if (selectedDistrict.id) {
      axiosPublic
        .get(`/upazilas?district_id=${selectedDistrict.id}`)
        .then((response) => {
          setUpazilas(response.data);
        });
    }
  }, [axiosPublic, selectedDistrict]);

  const handleDistrictChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setSelectedDistrict({
      id: selectedOption.value,
      name: selectedOption.text,
    });
  };

  const handleUpazilaChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setSelectedUpazila({ id: selectedOption.value, name: selectedOption.text });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const recipient_name = form.recipient_name.value;
    const hospital_name = form.hospital_name.value;
    const district = selectedDistrict.name;
    const upazila = selectedUpazila.name;
    const full_address = form.full_address.value;
    const date = form.date.value;
    const time = form.time.value;
    const request_message = form.request_message.value;

    if (
      !name ||
      !email ||
      !recipient_name ||
      !hospital_name ||
      !district ||
      !upazila ||
      !full_address ||
      !date ||
      !time ||
      !request_message
    ) {
      toast.error("You Must Fill All The Fields");
      return;
    }
    const donation = {
      name,
      email,
      recipient_name,
      hospital_name,
      district,
      upazila,
      full_address,
      date,
      time,
      request_message,
      status: "pending",
    };

    axiosPublic.post("/donation-request", donation).then((res) => {
      if (res.data.insertedId) {
        form.reset();
        Swal.fire({
          icon: "success",
          title: "Successfully Create Donation Request",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  if (loading) return <p>Loading..</p>;

  return (
    <div className="p-10 bg-gray-200 rounded-2xl">
      <h2 className="text-center text-5xl font-semibold text-red-500">
        Create Donation Request
      </h2>
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          {/* user row */}
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-5">
            <div className="w-full lg:w-1/2">
              <label className="text-btn-color block mb-2">Name:</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={user.displayName}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="text-btn-color block mb-2">Email:</label>
              <input
                placeholder="Email"
                type="email"
                name="email"
                defaultValue={user.email}
                className="input input-bordered w-full"
                readOnly
              />
            </div>
          </div>
          {/* recipient */}
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 mt-4">
            <div className="w-full lg:w-1/2">
              <label className="text-btn-color block mb-2">
                Recipient Name:
              </label>
              <input
                type="text"
                placeholder="Recipient Name"
                name="recipient_name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="text-btn-color block mb-2">
                Recipient District:
              </label>
              <select
                name="district"
                className="block w-full py-3 pl-4 pr-3 text-black bg-white rounded-lg dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={selectedDistrict.id}
                onChange={handleDistrictChange}
              >
                <option value="" disabled>
                  Select District
                </option>
                {districts.map((district) => (
                  <option key={district._id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* recipient upazila */}
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 mt-4">
            <div className="w-full lg:w-1/2">
              <label className="text-btn-color block mb-2">
                Recipient Upazila:
              </label>
              <select
                className="block w-full py-3 pl-4 pr-3 text-black bg-white rounded-lg dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={selectedUpazila.id}
                onChange={handleUpazilaChange}
                disabled={!selectedDistrict.id}
              >
                <option value="" disabled>
                  Select Upazila
                </option>
                {upazilas.map((upazila) => (
                  <option key={upazila._id} value={upazila.id}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>

            {/* hospital */}
            <div className="w-full lg:w-1/2">
              <label className="text-btn-color block mb-2">
                Hospital Name:
              </label>
              <input
                type="text"
                placeholder="Hospital Name"
                name="hospital_name"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* row */}
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-5 mt-4">
            <div className="w-full lg:w-1/2">
              <label className="text-btn-color block mb-2">Full Address:</label>
              <input
                type="text"
                placeholder="Full Address"
                name="full_address"
                className="input input-bordered w-full"
              />
            </div>

            {/* Donation Date */}
            <div>
              <label className="text-btn-color block mb-2">
                Donation Date:
              </label>
              <DatePicker
                name="date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/dd/yyyy"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="text-btn-color block mb-2">
                Donation Time:
              </label>
              <TimePicker
                name="time"
                onChange={onChange}
                value={value}
                className="h-12 rounded-lg bg-white w-full"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-btn-color block mb-2">
              Request Message:
            </label>
            <textarea
              className="px-3 py-2 w-full rounded-lg"
              name="request_message"
            ></textarea>
          </div>
          <div className="text-center mt-6">
            <button type="submit" className="btn bg-red-500 text-white">
              Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDonation;

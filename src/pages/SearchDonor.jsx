import { useState, useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

function SearchDonor() {
  const axiosPublic = useAxiosPublic();
  const [bloodGroup, setBloodGroup] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    const district = selectedDistrict.name;
    const upazila = selectedUpazila.name;
    // Fetch donors based on search criteria
    const response = await axiosPublic.get("/search-donors", {
      params: {
        bloodGroup,
        district,
        upazila,
      },
    });
    setDonors(response.data);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-5xl text-center text-red-500 font-semibold mb-6">
        Search Donors
      </h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Blood Group
          </label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            District
          </label>
          <select
            value={selectedDistrict.id}
            onChange={handleDistrictChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select District</option>
            {districts.map((dist) => (
              <option key={dist._id} value={dist.id}>
                {dist.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upazila
          </label>
          <select
            value={selectedUpazila.id}
            onChange={handleUpazilaChange}
            disabled={!selectedDistrict.id}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((upa) => (
              <option key={upa._id} value={upa.id}>
                {upa.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        >
          Search
        </button>
      </form>
      {donors.length > 0 && (
        <div>
          <div className="divider">Search Result</div>
          <h2 className="text-3xl text-center text-red-500 font-semibold mb-4">
            <span>{donors.length}</span> Donors Found
          </h2>
          <ul className="space-y-4">
            {donors.map((donor) => (
              <li
                key={donor._id}
                className="p-6 bg-gray-100 rounded-lg shadow-md transition transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center space-x-4 gap-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 rounded-full object-cover"
                      src={donor.image || "default-avatar.png"}
                      alt={donor.name}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold capitalize">
                      {donor.name}
                    </h3>
                    <p className="text-gray-600">
                      Blood Group:{" "}
                      <span className="text-red-500">{donor.bloodGroup}</span>
                    </p>
                    <p className="text-gray-600">District: {donor.district}</p>
                    <p className="text-gray-600">Upazila: {donor.upazila}</p>
                    <p className="text-gray-600">Email: {donor.email}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchDonor;

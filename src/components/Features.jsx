function Features() {
  return (
    <>
      <h2 className="text-center text-red-500 text-3xl lg:text-5xl font-bold mt-10 px-3">
        Features
      </h2>
      <div className="grid lg:grid-cols-3 gap-6 mt-10">
        <div className="p-10 bg-red-50 rounded-xl shadow-xl flex justify-center flex-col items-center">
          <img
            className="w-20 h-20"
            src="https://i.ibb.co/6r8mq3s/blood-transfusion.png"
            alt=""
          />
          <p className="text-xl font-bold mt-5 text-red-500">Blood Donation</p>
          <p className="text-gray-500 mt-3">
            Every donation can save up to three lives. Your contribution ensures
            that hospitals and clinics have a steady supply of blood for those
            in urgent need.
          </p>
        </div>
        <div className="p-10 bg-red-50 rounded-xl shadow-xl flex justify-center flex-col items-center">
          <img
            className="w-20 h-20"
            src="https://i.ibb.co/7KHMwy7/blood-donor.png"
            alt=""
          />
          <p className="text-xl font-bold mt-5 text-red-500">Find Blood</p>
          <p className="text-gray-500 mt-3">
            Enter your location and blood type to find available donors nearby.
            Our extensive database ensures you have the best chance of finding a
            match quickly.
          </p>
        </div>
        <div className="p-10 bg-red-50 rounded-xl shadow-xl flex justify-center flex-col items-center">
          <img
            className="w-20 h-20"
            src="https://i.ibb.co/jRrDRsn/donation.png"
            alt=""
          />
          <p className="text-xl font-bold mt-5 text-red-500">Donate Money</p>
          <p className="text-gray-500 mt-3">
            Your contributions enable us to reach more potential donors through
            awareness campaigns and community events, ensuring a steady supply
            of blood for emergencies.
          </p>
        </div>
      </div>
    </>
  );
}

export default Features;

import { useLoaderData } from "react-router-dom";

function DonationReqDetails() {
  const { data } = useLoaderData();
  console.log(data);
  return <div>DonationReqDetails</div>;
}

export default DonationReqDetails;

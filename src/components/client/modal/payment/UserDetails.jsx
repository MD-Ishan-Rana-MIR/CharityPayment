import { Button, Card, Descriptions, Divider } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const location = useLocation();
  const payload = location.state;
  const userPayload = {
    amount: payload.amount,
    donation_type: payload.donation_type,
    email: payload.email,
    frequency: payload.frequency,
    name : payload.name,
    payment_type : payload.payment_type,
    remark : payload.remark
  }





const navigate = useNavigate();
const donationData = {
  donationType: "recurring",
  amount: payload?.amount,
  frequency: "monthly",
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "+44 123456789",
  message: "For education support",
};

const navigateStripeFrom = () => {
  navigate("/stripe-from", { state: userPayload })
}

const onEdit = () => {
  navigate(`/donate-from/£{userPayload.payment_type}`);
};
const price = Number(payload?.amount)
return (
  <div className="flex flex-col lg:flex-row max-w-[1512px] mx-auto " >
    <div className=" max-w-2xl border mx-auto p-6 bg-white rounded-2xl w-full  shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Review Donation
      </h2>

      <Card className="mb-6 border border-gray-200 shadow-sm">
        <Descriptions
          column={1}
          labelStyle={{ fontWeight: 600 }}
          contentStyle={{ color: "#263234" }}
        >
          <Descriptions.Item label="Donation Type">
            {payload.donation_type === "one_time_donate" ? "one_time_donate" : "recurring"}
          </Descriptions.Item>

          <Descriptions.Item label="Frequency">
            {payload.frequency.charAt(0).toUpperCase() +
              donationData.frequency.slice(1)}
          </Descriptions.Item>

          <Descriptions.Item label="Amount">
            £ {payload.amount}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className="mb-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Donor Information</h3>

        <Descriptions
          column={1}
          labelStyle={{ fontWeight: 600 }}
          contentStyle={{ color: "#263234" }}
        >
          <Descriptions.Item label="Name">{payload.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{payload.email}</Descriptions.Item>
          {payload.phone_number && (
            <Descriptions.Item label="Phone">
              {payload.phone_number}
            </Descriptions.Item>
          )}
          {payload.remark && (
            <Descriptions.Item label="Description">
              {payload.remark}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>

      <Divider />

      <div className="flex justify-between gap-4 mt-6">
        <Button
          onClick={onEdit}
          className="w-1/2 h-12 border font-bold text-[#403730] border-[#717680] hover:bg-[#403730]"
        >
          Edit
        </Button>
        <Button
          onClick={navigateStripeFrom}
          className="w-1/2 h-12 border font-bold text-white bg-[#403730]  border-[#717680] "
        >
          Confirm & Proceed to Payment
        </Button>
      </div>
    </div>

  </div>
);
};

export default UserDetails;

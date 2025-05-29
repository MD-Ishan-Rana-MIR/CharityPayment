import { Card, Button, Descriptions, Divider } from "antd";

const ReviewDonation = () => {
  const donationData = {
    donationType: "recurring",
    amount: "24.50",
    frequency: "monthly",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+44 123456789",
    message: "For education support",
  };

  const onEdit = () => {
    console.log(`go to to edit page`);
  };
  const onConfirm = () => {
    console.log(`Proceed to payment`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
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
            {donationData.donationType === "oneTime" ? "One-Time" : "Recurring"}
          </Descriptions.Item>

          {donationData.donationType === "recurring" && donationData.frequency && (
            <Descriptions.Item label="Frequency">
              {donationData.frequency.charAt(0).toUpperCase() + donationData.frequency.slice(1)}
            </Descriptions.Item>
          )}

          <Descriptions.Item label="Amount">£{donationData.amount}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card className="mb-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Donor Information</h3>

        <Descriptions
          column={1}
          labelStyle={{ fontWeight: 600 }}
          contentStyle={{ color: "#263234" }}
        >
          <Descriptions.Item label="Name">{donationData.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{donationData.email}</Descriptions.Item>
          {donationData.phone && (
            <Descriptions.Item label="Phone">{donationData.phone}</Descriptions.Item>
          )}
          {donationData.message && (
            <Descriptions.Item label="Message">{donationData.message}</Descriptions.Item>
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
          type="primary"
          onClick={onConfirm}
          className="w-1/2 h-12 text-white bg-[#403730] border-none font-bold hover:bg-blue-600"
        >
          Confirm & Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default ReviewDonation;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Radio,
  Tabs,
  Divider,
  Card,
  Descriptions,
} from "antd";
import axios from "axios";
const PaymentDetails = () => {
  const navigate = useNavigate();



  const location = useLocation();
  const userData = location.state?.donation;


  const donationData = {
    donationType: userData.donationType,
    amount: userData.amount,
    frequency: userData.frequency,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    message: userData.message,
  };
  const [loading, setLoading] = useState(false)


  const onEdit = () => {
    navigate(`/paypa-donate-from`);
  };
  
  // paypal payment

  const handlePaypalPayment = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://137.59.180.219:8000/api/create-paypal-payment-intent?amount=${userData.amount}&currency=USD`
      );

      const approvalLink = res?.data?.approve_link;

      if (approvalLink) {
        window.location.href = approvalLink;
      } else {
        console.error("PayPal approval link not found in response.");
      }
    } catch (error) {
      console.error("Error creating PayPal payment intent:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <div className="max-w-2xl border mx-auto p-6 bg-white rounded-2xl shadow-md">
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
              {donationData.donationType === "oneTime"
                ? "One-Time"
                : "Recurring"}
            </Descriptions.Item>

            {donationData.donationType === "recurring" &&
              donationData.frequency && (
                <Descriptions.Item label="Frequency">
                  {donationData.frequency.charAt(0).toUpperCase() +
                    donationData.frequency.slice(1)}
                </Descriptions.Item>
              )}

            <Descriptions.Item label="Amount">
              ${donationData.amount}
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
            <Descriptions.Item label="Name">
              {donationData.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {donationData.email}
            </Descriptions.Item>
            {donationData.phone && (
              <Descriptions.Item label="Phone">
                {donationData.phone}
              </Descriptions.Item>
            )}
            {donationData.message && (
              <Descriptions.Item label="Message">
                {donationData.message}
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
            loading={loading}
            disabled={loading}
            onClick={handlePaypalPayment}
            className="w-1/2 h-12 text-white bg-[#403730] border-none font-bold  "
          >
            Confirm & Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;

import React, { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const PaymentSuccess = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      const appointmentId = searchParams.get("appointmentId");

      if (!sessionId || !appointmentId) {
        toast.error("Missing payment details");
        return;
      }

      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/verify-payment`,
          { sessionId, appointmentId },
          {  headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          toast.success("Payment successful and updated!");
          navigate("/my-appointments", { state: { refresh: true } });
        } else {
          toast.error(data.message || "Payment verification failed");
        }
      } catch (error) {
        console.error("Payment Verification Error:", error);
        toast.error(error.message || "Something went wrong");
      }
    };

    verifyPayment();
  }, [searchParams, backendUrl, token, navigate]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl font-bold">Verifying Payment...</h2>
    </div>
  );
};

export default PaymentSuccess;

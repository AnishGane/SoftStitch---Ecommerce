import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PaymentCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Payment was cancelled");
    // Redirect to home page after 2 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Cancelled</h1>
        <p className="text-gray-600">Redirecting to home page...</p>
      </div>
    </div>
  );
};

export default PaymentCancel;

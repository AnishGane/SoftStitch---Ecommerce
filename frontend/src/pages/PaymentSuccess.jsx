import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Show success message
    toast.success("Payment successful!");
    // Redirect to orders page after 2 seconds
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600">Redirecting to your orders...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;

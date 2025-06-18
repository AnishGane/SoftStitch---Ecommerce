import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const KhaltiPayment = ({ amount, onSuccess, onError }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const initializePayment = () => {
      try {
        // Validate amount
        if (!amount || amount <= 0) {
          throw new Error('Invalid amount');
        }

        // Validate public key
        const publicKey = import.meta.env.VITE_KHALTI_PUBLIC_KEY;
        if (!publicKey) {
          throw new Error('Khalti public key is not configured');
        }

        console.log('Amount being passed to KhaltiPayment:', amount);
        console.log('Khalti Public Key:', import.meta.env.VITE_KHALTI_PUBLIC_KEY);

        const config = {
          publicKey: publicKey,
          productIdentity: `order_${Date.now()}`,
          productName: "SoftStitch Order",
          productUrl: window.location.origin,
          eventHandler: {
            onSuccess: (payload) => {
              console.log('Payment successful:', payload);
              if (payload && payload.token) {
                onSuccess(payload);
              } else {
                onError(new Error('Invalid payment response'));
              }
            },
            onError: (error) => {
              console.error('Payment error:', error);
              toast.error('Payment failed. Please try again.');
              onError(error);
            },
            onClose: () => {
              console.log('Payment window closed');
              toast.info('Payment window closed');
              navigate('/payment/cancel');
            }
          }
        };

        const checkout = new window.KhaltiCheckout(config);
        const amountInPaisa = Math.round(amount * 100); // Convert to paisa
        console.log('Initializing payment with amount:', amountInPaisa);
        checkout.show({ amount: amountInPaisa });
      } catch (error) {
        console.error("Error initializing payment:", error);
        toast.error(error.message || 'Failed to initialize payment');
        onError(error);
      }
    };

    // Load Khalti script
    const script = document.createElement('script');
    script.src = 'https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js';
    script.onload = initializePayment;
    script.onerror = (error) => {
      console.error('Failed to load Khalti script:', error);
      toast.error('Failed to load payment system');
      onError(new Error('Failed to load payment system'));
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [amount, onSuccess, onError, navigate]);

  return null;
};

export default KhaltiPayment; 
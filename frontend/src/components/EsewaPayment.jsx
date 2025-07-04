import { useEffect } from "react";
import axios from "axios";

const EsewaPayment = ({
  amount,
  taxAmount = 0,
  serviceCharge = 0,
  deliveryCharge = 0,
  transactionUUID,
  productCode,
  backendUrl,
  successUrl,
  failureUrl,
}) => {
  useEffect(() => {
    const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;
    axios
      .post(`${backendUrl}/api/esewa/signature`, {
        total_amount: totalAmount,
        transaction_uuid: transactionUUID,
        product_code: productCode,
      })
      .then((res) => {
        const signature = res.data.signature;
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
        form.target = "_self";
        const fields = {
          amount,
          tax_amount: taxAmount,
          total_amount: totalAmount,
          transaction_uuid: transactionUUID,
          product_code: productCode,
          product_service_charge: serviceCharge,
          product_delivery_charge: deliveryCharge,
          success_url: successUrl,
          failure_url: failureUrl,
          signed_field_names: "total_amount,transaction_uuid,product_code",
          signature,
        };
        Object.entries(fields).forEach(([name, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
        return () => {
          document.body.removeChild(form);
        };
      })
      .catch((err) => {
        console.error(err);
      });
  }, [
    amount,
    taxAmount,
    serviceCharge,
    deliveryCharge,
    transactionUUID,
    productCode,
    backendUrl,
    successUrl,
    failureUrl,
  ]);
  return null;
};

export default EsewaPayment;

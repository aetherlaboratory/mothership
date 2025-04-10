"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const PayPalButton = ({ total, items }) => {
  const [isSdkReady, setIsSdkReady] = useState(false);

  useEffect(() => {
    if (isSdkReady && window.paypal) {
      const allowedButtons = [window.paypal.FUNDING.PAYPAL, window.paypal.FUNDING.VENMO];

      allowedButtons.forEach((source) => {
        const style = {
          layout: "vertical",
          shape: "rect",
          ...(source === window.paypal.FUNDING.PAYPAL && {
            label: "paypal",
            color: "gold",
          }),
          ...(source === window.paypal.FUNDING.VENMO && {
            color: "blue",
          }),
        };

        const button = window.paypal.Buttons({
          fundingSource: source,
          style,
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total.toFixed(2),
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              const orderData = {
                timestamp: new Date().toISOString(),
                method: source === window.paypal.FUNDING.VENMO ? "Venmo" : "PayPal",
                items,
                total,
              };

              localStorage.setItem("lastPayPalOrder", JSON.stringify(orderData));

              window.dispatchEvent(new CustomEvent("notify", {
                detail: { message: "🟢 PayPal payment successful!", type: "success" },
              }));

              window.location.href = "/checkout-pending-confirmation";
            });
          },
          onError: (err) => {
            console.error("❌ PayPal error:", err);
            alert("Something went wrong with PayPal.");
          },
        });

        // ✅ Clear the container before rendering to prevent duplicates
        const containerId = `paypal-button-${source}`;
        const container = document.getElementById(containerId);
        if (button.isEligible() && container) {
          container.innerHTML = "";
          button.render(`#${containerId}`);
        }
      });
    }
  }, [isSdkReady, total, items]);

  return (
    <>
      <Script
        src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ PayPal SDK loaded");
          setIsSdkReady(true);
        }}
      />
      <div className="space-y-4 mb-4">
        <div id="paypal-button-paypal" />
        <div id="paypal-button-venmo" />
      </div>
    </>
  );
};

export default PayPalButton;

"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const WP_API_URL = process.env.NEXT_PUBLIC_API_WP;
const WC_API_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL;
const CONSUMER_KEY = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET;
const WP_USERNAME = process.env.NEXT_PUBLIC_WP_USERNAME;
const WP_APP_PASSWORD = process.env.NEXT_PUBLIC_WP_APP_PASSWORD;

async function fetchCurrentUser() {
  const credentials = btoa(`${WP_USERNAME}:${WP_APP_PASSWORD}`);

  try {
    const res = await fetch(`${WP_API_URL}/wp/v2/users/me`, {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch user data.");
    return await res.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

async function updateUserData(userId, values) {
  console.log("🛠 Making PUT request to WooCommerce API...");

  const updateUrl = `${WC_API_URL}/wp-json/wc/v3/customers/${userId}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;

  console.log("🛠 API URL:", updateUrl);
  console.log("🛠 Payload:", JSON.stringify(values));

  try {
    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log("🛠 API Response:", data);

    if (!response.ok) throw new Error("❌ Failed to update user data.");

    // ✅ Trigger Success Notification
    window.dispatchEvent(
      new CustomEvent("notify", {
        detail: { message: "Billing & Shipping updated successfully!", type: "success" },
      })
    );

    return data;
  } catch (error) {
    console.error("❌ Error updating user data:", error);

    // ❌ Trigger Error Notification
    window.dispatchEvent(
      new CustomEvent("notify", {
        detail: { message: "Failed to update. Please try again.", type: "error" },
      })
    );

    return null;
  }
}

export default function BillingPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await fetchCurrentUser();
        if (!user || !user.id) throw new Error("User authentication failed.");

        const wcRes = await fetch(
          `${WC_API_URL}/wp-json/wc/v3/customers/${user.id}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
        );
        const wcUser = await wcRes.json();
        if (!wcUser.id) throw new Error("WooCommerce customer not found.");

        setUserData(wcUser);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Billing & Shipping Information</h1>

      <Formik
        initialValues={{
          billing: userData.billing || {},
          shipping: userData.shipping || {},
          email: userData.email || "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log("✅ Save button clicked! Sending PUT request...");
          
          if (!userData?.id) {
            console.error("❌ User ID is missing. Cannot update data.");
            return;
          }

          const updatedUser = await updateUserData(userData.id, values);
          if (updatedUser) setUserData(updatedUser);

          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Email</label>
              <Field type="email" name="email" readOnly className="w-full p-2 border rounded bg-gray-100" />
            </div>

            <h2 className="text-xl font-bold mt-4 mb-2">Billing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldGroup name="billing.first_name" label="First Name" errors={errors} touched={touched} />
              <FieldGroup name="billing.last_name" label="Last Name" errors={errors} touched={touched} />
              <FieldGroup name="billing.phone" label="Phone" errors={errors} touched={touched} />
              <FieldGroup name="billing.address_1" label="Address" errors={errors} touched={touched} />
              <FieldGroup name="billing.address_2" label="Apartment / Suite" />   
                 <FieldGroup name="billing.city" label="City" errors={errors} touched={touched} />
              <FieldGroup name="billing.state" label="State" errors={errors} touched={touched} />
              <FieldGroup name="billing.postcode" label="Postal Code" errors={errors} touched={touched} />
              <FieldGroup name="billing.country" label="Country" errors={errors} touched={touched} />
            </div>

            <h2 className="text-xl font-bold mt-6 mb-2">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldGroup name="shipping.first_name" label="First Name" />
              <FieldGroup name="shipping.last_name" label="Last Name" />
              <FieldGroup name="shipping.address_1" label="Address" />
            <FieldGroup name="shipping.address_2" label="Apartment / Suite" />
              <FieldGroup name="shipping.city" label="City" />
              <FieldGroup name="shipping.state" label="State" />
              <FieldGroup name="shipping.postcode" label="Postal Code" />
              <FieldGroup name="shipping.country" label="Country" />
            </div>

            <button type="submit" className="mt-6 bg-blue-500 text-white p-2 rounded">
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

// ✅ Helper Component for Input Fields
const FieldGroup = ({ name, label, errors, touched }) => (
  <div>
    <label className="block text-gray-700">{label}</label>
    <Field name={name} className="w-full p-2 border rounded" />
    {errors?.[name] && touched?.[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
  </div>
);

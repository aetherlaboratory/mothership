"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../utils/api"; 
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setError(null);
      setSuccess(null);

      console.log("📌 Sending userData to registerUser:", values);

      const result = await registerUser(values);
      if (result) {
        setSuccess("✅ User registered successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/login"); 
        }, 2000);
      } else {
        setError("❌ Registration failed. Check console for details.");
      }

      setSubmitting(false);
    },
  });

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Register a New User</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input type="text" name="username" {...formik.getFieldProps("username")} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">First Name</label>
          <input type="text" name="first_name" {...formik.getFieldProps("first_name")} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Last Name</label>
          <input type="text" name="last_name" {...formik.getFieldProps("last_name")} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input type="email" name="email" {...formik.getFieldProps("email")} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input type="password" name="password" {...formik.getFieldProps("password")} className="w-full p-2 border rounded" />
        </div>

        <button type="submit" disabled={formik.isSubmitting} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          {formik.isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;

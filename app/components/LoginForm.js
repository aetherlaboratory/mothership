"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../utils/api";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      console.log("✅ User is already logged in, redirecting to dashboard...");
      router.push("/dashboard"); // ✅ Prevents login page from running for logged-in users
    }
  }, []);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      const token = await loginUser(values.username, values.password);
      if (token) {
        router.push("/dashboard"); // ✅ Redirect to dashboard after login
      } else {
        setError("Invalid login credentials. Please try again.");
      }

      setLoading(false);
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading && <p className="text-blue-500 text-center">🔄 Signing In...</p>}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            {...formik.getFieldProps("username")}
            className="w-full p-2 border rounded"
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm">{formik.errors.username}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
            className="w-full p-2 border rounded"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

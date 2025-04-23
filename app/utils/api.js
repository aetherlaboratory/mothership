import axios from "axios";


const WORDPRESS_API_URL = "https://mothership.wordifysites.com/wp-json/wp/v2";
const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL + "/wp-json/wc/v3";
const CONSUMER_KEY = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET;




/**
 * Fetch the current logged-in user's basic details for the Dashboard.
 * @param {string} token - The JWT token of the logged-in user.
 */
export const getUserData = async (token) => {
  try {
    const response = await axios.get("https://mothership.wordifysites.com/wp-json/wp/v2/users/me?context=edit", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Dashboard User Data Retrieved:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching Dashboard user data:", error.response?.data || error.message);
    return null;
  }
};


export const getAdminTokenForMediaUpload = async () => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_WP}/jwt-auth/v1/token`, {
      username: process.env.NEXT_PUBLIC_WP_ADMIN_USERNAME,
      password: process.env.NEXT_PUBLIC_WP_ADMIN_PASSWORD,
    });

    console.log("✅ Admin JWT Token Retrieved:", response.data.token);
    return response.data.token;
  } catch (error) {
    console.error("❌ Failed to retrieve admin token:", error.response?.data || error.message);
    return null;
  }
};



/** ─────────────────────────────────────────────────
 * ✅ PROFILE PAGE API (Fetch Full User Profile)
 * This function is used **only for the profile page**
 * It retrieves user details including nickname, phone, website
 * ─────────────────────────────────────────────────
 */
export const getProfileData = async (token) => {
  try {
    const response = await axios.get(`${WORDPRESS_API_URL}/users/me?context=edit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response?.data;
    console.log("✅ Retrieved Full Profile Data:", user);

    // ✅ Store key profile info in localStorage for global UI access
    if (user) {
      localStorage.setItem("userName", user.nickname || user.username || "Guest");
      localStorage.setItem("userEmail", user.email || "");
      localStorage.setItem("firstName", user.first_name || "");
      localStorage.setItem("lastName", user.last_name || "");
    }

    return user;
  } catch (error) {
    console.error("❌ Error fetching profile data:", error.response?.data || error.message);
    return null;
  }
};


/** ─────────────────────────────────────────────────
 * ✅ PROFILE PICTURE UPLOAD (Upload to Media Library)
 * This uploads an image to the Media Library, returns the URL
 * ─────────────────────────────────────────────────
 */

export const uploadProfilePicture = async (imageFile) => {
  try {
    const adminToken = await getAdminTokenForMediaUpload();

    if (!adminToken) {
      console.error("❌ Admin token not found. Cannot upload image.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("title", imageFile.name);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_WP}/wp/v2/media`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    console.log("✅ Profile Picture Uploaded:", response.data.source_url);
    return response.data.source_url;
  } catch (error) {
    console.error("❌ Profile picture upload failed:", error.response?.data || error.message);
    return null;
  }
};


/** ─────────────────────────────────────────────────
 * ✅ PROFILE UPDATE API (Edit User Details)
 * This function updates core user fields and profile image
 * ─────────────────────────────────────────────────
 */

export const updateProfile = async (token, userData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_WP}/wp/v2/users/me`,
      {
        first_name: userData.first_name,
        last_name: userData.last_name,
        nickname: userData.nickname,
        email: userData.email,
        billing_phone: userData.billing_phone,
        user_website: userData.user_website,
        custom_profile_image: userData.custom_profile_image || null, // ✅ update image URL
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Profile Updated Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating profile:", error.response?.data || error.message);
    return null;
  }
};







/**
 * Register a new user in WordPress.
 */

export const registerUser = async (userData) => {
  try {
    console.log("📌 Sending userData to registerUser:", userData);

    // 1️⃣ Get the Admin JWT Token Securely
    const adminToken = await getAdminToken();
    if (!adminToken) {
      console.error("❌ Cannot create user: Failed to authenticate admin.");
      return null;
    }

    // 2️⃣ Send Registration Request to Correct WordPress Endpoint
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_WP}/wp/v2/users`, // Correct URL
      {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        first_name: userData.first_name,
        last_name: userData.last_name,
        roles: ["subscriber"], // Assign default role
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`, // Authenticate as admin
        },
      }
    );

    console.log("✅ User registered successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Registration error:", error.response?.data || error.message);
    return null;
  }
};






export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      "https://mothership.wordifysites.com/wp-json/jwt-auth/v1/token",
      {
        username: username,
        password: password,
      }
    );

    console.log("✅ Full Login Response:", response.data);

    if (!response.data.token) {
      console.error("❌ No token received from WordPress!");
      return null;
    }

    const token = response.data.token;
    console.log("✅ Extracted Token:", token);

    // ✅ Store in localStorage
    localStorage.setItem("userToken", token);

    return token;
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    return null;
  }
};









export const getAdminToken = async () => {
  try {
    console.log("📌 Admin Username from ENV:", process.env.NEXT_PUBLIC_WP_ADMIN_USERNAME);
    console.log("📌 Admin Password from ENV:", process.env.NEXT_PUBLIC_WP_ADMIN_PASSWORD ? "Loaded" : "Not Found");
    console.log("📌 WordPress API URL:", process.env.NEXT_PUBLIC_API_WP);

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_WP}/jwt-auth/v1/token`, {
      username: process.env.NEXT_PUBLIC_WP_ADMIN_USERNAME,
      password: process.env.NEXT_PUBLIC_WP_ADMIN_PASSWORD,
    });

    console.log("✅ Admin JWT Token Retrieved:", response.data.token);
    return response.data.token;
  } catch (error) {
    console.error("❌ Failed to retrieve admin token:", error.response?.data || error.message);
    return null;
  }
};



/**
 * ✅ Update WooCommerce Customer Billing Info
 * This should be called alongside updateProfile() to sync billing data properly.
 * @param {string} userId - WordPress/WooCommerce User ID
 * @param {object} billing - { city, state, country, postcode }
 */
export const updateWooCustomer = async (userId, billing) => {
  try {
    const response = await axios.put(
      `${WOOCOMMERCE_API_URL}/customers/${userId}`,
      {
        billing: {
          ...billing,
        },
        shipping: {
          ...billing, // ✅ Optional: also update shipping
        },
      },
      {
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET,
        },
      }
    );

    console.log("✅ WooCommerce Customer Billing Updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Woo customer update failed:", error.response?.data || error.message);
    return null;
  }
};

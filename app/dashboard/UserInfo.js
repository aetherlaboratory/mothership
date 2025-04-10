"use client";

const UserInfo = ({ user }) => {
  if (!user) return <p className="text-center text-lg">❌ No user data available</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-4">Dashboard</h2>
      <p><strong>Username:</strong> {user.slug}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Display Name:</strong> {user.name}</p>
    </div>
  );
};

export default UserInfo;

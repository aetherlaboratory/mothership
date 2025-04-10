// hooks/useAuthGuard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserData } from '../utils/api';

export default function useAuthGuard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      setTimeout(() => router.push("/login"), 100);
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getUserData(token);
        if (userData) setUser(userData);
        else router.push("/login");
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  return { user, loading };
}

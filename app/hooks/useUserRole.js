// hooks/useUserRole.js

import { useSession } from 'next-auth/react'; // or your own auth system
import { getRoleLevel } from '../utils/roleMap';

export function useUserRole() {
  const { data: session } = useSession(); // or fetch from Redux/localStorage/etc
  const role = session?.user?.role || 'guest';
  const level = getRoleLevel(role);

  return { role, level };
}

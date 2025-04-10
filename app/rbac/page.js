// app/rbac/page.js
'use client';

import { useEffect, useState } from 'react';
import { AbilityBuilder, Ability } from '@casl/ability';
import { Can } from '@casl/react';
import useAuthGuard from '../hooks/useAuthGuard'; // 🪝 Auth + user fetch
import RBACBoard from './components/RBACBoard';
import { ROLE_LEVELS } from './utils/roleMap';

// 🛠️ Define CASL ability rules for different roles
function defineAbilitiesFor(role) {
  const { can, rules } = new AbilityBuilder(Ability);

  if (role === 'admin') {
    can('manage', 'all');
  } else {
    can('read', 'public');
  }

  return new Ability(rules);
}

export default function RBACPage() {
  const { user, loading } = useAuthGuard(); // 🔐 Secure the page
  const [ability, setAbility] = useState(null);

  useEffect(() => {
    if (!user) return; // ⛔ Wait for user before setting abilities

    const definedAbility = defineAbilitiesFor(user.role || 'guest'); // 🧠 Real role from user
    setAbility(definedAbility);
  }, [user]);

  if (loading || !ability) {
    return <div>Loading access control...</div>; // ⏳ Wait for both auth and rules
  }

  return (
    <Can I="manage" a="all" ability={ability}>
      {(allowed) =>
        allowed ? (
          <RBACBoard />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            ❌ You do not have permission to view this page.
          </div>
        )
      }
    </Can>
  );
}

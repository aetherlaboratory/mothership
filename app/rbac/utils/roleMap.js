// app/rbac/utils/roleMap.js

export const ROLE_LEVELS = {
    unassigned: 0,       // 🆕 NEW
    guest: 1,
    loggedIn: 2,
    contentCreator: 3,
    admin: 4,
  };
  
  export const ROLE_LABELS = {
    0: "Unassigned",
    1: "Logged Out",
    2: "Logged In",
    3: "Content Creator",
    4: "Admin",
  };
  
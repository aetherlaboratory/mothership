// utils/roleMap.js

// Maps WordPress role slug to numeric security level
export const ROLE_LEVELS = {
    guest: 1,
    subscriber: 2,      // default WP role
    customer: 2,        // WooCommerce user
    custom_role: 3,     // Untitled/custom roles
    administrator: 4,
    webmaster: 5,
  };
  
  // Returns level from role string
  export function getRoleLevel(role = 'guest') {
    return ROLE_LEVELS[role] || 3; // fallback to level 3 for unknown/custom roles
  }
  
// app/rbac/utils/accessConfig.js

/**
 * This config defines which pages/components require which role level.
 * This is used by your RBAC system to determine access on the frontend.
 */

export const accessConfig = {
    dashboard: 4,
    settings: 4,
    crud: 3,
    uploads: 3,
    profile: 2,
    cart: 2,
    home: 1,
    login: 1,
  };
  
  /**
   * Get access level for a specific page/component
   */
  export function getAccessLevelFor(id) {
    return accessConfig[id] || 1; // Default to guest access if undefined
  }
  
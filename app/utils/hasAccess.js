// utils/hasAccess.js

import { getRoleLevel } from './roleMap';

/**
 * Check if user role has access to a minimum level
 * @param {string} userRole - The WordPress role slug (e.g. 'subscriber', 'admin')
 * @param {number} minLevel - Required role level (1-5)
 */
export function hasAccess(userRole, minLevel) {
  const currentLevel = getRoleLevel(userRole);
  return currentLevel >= minLevel;
}

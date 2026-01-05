import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { RoleName } from '../../../types/auth.types';

function getUserFromStorage() {
  const raw = sessionStorage.getItem('userLogin') || localStorage.getItem('userLogin');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Normalize roles to an array of ROLE_* strings */
function normalizeRoles(user: any): string[] {
  if (!user) return [];
  if (Array.isArray(user.roles)) {
    return user.roles.map((r: string) => (typeof r === 'string' ? r : String(r)));
  }
  if (typeof user.role === 'string') {
    const r = user.role.trim();
    if (r.startsWith('ROLE_')) return [r];
    // convert 'ADMIN' -> 'ROLE_ADMIN', 'admin' -> 'ROLE_ADMIN'
    return [`ROLE_${r.toUpperCase()}`];
  }
  // fallback: maybe the API returned roleName or role_type etc.
  if (typeof user.roleName === 'string') {
    const r = user.roleName.trim();
    return r.startsWith('ROLE_') ? [r] : [`ROLE_${r.toUpperCase()}`];
  }
  return [];
}

const RequireAdmin: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const location = useLocation();
  const user = getUserFromStorage();
  const roles = normalizeRoles(user);

  // Not signed in -> send to sign-in page
  if (!user) {
    message.warning('Please sign in to access the admin area.');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Signed in but not ROLE_ADMIN -> redirect to home (or you can show 403)
  if (!roles.includes(RoleName.ROLE_ADMIN)) {
    message.error('You are not authorized to access the admin area.');
    return <Navigate to="/" replace />;
  }

  // allowed
  return children;
};

export default RequireAdmin;

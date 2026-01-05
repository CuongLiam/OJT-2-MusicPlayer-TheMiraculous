export function getUserFromStorage() {
  const raw =
    sessionStorage.getItem('userLogin') ||
    localStorage.getItem('userLogin');

  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return !!getUserFromStorage(); //return Boolean(getUserFromStorage());
}

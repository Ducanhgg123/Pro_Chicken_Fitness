export function isCoach(userRoles) {
  if (userRoles?.length > 0 && userRoles.includes("ROLE_COACH")) {
    return true;
  }
  return false;
}

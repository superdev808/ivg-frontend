import { decode } from "jsonwebtoken";
import { getCookie } from "./cookie";
import { get } from "lodash";

export const getUserRole = () => {
  const token = getCookie("appToken");
  const decoded = decode(token);
  const role = get(decoded, "role");
  if (role) {
    return role;
  }
  return null;
};

export const getUserOrganizationName = () => {
  const token = getCookie("appToken");
  const decoded = decode(token);
  const organizationName = get(decoded, "organizationName");
  if (organizationName) {
    return organizationName;
  }
  return null;
}
import { createContext } from "react";

export { AuthContext, AuthProvider } from "./AuthContext";

export const UserContext = createContext(null);
export const ConfirmContext = createContext(null);
export const StripeContext = createContext(null);

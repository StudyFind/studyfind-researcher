import { functions } from "database/firebase";

export const createStudy = functions.httpsCallable("createStudy");
export const updateStudy = functions.httpsCallable("updateStudy");
export const welcomeAccount = functions.httpsCallable("welcomeAccount");
export const setResearcherClaim = functions.httpsCallable("setResearcherClaim");

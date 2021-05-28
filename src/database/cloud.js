import { functions } from "database/firebase";

const generateFunction = (code) => {
  return functions.httpsCallable(code);
};

export const createStudyCloud = generateFunction("createStudy");
export const updateStudyCloud = generateFunction("updateStudy");
export const welcomeAccountCloud = generateFunction("welcomeAccount");
export const setResearcherClaim = generateFunction("setResearcherClaim");

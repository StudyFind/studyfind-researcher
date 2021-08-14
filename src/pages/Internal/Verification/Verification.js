import { useState } from "react";

import VerificationPending from "components/feature/EmailVerificationBanner/VerificationPending";
import VerificationSuccess from "components/feature/EmailVerificationBanner/VerificationSuccess";
import VerificationFailure from "components/feature/EmailVerificationBanner/VerificationFailure";

function Verification() {
  const [state, setState] = useState("pending");
  const email = "yohanjhaveri@gmail.com";
  const loading = false;

  return {
    pending: (
      <VerificationPending
        email={email}
        loading={loading}
        setState={setState}
      />
    ),
    success: <VerificationSuccess email={email} />,
    failure: <VerificationFailure />,
  }[state];
}

export default Verification;

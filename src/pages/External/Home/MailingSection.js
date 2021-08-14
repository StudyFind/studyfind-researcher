import Mailing from "components/feature/External/Mailing/Mailing";
import { firestore } from "database/firebase";

function MailingSection() {
  const handleSubscribe = (email) => {
    firestore.collection("mailing-researcher").add({ email });
  };

  return <Mailing handleSubscribe={handleSubscribe} />;
}

export default MailingSection;

import Tools from "components/feature/External/HomeSections/Tools/Tools";

import PostStudies from "images/post_studies.png";
import SelectParticipants from "images/select_participants.png";
import TrackRecruitment from "images/track_recruitment.png";

function ToolSection() {
  const tools = [
    {
      icon: PostStudies,
      title: "Post Studies",
      description:
        "Post basic study information along with key eligibility criteria and an additional screening survey",
    },
    {
      icon: SelectParticipants,
      title: "Select Participants",
      description:
        "Review responses from interested participants with the option of approving or rejecting based on your needs",
    },
    {
      icon: TrackRecruitment,
      title: "Track Recruitment",
      description:
        "Access data through a dashboard view for each study containing important information about recruitment",
    },
  ];

  return <Tools tools={tools} />;
}

export default ToolSection;

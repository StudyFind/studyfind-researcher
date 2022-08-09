import Features from "components/feature/External/HomeSections/Features/Features";
import { forwardRef } from "react";

import {
  FcDoughnutChart,
  FcMultipleDevices,
  FcPrivacy,
  FcTimeline,
  FcSurvey,
  FcCalendar,
  FcDataSheet,
  FcBarChart,
  FcAlarmClock,
  FcComments,
  FcPlanner,
  FcClock,
  FcDocument,
  FcInspection,
  FcAnswers,
  FcCollaboration,
  FcVideoCall,
  FcOvertime,
  FcHighPriority,
  FcAbout,
  FcApproval,
  FcDisplay,
  FcInfo,
  FcFinePrint,
  FcList,
  FcRules,
} from "react-icons/fc";

function FeatureSection() {
  const features = [
    {
      icon: <FcSurvey />,
      title: "Pre-Screening Survey",
      description:
        "The pre-screening survey can filter participants based on customizable inclusionary and exclusionary criteria",
    },
    {
      icon: <FcBarChart />,
      title: "Participant Eligibility Score",
      description:
        "The participant eligibility score will highlight the most qualified candidates based on their reponses to the survey",
    },
    {
      icon: <FcOvertime />,
      title: "Participant Reminders",
      description:
        "The reminder feature can be customized to alert your participants according to your study's specific needs",
    },
    {
      icon: <FcRules />,
      title: "Participant Notes",
      description:
        "The notes feature allows you to privately record important details for the participants of your study",
    },
    {
      icon: <FcCollaboration />,
      title: "HIPAA Compliant Messaging",
      description:
        "The HIPAA compliant messaging feature allows you to communicate with participants securely and effectively",
    },
    {
      icon: <FcVideoCall />,
      title: "Scheduling Meetings",
      description:
        "The meetings feature enables you to schedule meetings for participants at different milestones in the lifecycle of your study",
    },
    {
      icon: <FcCalendar />,
      title: "Calendar View",
      description:
        "The calendar view allows you to glance at meetings scheduled with participants across all studies",
    },
    {
      icon: <FcAbout />,
      title: "Notification Updates",
      description:
        "The notification feature allows you to recieve timely notification in and out of application through emails and text",
    },
  ];

  return <Features features={features} />;
}

export default FeatureSection;

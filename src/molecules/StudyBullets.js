import React from "react";

import { Grid } from "@chakra-ui/react";
import { FaVenusMars, FaBirthdayCake, FaHeart } from "react-icons/fa";

import StudyBullet from "./StudyBullet";

function StudyBullets({ sex, age, control }) {
  return (
    <Grid gap="10px">
      <StudyBullet icon={FaVenusMars} label="sex" value={sex} defaultValue="All sexes" />
      <StudyBullet icon={FaBirthdayCake} value={`${age} years`} defaultValue="All ages" />
      <StudyBullet
        icon={FaHeart}
        value={
          control === "Yes" ? "Accepts Healthy Volunteers" : "Does Not Accept Healthy Volunteers"
        }
      />
    </Grid>
  );
}

export default StudyBullets;

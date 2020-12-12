import React, { useState }from "react";
import styled from "styled-components";
import PictureViewer from "./ProfilePictureViewer";
import PictureView from "./ProfilePictureView";
import firebase from "firebase";

function ProfilePicture() {
    const [edit, setEdit] = useState(false);
    var user = firebase.auth().currentUser;
    return edit ? (
      <PictureView user={user} setEdit={setEdit} />
    ) : (
      <PictureViewer user={user} setEdit={setEdit} />
    );
}


export default ProfilePicture;


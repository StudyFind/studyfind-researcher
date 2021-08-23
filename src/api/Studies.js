// NOTES

import moment from "moment";
import { firestore } from "database/firebase";

export class Studies {
  constructor(studyID, participantID) {
    this.ref = firestore.collection("studies");

    this.query = this.ref.orderBy("time");
  }

  create({ title, body }) {
    this.ref.add({
      title,
      body,
      time: moment().utc().valueOf(),
    });
  }
}

export class Note {
  constructor(studyID, participantID, noteID) {
    this.id = noteID;
    this.collection = new Notes(studyID, participantID);
  }

  update({ title, body }) {
    this.collection.ref.doc(this.id).update({
      title,
      body,
    });
  }

  delete() {
    this.collection.ref.doc(this.id).delete();
  }
}

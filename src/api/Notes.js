// NOTES

import moment from "moment";
import { firestore } from "database/firebase";

// const getNotesRef = () => {};

// const getNotesQuery = () => {};

// const createNote = () => {};

// const updateNote = () => {};

// const deleteNote = () => {};

export class Notes {
  constructor(studyID, participantID) {
    this.ref = firestore
      .collection("studies")
      .doc(studyID)
      .collection("participants")
      .doc(participantID);

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

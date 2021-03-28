import React, { useState } from "react";
import { useArray } from "hooks";
import { updateStudy } from "database/studies";

import { useParams } from "react-router-dom";
import { firestore } from "database/firebase";
import StatusView from "./StatusView";
import StatusEdit from "./StatusEdit";

function Status({ participant, onClose, study }) {
  const { nctID } = useParams();
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState(participant.status);
  const [loading, setLoading] = useState(false);
  const [
    allStatuses,
    setAllStatuses,
    { appendElement, updateElement, deleteElement, clearArray },
  ] = useArray(
    study.allStatuses.map((status) => ({ value: status, error: { name: false, color: false } }))
  );

  // const statusColors = {
  //   interested: "gray",
  //   screened: "purple",
  //   consented: "cyan",
  //   accepted: "green",
  //   rejected: "red",
  // };

  const colorDic = {
    "#808080": "gray",
    "#800080": "purple",
    "#00ffff": "cyan",
    "#008000": "green",
    "#ff0000": "red",
  };

  const handleCancel = () => {
    setStatus(participant.status);
    onClose();
  };

  const handleSubmit = () => {
    setLoading(true);
    firestore
      .collection("studies")
      .doc(nctID)
      .collection("participants")
      .doc(participant.id)
      .update({ status })
      .then(onClose)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleAllStatusesSubmit = () => {
    const updated = allStatuses.map(({ value }) => ({
      value,
      error: { color: !value.color, name: !value.name },
    }));

    const errors = updated.map((q) => [q.error.color, q.error.name]).flat();
    const invalid = errors.reduce((overall, next) => overall || next);

    if (invalid) {
      setAllStatuses(updated);
      return;
    }

    updateStudy(study.id, { allStatuses: allStatuses.map((q) => q.value) });
    setEdit(false);
  };

  const updateAllStatuses = (index, name, value) => {
    updateElement(
      {
        value: { ...allStatuses[index].value, [name]: value },
        error: { ...allStatuses[index].error, [name]: !value },
      },
      index
    );
  };
  const updateAllColorStatuses = (index, color) => {
    updateElement(
      {
        value: { ...allStatuses[index].value, color: colorDic[color.hex] },
        error: { ...allStatuses[index].error, color: !color.hex },
      },
      index
    );
  };

  const handleAllStatusesCancel = () => {
    setAllStatuses(
      study.allStatuses.map((status) => ({ value: status, error: { name: false, color: false } }))
    );
    setEdit(false);
  };

  return edit ? (
    <StatusEdit
      study={study}
      updateAllStatuses={updateAllStatuses}
      updateAllColorStatuses={updateAllColorStatuses}
      allStatuses={allStatuses}
      deleteStatus={deleteElement}
      handleAllStatusesCancel={handleAllStatusesCancel}
      handleAllStatusesSubmit={handleAllStatusesSubmit}
    />
  ) : (
    <StatusView
      allStatuses={allStatuses}
      status={status}
      study={study}
      setStatus={setStatus}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      loading={loading}
      setEdit={setEdit}
    />
  );
}

export default Status;

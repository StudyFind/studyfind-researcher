import { useState } from "react";

function useArray(initial) {
  const [array, setArray] = useState(initial || []);

  const prependElement = (value) => {
    setArray((prevState) => {
      return [value].concat(prevState);
    });
  };

  const appendElement = (value) => {
    setArray((prevState) => {
      return prevState.concat([value]);
    });
  };

  const insertElement = (value, index) => {
    setArray((prevState) => {
      const before = prevState.slice(0, index);
      const after = prevState.slice(index);
      return before.concat([value]).concat(after);
    });
  };

  const updateElement = (value, index) => {
    setArray((prevState) => {
      const updated = [...prevState];
      updated[index] = value;
      return updated;
    });
  };

  const deleteElementByIndex = (index) => {
    setArray((prevState) => {
      const before = prevState.slice(0, index);
      const after = prevState.slice(index + 1);
      return before.concat(after);
    });
  };

  const deleteElementByValue = (value) => {
    setArray((prevState) => {
      return prevState.filter((element) => JSON.stringify(value) !== JSON.stringify(element));
    });
  };

  const clearArray = () => {
    setArray([]);
  };

  return {
    array,
    prependElement,
    appendElement,
    insertElement,
    updateElement,
    deleteElementByIndex,
    deleteElementByValue,
    clearArray,
  };
}

export default useArray;

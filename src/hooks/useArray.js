import { useState } from "react";

function useArray(initial) {
  const [array, setArray] = useState(initial || []);

  const appendItem = (value) => {
    setArray((prev) => prev.concat([value]));
  };

  const updateItem = (value, index) => {
    setArray((prev) => [...prev.slice(0, index), value, ...prev.slice(index + 1)]);
  };

  const insertItem = (value, index) => {
    setArray((prev) => [...prev.slice(0, index), value, ...prev.slice(index)]);
  };

  const deleteItem = (index) => {
    setArray((prev) => prev.filter((_, i) => i !== index));
  };

  const clearArray = () => {
    setArray([]);
  };

  return [
    array,
    setArray,
    {
      appendItem,
      updateItem,
      insertItem,
      deleteItem,
      clearArray,
    },
  ];
}

export default useArray;

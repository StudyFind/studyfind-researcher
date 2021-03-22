import { useState } from "react";

function useArray(initial) {
  const [array, setArray] = useState(initial || []);

  const appendElement = (value) => {
    setArray((prevState) => prevState.concat([value]));
  };

  const updateElement = (value, index) => {
    setArray((prevState) => prevState.map((e, i) => (i === index ? value : e)));
  };

  const deleteElement = (index) => {
    setArray((prevState) => prevState.filter((_, i) => i !== index));
  };

  const clearArray = () => {
    setArray([]);
  };

  return [
    array,
    setArray,
    {
      appendElement,
      updateElement,
      deleteElement,
      clearArray,
    },
  ];
}

export default useArray;

import { useState } from "react";

function useBoolean(initial) {
  const [value, setValue] = useState(initial | false);

  const toggleValue = () => {
    setValue((prev) => !prev);
  };

  return [value, toggleValue];
}

export default useBoolean;

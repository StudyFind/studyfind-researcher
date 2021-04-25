import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function useTabs(tabs) {
  const { tab } = useParams();
  const history = useHistory();

  const [tabIndex, setTabIndex] = useState(tabs.findIndex((t) => t.name === tab));

  const handleKeyDown = (e) => {
    const reroute = (index) => {
      e.preventDefault();
      history.push(tabs[index]?.name);
    };

    if (document.activeElement.classList.contains("tab")) {
      const last = tabs.length - 1;
      if ([39, 40].includes(e.keyCode)) reroute(tabIndex === last ? 0 : tabIndex + 1);
      if ([37, 38].includes(e.keyCode)) reroute(tabIndex === 0 ? last : tabIndex - 1);
    }
  };

  useEffect(() => {
    setTabIndex(tabs.findIndex((t) => tab === t.name));
  }, [tab]);

  useEffect(() => {
    history.push(tabs[tabIndex]?.name);
  }, [tabIndex]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => document.removeEventListener("keydown", handleKeyDown, false);
  }, [handleKeyDown]);

  return [tabIndex, setTabIndex];
}

export default useTabs;

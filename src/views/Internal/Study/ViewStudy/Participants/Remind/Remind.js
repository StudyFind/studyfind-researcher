import React, { useState } from "react";
import RemindView from "./RemindView";
import RemindEdit from"./RemindEdit";
function Remind({participant, study}) {
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [sunday, setSunday] = useState(false)
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)
    const [times, setTimes] = useState([])
    const [oldReminder, setOldReminder] = useState(-1)
    return edit ? (
        <RemindEdit 
          participant={participant} 
          study={study} 
          setEdit={setEdit} 
          setTitle={setTitle} 
          title={title}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          sunday={sunday}
          setSunday={setSunday}
          monday={monday}
          setMonday={setMonday}
          tuesday={tuesday}
          setTuesday={setTuesday}
          wednesday={wednesday}
          setWednesday={setWednesday}
          thursday={thursday}
          setThursday={setThursday}
          friday={friday}
          setFriday={setFriday}
          saturday={saturday}
          setSaturday={setSaturday}
          times={times}
          setTimes={setTimes}
          oldReminder={oldReminder}
          setOldReminder={setOldReminder}
          />
      ) : (
        <RemindView 
          participant={participant} 
          setEdit={setEdit} 
          setTitle={setTitle}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setSunday={setSunday}
          setMonday={setMonday}
          setTuesday={setTuesday}
          setWednesday={setWednesday}
          setThursday={setThursday}
          setFriday={setFriday}
          setSaturday={setSaturday}
          setTimes={setTimes}
          setOldReminder={setOldReminder}
          />
      );
}
export default Remind;
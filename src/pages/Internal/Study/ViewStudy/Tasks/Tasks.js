import {
  Text,
  Textarea,
  Badge,
  Button,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { Card, Message } from "components";
import { FaPlus, FaMinus, FaChevronDown, FaTimes, FaCheck, FaTrash } from "react-icons/fa";
import TabHeader from "../TabHeader";
import { useState } from "react";

const priorityColors = {
  low: "gray",
  medium: "yellow",
  high: "orange",
  urgent: "red",
};

export default function Tasks() {
  const [expandedTask, setExpandedTask] = useState(-1);
  const [expandedPriorities, setExpandedPriorities] = useState(-1);
  const [description, setDescription] = useState("");
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const [isEditView, setIsEditView] = useState(false);
  const [title, setTitle] = useState("");
  const [taskList, setTaskList] = useState([
    // {
    //   priority: "low",
    //   title: "Test Task 1",
    //   description:
    //     "This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen. This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen",
    // },
    // {
    //   priority: "medium",
    //   title: "Test Task 2",
    //   description:
    //     "This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen. This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen",
    // },
    // {
    //   priority: "high",
    //   title: "Test Task 3",
    //   description:
    //     "This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen. This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen",
    // },
    // {
    //   priority: "urgent",
    //   title: "Test Task 4",
    //   description:
    //     "This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen. This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen This is the long ass description for task 1 it should take up a lot of space. Lorem Ipsum idk the rest Ich kann ein bisschen Deustche sprachen",
    // },
  ]);
  const handleOpenTask = (i) => {
    setExpandedTask(i);
    setDescription(taskList[i].description);
  };
  const handleCloseTask = () => {
    setExpandedTask(-1);
  };
  const handleClosePriorities = () => {
    setExpandedPriorities(-1);
  };
  const handlePrioChange = (i, prio) => {
    setTaskList((prev) => {
      let prevCopy = prev;
      prevCopy[i].priority = prio;
      setExpandedPriorities(-1);
      return prevCopy;
    });
  };
  const handleDescChange = (e) => {
    const newDesc = e.target.value;
    setDescription(newDesc);
  };
  const handleDescSave = (i) => {
    setTaskList((prev) => {
      let prevCopy = prev;
      prevCopy[i].description = description;
      return prevCopy;
    });
    setDescriptionChanged(false);
  };
  const handleRemoveTask = (i) => {
    setTaskList((prev) => {
      return prev.filter((item, j) => {
        return !(i === j);
      });
    });
  };
  return isEditView ? (
    <TaskEditView setTaskList={setTaskList} setIsEditView={setIsEditView} />
  ) : taskList.length ? (
    <>
      <TabHeader heading="Tasks">
        <Button
          colorScheme="blue"
          onClick={() => {
            setIsEditView(true);
          }}
        >
          Create New Task
        </Button>
      </TabHeader>
      <Card width="100%">
        {taskList.map((task, i) => {
          const isExpanded = expandedTask === i;
          const isLast = i + 1 === taskList.length;
          const isPriorityExpanded = expandedPriorities === i;
          return (
            <div key={i}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  padding: "10px",
                  justifyContent: "space-between",
                }}
              >
                <Text fontWeight="500">{task.title}</Text>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: isPriorityExpanded ? "90px" : "18px",
                      transition: "height .5s ease-in-out",
                      overflow: "clip",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Badge
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        textAlign="center"
                        cursor="pointer"
                        minWidth="100px"
                        mr="20px"
                        size="sm"
                        colorScheme={priorityColors[task.priority]}
                        onClick={() => {
                          isPriorityExpanded ? handleClosePriorities() : setExpandedPriorities(i);
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "center" }}>
                          {task.priority}
                        </div>
                        {isPriorityExpanded ? (
                          <FaMinus style={{ marginLeft: "10px" }} />
                        ) : (
                          <FaChevronDown style={{ marginLeft: "10px" }} />
                        )}
                      </Badge>
                    </div>
                    {Object.keys(priorityColors).map((prio, j) => (
                      <Badge
                        textAlign="center"
                        cursor="pointer"
                        minWidth="60px"
                        mr="20px"
                        size="sm"
                        colorScheme={priorityColors[prio]}
                        key={j}
                        onClick={() => {
                          handlePrioChange(i, prio);
                        }}
                      >
                        {prio}
                      </Badge>
                    ))}
                  </div>
                  <FaTrash
                    onClick={() => {
                      handleRemoveTask(i);
                    }}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  />
                  {isExpanded ? (
                    <FaMinus
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleCloseTask();
                        setDescriptionChanged(false);
                      }}
                    />
                  ) : (
                    <FaPlus
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleOpenTask(i);
                      }}
                    ></FaPlus>
                  )}
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: isExpanded ? "200px" : 0,
                  transition: "height .5s ease-in-out",
                  overflow: "clip",
                }}
              >
                <div
                  style={{
                    width: "calc(94% - 16px)",
                    marginLeft: "calc(3% + 8px)",
                    paddingTop: "60px",
                    alignSelf: "end",
                  }}
                >
                  <Text fontWeight="500" fontSize={12} mb="5px">
                    Description
                  </Text>
                  <Textarea
                    onChange={(e) => {
                      handleDescChange(e);
                      setDescriptionChanged(true);
                    }}
                    size="sm"
                    resize="none"
                    value={description}
                    color="gray.500"
                  />
                  {descriptionChanged && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        marginTop: "5px",
                      }}
                    >
                      <div
                        style={{
                          border: "1px solid green",
                          borderRadius: "5px",
                          marginRight: "10px",
                          cursor: "pointer",
                          backgroundColor: "rgba(0,255,0,.2)",
                        }}
                        onClick={() => {
                          handleDescSave(i);
                        }}
                      >
                        <FaCheck color="green" />
                      </div>
                      <div
                        style={{
                          border: "1px solid red",
                          borderRadius: "5px",
                          marginRight: "10px",
                          cursor: "pointer",
                          backgroundColor: "rgba(255,0,0,.2)",
                        }}
                        onClick={() => {
                          setDescription(taskList[i].description);
                          setDescriptionChanged(false);
                        }}
                      >
                        <FaTimes color="red" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {isExpanded && !isLast && (
                <span
                  style={{
                    paddingBottom: "10px",
                    display: "flex",
                    width: "94%",
                    marginLeft: "3%",
                    borderTop: "1px var(--chakra-colors-gray-200) solid",
                  }}
                />
              )}
            </div>
          );
        })}
      </Card>
    </>
  ) : (
    <Message
      title="No Tasks"
      description="Create some tasks for your participants to complete. Set their priority and give them a description. Begin by clicking below!"
      height="400px"
      showBackground
    >
      <Button
        onClick={() => {
          setIsEditView(true);
        }}
      >
        Create Task
      </Button>
    </Message>
  );
}

function TaskEditView({ setTaskList, setIsEditView }) {
  const [isPriorityExpanded, setisPriorityExpdanded] = useState(false);
  const [priority, setPriority] = useState("low");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("Click Here to Edit Task Title");
  const handleDescChange = (e) => {
    const newDesc = e.target.value;
    setDescription(newDesc);
  };
  const handleSubmit = () => {
    setTaskList((prev) => {
      let prevCopy = prev;
      prevCopy.push({ priority, title, description });
      return prevCopy;
    });
    setIsEditView(false);
  };
  return (
    <>
      <TabHeader heading="Create Task">
        <div style={{ display: "flex", alginItems: "end" }}>
          <Button colorScheme="green" onClick={handleSubmit} mr="10px">
            Add to Task List
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              setIsEditView(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </TabHeader>
      <Card width="100%">
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <Editable
            width="100%"
            fontWeight="500"
            paddingRight="10px"
            placeholder="Click Here to Edit Task Title..."
            value={title}
            onChange={(newTitle) => {
              setTitle(newTitle);
            }}
          >
            <EditablePreview pl="10px" />
            <EditableInput pl="10px" />
          </Editable>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: isPriorityExpanded ? "90px" : "18px",
                transition: "height .5s ease-in-out",
                overflow: "clip",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Badge
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  textAlign="center"
                  cursor="pointer"
                  minWidth="100px"
                  mr="20px"
                  size="sm"
                  colorScheme={priorityColors[priority]}
                  onClick={() => {
                    setisPriorityExpdanded(!isPriorityExpanded);
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>{priority}</div>
                  {isPriorityExpanded ? (
                    <FaMinus style={{ marginLeft: "10px" }} />
                  ) : (
                    <FaChevronDown style={{ marginLeft: "10px" }} />
                  )}
                </Badge>
              </div>
              {Object.keys(priorityColors).map((prio, j) => (
                <Badge
                  textAlign="center"
                  cursor="pointer"
                  minWidth="60px"
                  mr="20px"
                  size="sm"
                  colorScheme={priorityColors[prio]}
                  key={j}
                  onClick={() => {
                    setPriority(prio);
                    setisPriorityExpdanded(!isPriorityExpanded);
                  }}
                >
                  {prio}
                </Badge>
              ))}
            </div>
            <FaMinus style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "200px",
            transition: "height .5s ease-in-out",
            overflow: "clip",
          }}
        >
          <div
            style={{
              width: "calc(94% - 16px)",
              marginLeft: "calc(3% + 8px)",
              paddingTop: "60px",
              alignSelf: "end",
            }}
          >
            <Text fontWeight="500" fontSize={12} mb="5px">
              Description
            </Text>
            <Textarea
              onChange={(e) => {
                handleDescChange(e);
              }}
              placeholder="Click Here to Edit Task Description"
              size="sm"
              resize="none"
              value={description}
              color="gray.500"
            />
          </div>
        </div>
      </Card>
    </>
  );
}

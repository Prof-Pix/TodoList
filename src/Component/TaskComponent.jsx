import { useState, useRef, useEffect } from "react";
import { BiError } from "react-icons/bi";
import TaskListComponent from "./TaskListComponent";
import FinishedTaskListcomponent from "./FinishedTaskListcomponent";
import { v4 as uuid } from "uuid";

const TaskComponent = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState(() => {
    const localValueTaskList = localStorage.getItem("TaskList");
    console.log(localValueTaskList);
    return localValueTaskList == null ? [] : JSON.parse(localValueTaskList);
  });

  useEffect(() => {
    localStorage.setItem("TaskList", JSON.stringify(taskList));
  }, [taskList]);

  const [doneTaskList, setDoneTaskList] = useState(() => {
    const localValueDoneTask = localStorage.getItem("DoneTaskList");
    return localValueDoneTask == null ? [] : JSON.parse(localValueDoneTask);
  });
  useEffect(() => {
    localStorage.setItem("DoneTaskList", JSON.stringify(doneTaskList));
  });

  const [error, setError] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddTask = (event) => {
    event.preventDefault();

    if (task) {
      setTaskList([...taskList, { id: uuid(), taskName: task }]);
      setTask("");
      setError("");
    } else {
      setError("The task input can't be empty.");
    }
  };

  const handleDeleteTask = (IDtoRemove) => {
    const filteredTask = taskList.filter((task) => {
      return task.id !== IDtoRemove;
    });
    setTaskList(filteredTask);
  };

  const handleEditTask = (IDtoEdit, newTask) => {
    setTaskList((prevTodoList) => {
      return prevTodoList.map((task) => {
        if (task.id == IDtoEdit) {
          return { ...task, taskName: newTask };
        }
        return task;
      });
    });
  };

  const handleDoneTask = (indexToBeDone) => {
    const finishedTask = taskList[indexToBeDone];

    setDoneTaskList([...doneTaskList, finishedTask]);

    const filteredTask = taskList.filter((task, index) => {
      return index !== indexToBeDone;
    });
    setTaskList(filteredTask);
  };

  const handleRedoTask = (indexToReDo) => {
    const redoTask = doneTaskList[indexToReDo];
    setTaskList([...taskList, redoTask]);

    setDoneTaskList(
      doneTaskList.filter((task, index) => {
        return index !== indexToReDo;
      })
    );
  };

  return (
    <>
      <div className="main-container">
        <section>
          <div className="title-container p-4 d-flex flex-column justify-content-center">
            <h1>TODO LIST</h1>
            <p>
              <i>
                Practice App by <b>Professor Pixels</b>
              </i>
            </p>
          </div>
        </section>
        <section className="lower-section">
          <form className="addTaskContainer form-control">
            <div className="mb-3">
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder="Enter a Task"
                value={task}
                onChange={(event) => {
                  setTask(event.target.value);
                }}
              />
              <div
                style={{ color: "red" }}
                className="d-flex align-items-center mt-2"
              >
                {error && (
                  <>
                    <BiError />
                    {error}
                  </>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-outline-success"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </form>

          <div className="taskList form-control mt-4">
            <h3>Tasks</h3>
            <ul className="list-group">
              {taskList &&
                taskList.map((task, index) => {
                  return (
                    <TaskListComponent
                      key={task.id}
                      index={index} // For the Handle Done Task
                      task={task}
                      handleEditTask={handleEditTask}
                      handleDeleteTask={handleDeleteTask}
                      handleDoneTask={handleDoneTask}
                    />
                  );
                })}
            </ul>
          </div>

          <div
            style={{ backgroundColor: "#0c0a09", color: "white" }}
            className="taskList form-control mt-4"
          >
            <h3>Finished Tasks</h3>
            <ul style={{ listStyleType: "none" }}>
              {doneTaskList &&
                doneTaskList.map((finishedTask, index) => {
                  return (
                    <FinishedTaskListcomponent
                      key={finishedTask.id}
                      finishedTask={finishedTask}
                      index={index}
                      handleRedoTask={handleRedoTask}
                    />
                  );
                })}
            </ul>
          </div>
        </section>
      </div>
      ;
    </>
  );
};

export default TaskComponent;

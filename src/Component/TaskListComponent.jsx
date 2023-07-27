import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiFillSave, AiFillDelete } from "react-icons/ai";
import { MdDoneOutline } from "react-icons/md";

const TaskListComponent = ({
  index,
  task,
  handleEditTask,
  handleDeleteTask,
  handleDoneTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.taskName);

  const onEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleSavingEdit = () => {
    handleEditTask(task.id, editedTask);
    onEdit();
  };

  return (
    <>
      <div>
        <div>
          <li className="list-group-item mb-3 d-flex align-items-center justify-content-between">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                ></input>
              </>
            ) : (
              <b>
                <span>{task.taskName}</span>
              </b>
            )}
            <div className="d-flex column-gap-3">
              <button
                className="btn btn-success"
                onClick={() => {
                  isEditing ? handleSavingEdit() : onEdit();
                }}
              >
                {isEditing ? (
                  <>
                    <div className="d-flex align-items-center column-gap-1">
                      <AiFillSave />
                      Save
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex align-items-center column-gap-1">
                      <FiEdit2 />
                      Edit
                    </div>
                  </>
                )}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteTask(task.id)}
              >
                <div className="d-flex align-items-center column-gap-1">
                  <AiFillDelete />
                  Delete
                </div>
              </button>
              <button
                className="btn btn-warning"
                onClick={() => handleDoneTask(index)}
              >
                <div className="d-flex align-items-center column-gap-1">
                  <MdDoneOutline />
                  Done
                </div>
              </button>
            </div>
          </li>
        </div>
      </div>
    </>
  );
};

export default TaskListComponent;

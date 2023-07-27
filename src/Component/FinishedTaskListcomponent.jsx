import React from "react";
import { LiaRedoAltSolid } from "react-icons/lia";

const FinishedTaskListcomponent = ({ finishedTask, index, handleRedoTask }) => {
  return (
    <>
      <li className="list-group-item d-flex align-items-center justify-content-between mb-3">
        {finishedTask.taskName}{" "}
        <button
          className="btn btn-secondary"
          onClick={() => handleRedoTask(index)}
        >
          <div className="d-flex align-items-center column-gap-1">
            <LiaRedoAltSolid />
            Re-do Task
          </div>
        </button>
      </li>
    </>
  );
};

export default FinishedTaskListcomponent;

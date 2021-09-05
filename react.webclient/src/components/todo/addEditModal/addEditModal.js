import CreatableSelect from "react-select/creatable";
import "./addEditModal.css";
import { todoItemStatus } from "../todoList";

const statusToText = (status) => {
  switch (status) {
    case "notCompleted":
      return "Not completed";
    default:
      return "Completed";
  }
};

const modal = (props) => {
  return props.isShowModal ? (
    <div
      className="modal"
      id="addEditModal"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      role="document">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border border-info">
          <ModalHeader
            isEditMode={props.isEditMode}
            hideModal={props.hideModal}
          />
          <div className="modal-body">
            <div className="p-2 flex-fill">
              <TaskInputGroup
                description={props.description}
                changeTaskDescription={props.changeTaskDescription}
              />
              <StatusInputGroup
                changeStatus={props.changeStatus}
                status={props.status}
              />
              <TagSelect
                isEditMode={props.isEditMode}
                allTags={props.allTags}
                tags={props.tags}
                changeTags={props.changeTags}
              />
            </div>
          </div>
          <ModalFooter
            isEditMode={props.isEditMode}
            hideModal={props.hideModal}
            editTodoItem={props.editTodoItem}
            createNewTodoItem={props.createNewTodoItem}
          />
        </div>
      </div>
    </div>
  ) : null;
};

const ModalHeader = ({ isEditMode, hideModal }) => {
  return (
    <div className="modal-header">
      {isEditMode ? (
        <h5 className="modal-title">Edit</h5>
      ) : (
        <h5 className="modal-title">Add task</h5>
      )}
      <button
        type="button"
        className="close"
        onClick={hideModal}
        aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

const StatusInputGroup = ({ changeStatus, status }) => {
  return (
    <div className="input-group input-group-lg">
      <div className="input-group-prepend">
        <span className="input-group-text">Status</span>
      </div>
      <select className="custom-select" onChange={changeStatus}>
        {Object.entries(todoItemStatus).map(([key, value]) => {
          if (value === parseInt(status)) {
            return (
              <option selected value={value} key={value}>
                {statusToText(key)}
              </option>
            );
          }
          return (
            <option value={value} key={value}>
              {statusToText(key)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const TaskInputGroup = ({ description, changeTaskDescription }) => {
  return (
    <div className="input-group input-group-lg">
      <div className="input-group-prepend">
        <span className="input-group-text">Task</span>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="What do you need to do?"
        value={description}
        onChange={changeTaskDescription}
      />
    </div>
  );
};

const TagSelect = ({ isEditMode, allTags, tags, changeTags }) => {
  const options = getSelectOptions(allTags);

  if (!isEditMode || !tags || tags.length === 0)
    return (
      <CreatableSelect
        className="tagSelect"
        isMulti
        placeholder="Select tags"
        onChange={changeTags}
        options={options}
      />
    );
  else {
    const defaultValue = getSelectDefaultValue(tags);
    return (
      <CreatableSelect
        isMulti
        className="tagSelect"
        placeholder="Select tags"
        defaultValue={defaultValue}
        onChange={changeTags}
        options={options}
      />
    );
  }
};

const getSelectOptions = (allTags) => {
  return allTags.map((tag) => ({ value: tag, label: tag }));
};

const getSelectDefaultValue = (tags) => {
  return tags.map((tag) => {
    if (tag.hasOwnProperty("name")) return { value: tag.name, label: tag.name };
    else return { value: tag, label: tag };
  });
};

const ModalFooter = ({
  isEditMode,
  editTodoItem,
  createNewTodoItem,
  hideModal,
}) => {
  return (
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" onClick={hideModal}>
        Close
      </button>
      {isEditMode ? (
        <button
          type="button"
          className="btn btn-primary float-start"
          onClick={editTodoItem}>
          Update
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary float-start"
          onClick={createNewTodoItem}>
          Create
        </button>
      )}
    </div>
  );
};

export default modal;

import React, { useState } from 'react';
import Task from "../Task/Task";
import styles from "../List/list.module.css";
import { Modal } from "react-bootstrap";


function List(props) {

  // State for the items received as props
  const [listItemValues, setListItemValues] = useState(props.cards);

  // Handeling inputs for the new task
  const [newTaskData, setNewTaskData] = useState({
    id: "",
    title: ""
  })

  // Handeling Show and Close of Adding new Task Modal
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const handleTaskModalClose = () => setShowAddTaskModal(false);
  const handleTaskModalShow = () => setShowAddTaskModal(true);

  // Appending Array of tasks
  const appendtTaskArray = () => {
    setListItemValues([...listItemValues, newTaskData]);
    handleTaskModalClose();
  }

  return (
    <>
      <div className={styles.outer_div}>
        <div className={styles.list_header}>
          <div className={styles.svg_div}>
            <svg fontSize={"20px"} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M15,5 L17,5 L17,3 L15,3 L15,5 Z M7,5 L9,5 L9,3 L7,3 L7,5 Z M15,13 L17,13 L17,11 L15,11 L15,13 Z M7,13 L9,13 L9,11 L7,11 L7,13 Z M15,21 L17,21 L17,19 L15,19 L15,21 Z M7,21 L9,21 L9,19 L7,19 L7,21 Z"></path></svg>
          </div>
          <div className={styles.task_name_div}>
            <p style={{ fontSize: "20px" }}>{props.name}</p>
          </div>
          <div className={styles.icons_div}>
            <div className={styles.edit_icon}
              onClick={() => props.handleEditListModalShow()}>
              <svg
                onClick={() => props.setListToBeEdited(() => ({ ["id"]: props.id, ["text"]: props.name }))}
                stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path>
              </svg>
            </div>
          </div>
          <div className={styles.icons_div}>
            <div className={styles.delete_icon} >
              <svg
                onClick={() => { props.deleteMe(props.id) }}
                stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z"></path></g>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.list_items_div}>
          {
            listItemValues.map((value, index) => {
              return (
                <Task
                  id={value.id}
                  title={value.title}
                />
              );
            })
          }

        </div>
        <div className={styles.add_task_div}>
          <button className="btn btn-success" onClick={handleTaskModalShow} type="button">Click Me!</button>
        </div>
      </div>



      {/* Modal to show up when ADDING A NEW LIST */}
      <Modal show={showAddTaskModal} onHide={handleTaskModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='modal_inputs'>
            <input className={styles.input_tags} type="text" name="TaskTitleInput" id="TaskTitleInput" onChange={(e) => setNewTaskData((prevState) => ({ ...prevState, ["id"]: e.target.value }))} placeholder="Title" />
            <br />
            <input className={styles.input_tags} type="text" name="TaskBodyInput" id="TaskBodyInput" onChange={(e) => setNewTaskData((prevState) => ({ ...prevState, ["title"]: e.target.value }))} placeholder="Description" />
          </div>
          <hr />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-danger" onClick={handleTaskModalClose}>Close</button>
          <button type="button" className="btn btn-secondary" onClick={appendtTaskArray}>Done</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default List;

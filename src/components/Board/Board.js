import React, { useState } from 'react';
import List from "../List/List";
import data from "../Utils/data";
import styles from "../Board/board.module.css";
import { Modal } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Board() {
    const [inputDataList, setInputDataList] = useState(data);

    /*------------ Code for the handeling of Adding of new Lists----------------- */

    // Handeling Input for List Name Input Modal
    const [inputNewListName, setInputNewListName] = useState("");

    // Handeling Show and Close of Adding new List Modal
    const [showAddListModal, setShowAddListModal] = useState(false);
    const handleListModalClose = () => setShowAddListModal(false);
    const handleListModalShow = () => setShowAddListModal(true);

    // Appending the list
    const appendListsArray = () => {
        let x = inputDataList.length + 1;
        setInputDataList([...inputDataList, {
            id: `list-${x}`,
            title: inputNewListName,
            cards: [],
        }]);
        handleListModalClose();
    };
    // Function to show Modal of New list adding
    const addNewListFunc = () => {
        handleListModalShow();
    }
    /*--------------------------------------------------------------------------------------------- */


    /*------------ Code for the handeling of editing the already present Lists--------------------- */
    // List to Be Edited
    const [listToBeEdited, setListToBeEdited] = useState({
        id: "",
        text: "",
    });
    // Handeling Show and Close of Already Exisiting Modal
    const [showEditListModal, setShowEditListModal] = useState(false);
    const handleEditListModalClose = () => setShowEditListModal(false);
    const handleEditListModalShow = () => setShowEditListModal(true);

    // Editing the Array
    const editListsArray = () => {
        let temp = inputDataList;
        temp.map((value, index) => {
            if (value.id === listToBeEdited.id) {
                value.title = listToBeEdited.text;
            }
        });
        setInputDataList(temp);
        handleEditListModalClose();
    }
    /*--------------------------------------------------------------------------------------------- */

    // Deleting the List
    const deleteMe = (key) => {
        let temp_ = [];
        for (let i = 0; i < inputDataList.length; i++) {
            const element = inputDataList[i];
            if (element["id"] == key) {
                continue;
            }
            else {
                temp_.push(element);
            }
        }
        setInputDataList(temp_);
    }

    // Handeling REACT-DND
    const [columns, setColumns] = useState(inputDataList);
    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            let temp = inputDataList;
            let temp_ = [];
            let removed;
            for (let i = 0; i < temp.length; i++) {
                if (i !== source.index) {
                    temp_.push(temp[i])
                }
                else {
                    removed = temp[i]
                }
            }
            temp = temp_;
            temp.splice(destination.index, 0, removed);
            setInputDataList(temp);
        }
    };

    return (
        <>

            <div className={styles.outer_div}>
                <div className={styles.board_header}>
                    <span style={{ fontWeight: "bold" }}>KANBAN BOARD BY HURERA</span>
                    <div>
                        <button id={styles.new_list_btn} onClick={addNewListFunc}>+ Add New List</button>
                    </div>
                </div>
            </div>

            <div className={styles.lists_container}>
                <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)} >
                    {
                        inputDataList.map((value, index) => {
                            return (
                                <>
                                    <Droppable droppableId={index.toString()} >
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.dragHandleProps}
                                                                    {...provided.draggableProps}
                                                                >
                                                                    <List
                                                                        key={index}
                                                                        id={value.id}
                                                                        name={value.title}
                                                                        cards={value.cards}
                                                                        deleteMe={deleteMe}
                                                                        setListToBeEdited={setListToBeEdited}
                                                                        handleEditListModalShow={handleEditListModalShow}
                                                                    />
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                </>
                            )
                        })
                    }
                </DragDropContext>
            </div>

            {/* Modal to show up when ADDING A NEW LIST */}
            <Modal show={showAddListModal} onHide={handleListModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal_inputs'>
                        <input className={styles.input_tags} type="text" name="ListNameInput" id="ListNameInput" onChange={(e) => setInputNewListName(e.target.value)} placeholder="Enter the List Name" />
                    </div>
                    <hr />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={handleListModalClose}>Close</button>
                    <button type="button" className="btn btn-secondary" onClick={appendListsArray}>Done</button>
                </Modal.Footer>
            </Modal>


            {/* Modal to show up when editing an Existing LIST*/}
            <Modal show={showEditListModal} onHide={handleEditListModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal_inputs'>
                        <input className={styles.input_tags} type="text" name="ListNameInput_" id="ListNameInput_" value={listToBeEdited.text} onChange={(e) => setListToBeEdited((prevState) => ({ ...prevState, ["text"]: e.target.value }))} placeholder="Enter the List Name" />
                    </div>
                    <hr />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={handleEditListModalClose}>Close</button>
                    <button type="button" className="btn btn-secondary" onClick={editListsArray}>Done</button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default Board;

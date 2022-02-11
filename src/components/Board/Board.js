import React, { useState } from 'react';
import List from "../List/List";
import styles from "../Board/board.module.css";
import data from "../Utils/data";
import { Modal } from "react-bootstrap";


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
        setInputDataList(inputDataList.filter((value) => {
            return value["id"] !== key;
        }));
    }

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
                {
                    inputDataList.map((value, index) => {
                        return (
                            <List
                                id={value.id}
                                name={value.title}
                                cards={value.cards}
                                deleteMe={deleteMe}
                                setListToBeEdited={setListToBeEdited}
                                handleEditListModalShow={handleEditListModalShow}
                            />
                        )
                    })
                }
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

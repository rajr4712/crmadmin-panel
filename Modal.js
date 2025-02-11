import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CustomModal = ({ show, handleClose, title, body, primaryText, secondaryText, handleClick }) => {


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
     
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {secondaryText || "Close"}
        </Button>
       
        <Button variant="primary" onClick={handleClick} >
          {primaryText || "Update Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};



export default CustomModal;

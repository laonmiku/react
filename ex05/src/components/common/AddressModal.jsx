import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';

const AddressModal = ({setForm,form}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onComplete=(e)=>{
        console.log(e);
        const address=e.buildingName ? `${e.address}(${e.buildingName})` : e.address ;
        setForm({...form,address1:address});
        handleClose();
    }
    return (
        <>
        <Button variant='light' className='border border-1 w-25'   onClick={handleShow}>
          검색
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          top={'20%'}
        >
          <Modal.Header closeButton>
            <Modal.Title>주소검색</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DaumPostcodeEmbed onComplete={onComplete}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default AddressModal
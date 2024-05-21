import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalBook = ({ book }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {title, contents, thumbnail,authors, publisher,price} = book; 
    //이러케 정의해주면 {book.title}안해도됨

    return (
        <>
           
            <img onClick={handleShow} src={thumbnail || 'http://via.placeholder.com/120x170'} width='100%'/>
            

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>저자 : {authors}</div>
                    <div>출판사 : {publisher}</div>
                    <div>가격 : {price}원</div>
                    <hr/>
                    <div className='contentsTextColor'>{contents}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalBook
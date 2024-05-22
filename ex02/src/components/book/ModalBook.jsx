import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BookStory from './BookStory';


const ModalBook = ({bookModal}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {title, thumbnail, publisher,contents, isbn, price,authors} = bookModal;
    
  
    return (
        <>
            
            <img  src ={thumbnail || 'http://via.placeholder.com/120x170'} 
                onClick={handleShow} width="100%"/>

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
                    <div className='ellipsis2 '>
                        {contents ||  "미리보기 내용을 찾을 수 없습니다"}
                    </div> 
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </>
    )
}

export default ModalBook
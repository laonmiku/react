import axios from 'axios';
import { useEffect, useState } from 'react';
import {Button,Table,InputGroup} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const ModalOrder = ({pid,order}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [books,setBooks] = useState([]);
    const handleShow = () => setShow(true);
    const callAPI=async()=>{
      const res= await axios.get(`/orders/books?pid=${pid}`);
      console.log(res.data);
      setBooks(res.data);
    }
    useEffect(()=>{
      callAPI();
    },[])

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow} size='sm'>
                주문상품
            </Button>

            <Modal style={{top:'20%'}}
                show={show} size='lg'
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>주문상품</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='my-2 '  >
                      <InputGroup.Text className='mb-2'>주문번호 : {pid}</InputGroup.Text>
                      <InputGroup.Text>배송지 : {order.address1} - {order.address2}</InputGroup.Text>
                    </div>
                    <hr/>
                    <Table>
                    <colgroup>
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '10%' }} />
                            
                        </colgroup>
                      <thead>
                        <tr  >
                          <td >아이디</td>
                          <td className='text-center'>제목</td>
                          <td className='text-end'>가격</td>
                          <td className='text-center'>수량</td>
                          <td className='text-end'>금액</td>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map(book=>
                          <tr key={book.pid}>
                            <td>{book.bid}</td>
                            <td>
                              <img  src={book.image} width="30px"/>
                              {book.title}
                            </td>
                            <td className='text-end'>{book.fmtprice}원</td>
                            <td  className='text-center'>{book.qnt}개</td>
                            <td className='text-end me-5'>{book.fmtsum}원 </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalOrder
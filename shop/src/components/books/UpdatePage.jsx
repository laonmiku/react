import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Row, Col,Card, InputGroup, Form, Button,Alert } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ModalImage from './ModalImage';


const UpdatePage = () => {
    const {bid} = useParams();

    const [form, setForm] = useState({
        bid: bid,
        title:'',
        price:'',
        contents:'',
        author:'',
        image:'',
        fmtdate:'',
        bigimage:''
    });
    const {title,contents,price,author,image,fmtdate,bigimage} = form;

    

    const callAPI = async()=>{
        const res = await axios.get(`/books/read/${bid}`);
        console.log(res.data);
        setForm(res.data);
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onChangeForm =(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    const onUpdate =async()=>{
        if(!window.confirm("수정된 정보를 저장하실래요?")) return;
        //수정하기
        const res= await axios.post('/books/update',form);
        if(res.data.result===1){
            alert("수정완료!");
            callAPI();
        }
    }
    const onChangePrice = (e) => {
        const result=e.target.value.replace(/[^0-9]/g,''); //0-9가아니면 ''을 되게해라,,입력막기
        setForm({...form, price:result});
      }

    return (
        <Row className='my-5'>
            <Col xs={12} md={10} lg={8}>
                <Card>
                    <Card.Header>
                        <h1 className='text-center'>[{bid}]도서 정보 수정</h1>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col xs={2} className='mb-2 text-center pt-2'>
                               <ModalImage  bigimage={bigimage} callAPI={callAPI}/>
                            </Col>
                            <Col className=''>
                                <form>
                                    {fmtdate &&
                                        <div className='mb-1'>
                                            수정일 : {fmtdate}
                                        </div>
                                    }
                                    <InputGroup className='mb-2 '>
                                        <InputGroup.Text>도서제목</InputGroup.Text>
                                        <Form.Control onChange={onChangeForm} name='title' value={title}/>
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>도서가격</InputGroup.Text>
                                        <Form.Control  onChange={onChangePrice} name='price' value={price}/>
                                    </InputGroup>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>도서저자</InputGroup.Text>
                                        <Form.Control onChange={onChangeForm} name='author' value={author}/>
                                    </InputGroup>
                                </form>
                            </Col>
                            <div>
                                <Form.Control onChange={onChangeForm} name='contents' value={contents} as="textarea" rows={10}/>
                            </div>
                            <div className='text-center mt-3'>
                                <Button onClick={onUpdate} className='me-2' variant='outline-primary'>정보수정</Button>
                                <Button onClick={callAPI} variant='outline-secondary'>수정취소</Button>
                            </div>
                        </Row>
                    </Card.Body>
                </Card> 
            </Col>
        </Row>
    
    )
}

export default UpdatePage
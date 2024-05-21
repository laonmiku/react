import React, { useState } from 'react'
import {Row, Col, Button} from 'react-bootstrap';


const Message = () => {
   
    const [message,setMessage]=useState("버튼을 누르세요");
    const [textColor,setTextColor]=useState("lightgray");

    return (
        <>
            <Row className='my-5'>
                <Col>
                    <h1 style={{color:textColor}}>{message}</h1>
                    <Button onClick={()=>setMessage('안녕하세요')} className="m-3">입장</Button>
                    <Button onClick={()=>setMessage('안녕히가세요')}>퇴장</Button>
                    <br/>
                    <Button onClick={()=>setTextColor('red')} className="m-3" variant="outline-danger">빨강</Button>
                    <Button onClick={()=>setTextColor('blue')} className="m-3" variant="outline-primary">파랑</Button>
                    <Button onClick={()=>setTextColor('green')} className="m-3" variant="outline-success">초록</Button>
                </Col>
            </Row>
        </>
    )
}

export default Message
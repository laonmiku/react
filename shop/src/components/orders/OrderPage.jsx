import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row,Col,Card,Form,Table, Button, Alert, InputGroup} from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import ModalAddress from '../users/ModalAddress';
import { v4 } from 'uuid';

const OrderPage = ({books,setBooks}) => {
    const uuid= v4();
    const pid= uuid.substring(0,13);
    const [total, setTotal] = useState(0); 
    const [form,setForm] = useState({
        uid:"",
        uname:"",
        phone:"",
        address1:"",
        address2:""
    });
    const  {uid, uname,phone,address1,address2}=form;

    const callAPI=async()=>{
       
        const res=await axios.get(`/users/read/${sessionStorage.getItem('uid')}`);
        setForm(res.data);
    }
    useEffect(()=>{
        callAPI();
    },[])
    useEffect(()=>{
        const data = books.filter(book=>book.checked);
        
        let totalSum =0;
        data.forEach(book=>{
            totalSum+= book.sum;
        });
        setTotal(totalSum);
        setBooks(data);
        
    },[])

    const onChangeForm = (e) => {
        setForm({...form,[e.target.name]:e.target.value});
    }
    /*
    const onClickOrder =async()=>{
        if(!window.confirm(`${books.length}건을 주문하실래요?`)) return;    
        //주문자정보
        const res= await axios.post(`/orders/purchase`,{
            ...form, sum:total, pid,uid
        });
        if(res.data.result===1){//purcharse테이블저장완료
            books.forEach(async book=>{
                const res=await axios.post('/orders/insert',{
                    pid, bid:book.bid, price:book.price, qnt:book.qnt}); //주문상품저장하기 orders테이블
                if(res.data.result===1){
                    await axios.post('/cart/delete',{uid,bid:book.bid}); //장바구니에있던거삭제
                }
            });
        alert("주문완료!");
        window.location.href="/";
        }
    }*/
    const onClickOrder = async() => {
        if(!window.confirm(`${books.length}건의 도서를 주문하실래요?`)) return;
        //주문자정보입력
        const res=await axios.post('/orders/purchase',{
          ...form, sum:total, pid, uid});
        if(res.data.result===1){
            let cnt=0;
            books.forEach(async book=>{
                //주문상품입력
                await axios.post('/orders/insert',{
                        pid, bid:book.bid, price:book.price, qnt:book.qnt}); 
                //장바구니상품삭제
                await axios.post('/cart/delete', {uid, bid:book.bid}); 
                cnt++; 
                if(cnt===books.length){
                    alert("주문이 완료되었습니다.");
                    window.location.href="/"; 
                }
                    
                       
          }); 
        }
      }


  return (
    <div className='my-5'>

        <h1 className='text-center mb-5'>주문하기</h1>
        <Table striped bordered hover>
        <colgroup>
                            <col style={{ width: '3%' }} />
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '5%' }} />
                            <col style={{ width: '10%' }} />
                            
                        </colgroup>
            <thead>
                <tr>
                    <td>아이디</td>
                    <td>도서명</td>
                    <td>단가</td>
                    <td>수량</td>
                    <td>금액</td>
                </tr>
            </thead>
            <tbody>
                {books.map(book=>
                    <tr key={book.bid}>
                        <td>{book.bid}</td>
                        <td className='text-start ps-5'>
                            <img src={book.image} width="30px" />
                            <span className='mx-2'>{book.title}</span>
                        </td>
                        <td>{book.fmtprice}원</td>
                        <td>{book.qnt}</td>
                        <td>{book.sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
                    </tr>
                )}
            </tbody>
            
        </Table>
        <Alert className='text-end pe-5'>총합계: {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Alert>
        <Card>
            <Card.Header>
                <h3 className='text-center'>주문자정보</h3>
            </Card.Header>
            <Card.Body className='text-center'>
                <InputGroup className='mb-3 '>
                    <InputGroup.Text className='orderpage_title justify-content-center'>주문ID</InputGroup.Text>
                    <Form.Control  value={pid} />
                </InputGroup>
                <InputGroup className='mb-3 '>
                    <InputGroup.Text className='orderpage_title justify-content-center'>주문자명</InputGroup.Text>
                    <Form.Control name='uname' value={uname}  onChange={onChangeForm}/>
                </InputGroup>
                <InputGroup className='mb-3  '>
                    <InputGroup.Text  className='orderpage_title justify-content-center'>연락처</InputGroup.Text>
                    <Form.Control name='phone' value={phone}  onChange={onChangeForm}/>
                </InputGroup>
                <InputGroup className='mb-3 '>
                    <InputGroup.Text  className='orderpage_title justify-content-center'>주소</InputGroup.Text>
                    <Form.Control name='address1' value={address1}  onChange={onChangeForm}/>
                    <ModalAddress form={form} setForm={setForm}/>
                </InputGroup>
                <InputGroup className='mb-3 '>
                    <Form.Control name='address2' value={address2}  onChange={onChangeForm}/>
                </InputGroup>
                <Button variant='outline-primary' className='px-5' onClick={onClickOrder}>주문하기</Button>
            </Card.Body>
        </Card>
    </div>

  )
}

export default OrderPage
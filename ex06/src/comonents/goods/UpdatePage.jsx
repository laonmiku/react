import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Row,Col,InputGroup, Form, Button, Card} from 'react-bootstrap'
import Detail from './Detail';

const UpdatePage = () => {
    const [loading,setLoading] = useState(false);
    const {gid} = useParams();
    const [form, setForm]= useState({
        title:'',
        contents:'',
        price:0,
        image:'',
        maker:'',
        brand:''
    });
    const [goods, setGoods]= useState([]);
    const [file, setFile] = useState({
        fileBytes : null,
        fileName :'' 
    });
    const refFile = useRef();

    const callAPI= async()=>{
        setLoading(true);
        const res = await axios.get(`/goods/read/${gid}`);
        console.log(res.data);
        const data={...res.data,
            price:res.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            contents:res.data.contents || ''}   
        setForm(data);
        setGoods(data);
        setFile({name:res.data.image, byte:null});
        setLoading(false);
    } 
    const {title,price,maker,brand,image} = form;
    useEffect(()=>{
        callAPI();
      }, []); 
    const onChangeForm = (e) => {
        if(e.target.name==='price'){
          let price=e.target.value.replace(/[^0-9]/g,''); //숫자만입력
          price=price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); //세자리 컴마
          setForm({...form, price});
        }else{
          setForm({...form, [e.target.name]:e.target.value});
        }
    }
    const onclickReset =()=>{
        if(JSON.stringify(goods)===JSON.stringify(form)) return;
        if(!window.confirm('변경된 정보를 취소하실래요?')) return;
        callAPI();
    }
    const onClickUpdate=async()=>{
        if(JSON.stringify(goods)===JSON.stringify(form)) return;
        if(!window.confirm('변경된 정보를 저장하실래요?')) return;
        await axios.post('/goods/update', {...form,price:price.replace('','')});
        callAPI();
        alert('저장완료!');
    }
    const onChangeFile =(e)=>{
        setFile({
            name:URL.createObjectURL(e.target.files[0]),
            byte:e.target.files[0] 
        });
    }
    const onClickImageSave =async()=>{
        if(file.byte==null) return;
        if(!window.confirm('변경된이미지를저장하실래요?')) return;
        //이미지업로드
        const formData = new FormData();
        formData.append("byte", file.byte);
        await axios.post(`/goods/update/image/${gid}`, formData);
        alert("이미지변경완료!");
    }
    if(loading) return <h1>로딩중......</h1>;
    return (
        <div>
            <h1 className='my-5'>상품 정보 수정</h1>
            <Card className='my-3'> 
                <Row className='justify-content-center'>
                    <Col className='py-3'>
                    <div  className='mx-2 pb-2 px-2 border border-1'>
                        <img onClick={()=>refFile.current.click()} src={file.name || 'http://via.placeholder.com/150x170'} style={{cursor:'pointer'}} width='60%'/>
                        <input ref={refFile} onChange={onChangeFile} type='file' style={{display:'none'}}/>
                        <div>
                            <Button onClick={onClickImageSave} className='w-100 mt-1 border border-1' variant='light'>이미지저장</Button>
                        </div></div>
                    </Col>
                    <Col xs={8} md={8} lg={8}>
                        <Card.Body>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>상품코드</InputGroup.Text>
                                <Form.Control  className='bg-light' onChange={onChangeForm} value={gid} name='gid' readOnly/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>상품이름</InputGroup.Text>
                                <Form.Control onChange={onChangeForm} value={title} name='title'/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>상품가격</InputGroup.Text>
                                <Form.Control onChange={onChangeForm} value={price} name='price'/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>제조사명</InputGroup.Text>
                                <Form.Control onChange={onChangeForm} value={maker} name='maker'/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>브랜드명</InputGroup.Text>
                                <Form.Control  onChange={onChangeForm} value={brand} name='brand'/>
                            </InputGroup>
                            <div className='mt-3'>
                                <Button className='me-2' onClick={onClickUpdate} variant='outline-primary'>정보수정</Button>
                                <Button variant='outline-secondary' onClick={onclickReset}>수정취소</Button>
                            </div>
                        </Card.Body>
                    </Col> 
                </Row>
            </Card>
            <Detail form={form} setForm={setForm} callAPI={callAPI} goods={goods}/>
        </div>
    )
}

export default UpdatePage
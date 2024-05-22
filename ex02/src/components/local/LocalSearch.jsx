import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table, Button, InputGroup, Form, Col, Row} from 'react-bootstrap';
import ModalMap from './ModalMap';

const LocalSearch = () => {
  const [count,setCount] = useState(0);
  const [isEnd,setIsEnd] = useState(false);
  const [locals,setLocals] = useState([]);
  const [query,setQuery] = useState('가산디지털');
  const [page,setPage] = useState(1);
  const [size, setSize] = useState(10);

  const callAPI =async()=>{
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&page=${page}&size=${size}`;
    const config={
      headers:{"Authorization":"KakaoAK f3d977d0f78639ca211ff67b0676d64c"}
    };
    const res= await axios.get(url, config);
    console.log(res.data);
    setLocals(res.data.documents);
    setIsEnd(res.data.meta.is_end);
    setCount(res.data.meta.pageable_count);
  }

  useEffect(()=>{
    callAPI();
  },[page,size]);

  const onSubmit=(e)=>{
    e.preventDefault();
    if(query===""){
      alert("검색어를 입력하세요!");
  }else{
      callAPI();
      setPage(1);
  }
  }

  const onChangeSize=(e)=>{
    
    setPage(1);
    setSize(e.target.value);
  }

  return (
    <div  className="my-5 ">
      <h1 className='mb-5'>지역검색</h1>
      <Row className='mb-2'>
        <Col xs={8} md={6} lg={4}>
          <form onSubmit={onSubmit}>
            <InputGroup>
              <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
              <Button type="submit">검색</Button>
            </InputGroup>
          </form>
        </Col>
        <Col className='text-start '>
          <div>검색수 : {count}건</div>
        </Col>
        <Col xs={2}>
          <Form.Select onChange={onChangeSize}>
            <option value="5" selected={size===5}>5행</option>
            <option value="10" selected={size===10}>10행</option>
            <option value="15" selected={size===15}>15행</option>
          </Form.Select>
        </Col>
        
      </Row>
      <Table striped  bordered hover>
        <thead>
          <tr className='table-secondary '>
            <td >아이디</td>
            <td >지역명</td>
            <td >전화번호</td>
            <td >주소</td>
            <td >지도보기</td>
          </tr>
        </thead>
        <tbody>
          {locals.map( local => 
            <tr key={local.id}>
              <td>ID : {local.id}</td>
              <td><div className='ellipsis'>{local.place_name}</div></td>
              <td><div className='ellipsis'>{local.phone || 'x'}</div></td>
              <td><div className='ellipsis'>{local.address_name}</div></td>
              <td><ModalMap local={local}/></td>
           </tr>
          )}
        </tbody>
      </Table>
      <div className="my-3">
        <Button onClick={()=>setPage(page-1)} disabled={page===1} className="mx-3 " variant='dark'>이전</Button>
        <span>{page}</span>
        <Button onClick={()=>setPage(page+1)} disabled={isEnd} className="mx-3" variant='dark'>다음</Button>
      </div>
    </div>
  )
}

export default LocalSearch
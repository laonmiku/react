import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Table, Button, InputGroup, Form, Col, Row} from 'react-bootstrap';
import ModalMap from './ModalMap';
import {app} from '../../firebaseInit'
import { getDatabase,ref,onValue, remove, get,set } from 'firebase/database'
import { useNavigate } from 'react-router-dom';

const LocalSearch = () => {
  const navi = useNavigate();
  const uid=sessionStorage.getItem("uid");
  const db=getDatabase(app);

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

  const onClickFavorite = (local) => {
    get(ref(db, `favorite/${uid}/${local.id}`))
    .then(snapshot=>{
      if(snapshot.exists()){
        alert("이미 즐겨찾기에 등록되었습니다!");
      }else{
        if(uid){
          //즐겨찾기등록
          if(!window.confirm(`"${local.place_name}" 등록하실래요?`)) return;
          set(ref(db, `favorite/${uid}/${local.id}`), {...local});
          alert("즐겨찾기등록완료!");
        }else{
          sessionStorage.setItem("target", "/local/search");
          navi('/user/login');
        }
      }
    });
  }

  return (
    <div  className="my-5 ">
      <h1 className='mb-5 text-center'>지역검색</h1>
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
          <Form.Select onChange={onChangeSize} value={size}>
            <option value="5" >5행</option>
            <option value="10" >10행</option>
            <option value="15" >15행</option>
          </Form.Select>
        </Col>
        
      </Row>
      <Table striped  bordered hover >
        <thead className='text-center'>
          <tr className='table-secondary '>
            <td >아이디</td>
            <td >지역명</td>
            <td >전화번호</td>
            <td >주소</td>
            <td >지도보기</td>
            <td>즐겨찾기</td>
          </tr>
        </thead>
        <tbody>
          {locals.map( local => 
            <tr key={local.id}>
              <td className='text-center'>ID : {local.id}</td>
              <td><div className='ellipsis text-center'>{local.place_name}</div></td>
              <td><div className='ellipsis text-center'>{local.phone || 'x'}</div></td>
              <td><div className='ellipsis text-center'>{local.address_name}</div></td>
              <td className='text-center'><ModalMap local={local} /></td>
              <td className='text-center'><Button variant='success' size='sm' onClick={()=>onClickFavorite(local)}>즐겨찾기</Button></td>
           </tr>
          )}
        </tbody>
      </Table>
      <div className="my-3 text-center">
        <Button onClick={()=>setPage(page-1)} disabled={page===1} className="mx-3 pageButton" variant='dark'>이전</Button>
        <span>{page}</span>
        <Button onClick={()=>setPage(page+1)} disabled={isEnd} className="mx-3 pageButton" variant='dark'>다음</Button>
      </div>
    </div>
  )
}

export default LocalSearch
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap';
import '../../common/Paging.css'
import Pagination from 'react-js-pagination';
import { BoxContext } from '../../context/BoxContext';

import { Link } from 'react-router-dom';

const ListPage = () => {
    const{setBox} = useContext(BoxContext);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(4);
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const callAPI=async()=>{
        const res = await axios.get(`/cou?page=${page}&size=${size}`);
        console.log(res.data);
        setList(res.data.list);
        setCount(res.data.total);
        const last=Math.ceil(res.data.total/size);
        if(page>last) setPage(page-1); //마지막페이지에 한개잇는걸 삭제하면 그전페이지로나오게함 
    }
    useEffect(()=>{ 
        callAPI()
    },[page])

    const onDelete =(cou)=>{
        if(cou.persons > 0){
            setBox({
                show:true,
                message:`삭제실패! ${cou.persons}명이 수강신청되어있습니다.`
            });
            return;
        }
        setBox({
            show:true,
            message:`${cou.lname}강좌를 폐강하실래요?`,
            action:async()=>{
                await axios.post(`/cou/delete/${cou.lcode}`)
                callAPI();
            }
        });   
    }
   
    return (
        <div>
            <h1 className='my-5'>강좌목록</h1>
        <Row>
        <Col>검색수:{count}건</Col>
        <Col><Link to="/cou/insert">강좌등록하기</Link></Col>
      </Row>
      <hr/>
      <Table striped bordered hover>
        <thead>
          <tr >
              <td>강좌번호</td>
              <td>강좌이름</td>
              <td>지도교수</td>
              <td>분야</td>
              <td>강의시간</td>
              <td>강의실</td>
              <td>정원</td>
              <td>삭제</td>
          </tr>
        </thead>
        <tbody>
          {list.map(cou=>
            <tr key={cou.lcode}>
              <td>{cou.lcode}</td>
              <td><Link to={`/cou/read/${cou.lcode}`}>{cou.lname}</Link></td>
              <td>{cou.pname ? `${cou.pname} (${cou.instructor})` : `미정`}</td>
              <td>{cou.dept}</td>
              <td>{cou.hours ? `${cou.hours}시간` : `-`}</td>
              <td>{cou.room ? `${cou.room}호` : `-`}</td>
              <td>{cou.persons}/ {cou.capacity}명</td>
              <td>
                <Button onClick={()=>onDelete(cou)} size='sm' variant='outline-danger'>삭제</Button></td>
            </tr>
          )}
        </tbody>
      </Table>
      {count > size &&
        <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={ (e)=>setPage(e) }/>
        }
        </div>
    )
}

export default ListPage
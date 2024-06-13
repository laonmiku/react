import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import '../Paging.css';
import { Link } from 'react-router-dom';

const ListPage = () => {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [key, setKey] = useState('uid');
    const [word, setWord] = useState('');

    const callAPI= async()=>{
        
        const res= await axios.get(`/bbs/list.json?key=${key}&word=${word}&page=${page}&size=${size}`)
        console.log(res.data);
        setList(res.data.documents);
        setCount(res.data.total);
    }

    useEffect(()=>{
        callAPI();
    },[page])

    const onSubmit=(e)=>{
        e.preventDefault();
        callAPI();
        setPage(1);
    }

     return (
        <div className=''>
            <h1 className='my-5'>게시판</h1>
            <Row className='mb-2'>
                <Col xs={8} md={5} lg={4} >
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Select className='me-2' value={key} onChange={(e)=>setKey(e.target.value)}>
                                <option value="title">제목</option>
                                <option value="contents">내용</option>
                                <option value="uid">아이디</option>
                                <option value="uname">이름</option>
                            </Form.Select>
                            <Form.Control placeholder='검색어' value={word} onChange={(e)=>setWord(e.target.value)}/>
                            <Button type='submit' variant='outline-dark'>검색</Button>
                        </InputGroup>
                    </form>
                </Col>
                <Col>
                    <div className='pt-2'>검색수 : {count}건</div>
                </Col>
                { sessionStorage.getItem('uid') &&
                    <Col className='text-end'> 
                        <Link to="/bbs/insert"><Button variant='outline-success w-50'>글쓰기</Button></Link>
                    </Col>
                }
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <td>NO</td>
                        <td >제목</td>
                        <td>작성자</td>
                        <td>작성일</td>
                        <td>조회수</td>
                        <td>댓글수</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(bbs=>
                        <tr key={bbs.bid}>
                            <td className='text-center'>{bbs.bid}</td>
                            <td className='ellipsis'>
                                <a href={`/bbs/read/${bbs.bid}?isCnt=true`}>{bbs.title}</a>
                            </td>
                            <td className='text-center'>{bbs.uid}({bbs.uname})</td>
                            <td className='text-center'>{bbs.fmtdate}</td>
                            <td className='text-center'>{bbs.viewcnt}</td>
                            <td className='text-center'>{bbs.replycnt}</td>
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
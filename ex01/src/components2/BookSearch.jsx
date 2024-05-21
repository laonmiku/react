import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Button, Card , InputGroup, Form, Spinner} from 'react-bootstrap';
import ModalBook from './ModalBook';

const BookSearch = () => {
    const [loading,setLoading] = useState(false);
    const [total,setTotal] = useState(0);
    const [last,setLast] = useState(false);
    const [page,setPage] = useState(1);
    const [query,setQuery] = useState('죠죠의 기묘한 모험');
    const [books,setBooks] = useState([]);
    const callAPI = async() => {
        setLoading(true);
        const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=12&page=${page}`;
        const config={
            headers : {"Authorization":"KakaoAK 9a5fa7c035339e405f49a5347ceb488f"}
        }
        const res = await axios.get(url, config);
        console.log(res.data); 
        setBooks(res.data.documents); //배열데이터
        setLast(res.data.meta.is_end); //마지막페이지
        setTotal(res.data.meta.pageable_count); //r검색수
        
        //로딩중,,,나오게할라고 지연시는거임 일부러
        setTimeout(()=>{
            setLoading(false);
        },1000);
        
    };

    useEffect(()=>{
        callAPI();
    }, [page]);
    const onSubmit =(e)=>{
        e.preventDefault();
        if(query === ""){
            alert("검색어를 입력하세요");
        }else{
            callAPI();
            setPage(1);
        }
    }
    
    if(loading) 
    return (
        <div>
            <h1 className='my-5'>로딩중!!!</h1>
            <Spinner/>
        </div>
    )

    return (
        <div className='my-5 bookSearch'>
            <h1 className='text-center'>도서검색</h1>
            <Row className='mb-3'>
                <Col xs={8} md={6} lg={4}>
                    <form onSubmit={onSubmit}>
                        <InputGroup>
                            <Form.Control onChange={(e)=>setQuery(e.target.value)}
                            value={query} placeholder='검색어'/>
                            <Button type='submit'>검색</Button>
                            
                        </InputGroup>
                    </form>
                </Col>
                <Col>
                    <div className='mt-2'>검색수 : {total}건</div>
                </Col>
            </Row>
            
            <Row>
                {books.map(book=>
                    <Col className='mb-3' xs={6} md={4} lg={2}>
                        <Card>
                            <Card.Body>
                                
                                <ModalBook book={book}/>
                            </Card.Body>
                            <Card.Footer>
                                <div className='ellipsis title'>
                                    {book.title}
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>   
                )}
                
            </Row>
            {total>12 &&
                <div className='text-center'>
                    <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
                    <span className='mx-3'>{page}</span>
                    <Button onClick={()=>setPage(page+1)} disabled={last}>다음</Button>
                </div>
            }
        </div>
    )
}

export default BookSearch
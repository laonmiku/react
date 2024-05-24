import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, Card, Form,InputGroup, Button} from 'react-bootstrap'
import ModalBook from './ModalBook';
import { FaCartArrowDown } from "react-icons/fa6";
import {app} from '../../firebaseInit';
import { getDatabase, ref,set, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

const BookSearch = () => {
    const navi = useNavigate();
    const uid = sessionStorage.getItem("uid");
    const db= getDatabase(app);
    const [count,setCount] = useState(0);
    const [isEnd,setIsEnd] = useState(false);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('케로로');
    const [Books,setbooks] = useState([]);
    const callAPI = async() =>{
        const url=`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=12&page=${page}`;
        const config={
            headers:{"Authorization":"KakaoAK f3d977d0f78639ca211ff67b0676d64c"}
        };
        const res = await axios(url,config);
        console.log(res);
        setbooks(res.data.documents);
        setCount(res.data.meta.pageable_count);
        setIsEnd(res.data.meta.is_end);
    } 

    useEffect( ()=>{
        callAPI();
    },[page]);

    const onSubmitGogo=(e)=>{
        e.preventDefault();
        if(query===""){
            alert("검색어를 입력하세요!");
        }else{
            callAPI();
            setPage(1);
        }
    }

    const onClickCart = async(book) => {
        //장바구니에 있는지 유무 체크
        await get(ref(db, `cart/${uid}/${book.isbn}`))
        .then(async(snapshot)=> {
            if(snapshot.exists()) {
                alert("장바구니에 이미 존재합니다.")
            }
            else {
                //장바구니에 등록
                if(uid) {
                    if(window.confirm("장바구니에 저장하실래요?")) {
                        await set(ref(db, `cart/${uid}/${book.isbn}`),
                            {...book, email:sessionStorage.getItem("email")});
                        if (window.confirm("장바구니로 이동하실래요?")) {
                            navi('/book/cart');
                        }
                    }
                }
                else {
                    sessionStorage.setItem("target", "/book/search");
                    navi('/user/login');
                }
            }
        });
    
    }


    
  return (
    <div className="my-5 booksearch">
        <h1 className='mb-5 text-center'>도서검색</h1>
        <Row className="mb-3">
            <Col xs={8} md={6} lg={4}>
                <form onSubmit={onSubmitGogo}>
                    <InputGroup>
                        <Form.Control placeholder="검색어" value={query} onChange={(e)=>setQuery(e.target.value)} />
                        <Button type="submit">검색</Button>
                    </InputGroup>
                </form>
            </Col>
            <Col className="">
                <div>검색수 : {count}권</div>
            </Col>
        </Row>
        <Row >
            {Books.map((book,index)=>
                <Col xs={6} md={4} lg={2} className='mb-3' key={index}>
                    <Card>
                        <Card.Body>
                            <ModalBook bookModal={book}/>
                        </Card.Body>
                        <Card.Footer>
                            <Row> 
                                <Col className='' xs={8}>
                                    <div className='ellipsis bookTitle' > {book.title} </div>
                                </Col>  
                                <Col className='text-end'>
                                    <FaCartArrowDown className='cart' onClick={()=>onClickCart(book)}/>
                                </Col>
                            
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            )}
            
        </Row>
        {count > 12 &&
            <div className="my-3 text-center">
                <Button onClick={()=>setPage(page-1)} disabled={page===1} className="mx-3 pageButton">이전</Button>
                <span>{page}</span>
                <Button onClick={()=>setPage(page+1)} disabled={isEnd} className="mx-3 pageButton">다음</Button>
            </div>
        }
    </div> 
  )
}

export default BookSearch
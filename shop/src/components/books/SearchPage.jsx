import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Row, Col, InputGroup, Form, Button, Card,Table} from 'react-bootstrap'
import { HiMiniShoppingBag } from "react-icons/hi2";

const SearchPage = () => {
    const [chk, setChk] = useState(0);
    const [loading,setLoading] = useState(false);
    const [books,setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [query, setQuery] = useState('리액트');
    const [total, setTotal] = useState(0);
    const [isEnd, setIsEnd] = useState(false);


    const callAPI= async()=>{
        const url = `https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=${size}&page=${page}`;
        const config={
            'headers':{"Authorization" : "KakaoAK 54b6688221dead45827042df7e297c2d"}
        }
        setLoading(true);
        const res=await axios.get(url,config);
        console.log(res.data);
       
        const documents=res.data.documents; 
        //setBooks(res.data.documents);
        setBooks(documents.map(book=> book && {...book,checked:false}));

        setTotal(res.data.meta.pageable_count);
        setIsEnd(res.data.meta.is_end);
        setLoading(false);   
    }
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
    const onInsert = async(book)=>{
        if( ! window.confirm(`[${book.title}] 도서를 등록 하실래요?`)) return;
        //console.log(book);
        //도서등록
        const data={...book, authors:book.authors.join(',')};
        const res = await axios.post('/books/insert',data);
        console.log("결과:.........................",res.data.result);
        if(res.data.result===1){
            alert("도서등록완료!");
        }else{
            alert("실패! 이미 등록되어있는지 확인하세요");
        }
    }
    const onChangeAll=(e)=>{
        setBooks(books.map(book=>
            book && {...book, checked:e.target.checked}
        ));
    }
    const onChangeSingle=(e,isbn)=>{
        setBooks(books.map(book=>
            book.isbn === isbn ? {...book, checked:e.target.checked} : book
        ));
    }
    
    const onInsertChecked = async()=>{
        if(chk === 0){
            alert("저장할 도서를 선택하세요!");
            return;
        }
        if(! window.confirm(`${chk}개 도서를 저장하실래요?`)) return;

        //선택한 도서들을 저장
        let count=0;
        let inserted =0;
        books.forEach(async book=>{
            if(book.checked){
                const data={...book, authors:book.authors.join(',')};
                const res = await axios.post('/books/insert',data);
                count++;
                if(res.data.result===1) inserted++;
                if(count===chk){
                    alert(`${inserted}개 도서가 저장되었습니다!`);
                    setBooks(books.map(book=>book && {...book, checked:false}))
                }
            }
        });
    }

   
    useEffect(()=>{
        callAPI()
      }, [page,size]);
    
      useEffect(()=>{
        let count=0;
        books.forEach(book=>book.checked && count++);
        setChk(count);
      }, [books]);


    if(loading) return <h1 className='text-center my-5'>로딩중...</h1>
    return (
        <div className='my-5' >
            <h1 className='text-center mb-3'>
                도서검색
            </h1>
            <form onSubmit={onSubmit}>
                <Row className='mt-5 mb-3 '> 
                    <Col xs={4} md={4} lg={4}>
                        <Row >
                            <div className='mb-2 w-50'>
                                <Form.Select value={size} onChange={onChangeSize}>
                                    <option value="5" >5행</option>
                                    <option value="10" >10행</option>
                                    <option value="15" >15행</option>
                                </Form.Select >
                            </div>
                            <InputGroup>
                                <Form.Control placeholder="검색어" value={query} onChange={(e)=>setQuery(e.target.value)} />
                                <Button  type="submit" variant='outline-primary'>검색</Button>
                            </InputGroup>
                            
                        </Row>
                    </Col>
                    <Col className='text-start'>
                        <div className='pt-2 mt-5'>검색수 : {total}권</div>
                    </Col> 
                    <Col className='text-end'>
                        <Button  onClick={onInsertChecked} variant='outline-dark' className='mt-5' >선택도서저장</Button>
                    </Col>
                    
                </Row>
            </form>
            <Table striped bordered hover className='align-middle'>
                <thead>
                    <tr>
                        <td><input checked={chk===books.length} type='checkbox' onChange={onChangeAll}/></td>
                        <td>isbn</td>
                        <td colSpan={2} >Title</td>
                        <td>Price</td>
                        <td>Authors</td>
                        <td>등록</td>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book=>
                    <tr key={book.isbn}>
                        <td><input onChange={(e)=>onChangeSingle(e,book.isbn)} type='checkbox' checked={book.checked} /></td>
                        <td>{book.isbn}</td>
                        <td ><img src={book.thumbnail ||  'http://via.placeholder.com/120x170'} width="90px"/></td>
                        <td>{book.title}</td>
                        <td>{book.price}원</td>
                        <td>{book.authors[0]}</td>
                        <td><Button onClick={()=>onInsert(book)}  variant='outline-primary'  size="lg"><HiMiniShoppingBag size={ 30}/></Button></td>
                    </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
            <div className="my-3 text-center">
                <Button onClick={()=>setPage(page-1)} disabled={page===1} className="mx-3" variant='outline-primary'>이전</Button>
                <span>{page}</span>
                <Button onClick={()=>setPage(page+1)} disabled={isEnd} className="mx-3 " variant='outline-primary'>다음</Button>
            </div>
        }
        </div>
    )
}

export default SearchPage
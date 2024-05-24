import React, { useEffect, useState } from 'react'
import {app} from '../../firebaseInit'
import { getDatabase,ref,onValue, remove } from 'firebase/database'
import {Row, Col, InputGroup, Form, Button, Card,Table} from 'react-bootstrap'
import ModalBook from './ModalBook'


const CartPage = () => {
    const [loading,setLoading] = useState(false);
    const [books,setBooks] = useState([]);
    const uid=sessionStorage.getItem("uid");
    const db=getDatabase(app);

    const callAPI=()=>{
        setLoading(true);
        onValue(ref(db,`cart/${uid}`),snapshot=>{
            let rows=[];
            let count =0;
            snapshot.forEach(row=>{
                //console.log(row.key , row.val());
                count++;
                rows.push({no:count,key:row.key , ...row.val()})
            });
            //console.log(rows);
            setBooks(rows);
            setLoading(false);
        });
    }

    useEffect(()=>{
        callAPI();
    },[]);

    const onClickDelete =(book)=>{
        if(window.confirm(`<${book.title}>을(를) 삭제하실래요?`)){
            //delete
            remove(ref(db,`cart/${uid}/${book.key}`));//리무브하면 콜API안해줘도 바로삭제됨
        }
    }
    if(loading) return <h1 className='text-center my-5'>로딩중...</h1>
    return (
        <div className='text-center my-5'>
            <h1 className='mb-5 text-center'>장바구니</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>NO</td>
                        <td>제목</td>
                        <td>저자</td>
                        <td>가격</td>
                        <td >삭제</td>
                        <td >정보</td>

                    </tr>
                </thead>
                <tbody>
                    {books.map(book=>
                         <tr key={book.key}>
                            <td>{book.no}</td>
                            <td>
                                <div className='ellipsis'>{book.title}</div>
                            </td>
                            <td>{book.authors}</td>
                            <td>{book.price}원</td>
                            <td><Button type='submit' onClick={()=>onClickDelete(book)} size='sm' variant='outline-danger'>삭제</Button></td>
                            <td><ModalBook bookModal={book} type="cart" /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default CartPage
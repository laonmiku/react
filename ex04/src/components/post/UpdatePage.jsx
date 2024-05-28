import React, { useEffect, useState } from 'react'
import {Row,Col,Button,Form,InputGroup} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import {app} from '../../firebaseInit'
import { getFirestore, doc,getDoc,setDoc } from 'firebase/firestore'


const UpdatePage = () => {
    const navi=useNavigate('');
    const [loading,setLoading]=useState(false);
    const db=getFirestore(app);
    const {id} = useParams();
    const [form,setForm]=useState('');
    const {title,body} =form;

    const callAPI=async()=>{
        setLoading(true);
        const res = await getDoc(doc(db,`posts/${id}`));
        console.log(res.data());
        setForm(res.data());
        setLoading(false);
    }

    const onChangeForm = (e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    useEffect(()=>{
        callAPI();
    },[])

    const onSubmit=async(e)=>{
        e.preventDefault();
        if(!window.confirm(`${id}번 게시글을 수정하실래요`)) return;
        //게시글수정
        setLoading(true);
        await setDoc(doc(db,`posts/${id}`),form);
        setLoading(false);
        navi(`/post/read/${id}`);
    }



    if(loading) return <h1 className='text-center my-5'>로딩중...</h1>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-4'>게시글 수정하기</h1>
            <Row className='justify-content-center'>
                <Col xs={12} md={10} lg={8}>    
                    <form onSubmit={onSubmit}>
                        <Form.Control name='title' className='mb-2' value={title} onChange={onChangeForm}/>
                        <Form.Control name='body' as="textarea" rows={10} className='mb-3' value={body} onChange={onChangeForm}/>
                        <div className='text-center'>
                            <Button className='px-5' variant='outline-primary' type='submit'>수정</Button>
                            <Button className='px-5 ms-2' variant='outline-danger' type='reset' onClick={()=>callAPI()}>취소</Button>
                        </div>
                    </form>
                </Col>
            </Row>
        </div>
    )
}

export default UpdatePage
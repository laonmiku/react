import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Rating } from '@mui/material'
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import axios from 'axios';

const Review = ({gid}) => {
    const [list,setList] = useState([]);
    const uid = sessionStorage.getItem("uid");
    const [rating,setRating] = useState(0);
    const [contents,setContents] = useState('');

    const callAPI=async()=>{
        const res = await axios.get(`/review/list/${gid}`);
        //console.log(res.data);
        const data=res.data.map(review=>review&& {...review, isEdit:false});   
        setList(data);
    }
    useEffect(()=>{
        callAPI();
    },[])
    const onInsert =async()=>{
        if(contents===''){
            alert("내용을 입력하세요!");
            return;
        }
        //리뷰등록
        await axios.post('/review/insert', {gid,uid,rating,contents});
        alert("댓글등록완료!");
        setRating(0);
        setContents('');
    }
    const onDelete =async(rid)=>{
        if(!window.confirm(`${rid}번 리뷰를 삭제하실래요?`)) return;
        await axios.post(`/review/delete/${rid}`);
        callAPI();
    }
    const onUpdate = (rid)=>{
        const data=list.map(r=>r.rid===rid? {...r,isEdit:true}: r);
        setList(data);
    }
    const onChangeContents = (e,rid)=>{
        const data=list.map(r=>rid===r.rid ? {...r, contents:e.target.value} : r);
        setList(data);
    }
    const onChangeRating=(value,rid)=>{
        const data = list.map(r=>r.rid===rid ? {...r, rating:value} : r);
        setList(data);
    }
    const onSave=async(review)=>{
        if(!window.confirm(`${review.rid}번 리뷰를 수정하실래요?`)) return;
        await axios.post('/review/update', {
            rid:review.rid,
            contents:review.contents,
            rating:review.rating
        });
        callAPI();
    }
    const onCancel = ()=>{
        callAPI();
    }
  return (
    <div className='mt-5'>
        <h3>Review</h3>
        <div className=''>
            {sessionStorage.getItem('uid') ?
                <div >
                    <Rating
                        name="hover-feedback"
                        value={rating}
                        precision={0.5}
                        size="large"
                        icon={<MdFavorite fontSize="inherit" />}
                        emptyIcon={<MdFavoriteBorder  fontSize="inherit" />}
                        onChange={(e,newValue)=>setRating(newValue)}    
                    />
                    <div className='text-end'> 
                        <Button onClick={onInsert} className='outline-primary mb-2 px-5'>등록</Button>
                    </div>    
                    <Form.Control onChange={(e)=>setContents(e.target.value)} value={contents} as='textarea' rows={5}/>
                    
                </div>
            :
                <div>
                    <Button>리뷰작성</Button>
                </div>
            }
            <div className='mt-3'>
                {list.map(review=>
                    <Row key={review.rid}>
                        <Col className='text-start'>
                            [{review.rid}]
                            <Rating
                                name="hover-feedback"
                                value={review.rating}
                                precision={0.5}
                                size="small"
                                icon={<MdFavorite fontSize="inherit" />}
                                emptyIcon={<MdFavoriteBorder  fontSize="inherit" />}  
                                readOnly={!review.isEdit}
                                onChange={(e,newValue)=>onChangeRating(newValue,review.rid)}
                            /><br/>
                            [{review.uid}] {review.regDate}
                        </Col>
                        {review.isEdit && uid===review.uid ?
                            <Col className='text-end'>
                            {uid===review.uid &&
                            <>
                                <Button onClick={()=>onSave(review)} variant='primary px-3 me-2' size='sm'>저장</Button>
                                <Button onClick={onCancel} variant='outline-primary px-3' size='sm'>취소</Button>
                            </> 
                            }
                            </Col>
                        :
                            <Col className='text-end'>
                                {uid===review.uid &&
                                <>
                                    <Button onClick={()=>onUpdate(review.rid)} variant='secondary px-3 me-2' size='sm'>수정</Button>
                                    <Button onClick={()=>onDelete(review.rid)} variant='outline-secondary px-3' size='sm'>삭제</Button>
                                </> 
                                }
                            </Col>
                        }
                        
                        { review.isEdit ?
                            <Form.Control onChange={(e)=>onChangeContents(e,review.rid)} as='textarea' rows={5} value={review.contents} className='mb-2'/>
                        :
                            <div style={{whiteSpace:'pre-wrap'}} className='mb-2'>{review.contents}</div>
                        }
                        
                        <br/><hr/>
                    </Row>
                )}
            </div>
        </div>
    </div>
  )
}

export default Review
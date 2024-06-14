import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row,Col,Form,Button } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import '../Paging.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Stars from '../common/Stars';


const ReplyPage = ({bid}) => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    //const location=useLocation();
    //console.log(location);
    const {pathname}=useLocation();
    const[contents, setContents] = useState("");
    const uid=sessionStorage.getItem("uid");
    const [rating, setRating]=useState(0);

    const callAPI=async()=>{
        const url=`/reply/list.json/${bid}?page=${page}&size=${size}`;
        const res = await axios.get(url);
        console.log(res.data);
        const data=res.data.documents.map(doc=> doc && {...doc, isEllip:true, isEdit:false, text:doc.contents,num:doc.rating});
        setList(data);
        setCount(res.data.total);
    }
    useEffect(()=>{
        callAPI();
    },[page])
    const onClickRegister=()=>{
        sessionStorage.setItem('target',pathname+'?isCnt=false');
        window.location.href='/users/login';
    }
    const onClickInsert=async()=>{
        if(contents ===""){
            alert("댓글내용을 입력하세요!");
            return;
        }
        await axios.post(`/reply/insert`,{bid,uid,contents,rating});
        setContents("");
        setRating(0);
        callAPI();
    }
    const onClickContents =(rid)=>{
        const data = list.map(reply=> reply.rid===rid ? 
            {...reply,isEllip:!reply.isEllip} : reply);
        setList(data);
    }
    const onClickDelete =async(rid)=>{
        if(!window.confirm(`${rid}번 댓글을 삭제하실래요?`)) return;
        await axios.post(`/reply/delete/${rid}`);
        callAPI();
    }
    const onClickUpdate =(rid)=>{
        const data =list.map(reply=> reply.rid===rid ? {...reply,isEdit:true} : reply );
        setList(data);
    }
    const onChangeContents=(e,rid)=>{
        const data = list.map(reply=> reply.rid===rid ? {...reply, contents:e.target.value} : reply );
        setList(data);
    }
    const onClickSave = async(reply) =>{
        if(reply.contents!==reply.text || reply.rating!== reply.num) {
            if(!window.confirm(`${reply.rid}번 댓글을 수정하실래요?`)) return;
            await axios.post(`/reply/update`,{rid:reply.rid, contents:reply.contents,rating:reply.rating});
        }
        callAPI();
    }
    const onClickCancel =(reply) =>{
        if(reply.contents !== reply.text){
            if(!window.confirm(`${reply.rid}번 댓글을 수정을 취소하실래요?`)) return;
        }
        callAPI();
    }
    const getRating =(rating)=>{
        console.log(rating,"########################");
        setRating(rating);
    }
    const getReplyRating =(rating,rid)=>{
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%레이팅",rating,"%%%%%알아이디",rid);
        const data=list.map(reply=>reply.rid===rid ? {...reply,rating:rating} : reply );
        setList(data);
    }
    return (
        <div>
            <Row  className='justify-content-center my-5'>
                <Col xs={12} md={12} lg={8}>
                    {sessionStorage.getItem('uid') ? 
                    <div className='mb-3'>
                        <div>
                            <Stars  size={'30px'} number={rating} getRating={getRating}/>
                        </div>
                        <Form.Control as="textarea" rows={5}
                            value={contents} onChange={(e)=>setContents(e.target.value)}/>
                        <div className='text-end mt-2'>
                            <Button className='px-5' onClick={onClickInsert}>등록</Button>
                        </div>
                    </div>
                    :
                    <div className='text-end mb-5'>
                        <Button className='px-5' onClick={onClickRegister}>댓글쓰기</Button>
                    </div>
                    }
                    {count >0 && <div className='mb-3 text-end'>댓글수 : {count} 건</div>}
                    {list.map(reply=>
                        <div key={reply.rid}>
                            <Row >
                                <Col style={{color:'#0431B4'}} >
                                    <span>[ {reply.rid} ]  </span>
                                    <span >{reply.uid} ( {reply.uname} )</span>
                                    <Stars getRating={(e)=>getReplyRating(e,reply.rid)} size={'17px'} number={reply.rating} disabled={(reply.uid!==uid || !reply.isEdit) && true} />
                                    <div>
                                        <span>  {reply.fmtdate}</span> 
                                        {reply.fmtupdate &&  <span style={{color:'#A4A4A4'}}>  (수정 : {reply.fmtupdate})</span>}
                                    </div>
                                </Col>
                                {uid===reply.uid && !reply.isEdit &&
                                    <Col className='text-end'xs={2} md={2} lg={2}>
                                         <DropdownButton id="dropdown-basic-button" size='sm' variant='outline-primary' title="꾸욱" > 
                                            <Dropdown.Item >  
                                                <Button onClick={()=>onClickUpdate(reply.rid)} size="sm w-100" variant='secondary'>수정</Button>
                                            </Dropdown.Item>
                                            <Dropdown.Item> 
                                                <Button onClick={()=>onClickDelete(reply.rid)} size="sm w-100" variant='outline-secondary'>삭제</Button>
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    </Col>
                                }
                                {uid===reply.uid && reply.isEdit &&
                                    <Col className='text-end mb-1'xs={3} md={3} lg={3}>
                                        <Button onClick={()=>onClickSave(reply)} size="sm me-1" >저장</Button>
                                        <Button onClick={()=>onClickCancel(reply)}  size="sm" variant='outline-primary'>취소</Button>
                                    </Col>
                                }
                            </Row>
                            {reply.isEdit ?
                                <div>
                                    <Form.Control onChange={(e)=>onChangeContents(e,reply.rid)} as="textarea" value={reply.contents} rows={5}/>
                                </div>
                            :
                                <div  style={{whiteSpace:'pre-wrap',cursor:'pointer'}} onClick={()=>onClickContents(reply.rid)} className={reply.isEllip && 'ellipsis'} >
                                    {reply.contents}
                                </div>
                            }
                            <hr className='my-2'/>
                        </div>
                    )}
                </Col>
            </Row>
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

export default ReplyPage
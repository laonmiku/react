import React, { useEffect, useState } from 'react'
import {Row,Col,Button,Form,InputGroup} from 'react-bootstrap'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import moment from 'moment'
import {app}from '../../firebaseInit'
import {setDoc,deleteDoc,doc,getFirestore,addDoc,collection,orderBy,where,onSnapshot,query} from 'firebase/firestore'
import '../Paging.css';
import Pagination from 'react-js-pagination';

const ListPage  = ({id}) => {
    const [page,setPage]=useState(1);
    const [size,setSize]=useState(3);
    const [total,setTotal]=useState(100);

    const db=getFirestore(app);
    const navi=useNavigate();
    const {pathname} = useLocation();
    const [content,setContent]=useState(''); 
    const [comments,setComments]=useState([]); 

    const onClickInsert=async()=>{
        if(sessionStorage.getItem('email')){
            if(content===""){
            alert("댓글내용을 입력하세요");
            return;
            }
            //댓글저장
            //alert(content);
            const email=sessionStorage.getItem('email');
            const date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            const comment={id,email,date,content};
            //console.log(comment);
            await addDoc(collection(db,`comments`),comment);
            alert("댓글등록완료!");
            setContent("");
            setPage(1);
        }else{
            //console.log(pathname);
            sessionStorage.setItem('target',pathname);
            navi('/user/login');
        }
    }
    const CallAPI=()=>{
        const q=query(collection(db,'comments'), where ('id','==',id),orderBy('date','desc'));
        onSnapshot(q,res=>{
            let rows=[];
            let count=0;
            res.forEach(row=>{
                count++;
                rows.push({
                    no:count,
                    cid:row.id, 
                    ...row.data(),
                    isEllip:true,
                    isEdit:false,
                    text:row.data().content
                })
            });
            //console.log(rows);
            setTotal(count);
            const start= (page-1)*size+1;
            const end=(page*size);
            rows= rows.filter(row=>row.no>=start && row.no <=end);
            setComments(rows);
        });
    }
    useEffect(()=>{
        CallAPI();
    },[page])

    const onClickContent=(cid)=>{
        const rows = comments.map(c=>c.cid==cid ? {...c,isEllip:!c.isEllip}:c);
        setComments(rows);
    }
    const onClickDelete=async(cid)=>{
        if(!window.confirm(`${cid}번 댓글을 삭제하실래요?`)) return;
        //삭제하기
        await deleteDoc(doc(db,`comments/${cid}`));
    }
    const onClickUpdate = (cid) =>{
        const rows = comments.map(c=>c.cid==cid? {...c,isEdit:true}:c);
        setComments(rows);
    }
    const onClickCancel = (cid,content,text) =>{
        if(content !== text){
            if(!window.confirm("취소하실래요?")) return;
        }
            const rows = comments.map(c=>c.cid===cid? {...c,isEdit:false,content:text}:c);
            setComments(rows);
    }
   
    const onChangeContent=(e,cid)=>{
        const rows=comments.map(c=>c.cid===cid ? {...c,content:e.target.value}: c );
        setComments(rows);
    }

    const onClickSave=async(comment)=>{
        if(comment.content===comment.text) return;
        if(!window.confirm("변경된 내용을 저장하실래요?")) return;
        //저장하기
        console.log(comment);
        const rows = comments.map(c=>c.cid===comment.cid? {...c,isEdit:false}:c);
        setComments(rows);
        const date=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        await setDoc(doc(db,`comments/${comment.cid}`),{...comment,edit_date:date});
    }

     return (
    <Row className='justify-content-center my-5 comments'>
      <Col xs={12} md={10} lg={8}>
        <div className='text-end my-2'>
          <Button onClick={onClickInsert}
            className='px-5' variant='outline-secondary'>댓글등록</Button>
        </div>
        {sessionStorage.getItem('email') && 
          <div>
            <Form.Control value={content} onChange={(e)=>setContent(e.target.value)}
              as="textarea" rows={5} placeholder='댓글내용을 입력하세요.'/>
          </div>
        }
        
        <div className='comments my-5 comment_line'>
          {comments.map(c=>
            <div key={c.cid} className=' mt-2 px-3 py-2'>
                <Row  className='mb-2'>
                    <Col className='text-muted'>
                        <span>{c.date}</span> 
                        {c.edit_date &&  <div>    수정:{c.edit_date}</div>}
                        <span className='mx-2'>({c.email})</span>
                    </Col>
                    {(c.email===sessionStorage.getItem('email') )&& !c.isEdit && 
                        <Col className='text-end'>
                            <Button onClick={()=>onClickUpdate(c.cid)} variant='outline-success' size="sm">수정</Button>
                            <Button onClick={()=>onClickDelete(c.cid)} variant='outline-danger' size="sm" className='ms-2'>삭제</Button>
                        </Col>
                    }
                    {c.email===sessionStorage.getItem('email') && c.isEdit &&
                        <Col className='text-end'>
                            <Button onClick={()=>onClickSave(c)} variant='outline-success' size="sm">저장</Button>
                            <Button onClick={()=>onClickCancel(c.cid,c.content,c.text)} variant='outline-secondary' size="sm" className='ms-2'>취소</Button>
                        </Col>
                    }
              </Row>
              {c.isEdit ?
                <div>
                        <Form.Control onChange={(e)=>onChangeContent(e,c.cid)} value={c.content} as="textarea" rows={5}/>
                </div>
                :
                <div onClick={()=>onClickContent(c.cid)} 
                    className={c.isEllip ? "ellipsis2":''} style={{whiteSpace:'pre-wrap',cursor:'pointer'}}>{c.content}
                </div>
              }
              <hr/>
            </div>
          )}
        </div>
      </Col>
      <Pagination
                            activePage={page}
                            itemsCountPerPage={size}
                            totalItemsCount={total}
                            pageRangeDisplayed={5}
                            prevPageText={"‹"}
                            nextPageText={"›"}
                            onChange={ (e)=>setPage(e) }/>
    </Row>
  )
}

export default ListPage
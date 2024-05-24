import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Card,Row,Col,Button} from 'react-bootstrap'
import {app} from'../../firebaseInit'
import { getFirestore,doc,getDoc } from 'firebase/firestore'

const ReadPage = () => {
  const[post,setPost]=useState('');
  const db=getFirestore(app);
  const [loading, setLoading]=useState(false);
  const {id} = useParams();
  const  {email,body,title,date} = post;//비구조할당

  const callAPI=async()=>{
    setLoading(true);
    const res=await getDoc(doc(db,'posts',id));
    console.log(res.data());
    setPost(res.data());
    setLoading(false);
  }
  useEffect(()=>{
    callAPI();
  },[])

  if(loading) return <h1 className='text-center my-5'>로딩중...</h1>
  return (
    <div>
        <Row className='justify-content-center my-5' >
          <h1 className='text-center mb-5'>게시글정보</h1>
          <Col xs={10} md={8} lg={7}>
            <Card>
              <Card.Body>
                <h5>{title}</h5>
                <hr/>
                <div style={{ whiteSpace: "pre-wrap" }}>{body}</div>
              </Card.Body>
              <Card.Footer className='text-muted text-end'>
                <b>Posted</b> {date} <b>by</b> {email}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
    </div>
  )
}

export default ReadPage
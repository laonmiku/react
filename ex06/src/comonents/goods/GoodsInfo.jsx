import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Card, Col } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Review from './Review';

const GoodsInfo = ({goods,gid}) => {
    const [loading,setLoading] = useState(false);
    const{contents} = goods;
    const[attaches,setAttaches] = useState([]);
    const callAPI=async()=>{
        setLoading(true);
        const res=await axios.get(`/goods/attach/${gid}`);
        console.log(res.data);
        setAttaches(res.data);
        setLoading(false);
    }
    useEffect(()=>{
        callAPI();
    }, []);

    if(loading) return <h1>로딩중...</h1> ;
    return (
        <div className='mt-2'>
            <Tabs
            defaultActiveKey="text"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="text" title="상세설명">
                <div dangerouslySetInnerHTML={{__html:contents}}/>
            </Tab>
            <Tab eventKey="review" title="리뷰작성">
                <Review gid={gid}/>
            </Tab>
            <Tab eventKey="image" title="첨부이미지" >
               {attaches.map(att=>
                    <Col key={att.aid} xs={6} md={3} lg={2} className='mb-2'>
                        <Card>
                            <Card.Body>
                                <img src={att.filename} width="100%"/>
                            </Card.Body>
                        </Card>
                    </Col>
               )}
            </Tab>
            <Tab eventKey="related" title="관련상품" >
               
            </Tab>
            </Tabs>
        </div>
  
    )

}

export default GoodsInfo
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import {BoxContext} from '../../context/BoxContext';

const CGVPage = () => {
    const {setBox} = useContext(BoxContext);
    const [loading,setLoading] = useState(false);
    const [list,setList] = useState([]);
    const callAPI=async()=>{
        setLoading(true);
        const res = await axios.get('/crawl/cgv');
        console.log(res.data);
        setList(res.data);
        setLoading(false);
        let link = `http://www.cgv.co.kr/`;
    }
    const onClickDownload =async(url)=>{
        await axios.post(`/crawl/cgv/download?image=${url}`);
    }
    useEffect(()=>{
        callAPI();
    },[])
    if(loading) return <h1>로딩중....</h1>
    return (
        <Row>
            {list.map((cgv,index)=>
                <Col key={cgv.image} xs={6} md={4} lg={2} className='mb-2' >
                    <Card>
                        <Card.Header>
                            예매율 :<span className='text-info'> {cgv.percent}</span>
                        </Card.Header>
                        <Card.Body>
                                <img src={cgv.image} width="100%"/>
                        </Card.Body>
                        <Card.Footer>
                            <span  className='ellipsis' style={{fontSize:'0.7rem'}}>
                                {index+1}.{cgv.title}
                            </span>
                            <a href={cgv.link}>
                            <Button className='px-2 ms-5 w-2'variant='outline-danger' size='sm'>
                                예매
                            </Button></a>
                        </Card.Footer>
                        <Button variant='outline-secondary' onClick={(e)=>onClickDownload(cgv.image)}>이미지다운로드</Button>
                    </Card>
                </Col>
            )}
        </Row>
    )
}

export default CGVPage
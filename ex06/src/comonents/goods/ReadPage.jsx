
import { useParams } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import GoodsInfo from './GoodsInfo';
import Recently from '../../common/Recently';

const ReadPage = () => {
    const [related,setRelated] = useState([]);
    const [loading,setLoading] = useState(false);
    const [goods,setGoods] = useState("");
    const {title,image,brand,maker,price,regDate,fmtprice} = goods;
    const param=useParams();
    //console.log(param);
    const {gid} = param;// 비구조할당
    const callAPI = async()=> {
        setLoading(true);
        const res=await axios.get(`/goods/read/${gid}`);
        console.log(res.data);
       const data={...res.data,fmtprice:res.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        setGoods(data);
        setLoading(false);
    }
    useEffect(()=>{
        callAPI();
        callRelated();
    }, []);
    const callRelated = async() => {
        const res1=await axios.get(`/goods/related/list/${gid}`);
        //console.log(res1.data);
        setRelated(res1.data);
      }
    if(loading) return <h1>로딩중...</h1> ;
  return (
    <div>
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <img src={image} width="150px"/>
                    </Col>
                    <Col>
                        <div>[{gid}] {title}</div>
                        <div>가격:{fmtprice}원</div>
                        <div>제조사: {maker}</div>
                        <div>브랜드: {brand}</div>
                        <div>등록일: {regDate}</div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        {related.length >=5 && 
        <div className='mt-5'>
          <h3>관련상품</h3>
          <Recently goods={related}/>
        </div>
      }
        <GoodsInfo goods={goods} gid={gid}/>
        <div style={{height:'200px'}}></div>
    </div>
  )
}

export default ReadPage
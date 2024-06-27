import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col } from 'react-bootstrap';
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{color:'gray', fontSize:'5rem' }}
        onClick={onClick}> <BiChevronRight/>
</div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{color:'gray', fontSize:'5rem' }}
        onClick={onClick}> <BiChevronLeft/>
      </div>
    );
  }

const Recently = () => {
    const [goods,setGoods] = useState([]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:true,
        autoplaySpeed:5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const callAPI = async()=> {
        const res=await axios.get(`/goods/list?page=1&size=5`);
        console.log(res.data.list);
        setGoods(res.data.list);
    }
    useEffect(()=>{
        callAPI();
    }, []);

    return (
        <div>
            <Slider {...settings}>
              {goods.map (good=>
                <Col key={good.gid} >
                    <Card className='me-2'>
                        <Card.Body>
                            <img src={good.image} width="700px"/>
                            <div className='ellipsis'>{good.title}</div>
                        </Card.Body>
                    </Card>
                </Col>
              )}
            </Slider>
        </div>
    )
}

export default Recently
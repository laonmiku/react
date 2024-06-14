import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings'

const Stars = ({size,number,disabled,getRating}) => {
    const [rating,setRating] = useState(number);
    const onChangeRating =(number)=>{
        console.log(number);
        //마우스로 끌어서 설정하는 이벤트
        setRating(number);
        getRating(number); // 자식이 부모한테 보낼때는 함수를 만들어서 보내주고 세팅
    }
    useEffect(()=>{
        setRating(number);
    },[number]);
    return(
        <>
        {disabled ? 
            <span >
            <StarRatings
            rating={rating}
            starRatedColor='orange'
            numberOfStars={5}
            name='rating'
            starDimension={size}
            starSpacing='1px'
            starHoverColor='green'
            
                                    /></span>
        :
            <span >
            <StarRatings
                rating={rating}
                starRatedColor='orange'
                numberOfStars={5}
                name='rating'
                starDimension={size}
                starSpacing='1px'
                starHoverColor='green'
                changeRating={onChangeRating}/></span>
        }
        </>
    )
    
}


export default Stars
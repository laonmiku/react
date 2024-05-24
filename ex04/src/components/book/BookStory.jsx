import React from 'react'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const BookStory = () => {
    //const {contents} = book;
  return (
    <>
    {['right'].map((placement) => (
      <OverlayTrigger
        trigger="click"
        key={placement}
        placement={placement}
        overlay={
          <Popover id={`popover-positioned-${placement}`}>
            <Popover.Body>
            <div className='ellipsis2 '>
                   
                  
        
                    </div> 
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant='outline-secondary' >줄거리 </Button>
      </OverlayTrigger>
    ))}
  </>
  )
}

export default BookStory
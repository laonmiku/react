import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import {InputGroup, Form} from 'react-bootstrap'

function ReadUidOver() {
    const uid=sessionStorage.getItem("uid");
  return (
    <>
     
      {['top'].map((placement) => (
        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`}>
              아이디는 바꿀 수 없습니다.
            </Tooltip>
          }
        >
          
          <InputGroup className='mb-2'>
                    <InputGroup.Text className='w-25 justify-content-center'>아이디</InputGroup.Text>
                    <Form.Control value={uid}/>
            </InputGroup> 
          

        </OverlayTrigger>
      ))}
    </>
  );
}

export default ReadUidOver;
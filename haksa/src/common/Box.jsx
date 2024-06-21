import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GiConfirmed } from "react-icons/gi";

const Box = ({box, setBox}) => {
    
    const onCancel = () => {
      setBox({...box, show:false});
    }
    const onAction=()=>{
        box.action();
        onClose();
    }
    const onClose = () => {
        if(box.action) box.action();
        setBox({...box, show:false});
    }
    
  return (
    <>
      <Modal
        style={{top:'30%'}}
        show={box.show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
         
          <Modal.Title> <GiConfirmed /> 
             {box.action ? "확인" : "경고"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {box.message}
        </Modal.Body>
        <Modal.Footer>
            {box.action ? 
            <>
                <Button variant="outline-secondary" onClick={onCancel}>아니오</Button>
                <Button onClick={onAction} variant="outline-primary" className='px-4' >예</Button>
            </>
            :
            <>
                 <Button variant="outline-primary" className='px-4'  onClick={onClose}>확인</Button>
            </>
            }
         
        </Modal.Footer>
      </Modal>
  </>
  )
}

export default Box
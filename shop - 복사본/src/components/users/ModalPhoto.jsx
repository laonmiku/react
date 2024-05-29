import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalPhoto = ({uid,form,callAPI,photo}) => {
    const [fileName,setFileName] = useState(photo);
    const [file, setFile] = useState(null);
    const refPhoto = useRef(null);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setFileName(photo);
    };
    const handleShow = () => setShow(true);
    const pic={
        width:'150px',
        height:'150px',
        borderRadius:'50%',
        cursor:'pointer',
        borderWidth: '1px',
		borderColor: '#aaa',
        borderStyle: 'solid'
    }
    const onChangeFile =(e)=>{
        setFileName(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const onClickSave =async()=>{
        if(!file){
            alert("변경할 이미지를 선택하세요!");
            return;
        }
        if(!window.confirm("변경한 이미지를 저장하실래요?")) return;
        //이미지업로드
        const formData = new FormData();
        formData.append('file',file); /* 'file'은 백에서 업로드.싱글에 준이름임*/ 
        formData.append('uid',uid);
        const res=await axios.post('/users/photo', formData);

        if(res.data.result == 1){
            alert('업로드성공');
            callAPI();
            handleClose();
        }
    }

    useEffect(()=>{
        setFileName(photo);
    },[photo])

     return (
        <>
        <img src={photo || "http://via.placeholder.com/150x150"} onClick={handleShow}/>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{top:'30%'}}
      >
        <Modal.Header closeButton>
          <Modal.Title>사진변경</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
            <img onClick={()=>refPhoto.current.click()} src={fileName ||  "http://via.placeholder.com/150x150"}  style={pic}/>
            <input onChange={onChangeFile} ref={refPhoto} type='file' style={{display:'none'}} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button onClick={onClickSave} variant="outline-primary">저장</Button>
        </Modal.Footer>
      </Modal>
    </>
     )
}

export default ModalPhoto
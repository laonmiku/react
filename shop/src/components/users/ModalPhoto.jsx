import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalPhoto = ({uid,photo,callAPI}) => {

    const [show, setShow] = useState(false);
    const handleClose = () =>{
        setShow(false);
        setImage({
            name:photo,
            file:null
        });//이미지는 클로즈할떄안해도댈듯,,,call해줘서,,
    };
    const handleShow = () => {
        setShow(true);
        setImage({
            name:photo,
            file:null
        });
    };
    const photoST={
        borderRadius:'50%',
        width: '170px',
        height:'170px',
        borderWidth: '1px',
        borderColor: '#aaa',
        borderStyle:'solid'
    }

    const [image,setImage]=useState({
        name:'',
        file:null
    });
    const {name,file}=image;//비구조할당

    const onChangeFile=(e)=>{
        setImage({
            name : URL.createObjectURL(e.target.files[0]),
            file : e.target.files[0]
        });
    }

    const ref_photo = useRef(null); 
    const onClickSave =async()=>{
        if(!file) {
            alert("변경할 사진을 선택하세요!");
            return;
        }
        if(!window.confirm(uid+"의 사진을 선택한사진으로변경하실래요?")) return;
        //사진저장
        const data = new FormData();
        data.append('file', file);
        data.append('uid', uid);
        const res = await axios.post('/users/photo',data);
        if(res.data.result===1){
            handleClose();
            callAPI();
        }
    }
    return (
    <>
        
        <img src= {photo || "http://via.placeholder.com/200x200"} width='100%' onClick={handleShow}/>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            style={{top:'30%'}}

        >
            <Modal.Header closeButton>
                <Modal.Title>프로필 사진 변경</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <img onClick={()=>ref_photo.current.click()} src={name || "http://via.placeholder.com/200x200"} width='70%' style={photoST}/>
                <input type="file" onChange={onChangeFile} ref={ref_photo} style={{display:'none'}} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>닫기</Button>
                <Button variant="outline-primary" onClick={onClickSave}>저장</Button>
            </Modal.Footer>
        </Modal>
    </>
    )
}

export default ModalPhoto
import axios from 'axios';
import React, { useEffect, useRef, useState,useContext } from 'react'
import { Table,Row,Col, Card, CardBody } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'
import EnrollList from './EnrollList';
import { BoxContext } from '../../context/BoxContext';
import {app} from '../../firebaseInit'
import {getStorage,uploadBytes,ref,getDownloadURL} from 'firebase/storage'

const ReadPage = () => {
    const style={
        cursor:'pointer',
        border:'1px soild gray',
        borderRadius:'10%',
        width:'150px',
        height:'150px'
    }
    const storage = getStorage(app);
    const {setBox} = useContext(BoxContext);
    const [list, setList] = useState([]);
    const [student, setStudent] = useState('');
    const {scode} = useParams();
    const {sname, dept, birthday, pname, advisor, year,photo} = student;
    const [file, setFile] = useState({
        fileBytes : null,
        fileName : photo
    })
    const refFile = useRef(null);
    const {fileBytes, fileName} = file;

    const callAPI = async() => {
        const res = await axios.get(`/stu/${scode}`);
        //console.log(res.data);
        setStudent(res.data);
        setFile({file:null, fileName:res.data.photo});
        callCourses();
    }

    const callCourses = async() => {
        const res1 = await axios.get(`/enroll/scode/${scode}`);
        setList(res1.data);
    }

    useEffect(()=>{
        callAPI();
    },[]);

    const onChangeFile = (e) => {
        setFile({
            fileBytes : e.target.files[0],
            fileName : URL.createObjectURL(e.target.files[0])
        })
    }

    const onUploadPhoto= async()=>{
        if(!fileBytes){
            setBox({
                show:true,
                message:'업로드할 이미지를 선택하세요.'
            });
            return;
        }
        //사진업로드
        const snapshot = await uploadBytes(ref(storage, `/photo/${scode}/${Date.now()}.jpg`), fileBytes);
        const url = await getDownloadURL(snapshot.ref);
        console.log(url);
        setBox({
            show:true,
            message:'업로드완료! '
        })
        await axios.post('/stu/update/photo', {scode, photo:url});
        callAPI();
        
    }


    return (
        <div>
            <h1 className='my-5'>{scode}번 학생정보</h1>
            
            <div className='text-end'><Link to={`/stu/update/${scode}`}>정보수정</Link></div>
            <Row>
                <Col xs={3} lg={3} md={3} className='text-center'>
                    <Card>
                        <Card.Body>
                            <img src={fileName || "http://via.placeholder.com/150x150"} onClick={()=>refFile.current.click()} style={style}/>
                            <input onChange={onChangeFile} type='file' ref={refFile} style={{display:'none'}}/>
                            <div>
                                <Link to='#' onClick={onUploadPhoto}>이미지 저장</Link>
                            </div>
                        </Card.Body>
                    </Card>
                   
                </Col>
                <Col>
                    <Table bordered hover>
                        <tbody >
                            <tr >
                                <td className='bg-light'>학번 </td>
                                <td>{scode}</td>
                                <td className='bg-light'>성명</td>
                                <td>{sname}</td>
                            </tr>
                            <div style={{height:"10px"}}>&nbsp;</div>
                            <tr>
                                <td colSpan={2} className='bg-light'>생년월일 </td> 
                                <td colSpan={2}>{birthday}</td>
                            </tr>
                            <div style={{height:"10px"}}>&nbsp;</div>
                            <tr>
                                <td className='bg-light'>학년 </td>
                                <td>{year}</td>
                                <td className='bg-light'>학과 </td>
                                <td>{dept}</td>
                            </tr>
                            <div style={{height:"10px"}}>&nbsp;</div>
                            <tr>
                                <td colSpan={2} className='bg-light'>담당교수</td>
                                <td colSpan={2}>{pname && `${pname} (${advisor})`}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <EnrollList list={list} scode={scode} callCourses={callCourses}/>
        </div>
    )
}

export default ReadPage
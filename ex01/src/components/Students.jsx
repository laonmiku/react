import React, { useState } from 'react'
import {Table} from 'react-bootstrap';

const Students = () => {
  
    const [students,setStudents]= useState([
        {no:100, name:'홍길동',address:'인천 서구 경서동', phone:'010-0101-0101'},
        {no:101, name:'심청이',address:'서울 강남구 압구정동', phone:'010-0101-0202'},
        {no:102, name:'강감찬',address:'인천 부평구 계산동', phone:'010-0101-0303'},
        {no:200, name:'이몽룡',address:'부산 진구 전포동', phone:'010-2020-2222'},
        {no:202, name:'성춘향',address:'제주도 제주시 애월읍', phone:'010-2020-4568'}
    ]);

    return (
   
        <div className='m-5'>
            <h1 className='mb-3'>학생목록</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>학생번호</td>
                        <td>학생이름</td>
                        <td>학생주소</td>
                        <td>학생번호</td>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s=>
                        <tr>
                            <td>{s.no}</td>
                            <td>{s.name}</td>
                            <td>{s.address}</td>
                            <td>{s.phone}</td>
                        </tr> 
                    )}
                </tbody>
            </Table>
        </div>
  )
}

export default Students
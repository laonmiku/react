import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

const FinancePage = () => {
    const [list,setList] = useState([]);
    const callAPI=async()=>{
        const res=await axios.get('crawl/finance');
        console.log(res.data);
        setList(res.data);
    }
    useEffect(()=>{ 
        callAPI();
    },[])
    return (
        <div>
            <h1>TOP15 종목</h1>
            <Table>
                <tbody>
                    <tr >
                        <td className='text-start'>종목명</td>
                        <td>현재가</td>
                        <td colSpan={2}>전일대비</td>
                     </tr>
                    {list.map((fi,index)=>
                        <tr key={index}>
                            <td className='text-start'>[{index+1}]{fi.title}</td>
                            <td>{fi.price}</td>
                            <td>{fi.range.substr(0,2)}</td>
                            <td>{fi.range.substring(3)}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default FinancePage
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

const Posts = () => {
    const [last,setLast]= useState(1);
    const [page,setPage] =useState(1);
    const [posts,setPosts] = useState([]);
    const callAPI =()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            setLast(Math.ceil(json.length/10));
            const start=(page-1)*10 +1;
            const end=(page*10);
            const data = json.filter(j=> j.id >=start && j.id<=end);
            //console.log(json)
            setPosts(data);
        })
    }
    useEffect ( ()=>{
        callAPI();
    },[] );
    return (
        <div className='m-5'>
            <h1>게시글목록</h1>
            <Table striped bordered hover>
                <thead>
                    <tr >
                        <td>ID</td>
                        <td>Title</td>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(p=>    
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.title}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div>
                <button onClick={()=>setPage(page-1)} disabled={page===1}>이전</button>
                <span className='mx-3'>{page}</span>
                <button onClick={()=>setPage(page+1)} disabled={page===last}>다음</button>
            </div>
        </div>
        
    )
}

export default Posts
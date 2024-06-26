import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Detail = ({form,setForm,callAPI,  goods}) => {
    const [files,setFiles] = useState([]);
    const {gid} = useParams();
    const onClickSave= async()=>{
        //console.log(gid, form.contents);
        if(goods.contents===form.contents) return;
        if(!window.confirm("상세정보을 저장하실래요?")) return;
        await axios.post('/goods/update/contents',{gid,contents:form.contents});
        alert("상세정보저장!");
        callAPI();
    }
    const onChangeFiles=(e)=>{
        let selFiles=[];
        for(let i=0; i<e.target.files.length; i++){
           // console.log("________________________#______");
           const file={name:URL.createObjectURL(e.target.files[i]),
            byte:e.target.files[i]
           }
           selFiles.push(file);
        }
        setFiles(selFiles);
    }
    return (
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3">
          <Tab eventKey="home" title="상세정보">
            <div >
                {form.contents}
            </div>
            <div >
                <Button onClick={onClickSave} className='w-100 border border-1 mb-2 ' variant='light'>상세정보저장</Button>
            </div>
                <CKEditor editor={ClassicEditor} 
                data={form.contents}
                onChange={(e,editor)=>setForm({...form,contents:editor.getData()})}/>
          </Tab>
            <Tab eventKey="profile" title="첨부파일">
                <InputGroup>
                    <Form.Control className='my-2' onChange={onChangeFiles} type='file' multiple={true}/>
                    <Button className='my-2 border border-1' variant='light'>첨부파일저장</Button>
                </InputGroup>
               <Row>
                    {files.map(file=>
                        <Col key={file.name} md={3}>
                            <img src={file.name} width='100%'/>
                        </Col>  
                    )}
                </Row>
            </Tab>
        </Tabs>
      );
}

export default Detail
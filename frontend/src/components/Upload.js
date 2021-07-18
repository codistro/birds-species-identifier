import {useState} from 'react';
import axios from 'axios';
import Charts from './Charts';
import { Button, Container, Row, Col, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Upload.css'


const uploadURL = "http://localhost:5000/uploadImage";

export default function Upload(){
    
    const [file, setfile] = useState({name:''});

    function onFileSelectHandler(event){
        setfile(
            file => { 
                return {
                    ...file, 
                    'load_chart': false, 
                    'file': event.target.files[0], 
                    'img': URL.createObjectURL(event.target.files[0]),
                    'img_selected': true
                }
            })
    }

    function onUpload(){
        const data = new FormData()
        data.append('file', file['file'])
        axios.post(uploadURL, data).then((response) => {
            const scores = response.data['scores']
            const birds = response.data['birds']
            const data = [['Birds', '%age']] 
            for (let i = 0; i < scores.length; i++) {
                let score =  Math.round(scores[i] * 100)
                if (score < 5){
                    continue
                }
                data.push([birds[i], Math.round(scores[i] * 100)])
            }
            setfile(
                file => 
                { 
                    return {
                        ...file, 
                        'name': response.data['birds'][0], 
                        'load_chart': true, 
                        'data':data
                    }
                })
        });
        
    }

    return(
        <Container className="App" fluid="md">
            <Row>
                <Col>
                    <input type="file" onChange={onFileSelectHandler}></input>
                    <Button variant="primary" onClick={onUpload}>Upload</Button>
                </Col>
            </Row>
            <Row  xm="auto">
            <Col>
            {file['img_selected'] && <Image  src={file['img']} style={{display: 'inline'}} thumbnail/>}
            </Col>
                <Col>
            {file['load_chart'] && <Charts data={file['data']}/> }
            </Col>
            
            </Row>
        </Container>
    );
}
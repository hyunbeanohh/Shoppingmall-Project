import React,{useState} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd'
import Axios from 'axios'

function FileUpload() {

    const [Images, setImages] = useState([])


    const dropHandler = (files) =>{
        let formData = new FormData();
        const config = {
            header:{'content-type':'multipart/form-data'}
        }
        formData.append("file",files[0])

        Axios.post('/api/product/image', formData,config)
            .then(response=>{
                if(response.data.success){
                    //console.log(response.data)
                    setImages([...Images, response.data.filePath]) //spread operaton 배열에 모든 이미지들을 넣어줌.
                }else{
                    alert("파일 저장에 실패했습니다.")
                }
            })
    }

    return (
        <div style={{ display:'flex', justifyContent:'space-between'}}>
            <Dropzone onDrop={dropHandler}>
            {({getRootProps, getInputProps}) => (
            <div style={{
                width:300,height:240,border:'1px solid lightgray',
                display:'flex', alignItems:'center', justifyContent:'center'
            }}>
                <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon type='plus' style={{fontSize:'3rem'}}/>
                </div>
            </div>
            )}
        </Dropzone>

        <div style={{display:'flex', width:'300px',height:'240px', overflow:'scroll'}}>
            {Images.map((image,index)=>(
                <div key={index}>
                    <img style={{ minWidht:'300px', width:'300px', height:'240px'}}
                    src={`http://localhost:5000/${image}`}
                    />
                </div>
            ))}

        </div>
        </div>
    )
}

export default FileUpload


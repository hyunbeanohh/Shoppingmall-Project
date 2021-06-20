import React,{useState} from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd'
import Axios from 'axios'

function FileUpload(props) {

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
                    props.refreshFunction([...Images, response.data.filePath]) // 부모 컴포넌트인 UploadProfuctPage로 현재 이미지 정보 전달

                }else{
                    alert("파일 저장에 실패했습니다.")
                }
            })
    }

    const deleteHandler = (image) =>{
        const currentIndex = Images.indexOf(image)
        //console.log('currentIndex :',currentIndex)
        let newImages = [...Images]
        newImages.splice(currentIndex,1)
        setImages(newImages)
        props.refreshFunction(newImages) // 부모 컴포넌트인 UploadProfuctPage로 삭제되고 남은 이미지 정보 전달
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
                <div key={index} onClick={()=>deleteHandler(image)}>
                    <img style={{ minWidht:'300px', width:'300px', height:'240px'}}
                    src={`http://localhost:5000/${image}`} alt="TravleImage"
                    />
                </div>
            ))}

        </div>
        </div>
    )
}

export default FileUpload


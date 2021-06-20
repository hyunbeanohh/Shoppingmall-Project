import React,{useState} from 'react'
import {Typography,Button,Form,Input} from 'antd'
import FileUpload from '../../utils/FileUpload'
const {TextArea} = Input

function UploadProductPage() {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHolder = (e) => {
        setTitle(e.currentTarget.value)
    }
    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value)
    }
    const priceChangeHandler = (e) => {
        setPrice(e.currentTarget.value)
    }
    const continentChangeHandler =(e) =>{
        setContinent(e.currentTarget.value)
    }
    const Continents = [
        {key:1, value:'Africa'},
        {key:2, value:'Europe'},
        {key:3, value:'Asia'},
        {key:4, value:'North Africa'},
        {key:5, value:'South Africa'},
        {key:6, value:'Australia'},
        {key:7, value:'Antaractica'},
        
    ]

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    return (
        <div>
            <div style={{maxWidth:'700px', margin:'2rem auto'}}>
                <div style={{textAlign: 'center', marginBottom:'2rem'}}>
                    <h2>여행 상품 이미지를 올려주세요 !</h2>
                </div>

                <Form>

                    {/*Drop Zone*/}
                    <FileUpload refreshFunction={updateImages}/>  {/* fileUpload에서 올라오는 Images 정보를 받기 위함. */}

                    <br/>
                    <br/>
                    <label>여행지</label>
                    <Input placeholder="상품명을 입력해주세요." value ={Title} onChange={titleChangeHolder}/>
                    <br/>
                    <br/>
                    <label>설명</label>
                    <TextArea onChange={descriptionChangeHandler} placeholder="상품 상세 정보를 입력해주세요." vlaue = {Description}/>
                    <br/>
                    <br/>
                    <label>상품 가격($)</label>
                    <Input type="number" placeholder="가격을 입력해주세요." value ={Price} onChange={priceChangeHandler}/>
                    <br/>
                    <br/>
                    <select onChange = {continentChangeHandler} value={Continent}>
                        {Continents.map((continent,index)=>(
                            <option key ={continent.key} value = {continent.value}> {continent.value} </option>
                        ))}
                        
                    </select>
                    <br/>
                    <br/>
                    <Button>
                        확인
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default UploadProductPage

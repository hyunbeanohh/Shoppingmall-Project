const express = require('express');
const router = express.Router();
const multer = require('multer')
const {Product} = require('../models/Product')
//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage }).single("file")

router.post('/image',(req,res)=>{
    // 가져온 이미지를 저장을 해줌.
    upload(req,res,err=>{
        if(err){
            return req.json({success:false,err})
        }
        return res.json({success:true,filePath:res.req.file.path, fileName: res.req.file.filename})
    })

})


router.post('/',(req,res)=>{  // /api/product
  // 받아온 정보들을 DB에 저장한다.
  const product = new Product(req.body)
  
  product.save((err)=>{
    if(err) res.status(400).json({success:false,err})
    res.status(200).json({success:true})
  })
})


module.exports = router;

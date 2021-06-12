// hamu routakan lera danusen
// router wata controller
const express=require('express')
const router=express.Router()

router.get('/', (req,res) =>{
    res.render('index')
})

module.exports = router
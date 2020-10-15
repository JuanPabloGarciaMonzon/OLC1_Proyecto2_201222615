const {Router} = require('express');
const router =Router();

router.get('/',(req,res)=>{
    //res.send('Hola Mundo');
    res.json({"Title":"Hola Mundo"});
});

router.get('/test',(req,res)=>{
    //res.send('Hola Mundo');
    const data ={
        "name" :"edgar",
        "website": "sistemas.com"
    };
    res.json(data);
});

module.exports = router;
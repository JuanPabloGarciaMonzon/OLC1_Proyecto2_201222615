const {Router} = require('express');
const router = Router();

const movies =require('../ejemplo.json');
//console.log(movies);

router.get('/',(req,res)=>{
    //res.send(req.params.id);
    res.json(movies);
});

router.post('/',(req,res)=>{
    //console.log(req.body);
    const{title,director,year} =req.body;
    if(title && director && year){
        res.json('Guardado');
    }else{
        res.send('No Guardado');
    }
    //res.send('recibido');
   
});


module.exports = router;
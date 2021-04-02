const express = require('express');

const {getuser,adduser , deletecookie,login ,getsingleuser , deleteuser,update} = require('../controller/apicontroller')
const router = express.Router();

router.get('/user',getuser);

router.get('/getuser/:id',getsingleuser)

router.post('/adduser',adduser);

router.get('/deleteCookie',deletecookie);

router.post('/login',login)

router.delete('/deleteuser',deleteuser);

router.put('/update',update);
module.exports = router;
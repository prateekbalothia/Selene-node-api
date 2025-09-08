const express = require('express');
const router = express.Router();

const {themeset} = require('../../controller/Admin/infocontroller')
const {getnavbar,addnavbar,updateNav,deleteNav} = require('../../controller/Admin/navcontroller')

router.post('/site-setting-process',themeset)
router.get('/navbar',getnavbar)
router.post('/navbar-update-process',updateNav)
router.post('/navbar-add-process',addnavbar)
router.post('/navbar-delete-process',deleteNav)

module.exports=router

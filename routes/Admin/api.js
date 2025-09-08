const express = require('express');
const router = express.Router();

const {themeset} = require('../../controller/Admin/infocontroller')
const {getnavbar,addnavbar,updateNav,deleteNav} = require('../../controller/Admin/navcontroller')
const {uploadFile} = require('../../controller/Admin/mediacontroller')

const {upload} = require('../../middlewares/MediaIn')

router.post('/site-setting-process',themeset)
router.get('/navbar',getnavbar)
router.post('/navbar-update-process',updateNav)
router.post('/navbar-add-process',addnavbar)
router.post('/navbar-delete-process',deleteNav)
router.post('/upload',upload,uploadFile)

module.exports=router

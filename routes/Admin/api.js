const express = require('express');
const router = express.Router();

const {themeset} = require('../../controller/Admin/infocontroller')
const {getnavbar,addnavbar,updateNav,deleteNav} = require('../../controller/Admin/navcontroller')
const {getMedia, uploadFile, deleteMedia, updateMedia} = require('../../controller/Admin/mediacontroller')

const {upload} = require('../../middlewares/MediaIn')

router.post('/site-setting-process',themeset)
router.get('/navbar',getnavbar)
router.get('/navbar-update-process/:id',updateNav)
router.post('/navbar-add-process',addnavbar)
router.post('/navbar-delete-process/:id',deleteNav)
router.get('/all-media',getMedia)
router.post('/upload',upload,uploadFile)
router.get('/upload-delete-process/:_id', deleteMedia)
router.get('/upload-update-process/:_id', updateMedia)

module.exports=router

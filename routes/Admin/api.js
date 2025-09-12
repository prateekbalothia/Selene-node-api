const express = require('express');
const router = express.Router();

const {themeset} = require('../../controller/Admin/infocontroller')
const {getnavbar,updateNav,deleteNav, getnavbarbyid, addnavbarProcess} = require('../../controller/Admin/navcontroller')
const {getMedia, uploadFile, deleteMedia, updateMedia} = require('../../controller/Admin/mediacontroller')
const { addProductProcess, allProducts, productDeleteProcess, productUpdateProcess, productById } = require('../../controller/Admin/productcontroller');

const {upload} = require('../../middlewares/MediaIn');

router.post('/site-setting-process',themeset)
router.get('/navbar',getnavbar)
router.get('/navbar-by-id/:id',getnavbarbyid)
router.get('/navbar-update-process/:id',updateNav)
router.post('/navbar-add-process',addnavbarProcess)
router.get('/navbar-delete-process/:id',deleteNav)
router.get('/all-media',getMedia)
router.post('/upload',upload,uploadFile)
router.get('/upload-delete-process/:_id', deleteMedia)
router.get('/upload-update-process/:_id', updateMedia)
router.get('/all-products', allProducts)
router.get('/all-products-by-id/:id', productById)
router.post('/product-add-process',upload, addProductProcess)
router.get('/product-delete-process/:_id', productDeleteProcess)
router.get('/product-status-process/:_id', productUpdateProcess)

module.exports=router

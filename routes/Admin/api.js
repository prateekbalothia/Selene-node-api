const express = require('express');
const router = express.Router();

const {themeset} = require('../../controller/Admin/infocontroller')
const {getnavbar,updateNav,deleteNav, getnavbarbyid, addnavbarProcess} = require('../../controller/Admin/navcontroller')
const {getMedia, uploadFile, deleteMedia, updateMedia} = require('../../controller/Admin/mediacontroller')
const { addProductProcess, allProducts, productDeleteProcess, productUpdateProcess, productById } = require('../../controller/Admin/productcontroller');
const { addCatagoryProcess, allCatagories, catStatusUpdate, catagoryById, deleteCatagory } = require('../../controller/Admin/catagorycontroller');
const { addSliderProceess, getSlider, sliderStatusUpdate, sliderbyidEdit, sliderDeleteProcess } = require('../../controller/Admin/slidercontroller');
const { newUserProcess, userAuthProcess } = require('../../controller/Admin/UserController');

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
router.get('/all-catagory', allCatagories)
router.post('/catagory-add-process', addCatagoryProcess)
router.get('/catagory-status-update/:id', catStatusUpdate)
router.get('/catagory-by-id/:id', catagoryById)
router.get('/catagory-delete-process/:id', deleteCatagory)
router.get('/slider-and-banner', getSlider)
router.post('/add-slider-process',upload, addSliderProceess)
router.get('/slider-status-process/:id', sliderStatusUpdate)
router.get('/slider-by-id/:id', sliderbyidEdit)
router.get('/slider-delete-process/:id', sliderDeleteProcess)
router.post('/new-user-process', newUserProcess)
router.post('/login', userAuthProcess)

module.exports=router

const express = require('express');
const router = express.Router();

const { getnavbar, addnavbar} = require('../../controller/Web/navcontroller');
const {getfooter} = require('../../controller/Web/footcontroller');
const {newsletter} = require('../../controller/Web/newscontroller');
const {contactUser} = require('../../controller/Web/Contactusercontroller');
const {getInfo, themesetting} = require('../../controller/Web/infocontroller')
const {addPage,getPage} = require('../../controller/Web/pagecontroller');
const { allProducts, findProduct, productByCatagory } = require('../../controller/Web/productcontroller');
const { allCatagories, catagoryWiseProducts } = require('../../controller/Web/catagorycontroller');
const { getSlider } = require('../../controller/Web/slidercontroller');

router.get('/navbar',getnavbar)
router.post('/navbar',addnavbar)
router.get('/footer',getfooter)
router.post('/newsletter',newsletter)
router.post('/contact',contactUser)
router.get('/themesetting',getInfo)
router.post('/themesetting',themesetting)
router.post('/pages',addPage)
router.get('/pages',getPage)
router.get('/all-products', allProducts)
router.get('/product-details/:slug',findProduct)
router.get('/all-catagory', allCatagories)
router.get('/catagory-wise-products', catagoryWiseProducts)
router.get('/product-by-catagory/:slug', productByCatagory)
router.get('/product-by-catagory', productByCatagory)
router.get('/all-sliders-and-banners', getSlider)


module.exports=router
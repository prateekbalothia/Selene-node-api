const express = require('express');
const router = express.Router();

const { getnavbar, addnavbar} = require('../../controller/Web/navcontroller');
const {getfooter} = require('../../controller/Web/footcontroller');
const {newsletter} = require('../../controller/Web/newscontroller');
const {contactUser} = require('../../controller/Web/usercontroller');
const {getInfo, themesetting} = require('../../controller/Web/infocontroller')
const {addPage,getPage} = require('../../controller/Web/pagecontroller');
const { allProducts } = require('../../controller/Web/productcontroller');

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


module.exports=router
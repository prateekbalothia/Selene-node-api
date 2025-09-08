const pagemodel = require('../../models/pagemodel')

const getPage = async (req,res) => {
    const data =await pagemodel.find()
    return res.send({status:"success",data:data})
}

function createSlug(str) {
    return str
        .toLowerCase() // Convert string to lowercase
        .replace(/[^\w\s-]/g, '') // Remove non-word characters
        .trim() // Trim leading/trailing whitespace
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/--+/g, '-'); // Replace multiple - with single -
}
const addPage = async (req,res) => {
    const {page_name,page_usefull_links_status,page_our_services_status} = req.body
    const page_slug = createSlug(page_name)

    const newPage = new pagemodel({
        page_name,
        page_slug,
        page_usefull_links_status,
        page_our_services_status,

    })

    const savePage = newPage.save();
    return res.send({
        status:'success',
        data:savePage
    })
    
}

module.exports = {addPage, getPage}
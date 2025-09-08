const navmodel = require('../../models/navmodel')

const getnavbar = async (req, res) => {
    let data = await navmodel.find();
    res.send(data)
}

function createSlug(str) {
    return str
        .toLowerCase() // Convert string to lowercase
        .replace(/[^\w\s-]/g, '') // Remove non-word characters
        .trim() // Trim leading/trailing whitespace
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/--+/g, '-'); // Replace multiple - with single -
}

const addnavbar = async (req, res) => {
    const { navbar_name } = req.body
    const navbar_slug = createSlug(navbar_name)


    const newNavbar = new navmodel({
        navbar_name,
        navbar_slug
    });

    const savedNavbar = await newNavbar.save();
    res.send(savedNavbar)
};


module.exports = { getnavbar, addnavbar }
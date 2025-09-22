const navmodel = require('../../models/navmodel')

const getnavbar = async (req, res) => {
    let menuItems = await navmodel.find();
    return res.send({ "status": "success", data: menuItems })
}
const getnavbarbyid = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    const navItem = await navmodel.findById(id);

    return res.send({ "status": "success", data: navItem })

}

const updateNav = async (req, res) => {
    const { id } = req.params;

    const navItem = await navmodel.findById(id);
    if (!navItem) {
        return res.send({ status: "error", message: "Not found" });
    }
    const newStatus = navItem.navbar_status === 1 ? 0 : 1;

    await navmodel.updateOne(
        { _id: id },
        { $set: { navbar_status: newStatus } }
    )
    return res.send({ status: "success", message: 'status updated successfully' })
}

function createSlug(str) {
    return str
        .toLowerCase() // Convert string to lowercase
        .replace(/[^\w\s-]/g, '') // Remove non-word characters
        .trim() // Trim leading/trailing whitespace
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/--+/g, '-'); // Replace multiple - with single -
}

const addnavbarProcess = async (req, res) => {
    const data = req.body;
    const navbar_slug = createSlug(data.navbar_name)
    let reqName = data.navbar_name
    
    let savedNavbar;
    if (data._id && data._id !== "" && Number(data._id) !== 0) {
        const idData = await navmodel.findById({ _id: data._id })
        const existingName = idData.navbar_name
        const lowExisting = existingName.toLowerCase()
        const lowReqName = reqName.toLowerCase()
        
        console.log(lowExisting);
        console.log(lowReqName);
                

        if (existingName !== reqName) {
            const alreadyExistName = await navmodel.findOne({ navbar_name: reqName })
            console.log(alreadyExistName);
            
            if (alreadyExistName !== null) {
                // console.log(alreadyExistName)
                return res.send({ status: "error", message: "⚠️Field already exists!" })
            }
        }
        savedNavbar = await navmodel.findByIdAndUpdate(
            data._id,
            { navbar_name: reqName, navbar_slug: req.body.navbar_slug }
        )
        
    } else {

        const alreadyExistName = await navmodel.findOne({ navbar_name: reqName})
        // console.log(alreadyExistName);
        // return false
        if (alreadyExistName !== null) {
            return res.send({ status: "error", message: "⚠️Field already exists!" })
        }
        const newNavbar = new navmodel({
            navbar_name: reqName,
            navbar_slug: req.body.navbar_slug
        });
        savedNavbar = await newNavbar.save();
    }


    return res.send({ status: "success", data: savedNavbar })

};

const deleteNav = async (req, res) => {
    const { id } = req.params;
    await navmodel.deleteOne({ _id: id })
    return res.send({ status: "success", message: "Deleted successfully" })
}

module.exports = { getnavbar, updateNav, addnavbarProcess, deleteNav, getnavbarbyid }
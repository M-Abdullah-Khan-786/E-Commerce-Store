const jwt = require('jsonwebtoken');


const generateRefreshtoken = async (id) => {
    return await jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    });

}
module.exports = generateRefreshtoken
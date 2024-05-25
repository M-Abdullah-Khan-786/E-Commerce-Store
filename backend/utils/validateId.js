const mongoose = require("mongoose")
const { errorhandler } = require("../middlewares/errorMiddleware")

const validateId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return errorhandler(400, "Database Id error")
    }
}

module.exports = validateId
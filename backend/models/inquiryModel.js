const mongoose = require('mongoose');

var inquirySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Submitted",
        enum:['Submitted', 'Responded', 'In Progress', 'Closed'],
    },
},{
    timestamps: true,
});

const Inquiry= mongoose.model('Inquiry', inquirySchema);
module.exports = Inquiry;
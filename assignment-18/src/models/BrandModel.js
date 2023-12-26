const mongoose = require('mongoose');
const DataScheme = mongoose.Schema({
    brandName: {
        type: String,
        unique: true,
        required: true,
    },
    brandImg: {
        type: String,
        required: true,
    }
}, {timestamps:true,versionKey:false});


const BrandModel = mongoose.model("brands", DataScheme );

module.exports = BrandModel;
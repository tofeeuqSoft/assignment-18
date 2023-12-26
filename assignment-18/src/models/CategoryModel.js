const mongoose = require('mongoose');
const DataScheme = mongoose.Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true,
    },
    categoryImg: {
        type: String,
        required: true,
    }
}, {timestamps:true,versionKey:false});


const CategoryModel = mongoose.model("categories", DataScheme );

module.exports = CategoryModel
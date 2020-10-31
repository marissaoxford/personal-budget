const mongoose = require("mongoose")
const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    budget: {
        type: Number,
        required: true,
        min: 0
    },
    backgroundColor: {
        type: String,
        unique: true,
        validator: [colorValidator, 'Invalid color'],
        required: true
        
    }
}, { collection: 'myBudget'})

module.exports = mongoose.model('myBudget', budgetSchema)
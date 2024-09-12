const mongoose = require("mongoose");

const Stockpostschema = new mongoose.Schema({
    title: { type: String, required: true },
    stocksymbol: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    userid: { type: String },
    username: { type: String }
}, { versionKey: false })


const Stockpostmodel = mongoose.model("stock", Stockpostschema);

module.exports = Stockpostmodel
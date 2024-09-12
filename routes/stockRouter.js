const { Router } = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const Stockpostmodel = require("../models/stockpostModel");


const stockRouter = Router();


stockRouter.post("/posts", authmiddleware, async (req, res) => {
    const { title, description, userid, username ,stocksymbol} = req.body;

    try {
        let stock = new Stockpostmodel({ title, description, userid, username,stocksymbol });
        await stock.save();
        res.status(200).json({ success: true, message: 'stock created successfully' })
    } catch (error) {
        res.status(400).json({ message: "error creating stock" })
    }

})

stockRouter.get("/posts", authmiddleware, async (req, res) => {
    let userid = req.body.userid;
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 10
    let skip = (page - 1) * limit

    try {
        let stocks = await Stockpostmodel.find({ userid })
        let totalpage = Math.ceil(stocks.length / limit)
        let allstocks = await Stockpostmodel.find({ userid }).limit(limit).skip(skip)

        res.status(200).json({ page: page, totalpage, totalpage, allstocks })
    } catch (error) {
        res.status(400).json({ message: "error getting stocks" })
    }

})



stockRouter.get("/posts/:postId", authmiddleware, async (req, res) => {
    let { postId } = req.params

    try {
        let stock = await Stockpostmodel.findOne({_id: postId });
        res.status(200).json({ stock })
    } catch (error) {
        res.status(400).json({ message: "error getting stock" })
    }

})




stockRouter.delete("/posts/:postId", authmiddleware, async (req, res) => {
    let { postId } = req.params

    try {
        await Stockpostmodel.findByIdAndDelete({ _id: postId });
        res.status(200).json({ message: "stock deleted successfully" })
    } catch (error) {
        res.status(400).json({ message: "error deleting stock" })
    }

})

module.exports = stockRouter
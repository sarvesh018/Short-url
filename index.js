const express = require('express');
const app = express();

const URL = require('./models/url')

const {connectToMongoDB} = require('./connect');

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("MongoDB Connected!"))

const urlRoute = require("./routes/url");
const PORT = 8001;

app.use(express.json());

app.use("/url", urlRoute);
app.get('/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push:{
        visitHistory: {
            timestamp: Date.now(),
        },
    }});
    res.redirect(entry.redeirectURL);
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
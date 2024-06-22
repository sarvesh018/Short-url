const express = require('express');

const {handleNewShortURL, handleGetAnalytics} = require("../controllers/url");

const router = express.Router();

router.post("/", handleNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;


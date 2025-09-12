const mongoose = require('mongoose')
const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
require('dotenv').config();

mongoose.connect(process.env.mongo_url)

app.use(express.json())
app.use(cors())
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));


const webrouter = require('./routes/Web/api')
app.use('/api/web',webrouter)

const adminroute = require('./routes/Admin/api');
const { log } = require('console');
app.use('/api/admin',adminroute)

app.listen(4500,'0.0.0.0');
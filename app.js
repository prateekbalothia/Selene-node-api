const mongoose = require('mongoose')
const express = require('express');
const app = express();
const cors = require('cors')


mongoose.connect('mongodb://localhost:27017/ninest')

app.use(express.json())
app.use(cors())

const webrouter = require('./routes/Web/api')
app.use('/api/web',webrouter)

const adminroute = require('./routes/Admin/api')
app.use('/api/admin',adminroute)

app.listen(4500,'0.0.0.0');
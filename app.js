const express = require('express');
const app = express();
const morgan = require('morgan');
const createError = require('http-errors');
const cors = require('cors')
const authRoutes = require('./routes/auth_routes');
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', async (req, res, next) => {
    try {
        console.log(req);
        res.send("server is up and running...");
    } catch (error) {
        next(err);
    }
})

app.get('/ping', (req, res) => {
    console.log(req.headers);
    res.send("Server is up and running...");
})


app.use('/auth', authRoutes);


app.use(async (req, res, next) => {
    next(createError.NotFound('this route doesnot exist'));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        },
    })
    console.log(err);
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})
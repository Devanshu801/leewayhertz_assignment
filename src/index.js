const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const sharp = require('sharp')
const User = require('./models/user')
require('./db/mongoose')

// Intialising Express app
const app = express();

// Middleare
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT || 3000;

// Setting up file paths
const filePath = path.join(__dirname, '../public')

// Setting up static globalPath
app.use(express.static(filePath))

const upload = multer({
    image: {
        type: 'buffer'
    },
    limits: {
        fileSize: 10000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload a profile picture of valid type'))
        }
        cb(undefined, true)
    }
})

app.post('/form-data', upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).png().toBuffer()
    const name = req.body.fname
    const email = req.body.email
    const phone = req.body.phone_number
    const avatar = buffer

    const user = new User({
        name,
        email,
        phone,
        avatar
    })
    await user.save().catch(er => console.log('qwwwq', er))
    res.send({
        "success": 'Your Data has been saved to the server'
    })
})

app.listen(port, () => {
    console.log(`The server is running on ${port}`);
})
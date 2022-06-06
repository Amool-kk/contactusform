const express = require('express')
const app = express();
var cors = require('cors')
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' })
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})
app.use(cors(corsOptions));

require('./dbConnection/conn')

const appointmentDB = require('./model/model')

app.get('/', (req, res) => {
    res.send('hello')
})

app.post('/', (req, res) => {
    console.log(req.body)
    const { name, email, phone, date } = req.body;

    if (!name || !email || !phone || !date || !req.body) {
        res.status(400).send({ message: "Please fill all details" });
    } else {
        const data = new appointmentDB({
            name,
            email,
            phone,
            date
        })

        data.save(data).then(data => {
            console.log("))))))))))))))))")
            res.status(200).send({ message: data });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        })
    }
})

app.listen(port, () => {
    console.log(`Connection is done at ${port}`);
})
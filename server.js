const express = require("express");
const router = express.Router()
const dotenv = require("dotenv")
const routes = require("./routes/main")
const {connectDatabase} = require("./helpers/database/connectDatabase")
const bodyParser = require("body-parser")
const {errorHandling} = require("./middlewares/error/errorHandling")

dotenv.config({ path: './enviroment/env/stables.env'});



connectDatabase();

const app = express();

app.use(bodyParser.json()) // for parsing application/json



app.use("/api",routes)

app.use(errorHandling)


const {PORT} =  process.env;



app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
})



module.exports = router;






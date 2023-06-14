const express = require("express");
const app = express();
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT || 4000;


app.use(express.json());

require("./config/database.js").connect();


const user = require("./routes/user");
app.use("/api", user);


app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})
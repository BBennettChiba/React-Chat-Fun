const express = require('express');
require('dotenv').config()
const app = express();
app.use(express.json());
const {createUser} = require('./db/dbActions');

app.post('/', (req, res) => {
    const user = createUser(req.body.userID, req.body.content);
    res.json(user)
})

app.listen(process.env.PORT, () =>{
    console.log(`listening on port ${process.env.PORT}`);
})
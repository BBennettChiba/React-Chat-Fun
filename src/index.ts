const express = require('express');
const app = express();
app.use(express.json());
const {createUser} = require('./db/dbActions');

app.post('/', (req, res) => {
    const user = createUser(req.body.userID, req.body.content);
    res.json(user)
})

app.listen(3000, () =>{
    console.log('listening on port 3000');
})
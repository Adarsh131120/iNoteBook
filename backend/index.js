const express = require('express')
var cors = require('cors')
require('dotenv').config();
var app = express()

const connectToMongo = require('./db')



app.use(cors())



const port = 5000

app.use(express.json())
 // Available  Routes
 app.use('/api/auth',require('./routes/auth'));
 app.use('/api/notes',require('./routes/notes'));

app.get("/ping", (req, res) => res.send("Hello"));

async function main() {
  await connectToMongo();

  app.listen(port, () => {
    console.log(`iNotebook - backend listening on port http://localhost:${port}`)
  });
}

main();
const ex = require('express')
const cors = require('cors')
const mongo = require('mongoose')
const userRoute = require('./services/routerUser')
const taskRoute = require('./services/routerTask')
const url = 'mongodb://localhost/chulo_tast'

// connect to db
mongo.connect(url, {})
.then( ()=> console.log('Connect to mongodb'))
.catch((e)=> console.error('error:', e))

const app = ex()

const port = 9230

app.use(cors())
app.use(ex.json())
app.use("/api", userRoute)
app.use("/api", taskRoute)


app.get('/', (req, res)=>{
    res.send('Welcome a my api tast Family')
})

// config the server and run
app.listen(port, () => console.log("server run...") )
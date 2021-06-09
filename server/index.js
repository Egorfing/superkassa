const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000
var cors = require('cors')
 
app.use(cors())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/superkassa', {useNewUrlParser: true, useUnifiedTopology: true});

const phoneSchema = new mongoose.Schema({
  phone: { type: String, required: true },
});
const Phone = mongoose.model('Phone', phoneSchema)

app.listen(PORT, ()=> console.log(`server started on PORT ${PORT}`))

app.get('/', async(req,res)=>{
  const phones = await Phone.find()
  res.status(200).json(phones)
})

app.ws('/new', (ws,res)=>{
  
  ws.on('message',async (msg)=>{
    const {phoneNumber} = JSON.parse(msg)
    await Phone.create({phone: phoneNumber})
    const allPhones = await Phone.find()
    aWss.clients.forEach(client=>{
      client.send(JSON.stringify(allPhones))
    })
  })
})

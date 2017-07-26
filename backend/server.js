import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
import axios from 'axios'
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.send("Hello and welcome to sunplot")
})
app.get('/api/settings',(req,res)=>{
    let json = readSetting()
    res.send(json)
})
app.get('/query',(req,res)=>{

    let url = req.query.data

    if(url){
        console.log("sending request",url)
        axios.get(url).then(response => {
            if(response.data['result-set']){
                console.log("Here is the response", response.data)
                res.send(response.data)
            }

        }).catch(err=>{
            console.log("dude we hit a big one ", err)
            res.send(err)
        })
    } else {
        res.send("")
    }

})
app.listen(9090,()=> console.log("Starting Sunplot server on localhost on port 9090"))

const FILE_SETTING = 'public/setting.json';
function readSetting(){
    return  JSON.parse(fs.readFileSync(FILE_SETTING, 'utf8'));
}

function writeSetting(data){
    const content = JSON.stringify(data);
    fs.writeFile(FILE_SETTING, content,  function(err) {
        if (err) {
            return err
        }
    })
    return {msg:"Setting saved"}
}

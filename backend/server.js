import express from 'express'
import fs from 'fs'
import bodyParser from 'body-parser'
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
app.post('/api/settings',(req,res)=>{

    let data = req.body
    if(data){
        writeSetting(data, function(error,resp){
            if(error){
                res.status(404).json({
                    errors:{
                        global:"Unable to save settings to the application"
                    }
                })
            } else{
                console.log("done" ,resp)
                res.status(200).json({msg:"saved"})
            }
        })
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

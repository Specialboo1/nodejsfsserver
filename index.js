const express = require("express");
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);

app.use(cors({
    origin : "*"
}))
app.use(express.json());
 async function loadTasks(dir) {
    const entries =  await readdir(dir, { withFileTypes: true })
    const result = [];   
    for (const entry of entries) {
           result.push({name: entry.name, type: entry.isDirectory() ? "folder" : "file", ext: path.extname(entry.name).slice(1)});
       }
   return result;
   }
app.get("/", async function (req,res)
{
        
  let data = await loadTasks(__dirname)
  res.send(data)       
})

app.post("/create-file", function(req, res){
fs.writeFile(`./${req.body.message}.txt`, `${new Date()}`, function (err)
{
    if(err) throw err;
    res.send("created")
})    
})
app.listen(process.env.PORT || 3000, function()
{
    console.log("I am listening");
})

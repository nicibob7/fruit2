// const http = require('http')
// const port = PORT

// const server = http.createServer((req, res) => {
//     // res.statusCode = 200
//     res.setHeader("Content-Type", "text/html")
//     res.end("<img src='https://pbs.twimg.com/media/Dj8XlmjV4AEzsvr.jpg'>")
// })

// server.listen(port, () => console.log(`App running on port ${port}`))

// const express = require('express');;
// const app = express();
// const port = PORT;

// app.get('/', (req, res) => {
//     res.send('Hello world')
// });

// app.get('/penguins', (req, res) => {
//     // res.status(204).send()    
//     res.send('Here are the penguins');
// });

// app.get('/penguins/:name', (req, res) => {
//     res.send(req.query)
// })

// app.listen(port, () => console.log(`App running on port ${port}`));

require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors')
const fs = require('fs')

const fruits = require('./fruits.js')

app.use(cors())
app.use("/fruits", express.json())

app.get('/', (req, res) => {
    res.send('Hello fruity!');
});

app.get('/fruits', (req, res) => {
    res.send(fruits);
});

app.get('/fruits/:name', (req, res) => {
    res.send(getFruit(req));
});

function getFruit(req){
    for (let i = 0; i < fruits.length; i ++){
        if (req.params.name.toLowerCase() === fruits[i].name.toLowerCase()){
            return fruits[i]
        }
    }
    return `The fruit does not exist`
}

// const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name)
// if (fruit === undefined){
//    res.status(404).send("The fruit doesn't exist")
// }
// else{
// res.send(fruit)   
// }

app.post('/fruits', (req, res) => {
    const fruit = req.body
    console.log(fruit)
    res.send("New fruit created")
    fruits.push(req.body)
// res.status(404) and res.status(204)
    console.log(fruits)
    // fs.writeFile('fruits.js', JSON.stringify(fruits), function(err){
    //     if (err) throw err
    //     console.log('Saved!')
    // })
    // fs.appendFile('fruits.js', JSON.stringify(module.exports = fruits), function(err){
    //     if (err) throw err
    //     console.log('Saved!')        
    // })
})

app.delete("/fruits/:name", (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruitIndex = fruits.findIndex((fruit) => fruit.name.toLowerCase() == name)
    if(fruitIndex === -1){
        res.status(404).send("The fruit doesn't exist")
    }
    else{
        fruit.splice(fruitIndex, 1)
        res.sendStatus(204)
    }
})

app.listen(port, () => console.log(`App running on port ${port}`));
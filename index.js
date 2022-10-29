const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())

// qRALV5YzDTJojcFd dbuser2



const uri = "mongodb+srv://dbuser2:qRALV5YzDTJojcFd@cluster0.krvnoac.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        const userCollection = client.db("test").collection("devices");

        app.get('/users', async(req, res) =>{
            const query = {}
            const cursor = userCollection.find(query)
            const users = await cursor.toArray()
            res.send(users)
        });
        
        app.post('/users', async(req, res) =>{
            const user = req.body
            console.log(user)
            const result = await userCollection.insertOne(user)
            res.send(result)
        })
        app.delete('/users/:id', async(req, res) =>{
            const id = req.params.id;
            const quary = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(quary)
            console.log(result);
            res.send(result)
            
        })
    }
    finally{

    }

}
run().catch(error => console.log(error))


app.get('/', (req, res) =>{
    res.send('api is running')
} )






app.listen(port,() =>{
    console.log(`lisent port ${port}`)
} )

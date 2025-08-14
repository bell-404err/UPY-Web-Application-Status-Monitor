import express from 'express';
import GrpcClients from '../grpcClient/grpcClients.js'

const app = express()


const port = 3000
const pingClient = new GrpcClients;

app.use(express.json());
app.get('/api', async (req, res) => {
    const url: string = "https://jsonplaceholder.typicode.com/todos/1";
    if (url) {
        const resourceStatus = await pingClient.ping(url);
        res.send(resourceStatus)
    }
    res.send("Missing statements");
})

app.post('/api', async (req, res) => {
    const { url } = req.body;
    if (url) {
        const resourceStatus = await pingClient.ping(url);
        res.send(resourceStatus)
    }
    res.send("Missing statements");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

import express from 'express'
import dotenv from 'dotenv'
import client from './db.js';

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})

app.get('/', async (req, res) => {
    try {
        res.json({ message: 'server is running' });
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/posts', async (req, res) => {
    try {
        const result = await client.query('select * from posts');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await client.query('select * from posts where id= $1', [id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/posts', async (req, res) => {
    const { author, title, content, cover, date } = req.body;
    try {
        const result = await client.query
            ('insert into posts (author,title,content,cover,date) values ($1,$2,$3,$4,$5)', [author, title, content, cover, date]);
        res.status(201).send('post added successfully')
    } catch (error) {
        res.status(500).send(error.message)
    }
})
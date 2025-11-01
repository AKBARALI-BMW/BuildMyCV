import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> res.send("serve is running"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
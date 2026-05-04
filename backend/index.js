const express = require('express');
const app = express();
const bodyParser =require('body-parser')
const cors=require('cors');
const authRouter = require('./routes/AuthRouter');
const ProductRoutes = require('./routes/ProductRoutes');
require('dotenv').config()
require('./models/db')

const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/products',ProductRoutes);


const mongoose = require('mongoose');

app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    
    res.status(200).json({
        status: 'OK',
        server: 'Healthy',
        database: dbStatus,
        time: new Date().toISOString()
    });
});



app.listen(PORT, () => {
    console.log(`Server is runing on ${PORT}`);
});




 












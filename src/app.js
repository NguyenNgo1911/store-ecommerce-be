const express = require('express')
const morgan = require('morgan')
//routers
const userRoutes = require('./routes/userRouter');
const authRoutes = require('./routes/authRouter');
const categoryRoutes = require('./routes/categoryRouter');
const productRoutes = require('./routes/productRouter');
const brandRoutes = require('./routes/brandRouter');

//db
const { connectDB } = require('./config/database');

const app = express();

//Đọc file .env
require('dotenv').config();

//Connect DB
connectDB();

//HTTP logger
app.use(morgan('combined'));

// Middleware để xử lý body request
app.use(express.json());

// Routers API 
app.use('/shop', userRoutes);
app.use('/shop/auth', authRoutes);
app.use('/shop', categoryRoutes);
app.use('/shop', productRoutes);
app.use('/shop', brandRoutes);

// Listen PORT run
app.listen(process.env.HOST, () => {
  console.log(`Server run port: ${process.env.HOST}`);
});
const express = require('express')
const morgan = require('morgan')
//routers
const userRoutes = require('./routes/userRouter');
const authRoutes = require('./routes/authRouter.js');
const categoryRoutes = require('./routes/categoryRouter');
const productRoutes = require('./routes/productRouter');
const brandRoutes = require('./routes/brandRouter');
const cartRoutes = require('./routes/cartRouter')

const { errorHandler } = require('./middlewares/errorHandle');

//db
const { connectDB } = require('./config/database');

const app = express();

//Đọc file .env
require('dotenv').config();

//Connect DB
connectDB();

//HTTP logger
app.use(morgan('combined','dev'));

// Middleware để xử lý body request
app.use(express.json());

// Routers API 
app.use('/shop/auth', authRoutes);  

app.use('/shop', userRoutes);
app.use('/shop', categoryRoutes);
app.use('/shop', productRoutes);
app.use('/shop', brandRoutes);
app.use('/shop', cartRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
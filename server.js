import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
// import registerRoute from './routes/register.js';
// import loginRoute from './routes/login.js';
// import deleteUserRoute from './routes/deleteUser.js';
import dataRoute from './routes/data.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(express.json({}));

app.use(cors());

connectDB();

// app.use('/register', registerRoute);
// app.use('/login', loginRoute);
app.use('/data', dataRoute);
// app.use('/user', deleteUserRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
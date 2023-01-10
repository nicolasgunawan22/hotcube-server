import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cartRoutes from './routes/cart.js'
import usersRoutes from './routes/users.js'
import ordersRoutes from './routes/orders.js'
import mailRoutes from './routes/mail.js'
import espRoutes from './routes/esp.js'

const app = express()
dotenv.config()

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/cart', cartRoutes);
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);
app.use('/mail', mailRoutes);
app.use('/data-for-esp', espRoutes);

app.get('/', (req, res) => {
  res.send('Hello to HotCube API');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on port http://localhost:${PORT}`)))
  .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false);
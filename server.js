const express = require('express');
const app = express();
const cors = require('cors');
const userData = require('./routes/users');
const tripData = require('./routes/trips');
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

app.use('/users', userData); 
app.use('/trips', tripData); 


app.listen(PORT, console.log(`Server is running on port ${PORT}`));


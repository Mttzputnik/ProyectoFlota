const express = require('express');
const app = express();
require ('dotenv').config();

const port = 3000 || process.env.PORT;

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${port}`);
});



const express = require('express');
const app = express();

const port = 3080;

app.listen(port, () => {
    console.log(`Server listening on the port: ${port}`);
});

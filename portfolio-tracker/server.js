const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4200;

app.use(express.static('./dist/your-angular-app'));

app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: 'dist/index.html/'});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

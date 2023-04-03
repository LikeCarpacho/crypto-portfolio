const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();
const PORT = process.env.PORT || 4200;

app.use(compression());

// Set correct MIME types for static files
app.use(express.static('./dist/portfolio-tracker', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: 'dist/your-angular-app/'});
});

app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});

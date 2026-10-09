const app = require('./src/app.js');

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Aberto na porta: ' + PORT);
});

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./src/database/connectdb');
const personController = require('./src/controllers/personController');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();

app.get('/person', personController.getAllPerson);
app.get('/person/new', (req, res) => res.render('addPerson'));
app.post('/person', personController.addNewPerson);
app.get('/person/edit/:id', personController.editPerson);
app.post('/person/update/:id', personController.updatePersonById);
app.get('/person/delete/:id', personController.deletePersonById);
app.post('/person/delete/:id', personController.confirmDeletePersonById);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Budget API

const express = require('express');
const mongoose = require('mongoose');
const budgetModel = require('./models/budget_schema');

const cors = require('cors');
const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/personal-budget';

app.use(cors());

app.use('/', express.static('public'));
app.use(express.json());

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log("Connected to the database");
            budgetModel.find({})
                .then((data) => {
                    console.log(data);
                    res.json(data);
                    mongoose.connection.close();
                    console.log("Database connection closed");
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            var newBudget = new budgetModel({
                title: req.body.title,
                budget: req.body.budget,
                backgroundColor: req.body.backgroundColor
            });
            budgetModel.insertMany(newBudget)
                .then((data) => {
                    res.json(data);
                    mongoose.connection.close();
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
});
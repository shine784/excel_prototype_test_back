const express = require('express');
const sequelize = require('../models').sequelize;
const cors = require("cors");

//graphql
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3333;

sequelize.sync();

app.use(cors());
app.use('/formulas', require('./routes/formulas'));
app.use('/tiles', require('./routes/tiles'));

app.use('/graphql', require('./routes/graphsql_test'));

app.listen(port, () => console.log(`Server listening on port ${port}`));

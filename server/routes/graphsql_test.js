const router = require('express').Router();
const cell = require('../../models').cell;
const sequelize = require('sequelize');

const { Op, literal } = require('sequelize');
//graphql
const { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

//스키마
var schema = buildSchema(`
  type Query {
    hello: String,
    bye:String,
    pizza_buns(id:ID!):[PizzaBun]
  }
  type Mutation {
    create_pizza_buns(input:PizzaBunInput):PizzaBun,
  }

  type PizzaBun {
    id:ID!,
    name:String!,
    size:Int!,
    bread:String!,
    gredient:[Gredient]
  }

  type Gredient {
    name:String!,
  }

  input PizzaBunInput{
    name:String!,
    size:Int,
    bread:String,
    gredient:[GredientInput],
  }

  input GredientInput {
    name:String!,
  }

`);
//리졸버
let arr = [
  {
    id:"u00",
    name:"supreme",
    size:10,
    bread:"flat",
    gredient:[
      {
        name:"tomato",
      },
      {
        name:"cheese",
      },
      {
        name:"olive",
      }
    ]
  },
  {
    id:"u01",
    name:"hawaiian",
    size:20,
    bread:"plain",
    gredient:[
      {
        name:"tomato",
      },
      {
        name:"cheese",
      },
      {
        name:"pineapple",
      }
    ]
  },
  {
    id:"u02",
    name:"paperoni",
    size:30,
    bread:"honey",
    gredient:[]
  }
];
const pizzaData = {};
arr.forEach((obj) => {
  pizzaData[obj.id] = obj;
});

var root = {
  hello: () => {'Hello world!'},
  bye: ()=>{"good night!"},
  pizza_buns:({id})=>{
    console.log(id);
    // 분리시켜야함 obj만드는작업
    return [pizzaData[id]];
  },
  create_pizza_buns:({input})=>{//input은 PizzaBunInput type 객체
    console.log(input);
      arr.push(
        {
          id:"u0"+arr.length,
          name:input.name,
          size:input.size,
          bread:input.bread,
          gredient:input.gredient
        }
      )
      arr.forEach((obj) => {
        pizzaData[obj.id] = obj;
      });
      return {id:arr[arr.length-1].id};
  }
};

var ght = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})

module.exports = ght

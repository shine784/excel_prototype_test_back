const router = require('express').Router();
const cell = require('../../models').cell;
const sequelize = require('sequelize');
const cors = require('cors')

router.get('/:tilex/:tiley', async (req, res, next) => {
    try {
        const { tilex, tiley } = req.params;
        await cell.findAll({
            where: {
                tilex: tilex,
                tiley: tiley,
            },
            order: [
                ['y', 'ASC'],
                ['x', 'ASC']
            ],
        }).then(function(result) {
          let arr = [];
          if(result.length!=0){
            for(let i=0;i<25;i++){
              arr.push(result.slice(i*25,(i*25)+25));
            }
          }
          res.send(arr);
        }, function(err){
          res.send(err);//이게 뭐라고 굉장히중요하다 이게 안불리면 timeout까지 끌고간다
        }).catch(function(err){
           console.log(err);
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Update by tileid
router.put('/:tilex/:tiley', cors(),  async (req, res, next) => {
  try {
      const { tilex, tiley} = req.params;
      const {body} = req;
      body.forEach((arr, i) => {//subquery 알아볼것
        arr.forEach((val, j)=>{
           cell.update(
              {
                  abx:val.abx,
                  aby:val.aby,
                  stringdata:val.stringdata,
                  doubledata:val.doubledata,
                  formula:val.formula,
                  style:val.style,
                  x:val.x,
                  y:val.y,
              },
              {
              where:
              {
                tilex: tilex,
                tiley: tiley,
                abx:val.abx,
                aby:val.aby,
              }
          }).then(function(result) {
            next(result);
          }, function(err){
            next(err);
          }).catch(function(err){
             console.log(err);
          });
        })
    })
    //update end
  } catch (error) {
      console.log(error);
      next(error);
  }
});

// Create new tile document
router.post('/', cors(),  async (req, res, next) => {
  try {
      //const { tilex, tiley} = req.params;
      const {tilex,tiley} = req.body;
        for(let i=0;i<25;i++){
          for(let j=0;j<25;j++){
          //insert start
          cell.create(
              {
                  abx:25*tilex + i,
                  aby:25*tiley + j,
                  stringdata:"",
                  doubledata:null,
                  formula:null,
                  style:null,
                  x:i,
                  y:j,
                  tilex: tilex,
                  tiley: tiley,
              },
          ).then(function(result){
            next(result);
          }, function(err){
            next(err);
          }).catch(function(err){
             console.log(err);
          });
          }
      }
      //insert end
    //update end
  } catch (error) {
      console.log(error);
      next(error);
  }
});

module.exports = router;

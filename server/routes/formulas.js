const router = require('express').Router();
const cell = require('../../models').cell;
const { Op, literal } = require('sequelize');

router.post('/sum', async (req, res, next) => {
    try {
        const { fromX, fromY, toX, toY } = req.body;
        console.log(fromX, fromY, toX, toY)
        // 범위 내 cell에 string data가 있는지 검사하는 로직 추가 필요

        const target = await cell.sum('doubledata', {

            where: {
                abx: {
                    [Op.gte]: fromX,
                    [Op.lte]: toX,
                },
                aby: {
                    [Op.gte]: fromY,
                    [Op.lte]: toY,
                },
        }});
        res.send(target.toString());
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/rank', async (req, res, next) => {
    try {
        const { target, ref }  = req.body;
        // 범위 내 cell에 string data가 있는지 검사하는 로직 추가 필요
        const refCells = await cell.findAll({
            attributes: [
                'abx', 'aby', 'doubledata',
                [literal('rank() over (order by "doubledata" desc)'), 'rank']
            ],
            where: {
                abx: {
                    [Op.gte]: ref.fromX,
                    [Op.lte]: ref.toX,
                },
                aby: {
                    [Op.gte]: ref.fromY,
                    [Op.lte]: ref.toY,
                },
            }
        });
        console.log(refCells);
        const result = refCells.map(value => value.dataValues).filter(value => value.abx === target.x && value.aby === target.y)[0];
        res.send(result.rank);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router

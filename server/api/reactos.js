const router = require('express').Router()
const axios = require('axios')
const {Reacto} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reactos = await Reacto.findAll({
      where: {
        name: {
          [Op.like]: '%.md'
        }
      },
      order: [['weekId', 'ASC']]
    })
    res.json(reactos)
  } catch(err) {
    next(err)
  }
})

router.get('/markdown', async (req,res,next) => {
  try{
    const reacto = await Reacto.findOne({
      where: {
        name: req.query.name
      }
    })
    console.log(reacto.dataValues.download_url);
    let response = await axios({
      url: reacto.dataValues.download_url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${req.user.githubToken}`
      }
    })
    res.send(response.data)
  } catch(err) {
    next(err)
  }
})

const router = require('express').Router()
const {User} = require('../db/models')
const rp = require('request-promise')
const Axios = require('axios')
const api = require('ldcli/src/learn-auth').learnDotApi();
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const response = await api.get('api/cohorts/5a6b52fd5657a20004c94405/helpTickets');
  //  console.log(response);
    res.json(response);
  } catch (err) {
      next(err)
  }
})

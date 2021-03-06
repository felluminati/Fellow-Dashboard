const passport = require('passport')
const router = require('express').Router()
const GithubStrategy = require('passport-github').Strategy
const {User} = require('../db/models')
const axios = require('axios')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.log('Github client ID / secret not found. Skipping Github OAuth.')
} else {

  const githubConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  }

  const strategy = new GithubStrategy(
    githubConfig,
    async (token, refreshToken, profile, done) => {
      const githubId = profile.id
      const email = profile.emails[0].value
      const [firstName, lastName] = profile.displayName.split(' ');
      try {
        let res = await axios({
          url: 'https://api.github.com/repos/FullstackAcademy/technical-interview-prep',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
          }
        })
        const githubToken = token
        const githubRefreshToken = refreshToken
        User.findOrCreate({
          where: {githubId},
          defaults: {email, githubToken, githubRefreshToken, firstName, lastName}
        })
          .then(([user]) => done(null, user))
          .catch(done)
      } catch (err) {
        err.message = 'Not Authorzied'
        err.status = 401
        done(err)
      }
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('github', {scope: ['repo','user']}))

  router.get(
    '/callback',
    passport.authenticate('github', {
      successRedirect: '/home',
      failureRedirect: '/login'
    })
  )
}

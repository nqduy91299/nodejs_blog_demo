const newsRouter  = require('./news')
const siteRouter  = require('./site')
const coursesRouter  = require('./courses')
const meRouter  = require('./me')
const loginRouter = require('./login');
const registerRouter = require('./register');
const logoutRouter = require('./logout');

function route(app){

    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/logout', logoutRouter)
    app.use('/news', newsRouter)
    app.use('/courses', coursesRouter)
    app.use('/me', meRouter)

    app.use('/', siteRouter);

}

module.exports = route;
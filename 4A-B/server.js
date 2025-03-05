const express   = require ( 'express' );
const hbs       = require ( 'hbs' );
const path      = require ( 'path' );
const flash     = require ( 'express-flash' );
const session   = require ( 'express-session' );
const methodOverride = require( 'method-override' )

const{
    authStatus,
    checkAuth
} = require( './middleware/auth')

const {
    renderRegisterPage,
    authRegister,
    renderLoginPage,
    authLogIn,
    authLogOut,
} = require( './controller/authController' )

const {
    renderCollectionsPage,
    renderAddCollectionsPage,
    addCollection,
    renderUpdateCollectionPage,
    updateCollection,
    deleteCollection
} = require('./controller/collectionsController')

const port = process.env.SERVER_PORT || 8000;

const server = express();
server.set( 'view engine', 'hbs');
server.set( '/views', path.join(__dirname, './views'));
server.use( '/assets', express.static(path.join(__dirname, './assets')));
server.use( express.urlencoded({extended: true}) );
server.use( express.json() );
server.use( methodOverride( '_method' ))
server.use( 
    session({
        name: 'ScwpAopJ',
        secret: '7dwBG5nUWsEhKxGP',
        resave: false,
        saveUninitialized: false,
    })
);
server.use( flash() );
server.use( authStatus );

// partials dan helper 
hbs.registerPartials(`${__dirname}/views/partials`, function(err){})
hbs.registerHelper('equal', (a, b) =>{
    return a === b
})
hbs .registerHelper('json', function(content){
    return JSON.stringify(content, null, 2)
})

// router

// auth
server.get('/login', checkAuth(false),  renderLoginPage);
server.post('/login', checkAuth(false), authLogIn)

server.get('/register', checkAuth(false), renderRegisterPage);
server.post('/register', checkAuth(false), authRegister);

server.post('/logout', authLogOut)

// collections
server.get('/collections', renderCollectionsPage);

server.get('/add-collection', checkAuth(true), renderAddCollectionsPage);
server.post('/add-collection', checkAuth(true), addCollection);

server.get('/update-collection/:id', renderUpdateCollectionPage);
server.patch('/update-collection/:id', checkAuth(true), updateCollection);

server.delete('/delete-collection/:id', checkAuth(true), deleteCollection);

server.listen(port, () => {
    console.log(`web-task-collections on port ${port}`)
})
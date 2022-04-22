module.exports = (app) => {

    app.use('/', (req, res, next) => {
        const jwt = require('jsonwebtoken');
        const Cookies = require( "cookies" );
 
        // Récupération du token dans le cookie
        let token = new Cookies(req,res).get('access_token');
             
        // sinon on vérifie le jwt
        jwt.verify(token, process.env.APP_KEY, (err, dataJwt) => { 
            // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
            if(!err) req.session.user = dataJwt.user;

            next();          
        });
    });

    app.get('/', (req, res) => {
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });
    app.get('/inscription', (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).print(req, res);
    });
    app.post('/inscription', (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).process(req, res);
    });
    
    app.get('/connexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).print(req, res);
    });
    
    app.get('/realty/:slug', (req, res) => {
        let Home = require('../src/controllers/Home.js');
        (new Home()).printRealty(req, res);
    });


    app.post('/connexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).process(req, res);
    });

    app.get('/deconnexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).disconnect(req, res);
      });
      
    // Vérifier l'acces à l'admin avec le JWT
    app.use('/admin', (req, res, next) => {
        const jwt = require('jsonwebtoken');
        const Cookies = require( "cookies" );

        // Récupération du token dans le cookie
        let token = new Cookies(req,res).get('access_token');

        // Si le cookie (access_token) n'existe pas
        if (token == null) return res.sendStatus(401);

        // sinon on vérifie le jwt
        jwt.verify(token, process.env.APP_KEY, (err, dataJwt) => { 
            // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
            if(err) return res.sendStatus(403);

            // A partir de là le JWT est valide on a plus qu'à vérifier les droits
            // Si on est admin
            if(typeof dataJwt.roles != 'undefined' && dataJwt.roles.includes('ADMIN')) {
                req.session.user = dataJwt.user;
                next();
            } 
            else {
                req.flash('error', 'Vous n\'avez pas les droits pour accéder à cette page.');
                res.redirect('/');
            }
        });
    });



    app.get('/admin', (req, res) => {
        let Dashboard = require('../src/controllers/Dashboard.js');
        (new Dashboard()).print(req, res);
    });

    app.get('/admin/realty', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).print(req, res);
    });
 
    app.get('/admin/realty/form', (req, res) => {
        // require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).printForm(req, res);
    });

    
    
    app.post('/admin/realty/form', 
            require('express-fileupload')({createParentPath: true}),
            require('../src/services/LcParserService.js'), 
        (req, res) => {
            let Realty = require('../src/controllers/Realty.js');
            (new Realty()).process(req, res);
    });


    app.get('/admin/realty/delete/:id', (req, res) => {
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).delete(req, res);
    });

    app.get('/admin/realty/edit/:id', (req, res) => {
        // require('crypto').createHash('sha1').update(`${new Date().toDateString()}${Math.random()}`).digest('hex').toLowerCase();
        let Realty = require('../src/controllers/Realty.js');
        (new Realty()).printForm(req, res);
    });


    app.post('/admin/realty/edit/:id', 
            require('express-fileupload')({createParentPath: true}),
            require('../src/services/LcParserService.js'), 
        (req, res) => {
            let Realty = require('../src/controllers/Realty.js');
            (new Realty()).process(req, res);
    });


    app.get('/detail/:id', (req, res) => {
        let Detail = require('../src/controllers/Detail.js');
        (new Detail()).print(req, res);
    });

};
  
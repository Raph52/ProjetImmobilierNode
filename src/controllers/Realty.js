const RepoRealty = require('../repository/Realty.js')


module.exports = class Realty {
    print(request, response) {
      if(typeof request.session.user !== 'undefined') {
         response.render('admin/realty/list');
         return;
      }
      request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
      response.redirect('/connexion');  
    }
    printForm(req, res) {
        res.render('admin/realty/form');  
    }

    process(request, response) {

      let entity = {
         realty : request.body.realty,
         contact : request.body.contact
      };
      let repo = new RepoRealty();

      repo.add(entity).then((Realty) => 
      {
        response.redirect('/admin')
      })
  };
}
  
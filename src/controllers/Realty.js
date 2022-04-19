const RepoRealty = require('../repository/Realty.js')


module.exports = class Realty {
  print(request, response) {
    if(typeof request.session.user !== 'undefined') {
        let repo = new RepoRealty();
        repo.find().then((realties) => {
            response.render('admin/realty/list', {realties});
        });
    } else {
      // if(typeof request.session.user !== 'undefined') {
      //    response.render('admin/realty/list');
      //    return;
      // }
      request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
      response.redirect('/connexion');  
    }
  }

  printForm(req, res) {
        res.render('admin/realty/form');  
    }


    // printForm(request, response) {
    //   if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
    //       request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
    //       response.redirect('/connexion');  
    //       return;
    //   }
    //         // on est en modification
    //         if(typeof request.params.id !== 'undefined') {
    //           let repo = new RepoRealty();
    //           repo.findById(request.params.id).then((realty) => {
    //               response.render('admin/realty/form', {form : realty});
    //           }, () => {
    //               request.flash('error',`Le bien n'a pas été trouvé`)
    //               response.redirect('/admin/realty');
    //           });   
    //       } 
    //       // on est en ajout
    //       else {
    //           response.render('admin/realty/form', {form: { contact: {}, address : {}}});
    //       }
    //   }
  

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

  delete(request, response) {
    if(typeof request.session === 'undefined' || typeof request.session.user === 'undefined') {
        request.flash('error', `Vous devez être connecté pour accéder à l'administration.`);
        response.redirect('/connexion');  
        return;
    }

    if(typeof request.params.id != 'undefined' && request.params.id != '') {
        let repo = new RepoRealty();
        repo.delete({_id : request.params.id}).then(() => {
            request.flash('notify', 'Le bien a été supprimé.');
            response.redirect('/admin/realty');
        }, () => {
            request.flash('error', 'La suppression du bien a échoué.');
            response.redirect('/admin/realty');
        });  
    } 
    else {
        request.flash('error', 'Une erreur est survenue.');
        response.redirect('/admin/realty');
    }
  }



  
}
  
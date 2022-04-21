const RepoRealty = require('../repository/Realty.js')

module.exports = class Detail {
    print(request, response) {
        let repo = new RepoRealty();
        repo.findById(request.params.id).then((realty) => {
            response.render('detail', {realty})
        });
    }
}



 

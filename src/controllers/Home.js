const RepoRealty = require('../repository/Realty.js')

module.exports = class Home {
    print(request, response) {
        let repo = new RepoRealty();
        repo.find().then((realties) => {
            response.render('home', {realties});
        });
    }
}


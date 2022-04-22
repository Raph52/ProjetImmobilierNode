const RepoRealty = require('../repository/Realty.js')
const UploadImageProductService = require('../services/UploadImageProductService');

module.exports = class Detail {
    print(req, res) {
        let repo = new RepoRealty();
        repo.find({_id : req.params.id}).then((realty) => {
            const UploadImageProduct = new UploadImageProductService();
            realty[0].pictures = UploadImageProduct.getPictures(realty[0].id);
            res.render('detail', {realty : realty[0]});
        });
    }

    
}

 

const User = require('../models/user')
const Review = require('../models/review')


module.exports.createReview = async (req, res) => {

    try {
    
        let recipient = await User.findById(req.params.id);

        if (!recipient) {
            console.log("Recipient is not valid");
            return res.redirect('/');
        }

        for (let i = 0; i < recipient.RecievedReviewfrom.length; i++){
            if (req.user) {
                if (recipient.RecievedReviewfrom[i] == req.user.id) {
                    const new_review = Review.create({
                       reviewer : recipient.id,
                        reviewed: req.user.id,
                        review: req.query.newReview,
                    });
                    if (!new_review) {
                        console.log("Review is not created");
                    }

                    return res.redirect('/');
                }
            } else {
                console.log("user is not loggin");
                return res.redirect("/user/login");
            }
        }
        return res.redirect('/');
    } catch (error) {
        console.log('error', err);
        return;
   }
}
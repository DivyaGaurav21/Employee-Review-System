// -----------Include User and Review models -------------//
const User = require("../models/user");
const Review = require("../models/review");


//-------------- Renders the admin page-------------------//
module.exports.adminPage = async function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/login');
    } else {
        if (req.user.isAdmin == false) {
            console.log("You are not an admin");
            return res.redirect('/');
        } else {
            try {
                let user = await User.find({});
                var employeeList = [];
                for (let i = 0; i < user.length; i++) {
                    var temp = {
                        name: user[i].name,
                        id: user[i].id,
                    };
                    employeeList.push(temp);
                }

                return res.render('admin', {
                    title: "ERS | Admin page",
                    employeeList: employeeList,
                });
            } catch (err) {
                console.log('Error while admin', err);
                return;
            }
        }
    }
};

//-------------Sets reviewers for employees------------------------//
module.exports.setReviewrs = async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/users/login');
        } else {
            let employee = await User.findById(req.user.id);

            if (!employee.isAdmin) {
                console.log("you are not Admin");
                return res.redirect('/');
            } else if (req.body.setReviewer == req.body.getReviewer) {
                return res.redirect('back');
            }
            else {
                let reviewerUser = await User.findById(req.body.setReviewer);
                let recipientUser = await User.findById(req.body.getReviewer);
                reviewerUser.userToReview.push(recipientUser);
                reviewerUser.save();
                recipientUser.RecievedReviewfrom.push(reviewerUser);
                recipientUser.save();
                return res.redirect('back');
            }
        }
    } catch (error) {
        console.log('error in setting reviewer', error);
        return;
    }
}


//----------- make new admin admin to an employee-----------------------//
module.exports.newAdmin = async function (req, res) {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/users/login');
        }
        if (req.user.isAdmin == true) {
            let employee = await User.findById(req.body.newAdmin);

            if (!employee) {
                return res.redirect('back');
            }

            if (employee.isAdmin == true) {
                return res.redirect('back');
            }

            if (employee.isAdmin == false) {
                employee.isAdmin = true,
                    employee.save();

                return res.redirect('/admin/admin-page');
            }
        }
    } catch (err) {
        console.log("Error", err);
        return;
    };

};


//----------------------views employees-----------------------------//
module.exports.viewEmployees = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            if (req.user.isAdmin) {
                let employees = await User.find({});

                if (employees) {
                    return res.render('employee', {
                        title: "Employee || ERS",
                        employees: employees,
                    });
                }
            } else {
                console.log("user is not authorized check list of Employees");
                return res.redirect('/');
            }
        } else {
            console.log("user not authenticated");
            return res.redirect("/users/login");
        }
    } catch (err) {
        console.log("Error", err);
        return;
    }
};



//------------------- delete employee-----------------------------//
module.exports.deleteEmployee = async function (req, res) {
    try {

        if (req.isAuthenticated()) {
            if (req.user.isAdmin) {
                await User.deleteOne({ _id: req.params.id });
                return res.redirect('/admin/view-employees');
            }
        }
    } catch (err) {
        console.log("Error", err);
        return;
    }

};

// ---------set Admin --------------//
module.exports.setAsAdmin =async (req, res) => {
    // console.log(req.user);
    // console.log(req.body.admin_password); 
    try {
        if (req.body.admin_password == '12345') {
            let user = await User.findById(req.user.id );
            user.isAdmin = true;
            user.save();
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('Error', error);
        return;
    }
}
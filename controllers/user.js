const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");

module.exports.userRegisterPage = (req, res) => {
    if (req.isAuthenticated()) {
        req.flash("error", "You are already logged in!");
        return res.redirect("/campgrounds");
    }
    res.render("users/register");
};


module.exports.userRegister = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to CampQuest!");
            res.redirect("/campgrounds");
        });
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/register");
    }
};

module.exports.userLoginPage = (req, res) => {
    if (req.isAuthenticated()) {
        req.flash("error", "You are already logged in!");
        return res.redirect("/campgrounds");
    }
    res.render("users/login");
};

module.exports.userLogin = (req, res) => {
    req.flash("success", "Welcome Back!");
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.userLogout=(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have successfully logged out!');
        res.redirect('/campgrounds');
    });
}

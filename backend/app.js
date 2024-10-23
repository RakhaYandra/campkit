const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRoutes = {
    auth: require("./app/api/user/auth/router"),
    profile: require("./app/api/user/profile/router"),
    rental: require("./app/api/user/rental/router"),
};

const superAdminRoutes = {
    auth: require("./app/api/superAdmin/auth/router"),
    profile: require("./app/api/superAdmin/profile/router"),
    category: require("./app/api/superAdmin/category/router"),
    unit: require("./app/api/superAdmin/unit/router"),
    rental: require("./app/api/superAdmin/rental/router"),
};

// const publicRoutes = {};

const errorHandlerMiddleware = require("./app/middlewares/handle-error");
const notFoundMiddleware = require("./app/middlewares/not-found");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).json({
        status: 200,
        msg: "Welcome to API",
        data: {},
    });
});

Object.values(userRoutes).forEach((route) => app.use("/api", route));
Object.values(superAdminRoutes).forEach((route) => app.use("/api", route));
// Object.values(publicRoutes).forEach((route) => app.use("/api", route));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;

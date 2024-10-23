const jwt = require("jsonwebtoken");
const config = require("../../config/environment-config");
config.loadEnvironmentVariables();
const { UnauthorizedError, UnauthenticatedError, BadRequestError } = require("../errors");

const verifyToken = (req, role) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnauthorizedError("No JWT token provided");
    }

    const token = authHeader.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!data) {
        throw new UnauthenticatedError("Token Invalid");
    }
    if (!data[role]) {
        throw new BadRequestError("Invalid Token");
    }
    return data;
};

const authenticateSuperAdminToken = async (req, res, next) => {
    try {
        req.user = verifyToken(req, "superAdmin");
        next();
    } catch (err) {
        next(err);
    }
};

const authenticateUserToken = async (req, res, next) => {
    try {
        req.user = verifyToken(req, "user");
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    authenticateSuperAdminToken,
    authenticateUserToken,
};

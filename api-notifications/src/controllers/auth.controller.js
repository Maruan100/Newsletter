import jwt from "jwt-simple";
import moment from "moment";
import HttpStatus from "http-status-codes";
const secretPass =
  "o7DwtwfO2wHVrmyA48tpjWKsT4PfsvH0qHSKUfhxvMXHPFDsjH5vXlPvKwPNDwlIzQwBzStDXUsPb5FF";

function ensureAuth(req, res, next) {
  if (!req.headers["x-auth-token"]) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: "Unauthorized",
    });
  }

  const token = req.headers["x-auth-token"].replace(/['"]+/g, "");

  try {
    const payload = jwt.decode(token, secretPass);
    if (payload.exp <= moment().unix()) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Expired token" });
    }
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Invalid Token" });
  }

  next();
}

export default {
  ensureAuth,
};

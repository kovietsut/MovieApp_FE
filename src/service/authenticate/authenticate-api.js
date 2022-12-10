import jwtDecode from "jwt-decode";

const assertAlive = (decoded) => {
  const now = Date.now().valueOf() / 1000;
  if (typeof decoded.exp !== "undefined" && decoded.exp < now) {
    throw new Error(`token expired: ${JSON.stringify(decoded)}`);
  }
  if (typeof decoded.nbf !== "undefined" && decoded.nbf > now) {
    throw new Error(`token not yet valid: ${JSON.stringify(decoded)}`);
  }
};

export const isAuthenticate = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      assertAlive(jwtDecode(token));
    } catch (error) {
      console.error(error);
      return false;
    }
    return localStorage.getItem("token") !== null;
  }
};

import decode from 'jwt-decode';

export default class AuthService {
  static loggedIn = () => {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  };

  static isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  };

  static setToken = idToken => {
    localStorage.setItem('id_token', JSON.stringify(idToken));
  };

  static getToken = () => localStorage.getItem('id_token');

  static logout = () => localStorage.removeItem('id_token');

  static getProfile = async () => decode(this.getToken());

  static getUserRoles = () => {
    const { auth } = this.getProfile();
    return auth;
  };

  static isAdmin = () => {
    if (this.loggedIn()) {
      const auth = this.getUserRoles();
      let authorities = [];
      auth.forEach(({ authority }) => {
        authorities = [...authorities, authority];
      });
      for (const authority of authorities) {
        if (authority === 'ROLE_ADMIN') {
          return true;
        }
      }
      return false;
    }
  };
}

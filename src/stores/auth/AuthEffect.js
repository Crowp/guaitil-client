import AuthService from '../../services/AuthService';

import { createAuthLoginRequest } from './requests/AuthLoginRequest';
import { createAuthRequestReport } from './requests/AuthRequestReport';

export default class AuthEffect {
  static requestVerifyLogin = async authenticated => {
    if (AuthService.loggedIn()) {
      if (!authenticated) {
        const user = AuthService.getProfile().user_data;
        const roles = AuthService.getProfile().auth.map(({ authority }) => authority);
        return { authenticated: true, ...user, roles };
      }
    } else {
      return { authenticated: false };
    }
  };

  static requestLogin = async (email, password) => {
    return await createAuthLoginRequest(email, password).getResponse();
  };
  static requestAuthsReportPdf = async () => {
    return await createAuthRequestReport('pdf-report', 'pdf').getResponse();
  };
  static requestAuthsReportExcel = async () => {
    return await createAuthRequestReport('xlsx-report', 'xlsx').getResponse();
  };
}

class RoleEnum {
  static Admin = 'ROLE_ADMIN';
  static SuperAdmin = 'ROLE_SUPER_ADMIN';
  static Associated = 'ROLE_ASSOCIATED';

  static AllAdmins = [RoleEnum.Admin, RoleEnum.SuperAdmin];
}

export default RoleEnum;

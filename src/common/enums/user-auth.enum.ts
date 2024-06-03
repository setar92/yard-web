enum UserAuthPaths {
  SEND_SMS = 'api/auth/otp/send',
  VERIFY_SMS = 'api/auth/otp/check',
  GET_USER_INFO = 'api/my/profile',
  GET_LOCKERS_FROM = 'api/market/lockers-from',
  CREATE_PARCEL = 'api/market/parcels',
}

enum AccountType {
  Private = 'client',
  Business = 'business',
}

enum FormType {
  Private = 'person',
  Business = 'business',
  Null = 'null',
}
export { UserAuthPaths, AccountType, FormType };

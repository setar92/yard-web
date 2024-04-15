enum UserAuthPaths {
  SEND_SMS = 'api/auth/otp/send',
  VERIFY_SMS = 'api/auth/otp/check',
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

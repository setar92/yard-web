import { AccountType, FormType } from '../enums/user-auth.enum';

interface SendCodeResponse {
  message: string;
}

interface VerifyCodeResponse {
  message: string;
  data: {
    token_type: string;
    access_token: string;
    form: FormType;
    type: AccountType;
  };
}

interface SendSmsQuery {
  phone: string;
  type: AccountType;
}

interface VerifyCodeQuery {
  phone: string;
  type: AccountType;
  code: string;
}

export type {
  SendCodeResponse,
  SendSmsQuery,
  AccountType,
  VerifyCodeResponse,
  VerifyCodeQuery,
};

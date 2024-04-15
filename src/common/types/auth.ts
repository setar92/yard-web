import { AccountType, FormType } from '../enums/user-auth.enum';

interface AuthResponse {
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

export type { AuthResponse, SendSmsQuery, AccountType };

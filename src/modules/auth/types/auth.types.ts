export interface LoginRequestDTO {
  email: string;
  password: string;
  role: string;
}

export interface LoginResponseDTO {
  access_token: string;
  user_data: {
    uuid: string;
    email_address: string;
    account_role: string;
  };
}

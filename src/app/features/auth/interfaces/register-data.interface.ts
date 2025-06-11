import { LoginCredentials } from './login-credentials.interface';

export interface RegisterData extends LoginCredentials {
  username: string;
}

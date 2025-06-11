import { IUser } from '@shared/interfaces';

export interface AuthResponse {
  accessToken: string;
  user: IUser;
}

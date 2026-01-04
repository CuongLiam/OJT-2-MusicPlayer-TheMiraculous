
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_image?: string | null;
  bio?: string | null;
  status: UserStatus;
  roles: RoleName[];
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export enum RoleName {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_ARTIST = 'ROLE_ARTIST',
  ROLE_USER = 'ROLE_USER'
}

export enum UserStatus {
  VERIFY = 'VERIFY',
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED'
}
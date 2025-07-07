export interface JwtPayload {
  sub: string;
  email: string;
  [key: string]: any;
}

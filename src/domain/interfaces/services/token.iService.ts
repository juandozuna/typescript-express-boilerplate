/*
  * `TokenObject` defines the standard structure of the token payload.
 */
export interface TokenObject {
  /*
    * Issuer of the JWT token
   */
  iss?: string;
  
  /*
    * Subject of the JWT token (usually the user id)
   */
  sub: string;
  
  /*
    * Recipient for which the JWT token is intended
   */
  aud?: string;
  
  /*
    * Time before which the JWT token must not be accepted for processing
   */
  nbf?: number;
}


export interface ITokenService {
  /*
    * Sign a token with the given payload and expiration time
   */
  signToken(payload: TokenObject, expiresIn: number, isRefresh?: boolean): Promise<string>;
  
  /*
    * Verify a token and return the payload
   */
  verifyToken(token: string, isRefresh?: boolean): Promise<TokenObject>;
}
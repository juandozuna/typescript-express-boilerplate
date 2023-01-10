import {injectable} from "inversify";
import jwt from "jsonwebtoken";
import {ITokenService, TokenObject} from "../../domain/interfaces/services/token.iService";
import CONFIG from "../../config/CONFIG";

@injectable()
export class TokenService implements ITokenService {
  async signToken(payload: TokenObject, expiresIn: number, isRefresh = false): Promise<string> {
    const privateKey = Buffer
      .from(isRefresh ? CONFIG.refreshTokenPrivateKey : CONFIG.accessTokenPrivateKey, 'base64')
      .toString('ascii');
    
    const token = await jwt.sign(
      payload,
      "secret",
      {
        expiresIn,
      }
    );
    
    return token;
  }
  
  verifyToken(token: string, isRefresh = false): Promise<TokenObject> {
    const publicKey = Buffer
      .from(isRefresh ? CONFIG.refreshTokenPublicKey : CONFIG.accessTokenPublicKey, 'base64')
      .toString('ascii');
    
    return new Promise((resolve, reject) => {
      jwt.verify(token, "secret", (error, decoded) => {
        if (error) {
          reject(error);
        }
        resolve(decoded as TokenObject);
      });
    });
  }
}
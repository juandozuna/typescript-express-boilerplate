import {IPasswordHasherService} from "../../domain/interfaces/services/passwordHasher.iService";
import {injectable} from "inversify";
import * as argon from "argon2";

@injectable()
export class PasswordHasherService implements IPasswordHasherService {
  
  hash(password: string): Promise<string> {
    return argon.hash(password);
  }
  
  compare(storedPassword: string, password: string): Promise<boolean> {
    return argon.verify(storedPassword, password);
  }
}
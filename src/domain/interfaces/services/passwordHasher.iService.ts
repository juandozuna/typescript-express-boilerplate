export interface IPasswordHasherService {
  /*
    * Hashes a password
   */
  hash(password: string): Promise<string>;
  
  /*
    * Verifies if a password is valid
   */
  compare(storedPassword: string, password: string): Promise<boolean>;
}
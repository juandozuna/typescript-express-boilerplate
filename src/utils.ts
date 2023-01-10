export class Logger {
  public static log(message: any, ...optionalParams: any[]): void {
    if (process.env.LOG_ACTIVE) {
      // eslint-disable-next-line no-console
      console.log(message, ...optionalParams);
    }
  }
  
  public static error(message: any, ...optionalParams: any[]): void {
    if (process.env.LOG_ACTIVE) {
      // eslint-disable-next-line no-console
      console.error(message, ...optionalParams);
    }
  }
}
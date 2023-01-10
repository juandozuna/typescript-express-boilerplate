import 'reflect-metadata';
import {injectable} from "inversify";
import {Route, Tags} from "tsoa";

@injectable()
@Route('base')
@Tags('Base')
export abstract class BaseController {
}
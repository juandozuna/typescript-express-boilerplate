import 'reflect-metadata';

export interface UseCase<Params, Response> {
  execute(params: Params): Response;
}

export type UseCaseAsync<Params, Response> = UseCase<Params, Promise<Response>>


export interface NoParams {
}

export interface NoData {
}
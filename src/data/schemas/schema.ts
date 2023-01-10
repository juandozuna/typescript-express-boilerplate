import {Model, Types} from "mongoose";
import {injectable} from "inversify";

export interface IEntityBase {
  _id: Types.ObjectId;
}

@injectable()
export default abstract class SchemaBuilder<TEntity, TModel> {
  
  abstract buildMongoModel(): Model<TEntity>;
  
  //TODO: enhance this mapper method
  mapToModel(entity: TEntity): TModel {
    let id: string;
    if (Object.prototype.hasOwnProperty.call(entity, "_id")) {
      const entityId = (entity as IEntityBase)._id;
      id = entityId.toString();
    }
    
    if (id) {
      delete entity["_id"];
    }
    
    return {
      ...entity,
      id: id,
    } as TModel;
  }
  
  mapToEntity(model: TModel): TEntity {
    const propsToSkip = [];
    const obj: any = {};
    
    if (Object.prototype.hasOwnProperty.call(model, "id")) {
      propsToSkip.push("id");
      obj._id = new Types.ObjectId(model["id"]);
      delete model["id"];
    }
    
    for (const key in model) {
      if (propsToSkip.includes(key)) {
        continue;
      }
      obj[key] = model[key];
    }
    
    return obj as TEntity;
  }
  
  mapEntitiesToModels(entities: TEntity[]): TModel[] {
    return entities.map(entity => this.mapToModel(entity));
  }
  
  mapModelsToEntities(models: TModel[]): TEntity[] {
    return models.map(model => this.mapToEntity(model));
  }
}
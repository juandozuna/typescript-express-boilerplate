import {Model, model, Schema} from "mongoose";
import {TodoModel} from "../../models/todo.model";
import SchemaBuilder, {IEntityBase} from "./schema";
import {injectable} from "inversify";

export interface ITodoEntity extends IEntityBase {
  title: string;
  description: string;
  completed: boolean;
}


const todoSchema = new Schema<ITodoEntity>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

@injectable()
export default class TodoSchemaBuilder extends SchemaBuilder<ITodoEntity, TodoModel> {
  buildMongoModel(): Model<ITodoEntity> {
    return model<ITodoEntity>("Todo", todoSchema);
  }
}

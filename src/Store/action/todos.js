import * as actionType from "./actionType";

export const AddTodos = (value) => {
  console.log(value);
  return { type: actionType.ADD_TODOS, payload: value };
};

export const DeleteTodos = (id) => {
  return { type: actionType.DELETE_TODOS, payload: id };
};

export const UpdateTodos = (value) => {
  console.log(value);
  return { type: actionType.UPDATE_TODOS, payload: value };
};

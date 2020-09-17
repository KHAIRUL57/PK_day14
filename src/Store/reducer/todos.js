import * as actionTypes from "../action/actionType";

const initialState = [];
let countId = 1;

const addTodos = (state, payload) => {
  return [
    ...state,
    {
      id: countId++,
      list: payload.list,
      Activites: payload.Activites,
    },
  ];
};

const deleteTodos = (state, payload) => {
  const updateArray = state.filter((item) => item.id !== payload);
  return [...updateArray];
};

const updateTodos = (state, payload) => {
  const obj = {
    id: payload.id,
    list: payload.value.list,
    Activites: payload.value.Activites,
  };
  const index = state.findIndex((item) => {
    return item.id === obj.id;
  });
  let newArr = [...state];
  newArr[index] = obj;
  return newArr;
};

const todos = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case actionTypes.ADD_TODOS:
      return addTodos(state, payload);
    case actionTypes.DELETE_TODOS:
      return deleteTodos(state, payload);
    case actionTypes.UPDATE_TODOS:
      return updateTodos(state, payload);
    default:
      return state;
  }
};

export default todos;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { AddTodos, DeleteTodos, UpdateTodos } from "../../Store/action/todos";
import Table from "../TABEL/Tabel";

const Form = (props) => {
  const { todos, addTodos, deleteTodos, updateTodos } = props;
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  useEffect(() => {
    setData(todos);
  }, [todos, id]);

  const { handleSubmit, register, errors, setValue } = useForm();
  const onSubmit = (value, e) => {
    if (id !== null) {
      const obj = {
        id,
        value,
      };
      updateTodos(obj);
      setId(null);
    } else {
      addTodos(value);
    }
    e.target.reset();
  };

  const onRemove = (id) => {
    deleteTodos(id);
  };

  const onUpdate = (id) => {
    setId(id);
    const findItem = data.find((item) => item.id === id);
    if (findItem) {
      setValue("list", findItem.list, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Activites", findItem.Activites, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <div className="container">
      <div className="form-group">
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="list">Day:</label>
          <input
            type="text"
            name="list"
            className="form-control"
            placeholder="Day"
            ref={register({
              required: "Required",
            })}
          />
          {errors.list && errors.list.message}
          <br />
          <label htmlFor="Activites">Activites:</label>
          <input
            type="text"
            name="Activites"
            className="form-control"
            placeholder="Activites"
            ref={register({
              required: "Required",
            })}
          />
          {errors.list && errors.list.message}
          <br />
          <button type="submit" className="btn btn-success">
            {id ? "update" : "Create"}
          </button>
        </form>
      </div>
      <br />
      <Table todo={data} key={data.id} remove={onRemove} update={onUpdate} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodos: (value) => dispatch(AddTodos(value)),
    deleteTodos: (id) => dispatch(DeleteTodos(id)),
    updateTodos: (value) => dispatch(UpdateTodos(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);

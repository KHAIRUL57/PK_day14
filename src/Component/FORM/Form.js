import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../node_modules/axios/dist/axios.js";
import Table from "../TABEL/Tabel";

const Form = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState({});

  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:3000/todo")
        .then((respone) => {
          console.log(respone.data);
          setData(respone.data);
        })
        .catch((errors) => {
          // console.log(errors)
        });
    };
    getData();
  }, []);

  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values, e) => {
    axios
      .post("http://localhost:3000/todo", values)
      .then((respone) => {
        // console.log('data masuk', respone.data)
        setData([...data, respone.data]);
      })
      .catch((errors) => {
        // console.log('post error')
      });
    e.target.reset();
  };

  const onRemove = (id) => {
    axios
      .delete(`http://localhost:3000/todo/${id}`)
      .then((respone) => {
        const newData = data.filter((item) => {
          if (item.id === id) return false;
          return true;
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdate = (id) => {
    const newDay = prompt("create new day");
    const newActivites = prompt("create activites");

    // setUpdate(Data)
    axios
      .put(`http://localhost:3000/todo/${id}`, { newDay, newActivites })
      .then((respone) => {
        console.log("berhasil update");
      })
      .catch((error) => {
        console.log(error);
      });
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
          <label htmlFor="list">Activites:</label>
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
            Submit
          </button>
        </form>
      </div>
      <br />
      <Table todo={data} key={data.id} remove={onRemove} update={onUpdate} />
    </div>
  );
};

export default Form;

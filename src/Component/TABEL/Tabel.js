import React from "react";

const Table = (props) => {
  const { todo, remove, update } = props;
  const mapData = todo.map((data, index) => {
    return (
      <tr key={data.id}>
        <th scope="row">{index + 1}</th>
        <td>{data.list}</td>
        <td>{data.Activites}</td>
        <td>
          <button className="btn btn-danger" onClick={() => remove(data.id)}>
            Delete
          </button>{" "}
          &nbsp;
          <button className="btn btn-secondary" onClick={() => update(data.id)}>
            Edit
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Day</th>
            <th scope="col">Avtivites</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{mapData}</tbody>
      </table>
    </div>
  );
};

export default Table;

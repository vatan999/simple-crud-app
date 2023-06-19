import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [dataItem, setDataItem] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(
      "https://643e2505c72fda4a0beeac81.mockapi.io/crud-react"
    );
    setDataItem(data);
  };

  const setToLocalStorage = async (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  }

  const deleteItem = (id) => {
    axios
      .delete(`https://643e2505c72fda4a0beeac81.mockapi.io/crud-react/${id}`)
      .then(() => {
        getData();
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(dataItem);

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        {dataItem.map((Item) => (
          <tbody key={Item.id}>
            <tr>
              <th scope="row">{Item.id}</th>
              <td>{Item.name}</td>
              <td>{Item.email}</td>
              <td>
                <Link to={"/update"}>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      setToLocalStorage(Item.id, Item.name, Item.email)
                    }
                  >
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteItem(Item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Read;

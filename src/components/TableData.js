import React, { useEffect, useState } from "react";
import { withRouter } from "./Wrapper";
import { userEdit } from "../redux/Action";
import { connect, useDispatch } from "react-redux";
import { Table } from "antd";
import axios from "axios";

function TableData({ navigate, tableData }) {
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
    // const tableData = useSelector((state) => state?.data || []);

  useEffect(() => {
    setUserData(tableData);
    console.log("calling effect");
  },[tableData]);

  const handleDelete = (i) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (confirmDelete) {
      // dispatch(userDelete(i))
      handleDeleteApi()
      // userDetailsDelete(i);
    }
  };

  const handleEdit = (i) => {
    dispatch(userEdit(i));
    // userDetailsEdit(i);
    navigate(`/edit/${i}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstName",
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Interests",
      dataIndex: "interests",
      render: (interests) => interests.join(" , "),
    },
    {
      title: "Edit",
      render: (item, data, i) => {
        return (
          <button
            type="button"
            className="btn btn-sm btn-success mr-3"
            onClick={() => handleEdit(i)}
          >
            <i className="fas fa-edit mr-1"></i> Edit
          </button>
        );
      },
    },
    {
      title: "Delete",
      render: (item, data, i) => {
        return (
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(i)}
          >
            <i className="fas fa-trash mr-1"></i>Delete
          </button>
        );
      },
    },
  ];
  const handleDeleteApi = () => {
    axios
      .delete("https://dummyjson.com/products/1")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <h3 className="alert alert-primary text-center mt-4">Submitted Data</h3>
      <Table
        className="table-responsive"
        dataSource={userData}
        columns={columns}
      />
      <button
        type="button"
        className="btn btn-sm btn-success mt-3"
        onClick={handleBack}
      >
        <i className="fas fa-arrow-circle-left mr-2"></i>Back
      </button>
    </div>
  );
}

// const mapDispatchToprops = (dispatch) => {
//     return {
//         userDetailsDelete: (data) => dispatch(userDelete(data)),
//         userDetailsEdit: (data) => dispatch(userEdit(data)),
//     };
// };

const mapStateToprops = (state) => {
  return {
    tableData: state?.data || [],
  };
};

// export default withRouter(TableData);
export default withRouter(connect(mapStateToprops, null)(TableData));

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Custodian = () => {

  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const handleDelete = async (id) => {

  const confirmDelete = window.confirm("Are you sure you want to delete this custodian?");

  if (!confirmDelete) return;

  try {

    await axios.delete(`http://localhost:5000/custodians/${id}`);

    alert("Custodian deleted successfully ");

    fetchCustodians(); // refresh table

  } catch (error) {

    console.error(error);
    alert("Delete failed ❌");

  }

};

  const fetchCustodians = async () => {

    try {

      const res = await axios.get("http://localhost:5000/custodians");

      const formatted = res.data.map((item, index) => ({
        id: item.id,
        custodianId: item.custodian_id,
        department: item.department,
        custodianName: item.custodian_name,
        designation: item.designation,
        authority: item.reporting_authority,
        email: item.email,
        username: item.username,
        status: "Active",
        createdDate: new Date(item.created_date).toLocaleDateString(),
      }));

      setRows(formatted);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {
    fetchCustodians();
  }, []);

  const columns = [
    { field: "custodianId", headerName: "Custodian ID", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "custodianName", headerName: "Custodian Name", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "authority", headerName: "Reporting Authority", flex: 1 },
    { field: "email", headerName: "Email ID", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "createdDate", headerName: "Created Date", flex: 1 },

    {
  field: "actions",
  headerName: "Actions",
  width: 120,
  renderCell: (params) => (
    <>
      <IconButton
        color="primary"
        onClick={() =>
          navigate(`/custodian/edit/${params.row.id}`, {
            state: params.row
          })
        }
      >
        <EditIcon />
      </IconButton>

      <IconButton
  color="error"
  onClick={() => handleDelete(params.row.id)}
>
  <DeleteIcon />
</IconButton>
    </>
  ),
}
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">

        <Typography variant="h5">
          Custodian Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => navigate("/custodian/add")}
        >
          Add Custodian
        </Button>

      </div>

      <Card>

        <CardContent>

          <div style={{ height: 500 }}>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
            />

          </div>

        </CardContent>

      </Card>

    </div>
  );
};

export default Custodian;
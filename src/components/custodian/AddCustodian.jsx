import React, { useState } from "react";

import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const departments = [
  "Information Technology",
  "Finance",
  "HR",
  "Administration",
];

const authorities = ["Manager", "DGM", "Director"];

const initialFormState = {
  custodianId: "",
  department: "",
  designation: "",
  userName: "",
  password: "",
  custodianName: "",
  reportingAuthority: "",
  email: "",
  phone: "",
  confirmPassword: "",
};

export default function AddCustodian() {

  const [formData, setFormData] = useState(initialFormState);
  const [rows, setRows] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {

    const newRow = {
      id: rows.length + 1,
      custodianId: formData.custodianId,
      department: formData.department,
      custodianName: formData.custodianName,
      designation: formData.designation,
      authority: formData.reportingAuthority,
      email: formData.email,
      username: formData.userName,
      status: "Active",
      createdDate: new Date().toLocaleDateString(),
    };

    setRows([...rows, newRow]);

    // Clear form
    setFormData(initialFormState);
  };

  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEdit = (row) => {

    setFormData({
      custodianId: row.custodianId,
      department: row.department,
      designation: row.designation,
      userName: row.username,
      custodianName: row.custodianName,
      reportingAuthority: row.authority,
      email: row.email,
      phone: "",
      password: "",
      confirmPassword: "",
    });

    setRows(rows.filter((r) => r.id !== row.id));
  };

  const columns = [
    { field: "custodianId", headerName: "Custodian ID", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "custodianName", headerName: "Custodian Name", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "authority", headerName: "Reporting Authority", flex: 1 },
    { field: "email", headerName: "Email ID", flex: 1 },
    { field: "username", headerName: "USERNAME", flex: 1 },
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
            onClick={() => handleEdit(params.row)}
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
    },
  ];

  return (
    <div className="p-15 bg-gray-100 min-h-screen">

      <Typography variant="h5" className="font-bold mb-6">
        Add Custodian
      </Typography>

      <Card className="shadow-lg mb-8">
        <CardContent>

          <div className="grid grid-cols-2 gap-x-16 gap-y-6">

            <TextField
              label="Custodian ID"
              name="custodianId"
              size="small"
              value={formData.custodianId}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Custodian Name"
              name="custodianName"
              size="small"
              value={formData.custodianName}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              select
              label="Department"
              name="department"
              size="small"
              value={formData.department}
              onChange={handleChange}
              fullWidth
            >
              {departments.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Reporting Authority"
              name="reportingAuthority"
              size="small"
              value={formData.reportingAuthority}
              onChange={handleChange}
              fullWidth
            >
              {authorities.map((a) => (
                <MenuItem key={a} value={a}>
                  {a}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Designation"
              name="designation"
              size="small"
              value={formData.designation}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              size="small"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Username"
              name="userName"
              size="small"
              value={formData.userName}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Phone"
              name="phone"
              size="small"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              size="small"
              value={formData.password}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              size="small"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
            />

          </div>

          <div className="mt-6">
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={handleAdd}
              sx={{
                backgroundColor: "#f97316",
                "&:hover": { backgroundColor: "#ea580c" },
              }}
            >
              ADD
            </Button>
          </div>

        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardContent>

          <Typography variant="h6" className="mb-4">
            Custodian List
          </Typography>

          <div style={{ height: 400 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
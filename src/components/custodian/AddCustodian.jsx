import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Typography
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleAdd = async () => {

  try {

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

   await axios.post("http://localhost:5000/custodians", {
  custodianId: formData.custodianId,
  custodianName: formData.custodianName,
  department: formData.department,
  designation: formData.designation,
  authority: formData.reportingAuthority,   // ✅ FIXED
  email: formData.email,
  userName: formData.userName,
  phone: formData.phone,
  password: formData.password
});

    alert("Custodian Added Successfully");

    setFormData(initialFormState);

    navigate("/custodian/view");

  } catch (error) {

    console.error(error);

  }

};

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <Typography variant="h5" className="font-bold mb-6">
        Add Custodian
      </Typography>

      <Card className="shadow-lg max-w-5xl">
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
  value={formData.reporting_authority}   // ✅ FIXED
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
              Add 
            </Button>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
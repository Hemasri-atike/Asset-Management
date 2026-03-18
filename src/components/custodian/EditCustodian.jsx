import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditCustodian = () => {

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(location.state);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {

    try {

      await axios.put(
        `http://localhost:5000/custodians/${id}`,
        formData
      );

      alert("Custodian updated successfully ✅");

      navigate("/custodian/view");

    } catch (error) {

      console.error(error);
      alert("Update failed ❌");

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* Top Header */}

      <div className="flex items-center gap-3 mb-6">

        <IconButton
          onClick={() => navigate("/custodian/view")}
          className="bg-white shadow"
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" className="font-semibold">
          Edit Custodian
        </Typography>

      </div>


      <Card className="max-w-5xl mx-auto shadow-xl rounded-2xl">

        <CardContent className="p-8">

          <Typography
            variant="h6"
            className="mb-6 font-medium text-gray-700"
          >
            Custodian Details
          </Typography>


          <Grid container spacing={3}>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Custodian ID"
                name="custodianId"
                value={formData.custodianId}
                fullWidth
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Custodian Name"
                name="custodianName"
                value={formData.custodianName}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Reporting Authority"
                name="reportingAuthority"
                value={formData.reportingAuthority}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Created Date"
                name="createdDate"
                value={formData.createdDate}
                fullWidth
                disabled
              />
            </Grid>

          </Grid>


          <div className="flex justify-end mt-8 gap-4">

            <Button
              variant="outlined"
              onClick={() => navigate("/custodian/view")}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleUpdate}
              className="px-8"
            >
              Update Custodian
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>

  );
};

export default EditCustodian;
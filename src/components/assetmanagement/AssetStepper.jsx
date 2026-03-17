import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

const steps = [
  "Asset Information",
  "Ownership Details",
  "Purchase Details",
  "Technical Details",
];

const assetClasses = ["IT Equipment", "Furniture", "Vehicle", "Machinery"];
const departments = ["IT", "HR", "Finance", "Operations"];
const vendors = ["Dell", "HP", "Lenovo", "Apple"];
const blocks = ["A", "B", "C", "D"];

const AssetStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    assetId: "",
    assetNumber: "",
    subAssetNumber: "",
    assetClass: "",
    assetDescription: "",
    department: "",
    intenderName: "",
    custodianName: "",
    locationId: "",
    block: "",
    model: "",
    grNumber: "",
    costCenter: "",
    materialNumber: "",
    poNumber: "",
    wbsNumber: "",
    assetVendor: "",
    serialNumber: "",
    macId: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log(formData);
    alert("Asset Submitted Successfully");
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box className="grid md:grid-cols-2 gap-5">
            <TextField label="Asset ID" name="assetId" fullWidth onChange={handleChange} />
            <TextField label="Asset Number" name="assetNumber" fullWidth onChange={handleChange} />
            <TextField label="Sub Asset Number" name="subAssetNumber" fullWidth onChange={handleChange} />

            <TextField
              select
              label="Asset Class"
              name="assetClass"
              fullWidth
              onChange={handleChange}
            >
              {assetClasses.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField label="Asset Description" name="assetDescription" fullWidth onChange={handleChange} />

            <TextField
              select
              label="Department"
              name="department"
              fullWidth
              onChange={handleChange}
            >
              {departments.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        );

      case 1:
        return (
          <Box className="grid md:grid-cols-2 gap-5">
            <TextField label="Intender Name" name="intenderName" fullWidth onChange={handleChange} />
            <TextField label="Custodian Name" name="custodianName" fullWidth onChange={handleChange} />
            <TextField label="Location ID" name="locationId" fullWidth onChange={handleChange} />

            <TextField
              select
              label="Block"
              name="block"
              fullWidth
              onChange={handleChange}
            >
              {blocks.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField label="Model" name="model" fullWidth onChange={handleChange} />
          </Box>
        );

      case 2:
        return (
          <Box className="grid md:grid-cols-2 gap-5">
            <TextField label="GR Number" name="grNumber" fullWidth onChange={handleChange} />
            <TextField label="Cost Center" name="costCenter" fullWidth onChange={handleChange} />
            <TextField label="Material Number" name="materialNumber" fullWidth onChange={handleChange} />
            <TextField label="PO Number" name="poNumber" fullWidth onChange={handleChange} />
            <TextField label="WBS Number" name="wbsNumber" fullWidth onChange={handleChange} />

            <TextField
              select
              label="Vendor"
              name="assetVendor"
              fullWidth
              onChange={handleChange}
            >
              {vendors.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        );

      case 3:
        return (
          <Box className="grid md:grid-cols-2 gap-5">
            <TextField label="Serial Number" name="serialNumber" fullWidth onChange={handleChange} />
            <TextField label="MAC ID" name="macId" fullWidth onChange={handleChange} />

            <TextField
              label="Remarks"
              name="remarks"
              multiline
              rows={3}
              fullWidth
              onChange={handleChange}
              className="md:col-span-2"
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box className="p-6 bg-white rounded-2xl shadow-lg">

      <Typography variant="h5" className="mb-6 font-semibold">
        Asset Registration
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel className="mb-8">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent()}

      <Box className="flex justify-between mt-8">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AssetStepper;
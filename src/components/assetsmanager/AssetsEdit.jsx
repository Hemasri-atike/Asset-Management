import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@mui/material";

const AssetsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    assetId: "",
    assetNumber: "",
    subAssetNumber: "",
    assetClass: "",
    intenderName: "",
    assetDescription: "",
    custodianName: "",
    serialNumber: "",
    macId: "",
    locationId: "",
    block: "",
    model: "",
    grNumber: "",
    yearOfPurchase: "",
    capitalizationDate: "",
    expiryDate: "",
    costCenter: "",
    materialNumber: "",
    acceptDate: "",
    poNumber: "",
    wbsNumber: "",
    installationDate: "",
    assetVendor: "",
    department: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});

  const steps = [
    "Basic Details",
    "Location & Assignment",
    "Financial Details",
    "Technical Details",
  ];

  const assetClasses = ["IT Equipment", "Furniture", "Vehicle", "Machinery"];
  const departments = ["IT", "HR", "Finance", "Operations"];
  const vendors = ["Dell", "HP", "Lenovo", "Apple"];
  const blocks = ["A", "B", "C", "D"];

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/assets/${id}`);
        const data = await res.json();

        const parsedData = {
          ...data,
          yearOfPurchase: data.yearOfPurchase ? new Date(data.yearOfPurchase) : null,
          capitalizationDate: data.capitalizationDate ? new Date(data.capitalizationDate) : null,
          expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
          acceptDate: data.acceptDate ? new Date(data.acceptDate) : null,
          installationDate: data.installationDate ? new Date(data.installationDate) : null,
        };

        setFormData(parsedData);
      } catch {
        alert("Failed to fetch asset data");
      }
    };

    fetchAsset();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.assetId) newErrors.assetId = "Required";
      if (!formData.assetNumber) newErrors.assetNumber = "Required";
      if (!formData.assetClass) newErrors.assetClass = "Required";
      if (!formData.assetDescription) newErrors.assetDescription = "Required";
      if (!formData.department) newErrors.department = "Required";
    }

    if (step === 2) {
      if (!formData.intenderName) newErrors.intenderName = "Required";
      if (!formData.custodianName) newErrors.custodianName = "Required";
      if (!formData.locationId) newErrors.locationId = "Required";
      if (!formData.block) newErrors.block = "Required";
    }

    if (step === 3) {
      if (!formData.yearOfPurchase) newErrors.yearOfPurchase = "Required";
      if (!formData.assetVendor) newErrors.assetVendor = "Required";

      if (
        formData.capitalizationDate &&
        formData.expiryDate &&
        new Date(formData.expiryDate) < new Date(formData.capitalizationDate)
      ) {
        newErrors.expiryDate = "Expiry must be after Capitalization";
      }
    }

    if (step === 4) {
      if (!formData.serialNumber) newErrors.serialNumber = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const formatDateForBackend = (date) =>
    date ? date.toISOString().split("T")[0] : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const cleanedData = {
      ...formData,
      yearOfPurchase: formatDateForBackend(formData.yearOfPurchase),
      capitalizationDate: formatDateForBackend(formData.capitalizationDate),
      expiryDate: formatDateForBackend(formData.expiryDate),
      acceptDate: formatDateForBackend(formData.acceptDate),
      installationDate: formatDateForBackend(formData.installationDate),
    };

    try {
      const res = await fetch(`http://localhost:5000/api/assets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      if (!res.ok) throw new Error();

      alert("Asset Updated Successfully");
      navigate("/assets");
    } catch {
      alert("Error updating asset");
    }
  };

 const Input = ({ label, name }) => (
  <div>
    <label className="block font-medium mb-1 text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={formData[name] || ""}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
    />
    {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
  </div>
);

  const Select = ({ label, name, options }) => (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <select
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </div>
  );

  const DateField = ({ label, name }) => (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <DatePicker
        selected={formData[name]}
        onChange={(date) => setFormData({ ...formData, [name]: date })}
        dateFormat="dd/MM/yyyy"
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
        placeholderText={`Select ${label}`}
      />
      {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
    </div>
  );

  
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex justify-center items-center p-6">
    
    <div className="w-full max-w-6xl backdrop-blur-xl bg-white/80 shadow-2xl rounded-3xl p-10 border border-white/40">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Edit Asset
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Update asset information step by step
        </p>
      </div>

      {/* Modern Stepper */}
      <Box sx={{ width: "100%", mb: 6 }}>
        <Stepper
          activeStep={step - 1}
          alternativeLabel
          sx={{
            "& .MuiStepLabel-label": {
              fontWeight: 600,
            },
            "& .Mui-active .MuiStepLabel-label": {
              color: "#2563eb",
            },
            "& .Mui-completed .MuiStepLabel-label": {
              color: "#16a34a",
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

        {/* ===== STEP 1 ===== */}
        {step === 1 && (
          <>
            <Input label="Asset ID" name="assetId" />
            <Input label="Asset Number" name="assetNumber" />
            <Input label="Sub Asset Number" name="subAssetNumber" />
            <Select label="Asset Class" name="assetClass" options={assetClasses} />
            <Input label="Asset Description" name="assetDescription" />
            <Select label="Department" name="department" options={departments} />
          </>
        )}

        {/* ===== STEP 2 ===== */}
        {step === 2 && (
          <>
            <Input label="Intender Name" name="intenderName" />
            <Input label="Custodian Name" name="custodianName" />
            <Input label="Location ID" name="locationId" />
            <Select label="Block" name="block" options={blocks} />
            <Input label="Model" name="model" />
          </>
        )}

        {/* ===== STEP 3 ===== */}
        {step === 3 && (
          <>
            <Input label="GR Number" name="grNumber" />
            <DateField label="Year of Purchase" name="yearOfPurchase" />
            <DateField label="Capitalization Date" name="capitalizationDate" />
            <DateField label="Expiry Date" name="expiryDate" />
            <Input label="Cost Center" name="costCenter" />
            <Input label="Material Number" name="materialNumber" />
            <Input label="PO Number" name="poNumber" />
            <Input label="WBS Number" name="wbsNumber" />
            <Select label="Asset Vendor" name="assetVendor" options={vendors} />
          </>
        )}

        {/* ===== STEP 4 ===== */}
        {step === 4 && (
          <>
            <Input label="Serial Number" name="serialNumber" />
            <Input label="MAC ID" name="macId" />
            <DateField label="Accept Date" name="acceptDate" />
            <DateField label="Installation Date" name="installationDate" />
            <div className="md:col-span-2">
              <label className="block font-medium mb-1 text-gray-700">
                Remarks
              </label>
              <textarea
                name="remarks"
                value={formData.remarks || ""}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                rows="3"
              />
            </div>
          </>
        )}

        {/* ===== BUTTONS ===== */}
        <div className="md:col-span-2 flex justify-between items-center mt-8">

          {/* Return Home */}
          <button
            type="button"
            onClick={() => navigate("/assets")}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md hover:scale-105 transition"
          >
            Return Home
          </button>

          <div className="flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 rounded-xl bg-gray-400 text-white hover:bg-gray-500 transition"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:scale-105 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:scale-105 transition"
              >
                Update Asset
              </button>
            )}
          </div>

        </div>

      </form>
    </div>
  </div>
);
  
};




export default AssetsEdit;
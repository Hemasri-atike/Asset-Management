import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AssetPreview from "../assetsmanager/AssetPreview"; 
import AssetStepper from "./AssetStepper";  
import Input from "../../layouts/Input";
import Select from "../../layouts/Select";

const AssetForm = () => {
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
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
    remarks: ""
  });

  const [errors, setErrors] = useState({});

  const assetClasses = ["IT Equipment", "Furniture", "Vehicle", "Machinery"];
  const departments = ["IT", "HR", "Finance", "Operations"];
  const vendors = ["Dell", "HP", "Lenovo", "Apple"];
  const blocks = ["A", "B", "C", "D"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.assetId.trim()) newErrors.assetId = "Asset ID is required";
      if (!formData.assetNumber.trim()) newErrors.assetNumber = "Asset Number is required";
      if (!formData.assetClass) newErrors.assetClass = "Select Asset Class";
      if (!formData.assetDescription.trim()) newErrors.assetDescription = "Description required";
      if (!formData.department) newErrors.department = "Select Department";
    }

    if (step === 2) {
      if (!formData.intenderName.trim()) newErrors.intenderName = "Intender Name required";
      if (!formData.custodianName.trim()) newErrors.custodianName = "Custodian Name required";
      if (!formData.locationId.trim()) newErrors.locationId = "Location ID required";
      if (!formData.block) newErrors.block = "Select Block";
    }

    if (step === 3) {
      if (!formData.yearOfPurchase) newErrors.yearOfPurchase = "Select Year";
      if (!formData.capitalizationDate) newErrors.capitalizationDate = "Select Capitalization Date";
      if (!formData.expiryDate) newErrors.expiryDate = "Select Expiry Date";
      if (!formData.assetVendor) newErrors.assetVendor = "Select Vendor";

      if (
        formData.capitalizationDate &&
        formData.expiryDate &&
        new Date(formData.expiryDate) <= new Date(formData.capitalizationDate)
      ) {
        newErrors.expiryDate = "Expiry must be after Capitalization Date";
      }
    }

    if (step === 4) {
      if (!formData.serialNumber.trim()) newErrors.serialNumber = "Serial Number required";
      if (!formData.acceptDate) newErrors.acceptDate = "Select Accept Date";
      if (!formData.installationDate) newErrors.installationDate = "Select Installation Date";

      if (
        formData.acceptDate &&
        formData.installationDate &&
        new Date(formData.installationDate) < new Date(formData.acceptDate)
      ) {
        newErrors.installationDate = "Installation must be after Accept Date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (date) => date ? date.toISOString().split("T")[0] : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const cleanedData = {
      ...formData,
      yearOfPurchase: formatDate(formData.yearOfPurchase),
      capitalizationDate: formatDate(formData.capitalizationDate),
      expiryDate: formatDate(formData.expiryDate),
      acceptDate: formatDate(formData.acceptDate),
      installationDate: formatDate(formData.installationDate)
    };

    await fetch("http://localhost:5000/api/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanedData)
    });

    alert("Asset Added Successfully");
    navigate("/assets");
  };

 

  

  const DateField = ({ label, name }) => (
    <div>
      <label className="block text-sm font-medium mb-1">{label} <span className="text-red-500">*</span></label>
      <DatePicker
        selected={formData[name]}
        onChange={(date) => setFormData({ ...formData, [name]: date })}
        dateFormat="dd/MM/yyyy"
        className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm
          ${errors[name] ? "border-red-500" : "border-gray-300"}`}
        placeholderText={`Select ${label}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
   <div className="bg-white w-full max-w-5xl p-10 rounded-2xl shadow-xl border border-gray-200">

  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    
    <h1 className="text-2xl font-bold text-gray-800">
      Asset Registration
    </h1>

    <button
      onClick={() => navigate("/assets")}
      className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
    >
      Back
    </button>

  </div>

  <AssetStepper step={step} />

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

         {step === 1 && (
  <>
    <Input
      label="Asset ID"
      name="assetId"
      value={formData.assetId}
      onChange={handleChange}
      error={errors.assetId}
    />

    <Input
      label="Asset Number"
      name="assetNumber"
      value={formData.assetNumber}
      onChange={handleChange}
      error={errors.assetNumber}
    />

    <Input
      label="Sub Asset Number"
      name="subAssetNumber"
      value={formData.subAssetNumber}
      onChange={handleChange}
    />

    <Select
      label="Asset Class"
      name="assetClass"
      value={formData.assetClass}
      onChange={handleChange}
      options={assetClasses}
      error={errors.assetClass}
    />

    <Input
      label="Asset Description"
      name="assetDescription"
      value={formData.assetDescription}
      onChange={handleChange}
      error={errors.assetDescription}
    />

    <Select
      label="Department"
      name="department"
      value={formData.department}
      onChange={handleChange}
      options={departments}
      error={errors.department}
    />
  </>
)}

       {step === 2 && (
  <>
    <Input
      label="Intender Name"
      name="intenderName"
      value={formData.intenderName}
      onChange={handleChange}
      error={errors.intenderName}
    />

    <Input
      label="Custodian Name"
      name="custodianName"
      value={formData.custodianName}
      onChange={handleChange}
      error={errors.custodianName}
    />

    <Input
      label="Location ID"
      name="locationId"
      value={formData.locationId}
      onChange={handleChange}
      error={errors.locationId}
    />

    <Select
      label="Block"
      name="block"
      value={formData.block}
      onChange={handleChange}
      options={blocks}
      error={errors.block}
    />

    <Input
      label="Model"
      name="model"
      value={formData.model}
      onChange={handleChange}
    />
  </>
)}

         {step === 3 && (
  <>
    <Input
      label="GR Number"
      name="grNumber"
      value={formData.grNumber}
      onChange={handleChange}
    />

    <DateField
      label="Year of Purchase"
      name="yearOfPurchase"
    />

    <DateField
      label="Capitalization Date"
      name="capitalizationDate"
    />

    <DateField
      label="Expiry Date"
      name="expiryDate"
    />

    <Input
      label="Cost Center"
      name="costCenter"
      value={formData.costCenter}
      onChange={handleChange}
    />

    <Input
      label="Material Number"
      name="materialNumber"
      value={formData.materialNumber}
      onChange={handleChange}
    />

    <Input
      label="PO Number"
      name="poNumber"
      value={formData.poNumber}
      onChange={handleChange}
    />

    <Input
      label="WBS Number"
      name="wbsNumber"
      value={formData.wbsNumber}
      onChange={handleChange}
    />

    <Select
      label="Asset Vendor"
      name="assetVendor"
      value={formData.assetVendor}
      onChange={handleChange}
      options={vendors}
      error={errors.assetVendor}
    />
  </>
)}

         {step === 4 && (
  <>
    <Input
      label="Serial Number"
      name="serialNumber"
      value={formData.serialNumber}
      onChange={handleChange}
      error={errors.serialNumber}
    />

    <Input
      label="MAC ID"
      name="macId"
      value={formData.macId}
      onChange={handleChange}
    />

    <DateField
      label="Accept Date"
      name="acceptDate"
    />

    <DateField
      label="Installation Date"
      name="installationDate"
    />

    <div className="md:col-span-2">
      <label className="block text-sm font-medium mb-1">Remarks</label>

      <textarea
        name="remarks"
        value={formData.remarks}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        rows="3"
      />
    </div>

    {/* Preview Button */}
    <div className="md:col-span-2 flex justify-end mt-4 space-x-2">
      <button
        type="button"
        onClick={() => setPreviewOpen(true)}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Preview
      </button>
    </div>
  </>
)}

          <div className="md:col-span-2 flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => { if(validateStep()) setStep(step + 1); }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>
            )}
          </div>

        </form>
        <AssetPreview
  open={previewOpen}
  handleClose={() => setPreviewOpen(false)}
  formData={formData}
/>
      </div>
    </div>
  );
};

export default AssetForm;
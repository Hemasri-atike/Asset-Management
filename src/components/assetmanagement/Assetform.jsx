import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Stepper, Step, StepLabel, Box } from "@mui/material";


import TextInput from "../../ui/TextInput";
import SelectInput from "../../ui/SelectInput";
import ModernButton from "../../ui/ModernButton";

const Assetform = () => {

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
    yearOfPurchase: null,
    capitalizationDate: null,
    expiryDate: null,
    costCenter: "",
    materialNumber: "",
    acceptDate: null,
    poNumber: "",
    wbsNumber: "",
    installationDate: null,
    assetVendor: "",
    department: "",
    remarks: ""
  });
  

  const assetClasses = ["IT Equipment", "Furniture", "Vehicle", "Machinery"];
  const departments = ["IT", "HR", "Finance", "Operations"];
  const vendors = ["Dell", "HP", "Lenovo", "Apple"];
  const blocks = ["A", "B", "C", "D"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]:value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Asset Added Successfully");
  };
  const steps = [
  "Basic Information",
  "Ownership Details",
  "Purchase Details",
  "Technical Details"
];

const [activeStep, setActiveStep] = useState(0);

const nextStep = () => {
  setActiveStep((prev) => prev + 1);
};

const prevStep = () => {
  setActiveStep((prev) => prev - 1);
};

  return (
 <LocalizationProvider dateAdapter={AdapterDayjs}>
<div className="min-h-screen bg-gray-100 flex justify-center p-8">

<div className="bg-white w-full max-w-6xl p-10 rounded-2xl shadow-lg">

<h1 className="text-2xl font-bold mb-6 text-gray-700">
Asset Registration
</h1>

<Stepper activeStep={activeStep} alternativeLabel className="mb-10">
{steps.map((label) => (
<Step key={label}>
<StepLabel>{label}</StepLabel>
</Step>
))}
</Stepper>

<form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

{/* STEP 1 */}

{activeStep === 0 && (
<>
<TextInput label="Asset ID" name="assetId" value={formData.assetId} onChange={handleChange}/>
<TextInput label="Asset Number" name="assetNumber" value={formData.assetNumber} onChange={handleChange}/>
<TextInput label="Sub Asset Number" name="subAssetNumber" value={formData.subAssetNumber} onChange={handleChange}/>
<SelectInput label="Asset Class" name="assetClass" value={formData.assetClass} onChange={handleChange} options={assetClasses}/>
<TextInput label="Asset Description" name="assetDescription" value={formData.assetDescription} onChange={handleChange}/>
<SelectInput label="Department" name="department" value={formData.department} onChange={handleChange} options={departments}/>
</>
)}

{/* STEP 2 */}

{activeStep === 1 && (
<>
<TextInput label="Intender Name" name="intenderName" value={formData.intenderName} onChange={handleChange}/>
<TextInput label="Custodian Name" name="custodianName" value={formData.custodianName} onChange={handleChange}/>
<TextInput label="Location ID" name="locationId" value={formData.locationId} onChange={handleChange}/>
<SelectInput label="Block" name="block" value={formData.block} onChange={handleChange} options={blocks}/>
<TextInput label="Model" name="model" value={formData.model} onChange={handleChange}/>
</>
)}

{/* STEP 3 */}

{activeStep === 2 && (
<>
<TextInput label="GR Number" name="grNumber" value={formData.grNumber} onChange={handleChange}/>
<TextInput label="Cost Center" name="costCenter" value={formData.costCenter} onChange={handleChange}/>
<TextInput label="Material Number" name="materialNumber" value={formData.materialNumber} onChange={handleChange}/>
<TextInput label="PO Number" name="poNumber" value={formData.poNumber} onChange={handleChange}/>
<TextInput label="WBS Number" name="wbsNumber" value={formData.wbsNumber} onChange={handleChange}/>
<SelectInput label="Asset Vendor" name="assetVendor" value={formData.assetVendor} onChange={handleChange} options={vendors}/>
</>
)}

{/* STEP 4 */}

{activeStep === 3 && (
<>
<TextInput label="Serial Number" name="serialNumber" value={formData.serialNumber} onChange={handleChange}/>
<TextInput label="MAC ID" name="macId" value={formData.macId} onChange={handleChange}/>

<DatePicker
label="Installation Date"
value={formData.installationDate}
onChange={(newValue)=>setFormData({...formData,installationDate:newValue})}
/>

<div className="md:col-span-2">
<textarea
name="remarks"
placeholder="Remarks"
value={formData.remarks}
onChange={handleChange}
className="w-full border p-3 rounded-lg"
/>
</div>
</>
)}

</form>

<Box className="flex justify-between mt-8">

{activeStep !== 0 && (
<ModernButton text="Back" onClick={prevStep} />
)}

{activeStep !== steps.length - 1 ? (
<ModernButton text="Next" onClick={nextStep}/>
) : (
<ModernButton text="Submit Asset" onClick={handleSubmit} color="success"/>
)}

</Box>

</div>
</div>
</LocalizationProvider>
  );
};

export default Assetform;
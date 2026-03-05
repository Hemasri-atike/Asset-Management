import { useState } from "react";
import axios from "axios";

function SendMail() {
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    assetType: "",
    make: "",
    location: "",
    approverName: "",
    toEmail: "",
    ccEmail: "",
    pdf: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "pdf") {
      setFormData({ ...formData, pdf: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.employeeId ||
      !formData.employeeName ||
      !formData.assetType ||
      !formData.make ||
      !formData.location ||
      !formData.approverName ||
      !formData.toEmail
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/mail/send-mail",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data.message);

      setFormData({
        employeeId: "",
        employeeName: "",
        assetType: "",
        make: "",
        location: "",
        approverName: "",
        toEmail: "",
        ccEmail: "",
        pdf: null,
      });
    } catch (err) {
      setError("Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl">

        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Asset Allocation Approval Email
        </h2>

        {error && (
          <div className="bg-red-500 text-white text-center py-2 mb-4 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <InputField
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
          />

          <InputField
            label="Employee Name"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
          />

          <InputField
            label="Asset Type"
            name="assetType"
            value={formData.assetType}
            onChange={handleChange}
          />

          <InputField
            label="Make"
            name="make"
            value={formData.make}
            onChange={handleChange}
          />

          <InputField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          <InputField
            label="Approver Name"
            name="approverName"
            value={formData.approverName}
            onChange={handleChange}
          />

          <InputField
            label="To Email"
            name="toEmail"
            type="email"
            value={formData.toEmail}
            onChange={handleChange}
          />

          <InputField
            label="CC Email (Optional)"
            name="ccEmail"
            type="email"
            value={formData.ccEmail}
            onChange={handleChange}
            required={false}
          />

          {/* PDF Upload */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Upload PDF (Optional)
            </label>
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* Reusable Input Component */
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = true,
}) => (
  <div>
    <label className="block mb-2 font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

export default SendMail;
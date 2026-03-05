import React, { useState, useEffect } from "react";

const allColumns = [
  "assetId",
  "assetNumber",
  "subAssetNumber",
  "assetClass",
  "intenderName",
  "assetDescription",
  "custodianName",
  "serialNumber",
  "macId",
  "locationId",
  "block",
  "model",
  "grNumber",
  "yearOfPurchase",
  "capitalizationDate",
  "expiryDate",
  "costCenter",
  "materialNumber",
  "acceptDate",
  "poNumber",
  "wbsNumber",
  "installationDate",
  "assetVendor",
  "department",
  "remarks",
];

const CustomizeColumns = ({ visibleColumns, setVisibleColumns }) => {
  const [open, setOpen] = useState(false);
  const [tempColumns, setTempColumns] = useState([]);

  // 🔥 Always sync tempColumns when modal opens
  useEffect(() => {
    if (open) {
      setTempColumns(visibleColumns);
    }
  }, [open, visibleColumns]);

  const handleCheckboxChange = (column) => {
    if (tempColumns.includes(column)) {
      setTempColumns(tempColumns.filter((col) => col !== column));
    } else {
      setTempColumns([...tempColumns, column]);
    }
  };

  const handleSave = () => {
    setVisibleColumns(tempColumns);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-purple-600 text-white px-5 py-2 rounded-xl shadow-md hover:bg-purple-700 transition"
      >
        Customize Columns
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[500px] max-h-[80vh] rounded-2xl shadow-2xl p-6 flex flex-col">
            
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Select Columns
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-red-500 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-2">
              {allColumns.map((column) => (
                <label
                  key={column}
                  className="flex items-center space-x-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={tempColumns.includes(column)}
                    onChange={() => handleCheckboxChange(column)}
                  />
                  <span>{column}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default CustomizeColumns;
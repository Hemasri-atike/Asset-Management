import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomizeColumns from "../buttons/CustomizeColumns";
import { allColumns } from "../../constants/column";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


import { Button, Tooltip, IconButton } from "@mui/material";
import { FaFileExcel, FaFilePdf, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
const defaultColumns = [
  "assetId",
  "assetNumber",
  "assetClass",
  "assetDescription",
  "custodianName",
  "locationId",
  "department",
   "materialNumber",
  "poNumber",
  "wbsNumber",
  "assetVendor",
  "department",
  "remarks",
];


const Assets = () => {
  const navigate = useNavigate();
    const [visibleColumns, setVisibleColumns] = useState(defaultColumns);
  const [assets, setAssets] = useState([]);

  const formatDateForUI = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "-";

  useEffect(() => {
    fetchAssets();
  }, []);

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchAssets = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/assets");
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const handleExportPDF = () => {
    if (!assets.length) return;

    const doc = new jsPDF("landscape");
    const headers = visibleColumns.map((col) =>
      col.replace(/([A-Z])/g, " $1").toUpperCase()
    );
    const rows = assets.map((asset) =>
      visibleColumns.map((col) => asset[col] || "-")
    );

    autoTable(doc, {
      head: [headers],
      body: rows,
      styles: { fontSize: 6 },
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    });

    doc.save(`Assets_${getFormattedDate()}.pdf`);
  };

  const handleExportExcel = () => {
    if (!assets.length) return;

    const filteredData = assets.map((asset) => {
      const row = {};
      visibleColumns.forEach((col) => (row[col] = asset[col]));
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Assets");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, `Assets_${getFormattedDate()}.xlsx`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/assets/${id}`, {
        method: "DELETE",
      });
      if (response.ok) fetchAssets();
      else alert("Failed to delete asset");
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6 md:p-8 transition-all duration-300">
      {/* Header */}
     {/* Header */}
<div className="flex flex-col gap-4 mb-6">

  <h1 className="text-3xl font-bold text-gray-800">
    Asset Management
  </h1>

  {/* ALL BUTTONS IN ONE LINE */}
  <div className="flex flex-wrap items-center gap-3">

    <Button
      variant="contained"
      color="primary"
      startIcon={<FaPlus />}
      onClick={() => navigate("/assets/add")}
    >
      Add Asset
    </Button>

    <CustomizeColumns
      visibleColumns={visibleColumns}
      setVisibleColumns={setVisibleColumns}
    />

    <Button
      variant="contained"
      color="success"
      startIcon={<FaFileExcel />}
      onClick={handleExportExcel}
    >
      Export Excel
    </Button>

    <Button
      variant="contained"
      color="error"
      startIcon={<FaFilePdf />}
      onClick={handleExportPDF}
    >
      Export PDF
    </Button>

  </div>
</div>




      {/* Table */}
 <div className="bg-white rounded-xl shadow-md border border-gray-200 mt-4 overflow-hidden">
  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
    <table className="min-w-[2200px] w-full text-sm text-left relative">
      {/* Header */}
      <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider sticky top-0 z-20">
        <tr>
          {visibleColumns.includes("assetId") && (
            <Th className="min-w-[110px]">Asset ID</Th>
          )}
          {visibleColumns.includes("assetNumber") && (
            <Th className="min-w-[130px]">Asset Number</Th>
          )}
          {visibleColumns.includes("subAssetNumber") && (
            <Th className="min-w-[140px]">Sub Asset Number</Th>
          )}
          {visibleColumns.includes("assetClass") && (
            <Th className="min-w-[160px]">Asset Class</Th>
          )}
          {visibleColumns.includes("intenderName") && (
            <Th className="min-w-[150px]">Intender Name</Th>
          )}
          {visibleColumns.includes("assetDescription") && (
            <Th className="min-w-[220px]">Asset Description</Th>
          )}
          {visibleColumns.includes("custodianName") && (
            <Th className="min-w-[160px]">Custodian Name</Th>
          )}
          {visibleColumns.includes("serialNumber") && (
            <Th className="min-w-[140px]">Serial Number</Th>
          )}
          {visibleColumns.includes("macId") && <Th className="min-w-[130px]">Mac ID</Th>}
          {visibleColumns.includes("locationId") && (
            <Th className="min-w-[120px]">Location ID</Th>
          )}
          {visibleColumns.includes("block") && <Th className="min-w-[100px]">Block</Th>}
          {visibleColumns.includes("model") && <Th className="min-w-[160px]">Model</Th>}
          {visibleColumns.includes("grNumber") && (
            <Th className="min-w-[120px]">GR Number</Th>
          )}
          {visibleColumns.includes("yearOfPurchase") && (
            <Th className="min-w-[140px]">Year of Purchase</Th>
          )}
          {visibleColumns.includes("capitalizationDate") && (
            <Th className="min-w-[150px]">Capitalization Date</Th>
          )}
          {visibleColumns.includes("expiryDate") && (
            <Th className="min-w-[140px]">Expiry Date</Th>
          )}
          {visibleColumns.includes("costCenter") && (
            <Th className="min-w-[120px]">Cost Center</Th>
          )}
          {visibleColumns.includes("materialNumber") && (
            <Th className="min-w-[140px]">Material Number</Th>
          )}
          {visibleColumns.includes("acceptDate") && (
            <Th className="min-w-[140px]">Accept Date</Th>
          )}
          {visibleColumns.includes("poNumber") && (
            <Th className="min-w-[120px]">PO Number</Th>
          )}
          {visibleColumns.includes("wbsNumber") && (
            <Th className="min-w-[120px]">WBS Number</Th>
          )}
          {visibleColumns.includes("installationDate") && (
            <Th className="min-w-[150px]">Installation Date</Th>
          )}
          {visibleColumns.includes("assetVendor") && (
            <Th className="min-w-[140px]">Vendor</Th>
          )}
          {visibleColumns.includes("department") && (
            <Th className="min-w-[130px]">Department</Th>
          )}
          {visibleColumns.includes("remarks") && (
            <Th className="min-w-[200px]">Remarks</Th>
          )}

          {/* Sticky Actions Header */}
          <th
            className="
              px-4 py-3 whitespace-nowrap font-semibold text-sm 
              sticky right-0 z-30 
              bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 
              text-white shadow-[-4px_0_8px_-4px_rgba(0,0,0,0.15)]
              border-l border-l-gray-300
            "
          >
            Actions
          </th>
        </tr>
      </thead>

      {/* Body */}
      <tbody className="divide-y divide-gray-200">
        {assets.length === 0 ? (
          <tr>
            <td
              colSpan={visibleColumns.length + 1}
              className="text-center py-12 text-gray-500 italic"
            >
              No assets found.
            </td>
          </tr>
        ) : (
          assets.map((asset, idx) => (
            <tr
              key={asset.id || idx}
              className="hover:bg-blue-50/70 transition-colors duration-150 odd:bg-gray-50/40 even:bg-white"
            >
              {visibleColumns.includes("assetId") && <Td>{asset.assetId}</Td>}
              {visibleColumns.includes("assetNumber") && <Td>{asset.assetNumber}</Td>}
              {visibleColumns.includes("subAssetNumber") && (
                <Td>{asset.subAssetNumber || "-"}</Td>
              )}
              {visibleColumns.includes("assetClass") && <Td>{asset.assetClass}</Td>}
              {visibleColumns.includes("intenderName") && <Td>{asset.intenderName}</Td>}
              {visibleColumns.includes("assetDescription") && (
                <Td className="max-w-[220px] truncate">{asset.assetDescription}</Td>
              )}
              {visibleColumns.includes("custodianName") && <Td>{asset.custodianName}</Td>}
              {visibleColumns.includes("serialNumber") && <Td>{asset.serialNumber}</Td>}
              {visibleColumns.includes("macId") && <Td>{asset.macId || "-"}</Td>}
              {visibleColumns.includes("locationId") && <Td>{asset.locationId}</Td>}
              {visibleColumns.includes("block") && <Td>{asset.block}</Td>}
              {visibleColumns.includes("model") && <Td>{asset.model}</Td>}
              {visibleColumns.includes("grNumber") && <Td>{asset.grNumber}</Td>}
              {visibleColumns.includes("yearOfPurchase") && (
                <Td>{formatDateForUI(asset.yearOfPurchase)}</Td>
              )}
              {visibleColumns.includes("capitalizationDate") && (
                <Td>{formatDateForUI(asset.capitalizationDate)}</Td>
              )}
              {visibleColumns.includes("expiryDate") && (
                <Td>{formatDateForUI(asset.expiryDate)}</Td>
              )}
              {visibleColumns.includes("costCenter") && <Td>{asset.costCenter}</Td>}
              {visibleColumns.includes("materialNumber") && <Td>{asset.materialNumber}</Td>}
              {visibleColumns.includes("acceptDate") && (
                <Td>{formatDateForUI(asset.acceptDate)}</Td>
              )}
              {visibleColumns.includes("poNumber") && <Td>{asset.poNumber}</Td>}
              {visibleColumns.includes("wbsNumber") && <Td>{asset.wbsNumber}</Td>}
              {visibleColumns.includes("installationDate") && (
                <Td>{formatDateForUI(asset.installationDate)}</Td>
              )}
              {visibleColumns.includes("assetVendor") && <Td>{asset.assetVendor}</Td>}
              {visibleColumns.includes("department") && <Td>{asset.department}</Td>}
              {visibleColumns.includes("remarks") && (
                <Td className="max-w-[200px] truncate">{asset.remarks}</Td>
              )}

              {/* Sticky Actions Cell */}
              <td
                className="
                  px-4 py-3 whitespace-nowrap 
                  sticky right-0 z-10 
                  bg-white shadow-[-6px_0_10px_-6px_rgba(0,0,0,0.12)] 
                  border-l border-l-gray-200
                "
              >
                <div className="flex items-center gap-2 justify-center">
                  <Tooltip title="Edit Asset">
                    <IconButton
                      onClick={() => navigate(`/assets/edit/${asset.id}`)}
                      color="primary"
                      size="small"
                    >
                      <FaEdit />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Asset">
                    <IconButton
                      onClick={() => handleDelete(asset.id)}
                      color="error"
                      size="small"
                    >
                      <FaTrash />
                    </IconButton>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
};

// Table Head Cell
const Th = ({ children }) => (
  <th className="px-4 py-3 whitespace-nowrap font-semibold text-sm">{children}</th>
);

// Table Body Cell
const Td = ({ children }) => (
  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{children || "-"}</td>
);

export default Assets;
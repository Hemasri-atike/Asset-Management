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

const Assets = () => {
  const navigate = useNavigate();
  const [visibleColumns, setVisibleColumns] = useState(allColumns);
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

  <div className="flex flex-wrap justify-between items-center gap-4">

    {/* Left Buttons */}
    <div className="flex gap-3 flex-wrap">

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

    </div>

    {/* Right Buttons */}
    <div className="flex gap-3 flex-wrap">

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
</div>




      {/* Table */}
 <div className="bg-white rounded-xl shadow-md border border-gray-200 mt-4">
     <div className="overflow-x-auto ">
       <table className="min-w-[1600px] w-full text-sm text-left">
            {/* Header */}
    <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                {visibleColumns.includes("assetId") && <Th>Asset ID</Th>}
                {visibleColumns.includes("assetNumber") && <Th>Asset Number</Th>}
                {visibleColumns.includes("subAssetNumber") && (
                  <Th>Sub Asset Number</Th>
                )}
                {visibleColumns.includes("assetClass") && <Th>Asset Class</Th>}
                {visibleColumns.includes("intenderName") && <Th>Intender Name</Th>}
                {visibleColumns.includes("assetDescription") && (
                  <Th>Asset Description</Th>
                )}
                {visibleColumns.includes("custodianName") && <Th>Custodian Name</Th>}
                {visibleColumns.includes("serialNumber") && <Th>Serial Number</Th>}
                {visibleColumns.includes("macId") && <Th>Mac ID</Th>}
                {visibleColumns.includes("locationId") && <Th>Location ID</Th>}
                {visibleColumns.includes("block") && <Th>Block</Th>}
                {visibleColumns.includes("model") && <Th>Model</Th>}
                {visibleColumns.includes("grNumber") && <Th>GR Number</Th>}
                {visibleColumns.includes("yearOfPurchase") && <Th>Year of Purchase</Th>}
                {visibleColumns.includes("capitalizationDate") && (
                  <Th>Capitalization Date</Th>
                )}
                {visibleColumns.includes("expiryDate") && <Th>Expiry Date</Th>}
                {visibleColumns.includes("costCenter") && <Th>Cost Center</Th>}
                {visibleColumns.includes("materialNumber") && <Th>Material Number</Th>}
                {visibleColumns.includes("acceptDate") && <Th>Accept Date</Th>}
                {visibleColumns.includes("poNumber") && <Th>PO Number</Th>}
                {visibleColumns.includes("wbsNumber") && <Th>WBS Number</Th>}
                {visibleColumns.includes("installationDate") && (
                  <Th>Installation Date</Th>
                )}
                {visibleColumns.includes("assetVendor") && <Th>Vendor</Th>}
                {visibleColumns.includes("department") && <Th>Department</Th>}
                {visibleColumns.includes("remarks") && <Th>Remarks</Th>}

                {/* Sticky Actions Header */}
                <th className="px-4 py-3 whitespace-nowrap font-semibold text-sm sticky right-0 top-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 z-50 border-l">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {assets.length === 0 ? (
                <tr>
                  <td
                    colSpan={visibleColumns.length + 1}
                    className="text-center py-8 text-gray-500"
                  >
                    No assets available.
                  </td>
                </tr>
              ) : (
                assets.map((asset, idx) => (
                  <tr
                    key={idx}
                    className="odd:bg-gray-50 even:bg-white hover:bg-blue-100/60 transition-all duration-200"
                  >
                    {visibleColumns.includes("assetId") && <Td>{asset.assetId}</Td>}
                    {visibleColumns.includes("assetNumber") && (
                      <Td>{asset.assetNumber}</Td>
                    )}
                    {visibleColumns.includes("subAssetNumber") && (
                      <Td>{asset.subAssetNumber}</Td>
                    )}
                    {visibleColumns.includes("assetClass") && <Td>{asset.assetClass}</Td>}
                    {visibleColumns.includes("intenderName") && <Td>{asset.intenderName}</Td>}
                    {visibleColumns.includes("assetDescription") && (
                      <Td>{asset.assetDescription}</Td>
                    )}
                    {visibleColumns.includes("custodianName") && <Td>{asset.custodianName}</Td>}
                    {visibleColumns.includes("serialNumber") && <Td>{asset.serialNumber}</Td>}
                    {visibleColumns.includes("macId") && <Td>{asset.macId}</Td>}
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
                    {visibleColumns.includes("remarks") && <Td>{asset.remarks}</Td>}

                    {/* Sticky Actions */}
                    <td className="px-4 py-3 whitespace-nowrap sticky right-0 bg-white z-40 border-l shadow-md">
                      <div className="flex gap-2">
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => navigate(`/assets/edit/${asset.id}`)}
                            color="warning"
                            size="small"
                          >
                            <FaEdit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
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
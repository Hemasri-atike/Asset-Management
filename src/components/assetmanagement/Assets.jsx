import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomizeColumns from "../buttons/CustomizeColumns";
import { allColumns } from "../../constants/column";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  Button,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography
} from "@mui/material";
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
      visibleColumns.forEach((col) => (row[col] = asset[col] || ""));
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
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, `Assets_${getFormattedDate()}.xlsx`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/assets/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchAssets();
      } else {
        alert("Failed to delete asset");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting asset");
    }
  };

  const headerStyle = {
    backgroundColor: "hsl(var(--table-header-bg, #f9fafb))",
    color: "hsl(var(--muted-foreground, #4b5563))",
    fontWeight: 600,
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    borderBottom: "1px solid hsl(var(--border, #e5e7eb))"
  };

  const stickyActionHeaderStyle = {
    ...headerStyle,
    position: "sticky",
    right: 0,
    zIndex: 10,
    backgroundColor: "hsl(var(--table-header-bg, #f9fafb))",
    boxShadow: "-4px 0 8px -4px rgba(0,0,0,0.1)"
  };

  const cellStyle = {
    whiteSpace: "nowrap",
    color: "hsl(var(--foreground, #1f2937))",
    borderBottom: "1px solid hsl(var(--border, #e5e7eb))",
    backgroundColor: "hsl(var(--card, #ffffff))"
  };

  const stickyActionCellStyle = {
    ...cellStyle,
    position: "sticky",
    right: 0,
    zIndex: 5,
    backgroundColor: "hsl(var(--card, #ffffff))",
    boxShadow: "-4px 0 8px -4px rgba(0,0,0,0.1)",
  };

  const rowStyle = {
    "&:hover td": {
      backgroundColor: "hsl(var(--table-row-hover, #f3f4f6))"
    },
    "&:last-child td": {
      borderBottom: 0
    }
  };

  return (
    <div className="p-6 md:p-8 transition-all duration-300 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Asset Management</h1>

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

      {/* Table Container */}
      <Paper elevation={1} className="!rounded-lg !border !border-gray-200 !shadow-sm">
        <TableContainer sx={{ maxHeight: "75vh" }} className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <Table stickyHeader sx={{ minWidth: 2800 }}>
            <TableHead>
              <TableRow>
                {visibleColumns.includes("assetId") && <TableCell sx={headerStyle}>Asset ID</TableCell>}
                {visibleColumns.includes("assetNumber") && <TableCell sx={headerStyle}>Asset Number</TableCell>}
                {visibleColumns.includes("subAssetNumber") && <TableCell sx={headerStyle}>Sub Asset Number</TableCell>}
                {visibleColumns.includes("assetClass") && <TableCell sx={headerStyle}>Asset Class</TableCell>}
                {visibleColumns.includes("intenderName") && <TableCell sx={headerStyle}>Intender Name</TableCell>}
                {visibleColumns.includes("assetDescription") && <TableCell sx={headerStyle}>Asset Description</TableCell>}
                {visibleColumns.includes("custodianName") && <TableCell sx={headerStyle}>Custodian Name</TableCell>}
                {visibleColumns.includes("serialNumber") && <TableCell sx={headerStyle}>Serial Number</TableCell>}
                {visibleColumns.includes("macId") && <TableCell sx={headerStyle}>Mac ID</TableCell>}
                {visibleColumns.includes("locationId") && <TableCell sx={headerStyle}>Location ID</TableCell>}
                {visibleColumns.includes("block") && <TableCell sx={headerStyle}>Block</TableCell>}
                {visibleColumns.includes("model") && <TableCell sx={headerStyle}>Model</TableCell>}
                {visibleColumns.includes("grNumber") && <TableCell sx={headerStyle}>GR Number</TableCell>}
                {visibleColumns.includes("yearOfPurchase") && <TableCell sx={headerStyle}>Year of Purchase</TableCell>}
                {visibleColumns.includes("capitalizationDate") && <TableCell sx={headerStyle}>Capitalization Date</TableCell>}
                {visibleColumns.includes("expiryDate") && <TableCell sx={headerStyle}>Expiry Date</TableCell>}
                {visibleColumns.includes("costCenter") && <TableCell sx={headerStyle}>Cost Center</TableCell>}
                {visibleColumns.includes("materialNumber") && <TableCell sx={headerStyle}>Material Number</TableCell>}
                {visibleColumns.includes("acceptDate") && <TableCell sx={headerStyle}>Accept Date</TableCell>}
                {visibleColumns.includes("poNumber") && <TableCell sx={headerStyle}>PO Number</TableCell>}
                {visibleColumns.includes("wbsNumber") && <TableCell sx={headerStyle}>WBS Number</TableCell>}
                {visibleColumns.includes("installationDate") && <TableCell sx={headerStyle}>Installation Date</TableCell>}
                {visibleColumns.includes("assetVendor") && <TableCell sx={headerStyle}>Vendor</TableCell>}
                {visibleColumns.includes("department") && <TableCell sx={headerStyle}>Department</TableCell>}
                {visibleColumns.includes("remarks") && <TableCell sx={headerStyle}>Remarks</TableCell>}

                {/* Sticky Actions Header */}
                <TableCell sx={stickyActionHeaderStyle}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {assets.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={visibleColumns.length + 1}
                    sx={{
                       ...cellStyle,
                      textAlign: "center",
                      padding: "4rem 0",
                      color: "hsl(var(--muted-foreground, #6b7280))",
                      fontStyle: "italic"
                    }}
                  >
                    No assets available.
                  </TableCell>
                </TableRow>
              ) : (
                assets.map((asset, idx) => (
                  <TableRow key={asset.id || idx} sx={rowStyle}>
                    {visibleColumns.includes("assetId") && <TableCell sx={cellStyle}>{asset.assetId ?? "-"}</TableCell>}
                    {visibleColumns.includes("assetNumber") && <TableCell sx={cellStyle}>{asset.assetNumber ?? "-"}</TableCell>}
                    {visibleColumns.includes("subAssetNumber") && <TableCell sx={cellStyle}>{asset.subAssetNumber || "-"}</TableCell>}
                    {visibleColumns.includes("assetClass") && <TableCell sx={cellStyle}>{asset.assetClass ?? "-"}</TableCell>}
                    {visibleColumns.includes("intenderName") && <TableCell sx={cellStyle}>{asset.intenderName ?? "-"}</TableCell>}
                    {visibleColumns.includes("assetDescription") && (
                      <TableCell sx={{ ...cellStyle, maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {asset.assetDescription || "-"}
                      </TableCell>
                    )}
                    {visibleColumns.includes("custodianName") && <TableCell sx={cellStyle}>{asset.custodianName ?? "-"}</TableCell>}
                    {visibleColumns.includes("serialNumber") && <TableCell sx={cellStyle}>{asset.serialNumber ?? "-"}</TableCell>}
                    {visibleColumns.includes("macId") && <TableCell sx={cellStyle}>{asset.macId || "-"}</TableCell>}
                    {visibleColumns.includes("locationId") && <TableCell sx={cellStyle}>{asset.locationId ?? "-"}</TableCell>}
                    {visibleColumns.includes("block") && <TableCell sx={cellStyle}>{asset.block ?? "-"}</TableCell>}
                    {visibleColumns.includes("model") && <TableCell sx={cellStyle}>{asset.model ?? "-"}</TableCell>}
                    {visibleColumns.includes("grNumber") && <TableCell sx={cellStyle}>{asset.grNumber ?? "-"}</TableCell>}
                    {visibleColumns.includes("yearOfPurchase") && <TableCell sx={cellStyle}>{formatDateForUI(asset.yearOfPurchase)}</TableCell>}
                    {visibleColumns.includes("capitalizationDate") && <TableCell sx={cellStyle}>{formatDateForUI(asset.capitalizationDate)}</TableCell>}
                    {visibleColumns.includes("expiryDate") && <TableCell sx={cellStyle}>{formatDateForUI(asset.expiryDate)}</TableCell>}
                    {visibleColumns.includes("costCenter") && <TableCell sx={cellStyle}>{asset.costCenter ?? "-"}</TableCell>}
                    {visibleColumns.includes("materialNumber") && <TableCell sx={cellStyle}>{asset.materialNumber ?? "-"}</TableCell>}
                    {visibleColumns.includes("acceptDate") && <TableCell sx={cellStyle}>{formatDateForUI(asset.acceptDate)}</TableCell>}
                    {visibleColumns.includes("poNumber") && <TableCell sx={cellStyle}>{asset.poNumber ?? "-"}</TableCell>}
                    {visibleColumns.includes("wbsNumber") && <TableCell sx={cellStyle}>{asset.wbsNumber ?? "-"}</TableCell>}
                    {visibleColumns.includes("installationDate") && <TableCell sx={cellStyle}>{formatDateForUI(asset.installationDate)}</TableCell>}
                    {visibleColumns.includes("assetVendor") && <TableCell sx={cellStyle}>{asset.assetVendor ?? "-"}</TableCell>}
                    {visibleColumns.includes("department") && <TableCell sx={cellStyle}>{asset.department ?? "-"}</TableCell>}
                    {visibleColumns.includes("remarks") && (
                      <TableCell sx={{ ...cellStyle, maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {asset.remarks || "-"}
                      </TableCell>
                    )}

                    {/* Sticky Actions Cell */}
                    <TableCell sx={stickyActionCellStyle}>
                      <Box className="flex items-center justify-center gap-2">
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => navigate(`/assets/edit/${asset.id}`)}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(37, 99, 235, 0.1)",
                              "&:hover": { backgroundColor: "rgba(37, 99, 235, 0.2)" }
                            }}
                          >
                            <FaEdit style={{ fontSize: 18, color: "hsl(var(--action-edit, #2563eb))" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => handleDelete(asset.id)}
                            size="small"
                            sx={{
                               backgroundColor: "rgba(220, 38, 38, 0.1)",
                              "&:hover": { backgroundColor: "rgba(220, 38, 38, 0.2)" }
                            }}
                          >
                            <FaTrash style={{ fontSize: 18, color: "hsl(var(--action-delete, #dc2626))" }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Assets;
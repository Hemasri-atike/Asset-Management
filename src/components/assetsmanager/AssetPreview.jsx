import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Box,
  Divider,
  Chip
} from "@mui/material";
import { FaBoxOpen } from "react-icons/fa";

const AssetPreview = ({ open, handleClose, formData }) => {
  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  const formatValue = (value) => {
    if (!value) return "-";
    if (value instanceof Date) return value.toLocaleDateString();
    return value.toString();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "rounded-xl shadow-xl",
      }}
    >
      {/* Header */}
      <DialogTitle className="flex items-center gap-2 bg-blue-600 text-white font-semibold text-lg px-6 py-4">
        <FaBoxOpen />
        Asset Preview
      </DialogTitle>

      {/* Content */}
      <DialogContent dividers className="bg-gray-50 px-6 py-5">
        <Grid container spacing={3}>
          {Object.entries(formData).map(([key, value]) => (
           <Grid size={{ xs: 12, md: 6 }} key={key}>
              <Box className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition">
                
                {/* Field Label */}
                <Typography
                  variant="caption"
                  className="text-gray-500 font-semibold uppercase tracking-wide"
                >
                  {formatKey(key)}
                </Typography>

                {/* Field Value */}
                <Typography
                  variant="body1"
                  className="text-gray-900 font-medium mt-1"
                >
                  {formatValue(value)}
                </Typography>

              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <Divider />

      {/* Actions */}
      <DialogActions className="px-6 py-4 bg-gray-50">
        <Button
          variant="outlined"
          onClick={handleClose}
          className="!border-gray-400 !text-gray-700"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          className="!bg-blue-600 hover:!bg-blue-700"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssetPreview;
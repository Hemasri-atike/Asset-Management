import { TextField, MenuItem } from "@mui/material";

const Select = ({ label, name, value, onChange, options, error }) => {
  return (
    <TextField
      select
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
      variant="outlined"
      size="small"
    >
      <MenuItem value="">Select {label}</MenuItem>

      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
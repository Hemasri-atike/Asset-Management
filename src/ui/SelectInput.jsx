import { TextField, MenuItem } from "@mui/material";

const SelectInput = ({ label, name, value, onChange, options, error }) => {
  return (
    <TextField
      select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      size="small"
      error={!!error}
      helperText={error}
    >
      {options.map((opt, i) => (
        <MenuItem key={i} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectInput;
import { TextField } from "@mui/material";

const TextInput = ({ label, name, value, onChange, error }) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      variant="outlined"
      error={!!error}
      helperText={error}
      size="small"
      sx={{
        backgroundColor: "#fff",
        borderRadius: "8px"
      }}
    />
  );
};

export default TextInput;
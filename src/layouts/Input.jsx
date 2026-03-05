import { TextField } from "@mui/material";

const Input = ({ label, name, value, onChange, error }) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      size="medium"
      error={!!error}
      helperText={error}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          backgroundColor: "#fff"
        }
      }}
    />
  );
};
export default Input;
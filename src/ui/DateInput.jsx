import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DateInput = ({ label, value, onChange }) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField {...params} fullWidth size="small" />
      )}
    />
  );
};

export default DateInput;
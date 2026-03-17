import { Button } from "@mui/material";

const ModernButton = ({ text, onClick, type = "button", color = "primary" }) => {
  return (
    <Button
      variant="contained"
      color={color}
      onClick={onClick}
      type={type}
      sx={{
        borderRadius: "10px",
        textTransform: "none",
        fontWeight: 600,
        padding: "8px 22px"
      }}
    >
      {text}
    </Button>
  );
};

export default ModernButton;
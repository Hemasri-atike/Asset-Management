import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses
} from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  FaBoxOpen,
  FaUserCheck,
  FaShoppingCart,
  FaTools
} from "react-icons/fa";

const steps = [
  { label: "Basic Info", icon: <FaBoxOpen /> },
  { label: "Assignment", icon: <FaUserCheck /> },
  { label: "Purchase Details", icon: <FaShoppingCart /> },
  { label: "Technical Details", icon: <FaTools /> }
];

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor: "#e5e7eb",
    borderRadius: 2
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    backgroundColor: "#2563eb"
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    backgroundColor: "#2563eb"
  }
}));

const StepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor: ownerState.active || ownerState.completed ? "#2563eb" : "#d1d5db",
  color: "#fff",
  width: 42,
  height: 42,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "18px",
  boxShadow: ownerState.active ? "0 4px 10px rgba(0,0,0,0.15)" : "none"
}));

function StepIconComponent(props) {
  const { active, completed, className, icon } = props;

  return (
    <StepIconRoot ownerState={{ active, completed }} className={className}>
      {steps[icon - 1].icon}
    </StepIconRoot>
  );
}

const AssetStepper = ({ step }) => {
  return (
    <Stepper
      activeStep={step - 1}
      alternativeLabel
      connector={<CustomConnector />}
      className="mb-10"
    >
      {steps.map((s) => (
        <Step key={s.label}>
          <StepLabel StepIconComponent={StepIconComponent}>
            {s.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default AssetStepper;
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#121212",
  color: "white",
  boxShadow: "0px 8px 24px rgba(255, 255, 255, 0.15)",
  p: 4,
  borderRadius: 4,
  outline: "none",
};

const planData = [
  {
    title: "Basic",
    price: "$10 / month",
    features: ["Small reply boost", "Encrypted direct messages"],
    bgColor: "#1e1e1e",
  },
  {
    title: "Premium",
    price: "$25 / month",
    features: ["Half Ads in Following", "Longer posts"],
    bgColor: "#252525",
  },
  {
    title: "Premium+",
    price: "$70 / month",
    features: ["Fully ad-free experience", "Exclusive insights"],
    bgColor: "#2e2e2e",
  },
];

export default function SubscriptionModal({ open, handleClose }) {
  const [selectedPlan, setSelectedPlan] = React.useState(null);

  const handlePlanSelect = (index) => {
    setSelectedPlan(index);
  };

  return (
    <Modal open={open}>
      <Box sx={style}>
        <CloseIcon
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            cursor: "pointer",
            color: "gray",
            "&:hover": { color: "black" },
          }}
          onClick={handleClose}
        />
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}>
          Upgrade to Premium
        </Typography>
        <Grid container spacing={3}>
          {planData.map((plan, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box
                onClick={() => handlePlanSelect(index)}
                sx={{
                  textAlign: "center",
                  p: 3,
                  width: "200px",
                  height: "250px",
                  borderRadius: 3,
                  background: plan.bgColor,
                  cursor: "pointer",
                  position: "relative",
                  boxShadow: selectedPlan === index ? "0px 5px 15px rgba(30, 144, 255, 0.5)" : "none",
                  "&:hover": {
                    transform: "scale(1.03)",
                    transition: "all 0.3s ease-in-out",
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                {selectedPlan === index && (
                  <CheckCircleIcon sx={{ position: "absolute", top: 8, right: 8, color: "#1e90ff" }} />
                )}
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {plan.title}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "1rem", mt: 1 }}>
                  {plan.price}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {plan.features.map((feature, idx) => (
                    <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
                      {feature}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          sx={{
            mt: 4,
            py: 1,
            px: 4,
            fontSize: "1rem",
            textTransform: "none",
            background: "linear-gradient(135deg, #43cea2, #185a9d)",
            color: "white",
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(30, 144, 255, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #185a9d, #43cea2)",
            },
          }}
        >
          Subscribe & Pay
        </Button>
      </Box>
    </Modal>
  );
}


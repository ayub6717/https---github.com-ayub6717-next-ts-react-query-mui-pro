import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <DashboardLayout children={<Dashboard />} />
    </Box>
  );
}

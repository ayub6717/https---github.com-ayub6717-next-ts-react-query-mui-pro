import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

const SideNav = () => {
  return (
    <Box className="w-64 bg-gray-800 text-white">
      <Typography className="text-2xl p-4">Dashboard</Typography>
      <List>
        <ListItem>
          <ListItemIcon className="text-white">
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem>
          <ListItemIcon className="text-white">
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideNav;

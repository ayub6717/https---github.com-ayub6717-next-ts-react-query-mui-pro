import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

const SideNav = () => {
  return (
    <div className="w-64 bg-gray-800 text-white">
      <h1 className="text-2xl p-4">Dashboard</h1>
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
    </div>
  );
};

export default SideNav;

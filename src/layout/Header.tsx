import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar className="bg-blue-500">
        <Typography variant="h6" component="div">
          User Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import { FC, memo, useState } from "react";
import { HeaderProps } from "./header.type";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box } from "@mui/material";
import { userDate } from "@/state/ducks/auth/selectors";
import { auth } from "@/services/auth-service";
import { useNavigate } from "react-router-dom";

export const Header: FC<HeaderProps> = memo(() => {
  const user = userDate();
  const navigation = useNavigate();
  const onClickLogout = () => {
    auth.userLogout().then((res: any) => {
      if (res.data) {
        navigation("/");
      }
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Opinion Gate
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hello, {user?.userName}
            <span>{user?.role === "admin" ? " Your are admin" : ""}</span>
          </Typography>
          <Button onClick={onClickLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

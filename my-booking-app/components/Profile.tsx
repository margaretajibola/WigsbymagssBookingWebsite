"use client";
import { useRouter } from "next/navigation";

import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Profile() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  async function handleLogout() {
    handleClose(); // closes menu first
    await fetch("/api/auth/logout", { method: "POST" });
    // optionally clear client storage if you have any
    window.dispatchEvent(new Event("user-refresh"));
    router.push("/auth/login");
  }

  function handleDashboard() {
    handleClose(); // closes menu first
    router.push("/dashboard");
  }

  return (
    <div>
      <IconButton
        aria-label="account options"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </IconButton>

      <Menu
        id="account-menu"
        slotProps={{ 
        list: { 
          'aria-labelledby': 'account-button', 
          sx:{
            backgroundColor: "#F3E5F5",
          }
        } 
      }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
      </Menu>
    </div>
  );
}
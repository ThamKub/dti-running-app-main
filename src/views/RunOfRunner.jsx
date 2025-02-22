import React from 'react'

import { AppBar, Box, Toolbar, Typography, Button, } from '@mui/material';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function RunOfRunner() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="red"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="red">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default RunOfRunner
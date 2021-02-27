import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem } from '@material-ui/core';
import { MenuRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: "250px",
  }
});

export default function Home (props) {
  const classes = useStyles();
  const [open, setOpen] = useState({
    left: false
  });

  const toggleDrawer = (side, open) => () => {
    setOpen({ [side]: open })
  }

  return (
    <div className="container">
      <IconButton onClick={toggleDrawer("left", true)}>
        <MenuRounded fontSize="large" />
      </IconButton>
      <Drawer anchor={"left"} open={open["left"]} onClose={toggleDrawer("left", false)}>
        <div className={classes.list}>
          <List>
            <ListItem onClick={toggleDrawer("left", false)}>
              <Link to="/">
                <h3 className="text-dark">Home</h3>
              </Link>
            </ListItem>
            <ListItem onClick={toggleDrawer("left", false)}>
              <Link to="/auth">
                <h3 className="text-dark" onClick={props.handleSignOut}>
                  Sign out
                </h3>
              </Link>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  )
}

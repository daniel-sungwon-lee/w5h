import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, Fab, CircularProgress } from '@material-ui/core';
import { MenuRounded, AddRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  menuIcon: {
    fontSize: "3.5rem"
  },
  list: {
    width: "250px",
  },
  fab: {
    background: "#D5F7C6",
    padding: "12px"
  },
  empty: {
    color: "black",
    opacity: "0.3",
    width: "100%"
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
      <div className="w-100 text-left">
        <IconButton onClick={toggleDrawer("left", true)}>
          <MenuRounded className={classes.menuIcon} />
        </IconButton>
      </div>
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
      <div className={classes.empty}>
        <div className="empty-message">
          <h2>Such empty...</h2>
          <h2>Add a new job application!</h2>
        </div>
      </div>
      <div className="w-100 text-right">
        <Fab id="fab" className={classes.fab}>
          <AddRounded />
        </Fab>
      </div>
    </div>
  )
}

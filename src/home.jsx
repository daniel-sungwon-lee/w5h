import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List, ListItem, Fab, CircularProgress } from '@material-ui/core';
import { MenuRounded, AddRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';

import './styles.css'

const useStyles = makeStyles({
  menuIcon: {
    fontSize: "3.5rem"
  },
  list: {
    width: "250px"
  },
  fab: {
    background: "#D5F7C6"
  },
  empty: {
    color: "black",
    opacity: "0.3",
    width: "100%"
  }
});

export default function Home (props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState({
    left: false
  });

  useEffect(() => {
    setLoading(false)
  }, []);

  const toggleDrawer = (side, open) => () => {
    setOpen({ [side]: open })
  }

  if (loading) {
    return (
      <div className="spinner">
        <CircularProgress className="spinner-icon" />
      </div>
    )
  }

  return (
    <div className="container pb-3">
      <div className="w-100 text-left">
        <IconButton onClick={toggleDrawer("left", true)}>
          <MenuRounded className={classes.menuIcon} />
        </IconButton>
      </div>
      <Drawer anchor={"left"} open={open["left"]} onClose={toggleDrawer("left", false)}>
        <div className={classes.list}>
          <List>
            <ListItem onClick={toggleDrawer("left", false)}>
              <Link to="/" className="text-decoration-none">
                <h3 className="text-dark">Home</h3>
              </Link>
            </ListItem>
            <ListItem onClick={toggleDrawer("left", false)}>
              <Link to="/auth" className="text-decoration-none">
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
      <div className="w-100 d-flex justify-content-end">
        <div className="fab">
          <Fab id="fab-button" className={classes.fab}>
            <AddRounded />
          </Fab>
        </div>
      </div>
    </div>
  )
}

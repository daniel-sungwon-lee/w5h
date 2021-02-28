import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, AppBar } from '@material-ui/core';
import { MenuRounded } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import './styles.css';

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    background: "white"
  },
  menuIcon: {
    fontSize: "3.5rem"
  },
  list: {
    width: "250px"
  },
  linkFont: {
    fontFamily: "Product Sans",
    color: "black",
    margin: "0"
  }
})

export default function Nav (props) {
  const classes = useStyles()

  const [open, setOpen] = useState({
    left: false
  });

  const toggleDrawer = (side, open) => () => {
    setOpen({ [side]: open })
  }


  return (
    <div className="container sticky-top">
      <AppBar position="sticky" classes={{ root: classes.root }}>
        <div className="w-100 text-left">
          <IconButton onClick={toggleDrawer("left", true)}>
            <MenuRounded className={classes.menuIcon} />
          </IconButton>
        </div>
        <Drawer anchor={"left"} open={open["left"]} onClose={toggleDrawer("left", false)}>
          <div className={classes.list}>
            <List className="mt-4 p-3 text-center">
              <ListItem onClick={toggleDrawer("left", false)}>
                <Link to="/" className="text-decoration-none">
                  <h3 className={classes.linkFont}>Home</h3>
                </Link>
              </ListItem>
              <ListItem onClick={toggleDrawer("left", false)}>
                <Link to="/auth" className="text-decoration-none">
                  <h3 className={classes.linkFont} onClick={props.handleSignOut}>
                    Sign out
                  </h3>
                </Link>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </AppBar>
    </div>
  )
}

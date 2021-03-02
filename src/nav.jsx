import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, AppBar, Icon, Button } from '@material-ui/core';
import { MenuRounded, PowerSettingsNewRounded, HomeRounded } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import './styles.css';

const useStyles = makeStyles({
  root: {
    background: "white"
  },
  list: {
    width: "250px"
  },
  icons: {
    fontSize: "3rem"
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
    <div className="sticky-top p-0 mb-5">
      <AppBar position="sticky" classes={{ root: classes.root }}>
        <div className="w-100 text-left">
          <IconButton onClick={toggleDrawer("left", true)}>
            <MenuRounded className={classes.icons} />
          </IconButton>
        </div>
        <Drawer anchor={"left"} open={open["left"]} onClose={toggleDrawer("left", false)}>
          <div className={classes.list}>
            <List className="mt-3">
              <Link to="/" className="text-decoration-none" onClick={() => props.handleAppId(null)}>
                <Button className="p-0" fullWidth>
                  <ListItem className="d-flex justify-content-center py-3" onClick={toggleDrawer("left", false)}>
                    <h3 className="m-0 text-dark">
                      <HomeRounded className={classes.icons} />
                    </h3>
                  </ListItem>
                </Button>
              </Link>
              <Link to="/auth" className="text-decoration-none" onClick={() => props.handleAppId(null)}>
                <Button className="p-0" fullWidth color="secondary">
                  <ListItem className="d-flex justify-content-center py-3" onClick={props.handleSignOut}>
                    <h3 className="m-0" onClick={toggleDrawer("left", false)}>
                      <Icon color="secondary">
                        <PowerSettingsNewRounded className={classes.icons} />
                      </Icon>
                    </h3>
                  </ListItem>
                </Button>
              </Link>
            </List>
          </div>
        </Drawer>
      </AppBar>
    </div>
  )
}

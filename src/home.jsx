import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List, ListItem, Fab, CircularProgress,
         ListItemText, Checkbox, Tooltip } from '@material-ui/core';
import { MenuRounded, AddRounded, DeleteRounded } from '@material-ui/icons';
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
  },
  listItem: {
    margin: "0 1rem"
  },
  linkFont: {
    fontFamily: "Product Sans",
    color: "black",
    margin: "0"
  }
});

export default function Home (props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState({
    left: false
  });
  const [data, setData] = useState([])
  const [checked, setChecked] = useState(false)
  const [empty, setEmpty] = useState('empty-message')

  useEffect(() => {
    fetch(`/api/applications/${props.userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setEmpty('d-none')
        } else {
          setEmpty('empty-message')
        }

        setData(data)
      })

    setLoading(false)
  }, [props.userId]);

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
      <div>
        <h2 className="mb-4 h2">Jobs Applied</h2>
      </div>
      <Drawer anchor={"left"} open={open["left"]} onClose={toggleDrawer("left", false)}>
        <div className={classes.list}>
          <List className="mt-4 text-center">
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
      <div className="">
        <List className={classes.listItem}>
          {
            data.map(app => {
              const { applicationId, who, what } = app

              return (
                  <ListItem key={applicationId} button>
                    <div>
                      <Checkbox fontSize="large" onClick={() => setChecked(true)}
                        edge="end" checked={checked} color="primary" />
                    </div>
                    <Link to={`/application/${applicationId}`} className="text-decoration-none w-100"
                     onClick={() => props.handleAppId(applicationId)}>
                      <ListItemText className="text-dark" inset primary={who} secondary={what} />
                    </Link>
                    <div>
                      <Tooltip arrow title="Delete" placement="right">
                        <IconButton>
                          <DeleteRounded color="secondary" fontSize="large" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </ListItem>
              )
            })
          }
        </List>
      </div>
      <div className={classes.empty}>
        <div className={empty}>
          <h2>Such empty...</h2>
          <h2>Add a new job application!</h2>
        </div>
      </div>
      <div className="w-100 d-flex justify-content-end">
        <div className="fab">
          <Link to="/entry" className="text-decoration-none">
            <Tooltip title="Add" arrow>
              <Fab id="fab-button" className={classes.fab}>
                <AddRounded />
              </Fab>
            </Tooltip>
          </Link>
        </div>
      </div>
    </div>
  )
}

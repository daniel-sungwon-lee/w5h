import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List, ListItem, Fab, CircularProgress,
         ListItemText, Checkbox, Tooltip, Menu, MenuItem } from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { MenuRounded, AddRounded, MoreVertRounded, DeleteRounded, EditRounded } from '@material-ui/icons';
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
  },
  listItemCard: {
    boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    margin: "3rem 0",
    borderRadius: "1.5rem"
  },
  popup: {
    borderRadius: "2rem"
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
        setLoading(false)
      })

  }, [props.userId]);

  const toggleDrawer = (side, open) => () => {
    setOpen({ [side]: open })
  }

  const handleDelete = (id) => () => {
    const updated = data.filter(app=> {
      return app.applicationId !== id
    })

    setData(updated)

    fetch(`/api/application/${props.userId}/${id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
      .catch(()=> window.location.reload());
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
                <PopupState variant="popover">
                  {
                    popupState => (
                      <ListItem key={applicationId} button className={classes.listItemCard}>
                        <div>
                          <Checkbox fontSize="large" onClick={() => setChecked(true)}
                            edge="end" checked={checked} color="primary" />
                        </div>
                        <Link to={`/application/${applicationId}`} className="text-decoration-none w-100"
                        onClick={() => props.handleAppId(applicationId)}>
                          <ListItemText className="text-dark" inset primary={who} secondary={what} />
                        </Link>
                        <div>
                          <IconButton {...bindTrigger(popupState)}>
                            <MoreVertRounded fontSize="large" />
                          </IconButton>
                          <Menu {...bindMenu(popupState)} classes={{
                              paper: classes.popup
                            }}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            >
                            <div>
                              <MenuItem onClick={popupState.close}>
                                <EditRounded fontSize="large" />
                              </MenuItem>
                              <MenuItem onClick={popupState.close}>
                                <DeleteRounded onClick={handleDelete(applicationId)}
                                 color="secondary" fontSize="large" />
                              </MenuItem>
                            </div>
                          </Menu>
                        </div>
                      </ListItem>
                    )
                  }
                </PopupState>
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

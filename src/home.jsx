import React, { useState, useEffect } from 'react';
import { IconButton, List, ListItem, Fab, CircularProgress, Button,
         ListItemText, Checkbox, Menu, MenuItem, Zoom, Grow, Popover } from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu, bindPopover } from 'material-ui-popup-state';
import { AddRounded, MoreVertRounded, DeleteRounded, EditRounded,
         CheckBoxRounded, IndeterminateCheckBoxRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom';

import './styles.css'

const useStyles = makeStyles({
  fab: {
    background: "#D5F7C6"
  },
  empty: {
    color: "black",
    opacity: "0.3",
    width: "100%"
  },
  listItem: {
    margin: "0 1rem",
    paddingTop: "0"
  },
  listItemCard: {
    boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    margin: "3rem 0",
    borderRadius: "1.5rem"
  },
  popup: {
    borderRadius: "3rem"
  },
  icons: {
    color: "black"
  },
  checkbox: {
    color: "#1db954 !important"
  }
});

export default function Home (props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
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
      .catch(() => window.location.reload())

  }, [props.userId]);

  const handleCheckbox = (e) => {
    setLoading(true)
    let appId = parseInt(e.target.id)

    if (e.target.checked) {
      const reqBody = {isChecked: true}

      fetch(`/api/application/${props.userId}/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody)
      })
        .then(res => res.json())
        .then(result => {

          fetch(`/api/applications/${props.userId}`)
            .then(res => res.json())
            .then(data => {

              setData(data)
              setLoading(false)

            })
            .catch(() => window.location.reload())
        })
        .catch(() => window.location.reload())

    } else {
      const reqBody = {isChecked: false}

      fetch(`/api/application/${props.userId}/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody)
      })
        .then(res => res.json())
        .then(result => {

          fetch(`/api/applications/${props.userId}`)
            .then(res => res.json())
            .then(data => {

              setData(data)
              setLoading(false)

            })
            .catch(() => window.location.reload())
        })
        .catch(() => window.location.reload())

    }
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
    <div className="container pb-5">
      <Zoom in>
        <h2 className="m-0 h2">Jobs Applied</h2>
      </Zoom>
      <Zoom in style={{transitionDelay: "300ms"}}>
        <List className={classes.listItem}>
          {
            data.map(app => {
              const { applicationId, who, what, isChecked } = app

              return (
                <PopupState key={applicationId} id="menu" variant="popover">
                  {
                    popupState => (
                      <ListItem key={applicationId} button className={classes.listItemCard}>
                        <div>
                          <Checkbox fontSize="large" onClick={handleCheckbox} classes={{
                           checked: classes.checkbox
                          }} checkedIcon={<CheckBoxRounded />} icon={<IndeterminateCheckBoxRounded />}
                           edge="end" checked={isChecked} color="default" id={applicationId.toString()} />
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
                            getContentAnchorEl={null}
                            >
                            <div>

                              <Link to={`/entry/${applicationId}`} className="text-decoration-none"
                               onClick={() => props.handleAppId(applicationId)}>
                                <MenuItem dense>
                                  <IconButton className="p-2">
                                    <EditRounded className={classes.icons} fontSize="large" />
                                  </IconButton>
                                </MenuItem>
                              </Link>

                              <MenuItem dense>
                                <PopupState id="popover" variant="popover">
                                  {
                                    popupState2 => (
                                      <>
                                        <IconButton className="p-2" {...bindTrigger(popupState2)}>
                                          <DeleteRounded
                                          color="secondary" fontSize="large" />
                                        </IconButton>

                                        <Popover {...bindPopover(popupState2)}
                                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                          transformOrigin={{ vertical: 'top', horizontal: 'right' }}>

                                          <Button onClick={handleDelete(applicationId)} variant="contained"
                                          color="secondary">
                                            Delete?
                                          </Button>

                                        </Popover>
                                      </>
                                    )
                                  }
                                </PopupState>
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
      </Zoom>
      <Zoom in>
        <div className={classes.empty}>
          <div className={empty}>
            <h2>Such empty...</h2>
            <h2>Add a new job application!</h2>
          </div>
        </div>
      </Zoom>
      <Grow in>
        <div className="w-100 d-flex justify-content-end">
          <div className="fab">
            <Link to="/entry" className="text-decoration-none">
              <Fab id="fab-button" className={classes.fab}>
                <AddRounded />
              </Fab>
            </Link>
          </div>
        </div>
      </Grow>
    </div>
  )
}

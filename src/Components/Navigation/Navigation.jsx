import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import './Navigation.css'

const useStyles = makeStyles({
  root: {
    // Entire Nav
    '& .MuiDrawer-paper': {
      maxWidth: 304,
      padding: '4px 0',
    },
    // Workflow Selector
    '& #workflow.MuiSelect-root': {
      textTransform: 'uppercase',
      color: '#888888',
      textAlign: 'left',
      width: 'auto',
      marginLeft: '32px',
      paddingRight: '10px',
    },
    '& #workflow ~ .MuiSelect-icon': {
      color: '#888888',
      display: 'inline-block',
      position: 'relative',
      marginTop: '-12px',
    },
    // Header
    '& h2': {
      margin: '12px 83px 16px 32px',
      fontSize: '24px',
      fontWeight: 'normal',
      lineHeight: '28px',
      fontFamily: 'Roboto',
      textAlign: 'left',
    },
    // Divider
    '& hr': {
      width: '100%',
      border: '0px solid #cccccc',
      borderBottom: '1px solid #cccccc',
      margin: 0,
    },
    // Buttons
    '& button': {
      textAlign: 'left',
      textTransform: 'none',
      padding: '10px 24px',
      margin: '4px 8px',
      width: 'calc(100% - 16px)',
    },
    '& button span': {
      justifyContent: 'flex-start',
    },
    '& button.nested': {
      marginLeft: '24px',
      color: '#888888',
      width: 'calc(100% - 32px)',
    },
    '& button.nested.selected': {
      color: '#6202EE',
    },
    // Company Selector
    '& #company.MuiSelect-root': {
      textTransform: 'uppercase',
      fontWeight: 500,
      marginLeft: '24px',
      textAlign: 'left',
      margin: '4px 8px',
      padding: '10px 24px',
    },
    '& #company ~ .MuiSelect-icon': {
      color: '#000',
      marginRight: '33px',
    },
  },
})

const Navigation = () => {
  const [workflow, setWorkflow] = useState('WorkFlow1')
  const [company, setCompany] = useState('UW Blueprint')

  const sendAlert = e => window.alert(e.target.textContent)
  const changeWorkflow = e => setWorkflow(e.target.value)
  const changeCompany = e => setCompany(e.target.value)

  const classes = useStyles()
  return (
    <nav>
      <Drawer variant="permanent" className={classes.root}>
        <Select
          id="workflow"
          labelId="workflow-label"
          value={workflow}
          onChange={changeWorkflow}
          autoWidth
          disableUnderline
        >
          <MenuItem value="WorkFlow1">Workflow</MenuItem>
          <MenuItem value="WorkFlow2">Workflow #2</MenuItem>
          <MenuItem value="WorkFlow3">Workflow #3</MenuItem>
          <MenuItem value="WorkFlow4">Workflow #4</MenuItem>
          <MenuItem value="WorkFlow5">Workflow #5</MenuItem>
        </Select>
        <h2>SVP Perfect Pitch Candidates</h2>
        <hr />
        <Button onClick={sendAlert}>All Applicants</Button>
        <Button onClick={sendAlert} variant="contained" color="primary">
          Application Submission
        </Button>
        <Select
          id="company"
          labelId="company-label"
          value={company}
          onChange={changeCompany}
          autoWidth
          disableUnderline
        >
          <MenuItem value="UW Blueprint">UW Blueprint</MenuItem>
        </Select>
        <Button onClick={sendAlert} className="nested selected">
          Ownership
        </Button>
        <Button onClick={sendAlert} className="nested">
          Problem
        </Button>
        <Button onClick={sendAlert} className="nested">
          Business Model
        </Button>
        <Button onClick={sendAlert} className="nested">
          Product
        </Button>
        <Button onClick={sendAlert} className="nested">
          Market
        </Button>
        <Button onClick={sendAlert}>Comparison</Button>
        <Button onClick={sendAlert}>Stacked Rankings</Button>
      </Drawer>
    </nav>
  )
}

export default Navigation

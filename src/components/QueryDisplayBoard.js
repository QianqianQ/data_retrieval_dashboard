// @Flow
import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {TextField, InputAdornment, Button} from '@material-ui/core';
import {AccountBox} from '@material-ui/icons'
import PropTypes from 'prop-types';
import {format} from "date-fns";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import DisplayCard from './Card';
import DataTable from './Table';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  item: {
    padding: theme.spacing(1),
    textAlign: 'center',
    width: "100%",
    height: "100%",
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  }
});


class QueryDisplayBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        startDate: localStorage.getItem('startDate') || new Date('2017-05-01'),
        endDate: localStorage.getItem('endDate') || new Date('2017-06-15'),
        accessToken: localStorage.getItem('accessToken') || "",
        data: [],
        by_date: [],
        isLoaded: false,
        error: null
    };
    this.startDateChange = this.startDateChange.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.accessTokenChange = this.accessTokenChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  startDateChange(date) {
    localStorage.setItem('startDate', date);
    this.setState({startDate: date});
  }

  endDateChange(date) {
    localStorage.setItem('endDate', date);
    this.setState({endDate: date});
  }

  accessTokenChange(token) {
    localStorage.setItem('accessToken', token);
    this.setState({accessToken: token});
  }

  handleSubmit(event) {
    event.preventDefault();
    const url = "https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/" +
      "chat-stats/daily/?start_date=" + format(this.state.startDate, "yyyy-MM-dd")
      +"&end_date=" + format(this.state.endDate, "yyyy-MM-dd");
    console.log(url);
    console.log('Token ' + this.state.accessToken);
    const fetchConfig = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.state.accessToken
      }
    };
    fetch(url, fetchConfig)
      .then(res => res.json())
      .then((result) => {
          this.setState({data: result});
          this.setState({'by_date': result['by_date']});
          console.log(this.state.by_date);
        },
        (error) => {
          console.log(error);
        });
  }

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const elements = ['total_conversation_count', 'total_user_message_count', 'total_visitor_message_count'];
    return (
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.paper}>
        <form onSubmit={this.handleSubmit}>
          <Grid container direction="row" justify="flex-start" alignItems="center" spacing={1}>
            <Grid item xs={12} sm={12} md={3} lg={3}  xl={3} >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.item}
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  id="start-date"
                  label="Start Date"
                  minDate={new Date('2017-05-01')}
                  maxDate={new Date('2017-06-15')}
                  value={this.state.startDate}
                  onChange={this.startDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}  xl={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.item}
                  variant="inline"
                  margin="normal"
                  id="end-date"
                  label="End Date"
                  format="yyyy/MM/dd"
                  minDate={new Date('2017-05-01')}
                  maxDate={new Date('2017-06-15')}
                  value={this.state.endDate}
                  onChange={this.endDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5}  xl={5} >
              <TextField
                className={classes.item}
                value={this.state.accessToken}
                onChange={(e) => this.accessTokenChange(e.target.value)}
                fullWidth
                id="token"
                placeholder="Access Token"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountBox />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid >
            <Grid item xs={12} sm={12} md={1} lg={1}  xl={1} >
              <Button type="submit" value="Submit" variant="outlined" color="primary" fullWidth className={classes.item} >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        </Container>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {elements.map((value, index) => {
              return (
                <Grid item xs={12} md={4} lg={4} key={index}>
                  <Paper className={fixedHeightPaper}>
                    <DisplayCard name={value} value={this.state.data[value]}/>
                  </Paper>
                </Grid>
              )
            })}
             <Grid item xs={12}>
              <Paper className={classes.paper}>
                <DataTable data={this.state.by_date}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

QueryDisplayBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(QueryDisplayBoard);
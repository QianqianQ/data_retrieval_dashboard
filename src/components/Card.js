// @Flow
import React from 'react';
import Typography from '@material-ui/core/Typography';


type Props = {
  name: string,
  value: number
}

export default function DisplayCard(props: Props) {
  // const classes = useStyles();
  return (
    <React.Fragment>
      {/* eslint-disable-next-line react/prop-types */}
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.name}
      </Typography>
      {/*<Title>{props.name}</Title>*/}
      <Typography component="p" variant="h4">
        {/* eslint-disable-next-line react/prop-types */}
        {props.value}
      </Typography>
     {/* <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>*/}
    </React.Fragment>
  );
}
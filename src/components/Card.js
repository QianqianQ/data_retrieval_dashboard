import React from 'react';
import Typography from '@material-ui/core/Typography';


type Props = {
  name: string,
  value: string
}

export default function DisplayCard(props: Props) {
  return (
    <React.Fragment>
      <Typography component="h1" variant="h5" color="primary" gutterBottom styles={{"align":"center"}}>
        {props.name}
      </Typography>
      <Typography component="p" variant="h5" styles={{"align":"center"}}>
        {props.value}
      </Typography>
    </React.Fragment>
  );
}
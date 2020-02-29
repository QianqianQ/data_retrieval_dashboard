import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class Chart extends PureComponent {
  render() {
    return (
      <LineChart
        width={1100}
        height={400}
        data={this.props.data}
        margin={{
          top: 5, right: 20, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey='conversation_count' stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="missed_chat_count" stroke="#82ca9d" />
        <Line type="monotone" dataKey='visitors_with_conversation_count' stroke="#FF9E2C" />
      </LineChart>
    );
  }
}



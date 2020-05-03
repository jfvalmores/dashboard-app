import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import StateNode from '../interfaces/StateNode';

interface Props {
  data: Array<Object>;
  state: StateNode;
}

const SimpleBarChart: React.FC<Props> = ({ data, state }) => {
  const [dataProvider, setDataProvider] = useState<Array<Object>>([]);

  useEffect(() => {
    console.log(data);
    setDataProvider(data || []);
  }, [data]);

  return (
    <div style={{ overflow: 'auto' }}>
      <BarChart
        width={300 * dataProvider.length}
        height={500}
        data={dataProvider}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="combinedKey" />
        <YAxis />
        <Tooltip />
        <Legend />
        {(state.status === 'confirmed' || state.status === 'all') &&
          <Bar dataKey="confirmed" fill="#8884d8" />
        }
        {(state.status === 'deaths' || state.status === 'all') &&
          <Bar dataKey="deaths" fill="#ff8383" />
        }
        {(state.status === 'recovered' || state.status === 'all') &&
          <Bar dataKey="recovered" fill="#82ca9d" />
        }
      </BarChart>
    </div>
  );
}

export default SimpleBarChart;
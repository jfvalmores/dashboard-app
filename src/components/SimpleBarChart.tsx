import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

interface Props {
  data: Array<Object>;
}

const SimpleBarChart: React.FC<Props> = ({ data }) => {
  const [dataProvider, setDataProvider] = useState<Array<Object>>([]);

  useEffect(() => {
    setDataProvider(data);
  }, [data]);

  return (
    <div style={{ overflow: 'auto' }}>
      <BarChart
        width={100 * dataProvider.length}
        height={400}
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
        <Bar dataKey="confirmed" fill="#8884d8" />
        {/* <Bar dataKey="deaths" fill="#ff8383" />
        <Bar dataKey="recovered" fill="#82ca9d" /> */}
      </BarChart>
    </div>
  );
}

export default SimpleBarChart;
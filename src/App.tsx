import React, { useState, useEffect } from 'react';

const apiURL: string = 'https://covid19.mathdro.id/api';

interface DataSourceNode {
  confirmed: {
    value: number;
    detail: string;
  };
  recovered: {
    value: number;
    detail: string;
  };
  deaths: {
    value: number;
    detail: string;
  };
  lastUpdate: string;
};

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataSourceNode | null>(null);

  useEffect(() => {
    getDataSource()
      .then(data => setDataSource(data as DataSourceNode))
  }, [])

  const getDataSource = async (): Promise<Object> => {
    const response = await fetch(apiURL);
    return await response.json();
  }

  return (
    <div className="App">
      <p>{JSON.stringify(dataSource)}</p>
      {dataSource &&
        <>
          <div>
            Confirmed: {dataSource.confirmed.value}
          </div>
          <div>
            Recovered: {dataSource.recovered.value}
          </div>
          <div>
            Deaths: {dataSource.deaths.value}
          </div>
          <div>
            Last update: {dataSource.lastUpdate}
          </div>
        </>
      }
    </div>
  );
}

export default App;

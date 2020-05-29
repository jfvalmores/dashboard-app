import React, { useState, useEffect } from 'react';
import {
  Grid,
  Cell,
  Layout,
  Header,
  Drawer,
  Content,
  Navigation,
} from 'react-mdl';
import SelectField from './components/SelectField';
import DataSourceNode from './interfaces/DataSourceNode';
import OptionNode from './interfaces/OptionNode';
import StateNode from './interfaces/StateNode';

import SimpleBarChart from './components/SimpleBarChart';

const apiURL: string = 'https://covid19.mathdro.id/api';

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataSourceNode | null>(null);
  const [countries, setCountries] = useState<Array<OptionNode>>([]);
  const [graphList, setGraphList] = useState<Array<Object>>([]);
  const [state, setState] = useState<StateNode>({
    country: 'PHL',
    status: 'all'
  });

  useEffect(() => {
    getDataSource()
      .then(data => {
        console.log(data);
        setDataSource(data as DataSourceNode);
      })

    getCountries()
      .then((data: any) => {
        const dataProvider = data.countries.map(
          (country: any) => ({
            data: country['iso3'],
            label: country['name']
          })
        );
        console.log(dataProvider)
        setCountries(dataProvider);
      })

    getGraphData(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getDataSource = async () => {
    const response = await fetch(apiURL);
    return await response.json();
  }

  const getCountries = async () => {
    const response = await fetch(`${apiURL}/countries`);
    return await response.json();
  }

  const getGraphData = async (stateData?: StateNode) => {
    if (stateData) {
      const stats = stateData.status === 'all' ? 'confirmed' : stateData.status;
      const response = await fetch(`${apiURL}/countries/${stateData.country}/${stats}`);
      const data = await response.json();
      setGraphList(data);
    }
  }

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setState(prevState => {
      const nextState = {
        ...state,
        [id]: value,
      };

      getGraphData(nextState);
      return nextState;
    });
  }

  return (
    <div>
      <Layout fixedHeader>
        <Header title={<span>Dashboard</span>}>
          <Navigation>
            <a href="#">Link</a>
          </Navigation>
        </Header>
        <Drawer title="Title">
          <Navigation>
            <a href="#">Link</a>
          </Navigation>
        </Drawer>
        <Content style={{ padding: 10 }}>
          <div style={{ display: 'flex' }}>
            {dataSource &&
              <div>
                <h4>Worldwide</h4>
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
              </div>
            }
            <div>
              <h4>By Country</h4>
              <SelectField
                id="country"
                value={state.country}
                options={countries}
                handleChange={handleChange}
              />
              <SelectField
                id="status"
                value={state.status}
                options={[
                  { data: 'all', label: 'All' },
                  { data: 'confirmed', label: 'Confirmed' },
                  { data: 'recovered', label: 'Recovered' },
                  { data: 'deaths', label: 'Deaths' },
                ]}
                handleChange={handleChange}
              />
              <SimpleBarChart
                data={graphList}
                state={state}
              />
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;

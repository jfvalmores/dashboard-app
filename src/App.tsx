import React, { useState, useEffect } from 'react';
import {
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
    country: 'PH',
    status: 'confirmed'
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

    getGraphData()
      .then((data: any) => {
        setGraphList(data)
      })
  }, [])

  const getDataSource = async (): Promise<Object> => {
    const response = await fetch(apiURL);
    return await response.json();
  }

  const getCountries = async (): Promise<Object> => {
    const response = await fetch(`${apiURL}/countries`);
    return await response.json();
  }

  const getGraphData = async (): Promise<Object> => {
    const response = await fetch(`${apiURL}/countries/${state.country}/${state.status}`);
    return await response.json();
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setState(prevState => {
      const nextState = {
        ...state,
        [id]: value,
      };

      getGraphData();
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
        <Content>
          <div>
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
                { data: 'confirmed', label: 'Confirmed' },
                { data: 'recovered', label: 'Recovered' },
                { data: 'deaths', label: 'Deaths' },
              ]}
              handleChange={handleChange}
            />
            <SimpleBarChart data={graphList} />
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;

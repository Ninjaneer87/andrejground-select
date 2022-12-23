import * as React from 'react';
import Layout from './components/Layout';
import MultiSelect from './components/MultiSelect';
import Select, { Option } from './components/Select';
import './style.scss';

const options: Option[] = [
  { label: 'First', value: 1 },
  { label: 'Second', value: 2 },
  { label: 'Third', value: 3 },
  { label: 'Fourth', value: 4 },
  { label: 'Fifth', value: 5 },
  { label: 'Sixth', value: 6 },
  { label: 'Seventh', value: 7 },
];

export default function App() {
  const [selected, setSelected] = React.useState<Option | undefined>();
  const [selectedMulti, setSelectedMulti] = React.useState<Option[]>([]);

  return (
    <Layout>
      <Select 
        options={options} 
        selected={selected} 
        onChange={setSelected} 
      />
      <MultiSelect
        options={options}
        selected={selectedMulti}
        onChange={setSelectedMulti}
      />
    </Layout>
  );
}

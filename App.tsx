import * as React from 'react';
import Layout from './components/Layout';
import MultiSelect from './components/MultiSelect';
import Select from './components/Select';
import './styles/style.scss';
import { Option } from './types/option.type';

const options: Option[] = [
  { label: 'First option with a veeery long label', value: 1 },
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
      <h2>Select</h2>
      <Select 
        options={options} 
        selected={selected} 
        onChange={setSelected} 
      />

      <div className="divider" />
      
      <h2>Multi select</h2>
      <MultiSelect
        options={options}
        selected={selectedMulti}
        onChange={setSelectedMulti}
      />
    </Layout>
  );
}

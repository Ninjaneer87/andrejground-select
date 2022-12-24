import * as React from 'react';
import Layout from './components/Layout';
import MultiSelect from './components/MultiSelect';
import Select, { Option } from './components/Select';
import './styles/style.scss';

const options: Option[] = [
  { label: 'Firstoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoptionoption option, the one with a very long label', value: 1 },
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
      <h2>Regular select</h2>
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

      <div style={{width: 200}}>
        <MultiSelect
          options={options}
          selected={selectedMulti}
          onChange={setSelectedMulti}
        />
      </div>
    </Layout>
  );
}

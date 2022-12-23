import * as React from 'react';
import Layout from './components/Layout';
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
  const [value, setValue] = React.useState<Option | undefined>();

  return (
    <Layout>
      <Select options={options} value={value} onChange={setValue} />
    </Layout>
  );
}

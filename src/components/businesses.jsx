import { InfiniteList, Datagrid, TextField, DateField } from 'react-admin';

export const Businesses = () => (
  <InfiniteList>
    <Datagrid>
      <TextField source="id" />
      <TextField source="views" />
      <DateField source="name" />
    </Datagrid>
  </InfiniteList>
);
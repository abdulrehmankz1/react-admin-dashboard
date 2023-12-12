import { List, Datagrid, TextField, EmailField, DeleteButton } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';


const dataProvider = jsonServerProvider('https://dev-apis.explorebtk.com/api/v1/categories');

export const Categories = () => {
  return (
    <List dataProvider={dataProvider}>
      <Datagrid rowClick="edit">
        <TextField source="order" />
        <TextField source="_id" />
        <TextField source="name" />
        <TextField source="icon" />
        <EmailField source="color" />
        <TextField source="createdAt" />
        <TextField source="updatedAt" />
        <DeleteButton />
      </Datagrid>
    </List>
  )
}
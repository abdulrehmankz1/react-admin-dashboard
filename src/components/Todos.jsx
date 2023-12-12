import { List, Datagrid, TextField, EmailField, DeleteButton, InfiniteList } from 'react-admin';

export const Todos = () => {
  return (
    <List pagination={false}>
      <InfiniteList>
        <Datagrid rowClick="edit">
          <TextField source="userId" />
          <TextField source="id" />
          <TextField source="title" />
          <EmailField source="completed" />
          <DeleteButton />
        </Datagrid>
      </InfiniteList>
    </List>
  )
}
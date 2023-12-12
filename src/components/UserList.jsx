import { List, Datagrid, TextField, EmailField, DeleteButton, InfiniteList } from 'react-admin';

export const UserList = () => {
  return (
    <List pagination={false}>
      <InfiniteList>
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="username" />
          <EmailField source="email" />
          <TextField source="phone" />
          <TextField source="company" />
          <DeleteButton />
        </Datagrid>
      </InfiniteList>
    </List>
  )
}
import { List, Datagrid, TextField, EmailField, DeleteButton, InfiniteList } from 'react-admin';

export const Posts = () => {
  return (
    <List pagination={false}>
      <InfiniteList>
        <Datagrid rowClick="edit">
          <TextField source="userId" />
          <TextField source="id" />
          <TextField source="title" />
          <EmailField source="body" />
          <DeleteButton />
        </Datagrid>
      </InfiniteList>
    </List>
  )
}
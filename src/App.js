import { Admin, Resource, EditGuesser } from "react-admin";
import { UserList } from './components/UserList';
import jsonServerProvider from 'ra-data-json-server';
import { Categories } from "./components/Categories";
import { Posts } from "./components/Posts";
import { Todos } from "./components/Todos";
import AuthProvider from "./authProvider";

// const dataProvider = restProvider('http://localhost:3000');
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={AuthProvider}>
      <Resource
        name="posts"
        list={Posts}
        edit={EditGuesser}
      />
      <Resource
        name="todos"
        list={Todos}
        edit={EditGuesser}
      />
      <Resource
        name="users"
        list={UserList}
        edit={EditGuesser}
      />
      <Resource
        name="categories"
        list={Categories}
        edit={EditGuesser}
      />

      {/* <Resource name="posts" list={ListGuesser} />
      <Resource name="users" list={ListGuesser} />
      <Resource name="categories" list={ListGuesser} /> */}
    </Admin>
  );
}

export default App
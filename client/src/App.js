/* eslint-disable react/react-in-jsx-scope */
import Admin from './Routes/Admin';
import Users from './Routes/Users';
import { UserDetails } from './Context/Context';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <UserDetails>
        <Users />
      </UserDetails>
      <Admin />
    </>

  );
}

export default App;

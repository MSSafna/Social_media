
import Admin from './Routes/Admin';
import Users from './Routes/Users';
import { UserDetails } from './Context/Context';

function App() {
  return (
    <>
      <UserDetails >
        <Users  />
      </UserDetails>
      <Admin />
    </>

  );
}

export default App;

import React, { useEffect, useState } from 'react'
import { AppContext } from "./context/context";
import AppRoutes from "./routes/AppRoutes";
import { API_URL, TOKEN_KEY, doApiGet } from './services/apiService';


function App() {

  const [register, setRegister] = React.useState(true); // A variable related to the model when to show it and when not
  const [login, setLogin] = React.useState(false); // A variable related to the model when to show it and when not
  const [userData, setUserData] = useState(); // A variable to get the info of the user


  useEffect(() => {
    doApiUserInfo();
  }, [localStorage[TOKEN_KEY]])



  // The function makes an assignment to a variable to get the user's information
  const setUserInfo =  (data) => {
     setUserData(data);
  }

  // get the user info
  const doApiUserInfo = async () => {
    try {
      const url = API_URL + "/users/userInfo";
      const data = await doApiGet(url);
      setUserInfo(data);
    }
    catch (error) {

    }
  }

  return (
    <div>
      <AppContext.Provider value={{
        setRegister,
        setLogin,
        register,
        userData,
        login
      }}>
        <AppRoutes />
      </AppContext.Provider>
    </div>
  );
}

export default App;

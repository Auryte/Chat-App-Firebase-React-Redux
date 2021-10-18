import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from "./pages/AccountPage";
import './App.css';
import { getUserLoggedIn, getLoggedInUserData } from "./features/auth/selectors";
import { isLoggedInUser } from "./features/auth/auth.actions";


function App() {
  const loggedIn = useSelector(getUserLoggedIn);
  const user = useSelector(getLoggedInUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedIn ) {
      dispatch(isLoggedInUser())
    }
  }, [])
    

  return (
    <div className="App">
      {
        user !== undefined
          ?
          <Router>
            <Switch>
              {/* <PrivateRoute exact path="/" component={ChatPage} /> */}

              <Route exact="true" path="/login" >
                <LoginPage />
              </Route>
              <Route exact="true" path="/register">
                <RegisterPage />
              </Route>
              <Route exact="true" path="/account">
                {loggedIn ? <AccountPage /> : <Redirect to="/login" />}
              </Route>
              <Route path="/" >
                {loggedIn ? <ChatPage user={user} /> : <Redirect to="/login" />}
              </Route>
              <Route path="/:otherUserId" >
                {loggedIn ? <ChatPage user={user} /> : <Redirect to="/login" />}
              </Route>
              <Route path="/">
                404 page was not found
              </Route>
            </Switch>
          </Router>
          : 'loading...'
      }
    </div>
  );
}

export default App;

import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import NavBar from './NavBar'; 
import ActivittDashboard from '../../features/activities/dashboard/activitydashbord';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDeteils from '../../features/activities/deteils/ActivityDeteils';
  import TestErrors from '../../features/errors/TestErrors';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerErrors';
import LoginForm from '../../features/USers/LoginForm';
import { useStore } from '../stores/Store';
import { useEffect } from 'react';
import LoadingComponent from './Loadingcomponent';
import { ToastContainer } from 'react-toastify';
import ModelContainers from '../common/modals/ModelContainers';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';



function App() {

  const{commonstore,userstore}=useStore();
  const loacation=useLocation();

  useEffect(()=>{
    if(commonstore.token){
    userstore.getUser().finally(()=>commonstore.setAppLoaded());
    }else{
        commonstore.setAppLoaded();
  }
  },[commonstore,userstore])
  if(!commonstore.appLoaded) return<LoadingComponent  content="Loading APP..."/>
  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar/>
    <ModelContainers />
      <Route exact path='/' component={HomePage} />
      <Route
      path={'/(.+)'}
      render={()=>(
      <>
        <NavBar  />
      <Container style={{marginTop:'7em'}}>
        <Switch>
        <PrivateRoute exact path='/activities' component={ActivittDashboard} />
        <PrivateRoute  path='/activities/:id' component={ActivityDeteils} />
        <PrivateRoute key={loacation.key} path={['/createActivity','/manage/:id']} component={ActivityForm} />
        <PrivateRoute path='/profiles/:username' component={ProfilePage}/>
        <PrivateRoute path='/errors' component={TestErrors}/>
        <Route path='/server-error' component={ServerError}/>
        <Route component={NotFound}/>
        </Switch>
        
      </Container>
      </>

      )}
      />
    </>
  );
}

export default observer( App);

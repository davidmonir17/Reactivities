import { ReactComponentElement } from "react";
import { ReactCropperElement } from "react-cropper";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useStore } from "../stores/Store";

interface Props extends RouteProps{
    component:React.ComponentType<RouteComponentProps<any>>|React.ComponentType<any>;
}
export default function PrivateRoute({component: Component,...rest} :Props)
{
    const{userstore:{IsLoggedIn}}=useStore();
    return(
        <Route
        {...rest}
        render={(props)=>IsLoggedIn?<Component {...props}/>:<Redirect to='/'/>}
        />
    )
}
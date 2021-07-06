import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment ,Image, Button} from "semantic-ui-react";
import { useStore } from "../../app/stores/Store";
import LoginForm from "../USers/LoginForm";
import RegisterForm from "../USers/RegisterForm";

export default observer( function HomePage()
{       const{userstore,modelstore}=useStore();
    return(

    <Segment inverted textAlign="center" vertical className='masthead'>
        <Container text>
            <Header as ='h1' inverted> 
            <Image size='massive' src="/assets/logo.png" alt='logo' style={{marginBottom:12}} />
             Reactivities           
            </Header>
            {userstore.IsLoggedIn?(
                <>
                <Header as='h2'  inverted content="welcome to Reactivities"/>
                <Button as ={Link} to='/activities' size="huge" inverted >
                Go To Activities
                </Button>
                </>
                
            ):(
            <>
                <Button onClick={()=>modelstore.openModal(<LoginForm/>)} size="huge" inverted >
                Login!
                </Button>
                <Button onClick={()=>modelstore.openModal(<RegisterForm/>)} size="huge" inverted >
                Register!
                </Button>
            </>
            )}
            
            
        </Container>
    </Segment>

)

})

import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/Store";

export default function ServerError()
{
    const{commonstore}=useStore();
    return(
        <Container>
            <Header as="h1" content='server Error'/>
            <Header sub as='h5' color="red" content={commonstore.error?.Meesage} />
            {commonstore.error?.details&&
            <Segment>
                <Header as='h4' content='stack trace' color='teal' />
                <code style={{marginTop:'10px'}}>{commonstore.error.details}</code>
            </Segment>
            }
        </Container>
    )
}
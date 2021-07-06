import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound()
{
    return(
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                oops-- we've looked and not find this
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary >
                Return To Activities page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}
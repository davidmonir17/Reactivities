import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Activity } from '../../../app/models/activity'

interface Props
{
    activity:Activity;
}
export default observer(function ActivityDetailedSidebar ({activity:{attendence,host}}:Props) {
   if(!attendence) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendence.length} {attendence.length===1?'person':'People'} Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendence.map(atende=>(
                    <Item style={{ position: 'relative' }} key={atende.username}>
                        {atende.username===host?.username&&
                    <Label
                        style={{ position: 'absolute' }}
                        color='orange'
                        ribbon='right'
                    >
                        Host
                    </Label>}
                    <Image size='tiny' src={atende.image||'/assets/user.png'} />
                    <Item.Content verticalAlign='middle'>
                        <Item.Header as='h3'>
                            <Link to={`/profiles/${atende.username}`}>{atende.displayName}</Link>
                        </Item.Header>
                        {atende.following&&
                        <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>}
                    </Item.Content>
                </Item>

                    ))}
                    </List>
            </Segment>
        </>

    )
})


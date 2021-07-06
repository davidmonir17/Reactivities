import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, GridColumn, Loader} from "semantic-ui-react";
import { PagingParams } from "../../../app/models/Pagination";
import { useStore } from "../../../app/stores/Store";
import ActivityFilter from "./ActivityFilter";
import ActivityList from "./ActivityList";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";






export default observer( function ActivittDashboard()
{
    const{activityStore}=useStore();
    const{loadActivity,activityRegister,setPagingParams,pagination}=activityStore;
    const[loadingNext,setLoadingNext]=useState(false);
    function handleGetNext()
    {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage+1))
        loadActivity().then(()=>setLoadingNext(false));
    }
useEffect(()=>{
  if(activityRegister.size<=0)loadActivity();
},[activityRegister,loadActivity])
  


    return(
        <Grid>
            <GridColumn width='10'>
                {activityStore.loadingInitial&&!loadingNext?(
                    <>
                    <ActivityListItemPlaceholder />
                    <ActivityListItemPlaceholder />
                    </>
                ) :(
<InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalItems}
            initialLoad={false}
            >
            <ActivityList />
            </InfiniteScroll>
                )}
                        
            
            </GridColumn>
            <GridColumn width='6'>
                <ActivityFilter/>
            </GridColumn>
                <Grid.Column width={10}>
                    <Loader active={loadingNext}/>
                </Grid.Column>
            
        </Grid>
    )
} )
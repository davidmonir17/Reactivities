# "Reactivities"? Project- .Net Core & React
a Web app that lets a user to share our activities,join to activity.
The users can upload photos,make comments. can change in attributes of activity
and each activity show Who com to this activity.
Each user make Follow/Unfollow to other users. 
---
___
### In this app user will be able to:
* login \ Register
* If tries to navigate anywhere by entering the address in the address bar, He is asked to sign in and then the requested page is shown
* log out and log back in
* Filter activities by Host activity __ Going activities __ By date
* Create new  activity with description ,date ,location and category
* Join for activity and comment by signalr in the activity.
* Follow and Unfollow for other users
* see the count of following and followers users on the Profileboard
* Upload photos and choose one of them to make the main of your account
* user can show the past and future of his activites
* see a 404 page if is trying to access a page that does not exist

## Route

| Path  | Page |
| ------------- | ------------- |
|/account/login|Login|
|/account/register|Register|
|/profiles/:username| Profile |
| /activities  | activities dashboard  |
|/photos|Upload Photo|
|/photos/:id/setMain| Make the main photo|
| /activities/${id}  |  Activity Detailes |
|/follow/${username}?predicate=${predicate}| Following page|
|/activities| Create New Activity|

## Installation
get all dependencies
```
npm install
cd client-app
npm run
```
### Website Link
[Reactivities Link](https://dreactivities.herokuapp.com/)
## Demo
ScreenShots
![1](https://user-images.githubusercontent.com/34280997/125197375-a7347180-e25d-11eb-8f20-5c9cdcf96bdd.PNG)

Login View
![2](https://user-images.githubusercontent.com/34280997/125197391-b4516080-e25d-11eb-9df8-ee92a11744c6.PNG)

### Register form
![3](https://user-images.githubusercontent.com/34280997/125197392-b5828d80-e25d-11eb-8df1-d83aef0217cf.PNG)

### Activities Dashboard
![4](https://user-images.githubusercontent.com/34280997/125197393-b61b2400-e25d-11eb-8db3-6a444f6ab8dd.PNG)

### show who will going to this acivity and circule for the user that you make follow
![5](https://user-images.githubusercontent.com/34280997/125197397-b6b3ba80-e25d-11eb-9da9-9c7f306f8ec0.PNG)
### filter by Going
![6](https://user-images.githubusercontent.com/34280997/125197398-b7e4e780-e25d-11eb-8d3b-8cff4bcff120.PNG)
### create Activity
![7](https://user-images.githubusercontent.com/34280997/125197399-b87d7e00-e25d-11eb-9bd5-d20291440e14.PNG)

### ACtivity details
![8](https://user-images.githubusercontent.com/34280997/125197400-b9161480-e25d-11eb-8032-f6ef07e804ff.PNG)
### comment on ACtivity 
![9](https://user-images.githubusercontent.com/34280997/125197402-badfd800-e25d-11eb-8708-59cd92e54e21.PNG)
### list of profile or logout
![10](https://user-images.githubusercontent.com/34280997/125197404-bc110500-e25d-11eb-9030-8c5262b272a4.PNG)
### Profile page with count of followers and following
![11](https://user-images.githubusercontent.com/34280997/125197405-bca99b80-e25d-11eb-8286-b65f89691377.PNG)
### user Photo
![12](https://user-images.githubusercontent.com/34280997/125197407-bddac880-e25d-11eb-8ed0-04f562206680.PNG)
### Upload new Photo
![13](https://user-images.githubusercontent.com/34280997/125197408-bfa48c00-e25d-11eb-83af-6551397a32aa.PNG)
###  futuer events and past  events and  hosting events
![14](https://user-images.githubusercontent.com/34280997/125197409-c0d5b900-e25d-11eb-9e6b-53d676f63a1f.PNG)
### following people
![15](https://user-images.githubusercontent.com/34280997/125197411-c29f7c80-e25d-11eb-986f-1d8961032442.PNG)
### pages of error 
![16](https://user-images.githubusercontent.com/34280997/125197389-b3203380-e25d-11eb-8f7c-5e54ad8a923f.PNG)







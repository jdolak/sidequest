# TODO
### Callie
- [x] Finish wireframes
- [x] Upload component html as components
- [x] Sidebar goes over the page when not full screen
- [x] Remove hard coding from bet details/quest details
- [x] Group profile on sidebar
- [x] Protected route so that if you are not logged in, redirect to login 
- [x] Front-end for Accepted Quests
- [ ] Front-end for Accepted Bets
- [x] Front-end for My Quests
- [ ] Front-end for My Bets (resolve yes/no, add quantity available)
- [ ] move logout button to bottom of sidebar (Also maybe make this a circle?)
- [ ] make a settings icon below the logout button on the sidebar

### Jachob
- [x] Create endpoints
    - [x] Users
    - [x] Quests
        - [x] Userquests
        - [x] Openquests
    - [x] Bets
    - [x] Groups
- [x] logging
- [ ] bet resolution endpoints

### Patrick
- [x] Help Create Pages
- [x] Create Services to connect backend to frontend
    - [x] Bets
    - [x] Quests
    - [x] Users
    - [x] Groups
- [x] Pull and store data on front end (useEffect,useState)
    - [x] add bets apis that jachob added
- [x] add group id to relevant api requests and the end of the url
- [x] implement search page
    - [x] display results properly
- [x] enable endpoints for joining groups
- [x] only display accessible groups in sidebar
- [x] endpoints/implementation for creation
    - [x] quests
    - [x] groups
- [x] enable endpoints for creating groups
- [x] alert users on login fail
- [x] logout process
- [ ] enable theme change or light mode/dark mode
- [ ] endpoints for bet resolution

# Bugs and improvements
- Profile initial does not accurately reflect group name
- Once a group is joined, it still shows up on the screen.
- when you create a group you should be added to it automatically and taken to the group page
### Backend
- 500 error on bets/create
- creating bets, quests, and groups thows 400 bad req errors if any of the form fields are left blank.

## Nice to haves
- [ ] Duplicate bet at a different price option
- [ ] Price negotiation on bets (offer of a lower price)
- [ ] Quests expire after a certain amount of time
- [ ] Bets/Quests history on group dashboard
- [ ] Universal group?
- [ ] Allow the number of lots in a bet to be split between different takers
- [ ] When searching for groups filter server side rather than client side
- [ ] Make project responsive
- [ ] send data when searching for groups
- [ ] pretty way to display alert and confirm popups
- [ ] bet expected resolution date added through stack
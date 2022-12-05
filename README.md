# todolits-backed
backed

**This repository is a server for the ToDo list application with the ability to filter, sort and edit the post**


## Run app:

1 Clone repository


2 Run `npm install`


3 Run `npm link`


4 Run `npm start`


# Basic Features:


**Get request**
 `/tasks/${userId}` with params `pp` - post per page, `page` - current page for pagination,  `filterBy` - filter metod, `order` - sorting metod


**Post request** 
 `/task/${userId}` required fields in `body`: name of task


**Delete request** 
`/task/${userId}/{id}` delete task


**Patch request**
`/task/${userId}/{id}` update fields `name` or `done` in task



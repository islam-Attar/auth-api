# auth-api
authentication-authorization with RBAC (Role-Based Access control )

## UML
![](./lab07.png)




# lab summary :

created an express sever and exported the app and the start function . created a model for the user , has three columns the model name , the username and the password. created an index.js model for the seqluelize requiring , i required the user's model and the sequlize with the datatypes. inside index.js model i created a new instance of sequelize to connect between the databaseurl and the sequelize option. and exported the model after creating it ,and exported the sequalize instance. created the signin and signup routes. in the signup route i hashed the password and send the username and the password to the body. in sign in i had a middleware called (basicAuth) which takes the req,res,next, then it decoded the encoded username and password if the password for this usename matches the sign in credentials it will give the user the autherization to sign in else it will tell it's an invalid error. created class collection and v1 and v2 routes with adding new models.



# Link 

* [heroku app](https://islam-auth-api.herokuapp.com/)
* [pull request](https://github.com/islam-Attar/auth-api/pull/1)
* [Action Link](https://github.com/islam-Attar/auth-api/actions)

## WAYOUT - HOME ASSIGNMENT

This project was built as part of home assignment of WayOut company.  
It was built on Vue Framework at the front and expressJs in the back.

The Mission

Mission We would like to create an end-to-end web application, that
will help us manage our networks. The Backend should be written in
Node.js and expose a REST API, and the frontend should be a client
side Single page application written using an MV* framework of your
choice (React, Angular, Vue.js, Ember.js etc.). You can either use a
boilerplate, or write your code from scratch (for both FE and BE)
whatever works for you.

Requirement Please pay attention to good UI/UX, the devil is in the
details :)
User should be able to:
1. See a list of all networks
2. Drill down into a specific network details page
3. Edit specific network
4. Add a network to the list
5. Remove a network from the list 
6. Network definition
 - ID (UUID).
 - Name (String).
 - Time Created (Epoch timestamp).
 - Device Type (Enum) [D-Link,TP-Link,Netgear].
 - Last Successful Connection (Epoch timestamp).
 
 Installation:
 
-  clone project https://github.com/BungHolem32/WayOut.git
-  open terminal
-  cd into project-folder` cd projectFolder`
-  create `.env` file according to the `.env.example` and 
````
PORT=5000
WAY_OUT_DATABASE_NAME=wayout_networks
WAY_OUT_USER_NAME=test
WAY_OUT_PASSWORD=test
WAY_OUT_HOST=localhost
WAY_OUT_DIALECT=mysql
WAY_OUT_DATABASE_PORT=3306
WAY_OUT_DATABASE_PORT=3306
````
 
 The above related to the configuration that includes in the dockerfile inside `dockerized_database` . 
 feel free to use it or type mysql server of your own.
 
p.s: table name must be `networks`

- cd into server `cd server` 
- type `npm install`
- go back to the root folder `cd ..`
- cd into client `cd client` 
- create `.env` file with the following details according to `.env.example`

````
VUE_APP_BACKEND_URL=http://127.0.0.1:5000
VUE_APP_BASE_URL=http://172.24.192.33:8081
````

- type `npm install`
- go back to the root folder `cd ..`
- type `npm run server`
- open new terminal window
- type `npm client`

you should see some thing like that

````
   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   Serving!                                       │
   │                                                  │
   │   - Local:            http://localhost:58457     │
   │   - On Your Network:  http://10.0.75.1:58457     │
   │                                                  │  
   │   Copied local address to clipboard!             │
   │                                                  │
   └──────────────────────────────────────────────────┘
````
 enter one of the urls like that [http://localhost:58457/networks]
 
 enter one of these urls and if everything worked as expected you should see the network list
 
  
 Docker Mysql Server Installation:
 
- Open terminal 
- install docker according to the following details: [https://www.docker.com/get-started]
- cd into dockerized_database cd `dockerized_database`
- type `docker build -t test-mysql .`
- type `docker run -d -p 3306:3306 --name test-mysql -e MYSQL_ROOT_PASSWORD=root test-mysql`
- then you could enter to the database with the following details:

``` 
 user => test
 password => test
 port => 3306
 ```





# kafka-websocket-spring-react

This application is to demonstrate how websocket can be used to display live data
This also demonstrates how can we develop event driven application using kafka

### Application Projects

This application has following projects:

- ##### newsbroadcast-producer:-
  This service is having Kafka dependency to produce News (News-Aler/Breaking-News) events.

```
API URL:- http://localhost:7001/broadcastNewsAlert
Input Payload:-
{
"id": "",
"title": "First Breaking News",
"newsType": "BreakingNews",
"description": "First Breaking NewsFirst Breaking NewsFirst Breaking News"
}
```

- ##### newsbroadcast-service:-

  This is UI intefacing API. It has Kafka and Web-socket dependency.
  Kafka Consumer consumes any News produced by newsbroadcast-producer service.
  After consuming data, it will format appropriately and then notify UI using web-socket with the data.

- ##### newsbroadcast-ui:-
  This is UI application. On load it opens web-socket connection for any News update from newsbroadcast-service.
  Depending on data received from service it will enrich NewsAlert or BreakingNews.

# To run application locally follow following steps

- Run all Kafka level dependencies locally:-

```
Go through url below to configure and run Kafka locally:
https://github.com/Puneetkumar3011/kafka-java-spring
```

Once Kafka is up and running, download newsbroadcast-producer application
and run it on locally.

- Download newsbroadcast-service application and run it locally using IntelliJ

- Download newsbroadcast-ui application and perform following steps to run locally

```
- Open commaand promt and navigate to this folder
- Run npm install
- Once Installation done, Run npm start
- This will mmake application up and running
```

# Sunplot
Solr query editor and plotting application.

### Quickstart

To build the project, make sure you have Node.js installed (at least version 6)
and then `npm install` to install the dependencies.
The backend server will start on port 9090 and the frontend
can be accessed from http://localhost:3000/

Please ensure you have an instance of Solr running , any version greater than 6.6.
At this point update the details so that Sunplot is aware of Solr by clicking on the setting cog.
Once the URL and collection name is updated you are able to start using Sunplot with Solr.

To see it in action try using the following sample query:
```
let(a=array(1,2,3,4,5,6,7,8,9,10), 
    b=array(1,4,7,8,3,2,4,5,1,9), 
    c=array(1,4,1,4,1,2,4,5,1,9), 
    list(plot(type=line, x=a, y=b),
    plot(type=scatter, x=a, y=c)))
```

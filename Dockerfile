FROM tomcat:8-jre8-slim
COPY /services/News/target/News-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps
COPY /angular/NewsApi/dist/NewsApi/. /usr/local/tomcat/webapps/NewsApi
COPY tomcat-users.xml /usr/local/tomcat/conf

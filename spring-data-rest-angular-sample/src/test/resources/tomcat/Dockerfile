FROM tomcat:7-jre8

ADD files/wait-for-it.sh ./wait-for-it.sh

RUN chmod -R 777 ./wait-for-it.sh

ADD files/spring-data-rest-angular.war /usr/local/tomcat/webapps/
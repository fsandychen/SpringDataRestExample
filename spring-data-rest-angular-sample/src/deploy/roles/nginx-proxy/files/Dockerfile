FROM agilebot/nginx-proxy-base

ADD nginx.service /etc/service/nginx/run
RUN chmod +x /etc/service/nginx/run

ADD consul-template.service /etc/service/consul-template/run
RUN chmod +x /etc/service/consul-template/run

RUN rm -v /etc/nginx/conf.d/*
ADD nginx.conf /etc/consul-templates/nginx.conf

FROM nginx:1.8

#Install Curl
RUN apt-get update -qq && apt-get -y install curl

#Download and Install Consul Template
ENV CT_URL https://releases.hashicorp.com/consul-template/0.12.1/consul-template_0.12.1_linux_amd64.zip
RUN curl -L $CT_URL | \
tar -C /usr/local/bin --strip-components 1 -zxf -

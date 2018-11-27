FROM nginx

# Copy client side
COPY build/public /usr/share/nginx/html

# Copy server
COPY . .

RUN apt-get update -y && \
    apt-get install -y curl \
                       libcurl3 \
                       libcurl3-dev \
                       ngrep \
                       gnupg

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

EXPOSE 80
EXPOSE 3000

RUN npm install

CMD npm run server

FROM golang:1.19.5-alpine
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN bash gencert.bash
RUN go build -o main .
CMD [ "/app/main" ]
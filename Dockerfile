# production stage
FROM registry.cn-hangzhou.aliyuncs.com/skylark/saler-nginx:1.18.0-alpine
COPY ./conf /etc/nginx/conf.d
COPY ./dist /usr/share/nginx/html/pdgt
WORKDIR /usr/share/nginx/html
EXPOSE 9996
CMD ["nginx", "-g", "daemon off;"]


# pdgt:
#     container_name: 'pdgt'
#     image: registry.cn-hangzhou.aliyuncs.com/skylark/pdgt:1.0.0
#     volumes:
#     - ./config/pdgt/nginx/default.conf:/etc/nginx/conf.d/default.conf
#     ports: 
#      - 9994
#     command: nginx -g 'daemon off'
#     restart: on-failure:1

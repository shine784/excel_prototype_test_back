## Install
    npm install

## Database settings
현재 postgres database는 130 서버에 docker container로 동작 하고 있다.

database data는 postgres-data라는 docker volume에 저장된다.

##### docker volume 확인하기
    sudo docker volume ls
##### docker container가 죽었을 때
    sudo docker run -d --rm --user 1000:1000 -v postgres-data:/var/lib/postgresql/data -p 5432:5432 --name hypercell-db postgres:12.3
database에 대한 관리(admin)은 pgAdmin4 라는 툴을 사용한다. 이 또한 docker container로 서버를 운영하고 있다.

##### pgAdmin4 접속 방법
    http://192.168.13.130:5480 로 접속
    login email: top@tmax.com
    login pswd: top
##### pgAdmin4 docker container가 죽었을 때
    sudo docker run -d --rm --name hypercell-pgadmin -p 5480:80 -e 'PGADMIN_DEFAULT_EMAIL=top@tmax.com' -e 'PGADMIN_DEFAULT_PASSWORD=top' -d dpage/pgadmin4

환경 변수를 조정하여 login email/password 를 수정할 수도 있다.



## Server Start
    npm start
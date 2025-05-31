# install postgresql in your project:

`npm install pg`

# insert DB connection string into .env

`POSTGRES_URL=postgres://<username>:<password>@localhost:5432/<databaseName>`

# If you forgot password to postgresql:

- find pg_hba.conf file: `find / -name pg_hba.conf 2>/dev/null`
- edit it and change md5 to trust
- restart psql with brew `brew services restart postgresql@15`
- now you can login like `psql -d postgres`
- create new superuser `CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'manushka';`
- exit psql shell and edit the config again, change from trust to md5
- now you can login with a new user

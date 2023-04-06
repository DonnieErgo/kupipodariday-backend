## REST API for web app KupiPodariDay

API for a wish-list service where each registered user can say what kind of gift they would like and send money for a gift for another user, specifying the amount they are willing to spend on it.

### Stack
- [Swagger API](https://app.swaggerhub.com/apis/zlocate/KupiPodariDay/1.0.0)
- Nest.js / TypeScript
- PostgreSQL
- Typeorm 
- Passport

---

#### Local deployment
1. Clone the repository
2. Set up dependencies with `npm install`.
3. Build project via `npm run build`. The finished project is in the `build` folder
4. Create .env file
```js
PORT = [server port]
DATABASE_HOST = [database host]
DATABASE_PORT = [database port]
DATABASE_NAME = [database name]
DATABASE_TYPE = [database type]
DATABASE_USERNAME = [database user name]
DATABASE_PASSWORD = [database user password]
SALT = [`saltOrRounds` value for bcrypt]
JWT_SECRET = [jwt secret value]
```
5. Initialize DB with `npm run migrate:up`

#### DB
```bash
CREATE USER student WITH PASSWORD 'student';
```
```bash
CREATE DATABASE kupipodariday;
```
```bash
GRANT ALL PRIVILEGES ON DATABASE kupipodariday TO student;
```

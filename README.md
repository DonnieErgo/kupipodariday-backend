# REST API for web app КупиПодариДай

## Stack
- [описание API сервиса](https://app.swaggerhub.com/apis/zlocate/KupiPodariDay/1.0.0)
- Nest.js/TypeScript
- PostgreSQL

## DB
```bash
CREATE USER student WITH PASSWORD 'student';
```
```bash
CREATE DATABASE kupipodariday;
```
```bash
GRANT ALL PRIVILEGES ON DATABASE kupipodariday TO student;
```
```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

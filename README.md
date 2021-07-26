# Nest.js POC

My personnal tests for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage

```sh
# Create user
curl -X POST -d email=test@test.fr -d password=123456  localhost:3000/users

# Get token
curl -X POST -d email=test@test.fr -d password=123456  localhost:3000/auth

# Use token
export TKN="eyJhbGciOiJ...X4"
curl  -H "Authorization: Bearer $TKN"  localhost:3000/users/1
curl  -X PATCH -H "Authorization: Bearer $TKN" -d password=654321  localhost:3000/users/1
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

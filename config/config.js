module.exports = {
  development: {
    username: "postgres",
    password: "buyflow3rs",
    database: "bigleague",
    host: "localhost",
    dialect: "postgres",
    client: 'http://localhost:8080',
    secret: 'super secret secret squirrel'
  },
  production: {
    client: '',
  	db: '',
    secret: ''
  }
};

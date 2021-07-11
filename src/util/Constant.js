const databaseConfigs = {
  mysql: {
    jdbcHost: 'localhost',
    jdbcPort: 3306,
    jdbcUser: 'root',
    jdbcPassword: 'root',
  },
  sqlserver: {
    jdbcHost: 'localhost',
    jdbcPort: 1433,
    jdbcUser: 'sa',
    jdbcPassword: 'root',
  }
}

export {
  databaseConfigs
}

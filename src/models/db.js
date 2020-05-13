const db = [`CREATE TABLE IF NOT EXISTS subscribers (
    ID SERIAL PRIMARY KEY,
    email CHAR(100)
  )`
]

module.exports = db;
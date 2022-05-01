const Pool = require("pg").Pool;
const pool = new Pool({
  host: "localhost",
  database: "auction",
  tables: "benutzer",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM benutzer", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserByUserName = (request, response) => {
  const userName = request.params.userName;
  pool.query(
    `SELECT * FROM public.benutzer WHERE "userName" = $1`,
    [userName],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const { userName, name, email, adresse, password } = request.body;

  pool.query(
    "INSERT INTO benutzer ('userName', name, email, adresse, password) VALUES ($1, $2, $3, $4, $5)",
    [userName, name, email, adresse, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`User added with username: ${result.insertuserName}`);
    }
  );
};

const updateUser = (request, response) => {
  const userNam = parseInt(request.params.userName);
  const { userName, name, email, adresse, password } = request.body;

  pool.query(
    "UPDATE benutzer SET name = $1, email = $2 WHERE userName = $3",
    [userName, name, email, adresse, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with username: ${userName}`);
    }
  );
};

const deleteUser = (request, response) => {
  const userName = parseInt(request.params.userName);

  pool.query(
    "DELETE FROM benutzer WHERE userName = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with username: ${userName}`);
    }
  );
};

module.exports = {
  getUsers,
  getUserByUserName,
  createUser,
  updateUser,
  deleteUser,
};

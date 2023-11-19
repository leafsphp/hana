<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App();
$db = new Leaf\Db;

$db->connect(
  'eu-cdbr-west-03.cleardb.net',
  'heroku_fb1311a639bb407',
  'b9607a8a6d5ebb',
  'cc589b17'
);

$app->get('/', function () use($app, $db) {
  $result = $db
    ->query('
      DROP TABLE IF EXISTS users;
      CREATE TABLE users (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    ')
    ->execute();

  $app->response()->json($result);
});

$app->get('/insert', function () use($app, $db) {
  $result = $db
    ->query("
      INSERT INTO users (name, email)
      VALUES ('John Doe', 'johndoe@test.com')
    ")
    ->execute();

  $app->response()->json($result);
});

$app->get('/users', function () use($app, $db) {
  $users = $db->query('SELECT * FROM users')->get();

  $app->response()->json([
    'users' => $users,
  ]);
});

$app->run();

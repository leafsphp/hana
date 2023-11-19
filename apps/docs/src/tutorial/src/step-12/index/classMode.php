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

$app->get('/', function () use ($app, $db) {
  $db
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

  $db
    ->insert('users')
    ->params(['name' => 'John Doe', 'email' => 'johndoe@test.com'])
    ->execute();

  $users = // 1. New select query here

  $app->response()->json([
    'users' => $users,
  ]);
});

$app->run();

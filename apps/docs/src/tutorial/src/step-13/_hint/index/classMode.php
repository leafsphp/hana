<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App();

$app->cors();

$db = new Leaf\Db();
$auth = new Leaf\Auth();

$db->connect(
  'eu-cdbr-west-03.cleardb.net',
  'heroku_fb1311a639bb407',
  'b9607a8a6d5ebb',
  'cc589b17'
);

$app->post('/register', function () use ($app, $auth) {
  $user = $auth->register(
    $app->request()->get(['name', 'email', 'password'])
  );

  $app->response()->json([
    'status' => 'success',
    'message' => 'Registration successful',
    'data' => $user
  ]);
});

$app->run();

<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App();

$app->get('/', function () use($app) {
  $app->response()->json([
    'greeting' => 'Hello World'
  ]);
});

$app->get('/markup', function () use($app) {
  $app->response()->markup('<h2>Hello World</h2>');
});

$app->get('/page', function () use($app) {
  $app->response()->page('./page.html');
});

$app->get('/exit', function () use($app) {
  if (!file_exists('./page.html')) {
    $app->response()->exit('Folder not found');
  }

  $app->response()->page('./page.html');
});

$app->run();

<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App();

$app->get('/', function () {
  // 1. json output
});

$app->get('/markup', function () {
  // 2. markup output
});

$app->get('/page', function () {
  // 3. page output
});

$app->get('/exit', function () use ($app) {
  // 4. exit output
  $app->response()->page('./page.html');
});

$app->run();

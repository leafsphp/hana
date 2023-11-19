<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App();

$app->get('/', function () use ($app) {
  $data = $app->request()->get('country');
  $app->response()->json($data);
});

$app->put('/multi', function () use($app) {
  $data = $app->request()->get(['country', 'city']);
  $app->response()->json($data);;
});

$app->run();

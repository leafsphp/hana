<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App();

$app->cors();

$app->get('/', function () use($app) {
  $data = $app->request()->get('name');
  $app->response()->json($data);
});

$app->run();

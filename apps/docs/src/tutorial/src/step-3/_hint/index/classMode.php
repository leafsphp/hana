<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App();

$app->get('/', function () {
  echo "hello world";
});

$app->put('/custom', function () {
  echo "custom route";
});

$app->run();

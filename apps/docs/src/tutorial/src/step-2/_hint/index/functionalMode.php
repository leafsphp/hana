<?php

require __DIR__ . '/vendor/autoload.php';

app()->match('GET', '/', function () {
  echo "hello world";
});

app()->match('GET', '/custom', function () {
  echo "custom route";
});

app()->match('POST|PUT', '/upload', function () {
  echo "POST & PUT route";
});

app()->run();

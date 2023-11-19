<?php

require __DIR__ . '/vendor/autoload.php';

app()->cors();

app()->get('/', function () {
  $data = request()->get('name');
  response()->json($data);
});

app()->run();

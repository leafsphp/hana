<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $data = request()->get('country');
  response()->json($data);
});

app()->put('/multi', function () {
  $data = request()->get(['country', 'city']);
  response()->json($data);;
});

app()->run();

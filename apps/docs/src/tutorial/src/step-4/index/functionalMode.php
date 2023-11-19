<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  // 1. json output
});

app()->get('/markup', function () {
  // 2. markup output
});

app()->get('/page', function () {
  // 3. page output
});

app()->get('/exit', function () {
  // 4. exit output
  response()->page('./page.html');
});

app()->run();

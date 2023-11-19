<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  $isValid = form()->validate([
    'name' => 'text',
    'country' => ['required', 'text'],
    'city' => 'required',
    'email' => 'email',
  ]);

  response()->json(
    $isValid ? 'success' : form()->errors()
  );
});

app()->run();

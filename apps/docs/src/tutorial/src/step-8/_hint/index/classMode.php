<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App();

$app->get('/', function () use ($app) {
  $isValid = Leaf\Form::validate([
    'name' => 'text',
    'country' => ['required', 'text'],
    'city' => 'required',
    'email' => 'email',
  ]);

  $app->response()->json(
    $isValid ? 'success' : Leaf\Form::errors()
  );
});

$app->run();

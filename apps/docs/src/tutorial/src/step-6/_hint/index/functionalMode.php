<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/user/${username}', function ($username) {
  echo "hello, $username";
});

app()->get('/users/{uId}/posts/{pId}', function ($uId, $pId) {
  response()->markup("Post #$pId was created by user #$uId");
});

// username example using pcre
app()->get('/users/(\w+)', function ($username) {
  echo "hello, $username";
});

app()->run();

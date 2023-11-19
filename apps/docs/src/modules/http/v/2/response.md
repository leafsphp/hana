# Response
<!-- markdownlint-disable no-inline-html -->

The response object is an abstraction of your Leaf application’s HTTP response that is returned to the HTTP client.

## Using the Response object

Leaf offers a couple of ways to use the response object in your application.

### Response on the Leaf Instance

Since Response is already bound to the Leaf instance, you can do this:

<div class="class-mode">

```php{4}
$app = new Leaf\App;

$app->get("/text", function () use($app) {
  $app->response()->markup("This is text");
});
```

</div>
<div class="functional-mode">

```php{2}
app()->get('/text', function () {
  app()->response()->markup('This is text');
});
```

</div>

Although we've added this, we don't want to force you to do stuff in only one way, so you can still use the `v1.x` method.

<div class="class-mode">

### Initialising the Response object

With this method, you manually initialise the Response object, and then pass it into your route.

```php{2,6}
$app = new Leaf\App;
$response = new Leaf\Http\Response;

$app->post('/login', function () use($response) {
  // ...
  $response->json(['username' => $user]);
});
```

</div>
<div class="functional-mode">

### Functional Mode

Response also takes advantage of Leaf 3's functional mode with the `response` global which allows you quickly use the response object from wherever you are.

```php
response()->json([
  'status' => 'success',
  'data' => 'Hello',
]);
```

</div>

An HTTP response has three primary properties:

- Status
- Header
- Body

The response object provides helper methods, described next, that help you interact with these HTTP response properties.

## Method Chaining

Method chaining allows you to be more expressive with your code and basically fit everything better. There's just a single rule you need to follow here: ***the method you want to output should be the last thing you call.***

If you want to output some JSON with a header `something`, you should always set the header before calling the JSON method.

<div class="class-mode">

```php
// ☑️ CORRECT
$app->response()->withHeader('something', 'value')->json('data');

// ❌ HEADER ERROR
$app->response()->json('data')->withHeader('something', 'value');
```

</div>
<div class="functional-mode">

```php
// ☑️ CORRECT
response()->withHeader('something', 'value')->json('data');

// ❌ HEADER ERROR
response()->json('data')->withHeader('something', 'value');
```

</div>

## Response Methods

This section covers all methods provided in the response object which allow you to output some kind of data.

### `plain`

This method allows you to output plain text as your response. It takes in 2 parameters:

- the data to output
- http status code with 200 default (optional)

<div class="class-mode">

```php
$app->response()->plain('hello');
```

</div>
<div class="functional-mode">

```php
response()->plain('hello');
```

</div>

### `xml`

This method allows you to output xml as your response. It takes in 2 parameters:

- the data to output
- http status code with 200 default (optional)

<div class="class-mode">

```php
$app->response()->xml(
  '<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" version="1.0.0" />'
);
```

</div>
<div class="functional-mode">

```php
response()->xml(
  '<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" version="1.0.0" />'
);
```

</div>

### `json`

This method allows you output json as a response.

It takes in 3 parameters:

- The data to output
- The https status code of the data, default 200 (optional)
- Option to show/hide the status code in response body, default `false` (optional)

<div class="class-mode">

```php
$app->response()->json('Output', 200);
```

</div>
<div class="functional-mode">

```php
response()->json('Output', 200);
```

</div>

**Output**:

```json
"Output"
```

Showing the code in body:

<div class="class-mode">

```php
$app->response()->json('Output', 200, true);
```

</div>
<div class="functional-mode">

```php
response()->json('Output', 200, true);
```

</div>

**Output**:

```json
{
  "data": "Output",
  "status": {
    "code": 200,
    "message": "OK"
  }
}
```

### `page`

This is a method that outputs an HTML/PHP file. This method can also be used to achieve server side routing, for example:

<div class="class-mode">

```php
$app->get('/homepage', function () use($app) {
  $app->response()->page('link/to/home.html');
});
```

</div>
<div class="functional-mode">

```php
app()->get('/homepage', function () {
  response()->page('link/to/home.html');
});
```

</div>

With this, whenever the route `/homepage` is invoked, Leaf loads up `home.html` and outputs it to the user.

**Note** The `page` method has **NOTHING** to do with templating, it simply outputs an already defined web page.

For templating with Leaf, [look here](/modules/views/)

**Status Code:**

It takes in a status code as the second parameter.

<div class="class-mode">

```php
$app->response()->page('404.html', 404);
```

</div>
<div class="functional-mode">

```php
response()->page('404.html', 404);
```

</div>

### `markup`

This method outputs some HTML/PHP:

<div class="class-mode">

```php
$app->get('/homepage', function () use($app) {
  $app->response()->markup('<h2>Hello</h2>');
});
```

</div>
<div class="functional-mode">

```php
app()->get('/homepage', function () {
  response()->markup('<h2>Hello</h2>');
});
```

</div>

You might be wondering why we don't just use

```php
echo '<h1>hello</h1>';
```

The reason is, Leaf has default headers which set the content type to JSON, in order to correctly output HTML, you need to change this.... Leaf has taken care of this with a bunch of other things, all within `markup` and `page`.

You can also specify a status code:

<div class="class-mode">

```php
$app->response()->markup('<h2>Hello</h2>', 201);
```

</div>
<div class="functional-mode">

```php
response()->markup('<h2>Hello</h2>', 201);
```

</div>

### `download`

In v3, you can send a response which will be downloaded on the client. Note that in this case, the response should be a valid file.

<div class="class-mode">

```php
// using defaults
$app->response()->download('path/to/file.zip');

// syntax
$app->response()->download('path/to/file.zip', 'File name on client', 200);
```

</div>
<div class="functional-mode">

```php
// using defaults
response()->download('path/to/file.zip');

// syntax
response()->download('path/to/file.zip', 'File name on client', 200);
```

</div>

As shown above, it takes in 3 parameters:

- the file to send as response
- The name of the file to show to client (optional, defaults to original filename)
- Http status code (optional, defaults to 200)

<div class="class-mode">

```php
$app->response()->download('item.jpg', 'Profile Pic', 200);

// to skip setting a name
$app->response()->download('item.jpg', null, 201);

// PHP 8
$app->response()->download(
  file: 'item.jpg',
  code: 201
);
```

</div>
<div class="functional-mode">

```php
response()->download('item.jpg', 'Profile Pic', 200);

// to skip setting a name
response()->download('item.jpg', null, 201);

// PHP 8
response()->download(
  file: 'item.jpg',
  code: 201
);
```

</div>

### `noContent`

The HTTP 204 No Content success status response code indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page. This method allows you to quickly create a 204 response.

<div class="class-mode">

```php
$app->response()->noContent();
```

</div>
<div class="functional-mode">

```php
response()->noContent();
```

</div>

### `redirect`

This feature just simply allows you to send a redirect response which redirects to a different route.

<div class="class-mode">

```php
$userHasAuth = true;

if ($userHasAuth) {
  return $app->response()->redirect('/home');
}
```

</div>
<div class="functional-mode">

```php
$userHasAuth = true;

if ($userHasAuth) {
  return response()->redirect('/home');
}
```

</div>

You can also specify a status code:

<div class="class-mode">

```php
$app->response()->redirect('/home', 307);
```

</div>
<div class="functional-mode">

```php
response()->redirect('/home', 307);
```

</div>

### `exit`

This is a new method which allows you to output some data and close your app right after. This means that it acts as a sort of early-return for your app, so right after outputting some data, it quits and makes sure that no other code is executed from your app until the next request comes through.

It takes in 2 parameters: the data to output and the http status code (default: 500).

<div class="class-mode">

```php
$app->response()->exit('This will be output as markup');

// code below won't run
```

</div>
<div class="functional-mode">

```php
response()->exit('This will be output as markup');

// code below won't run
```

</div>

You can also output JSON.

<div class="class-mode">

```php
$app->response()->exit(['data' => 'This will be output as JSON'], 500);
```

</div>
<div class="functional-mode">

```php
response()->exit(['data' => 'This will be output as JSON'], 500);
```

</div>

## Headers

Headers are a way for your server to send additional information along with your request. This information can be anything from the type of content you're sending back, to the status code of your response, to the type of server you're using.

Leaf allows you to set headers for your response directly from the response object using the `withHeader()` method. It takes in 4 parameters:

- The header name or an array of headers (key-value pairs)
- The header value if header key is a string
- A boolean on whether to replace the header if it's already set
- An Http status code to associate to header.

<div class="class-mode">

```php
$app
  ->response()
  ->withHeader('something', 'something')
  ->withHeader('somethingAgain', 'something', true, 200)
  ->withHeader(['somethingElse' => 'another']);
```

</div>
<div class="functional-mode">

```php
response()
  ->withHeader('something', 'something')
  ->withHeader('somethingAgain', 'something', true, 200)
  ->withHeader(['somethingElse' => 'another']);
```

</div>

## Cookies

Cookies are small pieces of data that are stored on the client's computer by the web browser while browsing a website. Cookies were designed to be a reliable mechanism for websites to remember stateful information or to record the user's browsing activity.

Leaf allows you to set cookies for your response using the `withCookie()` method. It takes in 3 parameters:

- The name of the cookie
- The value of cookie
- When the cookie expires. Default: 7 days

<div class="class-mode">

```php
$app->response()->withCookie("name", "Michael", "1 day")->json('...');
```

</div>
<div class="functional-mode">

```php
response()
  ->withCookie("name", "Michael", "1 day")
  ->json('...');
```

</div>

### `withoutCookie()`

This method allows you to remove existing cookies from your response. So you're basically returning a response without selected cookies.

<div class="class-mode">

```php
$app->response()->withoutCookie("name")->json('...');

// cookie array
$app->response()->withoutCookie(["name", "something"])->json('...');
```

</div>
<div class="functional-mode">

```php
response()->withoutCookie("name")->json('...');

// cookie array
response()->withoutCookie(["name", "something"])->json('...');
```

</div>

## Flash messaging

Flash messages are a way to keep a message around for a single request. They're helpful for displaying status messages like "Item deleted successfully" or "Your changes have been saved."

Leaf allows you to set flash messages for your response using the `withFlash()` method. It takes in 2 parameters:

- The name of the flash message
- The value of the flash message

<div class="class-mode">

```php
$app->response()->withFlash('message', 'something')->redirect('/somewhere');
```

</div>
<div class="functional-mode">

```php
response()->withFlash('message', 'something')->redirect('/somewhere');
```

</div>

## Status

::: tip Info
You can directly set status codes on responses, however, you can use this method to declaratively set a status code for you Leaf responses or if you want to use PHP's output methods like <b>echo</b>
:::

The HTTP response returned to the client will have a status code indicating the response’s type (e.g. 200 OK, 400 Bad Request, or 500 Server Error). You can use the Leaf application’s response object to set the HTTP response’s status like this:

<div class="class-mode">

```php
$app->response()->status(400)->json(['message' => 'home']);
```

</div>
<div class="functional-mode">

```php
response()->status(400)->json(['message' => 'home']);
```

</div>

Or with a native PHP response:

<div class="class-mode">

```php
$app->response()->status(400);

echo 'This is the main output';
```

</div>
<div class="functional-mode">

```php
response()->status(400);

echo 'This is the main output';
```

</div>

You only need to set the response object’s status if you intend to return an HTTP response that does not have a 200 OK status.

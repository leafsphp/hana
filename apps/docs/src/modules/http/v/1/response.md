# Leaf Response
<!-- markdownlint-disable no-inline-html -->

::: warning Watch out
Leaf response is a class available on the leaf http module. Check out the [http module docs](/modules/http/) for installation instructions.
:::

The response object is an abstraction of your Leaf application’s HTTP response that is returned to the HTTP client. In v2, the response object has been directly bound to the main Leaf object.

## Using Response

### Static Response

Response allows you to call methods statically, which means you don't need to initialize the whole package. If you are using the http module out of leaf, this is also the way to go.

```php
Leaf\Http\Response::json(["name" => "mychi"]);

// or

use Leaf\Http\Response;

Response::json(["name" => "mychi"]);
```

### 🎄 Response on the Leaf Instance

Since Response is already bound to the Leaf instance, you can do this:

```php{4}
$app = new Leaf\App;

$app->get("/text", function () use($app) {
  $app->response()->markup("This is text");
});
```

Although we've added this, we don't want to force you to do stuff in only one way, so you can still use the `v1.x` method.

### 🎎 Initialising the Response object

With this method, you manually initialise the Response object, and then pass it into your route.

```php{2,6}
$app = new Leaf\App;
$response = new Leaf\Http\Response;

$app->post("/login", function () use($response) {
  // ...
  $response->json(["username" => $user]);
});
```

An HTTP response has three primary properties:

- Status
- Header
- Body

The response object provides helper methods, described next, that help you interact with these HTTP response properties.

<hr>

## throwErr

"What of error handling?". `throwErr` is just the right method for that. It returns JSON encoded data alongside a code just like `respondWithCode`, however unlike `respondWithCode`, `throwErr` ends the application just like an exception.

You can get more info on http status codes [here](https://www.restapitutorial.com/httpstatuscodes.html).

```php
$app->post('/name', function () use($app) {
  $name = $app->request->get("name");
  if (!$name) $app->response()->throwErr('Name is required', 500);

  // code below won't run since the app breaks on throwErr
});
```

If no code is passed in, throwErr will send a default `500` status code.

**Use message:**

Just like with `respondWithCode`, `throwErr` also allows you to use messages instead of codes which most users don't understand.

```php
$response->throwErr("error", 500, true);
```

<hr>

## plain

This method allows you to output plain text as your response. It takes in 2 parameters:

- the data to output
- http status code with 200 default (optional)

```json
response()->plain("hello");
```

## json

Json, a new method in v2.4, just as the name suggests allows you output json as a response.

It takes in 4 parameters:

- The data to output
- The https status code of the data, default 200 (optional)
- Option to show/hide the status code in response body, default `false` (optional)
- Option to use message instead of code, default `false` (optional)

```php
$response->json("Output", 200);
```

**Output**:

```json
"Output"
```

Showing the code in body:

```php
$response->json("Output", 200, true);
```

**Output**:

```json
{
  "data": "Output",
  "code": 200
}
```

Note that you can't use message and code at the same time

```php
$response->json("Output", 200, true, true);
```

**Output**:

```json
{
  "data": "Output",
  "message": "200 OK"
}
```

## page

This is a simple method that outputs a webpage. This method can also be used to achieve server side routing, for example:

```php
$app->get('/homepage', function () use($response) {
  $response->page('link/to/home.html');
});
```

With this, whenever the route `/homepage` is invoked, Leaf loads up `home.html` and outputs it to the user
renderMarkup()

**Note** `page` has **NOTHING** to do with templating, it simply outputs an already defined web page.

For templating with Leaf, [look here](/modules/views/)

**Status Code:**

In v2.4, you can add a status code to the page response as the second parameter.

```php
$response->page("404.html", 404);
```

## markup

This method outputs a string entered into it as markup with a content type of `text/html`:

For instance, with this code,

```php
$code = "<h2>Hello</h2>";
```

We simply pass it into the response...like this

```php
$app->get('/homepage', function () use($app) {
  $app->response()->markup($code);
});
```

You might be wondering why we don't just use

```php
echo "<h1>hello</h1>";
```

The reason is, Leaf has default headers which set the content type to JSON, in order to correctly output HTML, you need to change this....Leaf has taken care of this with a bunch of other things, all within `markup` and `page`

## download

In v3, you can send a response which will be downloaded on the client. Note that in this case, the response should be a valid file.

```php
response()->download('file.zip', 'File name on client', 200);
```

As shown above, it takes in 3 parameters:

- the file to send as response
- The name of the file to show to client (optional, defaults to original filename)
- Http status code (optional, defaults to 200)

```php
response()->download('item.jpg', 'Profile Pic', 200);
```

## Redirect

This feature just simply allows you to send a redirect response which redirects to a different route.

```php
// $userHasAuth: true

if ($userHasAuth) return $response->redirect("/home");
```

## Headers

An instance of `Leaf\Http\Headers` has been included in the response object. This allows you to quickly set response headers without including the Headers package.

```php
$app = new \Leaf\App;
$app->response()->headers->set('Content-Type', 'application/json');
```

You may also fetch `headers` from the response object’s headers property, too:

```php
$contentType = $response->headers->get('Content-Type');
```

If a header with the given name does not exist, `null` is returned. You may specify header names with upper, lower, or mixed case with dashes or underscores. Use the naming convention with which you are most comfortable.

## Status

::: tip Info
You can directly set status codes on responses, there's no need to use this method unless you want to use PHP's output methods like <b>echo</b>
:::

The HTTP response returned to the client will have a status code indicating the response’s type (e.g. 200 OK, 400 Bad Request, or 500 Server Error). You can use the Leaf application’s response object to set the HTTP response’s status like this:

```php
$app->response()->status(400);
```

You only need to set the response object’s status if you intend to return an HTTP response that does not have a 200 OK status. You can just as easily fetch the response object’s current HTTP status by invoking the same method without an argument, like this:

```php
$status = $response->status();
```

## 🍪 Cookies

You can also add a cookie using the response object. This uses Leaf Cookies.

### setCookie

This method uses [Leaf Cookie's set](/modules/cookies/#set)

```php
$app->response()->setCookie("name", "Michael");
```

### simpleCookie

This method uses [Leaf Cookie's simpleCookie](/modules/cookies/#simplecookie)

```php
$app->response()->simpleCookie("name", "Michael", "1 day");
```

### deleteCookie

This method uses [Leaf Cookie's unset](/modules/cookies/#unset)

```php
$app->response()->deleteCookie("name");
```

## Functional Mode
<!-- <Badge text="New" /> -->

Response also adds a new `response` global which allows you quickly use the response object from wherever you are.

```php
response()->json([
  "status" => "success",
  "data" => "Hello",
]);
```

You can also pass data directly to the response global. This will immediately call the `json` method above.

```php
response([
  "status" => "success",
  "data" => "Hello",
]);
```

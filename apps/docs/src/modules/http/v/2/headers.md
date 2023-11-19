# Headers
<!-- markdownlint-disable no-inline-html -->

This is a simple object which allows you to manage the way headers are used in your application. It contains methods to set and get headers in your app.

::: tip
You can still use most header methods from within the response and request objects, you can refer to those if you want to, however, this package comes with ore features and better useability.  
:::

To get started with the Headers object, you simply need to call whatever method you need on the `Leaf\Http\Headers` object. Since it's static, there's no need to initialize it.

## status

This method sets or returns the base HTTP status of a response. Response methods allow you to directly set http status codes, however, if you want to use PHP's native output methods, you can set the status code here.

```php
// ...
Leaf\Http\Headers::status(404);
echo 'Page not found';
```

You can also return the currently set status code.

```php
$code = Leaf\Http\Headers::status();
```

## `resetStatus`

If for some reason, you're not able to set the status using `status`, you can always fallback to `resetStatus`. This method uses PHP's inbuilt `http_response_code`.

```php
// ...
Leaf\Http\Headers::resetStatus(200);
echo 'Something here';
```

## `all`

This method returns all headers passed into your Leaf app. It takes in a single optional parameter, whether to sanitize header data or not, it is set to false by default.

```php
// will not sanitize headers
Leaf\Http\Headers::all();

// will not sanitize headers
Leaf\Http\Headers::all(false);

// will sanitize headers
Leaf\Http\Headers::all(true);
```

## `get`

This method as the name implies returns a particular header.

```php
$content = Leaf\Http\Headers::get('Content-Type');
```

You can also get multiple headers at the same time.

```php
$headerGroup = Leaf\Http\Headers::get(['Content-Type', 'Authorization']);
```

Just like `all`, you can also sanitize the information from `get`.

```php
$data = Leaf\Http\Headers::get('header', true);
```

## `set`

`set` allows you to add a new response header. It takes in 4 parameters:

- The header to to set
- Value for header
- Replace similar header?
- An http status code

```php
Leaf\Http\Headers::set('location', '/home', true, 302);
```

You can also set multiple values at once.

```php
Leaf\Http\Headers::set(['location' => '/home', 'something' => 'here']);
```

If you want multiple headers with the same name, you can set replace to `false`. This will force multiple headers of the same type.

```php
Leaf\Http\Headers::set([
  'WWW-Authenticate' => 'Negotiate',
  'WWW-Authenticate' => 'NTLM'
], null, false);
```

## `remove`

This method removes previously set headers.

```php
// single value
Leaf\Http\Headers::remove('WWW-Authenticate');

// multiple value
Leaf\Http\Headers::remove(['Content-Type', 'WWW-Authenticate']);
```

## `has`
<!-- <sup><Badge text="new" /></sup> -->

This method allows you to check if a header has been set in the current request. It returns `true` if the header has been set and `false` otherwise.

```php
if (Leaf\Http\Headers::has('X-SOME-HEADER')) {
  // do something nice
}
```

## Utility Header methods

Some shortcut methods have been prepared for the most used headers, so you won't need to stress yourself writing a bunch of stuff for simple tasks.

### contentPlain

This method set's the content type of the response to `text/plain`, it also takes in an HTTP status code.

```php
Leaf\Http\Headers::contentPlain(200);
echo 'plain text here';
```

### contentHtml

This method set's the content type of the response to `text/html`, it also takes in an HTTP status code.

```php
Leaf\Http\Headers::contentHtml(200);
echo 'html here';
```

### contentXml

This method set's the content type of the response to `application/xml`, it also takes in an HTTP status code.

```php
Leaf\Http\Headers::contentXml(200);
echo 'Xml here';
```

### contentJSON

This method set's the content type of the response to `application/json`, it also takes in an HTTP status code.

```php
Leaf\Http\Headers::contentJSON(200);
echo 'json here';
```

### accessControl

This method allows you to quickly set `Access-Control` headers in your app. It takes in 3 parameters:

- The header to set
- The value to set
- A status code (optional)

```php
Leaf\Http\Headers::accessControl('Allow-Origin', 'https://example.com', 200);
```

You can set mutiple access control headers at once:

```php
Leaf\Http\Headers::accessControl(['Allow-Origin' => '*', 'Allow-Headers' => '*']);
```

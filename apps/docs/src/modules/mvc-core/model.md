<!-- markdownlint-disable no-inline-html -->
# 📕 Core Model

## Overview

Leaf has provided a very simple core model for use in your applications. This core model is powered by the `Leaf ORM` and so all it's features are available for use in Leaf.

This **model** provides a beautiful, simple ActiveRecord implementation for working with your database. Each database table has a corresponding "Model" which is used to interact with that table. Models allow you to query for data in your tables, as well as insert new records into the table.

## Defining Models

To get started, let's create a simple model. If you are not using a Leaf framework like [Leaf MVC](https://leafmvc.netlify.com) or [Leaf API](https://github.com/leafsphp/leafAPI), you can create directory to hold all your application models. All your models should extend `Leaf\Model` class.

Before getting started, be sure to configure a database connection with a `.env` file. You can take a look at this [example env file](https://gist.github.com/mr-phlames/cbc85b7e4fa8ce5474aea0aec277c7f6).

## Leaf Model Conventions

Now, let's look at an example `Flight` model, which we will use to retrieve and store information from our `flights` database table:

```php
<?php

use Leaf\Model;

class Flight extends Model
{
    //
}
```

### Table Names

Note that we did not tell Leaf which table to use for our `Flight` model. By convention, the "snake case", plural name of the class will be used as the table name unless another name is explicitly specified. So, in this case, Leaf will assume the `Flight` model stores records in the `flights` table. You may specify a custom `table` by defining a table property on your model:

```php
<?php

use Leaf\Model;

class Flight extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'my_flights';
}
```

### Primary Keys

Leaf will also assume that each table has a primary key column named id. You may define a protected `$primaryKey` property to override this convention:

```php
<?php

use Leaf\Model;

class Flight extends Model
{
    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'flight_id';
}
```

In addition, Leaf assumes that the primary key is an incrementing integer value, which means that by default the primary key will automatically be cast to an int. If you wish to use a non-incrementing or a non-numeric primary key you must set the public `$incrementing` property on your model to false:

```php
/**
* Indicates if the IDs are auto-incrementing.
*
* @var bool
*/
public $incrementing = false;
```

If your primary key is not an integer, you should set the protected `$keyType` property on your model to string:

```php
/**
* The "type" of the auto-incrementing ID.
*
* @var string
*/
protected $keyType = 'string';
```

### Timestamps

By default, Leaf expects `created_at` and `updated_at` columns to exist on your tables. If you do not wish to have these columns automatically managed by Leaf, set the $timestamps property on your model to false:

```php
<?php

use Leaf\Model;

class Flight extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;
}
```

If you need to customize the format of your timestamps, set the `$dateFormat` property on your model. This property determines how date attributes are stored in the database, as well as their format when the model is serialized to an array or JSON:

```php
/**
* The storage format of the model's date columns.
*
* @var string
*/
protected $dateFormat = 'U';
```

If you need to customize the names of the columns used to store the timestamps, you may set the `CREATED_AT` and `UPDATED_AT` constants in your model:

```php
class Flight extends Model
{
    const CREATED_AT = 'creation_date';
    const UPDATED_AT = 'last_update';
}
```

### Database Connection

By default, all Leaf models will use the default database connection configured for your application. If you would like to specify a different connection for the model, use the `$connection` property:

```php
<?php

use Leaf\Model;

class Flight extends Model
{
    /**
     * The connection name for the model.
     *
     * @var string
     */
    protected $connection = 'connection-name';
}
```

<hr>

## Default Attribute Values

If you would like to define the default values for some of your model's attributes, you may define an $attributes property on your model:

```php
<?php

use Leaf\Model;

class Flight extends Model
{
    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'delayed' => false,
    ];
}
```

<hr>

## Retrieving Models

Once you have created a model and its associated database table, you are ready to start retrieving data from your database. Think of each Leaf model as a powerful query builder allowing you to fluently query the database table associated with the model. For example:

```php
<?php

$flights = Flight::all();

foreach ($flights as $flight) {
    echo $flight->name;
}
```

### Adding Additional Constraints

The Leaf all method will return all of the results in the model's table. Since each Leaf model serves as a query builder, you may also add constraints to queries, and then use the get method to retrieve the results:

```php
$flights = Flight::where('active', 1)->orderBy('name', 'desc')->take(10)->get();
```

> **You can check [here](https://laravel.com/docs/5.8/queries) for available queries on your models.**

### Refreshing Models

You can refresh models using the `fresh` and `refresh` methods. The `fresh` method will re-retrieve the model from the database. The existing model instance will not be affected:

```php
$flight = Flight::where('number', 'FR 900')->first();

$freshFlight = $flight->fresh();
```

The `refresh` method will re-hydrate the existing model using fresh data from the database. In addition, all of its loaded relationships will be refreshed as well:

```php
$flight = Flight::where('number', 'FR 900')->first();

$flight->number = 'FR 456';

$flight->refresh();

$flight->number; // "FR 900"
```

<hr>

## Inserting & Updating Models

### Inserts

To create a new record in the database, create a new model instance, set attributes on the model, then call the save method:

```php
<?php

// this is a controller file

// import model
require "Flight.php";

use Leaf\Controller;

class FlightController extends Controller
{
    public function store()
    {
        // Validate the request...

        $flight = new Flight;

        $flight->name = $this->request->name;

        $flight->save();
    }
}
```

In this example, we assign the name parameter from the incoming HTTP request to the name attribute of the `Flight` model instance. When we call the save method, a record will be inserted into the database. The created_at and updated_at timestamps will automatically be set when the save method is called, so there is no need to set them manually.

### Updates

The save method may also be used to update models that already exist in the database. To update a model, you should retrieve it, set any attributes you wish to update, and then call the save method. Again, the updated_at timestamp will automatically be updated, so there is no need to manually set its value:

```php
$flight = Flight::find(1);

$flight->name = 'New Flight Name';

$flight->save();
```

<hr>

Since Leaf Models use Eloquent, you can read more [here](https://laravel.com/docs/5.8/eloquent) to view available methods on the Eloquent object.

**Just remember, your models should extend `Leaf\Model` not `Eloquent`**

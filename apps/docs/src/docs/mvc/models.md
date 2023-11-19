# Models

<!-- markdownlint-disable no-inline-html -->

A model is a class that represents your application's data and business logic, and it is responsible for managing data storage, retrieval, and manipulation. The Model communicates with the View and the Controller to provide data and to update the application's state.

Each database table has a corresponding "Model" which is used to interact with that table. Models allow you to query for data in your tables, as well as insert new records into the table.

::: tip Base Model
Leaf Models are built on top of [Laravel's Eloquent ORM](https://laravel.com/docs/10.x/eloquent). This means that you can use all the features of Eloquent in your Leaf applications. You can find the documentation for Eloquent [here](https://laravel.com/docs/10.x/eloquent).
:::

## Defining Models

Your models can be found in the `app/models` directory in Leaf MVC and Leaf API. Your models can be created using the `php leaf g:model` command from the root of your project.

```bash
php leaf g:model User
```

This will create a `User.php` file in the `app/models` directory.

## Model Structure

Leaf MVC and Leaf API come with a base model class. This is to give you a place to configure all your models seamlessly without having access to the `Leaf\Model` file. It also allows you to add logic that you want to be available to all your models.

```php
class Flight extends Model
{
    //
}
```

## Leaf Model Conventions

Now, let's look at an example `Flight` model, which we will use to retrieve and store information from our `flights` database table:

```php
class Flight extends Model
{
    //
}
```

### Table Names

Note that we did not tell Leaf which table to use for our `Flight` model. By convention, the "snake case", plural name of the class will be used as the table name unless another name is explicitly specified. So, in this case, Leaf will assume the `Flight` model stores records in the `flights` table. You may specify a custom `table` by defining a table property on your model:

```php
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

## Default Attribute Values

If you would like to define the default values for some of your model's attributes, you may define an $attributes property on your model:

```php
<?php

namespace App\Models;

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

> **You can check [here](https://laravel.com/docs/10.x/queries) for available queries on your models.**

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

## Inserting & Updating Models

### Inserts

To create a new record in the database, create a new model instance, set attributes on the model, then call the save method:

```php
<?php

namespace App\Controllers;

use App\Models\Flight;

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

Since Leaf Models use Eloquent, you can read more [here](https://laravel.com/docs/10.x/eloquent) to view available methods on the Eloquent object.

## Next Steps

Follow along with the next steps to learn more about Leaf MVC.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/mvc/migrations">
    <h3 class="next-steps-link">DB Migrations</h3>
    <small class="next-steps-caption">Learn how to use DB migrations in your Leaf applications.</small>
  </a>
  <a class="vt-box" href="/docs/mvc/seeds">
    <h3 class="next-steps-link">DB Seeding</h3>
    <small class="next-steps-caption">Learn how to seed your database with information.</small>
  </a>
  <a class="vt-box" href="/modules/mvc-core/factories">
    <h3 class="next-steps-link">DB Factories</h3>
    <small class="next-steps-caption">Learn how to generate dummy information for your db seeds.</small>
  </a>
</div>

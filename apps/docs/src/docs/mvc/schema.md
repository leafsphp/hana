# Schema

<!-- markdownlint-disable no-inline-html -->

Schema is a simple, yet powerful tool for generating database migrations from JSON data. Instead of dealing with the stress of writing your database migrations from scratch and thinking about all the types of your data, you can simply create a JSON file with sample data and let Leaf do the rest.

## Writing your schema

Schema can be found in the `app/database/schema` folder. To get started, create a new JSON file in the the schemas directory. You can name it anything you want, but it's best to name it after the table you're creating as that is what Leaf will expect unless you specify otherwise.

We can start off by creating a `users.json` file. All that this file should contain is an example of what your data should look like. For example:

```json
{
  "id": 1,
  "username?": "username",
  "name": "Full Name",
  "created_at": "",
  "updated_at": ""
}
```

## Using your schema

To use your schema, you can call `Leaf\Schema::build` in your migration. It takes in the name of the schema file to build your migrations with.

```php{12}
...
use Leaf\Schema;

class CreateUsers extends Database {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::build("users");
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    $this->capsule::schema()->dropIfExists("users");
  }
}
```

In the example above, the `users` schema will be used to generate the migration. This means that the `users` table will be created in your database with the fields specified in the schema. To actually run the migration, you can use the `db:migrate` command.

```bash
php leaf db:migrate
```

Read more about [migrations](/docs/mvc/migrations).

## Data Types

Leaf Schema is flexible and allows you to specify the type of data you want to store in your database. For the most part, Leaf Schema will automatically detect the type of data you want to store, but you can also specify the type of data you want to store.

### Automatic Types

Leaf Schema will automatically detect the type of data you want to store in your database. For example, if you want to store a string in your database, you can simply specify the string in your schema.

```json
{
  ...
  "username": "username"
}
```

In the example above, the `username` field will be set to `$table->string` in the migration. This is the same as using `$table->string('username')` in your migration.

Automatic types are supported for the following types of data:

- string
- integer
- boolean
- float
- array (will be converted to `enum` in the migration)
- json (should be a stringified json object)

### Manually Adding Types

Leaf Schema supports all the types supported by Laravel's Schema Builder. You can specify the type of data you want to store in your database by using the type as the value of the field.

```json
{
  ...
  "username:text": "username"
}
```

In the example above, the `username` field will be set to `$table->text` in the migration. This is the same as using `$table->text('username')` in your migration.

<div class="vt-grid-list">
<a href="https://laravel.com/docs/10.x/migrations#column-method-bigIncrements" target="_blank">bigIncrements </a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-bigInteger" target="_blank">bigInteger </a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-binary" target="_blank">binary</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-boolean" target="_blank">boolean</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-char" target="_blank">char</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-dateTimeTz" target="_blank">dateTimeTz</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-dateTime" target="_blank">dateTime</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-date" target="_blank">date</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-decimal" target="_blank">decimal</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-double" target="_blank">double</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-enum" target="_blank">enum</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-float" target="_blank">float</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-foreignId" target="_blank">foreignId</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-foreignIdFor" target="_blank">foreignIdFor</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-foreignUlid" target="_blank">foreignUlid</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-foreignUuid" target="_blank">foreignUuid</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-geometryCollection" target="_blank">geometryCollection</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-geometry" target="_blank">geometry</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-id" target="_blank">id</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-increments" target="_blank">increments</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-integer" target="_blank">integer</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-ipAddress" target="_blank">ipAddress</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-json" target="_blank">json</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-jsonb" target="_blank">jsonb</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-lineString" target="_blank">lineString</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-longText" target="_blank">longText</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-macAddress" target="_blank">macAddress</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-mediumIncrements" target="_blank">mediumIncrements</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-mediumInteger" target="_blank">mediumInteger</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-mediumText" target="_blank">mediumText</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-morphs" target="_blank">morphs</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-multiLineString" target="_blank">multiLineString</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-multiPoint" target="_blank">multiPoint</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-multiPolygon" target="_blank">multiPolygon</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-nullableMorphs" target="_blank">nullableMorphs</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-nullableTimestamps" target="_blank">nullableTimestamps</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-nullableUlidMorphs" target="_blank">nullableUlidMorphs</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-nullableUuidMorphs" target="_blank">nullableUuidMorphs</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-point" target="_blank">point</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-polygon" target="_blank">polygon</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-rememberToken" target="_blank">rememberToken</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-set" target="_blank">set</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-smallIncrements" target="_blank">smallIncrements</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-smallInteger" target="_blank">smallInteger</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-softDeletesTz" target="_blank">softDeletesTz</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-softDeletes" target="_blank">softDeletes</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-string" target="_blank">string</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-text" target="_blank">text</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-timeTz" target="_blank">timeTz</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-time" target="_blank">time</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-timestampTz" target="_blank">timestampTz</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-timestamp" target="_blank">timestamp</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-timestampsTz" target="_blank">timestampsTz</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-timestamps" target="_blank">timestamps</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-tinyIncrements" target="_blank">tinyIncrements</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-tinyInteger" target="_blank">tinyInteger</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-tinyText" target="_blank">tinyText</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-unsignedBigIntger" target="_blank">unsignedBigInteger</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-unsignedDecimal" target="_blank">unsignedDecimal</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-unsignedInteger" target="_blank">unsignedInteger</a>
<a href="https://laravel.com/docs/10.x/mi grations#column-method-unsignedMediumInteger" target="_blank">unsignedMediumInteger</a>
<a href="https://laravel.com/docs/10.x/mi grations#column-method-unsignedSmallInteger" target="_blank">unsignedSmallInteger</a>
<a href="https://laravel.com/docs/10.x/mi grations#column-method-unsignedTinyInteger" target="_blank">unsignedTinyInteger</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-ulidMorphs" target="_blank">ulidMorphs</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-uuidMorphs" target="_blank">uuidMorphs</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-ulid" target="_blank">ulid</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-uuid" target="_blank">uuid</a>
<a href="https://laravel.com/docs/10.x/migrations#column-method-year" target="_blank">year</a>
</div>

## Nullable Fields

If you want to specify that a field should be nullable, you can use the `?` symbol after the field name. This is the same as using `$table->nullable()` in your migration.

```json
{
  ...
  "username?": "username"
}
```

### Nullable + Types

If you want to specify that a field should be nullable and also specify the type of data you want to store, you can use the `?` symbol after the field name and also specify the type of data you want to store after the `?` symbol, using `:`.

```json
{
  ...
  "username?:string": "username"
}
```

## `id`

The `id` type is used to specify that the field is an auto-incrementing primary key. This is the same as using `$table->bigIncrements('id')` in your migration. Setting a field to `id` will automatically set the field to be an auto-incrementing primary key.

```json
{
  "id": 1,
  ...
}
```

If you want to set a field to be an auto-incrementing primary key, but you don't want to set the field to `id`, you can use the `id` type in the key of the field using `:`.

```json
{
  "user_id : id": 1,
  ...
}
```

In the example above, the `user_id` field will be set to `$table->bigIncrements` in the migration. This is the same as using `$table->bigIncrements('user_id')` in your migration. Just as with the `id` type, Leaf Schema allows you to specify the name of the field with the type using `:`.

**The spaces around the `:` are optional, so you can also use `user_id:id`.**

## `timestamps`

The `timestamps` type is used to specify that the table should have `created_at` and `updated_at` fields. This is the same as using `$table->timestamps()` in your migration.

```json
{
  ...
  "timestamps": ""
}
```

## Foreign Keys

The `*` type is used to specify that the field should be a foreign key. This is the same as using `$table->foreignId` in your migration.

```json
{
  ...
  "user_id*": 1
}
```

## Soft Deletes

To specify that a table should have soft deletes, you can use the `softDeletes` key. This is the same as using `$table->softDeletes()` in your migration.

```json
{
...
"softDeletes": ""
}
```

## Remember Tokens

To specify that a table should have a remember token, you can use the `rememberToken` key. This is the same as using `$table->rememberToken()` in your migration.

```json
{
  ...
  "rememberToken": ""
}
```

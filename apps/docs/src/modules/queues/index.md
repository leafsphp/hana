# Queues

<!-- markdownlint-disable no-inline-html -->

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

During the development of your web application, there are tasks that can be time-consuming, such as parsing and storing a CSV file that has been uploaded. However, with Leaf, you have the advantage of easily creating queued jobs that can be processed in the background. By offloading these intensive tasks to a queue, your Leaf application can swiftly respond to web requests, resulting in improved speed and a better user experience for your customers.

<VideoDocs
  title="New to Queues/Jobs/Workers?"
  subject="Understanding queues & background processing"
  description="Watch the this video by Mateus Guimarães"
  link="https://www.youtube.com/embed/GsdfZ5TfGPw"
/>

## Queues in Leaf

Implementing a queuing system from scratch can be a daunting task, and can take a lot of time. For this reason, Leaf provides a unified API for using queues across a variety of different backends, such as Redis or your database.

<!-- such as Amazon SQS, BeanStalk, Redis, or your database. -->

::: warning Compatibility Note
Queues are only supported by Leaf MVC and Leaf API applications. We plan to add support for Leaf Core in the near future.
:::

## Installation

To get started with Queues in Leaf, you need to install the `leaf/queue` package:

```bash
leaf install queue
```

Or you can install it via composer:

```bash
composer require leafs/queue
```

After installing the package, you need to register the Leaf Queue commands in Aloe CLI. You can do this by adding the following line to your `leaf` file in the root of your Leaf MVC or Leaf API application:

```php
$console->register(\Leaf\Queue::commands());
```

This should give you access to the following commands:

- `php leaf g:job` - Generate a job class.
- `php leaf d:job` - Delete a job class.
- `php leaf queue:config` - Generate a queue configuration file.
- `php leaf queue:install` - Generate and run a migration file for the queue table.
- `php leaf queue:run` - Start the queue worker.

## Configuration

After installing the leaf queue package, you need to setup your queue configuration. Leaf provides a unified API for using queues across a variety of different backends, such Redis or your database, with plans to add support for Amazon SQS, BeanStalk, and others in the future. In your Leaf MVC and Leaf API applications, the queue configuration file is located at `config/queue.php`. This file allows you to configure all of your queue connections. By default, this file is not present in your application, so you need to create it using the following command:

```bash
php leaf queue:config
```

This will generate a `queue.php` file in your `config` directory. The file contains examples for configuring each queue driver that is supported by Leaf. Make sure to read the comments in the file and configure a queue connection before using the queue API.

## Configuration options

There are several configuration options available to you in the `config/queue.php` configuration file. These options are used to determine the connection information for your queues, as well as various other options such as queue retry settings, queue logging, queue worker sleep durations, and more.

### Adapter

The `adapter` option specifies the system that will be used to run your queues. Leaf supports `redis` and `db` as queue adapters. The `redis` adapter uses Redis as a queue backend, while the `db` adapter uses your database as a queue backend.

### Default

The `default` option specifies which of the queue connections found in your config should be used as the default connection for all queue operations. Leaf supports `redis`, `sqlite`, `mysql`, `pgsql`, and `sqlsrv` as queue connections. You can also specify a custom connection by providing the name of a connection that is defined in the `connections` array of your `config/queue.php` file.

### Connections

The `connections` option contains an array of all of the queue connections defined for your application. Each connection corresponds to a queue adapter supported by Leaf. For example, the following configuration defines a connection named `redis` that uses the `redis` adapter to connect to a Redis server:

```php
'connections' => [
  'redis' => [
    'host' => _env('REDIS_HOST', '127.0.0.1'),
    'port' => _env('REDIS_PORT', '6379'),
    'password' => _env('REDIS_PASSWORD', ''),
    'dbname' => _env('REDIS_DB', 0),
  ],

  ...
```

### Queue table

If you are using the `db` adapter, you will need to configure a database table to store your jobs. You can use the `table` option to specify the name of the table. By default, Leaf will use the `leafphp_main_jobs` table that is already included with your application. If you would like to use a different table, you should create the table and specify its name in your `config/queue.php` configuration file:

```php
'table' => 'leafphp_jobs',
```

### Worker Config

Worker config includes the default settings used by your worker when executing a job. These settings can be specified when dispatching a job, but if not specified, the worker will use these settings instead.

- delay: The number of seconds to wait before processing a job.
- delayBeforeRetry: The number of seconds to wait before retrying a job that has failed.
- expire: The number of seconds to wait before archiving a job that has not yet been processed.
- force: Whether to force the worker to process the job, even if it has expired or has reached its maximum number of retries.
- memory: The maximum amount of memory the worker may consume.
- quitOnEmpty: Whether the worker should quit when the queue is empty.
- sleep: The number of seconds to wait before polling the queue for new jobs.
- timeout: The number of seconds a child process can run before being killed.
- tries: The maximum number of times a job may be attempted.

## Connecting to your queue

As mentioned above, Leaf queue only supports `redis` and `db` as queue adapters. To connect to your queue, you need to specify the adapter and connection you want to use. You can do this by specifying the adapter and connection in the `config/queue.php` file:

```php
'adapter' => 'redis',
'default' => 'redis',
```

If you are using the `db` adapter, you will need to configure a database table to store your jobs. Leaf queue comes with a command to generate and run a migration file for the queue table. You can generate the migration file using the following command:

```bash
php leaf queue:install
```

Don't forget to change the `default` option in your `config/queue.php` file to the name of the connection you want to use.

After this is done, you can start adding jobs to your queue.

## Creating a job

Jobs are the tasks that you want to run in the background. For example, you may want to send an email to a user after they have registered for your application. Instead of sending the email directly from your controller, you can create a job that sends the email, and then dispatch the job to the queue. This way, the user will not have to wait for the email to be sent before they can continue using your application.

You can create a job using the `g:job` command:

```bash
php leaf g:job SendEmail
```

This will generate a `SendEmailJob` class in your `app/Jobs` directory. The class will contain a `handle` method that will be called when the job is processed by the queue. You can add any code you want to this method. For example, if you want to send an email, you can use the custom created `UserMailer` class to send the email:

```php
<?php

namespace App\Jobs;

use Leaf\Job;
use App\Mailers\UserMailer;

class SendEmailJob extends Job
{
    /**
     * Handle the job.
     *
     * @return void
     */
    public function handle($userId)
    {
       UserMailer::welcome($userId)->send();
    }
}
```

## Dispatching a job

After creating a job, you can dispatch it to the queue using the `dispatch()` method:

```php
\App\Jobs\SendEmailJob::dispatch();
```

Some jobs like the send email job above may require some data to be passed to the job. You can pass data to the job using the `with()` method:

```php
\App\Jobs\SendEmailJob::with($userId)->dispatch();
```

You can also pass an array of data to the `with()` method:

```php
\App\Jobs\SendEmailJob::with(['userId' => $userId])->dispatch();
```

## Specifying options for a job

In the config file, you can specify default options for your jobs. However, you can also specify options for a job when dispatching it to the queue. For example, if you want to delay a job for 5 minutes, you can do so by passing the `delay` option to the `dispatch()` method:

```php
\App\Jobs\SendEmailJob::with($userId)->dispatch(['delay' => 5]);
```

The available options are:

- delay: The number of seconds to wait before processing a job.
- delayBeforeRetry: The number of seconds to wait before retrying a job that has failed.
- expire: The number of seconds to wait before archiving a job that has not yet been processed.
- force: Whether to force the worker to process the job, even if it has expired or has reached its maximum number of retries.
- memory: The maximum amount of memory the worker may consume.
- timeout: The number of seconds a child process can run before being killed.
- tries: The maximum number of times a job may be attempted.

## Running the queue worker

After dispatching a job to the queue, you need to run the queue worker to process the job. You can do this by running the following command:

```bash
php leaf queue:run
```

This will start the queue worker and process any jobs that have been dispatched to the queue.

<!-- ## Deployment -->

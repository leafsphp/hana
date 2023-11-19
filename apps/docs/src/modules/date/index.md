<!-- markdownlint-disable no-inline-html -->
# Leaf Date

Leaf Date (now known as tick) is a minimalist PHP library that parses, validates, manipulates, and displays dates and times with a largely DayJS/MomentJS-compatible API. If you use DayJS, you already know how to use Tick.

```php
tick()->now(); // get the current timestamp
tick()->format('YYYY-MM-DD'); // format the current timestamp
tick()->startOf('month')->add(1, 'day')->set('year', 2018)->format('YYYY-MM-DD HH:mm:ss');
```

## Why Tick?

### 3kB

Less PHP to download, parse and execute, leaving more time for your code.

### Simple

Tick is a minimalist PHP library that parses, validates, manipulates, and displays dates and times a largely Day JS and Moment.js compatible API. If you use Day JS or Moment.js, you already know how to use Tick.

## Installation

You can install Tick through Leaf CLI:

```bash
leaf install date
```

Or with composer:

```bash
composer require leafs/date
```

## Date Operations

The documentation will cover methods divided into 4 categories:

- [Parsing](/modules/date/#parsing)
- [Manipulation](/modules/date/#manipulation)
- [Display](/modules/date/#display)
- [Querying](/modules/date/#querying)

## Parsing

Instead of modifying the native DateTime object, Tick creates a wrapper for the Date object. To get this wrapper object, simply call tick() with one of the supported input types.

```php
tick('2018-01-01 12:00:00'); // create a date from a string
tick(); // will use today's date
```

### The `tick()` function

Calling `tick()` without parameters returns a fresh Tick object. You can then use any of the tick methods to parse, manipulate, or display the date.

```php
$now = tick()
```

This is essentially the same as calling `tick('with today\'s date')`.

### String

Parse the given string in ISO 8601 format (a space instead of the 'T' is allowed) and return a Tick object instance.

```php
tick('2018-04-04T16:00:00.000Z')
tick('2018-04-13 19:18:17.040+02:00')
tick('2018-04-13 19:18')
```

### Date

Create a Tick object with a pre-existing native DateTime object.

```php
$d = new DateTime();
tick(d);
```

## Get + Set

Tick uses overloaded getters and setters, that is to say, calling these methods without parameters acts as a getter, and calling them with a parameter acts as a setter.

These map to the corresponding function on the native DateTime object.

```php
tick()->second(30); // set the second to 30
tick()->second(); // get the second
```

### Millisecond

Gets or sets the millisecond.

Accepts numbers from 0 to 999. If the range is exceeded, it will bubble up to the seconds.

```php
tick()->millisecond(); // gets current millisecond
tick()->millisecond(1); // returns new tick o->ject
```

### Second

Gets or sets the second.

Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the minutes.

```php
tick()->second(); // gets current second
tick()->second(1); // returns new tick object
```

### Minute

Gets or sets the minutes.

Accepts numbers from 0 to 59. If the range is exceeded, it will bubble up to the hour.

```php
tick()->minute(); // gets current minute
tick()->minute(59); // returns new tick object
```

### Hour

Gets or sets the hour.

Accepts numbers from 0 to 23. If the range is exceeded, it will bubble up to the day.

```php
tick()->hour(); // gets current hour
newDate = tick()->hour(12); // returns new tick object
```

### Date of Month

Gets or sets the day of the month.

Accepts numbers from 1 to 31. If the range is exceeded, it will bubble up to the months.

```php
tick()->date(); // gets day of current month
tick()->date(1); // returns new tick object
```

### Day of Week

Gets or sets the day of the week.

Accepts numbers from 0 (Sunday) to 6 (Saturday). If the range is exceeded, it will bubble up to other weeks.

```php
tick()->day(); // gets day of current week
tick()->day(0); // returns new tick object
```

### Month

Gets or sets the month.

Accepts numbers from 0 to 11. If the range is exceeded, it will bubble up to the year.

```php
tick()->month(); // gets current month
tick()->month(0); // returns new tick object
```

### Year

Gets or sets the year.

```php
tick()->year(); // gets current year
tick()->year(2000); // returns new tick object
```

### Get

String getter, returns the corresponding information getting from Tick object.
Units are case insensitive, short forms are case sensitive.

```php
tick()->get('year');
tick()->get('month'); // start 0
tick()->get('date');
tick()->get('hour');
tick()->get('minute');
tick()->get('second');
tick()->get('millisecond');
```

#### List of all available units

<!-- 3 column table populated with the data above -->
| Unit | Shorthand | Description |
| ----- | -------- | ----------- |
| date | D | Date of Month |
| day | d | Day of Week (Sunday as 0, Saturday as 6) |
| month | M | Month (January as 0, December as 11) |
| year | y | Year |
| hour | h | Hour |
| minute | m | Minute |
| second | s | Second |
| millisecond | ms | Millisecond |

### Set

Generic setter, accepting unit as first argument, and value as second, returns a new instance with the applied changes.

In general:

```php
tick()->set('date', 1);
tick()->set('month', 3); // April
tick()->set('second', 30);
```

For multiple set:

```php
tick()->set('hour', 5)->set('minute', 55)->set('second', 15);
```

## Manipulation

Once you have a Tick object, you may want to manipulate it in some way.

Tick supports method chaining like this:

```php
tick('2019-01-25')->add(1, 'day')->subtract(1, 'year')->year(2009)->toString()
```

### Add

Returns a cloned Tick object with a specified amount of time added.

```php
$a = tick();
$b = a->add(7, 'day')

// $a -> the original value and will not change
// $b -> the manipulation result
```

Units are case insensitive, short forms are case sensitive.

#### List of all available `add` units

| Unit          | Shorthand | Description                              |
| ------------- | --------- | ---------------------------------------- |
| `day`         | `d`       | Day                                      |
| `week`        | `w`       | Week                                     |
| `month`       | `M`       | Month                                    |
| `year`        | `y`       | Year                                     |
| `hour`        | `h`       | Hour                                     |
| `minute`      | `m`       | Minute                                   |
| `second`      | `s`       | Second                                   |
| `millisecond` | `ms`      | Millisecond                              |

### Subtract

Returns a cloned Tick object with a specified amount of time subtracted.

```php
tick()->subtract(7, 'year');
```

Units are case insensitive, and support plural and short forms.

[List of all available units](/modules/date/#list-of-all-available-add-units).

### Start of Time

Returns a cloned Tick object and set it to the start of a unit of time.

```php
tick()->startOf('year')
```

Units are case insensitive, and support plural and short forms.

#### List of all available `start` units

| Unit          | Shorthand | Description                              |
| ------------- | --------- | ---------------------------------------- |
| `year`        | `y`       | January 1st, 00:00 this year             |
| `month`       | `M`       | the first day of this month, 00:00       |
| `week`        | `w`       | the first day of this week, 00:00 (locale aware) |
| `date`        | `D`       | 00:00 today                              |
| `day`         | `d`       | 00:00 today                              |
| `hour`        | `h`       | now, but with 0 mins, 0 secs, and 0 ms   |
| `minute`      | `m`       | now, but with 0 seconds and 0 milliseconds |
| `second`      | `s`       | now, but with 0 milliseconds             |

### End of Time

Returns a cloned Tick object and set it to the end of a unit of time.

```php
tick()->endOf('month');
```

The list of all available units is the same as [startOf](/modules/date/#list-of-all-available-start-units).

## Display

Once parsing and manipulation are done, you need some way to display the Tick object.

### Format

Get the formatted date according to the string of tokens passed in.

To escape characters, wrap them in square brackets (e.g. [MM]).

```php
tick()->format();
// '2023-04-02T18:04:37+00:00'
// current date in ISO8601, without fraction seconds

tick('2019-01-25')->format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]');
// 'YYYYescape 2019-01-25T00:00:000Z'

tick('2019-01-25')->format('DD/MM/YYYY'); // '25/01/2019'
```

#### List of all available formats

| Format | Output | Description                              |
| ------ | ------ | ---------------------------------------- |
| `YY`   | `70`   | Two-digit year                           |
| `YYYY` | `1970` | Four-digit year                          |
| `M`    | `1-12` | The month, beginning at 1                |
| `MM`   | `01-12` | The month, 2-digits                      |
| `MMM`  | `Jan-Dec` | The abbreviated month name               |
| `MMMM` | `January-December` | The full month name |
| `D`    | `1-31` | The day of the month                     |
| `DD`   | `01-31` | The day of the month, 2-digits           |
| `d`    | `0-6`  | The day of the week, with Sunday as 0    |
| `dd`   | `Su-Sa` | The min name of the day of the week      |
| `ddd`  | `Sun-Sat` | The short name of the day of the week   |
| `dddd` | `Sunday-Saturday` | The name of the day of the week |
| `H`    | `0-23` | The hour                                 |
| `HH`   | `00-23` | The hour, 2-digits                       |
| `h`    | `1-12` | The hour, 12-hour clock                  |
| `hh`   | `01-12` | The hour, 12-hour clock, 2-digits        |
| `m`    | `0-59` | The minute                               |
| `mm`   | `00-59` | The minute, 2-digits                     |
| `s`    | `0-59` | The second                               |
| `ss`   | `00-59` | The second, 2-digits                     |
| `SSS`  | `000-999` | The millisecond, 3-digits              |
| `Z`    | `+01:00` | Offset from UTC, e.g. +01:00             |
| `ZZ`   | `+0100` | Offset from UTC, e.g. +0100              |
| `A`    | `AM`   | AM, PM                                   |
| `a`    | `am`   | am, pm                                   |

### Time from Now

Returns the string of relative time from now.

@>RelativeTime

```php

tick('2013-01-01')->fromNow(); // 10 years ago
```

If you pass true, you can get the value without the prefix/suffix.

```php

tick('2013-01-01')->fromNow(true); // 10 years
```

### Time from X

Returns the string of relative time from X.

```php
tick('1999-01-01')->from('2000-01-01'); // a year ago
```

If you pass true, you can get the value without the suffix.

```php
tick('1999-01-01')->from('2000-01-01', true); // a year
```

### Time to Now

Returns the string of relative time to now.

```php

tick('2033-01-01')->toNow(); // in 10 years
```

If you pass true, you can get the value without the prefix/suffix.

```php

tick('2033-01-01')->toNow(true); // 10 years
```

## Querying

There are several methods to query a Tick object.

### Is Before

This indicates whether the Tick object is before the other supplied date-time.

```php
tick()->isBefore('2011-01-01');
```

### Is Same

This indicates whether the Tick object is the same as the other supplied date-time.

```php
tick()->isSame(new \DateTime('2011-01-01'));
```

### Is After

This indicates whether the Tick object is after the other supplied date-time.

```php
tick()->isAfter('2011-01-01');
```

### Is Between

This indicates whether the Tick object is between two other supplied date-time.

```php

tick('2010-10-20')->isBetween('2010-10-19', new \DateTime('2010-10-25'));
```

### Is Between Or Equal

This indicates whether the Tick object is between two other supplied date-time or equal to one of them.

```php

tick('2010-10-20')->isBetweenOrEqual('2010-10-19', new \DateTime('2010-10-25'));
```

### Is same day

This indicates whether the Tick object is the same day as the other supplied date-time.

```php
tick('2010-10-20')->isSameDay('2010-10-20');
```

### Is same month

This indicates whether the Tick object is the same month as the other supplied date-time.

```php


tick('2010-10-20')->isSameMonth('2010-10-20');
```

### Is same year

This indicates whether the Tick object is the same year as the other supplied date-time.

```php
tick('2010-10-20')->isSameYear('2010-10-20');
```

### Is Leap Year

This indicates whether the Tick object's year is a leap year or not.

```php
tick('2000-01-01')->isLeapYear(); // true
```

### Is DateTime

This indicates whether the Tick object is a DateTime object or not.

```php
tick()->isDateTime('2000-01-01'); // false
```

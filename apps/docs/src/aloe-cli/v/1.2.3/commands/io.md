# Aloe CLI: Command IO

Command IO deals with how info flows in and out of your command. Aloe provides very simple ways to deal with both input and output from your commands.

## Command Input

Aloe provides a bunch of methods that allow users to make some form of input into the command. Just like the rest of Leaf, aloe prioritizes simplicity, and so, you can do almost anything you need in 1 line of code. All of these methods are already available once you extend the Aloe Command class and will be accessible on `$this`. Let's look at these methods.

### input

This method can return an input argument or the whole symfony console input object.

```php
public function handle()
{
    // returns the name argument
    $name = $this->input("name");

    // returns the whole whole input object
    $input = $this->input();

    // so you can do this
    $name = $input->getArgument("name");
}
```

### setArgument

This method tells Aloe that your command is expecting an argument, it's typically used inside the `config` method.

It typically follows the same convention as symfony console's `addArgument` except that instead of passing in `InputArgument::state`, you just pass in the state as a string.

Instead of `InputArgument::REQUIRED`, you just pass in `"required"`, any case is supported.

```php
public function config()
{
    $this->setArgument("name", "required");
}
```

### argument

This method returns the value for a given argument passed into the command.

```php
$name = $this->argument("name");
```

### arguments

This method returns all the given arguments merged with the default values.

```php
$name = $this->arguments("name");
```

### setOption

This method tells Aloe that your command is expecting an inoput option, it's typically used inside the `config` method.

It typically follows the same convention as symfony console's `addOption` except that instead of passing in `InputOption::state`, you just pass in the state as a string.

Instead of `InputOption::VALUE_REQUIRED`, you just pass in `"required"`, any case is supported.

```php
public function config()
{
    $this->setOption("name", "n", "required");
}
```

### option

This method returns the value for a given option passed into the command.

```php
$name = $this->option("name");
```

### options

This method returns all the given options merged with the default values.

```php
$name = $this->options("name");
```

### ask

This method displays some output and returns a value from the expected input, in short, it asks a question and returns the users answer.

```php
// default value yes
$shouldDelete = $this->ask("Delete file?", "yes");

if ($shouldDelete === "yes") {
    // delete file
}
```

### askRaw

This method displays some output and returns a value from the expected input as is, in short, it asks a question and returns the exact unformatted answer.

```php
// default value yes
$shouldDelete = $this->ask("Delete file?", "yes");

if ($shouldDelete === "yes") {
    // delete file
}
```

### autoComplete

Ask a question but provide auto completion for possible answers.

```php
// possible answers are an array of
// auto complete values
$answers = [
    "answer 1",
    "answer 2"
];
$answer = $this->autoComplete($question, $answers, $default);

// example
$job = $this->autoComplete("what's your job?", [
    "lawyer",
    "doctor"
]);
```

### choice

Ask a question where 1 answer must be selected from a bunch of possible answers.

```php
$answers = [
    "answer 1",
    "answer 2"
];
$answer = $this->choice($question, $answers, $errorMessage, $default);

// example
$answer = $this->choice("What fruit do you like?", [
    "fruit 1",
    "fruit 2"
]);
```

### multiChoice

Ask a question where multiple answers can be selected from a bunch of possible answers.

```php
$answers = [
    "answer 1",
    "answer 2"
];
$answer = $this->multiChoice($question, $answers, $errorMessage, $default);

// example
$answer = $this->multiChoice("What fruit do you like?", [
    "fruit 1",
    "fruit 2"
]);
```

### secret

This method prompts a user for input, but hides the keystrokes

```php
$password = $this->secret("Confirm your password");
```

### confirm

Prompts the user for confirmation (y/n)

```php
if ($this->confirm("Send cash?")) {
    // send money
} else {
    // cancel
}
```

## Command Output

Just like input methods, there are a bunch of output methods and helpers that help you output information from your command. Let's look at these methods.

### output

This method can output some info or return the whole symfony console output object.

```php
public function handle()
{
    // outputs some data
    $this->output("This is output");

    // returns the whole whole output object
    $output = $this->output();

    // so you can do this
    $name = $output->writeln("This is output");
}
```

### write

Writes a message to the output.

```php
$this->write("This is some output");
```

### writeln

Writes a message to the output and adds a newline at the end.

```php
$this->writeln("This is some output");
```

### comment

Writes a comment styled message to the output and adds a newline at the end.

```php
$this->comment("This is some output");
```

### info

Writes a info styled message to the output and adds a newline at the end.

```php
$this->info("This is some output");
```

### error

Writes a error styled message to the output and adds a newline at the end.

```php
$this->error("This is some output");
```

### question

Writes a question styled message to the output and adds a newline at the end.

```php
$this->question("This is some output");
```

### link

Writes a link to the output and adds a newline at the end.

```php
$this->link("https://mychi.netlify.app", "Mychi");
```

## IO Helper Methods

These are helper methods that can be called inside your commands anywhere. These methods typically give option to your input or output.

### asQuestion

asQuestion does pretty much the same thing as `question` above, except that `asQuestion` simply returns the `question` styles for text.

```php
$this->writeln("Question: " . asQuestion(" ...?"));
```

This allows you to use the question output style for only a section of your output.

### asComment

asComment does pretty much the same thing as `comment` above, except that `asComment` simply returns the `comment` styles for text.

```php
$this->writeln("Comment: " . asComment(" ..."));
```

This allows you to use the comment output style for only a section of your output.

### asInfo

asInfo does pretty much the same thing as `info` above, except that `asInfo` simply returns the `info` styles for text.

```php
$this->writeln("Info: " . asInfo(" ..."));
```

This allows you to use the info output style for only a section of your output.

### asError

asError does pretty much the same thing as `error` above, except that `asError` simply returns the `error` styles for text.

```php
$this->writeln("Error: " . asError(" ..."));
```

This allows you to use the error output style for only a section of your output.

### asLink

asLink does pretty much the same thing as `link` above, except that `asLink` simply returns the `link` option for text.

```php
$this->writeln("link: " . asLink("https://...", "display text"));
```

This allows you to display a link on only part of your output.

## Next Steps

- [G Commands](/aloe-cli/v/1.2.3/commands/g-commands)
- [Custom commands](/aloe-cli/v/1.2.3/commands/custom)
- [Commands IO](/aloe-cli/v/1.2.3/commands/io)
- [DB commands](/aloe-cli/v/1.2.3/commands/db-commands)

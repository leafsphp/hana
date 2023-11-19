# Working with files

Leaf provides a filesystem module which allows you create and manipulate files and directories in a system. Leaf FS comes with a ton of features for different purposes. In this exercise, we'll look at creating, renaming, reading, writing and deleting files/folders.

## CREATING FOLDERS

Leaf FS a simple method to create a folder. The method is called `mkdir` and it takes a single argument which is the path to the folder you want to create.

```php
Leaf\FS::createFolder("new_logs");
```

This method will create a folder called `new_logs` in the current directory. You can also create a folder in a different directory by passing the path to the folder as the first argument.

```php
Leaf\FS::createFolder("logs/new");
```

You can try this out in the editor.

## CREATING FILES

Just as with folders, Leaf also has a method to create files. The method is called `createFile`.

```php
Leaf\FS::createFile("items.txt");
Leaf\FS::createFile("home/items.txt");
```

## ADDING CONTENT TO A FILE

Since you can create a file, there needs to be a way to add content to it. Leaf FS has a method called `writeFile` which takes two arguments. The first argument is the path to the file and the second argument is the content you want to add to the file.

```php
Leaf\FS::writeFile("items.txt", "Hello");
Leaf\FS::writeFile("items.txt", [
  "name" => "Item 1"
]);
Leaf\FS::writeFile("items.txt", 1);
```

Note that if the file doesn't exist, Leaf will automatically create it for you.

You can [read the FS docs](/modules/fs/#fs-file-methods) for more information on the methods available.

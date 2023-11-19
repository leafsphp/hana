---
title: "Leaf FileSystem"
---

<!-- markdownlint-disable no-inline-html -->
# Leaf FS

This is a simple functionality inspired by node js' FileSystem(fs) module. Leaf FS aims to make directory and file management much simpler than what you're currently used to, so as to speed up and ease the dev process.

Leaf FS allows you to read/write to file, create, rename, copy and paste files/directories all with just a few lines of code. All this is performed while maintaining Leaf's simplicity.

## Installation

You can install leaf fs through composer:

```bash
composer require leafs/fs
```

or with leaf cli:

```bash
leaf install fs
```

## FS Directory Methods

### createFolder

This will create a new directory in the `current directory`

Let's take this directory structure below, we initialise Leaf FS in our index.php file.

```bash
├───logs
├───index.php
```

In our index.php file:

```php
FS::createFolder("new_logs");
```

After running this code, this is our new directory structure

```bash
├───logs
├───new_logs
├───index.php
```

### renameFolder

renameFolder is used to rename a directory. It takes in two parameters: the directory you want to rename and it's new name/path.

```php
FS::renameFolder("new");
FS::renameFolder("home/new", "home/items");
```

### deleteFolder

deleteFolder is used to delete a directory. It takes in two parameters: the directory you want to delete.

```php
FS::deleteFolder("new", "items");
FS::deleteFolder("home/new", "home/items");
```

### listDir

listDir returns an array of all the files/folders in a directory. It takes in the directory to list and a search pattern eg: `*.php`. Also note that all folders end with a '/'

```php
FS::listDir("new");
FS::listDir("home/new", "*.txt");
```

### listFolders

This method lists all the folders in a particular directory.

```php
FS::listDir("folder");
```

## FS File Methods

### createFile

`createFile` is used to create a new file in the `current directory`. It takes in the filename or path+filename. If the file already exists, it gives the new file a different name.

```php
FS::createFile("items.txt");
FS::createFile("home/items.txt");
```

### writeFile

`writeFile` is used to add content to a file, if the file already has content, all the content in there is replaced with the new content. Also, if the file doesn't exist, it will be created and all the content will be added to it. It takes in 2 parameters, the name/path+name of the file and the content;

```php
FS::writeFile("items.txt", "Hello");
FS::writeFile("items.txt", [
  "name" => "Item 1"
]);
FS::writeFile("items.txt", 1);
```

### append

append is almost exactly the same as writeFile, except that instead of replacing the content in a file, it adds to the end of it.

```php
$data = FS::append("items.txt", "Item name");
```

### prepend

prepend is almost exactly the same as writeFile, except that instead of replacing the content in a file, it adds to the begining.

```php
$data = FS::prepend("items.txt", "Item name");
```

### readFile

readFile returns the data found in a file. It takes 1 parameter: the file name/path+file name.

```php
$data = FS::readFile("./home/items.txt");
```

### renameFile

renameFile renames a file. It takes 2 parameter: the file name/path+file name to rename and it's new name.

```php
$data = FS::renameFile("./home/items.txt", "home/products.txt");
```

### deleteFile

deleteFile deletes a file. It takes 2 parameter: the file name/path+file name to delete.

```php
$data = FS::deleteFile("./home/items.txt");
```

### copyFile

copyFile copies a file from the current directory to another directory. It takes in 3 parameters: the filename, the new path + filename and whether to rename the file if it exists in the new directory. The 3rd parameter is optional, if nothing is passed for the 3rd parameter, it will rename the file. Pass in true to rename the file if it already exists, false to override the file content(default is true).

```php
$data = FS::copyFile("items.txt", "./home/");
$data = FS::copyFile("items.txt", "./home/", false);
```

### deepCopy

Recursively copy through a folder.

```php
FS::deepCopy("source", "destination");
```

### superCopy

Copy a file, or recursively copy a folder and its contents. Based on [Aidan Lister's copyr](http://aidanlister.com/2004/04/recursively-copying-directories-in-php/)

```php
$permissions = 0755;
FS::superCopy("source", "destination", $permissions);
```

### cloneFile

cloneFile also copies a file from the current directory to another directory, but unlike copyFile, cloneFile includes the filename, and it takes in 2 parameters: the filename and the path+filename to clone to.

```php
$data = FS::cloneFile("items.txt", "./home/products.txt");
```

### moveFile

moveFile also moves a file from the current directory to another directory, it takes in 2 parameters: the filename and the path to move to.

```php
$data = FS::moveFile("items.txt", "./home/");
```

### allFiles

This method allows you to get all of the files from the given directory (recursive). It takes in the directory to search and whether to show hidden files or not.

```php
$files = FS::allFiles("records", false);
```

### uploadFile

<div class="alert -warning">
This method was previously upload. In v2.4, uploadFile has received a lot of fixes and new features. Also the older upload method has been removed.
</div>

`uploadFile` as the name suggests is a method that makes file uploading a breeze. This is the main highlight of `Leaf\FS` in v2.4. Also unlike in earlier versions, `uploadFile` supports more type of files.

It takes in 3 parameters:

- The file to upload
- The path to save the file
- Config for file upload

```php
$profilePic = $request->files("profile_pic");

// file upload
Leaf\FS::uploadFile($profilePic, "./images/");
```

One amazing thing about FS is that it can detect the type of file you're trying to upload and handle it accordingly, so you don't need to worry about that. Below is a table of common file types which are automatically detected.

| File Type         | Common Extensions                                    |
| :--------------  | :----------------------------------------------  |
|  image            | 'jpg', 'jpeg', 'png', 'gif', 'webp', 'apng', 'tif', 'tiff', 'svg', 'pjpeg', 'pjp', 'jfif', 'cur', 'ico' |
|  video             | 'mp4', 'webm', 'swf', 'flv'                              |
|  audio             |'wav', 'mp3', 'ogg', 'm4a'                              |
|  text                |'txt', 'log', 'xml', 'doc', 'docx', 'odt', 'wpd', 'rtf', 'tex', 'pdf' |
|  presentation |'ppsx', 'pptx', 'ppt', 'pps', 'ppsm', 'key', 'odp' |
|  compressed  |'zip', 'rar', 'bz', 'gz', 'iso', 'tar.gz', 'tgz', 'zipx', '7z', 'dmg'|
|  spreadsheet  |'ods', 'xls', 'xlsx', 'xlsm'                                  |
|  application    |'apk', 'bat', 'cgi', 'pl', 'com', 'exe', 'gadget', 'jar', 'msi', 'py', 'wsf' |

You can open an issue if you think there should be a new category or if an important extension is not present here.

**Upload Config**:

You can configure file uploads to behave the way you want it to, and that's the 3rd parameter it takes in.

```php
Leaf\FS::uploadFile($profilePic, "./images/", []);
```

Config is an array that takes in particular properties:

```php
Leaf\FS::uploadFile($profilePic, "./images/", [
  "verify_dir" => true
]);
```

This is a list of config options.

| Config Name  | Description                                                   | Possible Values           |
| :--------------  | :----------------------------------------------  |  -----------------------: |
|  unique           | If `true`, a timestamp is added to filename | `true`, `false`               |
|  verify_dir       | Add error if upload directory is invalid        | `true`, `false`               |
|  verify_file      | Add error if same filename exists                 | `true`, `false`               |
|  max_file_size | Set maximum file size in bytes, default: 10mb | integer                   |
|  file_type        | Set file type if it's not included in default list | string                       |
|  validate         | Validate file type for invalid extensions: Only works with the default extensions | `true`, `false`               |

If the file upload is successful, it returns the filename, you can perform whatever operation you need on the filename, if it fails you can access the errors through the `errors` method. Refer to error handling for this part.

```php
$filename = FS::uploadFile($profilePic, "./images/", []);
```

### uploadInfo

When the file successfully uploads, records on the file details are shelved. You can access these with the `uploadInfo` method. It takes in one optional parameter, the name of the file whose info you want to return.

```php
// returns info on all uploaded files (associative array)
$uploadInfo = Leaf\FS::uploadInfo();

// returns info on only selected file
$profileInfo = FS::uploadInfo($filename);
```

### chmod

Get or set UNIX mode of a file or directory.

```php
$mode = FS::chmod("items.txt");
FS::chmod("items.txt", ...);
```

### link

Create a symlink to the target file or directory. On Windows, a hard link is created if the target is a file.

```php
FS::link("items.txt", "items");
```

### name

Extract the file name from a file path.

```php
$name = FS::name("works/log.txt");
```

### basename

Extract the trailing name component from a file path.

```php
$name = FS::basename("works/log.txt");
```

### dirname

Extract the parent directory from a file path.

```php
$dirname = FS::dirname("works/log.txt");
```

### extension

Extract the file extension from a file path.

```php
$extension = FS::extension("works/log.txt");
```

### type

Get the file type of a given file.

```php
$type = FS::type("works/log.txt");
```

### size

Get the file size of a given file.

```php
$size = FS::size("works/log.txt");
```

## errors

Just like most leaf modules, fs also has an errors method which returns any errors that fs might have run into during an operation.

```php
$errors = FS::errors();
```

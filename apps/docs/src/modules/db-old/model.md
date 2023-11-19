# Leaf MVC Models

In LeafMVC, we don't really have anything to do with our models: Leaf Core has taken all the trouble out of using models, so all we have to do in LeafMVC is to generate the model and include it in our controller.

Our Models are kept in `app/models`, but we won't need to create our models manually. Leaf MVC's command line tool covers this for us.

```bash
php leaf g:model <Name>
```

That's all we need to do with our model. LeafMVC's models have methods prepared which allow us to manipulate out database without doing much.

We can create, read, update and delete without writing any code to specially access our database.

In our controller, we can do these:

```php
// return all rows
ModelName::all();

// return all rows sorted by date created
ModelName::orderBy('created_at', 'desc')->get()

// find a database row by id
ModelName::find($id);

// find a database row by title
ModelName::where('title', 'Title goes here')->get();

// create a new database row
$model = new ModelName;
$model->field = $this->request->getParam("field");
$model->save();

// delete a post
$model = ModelName::find($id);
$model->delete();
```

Checkout [building your first app](/docs/introduction/first-app) for more practical use cases

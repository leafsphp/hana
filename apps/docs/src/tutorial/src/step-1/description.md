# Getting Started

Welcome to the Leaf tutorial!

This is an attempt to give you the experience of what it feels like to work with Leaf, right in your browser. This tutorial aims to give you the basic knowledge required to build a simple Leaf project. You don't need to understand everything before moving on, however, after you complete it, make sure to also read the <a target="_blank" href="/docs/introduction/">docs which cover each topic</a> in more details.

## PREREQUISITES

The tutorial assumes basic familiarity with PHP. If you are **totally new** to PHP, it might not be the best idea to jump right into a framework as your first step - [grasp the basics](https://www.w3schools.com/php/default.asp) then come back! Prior experience with other frameworks helps, but is not required.

## HOW TO USE THIS TUTORIAL

You can edit the code <span class="wide">on the right</span><span class="narrow">below</span> and see the result when you click on the **"RUN"** button found right next to the preview tab below.

<details>
<summary>Options for running</summary>

Since leaf allows you to create multiple routes, we've added a **`request.json`** file in the editor which is responsible for how the editor runs your leaf code. This file looks like this by default:

```json
{
  "method": "GET",
  "path": "/",
  "data": {}
}
```

You can tell the editor to run a post, put, patch, delete or options request instead of a GET request by updating the **`method`**. You can change the route to run by updating the **`path`** and even pass in **`data`** which the editor should run your code with. This can be GET or POST request data.
</details>

<details>
<summary>Tutorial Steps</summary>

Each step will introduce a core feature of Leaf, and you will be expected to complete the code to get the demo working. If you get stuck, you will have a **"Show me!"** button that reveals the working code for you. Try not to rely on it too much - you'll learn faster by figuring things out on your own.

If you are an experienced developer coming from Leaf 2 or other frameworks, there are a few settings you can tweak to make the best use of this tutorial. If you are a beginner, it's recommended to go with the defaults.
</details>

<details>
<summary>Tutorial Setting Details</summary>

- Leaf offers two API styles: functional mode and class mode. This tutorial is designed to work for both - you can choose your preferred style using the **Style preference** switches at the top. <a target="_blank" href="/docs/introduction/#class-mode-vs-functional-mode">Learn more about API styles</a>.

</details>

Ready to begin your journey? Click **"Next"** to get started.

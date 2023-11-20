<!-- markdownlint-disable no-inline-html -->
<p align="center">
  <br><br>
  <img src="https://leafphp.dev/logo-circle.png" height="100"/>
  <br>
</p>

<h1 align="center">Hana</h1>

<p align="center">
	<a href="https://packagist.org/packages/leafs/hanabira"
		><img
			src="https://poser.pugx.org/leafs/hanabira/v/stable"
			alt="Latest Stable Version"
	/></a>
	<a href="https://packagist.org/packages/leafs/hanabira"
		><img
			src="https://poser.pugx.org/leafs/hanabira/downloads"
			alt="Total Downloads"
	/></a>
	<a href="https://packagist.org/packages/leafs/hanabira"
		><img
			src="https://poser.pugx.org/leafs/hanabira/license"
			alt="License"
	/></a>
</p>
<br />
<br />

Hana is a simple, lightweight and easy to use React framework. It focuses on developer experience, stability and performance. Unlike the 100s of other React frameworks out there, Hana comes with a lot of features out of the box, including:

- Powerful routing
- Human state management
- Dead simple server/client side authentication
- SSR support with [Leaf PHP](https://leafphp.dev)

*You can call it React on the go.*

## Getting Started

To get started with Hana, you can use the `create-hana-app` CLI tool to create a new project.

```sh
npm create hana-app@latest
```

## What's in this Repo?

This Turborepo includes the following:

- `docs`: Documentation powered by [Vitepress](https://vitepress.vuejs.org/)
- `@hanabira/core`: core library for Hana
- `@hanabira/store`: state management library for Hana
- `@hanabira/auth`: authentication library for Hana
- `@hanabira/router`: router library for Hana
- `@hanabira/config`: shared configs used throughout the monorepo
- `@leafphp/hana`: SSR bridge for Hana
- `create-hana-app`: CLI tool for creating new Hana apps

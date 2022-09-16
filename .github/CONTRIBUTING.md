# Contributing

Thanks for your interest in contributing to mannys.game! Please take a moment to review this document **before submitting a pull request.**

If you want to contribute, but aren't sure where to start, you can create a [new discussion](https://github.com/mannynotfound/mannys-game/discussions).

> **Note**
>
> **Please ask first before starting work on any significant new features. This includes things like adding new accessories, pages, etc.**
>
> It's never a fun experience to have your pull request declined after investing time and effort into a new feature. To avoid this from happening, we request that contributors create a [feature request](https://github.com/mannynotfound/mannys-game/discussions/new?category=ideas) to first discuss any API changes or significant new ideas.

<br>

## Basic guide

This guide is intended to help you get started with contributing. By following these steps, you will understand the development process and workflow.

1. [Cloning the repository](#cloning-the-repository)
2. [Installing Node.js](#installing-nodejs)
3. [Installing dependencies](#installing-dependencies)
4. [Starting the app](#starting-the-app)
5. [Writing documentation](#writing-documentation)
6. [Submitting a pull request](#submitting-a-pull-request)

---

<br>

## Cloning the repository

To start contributing to the project, clone it to your local machine using git:

```bash
git clone https://github.com/mannynotfound/mannys-game.git
```

Or the [GitHub CLI](https://cli.github.com):

```bash
gh repo clone mannynotfound/mannys-game
```

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Installing Node.js

You need to install **Node.js v16 or higher**.

You can run the following commands in your terminal to check your local Node.js and npm versions:

```bash
node -v
```

If the versions are not correct or you don't have Node.js, download and follow their setup instructions:

- Install Node.js using [fnm](https://github.com/Schniz/fnm) or from the [official website](https://nodejs.org)

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Installing dependencies

Once in the project's root directory, run the following command to install the project's dependencies:

```bash
npm install
```

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Starting the app

To start the local app:

```bash
npm start
```

To start the dummy api server:

```bash
npm start-server
```

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Writing documentation

Documentation is crucial to helping developers of all experience levels use mannys-game. Docs are located in src/pages/docs/ and use [mdx-js](https://github.com/mdx-js/mdx/) to write markdow with JSX functionality. 


Try to keep documentation brief and use plain language so folks of all experience levels can understand. If you think something is unclear or could be explained better, you are welcome to open a pull request.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Submitting a pull request

When you're ready to submit a pull request, you can follow these naming conventions:

- Pull request titles use the [Imperative Mood](https://en.wikipedia.org/wiki/Imperative_mood) (e.g., `Add something`, `Fix something`).
- [Changesets](#versioning) use past tense verbs (e.g., `Added something`, `Fixed something`).

When you submit a pull request, GitHub will automatically lint, build, and test your changes. If you see an ❌, it's most likely a bug in your code. Please, inspect the logs through the GitHub UI to find the cause.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

<br>

---

<div align="center">
  ✅ Now you're ready to contribute to mannys-game! 
</div>

---

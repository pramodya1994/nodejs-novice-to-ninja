# Node.js: Novice to Ninja

[Course link](https://learning.oreilly.com/library/view/node-js-novice-to/9781098141004/Text/ultimatenode1-frontmatter.html)

## 1. What's Node.js?

* JS runtime
* Use to create CLI tools, web servers etc
* 2005: ECMA script 5, standard support for most of the browsers
* npm - Node package manager

Why learn JS?

* Most used language in GitHub
* Ranked highly by developers

Why learn NodeJs?

* it's JS
* Fast
    * non-blocking
    * event-driven
    * runs on a single processing thread, long running tasks (db query) are processed asynchrnously
        * Doesn't halt execution
        * Task runs in the background
        * NodeJS continues the next command
        * when task is complete, return data to a callback function
* Real time
    * live chat, multiplayer games
* Lightweight
    * runtime is small & cross-platform
* Extendable
    * npm: largest in the world
* opensource

## 2. Install Node.js

## 3. Your first NodeJS application

### Console app

Run hello.js

```bash
mkdir console
cd console
node hello.js
```

First line

`#!/usr/bin/env node`

* shebang line
* optional when running using bash command
* Need it when running as `./hello.js`

```bash
node hello.js Craig
```

* ele 0: node command
* ele 1: script
* ele 2: first argument

### Web server app

PHP web server
![Alt text](img/php-web-server.png)

NodeJS web server
![Alt text](img/node-web-server.png)

```bash
mkdir server
cd server
node webhello.js
Server running at http://localhost:3000/
```

Try accessing http://localhost:3000/, http://localhost:3000/abc/, or http://localhost:3000/abc/123/:
every page is the same.

Restarting Node.js Applications with Nodemon

```bash
npm install -g nodemon
nodemon webhello.js

# code change
[nodemon] restarting due to changes...
[nodemon] starting `node webhello.js`
```

### Web Application Considerations

* Easy to start no db connections required
* Scaling can be difficult
    * More RAM/CPU to Apache/PHP will improve response time
    * NodeJS still runs on a single CPU, solution is clustering, pm2, docker containers by launching multiple instances
* Not efficient serving static files
    * Production: Nginx server to serve static files, direct request to node app when needed
* Write stateless applications
    * variable `userCount`
    * What would happen if you wanted to improve performance by launching two or more instances of the same app—perhaps
      on other servers
    * The `userCount` value would be different

## 4. How to Debug Node.js Scripts

Linters: ESLint, JSLint, JSHint

Code editor plugins are better: ESLint for VS code

### Debugging Env variables

```bash
NODE_ENV=development
```

```js
// running in development mode?
const DEVMODE = (process.env.NODE_ENV !== 'production');

if (DEVMODE) {
    console.log('application started in development mode');
}
```

### Debugging cmd line options

`node --trace-warnings index.js`: outputs stack traces when promises don’t resolve or reject as expected

### Console debugging

`.log(msg)`

`.log('%j', obj)`: output an object as a compact JSON string

`.table(obj)`: arrays in tabular format

### Debugging with `util.debuglog` and 3rd party log modules

### Debugging Node.js Apps with Chrome

## 5. Getting started with Express

* NodeJs web server framework
* URL routing, parsing data, set HTTP headers

```bash
mkdir express
cd express
npm init
npm install express
```

* `package.json`:
    * dependencies: need to run app (eg: express)
    * dev-dependencies: only required for build tools
* `package.lock.json`: installed modules
* `node_modules`: contains all modules

### Express entry script

Routing: which functions execute when receives a request for a URL

### Serve Static Files

`static` directory

Express only checks static files if request cannot be fulfilled by routes, there's a config to change this

However, use Nginx to server static files and bypass NodeJs processing is better approach

### Express Middleware Functions

`app.use()`: Middleware function

Middleware functions runs in the sequence defines in the code:

* run code on every request
* manipulate request & response objects
* terminate a response
* call next middleware function

All middleware functions receive 3 args:

* request
* response
* next: callback that passes control to the next middleware function

```js
// log every request to the terminal
app.use((req, res, next) => {
    console.log(req.url);
    next();
});
```

This should place before routing code

### Advanced Routing

* path expressions: handling many routes with one function
* path parameters: parsing routes to extract values
* HTTP methods: using GET, POST, DELETE, PUT and so on
* route handlers: grouping related route handler functions into one file

#### 1. Path expressions

```ts
// another route
app.get('/hello/', (req, res) => {
    res.send('Hello again!');
});
```

Default, case is ignored, to avoid: `app.set('case sensitive routing', true)`

Ignore closing slashes, `/hello` and `/hello/`, to avoid: `app.set('strict routing', true)`

As well as exact routes, you can define regular expression patterns to match a range of URLs

#### 2. Path parameters

`/author/Craig-Buckler/book/Node.js`

```ts
// return a value for a user
app.get('/author/:name/book/:bookName', (req, res, next) => {

    console.log(`author: ${req.params.name}`);      // "Craig-Buckler"
    console.log(`  book: ${req.params.bookName}`);  // "Node.js"

    next();

});
```

#### 3. HTTP route methods

`app.get()`, `app.post()`, `app.put()`, `app.delete()`

`app.all()` handles all HTTP methods to a specific route. The function can examine the `req.method` property to
determine which HTTP method was used.

#### 4. Route handler

Defining all route handler functions in the entry index.js script becomes impractical as your application grows in
complexity. A better option is to create route handling middleware in separate files with related functionality.

Eg: helloRouter

## 6. Processing Form data with Express

User data cannot be trusted, should be sanitized

express-validator: module provides a range of validation and sanitization functions

`http://localhost:3000/?a=1&b=2&c=3`

`Request.query` property

```
{ 
  a: 1, 
  b: 2, 
  c: 3 
}
```


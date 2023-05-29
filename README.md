## How to run the project?

Install dependencies

```bash
npm install
```

Install json-server

```bash
npm i json-server
```

Run the posts server

```bash
npm run start-db
```

this will start the server that serves the posts and comments on PORT `3001`

Build the project

```bash
npm run build
```

Start the project in production mode

```bash
npm start
```

## Important things done

[x] The homepage that lists the blog posts is using ISR, which allows it to be SSR plus incrementally updated
[x] Blog page showcases the ability of **SSG** using Next13
[x] For mocking comments, I have used **Redux** with Redux toolkit. Whenever the user makes a comments, it gets stored in the redux store and displayed appropriately
[x] Comment form is validated using **Yup** and uses **formik** to build the form
[x] Search funtionality is **debounced** keeping UX in mind
[x] Page transitions are subtle but nice and are done with **Framer Motion**
[x] The blogs posts on the home page are fetched using **infinite scrolling**

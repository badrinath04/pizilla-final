
# Introduction

**PiZilla** is built entirely using **[Express][express]** and
**[ReactJS][react]**. Transpiled using **[Babel][babel]** with
**[Webpack3][webpack]** and Hot Module Reloading.
For a full list of dependencies, refer [here](/package.json).

The codebase holds [EcmaScript 2016][es7] syntax along with extensions for
[transform-runtime][tr], [transform-class-properties][tcp]
and [transform-object-rest-spread][tors] operators.

# Configuring PiZilla 🛠

- Install all dependencies with `npm install` or `yarn` (if you use
  **[yarn][yarn]**).
- To run the server for development on localhost, use `npm run dev` or `yarn dev`.
  (includes support for live reload)
- Build the react application with `npm run build` or `yarn build`.
- Configure your backend server accordingly at [server/config.js](/server/config.js).


- Start the **Express** server with `npm start` or `yarn start`.

> Note: Make sure you have write access to the **uploads** folder. 👍🏻

***


[nitdgpos]: https://github.com/NIT-dgp
[express]: https://expressjs.com
[react]: https://facebook.github.io/react
[babel]: https://babeljs.io
[webpack]: https://webpack.js.org/concepts/
[es7]: https://www.ecma-international.org/ecma-262/7.0/
[tr]: https://babeljs.io/docs/plugins/transform-runtime/
[tcp]: https://babeljs.io/docs/plugins/transform-class-properties/
[tors]: https://babeljs.io/docs/plugins/transform-object-rest-spread/
[node]: https://npmjs.org
[yarn]: https://yarnpkg.com

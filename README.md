node-module
===========

Type definitions and documentation for Node.js module internals, and how to exploit them.

<hr>

The Module.ts file under the src directory is really the only file you need for the advanced definitions.

It's a normal typescript file in case you want to do the following:

```typescript

import Module = require('./Module.js'); //Compiled from Module.ts

```

So you can have access to the Module object with the types automatically.

See src/Module.ts for details on exploiting the module system to load in scripts and so forth.

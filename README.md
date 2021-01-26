
<p align="center">
  <h1 align="center"> Sofa - Couchbase ORM Utilities </h1>
</p>


<div align="center">

<img src="./docs/lovebase.png"></img>

<div style="display: flex;justify-content:center;">

<img alt="NPM" src="https://img.shields.io/npm/dt/@stoqey/sofa.svg"></img>
 

</div>

</div>

# 

Sofa is a Couchbase ORM utility to mimic Mongoose 

### Background
After spending time on `node-ottoman` (a mongoose-couchbase wanna-be), i decided to use `couchbase` directly instead.

You can think of this as a re-write to the `node-ottoman`.

**For the time being let's just call it the Mongoose for Couchbase**


### 1. Install
```bash
npm i @stoqey/sofa --save
```

### 2. Start couchbase
```ts
import { startSofa } from '@stoqey/sofa';

 const started = await startSofa({
    connectionString: 'couchbase://localhost',
    username: 'admin',
    password: '123456',
    bucketName: 'stq'
 })
```

### 3. Create a Model/Collection and start using it

```ts
import { Model } from '@stoqey/sofa';

const userModel = new Model('User');


// Create document
const created = await userModel.create({
    username: 'ceddy',
    password: 'fuck-node-ottoman',
});

// Find document
const foundData = await userModel.findById(created.id);

// update document
const updatedData = await userModel.updateById(created.id, { ...created, someValiue: 'x' });

// delete
const deletedData = await userModel.delete(created.id);

```

## Contributors needed 
- Create automatic pagination
- Create indexes
- Create static methods like `save`, `update`, `findMany` e.t.c


<img src="./docs/sleeping.png"></img>

<p align="center">
  <h1 align="center"> Stoqey Inc </h1>
</p>

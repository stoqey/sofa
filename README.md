
<p align="center">
  <h1 align="center"> Sofa - Couchbase ORM Utilities </h1>
</p>


<div align="center">

<img width="400px" src="./docs/lovebase.png"></img>

<div style="display: flex;justify-content:center;">

<img alt="NPM" src="https://img.shields.io/npm/dt/@stoqey/sofa.svg"></img>
 

</div>

</div>


Sofa is a Couchbase ORM utility to mimic Mongoose 

### Background
After spending time on `node-ottoman` (a mongoose-couchbase wanna-be), i decided to use `couchbase` directly instead.

You can think of this as a re-write to the `node-ottoman`.

**For the time being let's just call it the Mongoose for Couchbase**


## 1. Install
```bash
npm i @stoqey/sofa --save
```

## 2. Start couchbase
```ts
import { startSofa } from '@stoqey/sofa';

 const started = await startSofa({
    connectionString: 'couchbase://localhost',
    username: 'admin',
    password: '123456',
    bucketName: 'stq'
 })
```

## 3. Create a Model/Collection and start using it

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

## 4. Query build
Query builder is inspired from node-ottoman, for more examples, please see https://v2.ottomanjs.com/guides/query-builder.html#query-builder

```ts
import { Query } from '@stoqey/sofa';

const params = {
  select: [
    {
      $count: {
        $field: {
          name: 'type',
        },
        as: 'odm',
      },
    },
  ],
  let: [
    { key: 'amount_val', value: 10 },
    { key: 'size_val', value: 20 },
  ],
  where: {
    $or: [{ price: { $gt: 'amount_val', $isNotNull: true } }, { auto: { $gt: 10 } }, { amount: 10 }],
    $and: [
      { price2: { $gt: 1.99, $isNotNull: true } },
      { $or: [{ price3: { $gt: 1.99, $isNotNull: true } }, { id: '20' }] },
    ],
    $any: {
      $expr: [{ $in: { search_expr: 'search', target_expr: 'address' } }],
      $satisfied: { address: '10' },
    },
    $in: { search_expr: 'search', target_expr: ['address'] },
  },
  groupBy: [{ expr: 'type', as: 'sch' }],
  letting: [
    { key: 'amount_v2', value: 10 },
    { key: 'size_v2', value: 20 },
  ],
  having: { type: { $like: '%hotel%' } },
  orderBy: { type: 'DESC' },
  limit: 10,
  offset: 1,
  use: ['airlineR_8093', 'airlineR_8094'],
};

const query = new Query(params, 'travel-sample').build();
console.log(query);

```

which translates to

```sql
SELECT COUNT(type) AS odm FROM travel-sample USE KEYS ["airlineR_8093","airlineR_8094"] LET amount_val=10,size_val=20 WHERE ((price>amount_val AND price IS NOT NULL) OR auto>10 OR amount=10) AND ((price2>1.99 AND price2 IS NOT NULL) AND ((price3>1.99 AND price3 IS NOT NULL) OR id="20")) AND ANY search IN address SATISFIES address="10" END AND search IN ["address"] GROUP BY type AS sch LETTING amount_v2=10,size_v2=20 HAVING type LIKE "%hotel%" ORDER BY type DESC LIMIT 10 OFFSET 1
```


### Another example using functions

```ts
const select = [
  {
    $count: {
      $field: {
        name: 'type',
      },
      as: 'odm',
    },
  },
  {
    $max: {
      $field: 'amount',
    },
  },
];
const letExpr = [
  { key: 'amount_val', value: 10 },
  { key: 'size_val', value: 20 },
];
const where = {
  $or: [{ price: { $gt: 'amount_val', $isNotNull: true } }, { auto: { $gt: 10 } }, { amount: 10 }],
  $and: [
    { price2: { $gt: 1.99, $isNotNull: true } },
    { $or: [{ price3: { $gt: 1.99, $isNotNull: true } }, { id: '20' }] },
  ],
};
const groupBy = [{ expr: 'type', as: 'sch' }];
const having = {
  type: { $like: '%hotel%' },
};
const lettingExpr = [
  { key: 'amount_v2', value: 10 },
  { key: 'size_v2', value: 20 },
];
const orderBy = { type: 'DESC' };
const limit = 10;
const offset = 1;
const useExpr = ['airlineR_8093', 'airlineR_8094'];

const query = new Query({}, 'collection-name')
  .select(select)
  .let(letExpr)
  .where(where)
  .groupBy(groupBy)
  .letting(lettingExpr)
  .having(having)
  .orderBy(orderBy)
  .limit(limit)
  .offset(offset)
  .useKeys(useExpr)
  .build();
console.log(query);

```

Which translates to
```sql
SELECT COUNT(type) AS odm,MAX(amount) FROM `travel-sample` USE KEYS ['airlineR_8093','airlineR_8094'] LET amount_val = 10,size_val = 20 WHERE ((price > amount_val AND price IS NOT NULL) OR auto > 10 OR amount = 10) AND ((price2 > 1.99 AND price2 IS NOT NULL) AND ((price3 > 1.99 AND price3 IS NOT NULL) OR id = '20')) GROUP BY type AS sch LETTING amount_v2=10,size_v2=20 HAVING type LIKE "%hotel%" ORDER BY type = 'DESC' LIMIT 10 OFFSET 1
```

### Contributors needed 
- Create automatic pagination ✅
- Create indexes
- Create static methods like `save`, `update`, `findMany` e.t.c


<img height="500px" src="./docs/sleeping.png"></img>

<p align="center">
  <h1 align="center"> Stoqey Inc </h1>
</p>

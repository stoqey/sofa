
<p align="center">
  <h1 align="center"> Sofa - Simple Couchbase ORM</h1>
</p>


<div align="center">

<img width="400px" src="./docs/sofa.jpg"></img>

<div style="display: flex;justify-content:center;">

<img alt="NPM" src="https://img.shields.io/npm/dt/@stoqey/sofa.svg"></img>
 

</div>

</div>


Sofa is a super simple Couchbase ORM


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

## 3. Create a Model and start using it

```ts
import { Model } from '@stoqey/sofa';

const userModel = new Model('User');


// Create document
const created = await userModel.create({
    username: 'ceddy',
    password: 'love couchbase',
});

// Find document
const foundData = await userModel.findById(created.id);

// update document
const updatedData = await userModel.updateById(created.id, { ...created, someValue: 'x' });

// delete
const deletedData = await userModel.delete(created.id);

```

## 4. Pagination

All models come with a method for automatic pagination 
```ts
const paginationData = await model.pagination({
    select: ["id", "email", "phone","fullname"],
    where: { 
        userId: { $eq: "ceddy" },
        $or: [{ userId: { $eq: "ceddy" } }, { phone: 10 }],
        },
    limit: 100,
    page: 0,
});
```

which translates to this query 

```sql
SELECT * FROM `stq` WHERE _type="User" AND userId="ceddy" AND (userId="ceddy" OR phone=10) ORDER BY createdAt DESC LIMIT 100 OFFSET 0
```


Pagination results

```js
[
  {
    id: '209d3143-09b7-4b3d-bf7d-f0ccd3f98922',
    updatedAt: 2021-01-26T01:51:43.218Z,
    createdAt: 2021-01-26T01:51:43.210Z,
    _type: 'User',
    userId: 'ceddy',
    password: '...',
    someValue: 'x'
  },
  {
    id: '1392e4f6-ae1e-4e01-b7d5-103bdd0e843f',
    updatedAt: 2021-01-26T01:51:29.591Z,
    createdAt: 2021-01-26T01:51:29.583Z,
    _type: 'User',
    userId: 'ceddy',
    password: '...',
    someValue: 'x'
  }
]
```


## 5. Custom queries & Query builder
Query builder is inspired from node-ottoman, for more examples, please see https://ottomanjs.com/guides/query-builder.html#query-builder

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


### Running custom query on cluster

```ts
import { QueryCluster } from '@stoqey/sofa';

const queryresults = await QueryCluster(queryBuilder);
// queryresults = { rows: object[], meta: any}

```
### Contributors needed 
- Create automatic pagination ✅
- Create Schema and validation/population ✅
- Create static methods for models like `save`, `update`, `findMany` e.t.c ✅
- Automated indexes
- Geospatial queries
- FTS queries



<img height="500px" src="./docs/sleeping.png"></img>

<p align="center">
  <h1 align="center"> Stoqey Inc </h1>
</p>

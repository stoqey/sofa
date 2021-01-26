import 'mocha';
import { expect } from 'chai';

import { startSofa, Model, Query } from './index'

before((done) => {
    startSofa({
        connectionString: 'couchbase://localhost',
        username: 'admin',
        password: '123456',
        bucketName: 'stq'
    }).then(started => done()).catch(error => {
        console.error(error);
    })
});

let sampleData = null;

const model = new Model('User');

describe('Sofa', () => {


    it('should insert into couchbase', async () => {
        const created = await model.create({
            userId: 'ceddy',
            password: 'Fuck ottoman',
        });

        console.log('sample data created', JSON.stringify(created));

        sampleData = created;
        expect(created.id).to.not.null;
    })

    it('should get into couchbase', async () => {
        const foundData = await model.findById(sampleData.id);
        expect(foundData.id).to.be.equal(sampleData.id);
    })

    it('should update into couchbase', async () => {
        const updatedData = await model.updateById(sampleData.id, { ...sampleData, someValiue: 'x' });
        expect(updatedData.id).to.be.equal(sampleData.id);
    })

    it('should delete into couchbase', async () => {
        const deletedData = await model.delete(sampleData.id);
        expect(deletedData).to.be.equal(true);
    })

    it('should create query', async () => {
        const dbName = 'stq'
        const query = new Query({}, dbName).select('*').build();

        console.log('query is', query);
        
        expect(query).to.be.not.null;
    })

})
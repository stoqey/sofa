import 'mocha';
import { expect } from 'chai';

import { startSofa, Model } from './index'

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

describe('Sofa', () => {
    it('should insert into couchbase', async () => {
        const userModel = new Model('User');

        const createdData = await userModel.create({
            userId: 'ceddy',
            password: 'Fuck ottoman',
        });

        console.log('sample data created', JSON.stringify(sampleData));

        expect(createdData).to.not.null;
    })

    // it('should get into couchbase', () => {
        
    // })

    // it('should delete into couchbase', () => {
        
    // })

    // it('should update into couchbase', () => {
        
    // })
})
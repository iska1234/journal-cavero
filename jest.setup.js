import 'whatwg-fetch';
import 'setimmediate';

require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnviroments.js', () => ({
    getEnviroments: () => ({...process.env})
}));

console.log('Environment variables:', process.env);

### TODO

- advanced: tree shaking module (to implement as option)
- advanced: incremental


## Unit tests: 

```
npm run test
```


### TESTING

In addition to testing commands mentonied in the `scripts` chapter, the `npm run test` command was working on testing using popular testing tools. As a result, they were all thrown out because they did not give any advantage.

The following dependencies are needed to use them:

- "ava": "^5.2.0",
- "testling": "^1.7.4",
- "chai": "^4.3.7",
- "jest": "^29.5.0",
- "@types/jest": "^29.4.0",
- "jest-environment-jsdom": "^29.5.0",
- "jsdom": "^21.1.0",
- "mocha": "^10.2.0",


#### More details: 

- `ava` & `testling` - not implemented. Too less documentation
- `jest` - start `npm run jest`. Process file `jest.test.js` - the test developments has dropped. I tried to achieve an easy browser environment without using headless browsers, but as it turned out, the browser-based jest environment does not isolate specific functions from nodejs and this has lost its meaning.
- `mocha` & `jsdom` ? `chai` - look up `mocha.js`. Too hard and a dubious profit. The idea was to put the whole file in life, then pass it as a parameter to create Env and as a result and pass the code as a string to the tests


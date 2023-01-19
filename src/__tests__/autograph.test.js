const autograph = require('../autograph');
const documentLoader = require('../documentLoader');

it('autograph', async () => {
  const object = {
    '@context': {
      '@vocab': 'https://industry.example/vocab#',
      'id': '@id',
      'type': '@type',
    },
    'property': 123,
    'list': [{id: 'did:example:123', bar: 'baz'}, {foo: true}],
  };
  const dataset = await autograph(object, {
    id: 'urn:uuid:123',
    documentLoader,
  });
  expect(dataset).toEqual({
    id: 'urn:uuid:123',
    nodes: [
      {id: 'urn:uuid:123'},
      {id: 'did:example:123', bar: 'baz'},
      {id: 'urn:uuid:123:_:c14n0', property: 123},
      {id: 'urn:uuid:123:_:c14n1', foo: true},
    ],
    links: [
      {
        source: 'urn:uuid:123:_:c14n0',
        label: 'list',
        predicate: 'https://industry.example/vocab#list',
        target: 'did:example:123',
      },
      {
        source: 'urn:uuid:123:_:c14n0',
        label: 'list',
        predicate: 'https://industry.example/vocab#list',
        target: 'urn:uuid:123:_:c14n1',
      },
      {
        source: 'urn:uuid:123',
        label: 'property',
        predicate: 'https://industry.example/vocab#property',
        target: 'urn:uuid:123:_:c14n0',
      },
      {
        source: 'urn:uuid:123',
        label: 'foo',
        predicate: 'https://industry.example/vocab#foo',
        target: 'urn:uuid:123:_:c14n1',
      },
    ],
  });
});

afterAll((done) => {
  setTimeout(done, 0);
});

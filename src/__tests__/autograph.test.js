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
      {id: 'urn:uuid:123', label: 'URN'},
      {
        'id': 'did:example:123',
        'https://industry.example/vocab#bar': 'baz',
        'label': 'DID',
      },
      {
        'id': 'urn:uuid:123:_:c14n0',
        'https://industry.example/vocab#property': 123,
        'label': 'URN',
      },
      {
        'id': 'urn:uuid:123:_:c14n1',
        'https://industry.example/vocab#foo': true,
        'label': 'URN',
      },
    ],
    links: [
      {
        definition: 'https://industry.example/vocab#list',
        source: 'urn:uuid:123:_:c14n0',
        label: 'List',
        target: 'did:example:123',
      },
      {
        definition: 'https://industry.example/vocab#list',
        source: 'urn:uuid:123:_:c14n0',
        label: 'List',
        target: 'urn:uuid:123:_:c14n1',
      },
      {
        definition: 'https://industry.example/vocab#property',
        source: 'urn:uuid:123',
        label: 'Property',
        target: 'urn:uuid:123:_:c14n0',
      },
      {
        definition: 'https://industry.example/vocab#foo',
        source: 'urn:uuid:123',
        label: 'Foo',
        target: 'urn:uuid:123:_:c14n1',
      },
    ],
  });
});

afterAll((done) => {
  setTimeout(done, 0);
});

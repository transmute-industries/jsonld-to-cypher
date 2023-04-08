const ns = 'rx';
// urn:rx:parent-id:child-id

const rectify = (doc) => {
  let rxid = 0;
  const clone = JSON.parse(JSON.stringify(doc));
  const context = clone['@context'];
  delete clone['@context'];
  const parents = [];
  const ignore = ['@context', 'type'];
  parents.push({key: '', value: '', id: 1});
  const enhanced = JSON.stringify(clone, (key, value) => {
    if (!ignore.includes(key) && Array.isArray(value)) {
      parents.push({key, value, id: rxid});
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
      if (!value.hasOwnProperty('id')) {
        const parent = parents[parents.length - 1];
        value.id = `urn:${ns}:${parent.id - 1}:${rxid++}`;
      }
      const {id, ...rest} = value;
      return {id, ...rest};
    }
    return value;
  });
  return {
    '@context': context,
    ...JSON.parse(enhanced),
  };
};

const derectify = (doc) => {
  const clone = JSON.parse(JSON.stringify(doc));
  const context = clone['@context'];
  delete clone['@context'];
  const enhanced = JSON.stringify(clone, (key, value) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      if (value.hasOwnProperty('id') && value.id.startsWith(`urn:${ns}:`)) {
        delete value.id;
      }
      return value;
    }
    return value;
  });
  return {
    '@context': context,
    ...JSON.parse(enhanced),
  };
};

module.exports = {rectify, derectify};

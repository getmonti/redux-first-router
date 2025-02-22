import { compileParamsToPath } from 'rudy-match-path';
export default ((action, routesMap, serializer) => {
  const route = routesMap[action.type];
  const routePath = typeof route === 'object' ? route.path : route;

  const params = _payloadToParams(route, action.payload);

  const path = compileParamsToPath(routePath, params) || '/';
  const query = action.query || action.meta && action.meta.query || action.payload && action.payload.query;
  const search = query && serializer && serializer.stringify(query);
  return search ? `${path}?${search}` : path;
});

const _payloadToParams = (route, params = {}) => Object.keys(params).reduce((sluggifedParams, key) => {
  const segment = params[key]; // $FlowFixMe

  sluggifedParams[key] = transformSegment(segment, route, key);
  return sluggifedParams;
}, {});

const transformSegment = (segment, route, key) => {
  if (typeof route.toPath === 'function') {
    return route.toPath(segment, key);
  } else if (typeof segment === 'string') {
    // Ask James "should it return arrays?"
    if (segment.includes('/')) {
      return segment.split('/');
    }

    if (route.capitalizedWords === true) {
      return segment.replace(/ /g, '-').toLowerCase();
    }

    return segment;
  } else if (typeof segment === 'number') {
    return segment;
  }
};
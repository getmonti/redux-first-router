import createTest from '../../__helpers__/createTest'

createTest('required key', {
  SECOND: {
    path: '/second',
    query: {
      key: true
    }
  },
  THIRD: {
    path: '/third',
    query: {
      key: true
    }
  }
}, [
  { type: 'SECOND' },
  { type: 'SECOND', query: { key: 'correct' } },
  '/third',
  '/third?key=correct'
])

createTest('key required not to be there', {
  SECOND: {
    path: '/second',
    query: {
      key: false
    }
  },
  THIRD: {
    path: '/third',
    query: {
      key: false
    }
  }
}, [
  { type: 'SECOND', query: { key: 'correct' } },
  { type: 'SECOND' },
  '/third?key=correct',
  '/third'
])

createTest('val equals string', {
  SECOND: {
    path: '/second',
    query: {
      key: 'correct'
    }
  },
  THIRD: {
    path: '/third',
    query: {
      key: 'correct'
    }
  }
}, [
  { type: 'SECOND', query: { key: 'wrong' } },
  { type: 'SECOND', query: { key: 'correct' } },
  '/third?key=wrong',
  '/third?key=correct'
])


createTest('key/val matched by function', {
  SECOND: {
    path: '/second',
    query: {
      key: (val) => val === 'correct'
    }
  },
  THIRD: {
    path: '/third',
    query: {
      key: (val) => val === 'correct'
    }
  }
}, [
  { type: 'SECOND', query: { key: 'wrong' } },
  { type: 'SECOND', query: { key: 'correct' } },
  '/third?key=wrong',
  '/third?key=correct'
])

createTest('val matched by regex', {
  SECOND: {
    path: '/second',
    query: {
      key: /correct/
    }
  },
  THIRD: {
    path: '/third',
    query: {
      key: /correct/
    }
  }
}, [
  { type: 'SECOND', query: { key: 'wrong' } },
  { type: 'SECOND', query: { key: 'correct' } },
  '/third?key=wrong',
  '/third?key=correct'
])


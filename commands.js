module.exports = {
  'greet': {
    description: 'Greet',
    command: 'echo "Hello world"',
    methods: ['GET'],
    predicate: (payload, method) => {
      return true;
      // return {
      //   description: 'override greet',
      //   command: 'echo "Command overridden"',
      // };
    },
  },
};

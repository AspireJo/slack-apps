const path = require('path');

const { existsSync, mkdirSync } = require('fs');
const dir = path.join(__dirname, './../documentation');

if (!existsSync(dir)) {
  mkdirSync(dir);
}



module.exports = {
  baseRoute: '/{version}/{route}',
  specs: {
    host: "s",
  },
  patterns: {
    controllerInfoResolver: async fileName => {
      const [, method, version] = /(delete|get|post|put|patch)\.(v\d+)(\.\S+)*\.js$/.exec(fileName);
      return { method, version };
    },
    models: `${path.resolve(__dirname, './../app/api/')}/**/models/**/*.js`,
    schemas: `${path.resolve(__dirname, './../app/api/')}/**/schema/**/*.js`,
    controllers: `${path.resolve(__dirname, './../app/api/')}/**/controllers/**/_*.js`,
  },
  tags: [
    
  ],
  output: {
    location: dir,
    format: 'yml'
  },
  params: {
  },
  versions: {
  },
  customResponses: {
    204: {
      description: 'No content',
      schema: {
        properties: {
          code: {
            type: 'number',
          },
          message: {
            type: 'string',
          },
        },
      },
    },
    403: {
      description: 'Unauthorized',
      schema: {
        properties: {
          code: {
            type: 'number',
          },
          message: {
            type: 'string',
          },
        },
      },
    }
  }
};
#!/usr/bin/env node

const pkg = require('./package.json');
const yargs = require('yargs');
const { countries } = require('country-data').lookup;
const jsome = require('jsome');
const titleCase = require('title-case');
const chalk = require('chalk');

const filterByStatus = (statuses = []) => (country = {}) =>
  statuses.includes(country.status);

const { all, status, name, alpha2, alpha3, pretty } = yargs
  .version(pkg.version)
  .usage(
    `
    Usage: $0

    Examples:

      $ ${chalk.bold('$0 --name canada')}
      [
        {
          alpha2: "CA",
          alpha3: "CAN",
          countryCallingCodes: ["+1"],
          currencies: ["CAD"],
          emoji: "🇨🇦",
          ioc: "CAN",
          languages: ["eng", "fra"],
          name: "Canada",
          status: "assigned"
        }
      ]

      $ ${chalk.grey('# Use with a tool like jq')}
      $ ${chalk.bold("$0 --name canada --no-pretty | jq '.[] .name'")}
      {
        "name": "Canada"
      }
  `,
  )
  .options({
    all: {
      describe: 'Show every country',
      type: 'boolean',
      default: false,
    },
    name: {
      alias: 'n',
      describe: 'Query country by name',
      type: 'array',
      coerce: args => args.map(titleCase).join(' '),
    },
    alpha2: {
      describe: 'Query country by ISO 3166-1 alpha 2 code',
      type: 'string',
      coerce: arg => arg.toUpperCase(),
    },
    alpha3: {
      describe: 'Query country by ISO 3166-1 alpha 3 code',
      type: 'string',
      coerce: arg => arg.toUpperCase(),
    },
    status: {
      describe: '',
      type: 'array',
      default: ['assigned'],
    },
    pretty: {
      describe: 'Format and color output',
      type: 'boolean',
      default: true,
    },
  })
  .help()
  .strict().argv;

const query = {};

if (name) {
  query.name = name;
} else if (alpha2) {
  query.alpha2 = alpha2;
} else if (alpha3) {
  query.alpha3 = alpha3;
}

if (Object.keys(query).length === 0 && all === false) {
  yargs.showHelp('log');
} else {
  const results = all
    ? countries()
    : countries(query).filter(filterByStatus(status));
  if (pretty) {
    jsome(results);
  } else {
    console.log(JSON.stringify(results));
  }
}

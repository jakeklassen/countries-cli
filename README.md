# countries-cli [![Build Status](https://travis-ci.org/jakeklassen/countries-cli.svg?branch=master)](https://travis-ci.org/jakeklassen/countries-cli)

> Query country information from the [country-data](https://www.npmjs.com/package/country-data) npm package.

## Install

```shell
$ npm i -g countries-cli
```

Or for one-time run:

```
$ npx countries-cli
```

## Usage

`countries-cli` responds with a formatted JSON array by default if the process doesn't fail:

```shell
$ countries-cli --name canada
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
```

When nothing is found:

```shell
$ countries-cli --name whoops
[]
```

If you want an unformatted JSON string as output, use `--no-pretty`:

```shell
$ countries-cli --name canada --no-pretty
[{"alpha2":"CA","alpha3":"CAN","countryCallingCodes":["+1"],"currencies":["CAD"],"emoji":"🇨🇦","ioc":"CAN","languages":["eng","fra"],"name":"Canada","status":"assigned"}]
```

This is useful when using a tool like `jq` where the colorized format will fail to parse:

```shell
$ countries-cli --name canada --no-pretty | jq '.[] | { name: .name }'
{
  "name": "Canada"
}
```

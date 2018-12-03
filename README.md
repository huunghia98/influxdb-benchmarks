influxdb-benchmarks
===================

InfluxDB benchmarks

[![License](https://img.shields.io/npm/l/influxdb-benchmarks.svg)](https://github.com/lqmanh/influxdb-benchmarks/blob/master/package.json)
[![Version](https://img.shields.io/npm/v/influxdb-benchmarks.svg)](https://npmjs.org/package/influxdb-benchmarks)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g influxdb-benchmarks
$ influxdb-benchmarks COMMAND
running command...
$ influxdb-benchmarks (-v|--version|version)
influxdb-benchmarks/0.0.0 linux-x64 node-v11.3.0
$ influxdb-benchmarks --help [COMMAND]
USAGE
  $ influxdb-benchmarks COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`influxdb-benchmarks delete DBMS`](#influxdb-benchmarks-delete-dbms)
* [`influxdb-benchmarks get-data`](#influxdb-benchmarks-get-data)
* [`influxdb-benchmarks help [COMMAND]`](#influxdb-benchmarks-help-command)
* [`influxdb-benchmarks insert DBMS`](#influxdb-benchmarks-insert-dbms)

## `influxdb-benchmarks delete DBMS`

Delete data from InfluxDB or MySQL

```
USAGE
  $ influxdb-benchmarks delete DBMS

ARGUMENTS
  DBMS  (influxdb|mysql) Database management system

OPTIONS
  -h, --help     show CLI help
  -v, --version  show CLI version
  --db=db        [default: system-usage] database name
```

_See code: [src/commands/delete.js](https://github.com/lqmanh/influxdb-benchmarks/blob/v0.0.0/src/commands/delete.js)_

## `influxdb-benchmarks get-data`

Get data sample

```
USAGE
  $ influxdb-benchmarks get-data

OPTIONS
  -h, --help               show CLI help
  -n, --nrecords=nrecords  [default: 1] number of records
  -v, --version            show CLI version
```

_See code: [src/commands/get-data.js](https://github.com/lqmanh/influxdb-benchmarks/blob/v0.0.0/src/commands/get-data.js)_

## `influxdb-benchmarks help [COMMAND]`

display help for influxdb-benchmarks

```
USAGE
  $ influxdb-benchmarks help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `influxdb-benchmarks insert DBMS`

Insert data into InfluxDB or MySQL

```
USAGE
  $ influxdb-benchmarks insert DBMS

ARGUMENTS
  DBMS  (influxdb|mysql) Database management system

OPTIONS
  -h, --help               show CLI help
  -n, --nrecords=nrecords  [default: 1] number of records
  -o, --optimized          execute in optimization mode
  -v, --version            show CLI version
  --db=db                  [default: system-usage] database name
```

_See code: [src/commands/insert.js](https://github.com/lqmanh/influxdb-benchmarks/blob/v0.0.0/src/commands/insert.js)_
<!-- commandsstop -->

[![License](https://img.shields.io/npm/l/influxdb-benchmarks.svg)](https://github.com/lqmanh/influxdb-benchmarks/blob/master/package.json)

# influxdb-benchmarks
> InfluxDB benchmarks

## Table of Contents
<!-- toc -->
* [Table of Contents](#table-of-contents)
* [Installation](#installation)
* [How to use](#how-to-use)
<!-- tocstop -->

## Installation
```
$ git clone git@github.com:lqmanh/influxdb-benchmarks.git
$ cd influxdb-benchmarks
$ npm i
```
## How to Use
1. First, you need to have *InfluxDB* and *MySQL/MariaDB* installed and running in you system.
2. Use shell to create a database named `systemusage` for both DBMS.
```
$ mysql -u root -p
> create database systemusage
```
```
$ influx
> create database systemusage
```
3. From project root directory, run `./bin/run`.
```
$ ./bin/run --help
InfluxDB benchmarks

VERSION
  influxdb-benchmarks/0.1.0 linux-x64 node-v11.3.0

USAGE
  $ influxdb-benchmarks [COMMAND]

COMMANDS
  delete    Delete data from InfluxDB or MySQL
  get-data  Get data sample
  help      display help for influxdb-benchmarks
  insert    Insert data into InfluxDB or MySQL
  query     Query data from InfluxDB or MySQL
```

***Notice**: You need to set the environment variable `MYSQL_ROOT_PW` to your root user password of MySQL.*
```
$ env MYSQL_ROOT_PW='mypassword'
$ ./bin/run insert mysql -n 1000000 -o
```

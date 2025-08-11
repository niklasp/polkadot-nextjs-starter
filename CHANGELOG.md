# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2025-08-03

- reactive-dot
- txbutton
- custom providers
- package updates

## [1.3.1] - 2025-04-11

- proper smoldot worker initialization
- improve `useBlockNumber` hook
- remove unused code
- document more features in README.md
- remove test page

## [1.3.0] - 2025-04-10

- remove react-query
- remove tx-provider
- improve loading indicators
- improve chain spec loading and type with JSON parsing
- update next to 15.3.0
- add turbopack to `dev` script

## [1.2.0] - 2025-04-09

### Added

- Light client with webworkers support for Polkadot chains
- Create 2 providers
  - `lightclient-api-provider` (default)
  - `rpc-api-provider` for rpc connections (faster but more centralized)
- Support for parachain connections (polkadot assetHub, paseo asset hub)
- add a CHANGELOG.md

### Changed

- Improved error handling in light client connection
- Enhanced chain spec validation
- Updated dependencies to latest versions

### Fixed

- Fixed relay chain connection issues
- Improved error messages for chain connection failures

## [1.1.0] - 2025-03-28

### Added

- Chain selection component with dropdown menu
- demo balance component to demonstrate hook usage
- added readme

## [1.0.0] - 2025-03-20

### Added

- Initial project setup with Next.js 15
- Polkadot API integration
- Basic chain configuration
- UI components with Shadcn UI

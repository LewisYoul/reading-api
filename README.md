# Reading API Proxy

A simple NestJS proxy server that routes requests to the Reading Borough Council API to avoid CORS issues.

## Installation

```bash
npm install
```

## Running the server

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm start
```

The server will run on `http://localhost:3001`

## Endpoints

### Get Addresses by Postcode
```
GET /api/reading/rbc/getaddresses/:postcode
```
Example: `GET /api/reading/rbc/getaddresses/RG1 1AA`

### Get Bin Collections by UPRN
```
GET /api/reading/api/collections/:uprn
```
Example: `GET /api/reading/api/collections/123456789`

## CORS Configuration

CORS is enabled for all origins. In production, you should restrict this to your specific domain.

## Usage with Reading App

To use this proxy with the reading-app, update the frontend to point to this server instead of using the Vite proxy:

1. Start this API server: `npm run start:dev`
2. Update the reading-app to make requests to `http://localhost:3001` instead of the current proxy endpoints

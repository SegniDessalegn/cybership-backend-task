## Design Decisions

- **Extensible Architecture**: Uses interfaces (ICarrier) to allow adding new carriers without changing existing code.
- **Strong Typing**: Domain models with Zod validation for runtime safety.
- **OAuth Auth**: Handles token acquisition, caching, and refresh transparently.
- **Error Handling**: Structured errors with meaningful messages.
- **Configuration**: Environment variables for secrets and settings.
- **Testing**: Integration tests with stubbed HTTP calls.

# Cybership Carrier Integration Service

A TypeScript service for integrating with shipping carriers, starting with UPS.

## How to Run

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in UPS credentials (though not needed for tests).
3. Build: `npm run build`
4. Test: `npm test`

## Usage

```typescript
import { UPSCarrier } from './src';

const carrier = new UPSCarrier();
const rates = await carrier.getRates({
  origin: { street: '123 Main St', city: 'Anytown', state: 'CA', zip: '12345', country: 'US' },
  destination: { ... },
  packages: [{ weight: 10, length: 12, width: 8, height: 6 }],
});
```

## What I'd Improve Given More Time

- Add more carriers (eg. FedEx).
- Finish up Auth and other API requests according to carriers' API
- Include more test cases

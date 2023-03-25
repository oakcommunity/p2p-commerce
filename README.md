# OAK

## Thanks
- Big thanks to [uniswap wallet](https://github.com/Uniswap/wallet). I spent more than a few hours in their `package.json` figuring out which integrations to use and saving a lot of lead time on implementation details

- Big thanks to GPT-4 for helping us save a lot of time (4x more productive)

- Contributors: Ben Kim, Ian, Fred Zaw

## Getting Started
- install expo go on mobile app, install expo cli
- `npm install` - install those dependencies
- `npx expo start` - get the dev server running
- scan QR code on dev server with camera app/expo go

## Implementation Documentation

Framework Set Up
- https://reactnative.dev/docs/environment-setup

React Native + Ethers Context Specific
- https://docs.ethers.org/v5/cookbook/react-native/

Private Key Storage
- https://docs.expo.dev/versions/latest/sdk/securestore/

Mobile App Navigation
- https://reactnavigation.org/docs/hello-react-navigation
- https://reactnavigation.org/docs/tab-based-navigation/

State Management
- https://redux-toolkit.js.org/introduction/getting-started

QR Code Scanner
- https://www.npmjs.com/package/react-native-qrcode-scanner

User Authentication SMS + Database
- [twilio sms provider](https://supabase.com/docs/guides/auth/phone-login/twilio) - ben has creds
- [supabase auth sms](https://supabase.com/docs/guides/getting-started/tutorials/with-expo) - ben has creds
- [supabase database](https://supabase.com/docs/guides/database) - ben has creds

- Design System
- [tailwind-lite](https://www.nativewind.dev/)
## Feature Work

Phase 1
- User Onboarding
    - Mobile App Set Up
        - navigation + routing (done)
        - state management (done)
        - authentication (done)
        - protected routes (done)
            - autoroute user to sign in/sign up flow if local wallet record not found
    - Wallet Management
        - New Wallet creation (in progress)
            - wallet generation (done)
            - get user to write down seed phrase and delete seed phrase from local store (TODO)
                - Ben: we should defer this for a potential iCloud backup instead
        - Wallet Generation from Seed Phrase (done)
        - Delete local wallet store (done)
        - store keys on local device via mobile encrypted storage (keychain) (done)
    - Supabase (Auth + Database)
        - username
        - public key (wallet address)
        - phone number (done)

Phase 2
- Wallet Interactions
    - send USDC + pay MATIC to 0x address (done)
    - name alias look up -> 0x address for payment

Phase 3
- Payment UX: make it easy to send USDC
    - QR Code generation (done)
    - NFC payment enabled


## Testing

Testing for iOS is such a pain... my goodness

### IOS only
- find your device UDID # (https://udid.tech/) (your mobile phone only please)
- send it to me, I'll register you (I only have 100 slots, non transferrable...) (Ill add you here: https://developer.apple.com/account/resources/devices/add)
- great, you're now provisioned.
-   

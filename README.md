# OAK

## Thanks
- Big thanks to uniswap wallet repo and all the hardworking contributors of my favorite project in web3
- https://github.com/Uniswap/wallet
- I spent more than a few hours in their `package.json` figuring out which integrations to use and saving a lot of lead time on implementation details

- Also thanks to GPT-4 for supercharging my dev lifecycle; some of the more mundane/trivial tasks for utility functions, repo layout, set up, and and menial tasks that still contribute a lot to cognitive load were offloaded to GPT. Probably saved me 10-20 hours of dev time.

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

"UUID" for Authentication via Device Info
- https://www.npmjs.com/package/react-native-device-info?activeTab=versions

Mobile App Navigation
- https://reactnavigation.org/docs/hello-react-navigation
- https://reactnavigation.org/docs/tab-based-navigation/

State Management
- https://redux-toolkit.js.org/introduction/getting-started

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
    - User Authentication-lite
        - Fetch Device ID for user auth + access to username / wallet record
        - username
    - Phase 1.5
        - Database
            - username
            - public key (wallet address)
            - device id (user can have multiple device id)
            - phone number?
            - email?

Phase 2
- Wallet Interactions
    - send USDC + pay MATIC to 0x address
    - name alias look up -> 0x address for payment
    - dev/test options
        - Jesse Pollack will send dev wallet sufficient amount of Goerli ETH (base testnet) + USDC

Phase 3
- Payment UX: make it easy to send USDC
    - QR Code generation
    - NFC payment enabled

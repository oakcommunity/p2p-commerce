# OAK

## Getting Started
- install expo go on mobile app
- `npm install`
- `npx expo start`
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

## Feature Work

Phase 1
- User Onboarding
    - Mobile App Set Up
        - navigation + routing
        - state management
        - authentication
    - Wallet Management
        - New Wallet creation (in progress)
            - get user to write down seed phrase
            - then delete local seed phrase store
        - Old Wallet import (done)
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

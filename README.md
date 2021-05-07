# Discord Bot with Slash Command

This is an experimental implementation with `discord.js` and `slash-commands`. This is very unstable and not tested, so you must refer this with caution.

## Build

No build step is required. Just you run `yarn`(or `yarn install`).

## Run

### Step 1: Register command

Please set .env first. Then, run `yarn register` to register some commands(for guild context) to your bot.

### Step 2: Run the bot

Run `yarn start` to run the bot. Since *discord.js* is not ready for Slash Command, Bot application itself is implemented by JavaScript. Without type definition, further development is difficult.

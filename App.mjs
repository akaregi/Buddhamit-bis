import { Client } from 'discord.js'
import dotenv from 'dotenv'
import log4js from 'log4js'

// Logger
const logger = log4js.getLogger()
logger.level = 'debug'

// dotenv
dotenv.config()

// Client
const client = new Client()

const main = async () => {
    logger.info('Buddhamit Bis is starting.')

    if (!process.env['TOKEN']) {
        logger.error('Token is not set.')
        return
    }

    client.on('ready', () => {
        logger.info('Buddhamit Bis is ready.')
    })

    client.ws.on('INTERACTION_CREATE', async interaction => {
        logger.debug(interaction)
        if (!interaction.data) {
            return
        }

        ping(interaction)
    })

    client.login(process.env['TOKEN'])
}

function ping (interaction) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: 'Pong!'
            }
        }
    })
}

main()
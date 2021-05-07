import dotenv from 'dotenv'
import { getLogger } from 'log4js'
import { DiscordInteractions } from 'slash-commands'
import { promises as fs } from 'fs'

dotenv.config()

const logger = getLogger()
logger.level = 'debug'

const APPLICATION_ID = process.env['APPLICATION_ID']
const PUBLIC_KEY = process.env['PUBLIC_KEY']
const TOKEN = process.env['TOKEN']
const GUILD_ID = process.env['GUILD_ID']


async function main () {
    if (!APPLICATION_ID || !TOKEN || !PUBLIC_KEY || !GUILD_ID) {
        logger.error('Environment variables are not set. Exit.')
        return
    }

    const interaction = new DiscordInteractions({
        applicationId: APPLICATION_ID,
        authToken: TOKEN,
        publicKey: PUBLIC_KEY
    })

    const files = (await fs.readdir('./tasks/commands'))
        .filter(file => file.endsWith('.ts'))
        .map(file => file.slice(0, -3))

    for (const file of files) {
        const command = await import(`./commands/${file}`)
        await interaction.createApplicationCommand(command)
    }

    const commands = await interaction.getApplicationCommands()
    logger.info(commands)
}

main()
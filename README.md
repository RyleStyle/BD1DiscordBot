# BD1DiscordBot
Star Wars based Discord bot with games and more.

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd BD1DiscordBot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your Discord bot token and MongoDB connection string
   ```bash
   cp .env.example .env
   ```

4. **Environment Variables**
   - `DISCORD_TOKEN`: Your Discord bot token from Discord Developer Portal
   - `MONGODB_URI`: Your MongoDB connection string
   - `DB_NAME`: (Optional) Database name

5. **Run the bot**
   ```bash
   node bot.js
   ```

## Features
- Quiz commands
- Countdown functionality  
- Server management
- Star Wars themed interactions

## Requirements
- Node.js 16.9.0 or higher
- MongoDB database
- Discord bot token

## Security Note
Never commit your `.env` file or any files containing sensitive tokens/credentials to version control.

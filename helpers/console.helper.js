const chalk = require('chalk');

const Success = (from, msg) => {
    console.log(`${chalk.greenBright("*", from, chalk.whiteBright('-> '), msg)}`)
}

const Error = (from, msg) => {
    console.log(`${chalk.redBright("*", from, chalk.whiteBright('-> '), msg)}`)
}

const Info = (from, msg) => {
    console.log(`${chalk.blueBright("*", from, chalk.whiteBright('-> '), msg)}`)
}

const Warning = (from, msg) => {
    console.log(`${chalk.yellowBright("*", from, chalk.whiteBright('-> '), msg)}`)
}

const Cron = (from, msg) => {
    console.log(`${chalk.bgCyanBright(chalk.red("*"), chalk.blackBright(from), chalk.red("-> "), chalk.blackBright(msg))}`)
}

Error("Logger", 'Error Color')
Success("Logger", 'Success Color')
Info("Logger", 'Info Color')
Warning("Logger", 'Warning Color')
Cron("Logger", "Cron Color")

module.exports = {
    Success,
    Error,
    Info,
    Warning,
    Cron
}

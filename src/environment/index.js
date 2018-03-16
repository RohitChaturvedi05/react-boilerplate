import { get } from "../api"

const ENV_CONSTANT_FILE = "app.env.json"
class Environment {
    env;
    constructor() {
        this.getEnvConfig();
    }

    getEnvConfig() {
        const url = `./${ENV_CONSTANT_FILE}`
        get(url).then(data => {
            if (this.validateEnvConfig(data)) {
                return data;
            } else {
                return;
            }
        }).then(data => {
            console.log(data)
            this.env = data;
            return data;
        }).then(data => {
            this.parseEnvConfig(data);
        })
    }

    validateEnvConfig(data) {
        if (!data) {
            this.configError('Unable to load Configuration!')
            return false;
        }
        const { dev, qa, prod } = data;
        const devKeys = getDeepKeys(dev);
        const qaKeys = getDeepKeys(qa);
        const prodKeys = getDeepKeys(prod);
        console.log(devKeys, prodKeys, qaKeys)
        if (!dev || devKeys.length === 0) {
            this.configError('Dev configuration is not definded!')
            return false;
        } else if (!qa || qaKeys.length === 0) {
            this.configError('QA configuration is not definded!')
            return false;
        } else if (!prod || prodKeys.length === 0) {
            this.configError('Prod configuration is not definded!')
            return false;
        } else {
            if (!(devKeys.length === qaKeys.length && JSON.stringify(devKeys) === JSON.stringify(qaKeys))) {
                this.configError('Dev,QA some property are missing!')
                return false;
            } else if (!(devKeys.length === prodKeys.length && JSON.stringify(devKeys) === JSON.stringify(prodKeys))) {
                this.configError('Dev,Prod some property are missing!')
                return false;
            } else if (!(qaKeys.length === prodKeys.length && JSON.stringify(qaKeys) === JSON.stringify(prodKeys))) {
                this.configError('QA,Prod some property are missing!')
                return false;
            } else {
                return true;
            }
        }


    }
    parseEnvConfig(data) {
        const { dev, qa, prod } = data;
        let envConfig = Object.assign({}, data);
        delete envConfig['qa']
        delete envConfig['prod']
        delete envConfig['dev']

        let env = 'qa';
        switch (env) {
            case 'qa':
                envConfig = Object.assign(envConfig, qa)
                break;
            case 'prod':
                envConfig = Object.assign(envConfig, prod)
                break;
            case 'dev':
            default:
                envConfig = Object.assign(envConfig, dev)
                break;
        }

        return envConfig;
    }
    configError(error) {
        console.log(error)
    }
}

function getDeepKeys(obj) {
    let keys = [];
    if (obj && typeof obj === 'object') {
        Object.keys(obj).map(key => {
            if (typeof obj[key] === "object") {
                var subkeys = getDeepKeys(obj[key]);
                keys = keys.concat(subkeys.map((subkey) => {
                    return key.trim() + "." + subkey.trim();
                }));
            } else {
                keys.push(key.trim());
            }
            return key;
        })

        // for (var key in obj) {
        //     keys.push(key.trim());
        //     if (typeof obj[key] === "object") {
        //         var subkeys = this.getDeepKeys(obj[key]);
        //         keys = keys.concat(subkeys.map((subkey) => {
        //             return key.trim() + "." + subkey.trim();
        //         }));
        //     }
        // }
    }
    keys = keys.sort()
    return keys;
}


const env = new Environment();

export default env;
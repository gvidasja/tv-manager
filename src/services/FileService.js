import { rename } from 'fs'

const replaceSpacesWithDots = str => str
    .replace(/ +/g, '.')
    .replace(/\.+/, '.')

const renameAndPersistExtension = (filepath, newName) => {
    if(filepath.includes('/') && filepath.includes('\\')) {
        throw new Error(`Invalid file path: ${filepath}`)
    }

    const processedNewName = replaceSpacesWithDots(newName)

    const newFilePath = filepath.replace(/^(.*[\/\\])?([^\/\\]+)(\.[\w]+)/g, `$1${processedNewName}$3`)
    
    return new Promise((resolve, reject) => rename(filepath, newFilePath, (err) => {
        if(err) reject(err);
        else resolve();
    }))
}

export default {
    renameAndPersistExtension
}
const { Glob } = require('glob')
const {writeFile} = require('fs/promises')
const { join, dirname, relative } = require('path')
const {stringify} = require('yaml')

const BLACKLIST = [
    'multi-threaded-ssr',
]

const generateWorkspaces = async () => {
    const packageJsons = new Glob('**/package.json', {})
    const packages = []
    for await (const packageJsonPath of packageJsons) {
        const packageJsonFullPath = join(__dirname, packageJsonPath)
        const { workspaces } = require(packageJsonFullPath)
        const workspacePackages = Array.isArray(workspaces) ? workspaces : workspaces?.packages
        ;(workspacePackages || []).forEach(package => {
            const relativeDirname = relative(__dirname, dirname(packageJsonFullPath))
            const calculatedPackage = join(relativeDirname, package)
            const isNotBlacklisted = BLACKLIST.find(blacklistItem => calculatedPackage.includes(blacklistItem)) === undefined
            if (isNotBlacklisted) {
                packages.push(calculatedPackage)
            }
        })
    }

    const workspacesContent = {
        packages
    }

    await writeFile('pnpm-workspace.yaml', stringify(workspacesContent))
}

generateWorkspaces()
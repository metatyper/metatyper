import * as path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sandboxTestName = 'sandbox.test.ts'
const sandboxTestPath = path.join(__dirname, `../${sandboxTestName}`)

try {
    execSync(`git restore --staged "${sandboxTestPath}"`, { stdio: 'inherit' })
} catch (error) {
    console.error(`Failed to unstage ${sandboxTestName}:`, error)
    process.exit(1)
}

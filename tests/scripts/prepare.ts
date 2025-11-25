import * as path from 'path'
import { execSync } from 'child_process'

const sandboxTestName = 'sandbox.test.ts'
const sandboxTestPath = path.join(__dirname, `../${sandboxTestName}`)

try {
    execSync(`git restore --staged "${sandboxTestPath}"`, { stdio: 'inherit' })
} catch (error) {
    console.error(`Failed to unstage ${sandboxTestName}:`, error)
    process.exit(1)
}

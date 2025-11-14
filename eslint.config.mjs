import haydenullLint from '@haydenull/fabric/eslint/react'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([haydenullLint, globalIgnores(['public', 'dist', 'client/routeTree.gen.ts'])])

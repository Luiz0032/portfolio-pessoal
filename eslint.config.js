import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', '.playwright-mcp', '.react-router']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.strict,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    rules: {
      // Módulos de rota do React Router exportam meta, Layout e ErrorBoundary junto do componente.
      'react-refresh/only-export-components': [
        'error',
        { allowExportNames: ['meta', 'links', 'Layout', 'ErrorBoundary', 'HydrateFallback'] },
      ],
      // Áreas com rolagem horizontal (diagramas, tabelas) precisam de foco para rolar pelo teclado
      // (WCAG 2.1.1; regra scrollable-region-focusable do axe). Elas usam role="region" com aria-label.
      'jsx-a11y/no-noninteractive-tabindex': ['error', { roles: ['tabpanel', 'region'] }],
    },
  },
])

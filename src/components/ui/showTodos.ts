/**
 * Avisos de conteúdo pendente (TODO) só aparecem em desenvolvimento (npm run dev).
 * No build de produção o Vite troca por `false` e o código dos avisos sai do bundle.
 */
export const showTodos = import.meta.env.DEV

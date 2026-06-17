import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import monkey from 'vite-plugin-monkey';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        name: 'カレンダーHTML生成／転記ツール',
        namespace: 'my-calendar-tool',
        version: '1.0.0',
        match: ['http://*/*', 'https://*/*'], 
        author: 'Ogasawara',
        description: 'テキストの入力からカレンダーHTMLを生成してクリップボードにデータを格納します。',
      },
    }),
  ],
})
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Painel de Avisos para TVs',
  description: 'Sistema de gerenciamento de conteúdo para TVs',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}

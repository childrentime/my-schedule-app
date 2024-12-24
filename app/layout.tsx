import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-white dark:bg-gray-900 dark:text-white">
        <header className="border-b dark:border-gray-800">
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-xl font-bold">作息管理</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
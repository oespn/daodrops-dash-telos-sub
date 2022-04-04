const Layout = ({children} : { children: React.ReactNode }) => {

  return (
    <main className="bg-gray-50 min-h-screen md:min-h-90vh container md:border md:border-gray-200 md:shadow-lg md:max-w-sm md:max-h-150 overflow-y-auto mx-auto md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
      <header className="border-b-2 border-gray-300 bg-white text-darky">
      </header>

      {children}
    </main>
  )
}

export default Layout
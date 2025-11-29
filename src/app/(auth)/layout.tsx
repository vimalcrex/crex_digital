export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            CREX<span className="text-blue-600">Digital</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Intelligent Marketing for Real Estate
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold text-white mb-4">Property not found</h1>
        <p className="text-slate-400 mb-8">
          Contact your host or property manager for the correct link
        </p>
        <a
          href="/"
          className="text-sm text-slate-500 underline underline-offset-4 hover:text-slate-300 transition-colors"
        >
          Return to home
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  return (
      <div className="space-y-8">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Welcome to Dev Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A place to share knowledge and experiences in software development
          </p>
        </section>

        <section className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-300">
            This blog is built with Next.js, MDX, and Tailwind CSS.
            Explore the latest posts about web development, programming tips,
            and software engineering best practices.
          </p>
        </section>
      </div>
  );
}
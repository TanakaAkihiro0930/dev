import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex items-center h-full mt-24 p-5">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl">404</h2>

          <p className="text-2xl font-bold">Sorry! We couldn't find this page.</p>
          <p className="mt-4 mb-8 dark:text-gray-400">But don't worry, you can find plenty of other things on our homepage.</p>

          <Link to="/" className="px-8 py-4 font-bold rounded-sm bg-blue-500 text-white hover:bg-blue-600">
            Go to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

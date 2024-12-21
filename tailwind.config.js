/** @type {import('tailwindcss').Config} */
export default {
  //content: [
  //  './views/**/*.ejs',
  //  './views/campgrounds/**/*.ejs',
  //  './views/layouts/**/*.ejs',
  //  './app.mjs',
  //  './index.mjs',
  //],
  content: [
    './views/**/*.ejs',    // Make sure to scan all EJS templates
    './app.mjs',            // If you're using JS files for dynamic classes
    './index.mjs',          // Same for any other JS files you have
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


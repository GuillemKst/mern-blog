/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths according to your project structure
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}' // Include Flowbite components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Add the Flowbite plugin
  ],
}

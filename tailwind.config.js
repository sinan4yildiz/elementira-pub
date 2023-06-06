/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./public/**/*.html', './src/**/*.{js,ts,tsx}'],
   theme: {
      extend: {
         zIndex: {
            1: '1',
            2: '2',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9'
         },
         spacing: {
            4.5: '1.125rem',
            18: '4.5rem'
         },
         screens: {
            xxs: '380px',
            xs: '520px'
         },
         fontSize: {
            xxs: ['.625rem', '.875rem'],
            int: ['13px', '1rem'],
            md: ['15px', '1.375rem'],
            '4.5xl': ['2.5rem', '2.5rem']
         },
         borderWidth: {
            3: '3px'
         },
         ringWidth: {
            3: '3px'
         },
         ringOffsetWidth: {
            3: '3px',
            5: '5px'
         },
         scale: {
            115: '1.15',
            120: '1.2'
         },
         animation: {
            'hero-bg': 'hero-bg 10s ease-in-out infinite alternate'
         }
      }
   },
   corePlugins: {
      aspectRatio: false
   },
   plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/container-queries'),
      require('prettier-plugin-tailwindcss')
   ]
}

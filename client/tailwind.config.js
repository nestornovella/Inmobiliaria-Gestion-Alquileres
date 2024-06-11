/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      extend: {
        // Colores
        colors: {
          'mi-rojo': '#ff0000',
          'mi-azul': '#0000ff',
          'mi-verde': '#00ff00',
        },
  
        // Tamaños de fuente
        fontSize: {
          'xs': ['0.75rem', { lineHeight: '1rem' }],
          'lg': ['1.5rem', { lineHeight: '2rem' }],
        },
  
        // Espaciado
        spacing: {
          '8': '0.5rem',
          '16': '1rem',
        },
  
        // Redondeo
        borderRadius: {
          'xl': '2rem',
        },
  
        // Sombras
        boxShadow: {
          'outline': '0 0 0 3px rgba(0, 0, 0, 0.1)',
        },
  
        // Transiciones
        transitionProperty: {
          'height': 'height, width',
        },
  
        // Apariencia
        button: {
          variants: {
            rounded: {
              borderRadius: 'full',
            },
          },
        },
      },
    },
  
  },
  plugins: [],
}

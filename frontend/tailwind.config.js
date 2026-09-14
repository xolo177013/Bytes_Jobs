/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'] },
      colors: {
        primary: { 50:'#f2fbf9',100:'#d6f5ee',200:'#adebde',300:'#7adcc8',400:'#45c4ac',500:'#22a08c',600:'#178071',700:'#15665c',800:'#15514a',900:'#13433d' },
        brand:   { 50:'#f2fbf9',100:'#d6f5ee',500:'#22a08c',600:'#178071',700:'#15665c' },
        ink:     { 50:'#f6f6f4',100:'#e9e8e3',500:'#6b6a63',600:'#4a4944',700:'#33322e',800:'#221f1a',900:'#171512' },
        surface: { 1:'#ffffff',2:'#faf9f6',3:'#f1efe9' },
      },
      screens: { xs: '480px' },
      borderRadius: { 'xl':'12px','2xl':'16px','3xl':'22px' },
      boxShadow: {
        'card':'0 1px 2px rgba(23,21,18,.06),0 1px 1px rgba(23,21,18,.04)',
        'card-md':'0 6px 20px rgba(23,21,18,.08),0 2px 6px rgba(23,21,18,.04)',
        'card-lg':'0 16px 40px rgba(23,21,18,.12),0 4px 12px rgba(23,21,18,.06)',
        'btn':'0 2px 8px rgba(21,102,92,.28)','btn-hover':'0 6px 18px rgba(21,102,92,.38)',
      },
      backgroundImage: {
        'hero-gradient':'linear-gradient(135deg,#15665c 0%,#178071 55%,#22a08c 100%)',
        'card-gradient':'linear-gradient(135deg,#178071 0%,#22a08c 100%)',
        'warm-gradient':'linear-gradient(135deg,#c2703d 0%,#a8472f 100%)',
        'cool-gradient':'linear-gradient(135deg,#2f6690 0%,#178071 100%)',
        'green-gradient':'linear-gradient(135deg,#178071 0%,#2f6690 100%)',
      },
    },
  },
  plugins: [],
}

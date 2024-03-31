// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     container:{
//       center:true,
    
//     },
//     extend: {

//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: '#7d3f98',
        secondry:'#ce1126',
        textprimary:'#4d4f53',
        textsecoundary:'#8a7967',
        texttertiary:'#6d6e70',
        texthexa:' rgb(245 208 254)',
        textwhite:'#eff2f3'
      },
    },
  },
  plugins: [],
}

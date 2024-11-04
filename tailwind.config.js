module.exports = {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        primary: "#EBDBFA", 
        secondary: "#F3E9FD", 
        accent: "#655469", 
        customRed: "#B40003",
      },
      fontFamily: {
        heading: ["Raleway", "sans-serif"],
        post: ["Source sans 3", "sans-serif"],
        accent: ["Poppins", "sans-serif"]
      },
      fontSize: {
	      xs: "0.7rem",
	      sm: "1rem", 
	      lg: "1.3rem", 
	      xl: "2rem", 
	    },
      screens: {
        sm: '640px',  
        md: '754px',  
        lg: '1024px', 
        xl: '1280px',
      },
      width: {
        '350': '350px', 
        '550': '550px',
      },
    },
  },
  plugins: [],
};
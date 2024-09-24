export default async function router(pathname = window.location.pathname) {
  try {
      switch (pathname) {
          case "/index.html":
          case "/":
              await import("./views/home.js");
              console.log('Loaded home.js');
              break;
          case "/auth/":
              await import("./views/auth.js");
              console.log('Loaded auth.js');
              break;
          case "/auth/login/":
              await import("./views/login.js");
              console.log('Loaded login.js');
              break;
          case "/auth/register/":
              await import("./views/register.js");
              console.log('Loaded register.js');
              break;
            case "/post/":
            case "/post/index.html": 
                await import("./views/post.js");
                console.log('Loaded post.js');
                break;
            case "/post/edit/":
            case "/post/edit/index.html":
              await import("./views/postEdit.js");
              console.log('Loaded postEdit.js');
              break;
          case "/post/create/":
              await import("./views/postCreate.js");
              console.log('Loaded postCreate.js');
              break;
          case "/profile/":
              await import("./views/profile.js");
              console.log('Loaded profile.js');
              break;
          default:
              await import("./views/notFound.js");
              console.log('Loaded notFound.js');
      }
  } catch (error) {
      console.error('Error in router:', error);
  }
}

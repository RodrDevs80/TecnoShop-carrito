const toggle = document.createElement("img")
toggle.id = "toggle-theme"
toggle.setAttribute("src","./src/assets/img/eclipse-moon.svg")
document.body.appendChild(toggle)
toggle.addEventListener("click", function () {
    // Selecciona todas las etiquetas <link> que apuntan a hojas de estilo
    const links = document.querySelectorAll('link[rel="stylesheet"]');

    links.forEach((link) => {
      const href = link.getAttribute("href"); // Obtén el valor actual de href

      // Verifica si contiene 'styles' y reemplaza por 'stylesDark', o viceversa
      if (href.includes("/stylesDark/")) {
        const newHref = href.replace("/stylesDark/", "/styles/");
        link.setAttribute("href", newHref); // Cambia a los estilos normales
        document.getElementById("toggle-theme").setAttribute("src","./src/assets/img/eclipse-moon.svg")

      } else if (href.includes("/styles/")) {
        const newHref = href.replace("/styles/", "/stylesDark/");
        link.setAttribute("href", newHref); // Cambia a los estilos oscuros
        document.getElementById("toggle-theme").setAttribute("src","./src/assets/img/moon.svg")
        
      }
    });
  });
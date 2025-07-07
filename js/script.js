window.addEventListener('DOMContentLoaded', () => {
  
  // 1. botno de descarga de mi CV
  // agregamos un evento al botón con id="downloadBtn"
  // al dar clic, abre el PDF en una nueva pestaña
  document.getElementById("downloadBtn")?.addEventListener("click", () => {
    window.open("assets/pdf/Stephanie_MonjarazCV.pdf", "_blank");
  });

  



  // 2. musica de fondo

  // Referencias al elemento de audio y al botón de control
  const music = document.getElementById('bgMusic');
  const toggleBtn = document.getElementById('musicToggle');
  let musicStarted = false; // Bandera para saber si la música ya comenzó




  // Función para contorlde la música
  function toggleMusic() {
    if (!musicStarted) {
      music.volume = 0.25; // volumen inicial
      music.play().then(() => {
        musicStarted = true;
        toggleBtn.textContent = '🎵'; // icono para cancion 
      }).catch(console.error);
    } else if (music.paused) {
      music.play(); // si está detenida, vuelve a tocar
      toggleBtn.textContent = '🎵';
    } else {
      music.pause(); // Si está sonando, pausar
      toggleBtn.textContent = '🔇'; //icono para apagar
    }
  }

  // inicia la cancion con el primer clic en cualquier parte del doc
  window.addEventListener('click', () => {
    if (!musicStarted) toggleMusic();
  }, { once: true }); //solo ejecuta una vez

  //permite controlar la música con el botón toggle
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // evita que también active el evento del doc
    toggleMusic();
  });


 
  // 3. Animación de entrada por scroll
  //selecciona todas las secciones con la clase "fade-in-up"
  const sections = document.querySelectorAll('.fade-in-up');


  //crea un IntersectionObserver para animar elementos 
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); //agregamos clase visible
        observer.unobserve(entry.target); //solo se anima una vez
      }
    });
  }, { threshold: 0.1 }); //umbral para la visibilidad %


  //aplica el observer a todas las secciones
  sections.forEach(section => observer.observe(section));

  

  // 4. Mapa con Leaflet
  // inicia el mapa centrado en Coyo
  const map = L.map('mapContainer').setView([19.3465, -99.1618], 16);

  //caa base de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  //agre marcador personalizado 
  L.marker([19.4326, -99.1332]).addTo(map).bindPopup('Based in CDMX 🇲🇽');





  
  // 5. Easter Egg – Terminal Hacker

  // Referencias a los elementos del overlay/terminal
  const secretTrigger = document.getElementById('easterTrigger');
  const overlay = document.getElementById('overlaySecret');
  const terminal = document.getElementById('terminal');
  const input = document.getElementById('secretInput');
  const closeBtn = document.getElementById('closeOverlay');
  const overlayBox = document.getElementById('overlayBox');
  const promptLine = "🚀 stephanie-blue@StephMonjaraz ~/CV/StephMonjaraz $ ";
  let userInput = "";



  //al hacer clic en el nombre, se da la secuencia
  secretTrigger?.addEventListener('click', () => {
    overlay.style.display = 'flex'; //enseña el overlay completo
    overlayBox.classList.add("centrado"); //centra el mensaje inicial
    input.style.display = 'none'; // oculta el input al inicio
    closeBtn.style.display = 'none'; // ocultaa el botón cerrar al inicio
    terminal.classList.remove("modo-terminal"); // elimina estilo tipo terminal
    terminal.textContent = "CERCA TROVA"; // 1er mensaje
    terminal.style.textAlign = "center";


    // espera  1.5 segundos, y luego activa la terminal real
    setTimeout(() => {
      overlayBox.classList.remove("centrado");
      overlayBox.classList.add("overlay-terminal");
      terminal.classList.add("modo-terminal");
      terminal.textContent = `${promptLine}\n\"I was born at night and spin without rest...\"\n\n${promptLine}`;
      terminal.style.textAlign = "left";
      input.style.display = 'block';
      closeBtn.style.display = 'block';
      input.focus();
      userInput = "";
      document.addEventListener("keydown", handleKeyPress);
    }, 1500);
  });

  //entrada por teclado para ingresar la clave
  function handleKeyPress(e) {
    if (overlay.style.display !== "flex" || input.style.display === "none") return;

    if (e.key === "Enter") {
      const entered = input.value.trim().toUpperCase();
      input.value = ""; //limpia input

      if (entered === "LUNA") {
        // si la contraseña esta bien, muestra los libros y borra todo anterior
        terminal.textContent = "✔ access granted\n\n📚 Books that illuminated the absurdity of the path:\n\n";

        terminal.textContent += "– \"Man’s Search for Meaning\"\n  Taught me I can't change the world — but I can change myself.\n\n";
        terminal.textContent += "– \"Who Moved My Cheese?\"\n  I won’t spoil it. Just read it — sooner rather than later.\n\n";
        terminal.textContent += "– \"Lapvona\"\n  Darker than they say. It taught me about the dualities of life\n  and how to hide within its quiet middle point.\n\n";
        terminal.textContent += "– \"Beyond Good and Evil\"\n \n\n– Luna\n";
        document.removeEventListener("keydown", handleKeyPress);
        input.style.display = "none";
      } else {
        //si la contraseña está mal, se ven las pistas (aleaotio)
        const hints = [
          `\"The moon is a mirror — what do you reflect?\"`,
          `\"The answer was whispered in your favorite color.\"`,
          `\"She dances in the shadows... but her name is light.\"`,
          `\"You’ve already seen the key — hidden in plain sight.\"`,
          `\"Only those who know her name may enter.\"`
        ];
        const hint = hints[Math.floor(Math.random() * hints.length)];
        terminal.textContent = `❌ access denied\n💡 Clue: ${hint}`;
      }
    }
  }

  


  // 6. Botón para cerrar el overlay manualmente
 

  //ciierra manualmente desde el botón "✖"
  closeBtn.addEventListener('click', () => {
    overlay.style.display = "none";
    terminal.textContent = "";
    input.value = "";
    userInput = "";
    document.removeEventListener("keydown", handleKeyPress);
  });

  //cierra al presionar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && overlay.style.display === "flex") {
      overlay.style.display = "none";
      terminal.textContent = "";
      input.value = "";
      userInput = "";
      document.removeEventListener("keydown", handleKeyPress);
    }
  });
});

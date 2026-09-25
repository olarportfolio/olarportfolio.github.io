/* ============================================================
   PORTFOLIO CONTENT
   ------------------------------------------------------------
   This is the only file you need to edit to change what the
   site shows. No HTML or CSS changes required.

   TO ADD A REAL IMAGE:  set  image: "assets/img/your-file.jpg"
   TO KEEP A PLACEHOLDER: leave  image: null
   TO REMOVE A CATEGORY:  delete its whole { ... } block
   TO REORDER:            move blocks up or down

   ratio:  ratio-16x9 (default) | ratio-a4 | ratio-3x2
           ratio-1x1 | ratio-auto (image keeps its own shape)
   ============================================================ */

const SITE = {
  name: "Oliver Armando",
  heroTitle: "Hi, I’m Oliver Armando!",
  heroSubtitle: "Scroll down to see some of my work",

  /* Contact page. Any link left as null is simply not rendered,
     so the page stays clean until you fill things in. */
  contact: {
    email: "your.email@example.com",        // TODO: replace
    availability: "Open to internships and freelance work in animation and 3D.",
    cv: null,                               // e.g. "assets/cv-oliver-armando.pdf"
    links: {
      artstation: null,                     // e.g. "https://artstation.com/yourname"
      behance:    null,
      youtube:    null,
      vimeo:      null,
      github:     null,
      instagram:  null
    }
  },

  about: {
    heading: "About me",
    intro: "Hi, my name is Oliver Armando.",
    photo: null,                            // e.g. "assets/img/portrait.jpg"
    paragraphs: [
      "I am a Mexican designer who studied in Germany. I find great pleasure in telling stories through my designs, from original character concepts to short animated films. What motivates me is the belief that design can bring people closer together. Through my work, I hope to create designs that encourage understanding, curiosity, and dialogue across cultures and perspectives.",
      "I have a rich cultural background, having attended a bicultural school in Mexico, lived in Germany for almost eight years, and met people from all over the world. This experience has given me a broader sense of the world and its diversity, while also making me curious about other ways of thinking. I have always believed that good communication begins with understanding one another. As a designer, I have the opportunity to communicate ideas in ways that transcend language and cultural boundaries, so I strive to create designs that are understandable, adaptable, and universal.",
      "I consider myself a reflective and sensitive person, capable of putting myself in other people’s shoes. I try to bring that same empathy into my work, approaching every project with curiosity, openness, and a genuine desire to understand the people I am designing for."
    ]
  }
};

/* ------------------------------------------------------------
   CATEGORIES
   ------------------------------------------------------------
   id      : used in the URL, e.g. category.html?c=animation
   title   : shown on the tile hover and as the page heading
   year    : shown under the title on hover
   cover   : the grid thumbnail (null = placeholder rectangle)
   divider : optional line of text partway down the gallery

   NOTE: every `image` below is a POSTER FRAME or still. The
   videos themselves are not hosted yet — the videos are not hosted yet.
   ------------------------------------------------------------ */

const CATEGORIES = [
  {
    id: "animation",
    title: "Animations",
    year: "2019 – 2025",
    cover: "assets/img/animation/car-world.webp",
    divider: { after: 4, text: "Take a look at the other animation Projects I’ve made" },
    projects: [
      {
        title: "Mente de Nadador – 100m Libre", year: "2025", type: "video",
        image: "assets/img/animation/av-design-ii-mdma05.webp",
        description: "An experimental audiovisual animation created with an oscilloscope, exploring the sensations and emotions experienced by a swimmer before and during a competition. I created the abstract visuals and designed the soundscape, combining oscilloscope-generated sounds with other SFX such as breathing, heartbeat, water movement, and the referee’s signal. The project focuses on using rhythm, sound, and abstract imagery to communicate tension and immersion, allowing the viewer to experience the psychological intensity of a competitive swimmer."
      },
      {
        title: "Think outside the box", year: "2024", type: "video",
        image: "assets/img/animation/think-outside-the-box.webp",
        description: "A short 3D animated film exploring character animation and storytelling through body language. I created the robot, modeled the environment, animated the character, directed the camera, and developed the lighting and sound design. The project focused on giving personality and comedic expression to a non-human character by using body language and precise timing."
      },
      {
        title: "Elemental Animals Animation", year: "2023", type: "video",
        image: "assets/img/animation/elemental-animals.webp",
        description: "An experimental 2D animation project exploring how movement changes when characters are composed of unusual materials. I designed and animated each character while considering how their elemental properties would influence their movements. I was responsible for the character design, animation, coloring, and sound design."
      },
      {
        title: "Bachelor Thesis project excerpt", year: "2023", type: "video",
        image: "assets/img/animation/bachelor-thesis.webp",
        description: "2D animated short film that explores themes of empathy, family, and personal growth. The story follows a girl who is transported into different fictional worlds, each represented through a unique animation style. I developed the project independently, creating the story, characters, backgrounds, animation, sound design, and camera work. Although the project was not fully completed, it allowed me to explore long-form storytelling, world-building, and the relationship between visual style and narrative."
      },
      {
        title: "Car-World-Animation", year: "2022", type: "video",
        image: "assets/img/animation/car-world.webp",
        description: "A short Blender animation exploring 3D modeling, texturing, lighting, and animation. I created a stylized low-poly car and a miniature planet environment using Blender’s particle system to distribute vegetation. The project allowed me to experiment with contrasting visual styles, cinematic lighting, and dynamic movement."
      },
      {
        title: "Resentment, a Poison for Life", year: "2021", type: "video",
        image: "assets/img/animation/resentment.webp",
        description: "A 2D animated short film about how resentment can evolve into cycles of prejudice and violence. I created every aspect of the project, from the story and visual concept to the character designs, backgrounds, animation, and editing. The minimalist geometric character designs were chosen to support efficient animation and reinforce the film’s visual identity."
      },
      {
        title: "Two cups with toothbrushes", year: "2021", type: "video",
        image: "assets/img/animation/two-cups-toothbrushes.webp",
        description: "Created a photorealistic 3D scene in Blender by modeling everyday objects, developing procedural materials with Geometry/Shader Nodes, setting up realistic lighting, and animating the camera with dynamic focus transitions."
      },
      {
        title: "Advanced Animations", year: "2019", type: "video",
        image: "assets/img/animation/advanced-animations.webp",
        description: "For this project I had to apply what I learned previously and make more elaborate animations."
      },
      {
        title: "My first 3D animations", year: "2019", type: "video",
        image: "assets/img/animation/3d-ani-prueba.webp",
        description: "These are some exercises I did to learn to animate 3D in Maya."
      },
      {
        title: "Hypothetical 2D animated Festival Trailer", year: "2019", type: "video",
        image: "assets/img/animation/festival-trailer.webp",
        description: "This project was created as a visual identity piece for a fictional cultural festival celebrating Mesoamerican heritage. I developed the project from concept to animation, creating the characters, environments, illustrations, and motion design. Using Adobe After Effects, I rigged 2D characters and animated them using the Puppet Pin Tool, combining character movement, typography, and composition to communicate the atmosphere and purpose of the festival."
      },
      {
        title: "Altar del Día de Muertos", year: "2020", type: "video",
        image: "assets/img/animation/altar-demo.webp",
        description: "A camera animation built to show the whole scenery from every angle. Nothing here is rendered and nothing but the camera moves — the piece exists purely to walk around the set and present the modelling from all sides."
      }
    ]
  },

  {
    id: "character-design",
    title: "Character Design",
    cols: 4,                                  // small square pieces - denser grid
    year: "2023",
    cover: "assets/img/character-design/axolotl.webp",
    intro: "A set of animated stickers made for WhatsApp, created as part of a personalised Adventskalender — each day revealed a new character carrying a positive message.",
    projects: [
      { title: "Axolotl",           type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/axolotl.webp" },
      { title: "La Catarina",       type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/cat-la-catarina.webp" },
      { title: "Croissant",         type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/croissant.webp" },
      { title: "Kaffee-Affe",       type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/kaffee-affe.webp" },
      { title: "Smoothie Criminal", type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/smoothie-criminal.webp" },
      { title: "Take Whisks",       type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/take-whisks.webp" },
      { title: "Happy Worm",        type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/happy-worm.webp" },
      { title: "Hungry Chick",      type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/chick-hungry-right.webp" },
      { title: "Cozy Penguin",      type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/cozy-penguin-mirrored.webp" },
      { title: "Sleepy Seal",       type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/sleepy-seal.webp" },
      { title: "Sled Sloth",        type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/sled-sloth.webp" },
      { title: "Travel Cat",        type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/travel-cat.webp" },
      { title: "Elephant",          type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/elefant.webp" },
      { title: "Croc",              type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/croc.webp" },
      { title: "Tortoise",          type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/tortoise-no-bg.webp" },
      { title: "Bunny",             type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/bunny-pic.webp" },
      { title: "Nikolaus",          type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/nikoolaus.webp" },
      { title: "Santa Impossible",  type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/santa-impossible.webp" },
      { title: "Reno",              type: "image", ratio: "ratio-1x1", image: "assets/img/character-design/reno.webp" }
    ]
  },

  {
    id: "3d-modelling",
    title: "3D Modelling",
    year: "2020 – 2024",
    cover: "assets/img/3d-modelling/mechanical-spider-3d-model.webp",
    intro: "Models I built myself and used across different animation projects.",
    projects: [
      // --- Altar del Día de Muertos, 2020 -------------------------
      {
        title: "Altar del Día de Muertos", year: "2020", type: "image", ratio: "ratio-auto",
        image: "assets/img/3d-modelling/escudero-oliver-still1.webp",
        description: "A scenery project made to understand rendering, lighting and texturing — what it takes to bring 3D models to life. The scene combines models I built myself with downloaded assets."
      },
      { title: "Guitar",            year: "2020", type: "image", ratio: "ratio-auto", image: "assets/img/3d-modelling/guitarra-modell.webp",     description: "Built for the Altar del Día de Muertos scene." },
      { title: "Mariachi Hat",      year: "2020", type: "image", ratio: "ratio-auto", image: "assets/img/3d-modelling/mariachi-hat-modell.webp", description: "Built for the Altar del Día de Muertos scene." },
      { title: "Pan de Muerto",     year: "2020", type: "image", ratio: "ratio-auto", image: "assets/img/3d-modelling/pan-de-muerto-modell.webp", description: "Built for the Altar del Día de Muertos scene." },
      { title: "Avocado",           year: "2020", type: "image", ratio: "ratio-auto", image: "assets/img/3d-modelling/avocado-modell.webp",      description: "Built for the Altar del Día de Muertos scene." },
      // --- other projects -----------------------------------------
      { title: "Toothbrush",        year: "2021", type: "image", ratio: "ratio-auto", image: "assets/img/3d-modelling/cepillo-modell.webp",      description: "Modelled for Two cups with toothbrushes." },
      { title: "Blue King Car",     year: "2022", type: "image", ratio: "ratio-auto", image: "assets/img/3d-modelling/auto-azul-rey-finish.webp", description: "Modelled for Car-World-Animation." },
      { title: "World Road",        year: "2022", type: "image", ratio: "ratio-auto", image: "assets/img/3d-modelling/world-road-modell.webp",   description: "Modelled for Car-World-Animation." },
      { title: "Mechanical Spider", year: "2024", type: "image", ratio: "ratio-auto", image: "assets/img/3d-modelling/mechanical-spider-3d-model.webp", description: "Modelled for Think outside the box." }
    ]
  },

  {
    id: "graphic-design",
    title: "Graphic Design",
    year: "2024",
    cover: "assets/img/graphic-design/step-up.webp",
    intro: "Typography Experimental Bookazine — a series of designs exploring different forms, colour palettes, styles and typography.",
    projects: [
      { title: "Cover",                 type: "image", ratio: "ratio-a4",  image: "assets/img/graphic-design/cover-official.webp" },
      { title: "Waverider I",           type: "image", ratio: "ratio-a4",  image: "assets/img/graphic-design/waverider-1.webp" },
      { title: "Waverider II",          type: "image", ratio: "ratio-a4",  image: "assets/img/graphic-design/waverider-2.webp" },
      { title: "Illusion Heavens",      type: "image", ratio: "ratio-a4",  image: "assets/img/graphic-design/illusion-heavens.webp" },
      { title: "Spyral Abyss",          type: "image", ratio: "ratio-a4",  image: "assets/img/graphic-design/spyral-abyss.webp" },
      { title: "Words on Paper I",      type: "image", ratio: "ratio-a4",  image: "assets/img/graphic-design/words-on-paper-1.webp" },
      { title: "Words on Paper II",     type: "image", ratio: "ratio-a4",  image: "assets/img/graphic-design/words-on-paper-2.webp" },
      { title: "Move Fast",             type: "image", ratio: "ratio-3x2", image: "assets/img/graphic-design/move-fast.webp" },
      { title: "The day u stop racing", type: "image", ratio: "ratio-3x2", image: "assets/img/graphic-design/day-u-stop-racing.webp" },
      { title: "Step Up",               type: "image", ratio: "ratio-3x2", image: "assets/img/graphic-design/step-up.webp" }
    ]
  },

  {
    id: "corporate-design",
    title: "Corporate Design",
    cols: 3,
    year: "2021 – 2023",
    cover: "assets/img/corporate-design/paigo-riverty.webp",
    dividers: [
      { after: 2, text: "Made during my internship at HorseAnalytics, where I developed content for their social media — mostly tutorials on using their app — and later, on my own initiative, produced these animated GIFs for the company to use in Instagram stories and similar formats." }
    ],
    projects: [
      {
        title: "Paigo wird zu Riverty", year: "2022", type: "video",
        image: "assets/img/corporate-design/paigo-riverty.webp",
        description: "As a student assistant at Arvato Financial Solutions I worked on visual communication projects for internal company use, creating motion graphics, presentation designs, and visual materials for employee training and intranet platforms."
      },
      {
        title: "LSE intro Variations – Riverty", year: "2023", type: "video",
        image: "assets/img/corporate-design/lse-intro-riverty.webp",
        description: "Another example of the work I made while I was there."
      },
      // HorseAnalytics internship work - context is in `dividers` above.
      {
        title: "Instagram feed", year: "2021", type: "image", ratio: "ratio-auto",
        image: "assets/img/corporate-design/instagram-ha-posts.webp",
        description: "A view of the account, showing the kind of content I produced for it alongside the animated GIFs."
      },
      { title: "Furryfit — Logo 3D",          year: "2021", type: "image", ratio: "ratio-1x1", image: "assets/img/corporate-design/furryfit-3d.webp" },
      { title: "Furryfit — Dog Walk",         year: "2021", type: "image", ratio: "ratio-1x1", image: "assets/img/corporate-design/furryfit-dogwalk.webp" },
      { title: "Furryfit — Bone",             year: "2021", type: "image", ratio: "ratio-1x1", image: "assets/img/corporate-design/furryfit-bone.webp" },
      { title: "Furryfit — Bone, Var. 2",     year: "2021", type: "image", ratio: "ratio-1x1", image: "assets/img/corporate-design/furryfit-bone-2nd-var.webp" },
      { title: "Furryfit — Logo, Var. 3",     year: "2021", type: "image", ratio: "ratio-1x1", image: "assets/img/corporate-design/furry-logo-3rd.webp" },
      { title: "Horse Analytics — Logo",      year: "2021", type: "image", ratio: "ratio-1x1", image: "assets/img/corporate-design/logo-horseanalytics-correct.webp" },
      { title: "Horse Analytics — Logotype",  year: "2021", type: "image", ratio: "ratio-1x1", image: "assets/img/corporate-design/logotyp-final.webp" },
      { title: "Horse Analytics — Run Cycle", year: "2021", type: "image", ratio: "ratio-1x1", image: "assets/img/corporate-design/gif-horse-run.webp" }
    ]
  },

  {
    id: "web-design",
    title: "Web Design",
    year: "2019",
    cover: "assets/img/web-design/animal-shelter-screentest.webp",
    projects: [
      {
        title: "Dog Shelter Brunswick", year: "2019", type: "video",
        image: "assets/img/web-design/animal-shelter-screentest.webp",
        description: "A responsive website prototype designed for a fictional animal rescue organization. Developed entirely with HTML and CSS, the project focuses on creating an accessible, user-friendly interface that communicates the organization’s mission while making information easy to navigate."
      },
      {
        title: "Dog Shelter — First Layout", type: "image", ratio: "ratio-auto",
        image: "assets/img/web-design/tierheim-layout-alternative-var.webp",
        description: "My first version of the shelter site. I came back to the project later, with more web design experience behind me, and rebuilt it into the version above."
      },
      {
        title: "Portfolio Concept I", year: "2021", type: "image", ratio: "ratio-auto",
        image: "assets/img/web-design/other-personal-websitedesign-1.webp",
        description: "A concept for my own portfolio site, designed in Adobe XD — the direct precursor to the site you are reading this on."
      },
      {
        title: "Portfolio Concept II", year: "2021", type: "image", ratio: "ratio-auto",
        image: "assets/img/web-design/other-personal-websitedesign-2.webp",
        description: "A second Adobe XD concept for the same portfolio, exploring an alternative layout before the design was built in HTML and CSS."
      }
    ]
  },

  {
    id: "game-design",
    title: "Game Design",
    year: "2026",
    cover: "assets/img/game-design/jaguar-mainscene.webp",
    dividers: [
      { after: 2, text: "Experiments in building my own games with Claude Code. Both are works in progress, but they show how I have learned to use Claude Code to actually create something playable." }
    ],
    projects: [
      {
        title: "Jaguar — Master’s Thesis", year: "2026 – in progress", type: "video",
        image: "assets/img/game-design/jaguar-mainscene.webp",
        description: "A prototype platformer game exploring how interactive media can be used to communicate wildlife conservation topics. The project focuses on creating an immersive experience based on jaguar movement and behavior, combining level design, gameplay mechanics, and procedural animation techniques. Currently in development, the prototype explores systems for naturalistic animal locomotion — running, jumping, climbing, and swimming — with the goal of creating a more natural connection between player movement and animal behavior."
      },
      {
        title: "Jaguar — Locomotion Lab", year: "2026", type: "video",
        image: "assets/img/game-design/jaguar-lab.webp",
        description: "The continuation of the thesis project, and the point where it stopped being a traditional 2D platformer and became a physics-based game. The jaguar is not keyframed: it is driven by procedural animation, with the rig’s proportions and gait fitted against measurements of real jaguar movement so that walking, running and footfall timing follow the animal’s actual anatomy rather than an approximation. This lab scene is where that locomotion system is built and tested. Still a work in progress."
      },
      { title: "Parkour Game",    year: "2026", type: "video", image: "assets/img/game-design/parkour-game.webp" },
      { title: "Pelota de Fuego", year: "2026", type: "video", image: "assets/img/game-design/pelota-de-fuego.webp" }
    ]
  }

  /* ---------------------------------------------------------------
     RETIRED: "Filmmaking" was replaced by Game Design.
     Kept here so the one real project in it isn't lost — paste this
     block back in, or move the project into another category.

  {
    id: "filmmaking",
    title: "Filmmaking",
    year: "2020",
    cover: null,
    projects: [
      { title: "SS20 MD4 Sounddesign", type: "video", image: null },
      { title: "Project 02",           type: "video", image: null }
    ]
  }
  --------------------------------------------------------------- */
];

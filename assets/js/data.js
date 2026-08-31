/* ============================================================
   PORTFOLIO CONTENT
   ------------------------------------------------------------
   This is the only file you need to edit to change what the
   site shows. No HTML or CSS changes required.

   TO ADD A REAL IMAGE:  set  image: "assets/img/your-file.jpg"
   TO KEEP A PLACEHOLDER: leave  image: null
   TO REMOVE A CATEGORY:  delete its whole { ... } block
   TO REORDER:            move blocks up or down
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
   ------------------------------------------------------------ */

const CATEGORIES = [
  {
    id: "animation",
    title: "Animations",
    year: "2019 – 2025",
    cover: null,
    divider: { after: 4, text: "Take a look at the other animation Projects I’ve made" },
    projects: [
      {
        title: "Mente de Nadador – 100m Libre", year: "2025", type: "video", image: null,
        description: "An experimental audiovisual animation created with an oscilloscope, exploring the sensations and emotions experienced by a swimmer before and during a competition. I created the abstract visuals and designed the soundscape, combining oscilloscope-generated sounds with other SFX such as breathing, heartbeat, water movement, and the referee’s signal. The project focuses on using rhythm, sound, and abstract imagery to communicate tension and immersion, allowing the viewer to experience the psychological intensity of a competitive swimmer."
      },
      {
        title: "Think outside the box", year: "2024", type: "video", image: null,
        description: "A short 3D animated film exploring character animation and storytelling through body language. I created the robot, modeled the environment, animated the character, directed the camera, and developed the lighting and sound design. The project focused on giving personality and comedic expression to a non-human character by using body language and precise timing."
      },
      {
        title: "Elemental Animals Animation", year: "2023", type: "video", image: null,
        description: "An experimental 2D animation project exploring how movement changes when characters are composed of unusual materials. I designed and animated each character while considering how their elemental properties would influence their movements. I was responsible for the character design, animation, coloring, and sound design."
      },
      {
        title: "Bachelor Thesis project excerpt", year: "2023", type: "video", image: null,
        description: "2D animated short film that explores themes of empathy, family, and personal growth. The story follows a girl who is transported into different fictional worlds, each represented through a unique animation style. I developed the project independently, creating the story, characters, backgrounds, animation, sound design, and camera work. Although the project was not fully completed, it allowed me to explore long-form storytelling, world-building, and the relationship between visual style and narrative."
      },
      {
        title: "LSE intro Variations – Riverty", year: "2023", type: "video", image: null,
        description: "Another example of my work as a student assistant at Arvato Financial Solutions."
      },
      {
        title: "Paigo wird zu Riverty", year: "2022", type: "video", image: null,
        description: "As a student assistant I worked on visual communication projects for internal company use, creating motion graphics, presentation designs, and visual materials for employee training and intranet platforms."
      },
      {
        title: "Car-World-Animation", year: "2022", type: "video", image: null,
        description: "A short Blender animation exploring 3D modeling, texturing, lighting, and animation. I created a stylized low-poly car and a miniature planet environment using Blender’s particle system to distribute vegetation. The project allowed me to experiment with contrasting visual styles, cinematic lighting, and dynamic movement."
      },
      {
        title: "Resentment, a Poison for Life", year: "2021", type: "video", image: null,
        description: "A 2D animated short film about how resentment can evolve into cycles of prejudice and violence. I created every aspect of the project, from the story and visual concept to the character designs, backgrounds, animation, and editing. The minimalist geometric character designs were chosen to support efficient animation and reinforce the film’s visual identity."
      },
      {
        title: "Two cups with toothbrushes", year: "2021", type: "video", image: null,
        description: "Created a photorealistic 3D scene in Blender by modeling everyday objects, developing procedural materials with Geometry/Shader Nodes, setting up realistic lighting, and animating the camera with dynamic focus transitions."
      },
      {
        title: "Advanced Animations", year: "2019", type: "video", image: null,
        description: "For this project I had to apply what I learned previously and make more elaborate animations."
      },
      {
        title: "My first 3D animations", year: "2019", type: "video", image: null,
        description: "These are some exercises I did to learn to animate 3D in Maya."
      },
      {
        title: "Hypothetical 2D animated Festival Trailer", year: "2019", type: "video", image: null,
        description: "This project was created as a visual identity piece for a fictional cultural festival celebrating Mesoamerican heritage. I developed the project from concept to animation, creating the characters, environments, illustrations, and motion design. Using Adobe After Effects, I rigged 2D characters and animated them using the Puppet Pin Tool, combining character movement, typography, and composition to communicate the atmosphere and purpose of the festival."
      }
    ]
  },
  {
    id: "3d-modelling",
    title: "3D Modelling",
    year: "2020",
    cover: null,
    projects: [
      { title: "Project 01", type: "image", image: null },
      { title: "Project 02", type: "image", image: null },
      { title: "Project 03", type: "image", image: null },
      { title: "Project 04", type: "image", image: null }
    ]
  },
  {
    id: "web-design",
    title: "Web Design",
    year: "2020",
    cover: null,
    projects: [
      {
        title: "Dog Shelter Brunswick", year: "2019", type: "video", image: null,
        description: "A responsive website prototype designed for a fictional animal rescue organization. Developed entirely with HTML and CSS, the project focuses on creating an accessible, user-friendly interface that communicates the organization’s mission while making information easy to navigate."
      },
      { title: "Project 02", type: "image", image: null },
      { title: "Project 03", type: "image", image: null }
    ]
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    year: "2020",
    cover: null,
    projects: [
      { title: "Project 01", type: "image", image: null },
      { title: "Project 02", type: "image", image: null },
      { title: "Project 03", type: "image", image: null },
      { title: "Project 04", type: "image", image: null }
    ]
  },
  {
    id: "character-design",
    title: "Character Design",
    year: "2020",
    cover: null,
    projects: [
      { title: "Project 01", type: "image", image: null },
      { title: "Project 02", type: "image", image: null },
      { title: "Project 03", type: "image", image: null }
    ]
  },
  {
    id: "game-design",
    title: "Game Design",
    year: "2026",
    cover: null,
    projects: [
      {
        title: "Jaguar — Master’s Thesis", year: "2026 – in progress", type: "video", image: null,
        description: "A prototype platformer game exploring how interactive media can be used to communicate wildlife conservation topics. The project focuses on creating an immersive experience based on jaguar movement and behavior, combining level design, gameplay mechanics, and procedural animation techniques. Currently in development, the prototype explores systems for naturalistic animal locomotion — running, jumping, climbing, and swimming — with the goal of creating a more natural connection between player movement and animal behavior."
      }
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

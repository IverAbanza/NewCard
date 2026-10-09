const styles = document.createElement("style");
styles.textContent = `
  :root {
    color-scheme: light;
    --paper: #fffaf1;
    --ink: #25372d;
    --green: #356b51;
    font-family: "DM Sans", sans-serif;
    font-synthesis: none;
  }

  * { box-sizing: border-box; }

  body {
    min-width: 320px;
    min-height: 100vh;
    margin: 0;
    color: var(--ink);
    background: var(--paper);
    background-image: radial-gradient(#d9d5c8 0.65px, transparent 0.65px);
    background-size: 20px 20px;
  }

  main {
    width: min(100% - 32px, 1120px);
    min-height: 100vh;
    margin: 0 auto;
    padding: 38px 0 72px;
  }

  .masthead { display: flex; align-items: center; justify-content: space-between; padding-bottom: 18px; border-bottom: 1px solid #e2ddcf; }
  .brand { display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 700; }
  .brand-mark { display: grid; width: 32px; aspect-ratio: 1; place-items: center; border-radius: 50%; color: white; background: #e87657; font: 500 18px "Fraunces", Georgia, serif; }
  .masthead-note { color: #68746b; font-size: 12px; }
  .hero { display: flex; align-items: end; justify-content: space-between; gap: 28px; margin: 56px 0 40px; }
  .hero-copy { max-width: 620px; }
  .eyebrow { margin: 0 0 13px; color: #ad573e; font-size: 12px; font-weight: 700; }
  h1 { margin: 0; font: 500 50px/1.05 "Fraunces", Georgia, serif; }
  .hero-note { margin: 12px 0 0; color: #68746b; font-size: 15px; line-height: 1.6; }

  profile-card-button { display: inline-block; flex: 0 0 auto; }
  profile-card { display: block; width: 100%; min-width: 0; }
  #profile-card-region {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
    gap: 20px;
  }
  #profile-card-region:empty { display: none; }

  @media (max-width: 720px) {
    main { width: min(100% - 28px, 560px); padding-top: 22px; }
    .hero { align-items: flex-start; flex-direction: column; gap: 22px; margin: 38px 0 30px; }
    h1 { font-size: 40px; }
    .masthead-note { font-size: 11px; }
  }

  @media (max-width: 380px) {
    h1 { font-size: 36px; }
  }
`;
document.head.append(styles);

const main = document.createElement("main");
const masthead = document.createElement("header");
masthead.className = "masthead";
const brand = document.createElement("div");
brand.className = "brand";
const brandMark = document.createElement("span");
brandMark.className = "brand-mark";
brandMark.textContent = "p";
const brandName = document.createElement("span");
brandName.textContent = "PROFILE CARD";
brand.append(brandMark, brandName);
const mastheadNote = document.createElement("span");
mastheadNote.className = "masthead-note";
mastheadNote.textContent = "Little intros, big personality";
masthead.append(brand, mastheadNote);

const hero = document.createElement("section");
hero.className = "hero";
const heroCopy = document.createElement("div");
heroCopy.className = "hero-copy";
const eyebrow = document.createElement("p");
eyebrow.className = "eyebrow";
eyebrow.textContent = "A little hello";
const title = document.createElement("h1");
title.textContent = "Meet someone new.";
const heroNote = document.createElement("p");
heroNote.className = "hero-note";
heroNote.textContent = "A colorful collection of people, places, and little stories.";
heroCopy.append(eyebrow, title, heroNote);

const profileButton = document.createElement("profile-card-button");
profileButton.setAttribute("label", "Add Profile Card");

const cardRegion = document.createElement("section");
cardRegion.id = "profile-card-region";
cardRegion.setAttribute("aria-label", "Profile card");
cardRegion.setAttribute("aria-live", "polite");

hero.append(heroCopy, profileButton);
main.append(masthead, hero, cardRegion);
document.body.replaceChildren(main);

const profiles = [
  {
    label: "Creative profile",
    name: "Maya Santos",
    description: "Visual artist",
    about: "Turning everyday scenes into bright illustrations.",
    location: "Cebu City",
    color: "#f4c9b8",
    accent: "#ca684a"
  },
  {
    label: "Curious builder",
    name: "Theo Cruz",
    description: "Software student",
    about: "Learning to build useful things, one project at a time.",
    location: "Quezon City",
    color: "#c9e1e4",
    accent: "#4d7d83"
  },
  {
    label: "Meet a maker",
    name: "Aya Reyes",
    description: "Front-end developer",
    about: "I love accessible websites, clean layouts, and good coffee.",
    location: "Davao City",
    color: "#d7e7c8",
    accent: "#638b49"
  },
  {
    label: "On the go",
    name: "Nico Villanueva",
    description: "Mobile app designer",
    about: "Making small, thoughtful tools for everyday life.",
    location: "Baguio City",
    color: "#f2dfa0",
    accent: "#a57b1c"
  },
  {
    label: "Behind the lens",
    name: "Sam Flores",
    description: "Photographer",
    about: "Collecting light, quiet streets, and little stories.",
    location: "Iloilo City",
    color: "#e7d4e7",
    accent: "#96699a"
  },
  {
    label: "Words and community",
    name: "Lina Garcia",
    description: "Writer and volunteer",
    about: "Sharing ideas, stories, and Sunday meals.",
    location: "Makati City",
    color: "#cbdccf",
    accent: "#527b5c"
  }
];

let availableProfiles = [...profiles];
let previousProfileName = "";

function chooseRandomProfile() {
  if (!availableProfiles.length) {
    availableProfiles = profiles.filter((profile) => profile.name !== previousProfileName);
  }

  const index = Math.floor(Math.random() * availableProfiles.length);
  const [profile] = availableProfiles.splice(index, 1);
  previousProfileName = profile.name;
  return profile;
}

profileButton.addEventListener("profile-card-request", () => {
  const card = document.createElement("profile-card");
  card.profile = chooseRandomProfile();
  cardRegion.append(card);
});
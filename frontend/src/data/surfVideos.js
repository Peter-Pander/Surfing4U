const surfVideos = [
  {
    name: "Surf Girls Hawaii",
    platform: "Amazon Prime Video",
    description:
      "The next generation of Native Hawaiian female surfers compete at elite levels to earn a coveted spot on the World Tour of professional Surfing. This 4 part series offers behind the scenes access as they train, navigate family responsibilities and battle against the highest ranking surfers to get to the top of the podium.",
    embedUrl: "https://www.youtube.com/embed/-eRFW6MlAw0",
    type: "Documentary",
    recommended: true,
    imdbUrl: "https://www.imdb.com/title/tt28239237/"
  },
  {
    name: "Surviving Summer",
    platform: "Netflix",
    description:
      "Rebellious Brooklyn teen Summer Torres is sent to live with family friends in the tiny town of Shorehaven on the Great Ocean Road, Victoria, AUS. Despite her best efforts, Summer falls in love with the town, the people and the surf.",
    embedUrl: "https://www.youtube.com/embed/uoUahPhhUYY",
    type: "TV Show",
    recommended: true,
    imdbUrl: "https://www.imdb.com/title/tt13925166/"
  },
  {
    name: "Andy Irons: Kissed by God",
    platform: "Amazon Prime Video",
    description:
      "Bipolar disorder and addiction as seen through the life of three-time world champion surfer Andy Irons. The untold story of Andy's life serves to tear down the myths associated with these two ferocious diseases.",
    embedUrl: "https://www.youtube.com/embed/GJWIPRvtAHk",
    type: "Documentary",
    recommended: true,
    imdbUrl: "https://www.imdb.com/title/tt8961266/"
  },
  {
    name: "Tokyo Rising",
    platform: "Amazon Prime Video",
    description:
      "John John Florence puts his career on the line against Kelly Slater to qualify for surfing's debut in the 2020 Olympics.",
    embedUrl: "https://www.youtube.com/embed/QTuNFkLRXx4",
    type: "Documentary",
    recommended: true
  },
  {
    name: "Point Break",
    platform: "Amazon Prime Video (rent/buy from €3.99)",
    description:
      "An F.B.I. Agent goes undercover to catch a gang of surfers who may be bank robbers.",
    embedUrl: "https://www.youtube.com/embed/kPFlUSdse9g",
    type: "Movie",
    recommended: true,
    imdbUrl: "https://www.imdb.com/title/tt0102685/"
  },
  {
    name: "Hawaiian: The Legend of Eddie Aikau",
    platform: "Disney Plus",
    description:
      "Director Sam George chronicles the remarkable life and times of the late Eddie Aikau, the legendary Hawaiian big wave surfer, pioneering lifeguard and ultimately doomed crew member of the Polynesian voyaging canoe Hokulea.",
    embedUrl: "https://www.youtube.com/embed/gK0BtceW3gY",
    type: "Documentary",
    recommended: true,
    imdbUrl: "https://www.imdb.com/title/tt2488386/"
  },
  {
    name: "Johnny Tsunami",
    platform: "Disney Plus",
    description:
      "A Hawaiian teenage surfer shows off his skills when he takes to the snow slopes in Vermont.",
    embedUrl: "https://www.youtube.com/embed/zBUvrcvO6B4",
    type: "Movie",
    recommended: true
  },
  {
    name: "Blue Crush",
    platform: "Hulu",
    description:
      "As a hard-core surfer girl prepares for a big competition, she finds herself falling for a football player.",
    embedUrl: "https://www.youtube.com/embed/-YBpoBzWW4g",
    type: "Movie",
    recommended: false,
    imdbUrl: "https://www.imdb.com/title/tt0300532/"
  },
  {
    name: "Andy Irons And The Radicals",
    platform: "Amazon Prime Video (rent/buy from €3.99)",
    description:
      "This is a film about Andy Iron’s surfing life, the progressive pioneers who influenced him, the prodigious teenage peers who pushed him, and how his surfing has inspired a generation since.",
    embedUrl: "https://www.youtube.com/embed/zB3C79dfuto",
    type: "Documentary",
    recommended: false
  },
  {
    name: "Surf Girls: Kaikaina",
    platform: "Togethxr, YouTube",
    description:
      "In the male-dominated sport of surfing, these ‘kaikaina,’ or little sisters, are the change-makers of the future. The girls and women of ‘kaikaina’ support each other, surf at an elite level, and strive to be the ultimate best. “We continue in old and new ways to define surfing, not just the sport, but our cultural practice.” —Pua Desoto",
    embedUrl: "https://www.youtube.com/embed/EMRgDKWyrwA",
    type: "Documentary",
    recommended: false
  },
  {
    name: "100 Foot Wave",
    platform: "HBO Max",
    description:
      "The globe-trotting adventures of big wave surfer Garrett McNamara, his family, and fellow surfers.",
    embedUrl: "https://www.youtube.com/embed/znCNT-9k_Ws",
    type: "Documentary",
    recommended: false,
    imdbUrl: "https://www.imdb.com/title/tt14126234/"
  },
  {
    name: "Chasing Monsters: El Niño – Big Wave Surfing",
    platform: "Amazon Prime Video",
    description:
      "This series dives into the lives of big-wave surfers chasing storms during the El Niño season. While tracking forecasts and facing chaotic travel, these athletes also push the limits of their minds and bodies.",
    embedUrl: "https://www.youtube.com/embed/sgvLitSPORU",
    type: "Documentary",
    recommended: false,
    imdbUrl: "https://www.imdb.com/title/tt6293710/"
  },
  {
    name: "Facing Monsters",
    platform: "Amazon Prime Video",
    description:
      "Facing Monsters is a feature length documentary that digs deep into the psyche of West Australian 'slab wave' surfer Kerby Brown, a man whose connection with the ocean runs as deep as his love for his family.",
    embedUrl: "https://www.youtube.com/embed/cZkQ8Nwn9yw",
    type: "Documentary",
    recommended: false,
    imdbUrl: "https://www.imdb.com/title/tt14985640/"
  },
  {
    name: "Take Every Wave: The Life of Laird Hamilton",
    platform: "Amazon Prime Video",
    description:
      "Filmmaker Rory Kennedy examines the career of American Laird Hamilton, a man who has spent his life conquering untameable walls of water and changed the sport of big wave surfing forever.",
    embedUrl: "https://www.youtube.com/embed/vaGCdymhA40",
    type: "Documentary",
    recommended: false,
    imdbUrl: "https://www.imdb.com/title/tt6333092/"
  },
  {
    name: "Momentum Generation",
    platform: "HBO Max",
    description:
      "A group of teenagers in Hawaii enter the world of professional competitive surfing in the 1990s and rise to super stardom.",
    embedUrl: "https://www.youtube.com/embed/rNxI2UPwNh0",
    type: "Documentary",
    recommended: false,
    imdbUrl: "https://www.imdb.com/title/tt8106568/"
  },
  {
    name: "Riding Giants",
    platform: "Amazon Prime Video",
    description:
      "A historical look at the evolution of big wave surfing, featuring legends like Greg Noll, Jeff Clark, and Laird Hamilton.",
    embedUrl: "https://www.youtube.com/embed/ADy8f6t4Ri8",
    type: "Documentary",
    recommended: false
  }
];
export default surfVideos;

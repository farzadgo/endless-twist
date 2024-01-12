

import { Chapter, Note, ParagraphType } from '../src/content/types';



export const notesData: Note[] = [
  {
    id: 'note1',
    body: 'This is a note related to superscript 1.',
  },
  {
    id: 'note2',
    body: 'This is a note related to superscript 2.',
  },
  {
    id: 'note3',
    body: 'This is a note related to superscript 2.',
  },
  {
    id: 'note4',
    body: 'This is a note related to superscript 2.',
  },
  {
    id: 'note5',
    body: 'This is a note related to superscript 2.',
  },
];


export const publicationData: Chapter[] = [
  {
    id: 'intro',
    title: 'Introduction',
    paragraphs: [
      {
        id: 'intro-p1',
        body: `From our earliest moments we are taught to begin each endeavor, including grieving, with an aim, a project, a plan. What we don’t teach ourselves, or others, is how easily these aims, projects, and plans can change, can evaporate, can create a suddenly present absence. How easily we are frustrated, felled. How we are suddenly exhausted but do not know why.
          <br> —<i>Holman Jones</i>, Living Bodies of Thought <sup data-note="note1">1</sup>`,
        type: ParagraphType.QUOTE
      },
      {
        id: 'intro-p2',
        body: `In my new city, I used Google Maps to find my way. To find new routes to reach the school, work—if lucky to find one—and home. The more I was getting to know about that city, the fewer attractions I found in it. It contained repetitive commutes and offerings of spaces that I needed to spend money which was in scarcity. As the pile of new coffee shops, restaurants, boutiques, and local businesses was coming on my way, I started to question Google’s agency—hence the ones associated with algorithms and tech monopolies. While passing through iterated look-alike structures, streets, spaces, and people, I got to think about the planner’s agency. I started to examine how I moved my body and what I felt after spending a while with a companion who grew up in that city. A person who knew every corner of that terrain before those corporations and their sensors. I noticed that there are tens of different ways to reach destinations while experiencing the familiar feeling of getting lost. I questioned the necessity and urgency of arriving home, work, and/or other spaces that I took their functions for granted.`,
        type: ParagraphType.MAIN
      },
      {
        id: 'intro-p3',
        body: `I also questioned my own agency as a person who studied architecture and designed spaces for others in the past, and a stranger wanderer who is in the process of wayfinding in the present. A former architectural agency that repeatedly neglected the bodies, memories, and senses of the ones who would live in the designed spaces that I—the architect imagined. <sup data-note="note2">2</sup> And, a current way that involves personal memories evoked by the neoliberalist urban renewal and architecture of my new city in transformation. <sup data-note="note3">3</sup>`,
        type: ParagraphType.MAIN
      },
      {
        id: 'intro-p4',
        body: `Modernist design at large has housed the intellect and the eye, but it has left the body and the other senses, as well as our memories, imaginations and dreams, homeless.
        <br> —<i>Pallasmaa</i>, The Eyes of the Skin`,
        type: ParagraphType.QUOTE
      },
      {
        id: 'intro-p5',
        body: `The following is a narration that reflects my own memories within the built environments I’ve been living in, through my own wayfinding and disorientations. I intend to read the transient nature of the cities I lived in, in conjunction with their spatial productions. I intend to have a critical perspective towards social and political issues within the promised spaces—of the future—through my own psycho-somatic experiences that are not specific to my case, yet for generations that for the hope of a better life have been deciding to migrate to the “west”. From the Middle East to the Near East and from there to Europe. A transformation that involved education and practices related to architecture and designing new homes and offices—with a longing for similar spaces for self—to digital media and technology-adjacent studies. All lining up to fulfill the desires that are there to be questioned and cheered now and then. The temporality and transformation of this area reminds me of my own. From handmade sketches to hand-typed scripts. And this part of my new city—with a long maritime and colonialist history—from storage houses to tech companies. From houses dedicated to harbor workers to cubic and repeating square-shaped buildings that pop up everywhere on this planet.`,
        type: ParagraphType.MAIN
      },
      {
        id: 'intro-p6',
        body: `Within the direction of the late capitalist agencies of human and more than human actors, it is relevant to compare the co-called notions local and global. While local is related to corporeal proximity, intimacy, slowness, and relational multi-sensorial connections, global is craving for speed, precision, convenience, interest rate, and marketing. Conglomerates such as Google use local resources in its way for their own sake. They use notions such as maps and mapping to establish local dependencies, and eventually financial dominance.<sup data-note="note4">4</sup> The same is with local construction companies and urban development industries as a part global free-market constitution, appropriating water and land for marketing the spaces they construct. In this feedback loop of spatial appropriation, Google Maps services incorporate the absence of bodies and places while accumulating data regarding our cities and their existence. It is just a matter of perspective, how to extract that data, and how to read and narrate it. Is it possible to use it against its constitution? <sup data-note="note5">5</sup>`,
        type: ParagraphType.MAIN
      },
      {
        id: 'intro-p7',
        body: `Anyhow, it is inevitable to ignore the effects of neoliberalist structures and power relations on my surroundings which reflect on the local economy of growth. In Google’s case, this operates through offering free services and products to manyfold of users whether startups or novice programmers such as myself. Interestingly enough, another local reflection is the peculiar entanglement of the tech industry and urban development reinforcing normative structures for the sake of profitability. After all, the Gig Economy needs new offices, workers, gyms, shops, restaurants, balconies, and houses. And in my new city, there is no better location than the old, retired harbor area to achieve those.`,
        type: ParagraphType.MAIN
      },
      {
        id: 'intro-p8',
        body: `<b><i> Let’s renew and rebrand it! </i></b>`,
        type: ParagraphType.MAIN
      },
    ],
  },
  // Add more chapters as needed
];
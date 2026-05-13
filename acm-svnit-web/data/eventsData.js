const eventsData = [
  {
    title: 'Hour of Code',
    description: ` During January 2025, the NIT Surat ACM Student chapter celebrated Computer Science Week by conducting the Hour of Code event, wherein ACM executives visited five schools, over Surat and Vadodara and collectively educated over 500 school students from grades 8 - 10. Each school was visited by a group of executives who gave one or more 1-hour talks that covered the importance of computer science, some CS basics like HTML and CSS, and future opportunities in this field. For this endeavor, we received a special mention for one of the best regional student chapters as well! `,
    imgSrc: '/static/images/hourofcode2025.png',
    href: 'https://www.instagram.com/p/DFUQiLKN2jT/?img_index=1',
    date: 'January 2025',
    photos: [
      '/static/eventphotos/hourofcode2025_01.png',
      '/static/eventphotos/hourofcode2025_02.png',
      '/static/eventphotos/hourofcode2025_03.png',
    ],
  },
  {
    title: 'Epiphany 14',
    description: `Epiphany is a National level competitive programming contest conducted at least once every year by ACM NIT Surat. This contest involves a 2-3 hour long contest where the problems are carefully curated by the problems setters in our core team - and hence are unique, interesting problems in their own right. Solutions are later sent and winners are awarded with monetary rewrads.`,
    imgSrc: '/static/images/epiphany14.png',
    href: 'https://www.instagram.com/p/DJ4ap4RJum7/',
    date: '11th April 2025',
  },
  {
    title: 'Dotslash 8.0',
    description: ` The flagship event of ACM NIT Surat, DotSlash, is a 26-Hour national-level Hackathon organized annually by ACM in association with Research Park at SVNIT, Surat. DotSlash is one of the biggest Hackathons in Gujarat, where teams from all over India register; 40 of which are selected to compete offline. The qualifying teams work for 26 hours straight to build innovative solutions for given problem statements. Mentors guide the students throughout this period, providing assistance in the form of ideas, inspiration, technical help and critiques - thus striving to remove all roadblocks to innovation:) Top three winning teams are then selected through combined scores given by these mentors and experienced judges, who are then provided with benefits and monetary rewards.`,
    imgSrc: '/static/images/dotslash8.png',
    href: 'https://www.instagram.com/p/DDhGU2yh1HT/',
    date: '1st - 2nd February 2025',
    photos: [
      '/static/eventphotos/dotslash8_04.png',
      '/static/eventphotos/dotslash8_03.png',
      '/static/eventphotos/dotslash8_02.png',
      '/static/eventphotos/dotslash8_01.png',
    ],
  },
  {
    title: 'CodeWars',
    description: `CodeWars is a programming contest held by ACM in association with MINDBEND, which is one of the biggest technical events in Gujarat. The contest is held annually, and is a great opportunity for students to test their programming skills. The contest is divided into two rounds - the preliminary round and the final round. The preliminary round is a 2-hour long contest, where students are given a set of problems to solve. The final round is a 3-hour long contest, where students are given a set of problems to solve. The contest is open to all students, and is a great opportunity for students to test their programming skills.`,
    imgSrc: '/static/images/codewars2025.png',
    href: 'https://www.instagram.com/p/DHORtnrtGzp/',
    date: '7th April 2025',
    photos: ['/static/eventphotos/codewars1.png'],
  },
  {
    title: 'ACM Summer Challenge',
    description: `The Summer Challenge is a unique endeavor by ACM NIT Surat, which strives to teach young computer science enthusiasts the fundamentals of data structures, algorithms and programming over a 30-day period. No prior experience form the students is expected. During this period, problem setters from our team hand-pick, curate, and create problems tailored to the students’ current progress every week. Time is given to the students to attempt said problems, after which one of the problem setters solve those problems live, teaching students the right approach. This is repeated for 4 weeks, incrementing the conceptual difficulty every week, giving a complete understanding of various CP topics by the end of the month.`,
    imgSrc: '/static/images/summer-challenge-2024.png',
    href: 'https://www.instagram.com/p/C9AKiBKNQAu/',
    date: '10th July - 10th August 2024',
    photos: [
      '/static/eventphotos/summerchallenge1.png',
      '/static/eventphotos/summerchallenge1.png',
    ],
  },
  {
    title: 'SIH 2023 Stage 1: Ideathon',
    description: `SIH is a national level Hackathon facilitated by the government of India. To help filter the top-30 teams from SVNIT, and to allow those teams to submit their best ideas going forward, ACM NIT Surat, in collaboration with DSC NIT Surat, conducted a faculty mentorship session, where participants presented their ideas to a panel of faculty members, who graded them, and gave appropriate critiques that allowed said teams to improve their pitch.`,
    imgSrc: '/static/images/SIH2024.png',
    href: 'https://www.instagram.com/acmnitsurat/p/DDhFNxsMV8C/',
    date: '16th September 2024',
    photos: [
      '/static/eventphotos/sih1.jpg',
      '/static/eventphotos/sih3.jpg',
      '/static/eventphotos/sih4.jpg',
    ],
  },
  {
    title: 'Open Source Workshop',
    description: `ACM NIT 
      Surat hosted a 
      highly informative 
      workshop on 
      Git/Github and 
      open-source 
      contributions, 
      which drew a strong 
      participation of nearly 70 
      attendees from 
      second year 
      students. The workshop, held on September 6th in the Old CSE Dept Classroom, spanned two hours and proved to be a valuable learning experience for all involved. 
      The attendees gained 
      comprehensive insights 
      into Git commands, 
      understanding the 
      mechanics of Github, and 
      the significance of 
      Hacktoberfest in the 
      open-source community.
`,
    imgSrc: '/static/images/github-workshop-2024.png',
    href: 'https://www.instagram.com/p/C_qAwTTtOTK/?img_index=1',
    date: '6th September 2024',
    photos: [
      '/static/eventphotos/github-workshop-01.png',
      '/static/eventphotos/github-workshop-02.png',
    ],
  },

  {
    title: 'Inception 9.0',
    description: `On 14th of September, 2024, ACM NIT Surat conducted the 9th iteration of our college-level competitive programming contest - Inception 9.0. The contest took place between 2:00pm and 4:30pm in the ground-floor labs - labI and labII, of the Central Computer Center (CCC). Students participated by forming groups of two or three members, who then, in the stipulated time, solved programming questions set by the problem setters at ACM. Both second and third year students participated in the event, and a prize money worth INR 5000 will be distributed amongst the three winning teams from the second year students.`,
    imgSrc: '/static/images/inception9.png',
    href: 'https://www.instagram.com/p/C_vD3gHTSrX/',
    date: '14th September 2024',
    photos: [
      '/static/eventphotos/inception1.jpg',
      '/static/eventphotos/inception2.jpg',
      '/static/eventphotos/inception3.jpg',
    ],
  },
]

export default eventsData

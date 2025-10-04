/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Jeniveve Pearson",
  title: "Jeniveve Pearson",
  subTitle: "Astronomy and Astrophysics PhD Student at University of Arizona",
  resumeLink:
    "https://drive.google.com/file/d/1MMBOQMgURxoFjwz90rq1cxFWDjiI9IPi/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  orcid: "https://orcid.org/0000-0002-0744-0047",
  github: "https://github.com/jenivevepearson",
  linkedin: "https://www.linkedin.com/in/jeniveve-pearson",
  bluesky: "https://bsky.app/profile/jenivevep.bsky.social",
  gmail: "jenivevepearson@arizona.edu",
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "About Me",
  subTitle:
    "I am a graduate student in Astronomy and Astrophysics at the University of Arizona’s Steward Observatory working with Professor David Sand. My work focuses on understanding the processes through which stars die, with a focus on the study of nearby supernovae.",
  skills: [
    "As part of this work, I utilize a robust network of ground and space-based observatories to observe supernovae immediately following explosion and uncover clues about the final years of their progenitors’ lives. Additionally, I am interested in using observational approaches to understand how and when supernovae occur and the extent to which they have shaped our Universe."
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: false, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Harvard University",
      logo: require("./assets/images/harvardLogo.png"),
      subHeader: "Master of Science in Computer Science",
      duration: "September 2017 - April 2019",
      desc: "Participated in the research of XXX and published 3 papers.",
      descBullets: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      ]
    },
    {
      schoolName: "Stanford University",
      logo: require("./assets/images/stanfordLogo.png"),
      subHeader: "Bachelor of Science in Computer Science",
      duration: "September 2013 - April 2017",
      desc: "Ranked top 10% in the program. Took courses about Software Engineering, Web Security, Operating Systems, ...",
      descBullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit"]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: false, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Frontend/Design", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "70%"
    },
    {
      Stack: "Programming",
      progressPercentage: "60%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section
const workExperiences = {
  display: true,
  experience: async () => {
    try {
      const response = await fetch(`/api/nasa-ads`);

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("Full API Response:", data);
      console.log("Number of docs:", data.response?.docs?.length || 0);

      // Check if response has the expected structure
      if (!data.response || !data.response.docs) {
        console.error("Unexpected API response structure:", data);
        return [];
      }

      // Filter and map papers
      const filteredPapers = data.response.docs
        .filter(paper => {
          const authors = paper.author || [];
          console.log("Paper authors:", authors);
          const hasMatch = authors
            .slice(0, 2)
            .some(author => author.toLowerCase().includes("pearson"));
          console.log("Has Pearson match:", hasMatch);
          return hasMatch;
        })
        .slice(0, 3);

      console.log("Filtered Papers count:", filteredPapers.length);
      console.log("Filtered Papers:", filteredPapers);

      const mappedData = filteredPapers.map(paper => {
        // Handle title - ensure it's a string
        let title = "Untitled Paper";
        if (paper.title) {
          if (Array.isArray(paper.title)) {
            title = paper.title[0] || "Untitled Paper";
          } else {
            title = paper.title;
          }
        }

        // Function to convert LaTeX formatting to plain text/HTML
        const formatLatexText = text => {
          if (!text || typeof text !== "string") return text;

          let formatted = text;

          // Remove common LaTeX commands and replace with plain text equivalents
          formatted = formatted
            // Remove math mode delimiters first
            .replace(/\$\$([^$]+)\$\$/g, "$1")
            .replace(/\$([^$]+)\$/g, "$1")

            // Handle Unicode escapes and special symbols
            .replace(/x02013/g, "-") // dash
            .replace(/\\odot/g, "⊙") // LaTeX sun symbol
            .replace(/\\sun/g, "⊙") // Alternative sun symbol

            // Clean up malformed braces - remove extra nested braces
            .replace(/\{\{([^}]+)\}\}/g, "{$1}") // {{content}} -> {content}
            .replace(/\{\s*\{([^}]+)\}\s*\}/g, "{$1}") // { {content} } -> {content}

            // Convert superscripts - handle both ^{...} and ^x formats
            .replace(/\^{([^}]+)}/g, "<sup>$1</sup>")
            .replace(/\^([a-zA-Z0-9+\-*/=().,!?])/g, "<sup>$1</sup>")

            // Convert subscripts - handle both _{...} and _x formats
            .replace(/_{([^}]+)}/g, "<sub>$1</sub>")
            .replace(/_([a-zA-Z0-9+\-*/=().,!?])/g, "<sub>$1</sub>")

            // Convert text formatting
            .replace(/\\textit\{([^}]+)\}/g, "<em>$1</em>")
            .replace(/\\emph\{([^}]+)\}/g, "<em>$1</em>")
            .replace(/\\textbf\{([^}]+)\}/g, "<strong>$1</strong>")

            // Convert common Greek letters to HTML entities or Unicode
            .replace(/\\alpha/g, "&alpha;")
            .replace(/\\beta/g, "&beta;")
            .replace(/\\gamma/g, "&gamma;")
            .replace(/\\delta/g, "&delta;")
            .replace(/\\epsilon/g, "&epsilon;")
            .replace(/\\theta/g, "&theta;")
            .replace(/\\lambda/g, "&lambda;")
            .replace(/\\mu/g, "&mu;")
            .replace(/\\nu/g, "&nu;")
            .replace(/\\pi/g, "&pi;")
            .replace(/\\rho/g, "&rho;")
            .replace(/\\sigma/g, "&sigma;")
            .replace(/\\tau/g, "&tau;")
            .replace(/\\phi/g, "&phi;")
            .replace(/\\chi/g, "&chi;")
            .replace(/\\psi/g, "&psi;")
            .replace(/\\omega/g, "&omega;")
            .replace(/\\Gamma/g, "&Gamma;")
            .replace(/\\Delta/g, "&Delta;")
            .replace(/\\Theta/g, "&Theta;")
            .replace(/\\Lambda/g, "&Lambda;")
            .replace(/\\Pi/g, "&Pi;")
            .replace(/\\Sigma/g, "&Sigma;")
            .replace(/\\Phi/g, "&Phi;")
            .replace(/\\Psi/g, "&Psi;")
            .replace(/\\Omega/g, "&Omega;")

            // Convert mathematical symbols
            .replace(/\\times/g, "&times;")
            .replace(/\\pm/g, "&plusmn;")
            .replace(/\\cdot/g, "&middot;")
            .replace(/\\leq/g, "&le;")
            .replace(/\\geq/g, "&ge;")
            .replace(/\\neq/g, "&ne;")
            .replace(/\\approx/g, "&asymp;")
            .replace(/\\sim/g, "~")
            .replace(/\\infty/g, "&infin;")

            // Handle spacing commands
            .replace(/\\,/g, " ") // thin space
            .replace(/\\;/g, " ") // medium space
            .replace(/\\!/g, "") // negative thin space

            // Remove citations and references
            .replace(/\\cite\{[^}]+\}/g, "")
            .replace(/\\citep?\{[^}]+\}/g, "")
            .replace(/\\ref\{[^}]+\}/g, "")

            // Remove other LaTeX commands but keep content
            .replace(/\\[a-zA-Z]+\{([^}]*)\}/g, "$1")
            .replace(/\\[a-zA-Z]+/g, "")

            // Clean up spacing
            .replace(/\{([^}]*)\}/g, "$1") // Remove any remaining braces
            .replace(/\s+/g, " ")
            .replace(/^\s+|\s+$/g, "")
            .replace(/\{([a-zA-Z0-9\-+*/.,:;!?=<>])\}/g, "$1"); // {x} -> x

          return formatted;
        };

        // Handle abstract - ensure it's a string
        let abstract = "No abstract available";
        if (paper.abstract) {
          if (Array.isArray(paper.abstract)) {
            abstract = paper.abstract[0] || "No abstract available";
          } else {
            abstract = paper.abstract;
          }
          // Apply LaTeX formatting conversion
          abstract = formatLatexText(abstract);
        }

        // Extract year from pubdate (e.g., "2023-01-01" -> "2023")
        let year = "";
        if (paper.pubdate) {
          const yearMatch = paper.pubdate.match(/(\d{4})/);
          year = yearMatch ? yearMatch[1] : "";
        }

        console.log("Title:", title);
        console.log("Abstract preview:", abstract.substring(0, 50) + "...");

        return {
          role: "",
          company: title,
          companylogo: require("./assets/images/nasa-ads-logo.jpg"),
          date:
            paper.author && paper.author.length > 0
              ? [
                  (paper.author.length <= 4
                    ? paper.author.join(", ")
                    : paper.author.slice(0, 3).join(", ") + ", et al.") +
                    (year ? ` (${year})` : "")
                ]
              : [`Unknown Authors${year ? ` (${year})` : ""}`],
          desc: abstract,
          link: `https://ui.adsabs.harvard.edu/abs/${paper.bibcode}/abstract`
        };
      });

      console.log("Final mapped data:", mappedData);
      return mappedData;
    } catch (error) {
      console.error("Error fetching papers from NASA ADS:", error);
      return [];
    }
  }
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/saayaHealthLogo.webp"),
      projectName: "Saayahealth",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://saayahealth.com/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "Nextu",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://nextu.se/"
        }
      ]
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: "Service and Outreach",
  subtitle:
    "Teaching people about astronomy is a passion of mine. I have participated in numerous outreach programs in an effort to share just how exciting the Universe is with the general public. I have given several talks at the Tucson chapter of Astronomy on Tap, acted as a camp counselor for Astronomy Camp on Mt. Lemmon, and spoken to groups throughout Southern Arizona. Additionally, I have a particular interest in the intersection between art and science. I organize and participate in several efforts aimed at communicating science through the arts. A few of these efforts are listed below.",

  achievementsCards: [
    {
      title: "The Art of Planetary Science (TAPS)",
      subtitle:
        "I am a curator for the Lunar and Planetary Laboratory’s public art show, which invites artists and scientists alike to create art of all forms themed around astronomy.",
      image: require("./assets/images/TAPSlogo.png"),
      imageAlt: "The Art of Planetary Science Logo",
      footerLink: [
        {
          name: "TAPS 2023",
          url: "https://www.lpl.arizona.edu/art/2023"
        },
        {
          name: "TAPS 2025",
          url: "https://www.lpl.arizona.edu/art/"
        }
      ]
    },
    //{
    //  title: "Astronomy Camp",
    //  subtitle:
    //    "In 2024, I was an Astronomy Camp counselor. I helped teens learn what it is like to be an astronomer, from long nights observing at Mt. Lemmon to reducing spectra in IRAF and analyzing data.",
    //  image: require("./assets/images/AstroCampLogo.png"),
    //  imageAlt: "Astronomy Camp Logo",
    //  footerLink: [
    //    {
    //      name: "Astronomy Camp Website",
    //      url: "https://astronomycamp.info"
    //    }
    //  ]
    //},

    {
      title: "MassArt's Science Comic collaboration",
      subtitle:
        "In 2025, I was a scientific collaborator for an artist in the SciComm & Comics course at Massachusetts College of Art and Design. As part of this process, I collaborated with the artist Cody Fanelli to create a comic to explain the life cycles of massive stars.",
      image: require("./assets/images/SNinGalaxy_comic.png"),
      imageAlt: "Frame of final comic on the life cycles of massive stars",
      footerLink: [
        {
          name: "Cody Fanelli's Website",
          url: "https://codyfanelli.com/"
        },
        {
          name: "Complete Comic",
          url: "https://drive.google.com/file/d/1SDPs98-GvTguMi0bsSKCnpCq6idKo_x7/view?usp=sharing"
        }
      ]
    },

    {
      title: "Artistic Expression of Original Research (AEOR)",
      subtitle:
        "I am an artist-scientist in the Artistic Expression of Original Research project. AEOR connects scientists and artists over the course of a weekend long workshop after which artist-scientists were asked to produce art based around their original research and present them to the community in a series of free art shows.",
      image: require("./assets/images/img_3208.jpg"),
      imageAlt: "Jeniveve showing art work at public art show",
      footerLink: [
        {
          name: "Workshop and Shows",
          url: "https://arts.arizona.edu/exhibition-brings-together-science-art-and-community-building/"
        } //,
        //{name: "Publication", url: ""}
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "CV",
  subtitle: "Feel free to download my resume",
  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: "Contact Me",
  subtitle: "Prounouns: she/her/hers",
  //number: "Steward Observatory, University of Arizona",
  email_address: "jenivevepearson@arizona.edu"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};

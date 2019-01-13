// @flow

import range from "lodash/range"

const importanceChoices = [
  {
    value: "very-important",
    text: "Most Important"
  },
  {
    value: "more-important",
    text: "Very Important"
  },
  {
    value: "normal-important",
    text: "Important"
  },
  {
    value: "slightly-important",
    text: "Less Important"
  },
  {
    value: "not-important",
    text: "Least Important"
  }
]

const yesNoMaybe = [
  {
    text: "Yes",
    value: "yes"
  },
  {
    text: "No",
    value: "no"
  },
  {
    text: "Maybe",
    value: "maybe"
  }
]

const yesNo = [
  {
    text: "Yes",
    value: "yes"
  },
  {
    text: "No",
    value: "no"
  }
]

export default {
  questions: [
    {
      id: "major-category",
      title: "What areas are you interested in?",
      type: "checkbox",
      choices: [
        {
          value: "arts",
          text: "Arts"
        },
        {
          value: "humanities",
          text: "Humanities"
        },
        {
          value: "political-science",
          text: "Political Science"
        },
        {
          value: "business",
          text: "Business"
        },
        {
          value: "economics",
          text: "Economics"
        },
        {
          value: "accounting",
          text: "Accounting"
        },
        {
          value: "communications",
          text: "Communications"
        },
        {
          value: "health-and-medicine",
          text: "Health and Medicine"
        },
        {
          value: "public-social-service",
          text: "Public and Social Services"
        },
        {
          value: "math-statistics",
          text: "Math and Statistics"
        },
        {
          value: "environmental-science",
          text: "Environmental Science"
        },
        {
          value: "computer-technologies",
          text: "Computer Technologies"
        },
        {
          value: "science",
          text: "Science"
        },
        {
          value: "education",
          text: "Education"
        },
        {
          value: "engineering",
          text: "Engineering"
        },
        {
          value: "english",
          text: "English"
        },
        {
          value: "history",
          text: "History"
        },
        {
          value: "psychology",
          text: "Psychology"
        }
      ]
    },
    {
      id: "major-importance",
      title: "How important is your major to you?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "play-sports",
      title: "Will you play sports in college?",
      type: "radiogroup",
      choices: yesNoMaybe
    },
    {
      id: "sport-level",
      type: "checkbox",
      title: "What level are you interested in playing at?",
      visibleIf: "{var('play-sports')}='yes'",
      choices: [
        {
          text: "NCAA Division I",
          value: "ncaa-d1"
        },
        {
          text: "NCAA Division II",
          value: "ncaa-d2"
        },
        {
          text: "NCAA Division III",
          value: "ncaa-d3"
        },
        {
          text: "NAIA",
          value: "naia"
        },
        {
          text: "Club Teams",
          value: "club"
        },
        {
          text: "Intramural Teams",
          value: "intramural"
        }
      ]
    },
    {
      id: "post-college",
      title: "What do you plan on doing after college?",
      type: "checkbox",
      choices: [
        {
          value: "job",
          text: "Get a Job"
        },
        {
          value: "grad-school",
          text: "Graduate School"
        },
        {
          value: "med-school",
          text: "Medical School"
        },
        {
          value: "law-school",
          text: "Law School"
        },
        {
          value: "business-school",
          text: "Business School"
        }
      ]
    },
    {
      id: "high-school-location",
      title: "If US based, what is your zip code?",
      type: "api-autocomplete",
      requestUrl: "zip-code"
    },
    {
      id: "high-school-unweighted-gpa-value",
      title: "What is your unweighted GPA?",
      type: "text",
      validators: [
        {
          type: "numeric",
          minValue: 1,
          maxValue: 200,
          text:
            "Use the scale your school uses. e.g. 3.7 in a 4 point system, or 92 in a 100 point system."
        }
      ],
      required: true
    },
    {
      id: "high-school-unweighted-gpa-total",
      title: "What is the max unweighted GPA at your school?",
      type: "text",
      validators: [
        {
          type: "numeric",
          minValue: 1,
          maxValue: 200,
          text:
            "What is the highest GPA a student could get without any weighting at your school?"
        }
      ],
      required: true
    },
    {
      id: "high-school-weighted-gpa",
      title: "What is your weighted grade point average?",
      type: "text",
      validators: [
        {
          type: "numeric",
          minValue: 1,
          maxValue: 200,
          text:
            "Use the scale your school uses. e.g. 3.7 in a 4 point system, or 92 in a 100 point system."
        }
      ],
      required: true
    },
    {
      id: "class-rank",
      title: "What is your class rank?",
      type: "radiogroup",
      choices: [
        {
          text: "Valedictorian",
          value: "valedictorian"
        },
        {
          text: "Top 1%",
          value: "top-1"
        },
        {
          text: "Top 5%",
          value: "top-5"
        },
        {
          text: "Top 10%",
          value: "top-10"
        },
        {
          text: "Top 25%",
          value: "top-25"
        },
        {
          text: "Top 50%",
          value: "top-50"
        },
        {
          text: "Below 50%",
          value: "below-50"
        }
      ]
    },
    {
      id: "class-size",
      title: "How many students are in your graduating class?",
      type: "slider",
      min: 0,
      max: 5000,
      step: 1
    },
    {
      id: "tests-taken",
      title: "What tests have you taken?",
      type: "checkbox",
      required: true,
      choices: [
        {
          text: "SAT",
          value: "sat-main"
        },
        {
          text: "ACT",
          value: "act"
        },
        {
          text: "SAT Subject Tests",
          value: "sat-subject"
        },
        {
          text: "AP Tests",
          value: "ap-test"
        },
        {
          text: "PSAT/NMSQT and PSAT 10",
          value: "psat-10"
        },
        {
          text: "PSAT 8/9",
          value: "psat-8-9"
        },
        {
          text: "PreACT",
          value: "preact"
        },
        {
          value: "none",
          text: "None of the above"
        }
      ]
    },
    {
      id: "sat-subject-tests",
      title: "What SAT subject tests have you taken?",
      type: "matrixdynamic",
      choices: [
        {
          text: "Math Level 1",
          value: "math-level-1"
        },
        {
          text: "Math Level 2",
          value: "math-level-2"
        },
        {
          text: "Biology E/M",
          value: "biology-em"
        },
        {
          text: "Chemistry",
          value: "chemistry"
        },
        {
          text: "Physics",
          value: "physics"
        },
        {
          text: "U.S. History",
          value: "us-history"
        },
        {
          text: "World History",
          value: "world-history"
        },
        {
          text: "Spanish",
          value: "spanish"
        },
        {
          text: "Spanish with Listening",
          value: "spanish-with-listening"
        },
        {
          text: "French",
          value: "french"
        },
        {
          text: "French with Listening",
          value: "french-with-listening"
        },
        {
          text: "Chinese with Listening",
          value: "chinese-with-listening"
        },
        {
          text: "Italian",
          value: "italian"
        },
        {
          text: "German",
          value: "german"
        },
        {
          text: "German with Listening",
          value: "german-with-listening"
        },
        {
          text: "Modern Hebrew",
          value: "modern-hebrew"
        },
        {
          text: "Latin",
          value: "latin"
        },
        {
          text: "Japanese with Listening",
          value: "japanese-with-listening"
        },
        {
          text: "Korean with Listening",
          value: "korean-with-listening"
        },
        {
          text: "Literature",
          value: "literature"
        }
      ],
      columns: [
        {
          name: "score",
          title: "Score",
          cellType: "dropdown",
          choices: range(0, 800, 10).map(n => ({
            value: n,
            text: n.toString()
          }))
        }
      ],
      visibleIf: "{var('tests-taken')} contains 'sat-subject'"
    },
    {
      id: "ap-tests",
      title: "What AP tests have you taken?",
      type: "checkbox",
      choices: [
        {
          text: "AP Capstone",
          value: "capstone"
        },
        {
          text: "AP Research",
          value: "research"
        },
        {
          text: "AP Seminar",
          value: "seminar"
        },
        {
          text: "AP Art History",
          value: "art-history"
        },
        {
          text: "AP Music Theory",
          value: "music-theory"
        },
        {
          text: "AP Studio Art: 2-D Design",
          value: "studio-art-2d-design"
        },
        {
          text: "AP Studio Art: 3-D Design",
          value: "studio-art-3d-design"
        },
        {
          text: "AP Studio Art: Drawing",
          value: "studio-art-drawing"
        },
        {
          text: "AP English Language and Composition",
          value: "english-language-and-composition"
        },
        {
          text: "AP English Literature and Composition",
          value: "english-literature-and-composition"
        },
        {
          text: "AP Comparative Government and Politics",
          value: "comparative-government-and-politics"
        },
        {
          text: "AP European History",
          value: "european-history"
        },
        {
          text: "AP Human Geography",
          value: "human-geography"
        },
        {
          text: "AP Macroeconomics",
          value: "macroeconomics"
        },
        {
          text: "AP Microeconomics",
          value: "microeconomics"
        },
        {
          text: "AP Psychology",
          value: "psychology"
        },
        {
          text: "AP United States Government and Politics",
          value: "united-states-government-and-politics"
        },
        {
          text: "AP United States History",
          value: "united-states-history"
        },
        {
          text: "AP World History",
          value: "world-history"
        },
        {
          text: "AP Calculus AB",
          value: "calculus-ab"
        },
        {
          text: "AP Calculus BC",
          value: "calculus-bc"
        },
        {
          text: "AP Computer Science A",
          value: "computer-science-a"
        },
        {
          text: "AP Computer Science Principles",
          value: "computer-science-principles"
        },
        {
          text: "AP Statistics",
          value: "statistics"
        },
        {
          text: "AP Biology",
          value: "biology"
        },
        {
          text: "AP Chemistry",
          value: "chemistry"
        },
        {
          text: "AP Environmental Science",
          value: "environmental-science"
        },
        {
          text: "AP Physics C: Electricity and Magnetism",
          value: "physics-c-electricity-and-magnetism"
        },
        {
          text: "AP Physics C: Mechanics",
          value: "physics-c-mechanics"
        },
        {
          text: "AP Physics 1: Algebra-Based",
          value: "physics-1-algebra-based"
        },
        {
          text: "AP Physics 2: Algebra-Based",
          value: "physics-2-algebra-based"
        },
        {
          text: "AP Chinese Language and Culture",
          value: "chinese-language-and-culture"
        },
        {
          text: "AP French Language and Culture",
          value: "french-language-and-culture"
        },
        {
          text: "AP German Language and Culture",
          value: "german-language-and-culture"
        },
        {
          text: "AP Italian Language and Culture",
          value: "italian-language-and-culture"
        },
        {
          text: "AP Japanese Language and Culture",
          value: "japanese-language-and-culture"
        },
        {
          text: "AP Latin",
          value: "latin"
        },
        {
          text: "AP Spanish Language and Culture",
          value: "spanish-language-and-culture"
        },
        {
          text: "AP Spanish Literature and Culture",
          value: "spanish-literature-and-culture"
        }
      ],
      columns: [
        {
          name: "score",
          title: "Score",
          cellType: "dropdown",
          choices: range(1, 5).map(n => ({
            value: n,
            text: n.toString()
          }))
        }
      ],
      visibleIf: "{var('tests-taken')} contains 'ap-test'"
    },
    {
      id: "favorite-class",
      title: "What are your favorite classes?",
      type: "checkbox",
      choices: [
        {
          value: "math",
          text: "Math"
        },
        {
          value: "algebra",
          text: "Algebra"
        },
        {
          value: "geometry",
          text: "Geometry"
        },
        {
          value: "calculus",
          text: "Calculus"
        },
        {
          value: "stats",
          text: "Statistics"
        },
        {
          value: "english",
          text: "English"
        },
        {
          value: "literature",
          text: "Literature"
        },
        {
          value: "writing",
          text: "Writing"
        },
        {
          value: "speech",
          text: "Speech"
        },
        {
          value: "social-studies",
          text: "Social Studies"
        },
        {
          value: "us-history",
          text: "U.S. History"
        },
        {
          value: "us-gov",
          text: "U.S. Government"
        },
        {
          value: "world-history",
          text: "World History"
        },
        {
          value: "business",
          text: "Business"
        },
        {
          value: "accounting",
          text: "Accounting"
        },
        {
          value: "economics",
          text: "Economics"
        },
        {
          value: "macroeconomics",
          text: "Macroeconomics"
        },
        {
          value: "microeconomics",
          text: "Microeconomics"
        },
        {
          value: "geography",
          text: "Geography"
        },
        {
          value: "foreign-languages",
          text: "Foreign Languages"
        },
        {
          value: "spanish",
          text: "Spanish"
        },
        {
          value: "french",
          text: "French"
        },
        {
          value: "german",
          text: "German"
        },
        {
          value: "science",
          text: "Science"
        },
        {
          value: "biology",
          text: "Biology"
        },
        {
          value: "chemistry",
          text: "Chemistry"
        },
        {
          value: "physics",
          text: "Physics"
        },
        {
          value: "environmental-science",
          text: "Environmental Science"
        },
        {
          value: "health",
          text: "Health"
        },
        {
          value: "art",
          text: "Art"
        },
        {
          value: "art-history",
          text: "Art History"
        },
        {
          value: "music-theory",
          text: "Music Theory"
        },
        {
          id: "computer-science",
          text: "Computer Science"
        },
        {
          id: "other",
          text: "Other"
        }
      ]
    },
    {
      id: "extracurricular-activities",
      title: "What extracurricular activities do you participate in?",
      type: "checkbox",
      choices: [
        {
          value: "work",
          text: "Part-time job"
        },
        {
          value: "music",
          text: "Music groups"
        },
        {
          value: "school-club",
          text: "School Club"
        },
        {
          value: "sports",
          text: "Sports and Recreation"
        },
        {
          value: "volunteering",
          text: "Volunteering"
        },
        {
          value: "theatre-drama",
          text: "Theatre/Drama"
        }
      ]
    },
    {
      id: "music-group",
      title: "What music group are you involved with?",
      type: "checkbox",
      visibleIf: "{var('extracurricular-activities')} contains 'music'",
      choices: [
        {
          text: "Orchestra",
          value: "orchestra"
        },
        {
          text: "School Band",
          value: "school-band"
        },
        {
          value: "other-band",
          text: "Band outside of school"
        },
        {
          text: "Chorus",
          value: "chorus"
        },
        {
          value: "instrument",
          text: "Other instrument"
        }
      ]
    },
    {
      id: "what-sports",
      title: "What sports?",
      visibleIf: "{var('extracurricular-activities')} contains 'sports'",
      type: "checkbox",
      choices: [
        {
          value: "archery",
          text: "Archery"
        },
        {
          value: "badminton",
          text: "Badminton"
        },
        {
          value: "baseball",
          text: "Baseball"
        },
        {
          value: "basketball",
          text: "Basketball"
        },
        {
          value: "bowling",
          text: "Bowling"
        },
        {
          value: "boxing",
          text: "Boxing"
        },
        {
          value: "canoeing",
          text: "Canoeing"
        },
        {
          value: "cheerleading",
          text: "Cheerleading"
        },
        {
          value: "cricket",
          text: "Cricket"
        },
        {
          value: "cross-country",
          text: "Cross Country"
        },
        {
          value: "curling",
          text: "Curling"
        },
        {
          value: "cycling",
          text: "Cycling"
        },
        {
          value: "dancing",
          text: "Dancing"
        },
        {
          value: "equestrian",
          text: "Equestrian"
        },
        {
          value: "ultimate",
          text: "Ultimate"
        },
        {
          value: "field-hockey",
          text: "Field Hockey"
        },
        {
          value: "football",
          text: "Football"
        },
        {
          value: "golf",
          text: "Golf"
        },
        {
          value: "ice-hockey",
          text: "Ice Hockey"
        },
        {
          value: "surfing",
          text: "Surfing"
        },
        {
          value: "skateboarding",
          text: "Skateboarding"
        },
        {
          value: "fencing",
          text: "Fencing"
        },
        {
          value: "gymnastics",
          text: "Gymnastics"
        },
        {
          value: "handball",
          text: "Handball"
        },
        {
          value: "judo",
          text: "Judo"
        },
        {
          value: "karate",
          text: "Karate"
        },
        {
          value: "lacrosse",
          text: "Lacrosse"
        },
        {
          value: "racquetball",
          text: "Racquetball"
        },
        {
          value: "rock-climbing",
          text: "Rock Climbing"
        },
        {
          value: "rowing",
          text: "Rowing"
        },
        {
          value: "rugby",
          text: "Rugby"
        },
        {
          value: "sailing",
          text: "Sailing"
        },
        {
          value: "figure-skating",
          text: "Figure Skating"
        },
        {
          value: "speed-skating",
          text: "Speed Skating"
        },
        {
          value: "softball",
          text: "Softball"
        },
        {
          value: "snowboarding",
          text: "Snowboarding"
        },
        {
          value: "skiing",
          text: "Skiing"
        },
        {
          value: "swimming-and-diving",
          text: "Swimming and Diving"
        },
        {
          value: "shooting",
          text: "Shooting"
        },
        {
          value: "soccer",
          text: "Soccer"
        },
        {
          value: "squash",
          text: "Squash"
        },
        {
          value: "taekwando",
          text: "Taekwando"
        },
        {
          value: "table-tennis",
          text: "Table Tennis"
        },
        {
          value: "tennis",
          text: "Tennis"
        },
        {
          value: "track-and-field",
          text: "Track and Field"
        },
        {
          value: "volleyball",
          text: "Volleyball"
        },
        {
          value: "weightlifting",
          text: "Weightlifting"
        },
        {
          value: "water-polo",
          text: "Water Polo"
        },
        {
          value: "wrestling",
          text: "Wrestling"
        }
      ]
    },
    {
      id: "school-clubs",
      title: "What clubs are you involved with?",
      visibleIf: "{var('extracurricular-activities')} contains 'clubs'",
      type: "checkbox",
      choices: [
        {
          value: "art-club",
          text: "Art Club"
        },
        {
          value: "newspaper-club",
          text: "School Newspaper"
        },
        {
          value: "rotary-club",
          text: "Rotary Club"
        },
        {
          value: "drama-club",
          text: "Drama Club"
        },
        {
          value: "film-club",
          text: "Film Club"
        },
        {
          value: "science-club",
          text: "Science Club"
        },
        {
          value: "math-club",
          text: "Math Club"
        },
        {
          value: "literature-club",
          text: "Literature Club"
        },
        {
          value: "history-club",
          text: "History Club"
        },
        {
          value: "sculpture",
          text: "Sculpture"
        },
        {
          value: "photography",
          text: "Photography"
        },
        {
          value: "art-history",
          text: "Art History Club"
        },
        {
          value: "improv-club",
          text: "Improv"
        },
        {
          value: "anime-club",
          text: "Anime Club"
        },
        {
          value: "video-games-club",
          text: "Video Games Club"
        },
        {
          value: "ski-club",
          text: "Ski Club"
        },
        {
          value: "charity",
          text: "A Charity Club"
        },
        {
          value: "first-robotics",
          text: "First Robotics"
        },
        {
          value: "book-club",
          text: "Book Club"
        },
        {
          value: "science-olympiad",
          text: "Science Olympiad"
        },
        {
          value: "math-team",
          text: "Math Team"
        },
        {
          value: "yearbook-club",
          text: "Yearbook Club"
        },
        {
          value: "national-honor-society",
          text: "National Honor Society"
        },
        {
          value: "music-honor-society",
          text: "Music Honor Society"
        },
        {
          value: "chess-club",
          text: "Chess Club"
        },
        {
          value: "gay-straight-alliance",
          text: "Gay/Straight Alliance"
        },
        {
          value: "student-council",
          text: "Student Council"
        },
        {
          value: "key-club",
          text: "Key Club"
        },
        {
          value: "model-united-nations",
          text: "Model United Nations"
        },
        {
          value: "science-bowl",
          text: "Science Bowl"
        },
        {
          value: "scholar-bowl",
          text: "Scholar Bowl"
        },
        {
          value: "debate-club",
          text: "Debate Club"
        }
      ]
    },
    {
      id: "fast-filters",
      title: "Check any that apply.",
      type: "checkbox",
      choices: [
        {
          value: "faith",
          text: "I need to go to a faith-based institution"
        },
        {
          value: "no-faith",
          text: "I'm not looking for a school with any particular faith"
        },
        {
          value: "lgbt",
          text: "I need to go to a LGBTQ-friendly university."
        }
      ]
    },
    {
      id: "faith",
      title: "Which faith are you looking for in a college?",
      visibleIf: "{var('fast-filters')} contains 'faith'",
      type: "checkbox",
      choices: [
        {
          text: "Christian",
          value: "christian"
        },
        {
          text: "Catholic",
          value: "catholic"
        },
        {
          text: "Protestant",
          value: "protestant"
        },
        {
          text: "Orthodox",
          value: "orthodox"
        },
        {
          text: "Mormon",
          value: "mormon"
        },
        {
          text: "Jewish",
          value: "jewish"
        },
        {
          text: "Muslim",
          value: "muslim"
        },
        {
          text: "Buddist",
          value: "buddist"
        },
        {
          text: "Hindu",
          value: "hindu"
        }
      ]
    },
    {
      id: "study-amount",
      title: "How much do you study?",
      type: "radiogroup",
      choices: [
        {
          text: "I study all the time",
          value: "always-study"
        },
        {
          text: "I study for most things",
          value: "mostly-study"
        },
        {
          text: "I sometimes study",
          value: "sometimes-study"
        },
        {
          text: "I don't really study",
          value: "dont-study"
        }
      ]
    },
    {
      id: "challenging-offerings",
      title: "Would you take challenging classes for fun?",
      type: "radiogroup",
      choices: yesNoMaybe
    },
    {
      id: "prefer-diversity",
      title: "How important is ethnic diversity?",
      type: "radiogroup",
      choices: importanceChoices
      // importance	false		"
    },
    {
      id: "close-to-home",
      title: "How important is being close to home?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "preferred-region",
      title:
        "Do you want to go to anywhere specific in the US? If so, select the regions.",
      type: "multiple-us-region"
    },
    {
      id: "preferred-region-importance",
      title:
        "How important is it that you go to college in the regions you selected?",
      visibleIf: "{var('preferred-region')} notempty",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "care-about-weather",
      title: "How important is weather?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "living-area-type",
      title: "What type of area do you want to live in?",
      type: "checkbox",
      choices: [
        {
          text: "Urban",
          value: "urban"
        },
        {
          text: "Suburban",
          value: "suburban"
        },
        {
          text: "Rural",
          value: "rural"
        }
      ]
    },
    {
      id: "weather",
      title: "What types of weather do you prefer? (if any)	checkbox	weather	true		",
      type: "checkbox",
      choices: [
        {
          value: "hot",
          text: "Hot"
        },
        {
          value: "cold",
          text: "Cold"
        },
        {
          value: "moderate",
          text: "Moderate"
        },
        {
          value: "sunny",
          text: "Sunny"
        },
        {
          value: "rainy",
          text: "Rainy"
        },
        {
          value: "snowy",
          text: "Snowy"
        }
      ]
    },
    {
      id: "hot-guy-importance",
      title: "How important is it that you date boys?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "hot-girl-importance",
      title: "How important is it that you date girls?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "gender-ratio-importance",
      title: "How important is a balanced gender ratio?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "parents-college",
      title: "Did one of your parent/guardians go to college?",
      type: "radiogroup",
      choices: yesNo
    },
    {
      id: "parent-colleges",
      title: "Which colleges did you parent/guardian(s) go to?",
      type: "api-autocomplete",
      requestUrl: "colleges"
    },
    {
      id: "high-school-name",
      title: "What high school did you attend?",
      type: "api-autocomplete",
      requestUrl: "high-school"
    },
    {
      id: "favorite-movie",
      title: "What's your favorite type of movie?",
      type: "checkbox",
      choices: [
        {
          text: "Action",
          value: "action"
        },
        {
          text: "Comedy",
          value: "comedy"
        },
        {
          text: "Romance",
          value: "romance"
        },
        {
          text: "Suspense",
          value: "suspense"
        },
        {
          text: "Horror",
          value: "horror"
        },
        {
          text: "Musicals",
          value: "musicals"
        },
        {
          text: "Documentary",
          value: "documentary"
        }
      ]
    },
    {
      id: "play-sports-importance",
      title: "How important is playing sports?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "watch-sports-importance",
      title: "How important is watching sports?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "safety-importance",
      title: "How important is safety?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "college-professors",
      title: "How important is it that you have great professors?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "importance-greek-life",
      title: "How important is greek life?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "importance-highly-ranked",
      title: "How important is the school reputation?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "applied-status",
      title: "Did you apply to colleges?",
      type: "radiogroup",
      choices: yesNo
    },
    // TODO
    // "college-status": {
    //   id: "college-status",
    //   title: "What colleges (if any) have you already applied to?"
    //    	extended-checkbox	college-list	false	applied-status:yes	college-status
    // },
    // TODO
    // "college-interested": {
    //   id: "college-interested",
    //   title: "What colleges are you interested in (if any)?"
    //   // 	extended-checkbox	college-list	false	applied-status:no	college-desire-types
    //   // TODO
    // },
    {
      id: "importance-low-cost",
      title: "How important is low cost?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "prefer-public",
      title: "Would you prefer a public school?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "school-size",
      title: "What size school would you prefer?",
      type: "checkbox",
      choices: [
        {
          text: "Small (~2500)",
          value: "small"
        },
        {
          text: "Medium (~10000 students)",
          value: "medium"
        },
        {
          text: "Large (more than 15000 students)",
          value: "large"
        },
        {
          text: "Don't Care",
          value: "dont-care"
        }
      ]
    },
    {
      id: "household-income",
      title: "What is your household income?",
      type: "radiogroup",
      choices: [
        {
          value: "lowest",
          text: "$0 - $30,000"
        },
        {
          value: "low",
          text: "$30,001 - $48,000"
        },
        {
          value: "middle",
          text: "$48,001 - $75,000"
        },
        {
          value: "high",
          text: "$75,001 - $110,000"
        },
        {
          value: "highest",
          text: "More than $110,001"
        },
        {
          value: "prefer-not",
          text: "Don't Know/Prefer Not To Answer"
        }
      ]
    },
    {
      id: "dorm-quality",
      title: "How important is the dorm quality?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "food-quality",
      title: "How important is the food quality?",
      type: "radiogroup",
      choices: importanceChoices
    },
    {
      id: "party-scene",
      title: "How important is the party scene?",
      type: "radiogroup",
      choices: importanceChoices
    }
  ]
}

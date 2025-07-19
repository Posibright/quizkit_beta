document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landing-page');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');

    const startQuizBtn = document.getElementById('start-quiz-btn');
    const retakeQuizBtn = document.getElementById('retake-quiz-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const prevQuestionBtn = document.getElementById('prev-question-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');

    const quizChoiceRadios = document.querySelectorAll('input[name="quiz-choice"]');
    const feedbackToggle = document.getElementById('feedback-toggle');
    const questionNumberDisplay = document.getElementById('question-number');
    const questionTextDisplay = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackMessage = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score-display');
    const resultMessageDisplay = document.getElementById('result-message');
    const answersReviewContainer = document.getElementById('answers-review');

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = []; // Stores user's chosen answers for current quiz
    let feedbackMode = 'end'; // Default feedback mode

    // --- Quiz Data ---
    const nigerianCultureQuestions = [
        {
            question: "Nigeria is geographically situated between which latitudes?",
            options: ["40°N & 140°N", "4°N & 14°N", "4°S & 14°S", "40°S & 140°S"],
            correctAnswer: "4°N & 14°N"
        },
        {
            question: "What natural feature bounds Nigeria to the south?",
            options: ["The Sahara Desert", "The Atlantic Ocean", "The Gulf of Guinea", "The Benue River"],
            correctAnswer: "The Gulf of Guinea"
        },
        {
            question: "According to the document, which ethnic group has the largest population percentage in Nigeria?",
            options: ["Yoruba with 21%", "Igbo with 18%", "Ijaw with 10%", "Hausa with 29%"],
            correctAnswer: "Hausa with 29%"
        },
        {
            question: "The Yoruba people are predominantly located in which geopolitical zone?",
            options: ["North-west", "South-east", "South-west", "North-central"],
            correctAnswer: "South-west"
        },
        {
            question: "The Kanuri people make up what percentage of Nigeria's population?",
            options: ["10%", "4%", "3.5%", "2.5%"],
            correctAnswer: "4%"
        },
        {
            question: "The origins of the Hausa people are traced to a legendary figure named?",
            options: ["Oduduwa", "Bayajidda", "TakurukuAnzov", "Eri"],
            correctAnswer: "Bayajidda"
        },
        {
            question: "Traditional Hausa communities lived in hamlets called?",
            options: ["Emirate", "Kauyuka", "Maguzanci", "Sokoto"],
            correctAnswer: "Kauyuka"
        },
        {
            question: "The Sokoto Jihad, which transformed the Hausa political system, occurred in what century?",
            options: ["16th century", "17th century", "18th century", "19th century"],
            correctAnswer: "18th century"
        },
        {
            question: "In the pre-jihad Hausa political system, the leader was known as the?",
            options: ["Emir", "Mai", "Oba", "Sarki"],
            correctAnswer: "Sarki"
        },
        {
            question: "The Yoruba trace their ancestry to Oduduwa, who is said to have arrived at?",
            options: ["Ibadan", "Oyo", "Ile-Ife", "Osogbo"],
            correctAnswer: "Ile-Ife"
        },
        {
            question: "In the Yoruba political system, the king of Oyo is known as the?",
            options: ["Oba", "Baale", "Oloriebi", "Alapin (Alaafin)"],
            correctAnswer: "Alapin (Alaafin)"
        },
        {
            question: "Which of these is a well-known Yoruba festival mentioned in the text?",
            options: ["Amuwuan", "Swem", "Osun-Osogbo", "Maguzanci"],
            correctAnswer: "Osun-Osogbo"
        },
        {
            question: "The Yoruba concept of \"character\" which guides an individual's actions is called?",
            options: ["Iwa", "Eewo", "Oro", "Oja"],
            correctAnswer: "Iwa"
        },
        {
            question: "What is the cultural heartland of the Igbo people?",
            options: ["Anambra", "Enugu", "Nri", "Owerri"],
            correctAnswer: "Nri"
        },
        {
            question: "The founder of Nri was a figure named Eri, who was said to be sent by?",
            options: ["Ahiajoku", "Muo-mmiri", "Chukwu", "Anyanwu"],
            correctAnswer: "Chukwu"
        },
        {
            question: "The traditional political structure of the Igbo society is best described as?",
            options: ["A centralized monarchy", "An emirate system", "A decentralized society", "An agrarian council"],
            correctAnswer: "A decentralized society"
        },
        {
            question: "One of the primary reasons for taking oaths in Igboland was for the?",
            options: ["Selection of leaders", "Declaration of war", "Establishment of truth", "Celebration of harvest"],
            correctAnswer: "Establishment of truth"
        },
        {
            question: "The Tiv people are directed to a man named?",
            options: ["Bayajidda", "Eri", "ORU", "TakurukuAnzov"],
            correctAnswer: "TakurukuAnzov"
        },
        {
            question: "What is the name of the traditional black and white cloth worn by the Tiv people?",
            options: ["Adire cloth", "Akwete cloth", "A'nger cloth", "Kente cloth"],
            correctAnswer: "A'nger cloth"
        },
        {
            question: "The Tiv people are said to have an ancestral origin from which location?",
            options: ["The Nile Valley", "The Sahara Desert", "The Swem-Cameroon mountains", "The city of Ife"],
            correctAnswer: "The Swem-Cameroon mountains"
        },
        {
            question: "The Ijaw people are said to have been founded by a man named?",
            options: ["Ginuowa", "Eri", "ORU", "Oduduwa"],
            correctAnswer: "ORU"
        },
        {
            question: "The political system of the Ijaw is described as being decentralized, similar to the?",
            options: ["Hausa", "Kanuri", "Yoruba", "Igbo"],
            correctAnswer: "Igbo"
        },
        {
            question: "The Ijaw people are particularly known for their exceptional skills in?",
            options: ["Leatherwork", "Weaving", "Boat building", "Pottery"],
            correctAnswer: "Boat building"
        },
        {
            question: "The Kanuri people are predominantly found in which historical region?",
            options: ["Sokoto", "Oyo", "Bornu", "Benin"],
            correctAnswer: "Bornu"
        },
        {
            question: "The monarchial ruler of the Kanuri people was known as the?",
            options: ["Emir", "Mai", "Shehu", "Ata"],
            correctAnswer: "Mai"
        },
        {
            question: "The heir to the Kanuri throne was known by the title?",
            options: ["Galadimu", "Sarki", "Chiroma", "Magira"],
            correctAnswer: "Chiroma"
        },
        {
            question: "The Itsekiri people trace their origin to a Benin prince named?",
            options: ["Olu", "Iyasere", "Ginuowa", "Eweka"],
            correctAnswer: "Ginuowa"
        },
        {
            question: "The ruler of the Itsekiri people holds the title of?",
            options: ["Obong of Calabar", "Ata of Igala", "Olu of Warri", "Obi of Onitsha"],
            correctAnswer: "Olu of Warri"
        },
        {
            question: "The ruler of the Efik people, who reside in Cross River State, is the?",
            options: ["Ata", "Olu", "Obong of Calabar", "Mai"],
            correctAnswer: "Obong of Calabar"
        },
        {
            question: "The traditional leader of the Igala people from Kogi State is the?",
            options: ["Ata", "Olu", "Obong", "Gado"],
            correctAnswer: "Ata"
        },
        {
            question: "The term \"ethics\" is derived from the Greek word 'ethos', which means?",
            options: ["Rightness or wrongness", "Strong or to be of worth", "Norm, manner, or code of conduct", "Science of morality"],
            correctAnswer: "Norm, manner, or code of conduct"
        },
        {
            question: "The main feature of African traditional society and ethics is?",
            options: ["Individualism", "Humanism and communalism", "Divine Monarchy", "A focus on written scripture"],
            correctAnswer: "Humanism and communalism"
        },
        {
            question: "In Bajju tradition, what ritual must be performed if a man sleeps with his brother's wife?",
            options: ["An Amuwuan ritual", "A Swem ritual", "An Oro ritual", "An Egungun ritual"],
            correctAnswer: "An Amuwuan ritual"
        },
        {
            question: "The British colonial administration employed what system of governance in Nigeria?",
            options: ["Direct rule", "Assimilation policy", "Indirect rule", "Centralized administration"],
            correctAnswer: "Indirect rule"
        },
        {
            question: "Who was the British administrator that introduced indirect rule in Northern Nigeria?",
            options: ["Hugh Clifford", "John Macpherson", "Arthur Richard", "Frederick Lord Lugard"],
            correctAnswer: "Frederick Lord Lugard"
        },
        {
            question: "The amalgamation of the Northern and Southern Nigerian protectorates happened in what year?",
            options: ["1906", "1914", "1922", "1951"],
            correctAnswer: "1914"
        },
        {
            question: "Who gave Nigeria its name in 1898?",
            options: ["Lord Lugard", "Queen Victoria", "Flora Shaw", "Hugh Clifford"],
            correctAnswer: "Flora Shaw"
        },
        {
            question: "The Aba Women's Riot of 1929 was a major protest against the implementation of indirect rule in which region?",
            options: ["Western Nigeria", "Northern Nigeria", "Eastern Nigeria", "The Lagos Colony"],
            correctAnswer: "Eastern Nigeria"
        },
        {
            question: "The Clifford Constitution, one of Nigeria's earliest, was introduced in?",
            options: ["1919", "1922", "1946", "1951"],
            correctAnswer: "1922"
        },
        {
            question: "The constitution introduced by Governor John Macpherson was in what year?",
            options: ["1946", "1948", "1951", "1957"],
            correctAnswer: "1951"
        },
        {
            question: "Who is referred to as the \"father of African Nationalism\" in the document?",
            options: ["Chief Anthony Enahoro", "Herbert Macaulay", "Edward Wilmot Blyden", "Nnamdi Azikiwe"],
            correctAnswer: "Edward Wilmot Blyden"
        },
        {
            question: "Which Nigerian nationalist sponsored the motion for independence in 1953?",
            options: ["Obafemi Awolowo", "Nnamdi Azikiwe", "Tafawa Balewa", "Chief Anthony Enahoro"],
            correctAnswer: "Chief Anthony Enahoro"
        },
        {
            question: "The Mid-Western Region of Nigeria was created in what year?",
            options: ["1960", "1963", "1966", "1973"],
            correctAnswer: "1963"
        },
        {
            question: "The National Youth Service Corps (NYSC) was established in?",
            options: ["1970", "1973", "1976", "1977"],
            correctAnswer: "1973"
        },
        {
            question: "Which military head of state created 12 states out of Nigeria's four regions?",
            options: ["Murtala Mohammed", "Ibrahim Babangida", "Yakubu Gowon", "Sani Abacha"],
            correctAnswer: "Yakubu Gowon"
        },
        {
            question: "General Murtala Mohammed increased the number of states to?",
            options: ["12", "19", "21", "30"],
            correctAnswer: "19"
        },
        {
            question: "The number of states in Nigeria was increased to 36 under which leader?",
            options: ["Ibrahim Babangida", "Sani Abacha", "Yakubu Gowon", "Murtala Mohammed"],
            correctAnswer: "Sani Abacha"
        },
        {
            question: "Petroleum was discovered at Oloibiri in what year, according to the document?",
            options: ["1956", "1960", "1966", "1970"],
            correctAnswer: "1966"
        },
        {
            question: "Nigeria's first military coup occurred in?",
            options: ["1963", "1966", "1970", "1975"],
            correctAnswer: "1966"
        },
        {
            question: "The \"War Against Indiscipline\" (WAI) was a national reorientation campaign launched in?",
            options: ["1980", "1984", "1999", "2000"],
            correctAnswer: "1984"
        },
        {
            question: "General Olusegun Obasanjo's administration launched which agricultural program on May 20, 1976?",
            options: ["Green Revolution", "War Against Indiscipline", "Operation Feed the Nation", "National Development Plan"],
            correctAnswer: "Operation Feed the Nation"
        },
        {
            question: "President Shehu Shagari launched the \"Green Revolution\" program in what year?",
            options: ["1976", "1979", "1980", "1983"],
            correctAnswer: "1980"
        },
        {
            question: "Where in the Nigerian constitution are the Fundamental Human Rights detailed?",
            options: ["Chapter I", "Chapter II", "Chapter IV", "Chapter VI"],
            correctAnswer: "Chapter IV"
        },
        {
            question: "Western-style higher education began in Nigeria with the establishment of the University of Ibadan in?",
            options: ["1946", "1948", "1957", "1960"],
            correctAnswer: "1948"
        },
        {
            question: "Railway construction in Nigeria first started in Lagos in what year?",
            options: ["1885", "1898", "1904", "1913"],
            correctAnswer: "1898"
        },
        {
            question: "According to the document, tin mining began in Nigeria in?",
            options: ["1909", "1905", "1904", "1913"],
            correctAnswer: "1904"
        },
        {
            question: "Coal was first discovered and mined near which city?",
            options: ["Jos", "Patani", "Oloibiri", "Enugu"],
            correctAnswer: "Enugu"
        },
        {
            question: "Who took over as governor in 1919 after Lord Lugard retired?",
            options: ["Sir Egofor", "R.D. Moore", "Hugh Clifford", "Arthur Richard"],
            correctAnswer: "Hugh Clifford"
        },
        {
            question: "The National Bank of Nigeria was established in which year?",
            options: ["1917", "1933", "1948", "1959"],
            correctAnswer: "1933"
        },
        {
            question: "The Ibibio people, who constitute 3.5% of the population, call their supreme being?",
            options: ["Chukwu", "Swem", "Abasi", "Olorun"],
            correctAnswer: "Abasi"
        }
    ];

    const jesusTheMessiahQuestions = [
        {
            question: "Which theological term describes God's attributes that are unique to Him and cannot be fully comprehended by created beings?",
            options: ["Communicable", "Anthropomorphic", "Incommunicable", "Apophatic"],
            correctAnswer: "Incommunicable"
        },
        {
            question: "According to the text, the name \"Jehovah Tsidkenu\" found in Jeremiah 23:6 translates to:",
            options: ["The LORD our Shepherd", "The LORD our Righteousness", "The LORD our Banner", "The LORD is Here"],
            correctAnswer: "The LORD our Righteousness"
        },
        {
            question: "The philosophical argument for God's existence that posits Him as the \"Unmoved Mover\" is known as the cosmological argument and was presented by:",
            options: ["St. Anselm", "Thomas Aquinas", "Aristotle", "Richard Swinburne"],
            correctAnswer: "Aristotle"
        },
        {
            question: "In which book of the Bible does the name \"Ancient of Days\" appear three times in a single chapter?",
            options: ["Ezekiel", "Daniel", "Revelation", "Isaiah"],
            correctAnswer: "Daniel"
        },
        {
            question: "The summary explains that Jesus' ministry exemplifies God's compassion, specifically citing which verse?",
            options: ["Matthew 5:7", "Luke 6:36", "John 3:16", "Romans 5:8"],
            correctAnswer: "Luke 6:36"
        },
        {
            question: "Which term denotes God's attribute of being present everywhere at the same time?",
            options: ["Omniscience", "Omnipotence", "Omnipresence", "Omnibenevolence"],
            correctAnswer: "Omnipresence"
        },
        {
            question: "The theological concept of 'aseity' means God is:",
            options: ["Dependent on creation for His existence", "Self-existent and independent", "Limited by human understanding", "Always changing"],
            correctAnswer: "Self-existent and independent"
        },
        {
            question: "Which attribute refers to God's ultimate authority and control over all things?",
            options: ["Benevolence", "Sovereignty", "Immutability", "Eternality"],
            correctAnswer: "Sovereignty"
        },
        {
            question: "The text states that God's justice is demonstrated through His:",
            options: ["Tolerance of sin", "Impartiality in judgment", "Favoritism towards a chosen few", "Ignoring wrongdoings"],
            correctAnswer: "Impartiality in judgment"
        },
        {
            question: "Which name of God, meaning \"The LORD is my Banner,\" is associated with Exodus 17:15?",
            options: ["Jehovah Jireh", "Jehovah Nissi", "Jehovah Shalom", "Jehovah Rapha"],
            correctAnswer: "Jehovah Nissi"
        },
        {
            question: "The concept of the Trinity, as understood in orthodox Christianity, describes God as:",
            options: ["One person with three distinct manifestations", "Three separate divine beings", "One God in three co-equal, co-eternal persons", "A hierarchical structure of divine beings"],
            correctAnswer: "One God in three co-equal, co-eternal persons"
        },
        {
            question: "Which divine attribute is highlighted by the statement that God knows all things, actual and possible, past, present, and future?",
            options: ["Omnipotence", "Omnipresence", "Omniscience", "Omnibenevolence"],
            correctAnswer: "Omniscience"
        },
        {
            question: "The term 'Messiah' in Hebrew means:",
            options: ["Prophet", "King", "Anointed One", "Savior"],
            correctAnswer: "Anointed One"
        },
        {
            question: "Which prophet foretold the Messiah would be born in Bethlehem?",
            options: ["Isaiah", "Jeremiah", "Micah", "Zechariah"],
            correctAnswer: "Micah"
        },
        {
            question: "The prophecy of the 'suffering servant' who would bear the iniquities of many is found in which book?",
            options: ["Psalm", "Proverbs", "Isaiah", "Ezekiel"],
            correctAnswer: "Isaiah"
        },
        {
            question: "The Davidic Covenant (2 Samuel 7) promised that the Messiah would be:",
            options: ["A priest from the tribe of Levi", "A king from the line of David forever", "A prophet like Moses", "A judge over Israel"],
            correctAnswer: "A king from the line of David forever"
        },
        {
            question: "Which event in Jesus' life, according to the document, serves as the ultimate proof of His Messiahship?",
            options: ["His baptism", "His miracles", "His crucifixion", "His resurrection"],
            correctAnswer: "His resurrection"
        },
        {
            question: "The New Testament title 'Son of Man' primarily emphasizes Jesus's:",
            options: ["Divine nature", "Royal lineage", "Humanity and humble origins, yet with divine authority", "Prophetic office"],
            correctAnswer: "Humanity and humble origins, yet with divine authority"
        },
        {
            question: "Which of these is NOT a role or office of the Messiah discussed in the document?",
            options: ["Prophet", "Priest", "Judge", "King"],
            correctAnswer: "Judge"
        },
        {
            question: "The fulfillment of the Mosaic Law through Jesus is a key aspect of His Messiahship, primarily by:",
            options: ["Abolishing the Law entirely", "Reliving the Law perfectly and fulfilling its sacrificial requirements", "Adding new laws to the existing ones", "Ignoring the Law's demands"],
            correctAnswer: "Reliving the Law perfectly and fulfilling its sacrificial requirements"
        },
        {
            question: "The document states that Jesus' unique claims to divinity include His assertion to be:",
            options: ["A wise teacher", "The only way to the Father", "A social reformer", "A political leader"],
            correctAnswer: "The only way to the Father"
        },
        {
            question: "The 'New Covenant' promised in Jeremiah 31:31-34 is established through:",
            options: ["Renewed adherence to the Law", "Animal sacrifices in the temple", "Jesus' sacrificial death and resurrection", "A new set of written laws"],
            correctAnswer: "Jesus' sacrificial death and resurrection"
        },
        {
            question: "The theological term 'Christology' is the study of:",
            options: ["The Holy Spirit's work", "The nature of God the Father", "The person and work of Jesus Christ", "The history of the Church"],
            correctAnswer: "The person and work of Jesus Christ"
        },
        {
            question: "Which Gospel writer most explicitly portrays Jesus as the fulfillment of Old Testament prophecy for a Jewish audience?",
            options: ["Mark", "Luke", "Matthew", "John"],
            correctAnswer: "Matthew"
        },
        {
            question: "The 'hypostatic union' refers to the doctrine that in Jesus Christ there are:",
            options: ["Two separate persons, divine and human", "A mixture of divine and human natures", "One person with two distinct natures, divine and human, inseparably united", "A purely spiritual being with no physical body"],
            correctAnswer: "One person with two distinct natures, divine and human, inseparably united"
        },
        {
            question: "The concept of Jesus' 'pre-existence' means He existed:",
            options: ["Only in God's plan before creation", "Only as an idea in human minds", "As a divine being before His birth as a human", "After His resurrection only"],
            correctAnswer: "As a divine being before His birth as a human"
        },
        {
            question: "Jesus' sinless life was crucial for His atoning work because:",
            options: ["It made Him a good moral example", "Only a spotless sacrifice could pay for humanity's sin", "It allowed Him to perform miracles", "It proved His superiority over others"],
            correctAnswer: "Only a spotless sacrifice could pay for humanity's sin"
        },
        {
            question: "The 'kenosis' described in Philippians 2:7 refers to Jesus's act of:",
            options: ["Gaining all power and authority", "Emptying Himself of divine prerogatives to take on human form", "Receiving the Holy Spirit at baptism", "Ascending into heaven"],
            correctAnswer: "Emptying Himself of divine prerogatives to take on human form"
        },
        {
            question: "The primary purpose of Jesus' miracles was to:",
            options: ["Impress the crowds", "Prove His physical strength", "Validate His divine authority and the arrival of the Kingdom of God", "Heal every sick person"],
            correctAnswer: "Validate His divine authority and the arrival of the Kingdom of God"
        },
        {
            question: "The document highlights Jesus' emphasis on 'discipleship,' which involves:",
            options: ["Passive belief without action", "Strict adherence to legalistic rules", "Self-denial, taking up one's cross, and following Jesus", "Accumulating wealth for the kingdom"],
            correctAnswer: "Self-denial, taking up one's cross, and following Jesus"
        },
        {
            question: "Jesus’ 'Sermon on the Mount' (Matthew 5-7) is significant because it:",
            options: ["Outlines rules for temple worship", "Introduces a new political system", "Presents a radical ethic of the Kingdom of God and righteous living", "Describes the end times"],
            correctAnswer: "Presents a radical ethic of the Kingdom of God and righteous living"
        },
        {
            question: "The Transfiguration of Jesus served as a preview of His:",
            options: ["Impending suffering and death", "Future glory and divine majesty", "Return to Nazareth after His ministry", "Ability to perform more miracles"],
            correctAnswer: "Future glory and divine majesty"
        },
        {
            question: "The document states that Jesus’ parables about the Kingdom of God indicate it is both 'already' (present) and 'not yet' (future). The 'already' aspect refers to:",
            options: ["Its full, complete establishment on Earth", "Its inauguration and presence in Jesus' person and ministry", "Its existence only in heaven", "Its future spiritual arrival"],
            correctAnswer: "Its inauguration and presence in Jesus' person and ministry"
        },
        {
            question: "Which of the following is an example of Jesus' authority over sin, as shown in His ministry?",
            options: ["Calming the storm", "Walking on water", "Forgiving the sins of the paralytic", "Healing the blind"],
            correctAnswer: "Forgiving the sins of the paralytic"
        },
        {
            question: "The Last Supper is significant because it instituted:",
            options: ["The practice of baptism", "The New Covenant through Christ's blood", "A new legal system for Israel", "The selection of new apostles"],
            correctAnswer: "The New Covenant through Christ's blood"
        },
        {
            question: "Jesus' prayer in the Garden of Gethsemane revealed His deep anguish and His submission to:",
            options: ["The disciples' will", "The Roman authorities", "The Father's will for the cross", "His own physical weakness"],
            correctAnswer: "The Father's will for the cross"
        },
        {
            question: "The primary charge brought against Jesus by the Jewish religious leaders that led to His trial was:",
            options: ["Inciting rebellion against Rome", "Theft from the temple", "Blasphemy, by claiming to be the Son of God", "Practicing sorcery"],
            correctAnswer: "Blasphemy, by claiming to be the Son of God"
        },
        {
            question: "Pontius Pilate ultimately condemned Jesus to crucifixion despite:",
            options: ["Finding Him innocent of any crime", "His own wife's warning", "The protests of the disciples", "The intervention of Herod"],
            correctAnswer: "Finding Him innocent of any crime"
        },
        {
            question: "The theological term 'propitiation' related to Christ's death means His sacrifice:",
            options: ["Made God indifferent to sin", "Aroused God's love for humanity", "Satisfied God's righteous wrath against sin", "Simply set a moral example"],
            correctAnswer: "Satisfied God's righteous wrath against sin"
        },
        {
            question: "Which event accompanied Jesus' death on the cross, symbolizing the removal of the barrier between God and humanity?",
            options: ["An earthquake", "The tearing of the temple curtain from top to bottom", "A great storm", "The opening of tombs"],
            correctAnswer: "The tearing of the temple curtain from top to bottom"
        },
        {
            question: "Jesus was buried in a tomb belonging to:",
            options: ["Mary Magdalene", "Nicodemus", "Joseph of Arimathea", "Simon Peter"],
            correctAnswer: "Joseph of Arimathea"
        },
        {
            question: "The core claim of Christianity, validated by the empty tomb and eyewitness accounts, is Jesus':",
            options: ["Teachings", "Miracles", "Crucifixion", "Resurrection"],
            correctAnswer: "Resurrection"
        },
        {
            question: "Which group of people were the first to encounter the resurrected Jesus at the tomb?",
            options: ["The Roman guards", "The disciples", "A group of women", "The Jewish authorities"],
            correctAnswer: "A group of women"
        },
        {
            question: "The document highlights that Jesus' resurrection assures believers of their own:",
            options: ["Earthly prosperity", "Spiritual wisdom", "Future resurrection and victory over death", "Political power"],
            correctAnswer: "Future resurrection and victory over death"
        },
        {
            question: "The resurrection of Jesus inaugurated the:",
            options: ["End of the world", "New Covenant and the age of the Spirit", "Return of the Old Testament Law", "Period of silence from God"],
            correctAnswer: "New Covenant and the age of the Spirit"
        },
        {
            question: "According to the document, the resurrection empowers believers for:",
            options: ["Fear and doubt", "Spiritual stagnation", "Evangelism and transformed living", "Social isolation"],
            correctAnswer: "Evangelism and transformed living"
        },
        {
            question: "Which of these is a significant proof of Jesus' resurrection, making the stolen body theory implausible?",
            options: ["The lack of historical records", "The transformed lives and bold witness of the disciples", "The Roman guards' testimony", "The immediate conversion of Jewish leaders"],
            correctAnswer: "The transformed lives and bold witness of the disciples"
        },
        {
            question: "The 'Great Commission' in Matthew 28:18-20 includes the command to:",
            options: ["Build grand temples", "Go and make disciples of all nations", "Establish a political kingdom in Israel", "Perform only private miracles"],
            correctAnswer: "Go and make disciples of all nations"
        },
        {
            question: "Which event marked Jesus' return to heaven after His resurrection?",
            options: ["The Transfiguration", "The Last Supper", "The Ascension", "Pentecost"],
            correctAnswer: "The Ascension"
        },
        {
            question: "The ascension of Jesus signifies His:",
            options: ["Temporary withdrawal from the world", "Final triumph and exaltation to God's right hand", "Cessation of His work", "Return to His pre-incarnate state"],
            correctAnswer: "Final triumph and exaltation to God's right hand"
        },
        {
            question: "Christ's current role in heaven, according to the document, is primarily that of an:",
            options: ["Observer", "Judge", "Intercessor for believers", "Architect of a new universe"],
            correctAnswer: "Intercessor for believers"
        },
        {
            question: "The ascension made way for the outpouring of the:",
            options: ["New prophets", "Holy Spirit", "More angels", "New scriptures"],
            correctAnswer: "Holy Spirit"
        },
        {
            question: "Which event immediately followed Jesus' ascension, demonstrating the empowerment of the early church?",
            options: ["The Jewish Revolt", "The destruction of the temple", "The Day of Pentecost", "The writing of the Gospels"],
            correctAnswer: "The Day of Pentecost"
        },
        {
            question: "The ascension provides believers with the assurance of Jesus':",
            options: ["Imminent return in judgment", "Ongoing presence with them through the Spirit and His future second coming", "Permanent absence from Earth", "New physical form"],
            correctAnswer: "Ongoing presence with them through the Spirit and His future second coming"
        },
        {
            question: "According to the document, one contemporary way to engage in the Great Commission is through:",
            options: ["Avoiding all technology", "Developing AI to spread messages about God’s love", "Isolating from non-believers", "Focusing only on personal spiritual growth"],
            correctAnswer: "Developing AI to spread messages about God’s love"
        },
        {
            question: "Which verse, according to the document, highlights Christ's lordship over all creation after His ascension?",
            options: ["Psalm 110:1", "Ephesians 1:20-22", "Hebrews 7:25", "Acts 2:33"],
            correctAnswer: "Ephesians 1:20-22"
        },
        {
            question: "The Great Commission instructs believers to go to 'all nations,' indicating a mission that is:",
            options: ["Exclusively for a chosen few", "Limited to geographic Israel", "Universal and cross-cultural", "Focused solely on the wealthy"],
            correctAnswer: "Universal and cross-cultural"
        },
        {
            question: "Which of the following is a theological term for God's attribute of never changing?",
            options: ["Omnipotence", "Immutability", "Omnipresence", "Omniscience"],
            correctAnswer: "Immutability"
        },
        {
            question: "The concept of 'transcendence' means God is:",
            options: ["Limited by human understanding", "Present within creation only", "Beyond and distinct from His creation", "Constantly changing His plans"],
            correctAnswer: "Beyond and distinct from His creation"
        },
        {
            question: "According to the document, the 'Apostles' Creed' is an early Christian statement of faith that affirms:",
            options: ["The importance of strict adherence to rituals", "Belief in the triune God (Father, Son, Holy Spirit)", "The necessity of physical asceticism", "The superiority of a specific church leader"],
            correctAnswer: "Belief in the triune God (Father, Son, Holy Spirit)"
        },
        {
            question: "Which prophet in the Old Testament is extensively quoted regarding the Messiah's virgin birth?",
            options: ["Jeremiah", "Isaiah", "Ezekiel", "Daniel"],
            correctAnswer: "Isaiah"
        },
        {
            question: "Jesus' temptation in the wilderness (Matthew 4:1-11) is significant because it demonstrates His:",
            options: ["Weakness against evil", "Reliance on human strength", "Faithfulness and obedience, unlike Israel's failure in the wilderness", "Ability to avoid all suffering"],
            correctAnswer: "Faithfulness and obedience, unlike Israel's failure in the wilderness"
        },
        {
            question: "The document states that Jesus' cleansing of the Temple demonstrated His authority over:",
            options: ["Roman authorities", "Jewish religious institutions and His zeal for God’s house", "His disciples", "The common people"],
            correctAnswer: "Jewish religious institutions and His zeal for God’s house"
        },
        {
            question: "The 'vicarious atonement' of Christ means He died:",
            options: ["As a martyr for a cause", "For His own sins", "As a substitutionary sacrifice for the sins of humanity", "To set an example of suffering"],
            correctAnswer: "As a substitutionary sacrifice for the sins of humanity"
        },
        {
            question: "Which Old Testament figure did Jesus claim to be greater than, causing controversy among His contemporaries?",
            options: ["Abraham", "Moses", "Solomon", "John the Baptist"],
            correctAnswer: "Solomon"
        },
        {
            question: "Jesus' interaction with marginalized groups (e.g., tax collectors, prostitutes) primarily showcased His:",
            options: ["Political activism", "Rejection of social norms", "Compassion and inclusiveness, demonstrating God's love for all", "Desire for popularity"],
            correctAnswer: "Compassion and inclusiveness, demonstrating God's love for all"
        },
        {
            question: "The darkness that covered the land during Jesus' crucifixion is mentioned as lasting for:",
            options: ["One hour", "Two hours", "Three hours", "Four hours"],
            correctAnswer: "Three hours"
        },
        {
            question: "The resurrection provided 'justification' to believers, meaning they are:",
            options: ["Made perfectly sinless in this life", "Declared righteous before God through faith in Christ", "Given special status among people", "Exempt from future judgment"],
            correctAnswer: "Declared righteous before God through faith in Christ"
        },
        {
            question: "The Holy Spirit's role in guiding believers into all truth and enabling them to understand scripture is called:",
            options: ["Justification", "Sanctification", "Illumination", "Propitiation"],
            correctAnswer: "Illumination"
        },
        {
            question: "The Great Commission emphasizes not just converting individuals but also:",
            options: ["Building large church buildings", "Making them politically influential", "Teaching them to obey all that Christ commanded (discipleship)", "Keeping them isolated from society"],
            correctAnswer: "Teaching them to obey all that Christ commanded (discipleship)"
        },
        {
            question: "Which philosophical argument for God’s existence is based on the idea of purpose and design in the universe?",
            options: ["Cosmological argument", "Ontological argument", "Teleological argument", "Moral argument"],
            correctAnswer: "Teleological argument"
        },
        {
            question: "According to the text, God's attribute of 'omnibenevolence' refers to His:",
            options: ["Unlimited power", "All-knowing nature", "Perfect goodness and love", "Presence everywhere"],
            correctAnswer: "Perfect goodness and love"
        },
        {
            question: "The Jewish expectation of the Messiah was often heavily focused on His role as a:",
            options: ["Spiritual guru", "Suffering servant", "Political and military deliverer", "Humble teacher"],
            correctAnswer: "Political and military deliverer"
        },
        {
            question: "The document highlights Jesus' baptism as a moment that:",
            options: ["Marked the end of His private life and the start of His public ministry, affirming His identity", "Was a ritual for forgiveness of sins", "Was a purely symbolic act with no real meaning", "Demonstrated His humility only"],
            correctAnswer: "Marked the end of His private life and the start of His public ministry, affirming His identity"
        },
        {
            question: "Which of these parables best illustrates Jesus' teaching that the Kingdom of God grows from small, humble beginnings?",
            options: ["The Good Samaritan", "The Prodigal Son", "The Mustard Seed", "The Sower"],
            correctAnswer: "The Mustard Seed"
        },
        {
            question: "The document explains that the 'Last Supper' established the New Covenant in Christ's:",
            options: ["Words of teaching", "Miraculous acts", "Blood (sacrificial death)", "Ability to gather disciples"],
            correctAnswer: "Blood (sacrificial death)"
        },
        {
            question: "The significance of the empty tomb, as discussed, primarily makes which alternative theory about Jesus' disappearance implausible?",
            options: ["He returned to His hometown", "His body was stolen", "He went into hiding", "He was never really dead"],
            correctAnswer: "His body was stolen"
        },
        {
            question: "The document implies that Jesus' ascension means He is now:",
            options: ["Physically absent from Earth forever", "Limited to spiritual influence only", "Interceding for believers and preparing for His second coming", "No longer active in the world"],
            correctAnswer: "Interceding for believers and preparing for His second coming"
        },
        {
            question: "The outpouring of the Holy Spirit at Pentecost fulfilled prophecies from which Old Testament book?",
            options: ["Isaiah", "Jeremiah", "Ezekiel", "Joel"],
            correctAnswer: "Joel"
        },
        {
            question: "According to the Great Commission, who is commanded to be baptized?",
            options: ["Only adult converts", "Those who believe and become disciples", "Only infants", "Everyone regardless of belief"],
            correctAnswer: "Those who believe and become disciples"
        },
        {
            question: "The title 'Lord' applied to Jesus after His ascension signifies His:",
            options: ["Status as a wise teacher", "Political authority over Rome", "Divine sovereignty and ultimate authority over all", "Role as a humble servant"],
            correctAnswer: "Divine sovereignty and ultimate authority over all"
        },
        {
            question: "Which book of the Bible details the beginning of the early Christian church and the fulfillment of the promise of the Holy Spirit?",
            options: ["Romans", "Acts", "Corinthians", "Galatians"],
            correctAnswer: "Acts"
        },
        {
            question: "The document links the Messiah's role as 'Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace' (Isaiah 9:6) to His:",
            options: ["Humanity", "Political leadership", "Divine nature and multifaceted reign", "Prophetic warnings"],
            correctAnswer: "Divine nature and multifaceted reign"
        },
        {
            question: "Jesus' miracles of healing the sick primarily demonstrated His:",
            options: ["Medical knowledge", "Ability to gather crowds", "Compassion and power over disease, signaling the Kingdom's arrival", "Desire for fame"],
            correctAnswer: "Compassion and power over disease, signaling the Kingdom's arrival"
        },
        {
            question: "The phrase 'God with us' (Emmanuel) is directly tied to which key doctrine about Jesus?",
            options: ["His ascension", "His resurrection", "His incarnation", "His baptism"],
            correctAnswer: "His incarnation"
        },
        {
            question: "The document states that a key challenge to early Christian belief in the resurrection was:",
            options: ["Lack of scriptural support", "The claim that the body was stolen by disciples", "The philosophical arguments against it", "The Roman persecution"],
            correctAnswer: "The claim that the body was stolen by disciples"
        },
        {
            question: "Christ’s current intercessory work means He is:",
            options: ["No longer involved with humanity", "Making new laws in heaven", "Pleading on behalf of believers before God", "Waiting passively for His return"],
            correctAnswer: "Pleading on behalf of believers before God"
        },
        {
            question: "The Great Commission emphasizes teaching new believers to obey:",
            options: ["Only the Ten Commandments", "All the laws of their country", "All that Christ commanded", "Only what they personally agree with"],
            correctAnswer: "All that Christ commanded"
        },
        {
            question: "The concept of 'redemption' in Christian theology primarily refers to:",
            options: ["Being freed from political oppression", "Being bought back from sin and its consequences through Christ's sacrifice", "Achieving personal enlightenment", "Gaining material wealth"],
            correctAnswer: "Being bought back from sin and its consequences through Christ's sacrifice"
        },
        {
            question: "The 'Protoevangelium' (Genesis 3:15) is considered the first messianic prophecy, referring to:",
            options: ["The establishment of a kingdom", "A future military victory", "The defeat of Satan by the offspring of the woman", "A new creation event"],
            correctAnswer: "The defeat of Satan by the offspring of the woman"
        },
        {
            question: "Which divine attribute assures believers that God will keep His promises because He does not change His mind?",
            options: ["Omnipotence", "Immutability", "Omniscience", "Love"],
            correctAnswer: "Immutability"
        },
        {
            question: "The document explains that the term 'Yahweh' (LORD) signifies God's:",
            options: ["Role as creator", "Personal and covenantal relationship with Israel", "Power over nature", "Wisdom"],
            correctAnswer: "Personal and covenantal relationship with Israel"
        },
        {
            question: "The theological term 'impeccability' of Christ means He:",
            options: ["Was unable to sin", "Never chose to sin, though He could have", "Was tempted but never sinned", "Was not human"],
            correctAnswer: "Was unable to sin"
        },
        {
            question: "Jesus' cleansing of the Temple and overturning tables demonstrated His:",
            options: ["Disrespect for sacred spaces", "Rejection of the Law", "Zeal for God's house and opposition to its commercialization", "Desire for control"],
            correctAnswer: "Zeal for God's house and opposition to its commercialization"
        },
        {
            question: "The 'Atonement' achieved by Jesus' death primarily refers to:",
            options: ["His victory over political enemies", "His teaching of moral lessons", "The reconciliation of humanity with God through the removal of sin", "His demonstration of suffering"],
            correctAnswer: "The reconciliation of humanity with God through the removal of sin"
        },
        {
            question: "Jesus' frequent use of 'Amen, Amen, I say to you' before His teachings underscored His:",
            options: ["Humility", "Uncertainty", "Divine authority and truthfulness", "Desire for agreement"],
            correctAnswer: "Divine authority and truthfulness"
        },
        {
            question: "The 'swoon theory,' a counter-explanation for the resurrection, posits that Jesus:",
            options: ["Was replaced by a look-alike", "Did not actually die on the cross but revived later", "Was a spirit that appeared to His disciples", "Was resurrected spiritually, not physically"],
            correctAnswer: "Did not actually die on the cross but revived later"
        },
        {
            question: "The theological term 'sanctification' refers to the process by which believers are:",
            options: ["Declared righteous before God", "Made holy and conformed to Christ's image by the Spirit", "Given salvation immediately upon belief", "Removed from the world"],
            correctAnswer: "Made holy and conformed to Christ's image by the Spirit"
        },
        {
            question: "The Great Commission, given by Jesus, is primarily found in which Gospel?",
            options: ["Mark", "Luke", "John", "Matthew"],
            correctAnswer: "Matthew"
        },
        {
            question: "Which verse, according to the document, describes the future transformation of believers' bodies to be like Christ's glorious body?",
            options: ["John 14:2–3", "Philippians 3:20–21", "Revelation 21:3", "Hebrews 7:25"],
            correctAnswer: "Philippians 3:20–21"
        },
        {
            question: "The 'Suffering Servant' prophecies are particularly challenging to the traditional Jewish understanding of the Messiah as solely a:",
            options: ["Spiritual leader", "Political deliverer", "Wise teacher", "Humble artisan"],
            correctAnswer: "Political deliverer"
        },
        {
            question: "Jesus' authority over demons and evil spirits demonstrated His power over:",
            options: ["Human minds", "Physical illnesses only", "Spiritual forces of darkness", "Natural disasters"],
            correctAnswer: "Spiritual forces of darkness"
        },
        {
            question: "The 'Lord's Prayer' (Matthew 6:9-13) is a model for:",
            options: ["Public speaking", "Ritualistic incantations", "Intimate communion and dependence on God in prayer", "Debating religious points"],
            correctAnswer: "Intimate communion and dependence on God in prayer"
        },
        {
            question: "The primary purpose of Jesus' death on the cross was to:",
            options: ["Show His willingness to suffer", "Establish a new political order", "Provide atonement for humanity's sins", "Become a martyr for a cause"],
            correctAnswer: "Provide atonement for humanity's sins"
        },
        {
            question: "The resurrection of Jesus offers believers a living hope for:",
            options: ["Earthly prosperity", "A life free from all suffering", "Eternal life and victory over death", "Immediate political change"],
            correctAnswer: "Eternal life and victory over death"
        },
        {
            question: "Which apostle initially doubted Jesus' resurrection until he saw and touched Jesus' wounds?",
            options: ["Peter", "John", "Thomas", "Andrew"],
            correctAnswer: "Thomas"
        },
        {
            question: "The ascension of Jesus implies His enthronement as:",
            options: ["A temporary ruler", "The cosmic Lord and King", "A spiritual guide only", "A new prophet"],
            correctAnswer: "The cosmic Lord and King"
        },
        {
            question: "The Great Commission emphasizes that discipleship involves not just belief but also:",
            options: ["Isolation from the world", "Active obedience to Christ's commands", "Performing miracles", "Strict adherence to dietary laws"],
            correctAnswer: "Active obedience to Christ's commands"
        },
        {
            question: "The document references which verse that describes eternal life as knowing the only true God and Jesus Christ?",
            options: ["John 3:16", "John 17:3", "Romans 10:9", "Acts 4:12"],
            correctAnswer: "John 17:3"
        },
        {
            question: "The promise of a 'new heaven and a new earth' (Revelation 21:1) speaks to God's ultimate plan for:",
            options: ["An escape from creation", "The complete restoration and renewal of creation", "A spiritual realm only", "The destruction of all matter"],
            correctAnswer: "The complete restoration and renewal of creation"
        },
        {
            question: "Which of God's attributes is highlighted in Romans 11:33-36 as beyond human comprehension?",
            options: ["His love", "His wisdom and knowledge", "His justice", "His mercy"],
            correctAnswer: "His wisdom and knowledge"
        },
        {
            question: "The theological argument for God’s existence based on the universal human moral sense is the:",
            options: ["Cosmological argument", "Ontological argument", "Teleological argument", "Moral argument"],
            correctAnswer: "Moral argument"
        },
        {
            question: "According to the document, the 'Virgin Birth' of Jesus is significant because it attests to His:",
            options: ["Humanity only", "Divine origin and unique identity as God incarnate", "Ordinary conception", "Symbolic existence"],
            correctAnswer: "Divine origin and unique identity as God incarnate"
        },
        {
            question: "Jesus' identification with sinners at His baptism demonstrates His:",
            options: ["Lack of personal sin", "Empathy and solidarity with humanity's fallen state", "Political aspirations", "Rejection of the righteous"],
            correctAnswer: "Empathy and solidarity with humanity's fallen state"
        },
        {
            question: "The document states that Christ's role as High Priest means He:",
            options: ["Performs rituals in the temple", "Offers sacrifices for Himself", "Mediates between God and humanity and intercedes for believers", "Rules a physical kingdom"],
            correctAnswer: "Mediates between God and humanity and intercedes for believers"
        },
        {
            question: "The core message of the Gospel, summarized by Jesus, is the proclamation of the:",
            options: ["New Law", "End of the world", "Kingdom of God", "Moral improvement of individuals"],
            correctAnswer: "Kingdom of God"
        },
        {
            question: "The 'Cry of Dereliction' from the cross, \"My God, my God, why have you forsaken me?\" (Matthew 27:46), primarily expresses Jesus':",
            options: ["Lack of faith", "Physical pain", "Experience of bearing the full weight of God's wrath against sin", "Despair before death"],
            correctAnswer: "Experience of bearing the full weight of God's wrath against sin"
        },
        {
            question: "The 'Resurrection of the dead' for believers is a central hope based on:",
            options: ["Human evolution", "Philosophical reasoning", "Christ's own bodily resurrection", "Cultural myths"],
            correctAnswer: "Christ's own bodily resurrection"
        },
        {
            question: "The Great Commission commands believers to go and:",
            options: ["Build personal wealth", "Conquer nations militarily", "Make disciples", "Establish new religions"],
            correctAnswer: "Make disciples"
        },
        {
            question: "Which Gospel account provides a detailed narrative of Jesus' post-resurrection appearances to His disciples?",
            options: ["Mark", "Luke", "John", "Matthew"],
            correctAnswer: "John"
        },
        {
            question: "The document implies that the 'Ascension' of Jesus is significant because it marks His entry into His:",
            options: ["New earthly ministry", "Cosmic reign and intercessory work in heaven", "Period of spiritual rest", "Physical disappearance only"],
            correctAnswer: "Cosmic reign and intercessory work in heaven"
        },
        {
            question: "The concept of 'Grace' in Christian theology primarily refers to God's:",
            options: ["Strict judgment", "Unmerited favor and love towards humanity", "Demand for perfect obedience", "Reliance on human efforts"],
            correctAnswer: "Unmerited favor and love towards humanity"
        },
        {
            question: "The title 'Christ' is the Greek equivalent of the Hebrew term 'Messiah,' both meaning:",
            options: ["Teacher", "Leader", "Anointed One", "Prophet"],
            correctAnswer: "Anointed One"
        },
        {
            question: "The 'moral argument' for God's existence is based on the idea of:",
            options: ["The beauty of nature", "The complexity of the universe", "A universal sense of right and wrong", "The historical records of miracles"],
            correctAnswer: "A universal sense of right and wrong"
        },
        {
            question: "Which Old Testament covenant primarily promised a future king from David's lineage who would reign forever?",
            options: ["Abrahamic Covenant", "Mosaic Covenant", "Davidic Covenant", "New Covenant"],
            correctAnswer: "Davidic Covenant"
        },
        {
            question: "The document discusses Jesus' 'temptations' as a demonstration of His:",
            options: ["Human weakness", "Inability to resist sin", "Perfect obedience and reliance on God's Word", "Desire for worldly power"],
            correctAnswer: "Perfect obedience and reliance on God's Word"
        },
        {
            question: "Jesus' teaching on the 'Beatitudes' (Matthew 5:3-12) emphasizes the values and character of citizens in the:",
            options: ["Roman Empire", "Kingdom of God", "Jewish Synagogue", "Philosophical schools"],
            correctAnswer: "Kingdom of God"
        },
        {
            question: "The theological term for the reconciliation of God and humanity through Jesus' death is:",
            options: ["Justification", "Sanctification", "Atonement", "Redemption"],
            correctAnswer: "Atonement"
        },
        {
            question: "The empty tomb provides strong evidence for the resurrection because it:",
            options: ["Makes the official story of the body being stolen less plausible", "Was a common occurrence in that era", "Was easily explained by natural means", "Was a result of angelic intervention only"],
            correctAnswer: "Makes the official story of the body being stolen less plausible"
        },
        {
            question: "Jesus' teaching on being the \"true vine\" in John 15 is an example of a metaphor, while his teaching on being \"like whitewashed tombs\" in Matthew 23 is an example of a:",
            options: ["Hyperbole", "Simile", "Proverb", "Riddle"],
            correctAnswer: "Simile"
        },
        {
            question: "The chapter on Christ's mission states that He challenged the rigid human additions to the Sabbath law, demonstrating that His mission was, in part:",
            options: ["Exclusively spiritual", "Focused on political change", "Counter-cultural", "Aligned with the Pharisees"],
            correctAnswer: "Counter-cultural"
        },
        {
            question: "The fulfillment of the Great Commission involves making disciples, teaching, and what specific ordinance mentioned in Matthew 28:19?",
            options: ["Anointing with oil", "The laying on of hands", "The Lord's Supper", "Baptism"],
            correctAnswer: "Baptism"
        },
        {
            question: "The summary concludes that believers are called to \"clasp on Christ by faith\" to overcome temptation, a lesson primarily drawn from the events in which chapter's focus?",
            options: ["Chapter 6: Baptism", "Chapter 7: The Temptations of Jesus Christ", "Chapter 8: The Teachings of Jesus Christ", "Chapter 9: The Miracles of Jesus Christ"],
            correctAnswer: "Chapter 7: The Temptations of Jesus Christ"
        },
        {
            question: "Which philosophical argument for God's existence is based on the concept of a maximally great being?",
            options: ["Cosmological argument", "Ontological argument", "Teleological argument", "Moral argument"],
            correctAnswer: "Ontological argument"
        },
        {
            question: "The 'New Covenant' promised in the Old Testament is primarily fulfilled through:",
            options: ["Renewed adherence to the Mosaic Law", "The sacrificial system of the temple", "Jesus' life, death, and resurrection", "The establishment of a physical kingdom"],
            correctAnswer: "Jesus' life, death, and resurrection"
        },
        {
            question: "Jesus' healing of the man born blind (John 9) demonstrated His power over:",
            options: ["Political systems", "Physical ailments and His identity as the Light of the World", "Economic hardship", "Social status"],
            correctAnswer: "Physical ailments and His identity as the Light of the World"
        },
        {
            question: "The document references the 'Last Supper' as establishing the New Covenant in Christ's:",
            options: ["Teaching only", "Miraculous acts", "Blood (sacrificial death)", "Ability to gather followers"],
            correctAnswer: "Blood (sacrificial death)"
        },
        {
            question: "The primary evidence for the resurrection, according to the document, includes the empty tomb and:",
            options: ["Ancient prophecies only", "The conversion of Roman soldiers", "Numerous eyewitness accounts of the risen Jesus", "Philosophical arguments for immortality"],
            correctAnswer: "Numerous eyewitness accounts of the risen Jesus"
        },
        {
            question: "The theological term 'imputation' in relation to salvation refers to God:",
            options: ["Instilling righteousness into believers", "Declaring believers righteous by crediting Christ's righteousness to them", "Punishing believers for their sins", "Ignoring believers' sins"],
            correctAnswer: "Declaring believers righteous by crediting Christ's righteousness to them"
        },
        {
            question: "The Great Commission's command to 'baptize them' symbolizes:",
            options: ["A political allegiance", "An act of social purification", "Public identification with Christ and His body, the Church", "A secret ritual"],
            correctAnswer: "Public identification with Christ and His body, the Church"
        },
        {
            question: "The document links the Messiah's role as the 'Son of David' to His:",
            options: ["Divine nature", "Royal lineage and fulfillment of kingship prophecies", "Prophetic ministry", "Suffering servant role"],
            correctAnswer: "Royal lineage and fulfillment of kingship prophecies"
        },
        {
            question: "Which divine attribute is most strongly emphasized in the Old Testament command, \"Be holy, because I, the LORD your God, am holy\"?",
            options: ["Love", "Justice", "Holiness", "Mercy"],
            correctAnswer: "Holiness"
        },
        {
            question: "The philosophical argument for God's existence that argues from the existence of finite beings to a first uncaused cause is the:",
            options: ["Ontological argument", "Teleological argument", "Cosmological argument", "Moral argument"],
            correctAnswer: "Cosmological argument"
        },
        {
            question: "The document notes that Jesus' miracles often accompanied His teachings, serving to:",
            options: ["Distract the crowds", "Prove His physical strength", "Validate His message and demonstrate the Kingdom's presence", "Entertain His followers"],
            correctAnswer: "Validate His message and demonstrate the Kingdom's presence"
        },
        {
            question: "The significance of the tearing of the temple curtain at Jesus' death was:",
            options: ["A random event", "A symbolic act opening direct access to God through Christ's sacrifice", "A sign of God's judgment on the temple", "A natural disaster"],
            correctAnswer: "A symbolic act opening direct access to God through Christ's sacrifice"
        },
        {
            question: "The theological term 'justification' means God:",
            options: ["Makes a sinner righteous internally", "Declares a sinner righteous on the basis of Christ's work", "Condemns a sinner for their deeds", "Causes a sinner to become perfect"],
            correctAnswer: "Declares a sinner righteous on the basis of Christ's work"
        },
        {
            question: "The Great Commission implies that the mission of the church is:",
            options: ["Limited to specific cultures or regions", "Universal and global in scope", "Primarily to serve the local community only", "To convert through force"],
            correctAnswer: "Universal and global in scope"
        },
        {
            question: "Which of these is a creative way to engage in the Great Commission in a modern context, as mentioned in the document?",
            options: ["Only holding traditional church services", "Utilizing social media platforms to share messages of faith", "Avoiding all forms of technology", "Limiting interaction to face-to-face meetings"],
            correctAnswer: "Utilizing social media platforms to share messages of faith"
        },
        {
            question: "The document cites which Old Testament book as containing the prophecy of God pouring out His Spirit on all people?",
            options: ["Isaiah", "Jeremiah", "Ezekiel", "Joel"],
            correctAnswer: "Joel"
        },
        {
            question: "The concept of 'Divine Simplicity' in theology means God:",
            options: ["Is easy to understand", "Has no parts or distinctions in His being, being perfectly unified", "Is simplistic in His actions", "Relates to humanity in a simple way"],
            correctAnswer: "Has no parts or distinctions in His being, being perfectly unified"
        },
        {
            question: "Which New Testament passage is cited to show Jesus' pre-existence as the Word who was with God and was God?",
            options: ["Matthew 1:18-25", "Luke 2:1-7", "John 1:1-3", "Philippians 2:5-8"],
            correctAnswer: "John 1:1-3"
        },
        {
            question: "The purpose of Jesus' 'Temptations in the Wilderness' was to:",
            options: ["Show His human weakness", "Prove His sinlessness and reliance on God's Word", "Demonstrate His ability to perform miracles", "Gain political power"],
            correctAnswer: "Prove His sinlessness and reliance on God's Word"
        },
        {
            question: "The doctrine of 'Impeccability' refers to Jesus's inability to:",
            options: ["Feel pain", "Make mistakes", "Sin", "Be tempted"],
            correctAnswer: "Sin"
        },
        {
            question: "The 'Resurrection of Christ' is the central tenet of Christianity because it:",
            options: ["Proves His moral teachings were correct", "Validates His claims to be God and confirms the power of His atonement", "Demonstrates His physical strength", "Was a unique historical event without spiritual significance"],
            correctAnswer: "Validates His claims to be God and confirms the power of His atonement"
        },
        {
            question: "Which of these groups, mentioned in the document, had a different Christology (understanding of Jesus' nature) compared to orthodox Christianity?",
            options: ["Orthodox View", "Roman Catholic View", "Baha’i Faith", "Pentecostal View"],
            correctAnswer: "Baha’i Faith"
        },
        {
            question: "The document cites which verse to describe Jesus preparing a place for believers after His ascension?",
            options: ["John 17:3", "John 14:2–3", "Philippians 3:20–21", "Revelation 21:3"],
            correctAnswer: "John 14:2–3"
        },
        {
            question: "According to the document, which verse shows Jesus’ lordship over creation after His ascension?",
            options: ["Psalm 110:1", "Ephesians 1:20–22", "Hebrews 7:25", "Acts 2:33"],
            correctAnswer: "Ephesians 1:20–22"
        },
        {
            question: "The document cites which verse as the foundational text for the Great Commission?",
            options: ["Luke 24:46–49", "Matthew 28:18–20", "Acts 1:8", "John 20:21"],
            correctAnswer: "Matthew 28:18–20"
        },
        {
            question: "According to the document, what is one creative way to engage in the Great Commission?",
            options: ["Avoiding all media", "Sending messages about God’s love", "Participating in negative conversations", "Ignoring cultural differences"],
            correctAnswer: "Sending messages about God’s love"
        },
        {
            question: "In Philippians 3:20–21, how is Christ’s post-ascension power over all things described?",
            options: ["Limited to spiritual matters", "Able to transform our lowly bodies", "Only effective for a select few", "Maintained only through human effort"],
            correctAnswer: "Able to transform our lowly bodies"
        },
        {
            question: "Which verse, according to the document, emphasizes the importance of a deep relationship with God and Jesus for eternal life?",
            options: ["John 14:6", "John 17:3", "John 3:16", "Romans 10:9"],
            correctAnswer: "John 17:3"
        },
        {
            question: "The document references Revelation 21:3 to describe God's future dwelling place with humanity. What does it emphasize?",
            options: ["A temporary presence", "A new heavenly city", "God’s permanent dwelling among His people", "A spiritual realm only"],
            correctAnswer: "God’s permanent dwelling among His people"
        },
        {
            question: "According to the document, which verse in Hebrews describes Christ’s ongoing intercession for believers at God’s right hand?",
            options: ["Hebrews 4:14-16", "Hebrews 7:25", "Hebrews 9:24", "Hebrews 12:2"],
            correctAnswer: "Hebrews 7:25"
        },
        {
            question: "The document links which event to the fulfillment of Old Testament prophecies about the outpouring of the Holy Spirit?",
            options: ["Jesus’ baptism", "The Transfiguration", "Pentecost", "The Last Supper"],
            correctAnswer: "Pentecost"
        },
        {
            question: "In the New Testament, the concept of the Trinity primarily teaches that God is:",
            options: ["One person with three roles", "Three separate gods", "One God in three co-equal persons (Father, Son, and Holy Spirit)", "A divine council"],
            correctAnswer: "One God in three co-equal persons (Father, Son, and Holy Spirit)"
        },
        {
            question: "Which early church council affirmed the full deity of Jesus Christ?",
            options: ["Council of Chalcedon", "Council of Nicaea", "Council of Constantinople", "Council of Ephesus"],
            correctAnswer: "Council of Nicaea"
        },
        {
            question: "The term 'Christology' refers to the study of:",
            options: ["The Holy Spirit", "God the Father", "The person and work of Jesus Christ", "The Church"],
            correctAnswer: "The person and work of Jesus Christ"
        },
        {
            question: "According to the document, the theological term 'hypostatic union' describes:",
            options: ["The unity of God's attributes", "The union of divine and human natures in the one person of Christ", "The relationship within the Trinity", "The process of sanctification"],
            correctAnswer: "The union of divine and human natures in the one person of Christ"
        },
        {
            question: "Which passage emphasizes Jesus’ pre-existence before His human birth?",
            options: ["Matthew 1:18-25", "Luke 2:1-7", "John 1:1-3", "Philippians 2:5-8"],
            correctAnswer: "John 1:1-3"
        },
        {
            question: "The document states that Jesus’ sinless life was essential for His role as Savior because:",
            options: ["He set a moral example", "Only a sinless sacrifice could atone for human sin", "It proved His divinity", "It allowed Him to perform miracles"],
            correctAnswer: "Only a sinless sacrifice could atone for human sin"
        },
        {
            question: "The concept of 'propitiation' in relation to Christ’s death means He:",
            options: ["Demonstrated God's love", "Satisfied God's wrath against sin", "Set an example of suffering", "Conquered evil forces"],
            correctAnswer: "Satisfied God's wrath against sin"
        },
        {
            question: "Which of these is NOT a common Jewish expectation of the Messiah, as discussed in the document?",
            options: ["A political deliverer", "A spiritual teacher leading to inner purity", "A military leader", "A king from the line of David"],
            correctAnswer: "A spiritual teacher leading to inner purity"
        },
        {
            question: "The document highlights Jesus’ teaching on discipleship, emphasizing:",
            options: ["Following rituals and traditions", "Accumulating wealth and power", "Self-denial, cross-bearing, and following Him", "Strict adherence to legal codes"],
            correctAnswer: "Self-denial, cross-bearing, and following Him"
        },
        {
            question: "Which event serves as a public declaration of Jesus' identity and mission, marking the start of His active ministry?",
            options: ["His birth", "His temptation", "His baptism", "His first miracle at Cana"],
            correctAnswer: "His baptism"
        },
        {
            question: "The document describes Jesus’ Transfiguration as a preview of:",
            options: ["His suffering", "His future glory and divine nature", "The end of the world", "His return to Nazareth"],
            correctAnswer: "His future glory and divine nature"
        },
        {
            question: "The document references Jesus’ parables about the Kingdom of God, indicating it is both 'already' and 'not yet.' What does 'already' signify?",
            options: ["Its full establishment on Earth", "Its present reality in Jesus’ ministry", "Its future coming only", "Its complete absence"],
            correctAnswer: "Its present reality in Jesus’ ministry"
        },
        {
            question: "Which of the following is an example of Jesus’ authority over sin?",
            options: ["Walking on water", "Feeding the five thousand", "Forgiving the paralytic’s sins", "Turning water into wine"],
            correctAnswer: "Forgiving the paralytic’s sins"
        },
        {
            question: "The document describes Jesus’ ascension as a transition from His earthly ministry to His:",
            options: ["Return to obscurity", "Heavenly reign and intercessory ministry", "Re-incarnation", "New prophetic role"],
            correctAnswer: "Heavenly reign and intercessory ministry"
        },
        {
            question: "Which chapter in the book of Acts describes the Day of Pentecost?",
            options: ["Acts 1", "Acts 2", "Acts 3", "Acts 4"],
            correctAnswer: "Acts 2"
        },
        {
            question: "According to the document, the Holy Spirit empowers believers for:",
            options: ["Wealth accumulation", "Miraculous healing only", "Witnessing and living a Christ-like life", "Social isolation"],
            correctAnswer: "Witnessing and living a Christ-like life"
        },
        {
            question: "The document highlights the Great Commission's emphasis on:",
            options: ["Building large churches", "Making disciples of all nations", "Strict adherence to dietary laws", "Solitary meditation"],
            correctAnswer: "Making disciples of all nations"
        },
        {
            question: "Which of these is presented as a contemporary example of fulfilling the Great Commission?",
            options: ["Engaging in political protests", "Developing AI to spread messages about God’s love", "Focusing solely on local community", "Debating theological points"],
            correctAnswer: "Developing AI to spread messages about God’s love"
        },
        {
            question: "According to the document, the Abrahamic Covenant (Genesis 12:1-3) relates to the Messiah by promising:",
            options: ["A new temple", "A physical kingdom in Israel", "Blessings to all nations through Abraham’s offspring", "The end of all wars"],
            correctAnswer: "Blessings to all nations through Abraham’s offspring"
        },
        {
            question: "Which Old Testament prophet, often cited for messianic prophecies, predicted Jesus’ virgin birth?",
            options: ["Jeremiah", "Isaiah", "Ezekiel", "Daniel"],
            correctAnswer: "Isaiah"
        },
        {
            question: "The document describes Jesus’ temptations in the wilderness as a parallel to Israel’s wilderness experience, demonstrating His:",
            options: ["Weakness", "Faithfulness and obedience where Israel failed", "Inability to resist sin", "Desire for solitude"],
            correctAnswer: "Faithfulness and obedience where Israel failed"
        },
        {
            question: "What did Jesus’ cleansing of the Temple demonstrate?",
            options: ["His anger at the priests", "His rejection of Jewish traditions", "His authority over religious institutions and His zeal for God’s house", "His desire to build a new temple"],
            correctAnswer: "His authority over religious institutions and His zeal for God’s house"
        },
        {
            question: "The document explains that the 'New Covenant' promised in Jeremiah 31:31-34 is fulfilled through:",
            options: ["A renewed emphasis on the Law", "Animal sacrifices", "Jesus’ death and resurrection, offering forgiveness and a transformed heart", "A new physical kingdom"],
            correctAnswer: "Jesus’ death and resurrection, offering forgiveness and a transformed heart"
        },
        {
            question: "Which event is pivotal in validating Jesus’ claims to be the Son of God and the Messiah?",
            options: ["His birth", "His miracles", "His resurrection", "His teachings"],
            correctAnswer: "His resurrection"
        },
        {
            question: "The document states that Jesus’ ascension to the right hand of God signifies His:",
            options: ["Temporary absence", "Completed work and exalted position of authority", "Spiritual existence only", "Preparation for another earthly ministry"],
            correctAnswer: "Completed work and exalted position of authority"
        },
        {
            question: "The promise of the Holy Spirit’s coming is primarily found in which New Testament book?",
            options: ["Matthew", "Mark", "Luke", "Acts"],
            correctAnswer: "Acts"
        },
        {
            question: "Which verse is cited for Jesus' command to 'go and make disciples of all nations'?",
            options: ["John 3:16", "Matthew 28:19", "Acts 1:8", "Luke 24:47"],
            correctAnswer: "Matthew 28:19"
        },
        {
            question: "According to the document, engaging in the Great Commission means more than just evangelism; it includes:",
            options: ["Political activism", "Social isolation", "Teaching and baptizing new believers", "Focusing solely on personal spiritual growth"],
            correctAnswer: "Teaching and baptizing new believers"
        },
        {
            question: "The document links the Messiah’s role as the 'Son of Man' (Daniel 7:13-14) to His:",
            options: ["Humanity and humble origins", "Divine authority and universal dominion", "Suffering and death", "Prophetic ministry"],
            correctAnswer: "Divine authority and universal dominion"
        },
        {
            question: "Which aspect of Jesus’ life and ministry most explicitly demonstrated God’s active reign and power on Earth?",
            options: ["His birth", "His parables", "His miracles", "His suffering"],
            correctAnswer: "His miracles"
        },
        {
            question: "The document describes the 'Last Supper' as establishing the 'New Covenant' in Christ’s:",
            options: ["Teaching", "Blood", "Miracles", "Discipleship"],
            correctAnswer: "Blood"
        },
        {
            question: "Which historical event cemented the early church’s belief in Jesus’ deity and resurrection, despite persecution?",
            options: ["The destruction of the Temple", "The Roman conquest of Jerusalem", "The outpouring of the Holy Spirit at Pentecost", "The writing of the Gospels"],
            correctAnswer: "The outpouring of the Holy Spirit at Pentecost"
        },
        {
            question: "The document refers to Christ’s current role in heaven as intercessor, meaning He is:",
            options: ["Waiting for His return", "Ceased His work", "Pleading on behalf of believers before God", "Observing humanity passively"],
            correctAnswer: "Pleading on behalf of believers before God"
        },
        {
            question: "The Great Commission instructs believers to go to 'all nations,' which implies a mission that is:",
            options: ["Culturally specific", "Limited to Israel", "Universal and inclusive of all ethnic groups", "Primarily spiritual, not physical"],
            correctAnswer: "Universal and inclusive of all ethnic groups"
        },
        {
            question: "According to the document, the concept of God as 'Jehovah-Shalom' (Judges 6:24) means He is:",
            options: ["The Lord our Healer", "The Lord our Banner", "The Lord our Peace", "The Lord our Righteousness"],
            correctAnswer: "The Lord our Peace"
        }
    ];
    // --- End of Quiz Data ---

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function showScreen(screen) {
        landingPage.classList.remove('active');
        quizScreen.classList.remove('active');
        resultsScreen.classList.remove('active');
        screen.classList.add('active');
    }

    function startQuiz() {
        const selectedQuizChoice = document.querySelector('input[name="quiz-choice"]:checked').value;

        if (selectedQuizChoice === 'nigerian-culture') {
            currentQuestions = [...nigerianCultureQuestions];
            document.title = "QuizKit - Nigerian People and Culture"; // Update page title
        } else if (selectedQuizChoice === 'jesus-messiah') {
            currentQuestions = [...jesusTheMessiahQuestions];
            document.title = "QuizKit - Jesus The Messiah"; // Update page title
        }

        feedbackMode = feedbackToggle.checked ? 'immediate' : 'end';
        score = 0;
        currentQuestionIndex = 0;
        userAnswers = Array(currentQuestions.length).fill(null); // Initialize userAnswers based on chosen quiz length

        shuffleArray(currentQuestions); // Shuffle questions for the selected quiz

        showScreen(quizScreen);
        loadQuestion(currentQuestionIndex);
    }

    function loadQuestion(index) {
        currentQuestionIndex = index;

        if (currentQuestionIndex >= 0 && currentQuestionIndex < currentQuestions.length) {
            const questionData = currentQuestions[currentQuestionIndex];
            questionNumberDisplay.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
            questionTextDisplay.textContent = questionData.question;
            optionsContainer.innerHTML = '';
            feedbackMessage.textContent = '';

            prevQuestionBtn.disabled = (currentQuestionIndex === 0);
            nextQuestionBtn.disabled = (currentQuestionIndex === currentQuestions.length - 1);

            let shuffledOptions;
            if (!userAnswers[currentQuestionIndex] || !userAnswers[currentQuestionIndex].shuffledOptions) {
                 shuffledOptions = [...questionData.options];
                 shuffleArray(shuffledOptions);
                 if (!userAnswers[currentQuestionIndex]) userAnswers[currentQuestionIndex] = {};
                 userAnswers[currentQuestionIndex].shuffledOptions = shuffledOptions;
            } else {
                shuffledOptions = userAnswers[currentQuestionIndex].shuffledOptions;
            }

            shuffledOptions.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option-btn');
                button.textContent = option;
                button.addEventListener('click', () => selectOption(button, option, questionData.correctAnswer));
                optionsContainer.appendChild(button);
            });

            if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].chosen) {
                disableOptions();
                const chosenOptionButton = Array.from(optionsContainer.children).find(btn => btn.textContent === userAnswers[currentQuestionIndex].chosen);
                if (chosenOptionButton) {
                    chosenOptionButton.classList.add('selected');

                    if (feedbackMode === 'immediate') {
                        if (userAnswers[currentQuestionIndex].isCorrect) {
                            chosenOptionButton.classList.add('correct');
                            feedbackMessage.textContent = '🎉 That’s spot on! Great job!';
                            feedbackMessage.classList.add('correct-feedback');
                        } else {
                            chosenOptionButton.classList.add('incorrect');
                            feedbackMessage.textContent = `💡 Not quite. The correct answer was: "${userAnswers[currentQuestionIndex].correct}". Keep learning!`;
                            feedbackMessage.classList.add('incorrect-feedback');
                            Array.from(optionsContainer.children).forEach(button => {
                                if (button.textContent === userAnswers[currentQuestionIndex].correct) {
                                    button.classList.add('correct');
                                }
                            });
                        }
                    }
                }
            } else {
                enableOptions();
            }
        }
    }

    function selectOption(selectedButton, chosenAnswer, correctAnswer) {
        if (selectedButton.disabled) return;

        Array.from(optionsContainer.children).forEach(button => {
            button.classList.remove('selected');
        });
        selectedButton.classList.add('selected');

        const isCorrect = (chosenAnswer === correctAnswer);

        if (!userAnswers[currentQuestionIndex]) userAnswers[currentQuestionIndex] = {};
        userAnswers[currentQuestionIndex].chosen = chosenAnswer;
        userAnswers[currentQuestionIndex].correct = correctAnswer;
        userAnswers[currentQuestionIndex].isCorrect = isCorrect;

        // Scoring logic (only apply score change once per question)
        if (userAnswers[currentQuestionIndex].scored === undefined) { // First time answering
            userAnswers[currentQuestionIndex].scored = isCorrect;
            if (isCorrect) {
                score++;
            }
        } else if (userAnswers[currentQuestionIndex].scored !== isCorrect) { // Answer changed, and correctness changed
            userAnswers[currentQuestionIndex].scored = isCorrect;
            if (isCorrect) {
                score++;
            } else {
                score--;
            }
        }


        if (feedbackMode === 'immediate') {
            disableOptions();
            if (isCorrect) {
                selectedButton.classList.add('correct');
                feedbackMessage.textContent = '🎉 That’s spot on! Great job!';
                feedbackMessage.classList.remove('incorrect-feedback');
                feedbackMessage.classList.add('correct-feedback');
            } else {
                selectedButton.classList.add('incorrect');
                feedbackMessage.textContent = `💡 Not quite. The correct answer was: "${correctAnswer}". Keep learning!`;
                feedbackMessage.classList.remove('correct-feedback');
                feedbackMessage.classList.add('incorrect-feedback');
                Array.from(optionsContainer.children).forEach(button => {
                    if (button.textContent === correctAnswer) {
                        button.classList.add('correct');
                    }
                });
            }
        } else {
            feedbackMessage.textContent = '';
        }
    }

    function disableOptions() {
        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true;
        });
    }

    function enableOptions() {
        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = false;
            button.classList.remove('selected', 'correct', 'incorrect');
        });
    }

    function goToNextQuestion() {
        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        } else {
            // If it's the last question and next is clicked, show results
            showResults();
        }
    }

    function goToPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    }

    function showResults() {
        showScreen(resultsScreen);
        scoreDisplay.textContent = `You answered ${score} out of ${currentQuestions.length} questions correctly!`;

        let message = '';
        let totalQuestions = currentQuestions.length;
        let percentage = (score / totalQuestions) * 100;

        if (score < totalQuestions * 0.5) { // Less than 50%
            message = `Keep your chin up! Learning is a journey, not a race. Review your notes and give it another shot – you've got this! 💪`;
        } else if (score < totalQuestions * 0.8) { // Between 50% and 80%
            message = `Solid effort! You've got a good grasp, but there's always room to shine even brighter. A little more focus, and you'll be unstoppable! ✨`;
        } else { // 80% or more
            message = `Absolutely phenomenal! You're clearly mastering this topic. Your hard work is truly paying off. Keep up the brilliant work! 🌟`;
        }
        resultMessageDisplay.textContent = message;

        // Conditional display of answers review
        answersReviewContainer.innerHTML = ''; // Clear previous review
        if (feedbackMode === 'end') {
            const incorrectAnswers = userAnswers.filter(answer => answer && !answer.isCorrect);

            if (incorrectAnswers.length > 0) {
                answersReviewContainer.style.display = 'block';
                const reviewTitle = document.createElement('h3');
                reviewTitle.textContent = 'Review Your Incorrect Answers';
                answersReviewContainer.appendChild(reviewTitle);

                userAnswers.forEach((userAnswer, index) => {
                    if (userAnswer && !userAnswer.isCorrect) {
                        const questionData = currentQuestions[index];
                        const answerItem = document.createElement('div');
                        answerItem.classList.add('answer-item', 'incorrect-review');

                        const questionLabel = document.createElement('span');
                        questionLabel.classList.add('question-label');
                        questionLabel.textContent = `Question ${index + 1}: ${questionData.question}`;
                        answerItem.appendChild(questionLabel);

                        const userChoiceDiv = document.createElement('p');
                        userChoiceDiv.classList.add('user-choice');
                        const userIcon = document.createElement('span');
                        userIcon.classList.add('feedback-icon', 'incorrect-icon');
                        userIcon.innerHTML = '&#10007;'; // X mark
                        userChoiceDiv.innerHTML = `<strong>Your Answer:</strong> ${userAnswer.chosen || 'Not answered'}`;
                        userChoiceDiv.prepend(userIcon);
                        answerItem.appendChild(userChoiceDiv);

                        const correctChoiceDiv = document.createElement('p');
                        correctChoiceDiv.classList.add('correct-choice');
                        correctChoiceDiv.innerHTML = `<strong>Correct Answer:</strong> ${questionData.correctAnswer}`;
                        answerItem.appendChild(correctChoiceDiv);

                        answersReviewContainer.appendChild(answerItem);
                    }
                });
            } else {
                answersReviewContainer.style.display = 'block'; // Still show the section but with a message
                const reviewTitle = document.createElement('h3');
                reviewTitle.textContent = 'Detailed Answer Review';
                answersReviewContainer.appendChild(reviewTitle);

                const perfectScoreMessage = document.createElement('p');
                perfectScoreMessage.style.textAlign = 'center';
                perfectScoreMessage.style.fontSize = '1.1em';
                perfectScoreMessage.style.color = '#555';
                perfectScoreMessage.textContent = 'Fantastic! You answered all questions correctly. No incorrect answers to review.';
                answersReviewContainer.appendChild(perfectScoreMessage);
            }
        } else {
            answersReviewContainer.style.display = 'none'; // Hide if immediate feedback
            answersReviewContainer.innerHTML = ''; // Ensure it's empty
        }
    }

    startQuizBtn.addEventListener('click', startQuiz);
    retakeQuizBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', goToNextQuestion);
    prevQuestionBtn.addEventListener('click', goToPreviousQuestion);
    submitQuizBtn.addEventListener('click', showResults);

    // Set initial feedback mode based on toggle (default to 'end')
    feedbackToggle.checked = false;
    feedbackToggle.addEventListener('change', () => {
        feedbackMode = feedbackToggle.checked ? 'immediate' : 'end';
    });

    // Initialize screen
    showScreen(landingPage);
});

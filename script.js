document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landing-page');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');

    const startQuizBtn = document.getElementById('start-quiz-btn');
    const retakeQuizBtn = document.getElementById('retake-quiz-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const prevQuestionBtn = document.getElementById('prev-question-btn');
    const submitQuizBtn = document.getElementById('submit-quiz-btn');

    const feedbackToggle = document.getElementById('feedback-toggle');
    const questionNumberDisplay = document.getElementById('question-number');
    const questionTextDisplay = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackMessage = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score-display');
    const resultMessageDisplay = document.getElementById('result-message');
    const answersReviewContainer = document.getElementById('answers-review'); // Get the new container

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    let feedbackMode = 'end';

    const allQuestions = [
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
        feedbackMode = feedbackToggle.checked ? 'immediate' : 'end';
        score = 0;
        currentQuestionIndex = 0;
        userAnswers = Array(allQuestions.length).fill(null);

        currentQuestions = [...allQuestions];
        shuffleArray(currentQuestions);

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

        if (!userAnswers[currentQuestionIndex].scored) {
            if (isCorrect) {
                score++;
                userAnswers[currentQuestionIndex].scored = true;
            }
        } else if (userAnswers[currentQuestionIndex].scored && !isCorrect) {
            score--;
            userAnswers[currentQuestionIndex].scored = false;
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

        if (score < 30) {
            message = `Keep your chin up! Learning is a journey, not a race. Review your notes and give it another shot – you've got this! 💪`;
        } else if (score < 40) {
            message = `Solid effort! You've got a good grasp, but there's always room to shine even brighter. A little more focus, and you'll be unstoppable! ✨`;
        } else {
            message = `Absolutely phenomenal! You're clearly mastering "Nigerian People and Culture". Your hard work is truly paying off. Keep up the brilliant work! 🌟`;
        }
        resultMessageDisplay.textContent = message;

        // Conditional display of answers review
        answersReviewContainer.innerHTML = ''; // Clear previous review
        if (feedbackMode === 'end') {
            answersReviewContainer.style.display = 'block';
            const reviewTitle = document.createElement('h3');
            reviewTitle.textContent = 'Detailed Answer Review';
            answersReviewContainer.appendChild(reviewTitle);

            currentQuestions.forEach((questionData, index) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answer-item');

                const questionLabel = document.createElement('span');
                questionLabel.classList.add('question-label');
                questionLabel.textContent = `Question ${index + 1}: ${questionData.question}`;
                answerItem.appendChild(questionLabel);

                const userAnswer = userAnswers[index];
                const userChosen = userAnswer ? userAnswer.chosen : 'Not answered';
                const isCorrect = userAnswer ? userAnswer.isCorrect : false;

                const userChoiceDiv = document.createElement('p');
                userChoiceDiv.classList.add('user-choice');
                const userIcon = document.createElement('span');
                userIcon.classList.add('feedback-icon');
                if (isCorrect) {
                    userIcon.classList.add('correct-icon');
                    userIcon.innerHTML = '&#10003;'; // Checkmark
                    answerItem.classList.add('correct-review');
                } else {
                    userIcon.classList.add('incorrect-icon');
                    userIcon.innerHTML = '&#10007;'; // X mark
                    answerItem.classList.add('incorrect-review');
                }
                userChoiceDiv.innerHTML = `<strong>Your Answer:</strong> ${userChosen}`;
                userChoiceDiv.prepend(userIcon);
                answerItem.appendChild(userChoiceDiv);

                if (!isCorrect || userChosen === 'Not answered') {
                    const correctChoiceDiv = document.createElement('p');
                    correctChoiceDiv.classList.add('correct-choice');
                    correctChoiceDiv.innerHTML = `<strong>Correct Answer:</strong> ${questionData.correctAnswer}`;
                    answerItem.appendChild(correctChoiceDiv);
                }
                answersReviewContainer.appendChild(answerItem);
            });
        } else {
            answersReviewContainer.style.display = 'none';
        }
    }

    startQuizBtn.addEventListener('click', startQuiz);
    retakeQuizBtn.addEventListener('click', startQuiz);
    nextQuestionBtn.addEventListener('click', goToNextQuestion);
    prevQuestionBtn.addEventListener('click', goToPreviousQuestion);
    submitQuizBtn.addEventListener('click', showResults);

    feedbackToggle.checked = false;
    feedbackToggle.addEventListener('change', () => {
        feedbackMode = feedbackToggle.checked ? 'immediate' : 'end';
    });

    showScreen(landingPage);
});
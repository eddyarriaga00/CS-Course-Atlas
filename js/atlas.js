const UI = {
  en: {
    signIn: 'Sign in', skip: 'Skip to content', search: 'Search courses, modules, terms', home: 'Home', courses: 'Courses', allCourses: 'All courses', practice: 'Practice', account: 'Account', profile: 'Profile',
    flashcards: 'Flashcards', quizzes: 'Quizzes', playground: 'Playground', notes: 'Notes', support: 'Support', more: 'More', otherCourses: 'Other courses',
    soon: 'Soon', comingSoon: 'Coming soon', available: 'Available', modules: 'modules', moduleLower: 'module', units: 'units', unitsTitle: 'Units', unit: 'Unit', hours: 'hours', min: 'min', module: 'Module', term: 'Term',
    heroTitle: 'Learn computer science from zero.',
    heroLead: 'Free, step-by-step courses that start at the very beginning. Short lessons, code you can run right in your browser, challenges that check your work, and a video for every topic, in English and Spanish.',
    startPython: 'Start with Python', noExperience: 'No experience needed. Free, no account required.', continueCourse: (c) => `Continue ${c}`,
    startFrom: 'Where are you starting from?',
    s1Title: 'I’m brand new', s1Text: 'Never written a line of code? Start with Python. The first lesson is one line long.', s1Cta: 'Start Python',
    s2Title: 'I know a little code', s2Text: 'Comfortable with variables and loops? Pick up the tools every programmer uses: the command line, Git and building real websites.', s2Cta: 'Open Command Line',
    s3Title: 'I’m taking a CS class', s3Text: 'Study Java, Data Structures & Algorithms and Discrete Math alongside your class: auto-graded Java challenges, a quiz for every module and a video for every topic.', s3Cta: 'Open Java',
    pathTitle: 'The beginner path', pathLead: 'Three stages, in an order that makes sense. Go left to right, or jump to what you need.',
    stageCode: 'Start coding', stageCodeText: 'Write programs and use the tools every programmer uses.', stageBuild: 'Build things', stageBuildText: 'Make web pages people can open and store data that lasts.', stageUnderstand: 'Understand computers', stageUnderstandText: 'What happens underneath, how to stay safe, how AI works, and the math behind it all.', stageWord: (n) => `Stage ${n}`, stepN: (n) => `Step ${n}`, stepReady: 'Ready', stepSoon: 'Being written', stepDone: 'Complete',
    howTitle: 'How every module works',
    how1: 'Read', how1Text: 'A short lesson: why it matters, the key ideas and the mistakes to avoid.',
    how2: 'Run', how2Text: 'Examples you can edit and run in your browser. Nothing to install.',
    how3: 'Practice', how3Text: 'Coding challenges checked instantly, a quiz, and flashcards that come back right before you forget them.',
    how4: 'Watch', how4Text: 'A hand-picked video for every topic from university and teaching channels.',
    nextTitle: 'After the beginner path', nextLead: 'Bigger languages, algorithms and how real systems work.',
    startJava: 'Start the Java course', browse: 'Browse courses', continueTitle: 'Continue where you left off', continueBtn: 'Continue', startBtn: 'Start',
    certTitle: 'Course certificate', certLocked: 'Finish every module and pass every quiz with 60% or more to earn your certificate.', certModules: (a, b) => `${a} / ${b} modules complete`, certQuizzes: (a, b) => `${a} / ${b} quizzes passed`, certEarned: 'Certificate earned', certEarnedText: 'You finished every module and passed every quiz.', certView: 'View certificate', certOf: 'Certificate of completion', certThat: 'This certifies that', certDone: 'has completed the course', certDetail: (m, h, q) => `${m} modules · about ${h} hours · ${q}% average quiz score`, certOn: (d) => `Completed on ${d}`, certName: 'Name on the certificate', certPrint: 'Print or save as PDF', certNotYet: 'This certificate is not earned yet.', certBack: 'Back to the course', certFrom: 'CS Course Atlas',
    vizStep: 'Step through', vizHint: 'Run line by line and watch the variables change', vizSteps: (n) => `${n} steps recorded`, vizStepOf: (a, b) => `Step ${a} of ${b}`, vizBack: 'Back', vizNext: 'Next', vizFirst: 'First step', vizLast: 'Last step', vizClose: 'Close', vizAbout: (n) => `About to run line ${n}`, vizReturns: (f, v) => `${f}() returns <code>${v}</code>`, vizEnd: 'The program finished.', vizCrashed: (n) => `The program stopped with an error on line ${n}.`, vizGlobals: 'Global variables', vizNoVars: 'No variables yet', vizNothing: 'Nothing printed yet', vizCapped: 'Stopped after 600 steps. Try a smaller input to see the whole run.',
    notesDownload: 'Download all (.md)', pageKind: 'Page', challengeKind: 'Challenge', pgShare: 'Share', pgShareHint: 'Copy a link that opens this code in the playground', linkCopied: 'Link copied. Anyone who opens it sees this code.', copyThisLink: 'Copy this link:', pgShared: 'a shared link', pgBadLink: 'That code link is broken, so the playground opened as usual.', pgTooLong: 'This code is too long for a link (8,000 characters max).',
    gitNoRepo: (p) => `There is no Git repository in ${p}`, gitExtraRepo: (p) => `${p} should not be a Git repository`, gitHead: (a, b) => `You are on branch ${a}, expected ${b}`, gitNoBranch: (b) => `Branch ${b} is missing`, gitExtraBranch: (b) => `Branch ${b} should not exist`, gitCommits: (b, a, w) => `Commits on ${b}: ${a} (expected ${w})`, gitTracked: (b, a, w) => `Files committed on ${b}: ${a} (expected ${w})`, gitStatus: (a, w) => `git status -s shows ${a} (expected ${w})`, gitRepoNote: (r, h, n) => `[${r}: Git repository on branch ${h}, ${n} commit${n === 1 ? '' : 's'}]`,
    bkShort: 'Backup', bkTitle: 'Back up your progress', bkLead: 'Without an account, your progress lives only in this browser. Download a backup file to keep it safe or move it to another device; restoring merges it with what is here and never deletes anything.', bkSignedIn: 'You are signed in, so your progress already syncs to your account. A file backup is an extra copy you control.', bkDownload: 'Download backup', bkRestore: 'Restore from file', bkRestored: (n) => `Restored. ${n} new completed module${n === 1 ? '' : 's'} or solved challenge${n === 1 ? '' : 's'} added.`, bkBadFile: 'That file is not a CS Course Atlas backup.', scShort: 'Shortcuts', scTitle: 'Keyboard shortcuts', scSearch: 'Search', scHelp: 'Show this list', scRunPg: 'Run code in the playground', scRunCh: 'Check a challenge', scIndent: 'Indent in an editor', scQuizPick: 'Pick a quiz answer', scQuizNext: 'Next question', scFlip: 'Flip a flashcard', scSpace: 'Space', scRate: 'Flashcards: still learning / I know it', scStep: 'Visualizer: step back / forward', scClose: 'Close search or this dialog', celTitle: (c) => `You finished ${c}!`, celLead: (n) => `All ${n} modules done. Here is what you can do next:`, celCertLeft: (n) => `Pass ${n} more quiz${n === 1 ? '' : 'zes'} with 60% or more to earn the certificate.`, undefTip: 'Your function gave back `undefined`: it probably never `return`s its result. Add `return` before the value.', noneTip: 'Your function gave back `None`: it probably computes the answer but never `return`s it. Add `return` before the result.', chStepHint: 'Run your code line by line on the first test, in the playground', chStepComment: 'the first test of the challenge:', retryMissed: (n) => `Retry the ${n} I missed`, retryAll: 'Take the whole quiz', missedRound: 'missed questions', yourAnswer: 'Your answer', checkAnswer: 'Check answer', predictPlaceholder: 'Type exactly what the program prints…', predictRight: 'Exactly right. You read the code like the computer does.', predictEmpty: 'Type the output first.', predictCount: (a, b) => `You wrote ${a} line${a === 1 ? '' : 's'}; the program prints ${b}.`, predictLine: (n) => `Close: line ${n} is not what the program prints. Trace that part again.`, wholeCourse: (c) => `${c}: whole course`, wholeCourses: 'Whole courses', courseQuizBtn: 'Course review quiz', courseCardsBtn: 'All the course terms', cheatSheet: 'Cheat sheet', cheatSheetOf: (c) => `${c}: cheat sheet`, printSheet: 'Print or save as PDF', cheatLead: 'Every module on one page: the key ideas, the mistakes to avoid and the terms. Good for review before a quiz.', watchOut: 'Watch out for', dailyTitle: 'Today’s challenge', dailyGo: 'Solve it', termRan: (n) => `${n} command${n === 1 ? '' : 's'} ran in the practice terminal`, terminal: 'Terminal', startingFiles: 'Starting files', loadingWord: 'Loading…', emptyHome: '~/ (empty)', shellFailed: 'The practice terminal could not load. Check your connection and try again.', noCommands: 'No commands yet.', shMissing: (p) => `${p} is missing`, shExtra: (p) => `${p} should not be there`, shContent: (p) => `${p} has different contents`, shMode: (p, a, b) => `${p} has permissions ${a}, expected ${b}`, shNotExec: (p) => `${p} is not executable`, shExec: (p) => `${p} should not be executable`, shFilesLabel: 'Your files and folders end up right', shRepoLabel: 'Your files and Git repository end up right', shOutLabel: 'It prints the right output', nothingPrinted: '(nothing)',
    ofModules: (a, b) => `${a} of ${b} modules complete`, courseDone: 'Course complete. Nice work.',
    coursesTitle: 'Courses', coursesLead: 'New to programming? Follow the beginner path in order: all nine courses are ready. After it come Java and the next-level courses; the ones still being written show their outline, and you can vote for what you want next.',
    plannedTitle: 'Planned courses', plannedNote: 'Beginner courses first. Vote for the ones you want next.', javaTrack: 'Java course', studyTools: 'Study tools',
    toolFlash: 'Spaced review of the key terms.', toolQuiz: 'Check yourself after each module.', toolPlay: 'Run Java, C++, Python and JS.', toolNotes: 'Your notes, saved per module.',
    notifyMe: 'Notify me when it opens', notified: 'Saved: it will show up here when it opens',
    soonNotice: 'This course is being written. The outline below is final; lessons, examples and quizzes are not published yet.',
    totalTime: 'total', difficulty: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    topics: 'topics', examples4: 'Examples in 4 languages', examples2: 'Examples in Java and Python', overview: 'Overview', examples: 'Examples', terms: 'Terms', quiz: 'Quiz',
    why: 'Why it matters', objectives: 'By the end you can', before: 'Before you start', pitfalls: 'Common mistakes', takeaways: 'Key takeaways', resources: 'Further reading',
    prereq: 'Builds on', seeExamples: 'See the examples →', fullProgram: 'Full program', output: 'Output', copy: 'Copy', copied: 'Copied', explanation: 'What’s happening',
    practiceProblems: 'Practice problems', selfCheck: 'Check yourself', selfCheckHint: 'Answer out loud first, then check the lesson and examples.',
    markDone: 'Mark module complete', marked: 'Completed ✓', unmarked: 'Marked as not complete', prev: '← Previous', next: 'Next →', nextCourse: (c) => `Next course: ${c} →`, reviewBtn: 'Review', wholePath: 'Whole beginner path (9 courses)', courseFinished: (c) => `🎉 You finished ${c}! Every module is complete.`,
    question: (a, b) => `Question ${a} of ${b}`, correct: 'Correct.', notQuite: 'Not quite.', nextQ: 'Next question', finish: 'See score', retry: 'Try again',
    scoreText: (a, b) => `${a} of ${b} correct`, again: 'Still learning', gotIt: 'I know it', tapFlip: 'Tap to see the definition', cardOf: (a, b) => `Card ${a} of ${b}`,
    practiceLead: 'Check what stuck. Quizzes give instant feedback, flashcards drill the terms from each module, challenges check the code you write, and projects put it all together.', pickModule: 'Module',
    editProfile: 'Edit profile', signOut: 'Sign out', modulesComplete: 'Modules complete', streak: 'Study streak', days: 'days', quizAvg: 'Quiz average', across: 'across 4 quizzes',
    timeStudied: 'Time studied', thisMonth: 'this month', yourCourses: 'Your courses', progressUnit: (c) => `${c} progress by unit`, recent: 'Recent activity', prefs: 'Preferences',
    language: 'Language', languageSub: 'Lessons, quizzes and menus', theme: 'Theme', themeSub: 'Follows your device by default', system: 'System', light: 'Light', dark: 'Dark',
    exLang: 'Example language', exLangSub: 'Shown first in every code example', goal: 'Daily goal', goalSub: 'Used for your streak',
    comments: 'Show code comments', commentsSub: 'Inline explanations in examples', weekly: 'Weekly progress email', weeklySub: 'A short summary every Monday',
    methods: 'Sign-in methods', emailPw: 'Email and password', emailPwSub: 'Add a password to sign in without Google', setUp: 'Set up', connected: 'Connected',
    deleteTitle: 'Delete account', deleteText: 'Permanently removes your profile, progress and notes. This can’t be undone.', deleteBtn: 'Delete my account',
    signinTitle: 'Sign in', signinSub: 'Save your progress and pick up on any device.', google: 'Continue with Google', github: 'Continue with GitHub', orEmail: 'or use email', email: 'Email', password: 'Password',
    forgot: 'Forgot password?', newHere: 'New here?', create: 'Create an account', legal: 'By continuing you agree to the <a href="terms-of-use.html">Terms of Use</a> and <a href="privacy-policy.html">Privacy Policy</a>.',
    noResults: 'No matches', today: 'Today', yesterday: 'Yesterday', daysAgo: (n) => `${n} days ago`, completed: 'Completed', reviewed: 'Reviewed 12 flashcards', notFound: 'That page doesn’t exist.',
    glossary: 'Glossary', roadmap: 'Roadmap', whatsComing: 'What’s coming', tryIt: 'Try it ▸', run: 'Run ▸', reset: 'Reset', running: 'Running…',
    pgLead: 'Write and run code right here. Everything runs in your browser, nothing is uploaded: Python, Java, C++, JavaScript, SQL, web pages and a practice terminal. Java and C++ download their compilers the first time you run them.',
    pgServer: 'Running this language needs the code server, which is on the roadmap. Here is the output this example prints:', pgServerNoExpected: 'Running this language needs the code server, which is on the roadmap. Switch to JavaScript or Python to run code now.',
    pgDone: (ms) => `Finished in ${ms} ms`, pgTimeout: 'Stopped after 3 seconds (infinite loop?)', pgEmpty: '(no output)', pgLoaded: (m) => `Loaded from ${m}`,
    notesLeadIn: 'One page of notes per module, saved to your account and synced to every device you sign in on.', notesLead: 'One page of notes per module, saved on this device. With an account they sync everywhere.', notePlaceholder: 'What clicked? What confused you? Write it in your own words.', myNotes: 'My notes', predictMode: 'Guess first', predictFirst: 'What will this program print? Decide first, then check.', showOutput: 'Show the output',
    savedDevice: 'Saved on this device', notesFor: 'Notes for', words: 'words',
    glossaryLead: (n) => `${n} terms from the published courses, each linked to the module that teaches it.`, filterTerms: 'Filter terms', all: 'All', fromModule: (m) => `From ${m} →`,
    roadmapLead: 'Where CS Course Atlas is going. Vote for what you want next.', live: 'Live', building: 'In progress', planned: 'Planned', vote: '▲ Vote', voted: '▲ Voted',
    achievements: 'Achievements', earned: (a, b) => `${a} of ${b} earned`,
    studyPlan: 'Study plan', planLead: 'Pick a course and how much time you have; we lay out the rest of it week by week.', hoursWeek: 'Hours per week', startOn: 'Start on', finishBy: 'Finish by', weeksLeft: 'weeks', modulesLeft: 'modules left', weekN: (n) => `Week ${n}`, thisWeek: 'This week', planHome: (d, c) => `At your pace you’ll finish ${c} by <b>${d}</b>.`, editPlan: 'Edit plan', allDone: 'Every module of this course is complete. Time for the next one.', addCalendar: 'Add to calendar', reminders: 'Weekly reminder', 
    videos: 'Videos', fullSeries: 'Full video series', courseSeries: 'Full course series', watchTopic: 'Watch a video on this topic', watchWait: 'Watch while you wait', videosLead: 'A full series for the module, then one video per topic. All from university or well-known teaching channels; they open on YouTube.', videoCount: (n) => `${n} videos`, onYoutube: 'YouTube', javaLoading: 'Loading Java (first run only, about 20 seconds)…', cppLoading: (p) => `Downloading the C++ compiler (first run only): ${p}%`, cppPreparing: 'Starting the C++ compiler…', compiling: 'Compiling…', compileFailed: 'Your code did not compile:', javaFailed: 'Could not load Java. Check your connection and try again.', cppFailed: 'Could not load the C++ compiler. Check your connection and try again.', cppNoExceptions: 'Tip: C++ exceptions (try, throw, catch) are not available in the browser playground. Check values with if statements instead.', javaBusy: 'Java is still running the previous program. Reload the page to stop it.', pgCompiledRan: (c, r) => `Compiled in ${c} ms, ran in ${r} ms`, pyLoading: 'Loading Python (first run only, a few seconds)…', pyTimeout: 'Stopped after 10 seconds (infinite loop?)', pyFailed: 'Could not load Python. Check your connection and try again.', pythonExamples: 'Runnable Python examples', challenges: 'Challenges', seeTables: 'See the tables', sqlMatch: 'Your result matches. Nice work!', sqlNoMatch: (a, b) => `Not quite: your query returned ${a} row(s); the expected result has ${b}. Compare the two below.`, yourResult: 'Your result', expectedResult: 'Expected result', noRowsReturned: '(no rows returned)', sqlDiffers: 'Not quite: you have the right number of rows, but some values differ. Compare the two below.', sqlError: 'Your query has an error:', challengesPageLead: 'Write code, run terminal and Git commands, or predict what a program prints, and get it checked instantly. Everything runs in your browser.', nextUnsolved: 'Next challenge', allSolvedCh: 'Every challenge solved. Impressive.', solvedWord: 'solved', hubChallengeText: 'Code, terminal, Git and predict-the-output challenges, checked instantly with clear feedback.', challengesLead: 'Write the function, then run the tests. They run in your browser and check your answer instantly.', solvedOf: (a, b) => `${a} of ${b} solved.`, solved: 'Solved', runTests: 'Run tests', yourCode: 'your code', hint: 'Hint', showSolution: 'Show a solution', solutionAfter: 'A solution unlocks after two tries.', runningTests: 'Running the tests…', codeError: 'Your code has an error before the tests could run:', allPassed: 'All tests passed. Nice work!', passedOf: (a, b) => `${a} of ${b} tests passed. Check the ones marked ✗.`, got: 'got', expected: 'expected', printedOutput: 'Your print output', challengeSolved: '🎉 Challenge solved!', challengeSolvedIn: (m) => `Solved a challenge in ${m}`, mixedReview: 'Mixed review', quizKeys: 'Tip: press 1–4 to answer, Enter for next', mixedReviewOption: (n) => `★ Mixed review (${n} module${n === 1 ? '' : 's'})`, mixDeckDone: 'You know every card in this review.', dueOption: (n) => `⏰ Due for review (${n})`, dueEmpty: 'Nothing is due right now. Cards you mark come back after 1, 3, 7, 16 and 35 days, right before you would forget them.', dueNext: (d) => `Next card comes back ${d}.`, dueDone: 'Review done for today. These cards will come back later.', dueWord: 'due today', reviewedOf: (a, b) => `${a} of ${b} reviewed`, dueChip: (n) => `${n} card${n === 1 ? '' : 's'} to review`, inDays: (n) => (n <= 1 ? 'tomorrow' : `in ${n} days`), loadingLessons: 'Loading lessons…', lessonsFailed: 'Could not load these lessons. Check your connection.', practiceHub: 'Practice home', hubQuizText: 'A short quiz for every module, with an explanation for every answer.', hubFlashText: 'Every key term as a card. Mark the ones you know and keep reviewing the rest.', taken: 'taken', average: 'average', cards: 'cards', known: 'known', suggested: 'Suggested next', takeQuiz: 'Take the quiz', reviewCards: 'Review the cards', quizzesLead: 'Pick a module and check what stuck. Every answer comes with an explanation, and your best score is saved.', timedMode: 'Timed', timedHint: `${30} seconds per question, like a real test`, timeUp: 'Time’s up.', secondsLeft: 'Seconds left', flashLead: 'Flip each card, then mark it. Cards you know come back for review right before you would forget them.', yourScores: 'Your best scores', notTaken: 'not taken', knownOf: (a, b) => `${a} of ${b} known`, knownBadge: 'known', shuffle: 'Shuffle', resetDeck: 'Reset deck', flashKeys: 'Space flips · ← still learning · → I know it', deckDone: 'You know every card in this module.', sideBeginner: 'Beginner path', sideNext: 'Next level', pathTotals: (m, h) => `${m} modules, about ${h} hours of lessons in all.`, alsoPlanned: 'Also on the way:', sqlExamples: 'Real SQLite queries', sqlLoading: 'Loading SQLite (first run only)…', sqlFailed: 'Could not load SQLite. Check your connection and try again.', syllabus: 'What you will learn', outlineNotice: 'This course is being written now. The outline below is final: each module will have a lesson, examples you can run, practice, a quiz and videos.', soonNoticePlanned: 'This course is planned. Vote for it so we know to write it sooner.', wantThis: '▲ I want this course', meanwhile: 'Get ready with these courses first', pathStep: 'beginner path step', levelWord: 'level', seeOutline: 'See outline', webExamples: 'Live web pages', preview: 'Live preview', rendered: 'Rendered', pgHtmlSample: 'A web page: edit it and press Run', showPw: 'Show password', hidePw: 'Hide password', show: 'Show', hide: 'Hide', signupSub: 'Free. Your progress, notes and quiz scores are saved and follow you to any device.', orSignupEmail: 'or sign up with email', createFree: 'Create free account', userHint: '3–32 characters: letters, numbers, dot, underscore or dash.', pwHint: 'At least 8 characters.', accountTitle: 'Account', displayName: 'Display name', saveChanges: 'Save changes', saved: 'Saved', changePw: 'Change password', currentPw: 'Current password', newPw: 'New password', pwChanged: 'Password changed', googleNoPw: (p) => `You sign in with ${p}, so there is no password to manage here.`, saveTitle: 'Keep your progress', saveText: 'It is only on this device right now. A free account saves it and syncs it everywhere.', expand: 'show modules', collapse: 'hide modules', fullSession: 'Full session', week1: 'week', coursesReady: 'courses ready', course: 'Course', trackCourse: (c) => `${c} course`, terminalExamples: 'Real terminal sessions', terminalHint: 'Run this in an empty folder. Lines starting with $ are what you type; the rest is what the computer printed when we ran the session for real. Copy gives you just the commands.', terminalOut: 'Terminal', report: 'Report a problem with this module', programs: 'programs', languagesWord: 'languages', waitLead: 'Series that cover these modules, each listed once.',
    signedInWith: (p) => `Signed in with ${p}`, syncedAt: (tm) => `Progress synced at ${tm}`, syncPending: 'Syncing progress…', day: 'day', acrossN: (n) => `across ${n} ${n === 1 ? 'quiz' : 'quizzes'}`, noQuizYet: 'No quizzes taken yet',
    modulesWithNotes: 'modules with notes', noActivity: 'Complete a module, take a quiz or write a note and it shows up here.', typeDelete: 'Type DELETE to confirm', deleteViaSupport: 'Ask support to delete it',
    privacy: 'Privacy', terms: 'Terms', contact: 'Contact', checkingSession: 'Checking your account…', emailOrUser: 'Email or username', username: 'Username', confirmPw: 'Confirm password',
    haveAccount: 'Have an account?', pwMismatch: 'The passwords don’t match.', working: 'One moment…', signinFailed: 'Sign-in didn’t complete. Please try again.', welcome: (n) => (n ? `Signed in as ${n}` : 'Signed in'),
    cfTitle: 'Confirm your email', cfText: (e) => `We sent a 6-digit code to <b>${e}</b>. Enter it here to confirm your account.`, cfCode: '6-digit code', cfBtn: 'Confirm', cfResend: 'Send a new code', cfSent: 'New code sent. Check your inbox (and spam).', cfDone: 'Email confirmed. Thank you!', cfLater: 'Later', emailConfirmed: 'Confirmed', emailNotConfirmed: 'Not confirmed', emailMeCode: 'Email me a code instead', emailCodeSent: 'If that account has a confirmed email, we sent it a 6-digit code. It works for 30 minutes.', needIdentity: 'Enter your email or username first.', projects: 'Projects', projectOne: 'Project', projectsLead: 'Build something real, one checked step at a time. Each step adds to the code from the last one, and the site tells you instantly when it works.', hubProjectText: 'Multi-step builds: each step is checked instantly and adds to the last.', projectSteps: (n) => `${n} steps`, projectMinutes: (n) => `≈ ${n} min`, projectDone: '🏁 Project complete!', projectDoneIn: (m) => `Finished the project ${m}`, startProject: 'Start project', continueProject: 'Continue', projectCompleteLabel: 'Complete', stepOf: (a, b) => `${a} of ${b} steps done`, projectsForCourse: 'Build a project', projectCourse: 'Course', allProjects: 'All projects', rcTitle: 'Recovery codes', rcSub: 'Each code resets your password once if you forget it. Keep them somewhere safe, like a password manager or a printed page.', rcSaveTitle: 'Save your recovery codes', rcSaveText: 'If you ever forget your password, one of these codes lets you set a new one. Each works once. This is the only time they are shown.', rcCopy: 'Copy codes', rcCopied: 'Codes copied', rcDownload: 'Download .txt', rcDone: 'I saved them', rcLeft: (a, b) => `${a} of ${b} codes left.`, rcNone: 'You have no recovery codes yet. Make some so a forgotten password never locks you out.', rcLow: 'Running low: make a fresh set.', rcMake: 'Make new codes', rcMakeHint: 'Your old codes stop working when you make new ones.', rcFileHead: 'CS Course Atlas recovery codes', rcFileUse: 'Use one on the sign-in page: Forgot password? Each code works once.', recoverTitle: 'Reset your password', recoverSub: 'Use one of the recovery codes you saved when you created your account, or a code we email you.', recoveryCode: 'Recovery code', recoverBtn: 'Reset password', backToSignIn: 'Back to sign in', noCode: 'No recovery code?', contactUs: 'Contact support', pwReset: (n) => `Password reset. You are signed in (${n} recovery code${n === 1 ? '' : 's'} left).`, recoverOff: 'Password reset is being switched on. Until then, contact support and we will reset it for you.', codeHint: 'A recovery code like K7QM-3XRP-W9TD, or the 6-digit code from our email.',
    serverSlow: 'The server is waking up. Try again in a few seconds.', signedOut: 'Signed out', accountDeleted: 'Your account was deleted', savedAccount: 'Saved to your account'
  },
  es: {
    signIn: 'Iniciar sesión', skip: 'Saltar al contenido', search: 'Busca cursos, módulos, términos', home: 'Inicio', courses: 'Cursos', allCourses: 'Todos los cursos', practice: 'Práctica', account: 'Cuenta', profile: 'Perfil',
    flashcards: 'Tarjetas', quizzes: 'Cuestionarios', playground: 'Editor', notes: 'Notas', support: 'Soporte', more: 'Más', otherCourses: 'Otros cursos',
    soon: 'Pronto', comingSoon: 'Próximamente', available: 'Disponible', modules: 'módulos', moduleLower: 'módulo', units: 'unidades', unitsTitle: 'Unidades', unit: 'Unidad', hours: 'horas', min: 'min', module: 'Módulo', term: 'Término',
    heroTitle: 'Aprende ciencias de la computación desde cero.',
    heroLead: 'Cursos gratis, paso a paso, que empiezan desde el principio. Lecciones cortas, código que puedes ejecutar en tu navegador, retos que revisan tu trabajo y un video para cada tema, en español e inglés.',
    startPython: 'Empieza con Python', noExperience: 'No necesitas experiencia. Gratis y sin cuenta.', continueCourse: (c) => `Continuar ${c}`,
    startFrom: '¿Desde dónde empiezas?',
    s1Title: 'Soy completamente nuevo', s1Text: '¿Nunca has escrito código? Empieza con Python. La primera lección es de una sola línea.', s1Cta: 'Empezar Python',
    s2Title: 'Sé un poco de código', s2Text: '¿Ya manejas variables y ciclos? Aprende las herramientas que usa todo programador: la línea de comandos, Git y crear sitios web reales.', s2Cta: 'Abrir Línea de comandos',
    s3Title: 'Estoy en una clase de CS', s3Text: 'Estudia Java, Estructuras de datos y algoritmos y Matemáticas discretas junto a tu clase: retos de Java con calificación automática, un cuestionario por módulo y un video por tema.', s3Cta: 'Abrir Java',
    pathTitle: 'La ruta para principiantes', pathLead: 'Tres etapas en un orden lógico. Ve de izquierda a derecha o salta a lo que necesites.',
    stageCode: 'Empieza a programar', stageCodeText: 'Escribe programas y usa las herramientas de todo programador.', stageBuild: 'Construye cosas', stageBuildText: 'Crea páginas web que otros pueden abrir y guarda datos que perduran.', stageUnderstand: 'Entiende las computadoras', stageUnderstandText: 'Qué pasa por dentro, cómo protegerte, cómo funciona la IA y las matemáticas detrás de todo.', stageWord: (n) => `Etapa ${n}`, stepN: (n) => `Paso ${n}`, stepReady: 'Listo', stepSoon: 'En preparación', stepDone: 'Completado',
    howTitle: 'Cómo funciona cada módulo',
    how1: 'Lee', how1Text: 'Una lección corta: por qué importa, las ideas clave y los errores a evitar.',
    how2: 'Ejecuta', how2Text: 'Ejemplos que puedes editar y ejecutar en tu navegador. Nada que instalar.',
    how3: 'Practica', how3Text: 'Retos de código revisados al instante, un cuestionario y tarjetas que vuelven justo antes de que las olvides.',
    how4: 'Mira', how4Text: 'Un video elegido para cada tema, de canales universitarios y de enseñanza.',
    nextTitle: 'Después de la ruta para principiantes', nextLead: 'Lenguajes más grandes, algoritmos y cómo funcionan los sistemas reales.',
    startJava: 'Empezar el curso de Java', browse: 'Ver cursos', continueTitle: 'Continúa donde te quedaste', continueBtn: 'Continuar', startBtn: 'Empezar',
    certTitle: 'Certificado del curso', certLocked: 'Termina todos los módulos y aprueba cada cuestionario con 60% o más para obtener tu certificado.', certModules: (a, b) => `${a} / ${b} módulos completados`, certQuizzes: (a, b) => `${a} / ${b} cuestionarios aprobados`, certEarned: 'Certificado obtenido', certEarnedText: 'Terminaste todos los módulos y aprobaste cada cuestionario.', certView: 'Ver certificado', certOf: 'Certificado de finalización', certThat: 'Se certifica que', certDone: 'completó el curso', certDetail: (m, h, q) => `${m} módulos · unas ${h} horas · ${q}% de promedio en cuestionarios`, certOn: (d) => `Completado el ${d}`, certName: 'Nombre en el certificado', certPrint: 'Imprimir o guardar como PDF', certNotYet: 'Este certificado aún no se ha obtenido.', certBack: 'Volver al curso', certFrom: 'CS Course Atlas',
    vizStep: 'Paso a paso', vizHint: 'Ejecuta línea por línea y mira cómo cambian las variables', vizSteps: (n) => `${n} pasos registrados`, vizStepOf: (a, b) => `Paso ${a} de ${b}`, vizBack: 'Atrás', vizNext: 'Siguiente', vizFirst: 'Primer paso', vizLast: 'Último paso', vizClose: 'Cerrar', vizAbout: (n) => `A punto de ejecutar la línea ${n}`, vizReturns: (f, v) => `${f}() devuelve <code>${v}</code>`, vizEnd: 'El programa terminó.', vizCrashed: (n) => `El programa se detuvo con un error en la línea ${n}.`, vizGlobals: 'Variables globales', vizNoVars: 'Aún no hay variables', vizNothing: 'Aún no se imprimió nada', vizCapped: 'Se detuvo tras 600 pasos. Prueba con una entrada más pequeña para ver toda la ejecución.',
    notesDownload: 'Descargar todo (.md)', pageKind: 'Página', challengeKind: 'Reto', pgShare: 'Compartir', pgShareHint: 'Copia un enlace que abre este código en el editor', linkCopied: 'Enlace copiado. Quien lo abra verá este código.', copyThisLink: 'Copia este enlace:', pgShared: 'un enlace compartido', pgBadLink: 'Ese enlace de código está dañado, así que el editor se abrió como siempre.', pgTooLong: 'Este código es demasiado largo para un enlace (máximo 8.000 caracteres).',
    gitNoRepo: (p) => `No hay un repositorio de Git en ${p}`, gitExtraRepo: (p) => `${p} no debería ser un repositorio de Git`, gitHead: (a, b) => `Estás en la rama ${a}, se esperaba ${b}`, gitNoBranch: (b) => `Falta la rama ${b}`, gitExtraBranch: (b) => `La rama ${b} no debería existir`, gitCommits: (b, a, w) => `Commits en ${b}: ${a} (se esperaba ${w})`, gitTracked: (b, a, w) => `Archivos con commit en ${b}: ${a} (se esperaba ${w})`, gitStatus: (a, w) => `git status -s muestra ${a} (se esperaba ${w})`, gitRepoNote: (r, h, n) => `[${r}: repositorio de Git en la rama ${h}, ${n} commit${n === 1 ? '' : 's'}]`,
    bkShort: 'Respaldo', bkTitle: 'Respalda tu progreso', bkLead: 'Sin cuenta, tu progreso vive solo en este navegador. Descarga un archivo de respaldo para guardarlo o pasarlo a otro dispositivo; restaurarlo lo combina con lo que hay aquí y nunca borra nada.', bkSignedIn: 'Iniciaste sesión, así que tu progreso ya se sincroniza con tu cuenta. Un respaldo en archivo es una copia extra que tú controlas.', bkDownload: 'Descargar respaldo', bkRestore: 'Restaurar desde archivo', bkRestored: (n) => `Restaurado. Se agregaron ${n} módulo${n === 1 ? '' : 's'} completado${n === 1 ? '' : 's'} o reto${n === 1 ? '' : 's'} resuelto${n === 1 ? '' : 's'}.`, bkBadFile: 'Ese archivo no es un respaldo de CS Course Atlas.', scShort: 'Atajos', scTitle: 'Atajos de teclado', scSearch: 'Buscar', scHelp: 'Mostrar esta lista', scRunPg: 'Ejecutar código en el editor', scRunCh: 'Revisar un reto', scIndent: 'Sangría en un editor', scQuizPick: 'Elegir una respuesta', scQuizNext: 'Siguiente pregunta', scFlip: 'Voltear una tarjeta', scSpace: 'Espacio', scRate: 'Tarjetas: aún aprendiendo / la sé', scStep: 'Visualizador: paso atrás / adelante', scClose: 'Cerrar la búsqueda o este diálogo', celTitle: (c) => `¡Terminaste ${c}!`, celLead: (n) => `Completaste los ${n} módulos. Esto es lo que puedes hacer ahora:`, celCertLeft: (n) => `Aprueba ${n} cuestionario${n === 1 ? '' : 's'} más con 60% o más para obtener el certificado.`, undefTip: 'Tu función devolvió `undefined`: seguramente nunca hace `return` de su resultado. Agrega `return` antes del valor.', noneTip: 'Tu función devolvió `None`: seguramente calcula la respuesta pero nunca hace `return`. Agrega `return` antes del resultado.', chStepHint: 'Ejecuta tu código línea por línea con la primera prueba, en el editor', chStepComment: 'la primera prueba del reto:', retryMissed: (n) => `Repetir ${n === 1 ? 'la que fallé' : 'las ' + n + ' que fallé'}`, retryAll: 'Hacer todo el cuestionario', missedRound: 'preguntas falladas', yourAnswer: 'Tu respuesta', checkAnswer: 'Revisar respuesta', predictPlaceholder: 'Escribe exactamente lo que imprime el programa…', predictRight: 'Exacto. Leíste el código como lo hace la computadora.', predictEmpty: 'Primero escribe la salida.', predictCount: (a, b) => `Escribiste ${a} línea${a === 1 ? '' : 's'}; el programa imprime ${b}.`, predictLine: (n) => `Casi: la línea ${n} no es lo que imprime el programa. Vuelve a seguir esa parte.`, wholeCourse: (c) => `${c}: curso completo`, wholeCourses: 'Cursos completos', courseQuizBtn: 'Cuestionario de repaso del curso', courseCardsBtn: 'Todos los términos del curso', cheatSheet: 'Hoja de repaso', cheatSheetOf: (c) => `${c}: hoja de repaso`, printSheet: 'Imprimir o guardar como PDF', cheatLead: 'Todos los módulos en una página: las ideas clave, los errores a evitar y los términos. Útil para repasar antes de un cuestionario.', watchOut: 'Cuidado con', dailyTitle: 'Reto de hoy', dailyGo: 'Resolverlo', termRan: (n) => `${n} comando${n === 1 ? '' : 's'} en la terminal de práctica`, terminal: 'Terminal', startingFiles: 'Archivos iniciales', loadingWord: 'Cargando…', emptyHome: '~/ (vacío)', shellFailed: 'La terminal de práctica no se pudo cargar. Revisa tu conexión e inténtalo otra vez.', noCommands: 'Aún no hay comandos.', shMissing: (p) => `falta ${p}`, shExtra: (p) => `${p} no debería estar`, shContent: (p) => `${p} tiene otro contenido`, shMode: (p, a, b) => `${p} tiene permisos ${a}, se esperaba ${b}`, shNotExec: (p) => `${p} no es ejecutable`, shExec: (p) => `${p} no debería ser ejecutable`, shFilesLabel: 'Tus archivos y carpetas quedan bien', shRepoLabel: 'Tus archivos y tu repositorio de Git quedan bien', shOutLabel: 'Imprime la salida correcta', nothingPrinted: '(nada)',
    ofModules: (a, b) => `${a} de ${b} módulos completados`, courseDone: 'Curso completado. ¡Buen trabajo!',
    coursesTitle: 'Cursos', coursesLead: '¿Nuevo en programación? Sigue la ruta para principiantes en orden: los nueve cursos están listos. Después vienen Java y los cursos del siguiente nivel; los que aún se escriben muestran su temario y puedes votar por lo que quieras primero.',
    plannedTitle: 'Cursos planeados', plannedNote: 'Primero los de nivel principiante. Vota por los que quieres primero.', javaTrack: 'Curso de Java', studyTools: 'Herramientas de estudio',
    toolFlash: 'Repaso espaciado de los términos clave.', toolQuiz: 'Ponte a prueba después de cada módulo.', toolPlay: 'Ejecuta Java, C++, Python y JS.', toolNotes: 'Tus notas, guardadas por módulo.',
    notifyMe: 'Avísame cuando abra', notified: 'Guardado: aparecerá aquí cuando abra',
    soonNotice: 'Este curso se está escribiendo. El temario de abajo es definitivo; las lecciones, ejemplos y cuestionarios aún no se publican.',
    totalTime: 'en total', difficulty: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' },
    topics: 'temas', examples4: 'Ejemplos en 4 lenguajes', examples2: 'Ejemplos en Java y Python', overview: 'Resumen', examples: 'Ejemplos', terms: 'Términos', quiz: 'Cuestionario',
    why: 'Por qué importa', objectives: 'Al terminar podrás', before: 'Antes de empezar', pitfalls: 'Errores comunes', takeaways: 'Ideas clave', resources: 'Lecturas recomendadas',
    prereq: 'Se basa en', seeExamples: 'Ver los ejemplos →', fullProgram: 'Programa completo', output: 'Salida', copy: 'Copiar', copied: 'Copiado', explanation: 'Qué está pasando',
    practiceProblems: 'Ejercicios', selfCheck: 'Ponte a prueba', selfCheckHint: 'Responde primero en voz alta y luego revisa la lección y los ejemplos.',
    markDone: 'Marcar módulo como completado', marked: 'Completado ✓', unmarked: 'Marcado como no completado', prev: '← Anterior', next: 'Siguiente →', nextCourse: (c) => `Siguiente curso: ${c} →`, reviewBtn: 'Repasar', wholePath: 'Toda la ruta para principiantes (9 cursos)', courseFinished: (c) => `🎉 ¡Terminaste ${c}! Completaste todos los módulos.`,
    question: (a, b) => `Pregunta ${a} de ${b}`, correct: 'Correcto.', notQuite: 'No exactamente.', nextQ: 'Siguiente pregunta', finish: 'Ver resultado', retry: 'Intentar de nuevo',
    scoreText: (a, b) => `${a} de ${b} correctas`, again: 'Aún aprendiendo', gotIt: 'La sé', tapFlip: 'Toca para ver la definición', cardOf: (a, b) => `Tarjeta ${a} de ${b}`,
    practiceLead: 'Comprueba qué aprendiste. Los cuestionarios corrigen al instante, las tarjetas repasan los términos de cada módulo los retos revisan el código que escribes y los proyectos lo juntan todo.', pickModule: 'Módulo',
    editProfile: 'Editar perfil', signOut: 'Cerrar sesión', modulesComplete: 'Módulos completados', streak: 'Racha de estudio', days: 'días', quizAvg: 'Promedio en cuestionarios', across: 'en 4 cuestionarios',
    timeStudied: 'Tiempo de estudio', thisMonth: 'este mes', yourCourses: 'Tus cursos', progressUnit: (c) => `Progreso en ${c} por unidad`, recent: 'Actividad reciente', prefs: 'Preferencias',
    language: 'Idioma', languageSub: 'Lecciones, cuestionarios y menús', theme: 'Tema', themeSub: 'Sigue a tu dispositivo por defecto', system: 'Sistema', light: 'Claro', dark: 'Oscuro',
    exLang: 'Lenguaje de los ejemplos', exLangSub: 'Se muestra primero en cada ejemplo', goal: 'Meta diaria', goalSub: 'Se usa para tu racha',
    comments: 'Mostrar comentarios en el código', commentsSub: 'Explicaciones dentro de los ejemplos', weekly: 'Correo semanal de progreso', weeklySub: 'Un resumen breve cada lunes',
    methods: 'Métodos de inicio de sesión', emailPw: 'Correo y contraseña', emailPwSub: 'Agrega una contraseña para entrar sin Google', setUp: 'Configurar', connected: 'Conectado',
    deleteTitle: 'Eliminar cuenta', deleteText: 'Elimina para siempre tu perfil, tu progreso y tus notas. No se puede deshacer.', deleteBtn: 'Eliminar mi cuenta',
    signinTitle: 'Iniciar sesión', signinSub: 'Guarda tu progreso y continúa en cualquier dispositivo.', google: 'Continuar con Google', github: 'Continuar con GitHub', orEmail: 'o usa tu correo', email: 'Correo', password: 'Contraseña',
    forgot: '¿Olvidaste tu contraseña?', newHere: '¿Eres nuevo?', create: 'Crear una cuenta', legal: 'Al continuar aceptas los <a href="terms-of-use.html">Términos de uso</a> y la <a href="privacy-policy.html">Política de privacidad</a>.',
    noResults: 'Sin resultados', today: 'Hoy', yesterday: 'Ayer', daysAgo: (n) => `Hace ${n} días`, completed: 'Completaste', reviewed: 'Repasaste 12 tarjetas', notFound: 'Esa página no existe.',
    glossary: 'Glosario', roadmap: 'Hoja de ruta', whatsComing: 'Lo que viene', tryIt: 'Probar ▸', run: 'Ejecutar ▸', reset: 'Restablecer', running: 'Ejecutando…',
    pgLead: 'Escribe y ejecuta código aquí mismo. Todo corre en tu navegador y nada se sube: Python, Java, C++, JavaScript, SQL, páginas web y una terminal de práctica. Java y C++ descargan su compilador la primera vez que los ejecutas.',
    pgServer: 'Ejecutar este lenguaje requiere el servidor de código, que está en la hoja de ruta. Esta es la salida que imprime el ejemplo:', pgServerNoExpected: 'Ejecutar este lenguaje requiere el servidor de código, que está en la hoja de ruta. Cambia a JavaScript o Python para ejecutar código ahora.',
    pgDone: (ms) => `Terminó en ${ms} ms`, pgTimeout: 'Detenido después de 3 segundos (¿bucle infinito?)', pgEmpty: '(sin salida)', pgLoaded: (m) => `Cargado desde ${m}`,
    notesLeadIn: 'Una página de notas por módulo, guardada en tu cuenta y sincronizada en cada dispositivo donde inicies sesión.', notesLead: 'Una página de notas por módulo, guardada en este dispositivo. Con una cuenta se sincronizan en todas partes.', notePlaceholder: '¿Qué entendiste? ¿Qué te confundió? Escríbelo con tus palabras.', myNotes: 'Mis notas', predictMode: 'Adivina primero', predictFirst: '¿Qué imprimirá este programa? Decide primero y luego revisa.', showOutput: 'Mostrar la salida',
    savedDevice: 'Guardado en este dispositivo', notesFor: 'Notas de', words: 'palabras',
    glossaryLead: (n) => `${n} términos de los cursos publicados, cada uno enlazado al módulo que lo enseña.`, filterTerms: 'Filtrar términos', all: 'Todos', fromModule: (m) => `De ${m} →`,
    roadmapLead: 'Hacia dónde va CS Course Atlas. Vota por lo que quieres primero.', live: 'Disponible', building: 'En progreso', planned: 'Planeado', vote: '▲ Votar', voted: '▲ Votado',
    achievements: 'Logros', earned: (a, b) => `${a} de ${b} obtenidos`,
    studyPlan: 'Plan de estudio', planLead: 'Elige un curso y cuánto tiempo tienes; organizamos el resto semana a semana.', hoursWeek: 'Horas por semana', startOn: 'Empezar el', finishBy: 'Terminas el', weeksLeft: 'semanas', modulesLeft: 'módulos restantes', weekN: (n) => `Semana ${n}`, thisWeek: 'Esta semana', planHome: (d, c) => `A tu ritmo terminarás ${c} el <b>${d}</b>.`, editPlan: 'Editar plan', allDone: 'Completaste todos los módulos de este curso. Es hora del siguiente.', addCalendar: 'Agregar al calendario', reminders: 'Recordatorio semanal', 
    videos: 'Videos', fullSeries: 'Serie completa de videos', courseSeries: 'Serie completa del curso', watchTopic: 'Mira un video sobre este tema', watchWait: 'Mira mientras esperas', videosLead: 'Una serie completa del módulo y un video por tema. Todos de canales universitarios o de enseñanza reconocidos; se abren en YouTube (en inglés).', videoCount: (n) => `${n} videos`, onYoutube: 'YouTube', javaLoading: 'Cargando Java (solo la primera vez, unos 20 segundos)…', cppLoading: (p) => `Descargando el compilador de C++ (solo la primera vez): ${p}%`, cppPreparing: 'Iniciando el compilador de C++…', compiling: 'Compilando…', compileFailed: 'Tu código no compiló:', javaFailed: 'No se pudo cargar Java. Revisa tu conexión e inténtalo de nuevo.', cppFailed: 'No se pudo cargar el compilador de C++. Revisa tu conexión e inténtalo de nuevo.', cppNoExceptions: 'Consejo: las excepciones de C++ (try, throw, catch) no están disponibles en el playground del navegador. Revisa los valores con if.', javaBusy: 'Java sigue ejecutando el programa anterior. Recarga la página para detenerlo.', pgCompiledRan: (c, r) => `Compilado en ${c} ms, ejecutado en ${r} ms`, pyLoading: 'Cargando Python (solo la primera vez, unos segundos)…', pyTimeout: 'Detenido después de 10 segundos (¿bucle infinito?)', pyFailed: 'No se pudo cargar Python. Revisa tu conexión e inténtalo de nuevo.', pythonExamples: 'Ejemplos de Python ejecutables', challenges: 'Retos', seeTables: 'Ver las tablas', sqlMatch: '¡Tu resultado coincide! Buen trabajo.', sqlNoMatch: (a, b) => `Todavía no: tu consulta devolvió ${a} fila(s); el resultado esperado tiene ${b}. Compara ambos abajo.`, yourResult: 'Tu resultado', expectedResult: 'Resultado esperado', noRowsReturned: '(no se devolvieron filas)', sqlDiffers: 'Todavía no: tienes el número correcto de filas, pero algunos valores son distintos. Compara ambos abajo.', sqlError: 'Tu consulta tiene un error:', challengesPageLead: 'Escribe código, ejecuta comandos de terminal y Git, o predice lo que imprime un programa, y obtén la revisión al instante. Todo corre en tu navegador.', nextUnsolved: 'Siguiente reto', allSolvedCh: 'Resolviste todos los retos. Impresionante.', solvedWord: 'resueltos', hubChallengeText: 'Retos de código, terminal, Git y de predecir la salida, revisados al instante con respuestas claras.', challengesLead: 'Escribe la función y luego ejecuta las pruebas. Corren en tu navegador y revisan tu respuesta al instante.', solvedOf: (a, b) => `${a} de ${b} resueltos.`, solved: 'Resuelto', runTests: 'Ejecutar pruebas', yourCode: 'tu código', hint: 'Pista', showSolution: 'Ver una solución', solutionAfter: 'Una solución se desbloquea tras dos intentos.', runningTests: 'Ejecutando las pruebas…', codeError: 'Tu código tiene un error antes de que corrieran las pruebas:', allPassed: '¡Todas las pruebas pasaron! Buen trabajo.', passedOf: (a, b) => `Pasaron ${a} de ${b} pruebas. Revisa las marcadas con ✗.`, got: 'obtuviste', expected: 'se esperaba', printedOutput: 'Lo que imprimiste', challengeSolved: '🎉 ¡Reto resuelto!', challengeSolvedIn: (m) => `Resolviste un reto en ${m}`, mixedReview: 'Repaso mixto', quizKeys: 'Consejo: pulsa 1–4 para responder y Enter para seguir', mixedReviewOption: (n) => `★ Repaso mixto (${n} módulo${n === 1 ? '' : 's'})`, mixDeckDone: 'Sabes todas las tarjetas de este repaso.', dueOption: (n) => `⏰ Para repasar (${n})`, dueEmpty: 'No hay nada pendiente ahora. Las tarjetas que marcas vuelven después de 1, 3, 7, 16 y 35 días, justo antes de que las olvides.', dueNext: (d) => `La próxima tarjeta vuelve ${d}.`, dueDone: 'Repaso terminado por hoy. Estas tarjetas volverán más adelante.', dueWord: 'para hoy', reviewedOf: (a, b) => `${a} de ${b} repasadas`, dueChip: (n) => `${n} tarjeta${n === 1 ? '' : 's'} para repasar`, inDays: (n) => (n <= 1 ? 'mañana' : `en ${n} días`), loadingLessons: 'Cargando lecciones…', lessonsFailed: 'No se pudieron cargar estas lecciones. Revisa tu conexión.', practiceHub: 'Inicio de práctica', hubQuizText: 'Un cuestionario corto por módulo, con una explicación para cada respuesta.', hubFlashText: 'Cada término clave como tarjeta. Marca las que sabes y sigue repasando las demás.', taken: 'hechos', average: 'promedio', cards: 'tarjetas', known: 'sabidas', suggested: 'Siguiente sugerido', takeQuiz: 'Hacer el cuestionario', reviewCards: 'Repasar las tarjetas', quizzesLead: 'Elige un módulo y comprueba qué aprendiste. Cada respuesta trae una explicación y se guarda tu mejor resultado.', timedMode: 'Con tiempo', timedHint: `${30} segundos por pregunta, como en un examen real`, timeUp: 'Se acabó el tiempo.', secondsLeft: 'Segundos restantes', flashLead: 'Voltea cada tarjeta y márcala. Las que sabes vuelven para repasar justo antes de que las olvides.', yourScores: 'Tus mejores resultados', notTaken: 'sin hacer', knownOf: (a, b) => `${a} de ${b} sabidas`, knownBadge: 'sabida', shuffle: 'Mezclar', resetDeck: 'Reiniciar mazo', flashKeys: 'Espacio voltea · ← aún aprendiendo · → la sé', deckDone: 'Sabes todas las tarjetas de este módulo.', sideBeginner: 'Ruta para principiantes', sideNext: 'Siguiente nivel', pathTotals: (m, h) => `${m} módulos, unas ${h} horas de lecciones en total.`, alsoPlanned: 'También en camino:', sqlExamples: 'Consultas reales de SQLite', sqlLoading: 'Cargando SQLite (solo la primera vez)…', sqlFailed: 'No se pudo cargar SQLite. Revisa tu conexión e inténtalo de nuevo.', syllabus: 'Lo que aprenderás', outlineNotice: 'Este curso se está escribiendo. El temario de abajo es definitivo: cada módulo tendrá una lección, ejemplos que puedes ejecutar, práctica, un cuestionario y videos.', soonNoticePlanned: 'Este curso está planeado. Vota por él para que sepamos escribirlo antes.', wantThis: '▲ Quiero este curso', meanwhile: 'Prepárate primero con estos cursos', pathStep: 'paso de la ruta', levelWord: 'nivel', seeOutline: 'Ver temario', webExamples: 'Páginas web en vivo', preview: 'Vista previa en vivo', rendered: 'Mostrado', pgHtmlSample: 'Una página web: edítala y pulsa Ejecutar', showPw: 'Mostrar contraseña', hidePw: 'Ocultar contraseña', show: 'Ver', hide: 'Ocultar', signupSub: 'Gratis. Tu progreso, notas y resultados se guardan y te siguen a cualquier dispositivo.', orSignupEmail: 'o regístrate con tu correo', createFree: 'Crear cuenta gratis', userHint: 'De 3 a 32 caracteres: letras, números, punto, guion bajo o guion.', pwHint: 'Al menos 8 caracteres.', accountTitle: 'Cuenta', displayName: 'Nombre visible', saveChanges: 'Guardar cambios', saved: 'Guardado', changePw: 'Cambiar contraseña', currentPw: 'Contraseña actual', newPw: 'Contraseña nueva', pwChanged: 'Contraseña cambiada', googleNoPw: (p) => `Inicias sesión con ${p}, así que aquí no hay contraseña que administrar.`, saveTitle: 'Conserva tu progreso', saveText: 'Por ahora solo está en este dispositivo. Una cuenta gratis lo guarda y lo sincroniza en todas partes.', expand: 'mostrar módulos', collapse: 'ocultar módulos', fullSession: 'Sesión completa', week1: 'semana', coursesReady: 'cursos listos', course: 'Curso', trackCourse: (c) => `Curso de ${c}`, terminalExamples: 'Sesiones reales de terminal', terminalHint: 'Ejecútalo en una carpeta vacía. Las líneas que empiezan con $ son lo que escribes; el resto es lo que imprimió la computadora al ejecutar la sesión de verdad. Copiar te da solo los comandos.', terminalOut: 'Terminal', report: 'Reportar un problema con este módulo', programs: 'programas', languagesWord: 'lenguajes', waitLead: 'Series que cubren estos módulos, cada una una sola vez.',
    signedInWith: (p) => `Sesión iniciada con ${p}`, syncedAt: (tm) => `Progreso sincronizado a las ${tm}`, syncPending: 'Sincronizando progreso…', day: 'día', acrossN: (n) => `en ${n} ${n === 1 ? 'cuestionario' : 'cuestionarios'}`, noQuizYet: 'Aún no haces cuestionarios',
    modulesWithNotes: 'módulos con notas', noActivity: 'Completa un módulo, haz un cuestionario o escribe una nota y aparecerá aquí.', typeDelete: 'Escribe DELETE para confirmar', deleteViaSupport: 'Pide a soporte que la elimine',
    privacy: 'Privacidad', terms: 'Términos', contact: 'Contacto', checkingSession: 'Revisando tu cuenta…', emailOrUser: 'Correo o usuario', username: 'Usuario', confirmPw: 'Confirmar contraseña',
    haveAccount: '¿Ya tienes cuenta?', pwMismatch: 'Las contraseñas no coinciden.', working: 'Un momento…', signinFailed: 'No se completó el inicio de sesión. Inténtalo de nuevo.', welcome: (n) => (n ? `Sesión iniciada como ${n}` : 'Sesión iniciada'),
    cfTitle: 'Confirma tu correo', cfText: (e) => `Enviamos un código de 6 dígitos a <b>${e}</b>. Escríbelo aquí para confirmar tu cuenta.`, cfCode: 'Código de 6 dígitos', cfBtn: 'Confirmar', cfResend: 'Enviar un código nuevo', cfSent: 'Código nuevo enviado. Revisa tu bandeja (y el spam).', cfDone: 'Correo confirmado. ¡Gracias!', cfLater: 'Después', emailConfirmed: 'Confirmado', emailNotConfirmed: 'Sin confirmar', emailMeCode: 'Mejor envíame un código por correo', emailCodeSent: 'Si esa cuenta tiene un correo confirmado, le enviamos un código de 6 dígitos. Funciona durante 30 minutos.', needIdentity: 'Primero escribe tu correo o usuario.', projects: 'Proyectos', projectOne: 'Proyecto', projectsLead: 'Construye algo real, un paso revisado a la vez. Cada paso se suma al código del anterior y el sitio te dice al instante si funciona.', hubProjectText: 'Construcciones de varios pasos: cada paso se revisa al instante y se suma al anterior.', projectSteps: (n) => `${n} pasos`, projectMinutes: (n) => `≈ ${n} min`, projectDone: '🏁 ¡Proyecto terminado!', projectDoneIn: (m) => `Terminaste el proyecto ${m}`, startProject: 'Empezar proyecto', continueProject: 'Continuar', projectCompleteLabel: 'Terminado', stepOf: (a, b) => `${a} de ${b} pasos hechos`, projectsForCourse: 'Construye un proyecto', projectCourse: 'Curso', allProjects: 'Todos los proyectos', rcTitle: 'Códigos de recuperación', rcSub: 'Cada código restablece tu contraseña una vez si la olvidas. Guárdalos en un lugar seguro, como un gestor de contraseñas o una hoja impresa.', rcSaveTitle: 'Guarda tus códigos de recuperación', rcSaveText: 'Si alguna vez olvidas tu contraseña, uno de estos códigos te permite crear una nueva. Cada uno funciona una vez. Esta es la única vez que se muestran.', rcCopy: 'Copiar códigos', rcCopied: 'Códigos copiados', rcDownload: 'Descargar .txt', rcDone: 'Ya los guardé', rcLeft: (a, b) => `Te quedan ${a} de ${b} códigos.`, rcNone: 'Todavía no tienes códigos de recuperación. Crea algunos para que una contraseña olvidada nunca te deje fuera.', rcLow: 'Te quedan pocos: crea un juego nuevo.', rcMake: 'Crear códigos nuevos', rcMakeHint: 'Tus códigos anteriores dejan de funcionar cuando creas nuevos.', rcFileHead: 'Códigos de recuperación de CS Course Atlas', rcFileUse: 'Usa uno en la página de inicio de sesión: ¿Olvidaste tu contraseña? Cada código funciona una vez.', recoverTitle: 'Restablece tu contraseña', recoverSub: 'Usa uno de los códigos de recuperación que guardaste al crear tu cuenta, o un código que te enviamos por correo.', recoveryCode: 'Código de recuperación', recoverBtn: 'Restablecer contraseña', backToSignIn: 'Volver a iniciar sesión', noCode: '¿No tienes un código?', contactUs: 'Contacta a soporte', pwReset: (n) => `Contraseña restablecida. Iniciaste sesión (te quedan ${n} código${n === 1 ? '' : 's'}).`, recoverOff: 'El restablecimiento de contraseña se está activando. Mientras tanto, contacta a soporte y la restableceremos por ti.', codeHint: 'Un código de recuperación como K7QM-3XRP-W9TD, o el código de 6 dígitos de nuestro correo.',
    serverSlow: 'El servidor se está activando. Inténtalo en unos segundos.', signedOut: 'Sesión cerrada', accountDeleted: 'Tu cuenta fue eliminada', savedAccount: 'Guardado en tu cuenta'
  }
};
const store = {
  get(key, fallback) { try { const v = localStorage.getItem('atlas-' + key); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; } },
  set(key, value) { try { localStorage.setItem('atlas-' + key, JSON.stringify(value)); } catch (e) { /* storage unavailable: keep in memory */ } }
};
const state = {
  lang: store.get('lang', (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en'), user: null, authReady: false, syncedAt: null, done: new Set(store.get('done', [])),
  codeLang: store.get('codeLang', 'java'), notified: new Set(store.get('notified', [])), tab: 'overview', exIndex: 0, quiz: null, flash: null,
  notes: store.get('notes', {}), aces: new Set(store.get('aces', [])), langsSeen: new Set(store.get('langsSeen', ['java'])), votes: new Set(store.get('votes', [])),
  plan: store.get('plan', { hours: 4, start: new Date().toISOString().slice(0, 10) }), quizBest: store.get('quizBest', {}), cardsKnown: new Set(store.get('cardsKnown', [])), cardBox: store.get('cardBox', {}), predictMode: store.get('predictMode', false), revealed: new Set(), quizTimed: store.get('quizTimed', false), certs: store.get('certs', {}), solved: new Set(store.get('solved', [])), chTries: {}, chModule: null, quizModule: null, flashModule: null, activity: store.get('activity', []), pg: null, sideCollapsed: new Set(), noteModule: null, glossLetter: 'all', glossQuery: '', glossCourse: 'all'
};
let DATA = null;
const $ = (s, r = document) => r.querySelector(s);
const t = (k, ...a) => { const v = UI[state.lang][k] ?? UI.en[k]; return typeof v === 'function' ? v(...a) : v; };
const L = (o) => o == null ? '' : typeof o === 'string' ? o : (o[state.lang] ?? o.en ?? '');
const LL = (o) => (o && (o[state.lang] || o.en)) || [];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Inline formatting for lesson text: `code` and **bold**. Bold needs a space or punctuation around it, so math
// such as 2**31 stays as written, and it never applies inside code.
const fmt = (s) => esc(s).split(/(`[^`]+`)/).map((part, i) => (i % 2 ? `<code class="ic">${part.slice(1, -1)}</code>`
  : part.replace(/(^|[\s(¿¡"'“‘])\*\*(\S(?:[^*\n]*?\S)?)\*\*(?=$|[\s.,;:!?)"'”’])/g, '$1<strong>$2</strong>'))).join('');
function rich(text) {
  return String(text || '').split(/\n\n+/).map((block) => {
    let html = '', list = [];
    const flush = () => { if (list.length) { html += '<ul>' + list.map((li) => `<li>${fmt(li)}</li>`).join('') + '</ul>'; list = []; } };
    block.split('\n').forEach((line) => { if (/^\s*-\s+/.test(line)) list.push(line.replace(/^\s*-\s+/, '')); else { flush(); if (line.trim()) html += `<p>${fmt(line)}</p>`; } });
    flush();
    return html;
  }).join('');
}
const LANGS = [['python', 'Python'], ['javascript', 'JavaScript'], ['html', 'HTML'], ['sql', 'SQL'], ['java', 'Java'], ['cpp', 'C++']];
// The playground adds a practice terminal (the simulated shell from js/mini-shell.js).
const PG_LANGS = [...LANGS.slice(0, 4), ['bash', 'Terminal'], ...LANGS.slice(4)];
const track = (id) => DATA.tracks.find((x) => x.id === id);
const trackIds = (tid) => (track(tid) ? track(tid).units.flatMap((u) => u.modules) : []);
const liveTracks = () => DATA.tracks.filter((x) => x.status === 'available');
const inPath = (id) => DATA.path.some((st) => st.id === id);
// Live courses on the beginner path, in path order.
const pathTracks = () => DATA.path.map((st) => track(st.id)).filter((tr) => tr && tr.status === 'available');
// Every live course, beginner path first (in path order), then the rest.
const orderedTracks = () => pathTracks().concat(liveTracks().filter((tr) => !inPath(tr.id)));
const liveIds = () => liveTracks().flatMap((x) => trackIds(x.id));
const isLive = (id) => track(DATA.modules[id]?.track)?.status === 'available';
// Lessons are loaded per course (data/lessons/<track>.json) the first time a page needs them.
const lessonLoads = {};
function loadLessons(tid) {
  const tr = track(tid);
  if (!tr || tr.status !== 'available') return Promise.resolve();
  if (!lessonLoads[tid]) {
    lessonLoads[tid] = fetch(`data/lessons/${tid}.json?v=${tr.lessons}`)
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then((part) => { Object.assign(DATA.full, part); })
      .catch((err) => { delete lessonLoads[tid]; throw err; });
  }
  return lessonLoads[tid];
}
// A module page needs only its own lessons: fetch that module's small file unless its course is already loading.
const moduleLoads = {};
function loadModuleLessons(id) {
  const m = DATA.modules[id];
  if (DATA.full[id] || !m || !m.lessons) return Promise.resolve();
  if (lessonLoads[m.track]) return lessonLoads[m.track];
  if (!moduleLoads[id]) {
    moduleLoads[id] = fetch(`data/lessons/m-${id}.json?v=${m.lessons}`)
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then((one) => { DATA.full[id] = one; })
      .catch((err) => { delete moduleLoads[id]; throw err; });
  }
  return moduleLoads[id];
}
// Several modules (mixed review, due cards): fetch each one's small file instead of whole courses.
function waitForModules(ids) {
  ids = [...new Set(ids)].filter((id) => DATA.modules[id] && !DATA.full[id] && track(DATA.modules[id].track)?.status === 'available');
  if (!ids.length) return null;
  const route = location.hash;
  Promise.all(ids.map(loadModuleLessons)).then(() => { if (location.hash === route) render(true); })
    .catch(() => { if (location.hash === route) $('#main').innerHTML = `<div class="loading">${t('lessonsFailed')} <button class="btn btn-sm" data-action="reload">${t('retry')}</button></div>`; });
  return `<div class="loading" aria-busy="true"><span class="spinner"></span>${t('loadingLessons')}</div>`;
}
function waitForModule(id) {
  if (DATA.full[id] || track(DATA.modules[id].track)?.status !== 'available') return null;
  const route = location.hash;
  loadModuleLessons(id).then(() => { if (location.hash === route) render(true); })
    .catch(() => { if (location.hash === route) $('#main').innerHTML = `<div class="loading">${t('lessonsFailed')} <button class="btn btn-sm" data-action="reload">${t('retry')}</button></div>`; });
  return `<div class="loading" aria-busy="true"><span class="spinner"></span>${t('loadingLessons')}</div>`;
}
// The glossary loads one small file with every term (data/glossary.json) instead of every course's lessons.
let glossaryLoad = null;
function waitForGlossary() {
  if (DATA.glossary) return null;
  const route = location.hash;
  glossaryLoad = glossaryLoad || fetch('data/glossary.json?v=' + DATA.glossaryVersion).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); }).then((g) => { DATA.glossary = g; });
  glossaryLoad.then(() => { if (location.hash === route) render(true); }).catch(() => { glossaryLoad = null; if (location.hash === route) $('#main').innerHTML = `<div class="loading">${t('lessonsFailed')} <button class="btn btn-sm" data-action="reload">${t('retry')}</button></div>`; });
  return `<div class="loading" aria-busy="true"><span class="spinner"></span>${t('loadingLessons')}</div>`;
}
const lessonsReady = (tids) => tids.every((tid) => trackIds(tid).every((id) => DATA.full[id]));
// Returns a loading screen (and re-renders when ready) if any of these courses' lessons are missing.
function waitForLessons(tids) {
  tids = tids.filter((tid) => track(tid)?.status === 'available');
  if (lessonsReady(tids)) return null;
  const route = location.hash;
  Promise.all(tids.map(loadLessons)).then(() => { if (location.hash === route) render(true); })
    .catch(() => { if (location.hash === route) $('#main').innerHTML = `<div class="loading">${t('lessonsFailed')} <button class="btn btn-sm" data-action="reload">${t('retry')}</button></div>`; });
  return `<div class="loading" aria-busy="true"><span class="spinner"></span>${t('loadingLessons')}</div>`;
}
const javaIds = () => trackIds('java');
// The course the learner is working in: the one they opened last, else the first available one.
function currentTrack() { const id = store.get('lastTrack', null); return track(id)?.status === 'available' ? id : liveTracks()[0].id; }
function routeTrack(route) {
  if (route.startsWith('m-')) return DATA.modules[route.slice(2)]?.track || currentTrack();
  if (route.startsWith('course-') && track(route.slice(7))?.status === 'available') return route.slice(7);
  return currentTrack();
}
const LANG_LABEL = { java: 'Java', cpp: 'C++', python: 'Python', javascript: 'JavaScript', assembly: 'Assembly', bash: 'Terminal', html: 'HTML · CSS · JS', sql: 'SQL' };
const exampleLangs = (ex) => Object.keys(LANG_LABEL).filter((k) => ex.code && ex.code[k]);
// Selects lessons/quizzes grouped by course.
const moduleOptions = (selected) => orderedTracks().map((tr) => `<optgroup label="${esc(L(tr.title))}">${trackIds(tr.id).map((m) => `<option value="${m}" ${m === selected ? 'selected' : ''}>${esc(moduleTitle(m))}</option>`).join('')}</optgroup>`).join('');
const moduleTitle = (id) => (id.startsWith('project:') ? L((DATA.projects || []).find((p) => 'project:' + p.id === id)?.title) : L(DATA.modules[id]?.title)) || id;
// Everything that belongs to the learner, in one plain object: saved locally and, when signed in, to the account.
const progressSnapshot = () => ({ done: [...state.done], codeLang: state.codeLang, notified: [...state.notified], notes: state.notes, aces: [...state.aces],
  langsSeen: [...state.langsSeen], votes: [...state.votes], plan: state.plan, quizBest: state.quizBest, cardsKnown: [...state.cardsKnown], cardBox: state.cardBox, certs: state.certs, solved: [...state.solved], activity: state.activity.slice(-200), lang: state.lang });
const save = () => { const snap = progressSnapshot(); Object.entries(snap).forEach(([k, v]) => store.set(k, v)); scheduleSync(); };
function logActivity(kind, id, extra) { state.activity.push({ kind, id, at: Date.now(), ...(extra || {}) }); if (state.activity.length > 200) state.activity.splice(0, state.activity.length - 200); }
function toast(msg, ms = 1800) { const el = $('#toast'); el.textContent = msg; el.hidden = false; clearTimeout(toast.timer); toast.timer = setTimeout(() => { el.hidden = true; }, ms); }
function nextModule(tid = currentTrack()) { return trackIds(tid).find((id) => !state.done.has(id)) || null; }
// A course certificate needs every module marked done and every module quiz passed (60%+).
const CERT_PASS = 0.6;
function certStatus(tid) {
  const ids = trackIds(tid), quizIds = ids.filter((m) => DATA.modules[m]?.counts?.quiz !== 0);
  const done = ids.filter((m) => state.done.has(m)).length, passed = quizIds.filter((m) => (state.quizBest[m] || 0) >= CERT_PASS).length;
  const earned = ids.length > 0 && done === ids.length && passed === quizIds.length;
  if (earned && !state.certs[tid]) { state.certs[tid] = Date.now(); save(); }
  return { earned, done, total: ids.length, passed, quizzes: quizIds.length, at: state.certs[tid] };
}
function certCard(tid) {
  const c = certStatus(tid);
  if (c.earned) return `<div class="card cert-card earned"><span class="cert-seal" aria-hidden="true">🎓</span><div class="info"><b>${t('certEarned')}</b><span class="muted">${t('certEarnedText')}</span></div><a class="btn btn-sm" href="#cert-${tid}">${t('certView')}</a></div>`;
  return `<div class="card cert-card"><span class="cert-seal" aria-hidden="true">🎓</span><div class="info"><b>${t('certTitle')}</b><span class="muted">${t('certLocked')}</span>
    <div class="cert-reqs"><span class="${c.done === c.total ? 'ok' : ''}">${c.done === c.total ? '✓' : '○'} ${t('certModules', c.done, c.total)}</span><span class="${c.passed === c.quizzes ? 'ok' : ''}">${c.passed === c.quizzes ? '✓' : '○'} ${t('certQuizzes', c.passed, c.quizzes)}</span></div></div></div>`;
}
// A printable one-page review of a course: each module's key ideas, common mistakes and terms.
function viewSheet(tid) {
  const tr = track(tid); if (!tr || tr.status !== 'available') return viewMissing();
  return `<section class="wrap sheet-page"><div class="crumbs no-print"><a href="#course-${tid}">${esc(L(tr.title))}</a><span>/</span><span style="color:var(--text)">${t('cheatSheet')}</span></div>
    <div class="page-head"><h1>${t('cheatSheetOf', esc(L(tr.title)))}</h1><button class="btn btn-ghost btn-sm no-print" data-action="cert-print">⎙ ${t('printSheet')}</button></div>
    <p class="lead no-print">${t('cheatLead')}</p>
    <div class="sheet">${tr.units.map((u) => u.modules.map((m) => { const c = DATA.full[m]; if (!c) return '';
      return `<article class="sheet-mod"><h2><span class="muted">${esc(L(u.title))} ·</span> <a href="#m-${m}">${esc(moduleTitle(m))}</a></h2>
        <h3>${t('takeaways')}</h3><ul>${LL(c.keyTakeaways).map((x) => `<li>${fmt(x)}</li>`).join('')}</ul>
        ${LL(c.pitfalls).length ? `<h3>${t('watchOut')}</h3><ul class="sheet-pit">${LL(c.pitfalls).map((x) => `<li>${fmt(x)}</li>`).join('')}</ul>` : ''}
        ${(c.definitions || []).length ? `<h3>${t('terms')}</h3><dl>${c.definitions.map((d) => `<dt>${esc(L(d.term))}</dt><dd>${fmt(L(d.definition))}</dd>`).join('')}</dl>` : ''}</article>`; }).join('')).join('')}</div></section>`;
}
function viewCert(tid) {
  const tr = track(tid); if (!tr || tr.status !== 'available') return viewMissing();
  const c = certStatus(tid);
  if (!c.earned) return `<section class="wrap"><h1>${t('certTitle')}</h1><p class="lead">${t('certNotYet')}</p>${certCard(tid)}<a class="btn btn-ghost" href="#course-${tid}">${t('certBack')}</a></section>`;
  const name = store.get('certName', '') || state.user?.name || state.user?.username || '';
  const ids = trackIds(tid), q = ids.map((m) => state.quizBest[m]).filter((x) => x != null), avg = q.length ? Math.round(100 * q.reduce((a, b) => a + b, 0) / q.length) : 0;
  // The certificate prints landscape; the style lives only while this page is shown.
  return `<section class="wrap cert-page"><style>@page { size: A4 landscape; margin: 10mm; }</style><div class="crumbs no-print"><a href="#course-${tid}">${esc(L(tr.title))}</a><span>/</span><span style="color:var(--text)">${t('certTitle')}</span></div>
    <div class="cert-tools no-print"><label class="muted" for="cert-name">${t('certName')}</label><input class="input" id="cert-name" value="${esc(name)}" maxlength="60" autocomplete="name"><button class="btn" data-action="cert-print">${t('certPrint')}</button></div>
    <div class="certificate" id="certificate"><div class="cert-inner">
      <div class="cert-brand"><span class="brand-mark">◆</span>${t('certFrom')}</div>
      <div class="cert-kicker">${t('certOf')}</div>
      <p class="cert-that">${t('certThat')}</p>
      <div class="cert-name" id="cert-name-out">${esc(name) || '&nbsp;'}</div>
      <p class="cert-that">${t('certDone')}</p>
      <div class="cert-course"><span class="cicon" data-track="${tid}">${esc(tr.icon)}</span>${esc(L(tr.title))}</div>
      <p class="cert-detail">${t('certDetail', ids.length, trackStats(tr).hours, avg)}</p>
      <div class="cert-foot"><span>${t('certOn', fmtDate(c.at, { year: 'numeric', month: 'long', day: 'numeric' }))}</span><span>${esc((location.host + location.pathname).replace(/index\.html$/, '').replace(/\/$/, ''))}</span></div>
    </div></div></section>`;
}
function trackStats(tr) {
  const ids = tr.units.flatMap((u) => u.modules);
  const minutes = ids.reduce((s, id) => s + (DATA.modules[id]?.minutes || 0), 0);
  return { count: ids.length, units: tr.units.length, hours: Math.round(minutes / 60), done: ids.filter((id) => state.done.has(id)).length };
}
const pct = (a, b) => (b ? Math.round(100 * a / b) : 0);
function dot(id) { return `<span class="dot ${state.done.has(id) ? 'done' : id === nextModule(DATA.modules[id]?.track) ? 'next' : ''}"></span>`; }

/* ---------- Chrome: sidebar, bottom nav, dialog ---------- */
// Sidebar courses are collapsed rows. The course you are in opens on its own; any other course opens
// with its arrow (remembered). Inside an open course only the unit you are working in is expanded.
const CHEVRON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
function sideCourse(tr, route) {
  const ts = trackStats(tr), activeMod = route.startsWith('m-') ? route.slice(2) : null;
  const here = (activeMod && DATA.modules[activeMod]?.track === tr.id) || route === 'course-' + tr.id;
  const open = !state.sideCollapsed.has(tr.id) && (here || store.get('sideOpen', []).includes(tr.id));
  const focus = tr.units.find((u) => u.modules.includes(activeMod)) || tr.units.find((u) => u.modules.includes(nextModule(tr.id))) || tr.units[0];
  const units = open ? `<div class="side-units">${tr.units.map((u, i) => { const d = u.modules.filter((m) => state.done.has(m)).length;
    return `<details class="side-unit"${u === focus ? ' open' : ''}><summary><span class="sv">${CHEVRON}</span><span class="un">${i + 1}. ${esc(L(u.title))}</span><span class="cnt${d === u.modules.length ? ' full' : ''}">${d}/${u.modules.length}</span></summary>`
      + u.modules.map((id) => `<a class="mod-link${activeMod === id ? ' active' : ''}" href="#m-${id}">${dot(id)}${esc(moduleTitle(id))}</a>`).join('') + '</details>'; }).join('')}</div>` : '';
  return `<div class="side-course${open ? ' open' : ''}${here ? ' here' : ''}"><div class="side-head">
    <a class="course-switch" href="#course-${tr.id}"><span class="cmark" data-track="${tr.id}">${esc(tr.icon)}</span><span class="cs-txt"><b>${esc(L(tr.title))}</b><span>${t('ofModules', ts.done, ts.count)}</span><i class="mini-bar"><i style="width:${pct(ts.done, ts.count)}%"></i></i></span></a>
    <button class="side-toggle" data-action="side-toggle" data-v="${tr.id}" aria-expanded="${open}" aria-label="${esc(L(tr.title))}: ${open ? t('collapse') : t('expand')}">${CHEVRON}</button></div>${units}</div>`;
}
// "Confirm your email" bar under the header, shown to signed-in people whose address is not confirmed yet.
// Built only when the account state changes, so typing in it survives page renders.
let confirmBarKey = '';
function updateConfirmBar() {
  const u = state.user, show = Boolean(u && u.emailVerified === false && auth.emailConfirmation && !state.confirmLater);
  const key = show ? `${u.email}|${state.lang}` : '';
  if (key === confirmBarKey) return;
  confirmBarKey = key;
  let bar = $('#confirm-bar');
  if (!show) { if (bar) bar.remove(); return; }
  if (!bar) { bar = document.createElement('form'); bar.id = 'confirm-bar'; bar.className = 'confirm-bar'; bar.setAttribute('aria-labelledby', 'cf-title'); $('.shell').before(bar); }
  bar.innerHTML = `<span class="cf-icon" aria-hidden="true">✉</span><div class="cf-text"><b id="cf-title">${t('cfTitle')}</b><span>${t('cfText', esc(u.email))}</span></div>
    <div class="cf-form"><input id="cf-code" class="input code-input" inputmode="numeric" autocomplete="one-time-code" maxlength="7" placeholder="123456" aria-label="${t('cfCode')}" required>
    <button class="btn btn-sm" type="submit">${t('cfBtn')}</button><button type="button" class="link-btn" data-action="cf-resend">${t('cfResend')}</button></div>
    <span class="cf-status" id="cf-status" role="status"></span><button type="button" class="icon-btn cf-close" data-action="cf-later" aria-label="${t('cfLater')}">✕</button>`;
}
async function confirmEmail() {
  const status = $('#cf-status'), code = $('#cf-code').value.replace(/\D/g, '');
  status.className = 'cf-status'; status.textContent = t('working');
  try {
    await api('/api/auth/email/confirm', { method: 'POST', body: { code } });
    state.user = { ...state.user, emailVerified: true }; toast(t('cfDone'), 3000); render(true);
  } catch (e) { status.className = 'cf-status err'; status.textContent = e.message; }
}
async function resendConfirm() {
  const status = $('#cf-status');
  status.className = 'cf-status'; status.textContent = t('working');
  try {
    const r = await api('/api/auth/email/send-code', { method: 'POST', body: { lang: state.lang } });
    if (r.verified) { state.user = { ...state.user, emailVerified: true }; render(true); return; }
    status.className = 'cf-status ok'; status.textContent = t('cfSent');
  } catch (e) { status.className = 'cf-status err'; status.textContent = e.message; }
}
async function recoverByEmail() {
  const status = $('#recover-email-status'), who = ($('#si-email').value || '').trim();
  if (!who) { status.className = 'hint form-err'; status.textContent = t('needIdentity'); $('#si-email').focus(); return; }
  status.className = 'hint'; status.textContent = t('working');
  try { await api('/api/auth/recover/email', { method: 'POST', body: { email: who, lang: state.lang } }); status.className = 'hint form-ok'; status.textContent = t('emailCodeSent'); $('#si-code').focus(); }
  catch (e) { status.className = 'hint form-err'; status.textContent = e.status === 404 ? t('recoverOff') : e.message; }
}
function renderChrome(route) {
  updateConfirmBar();
  document.documentElement.lang = state.lang;
  document.body.classList.toggle('signed-in', Boolean(state.user));
  const av = $('.avatar.sm'); if (av) av.textContent = state.user ? initials(state.user) : '';
  $('#search-input').placeholder = t('search');
  $('#lang-btn').textContent = state.lang === 'en' ? 'ES' : 'EN';
  $('#lang-btn').setAttribute('aria-label', state.lang === 'en' ? 'ES: cambiar a español' : 'EN: switch to English');
  $('#signin-open').textContent = t('signIn');
  $('#skip-link').textContent = t('skip');
  const is = (r) => (route === r ? ' active' : '');
  $('#sidebar').innerHTML = `
    <a class="nav-item${is('home')}" href="#home"><span class="ico">⌂</span>${t('home')}</a>
    <a class="nav-item${is('courses')}" href="#courses"><span class="ico">▦</span>${t('allCourses')}</a>
    <div class="nav-label">${t('sideBeginner')}</div>
    ${pathTracks().map((tr) => sideCourse(tr, route)).join('')}
    <div class="nav-label">${t('sideNext')}</div>
    ${liveTracks().filter((tr) => !inPath(tr.id)).map((tr) => sideCourse(tr, route)).join('')}
    ${DATA.tracks.filter((x) => x.status !== 'available').map((x) => `<a class="nav-item${is('course-' + x.id)}" href="#course-${x.id}"><span class="ico">${esc(x.icon)}</span>${esc(L(x.title))}<span class="tag">${t('soon')}</span></a>`).join('')}
    <div class="nav-label">${t('practice')}</div>
    <a class="nav-item${is('practice')}" href="#practice"><span class="ico">◎</span>${t('practiceHub')}</a>
    <a class="nav-item${is('quizzes')}" href="#quizzes"><span class="ico">✓</span>${t('quizzes')}</a>
    <a class="nav-item${is('flashcards')}" href="#flashcards"><span class="ico">▭</span>${t('flashcards')}</a>
    <a class="nav-item${is('challenges')}" href="#challenges"><span class="ico">{ }</span>${t('challenges')}</a>
    <a class="nav-item${is('playground')}" href="#playground"><span class="ico">›_</span>${t('playground')}</a>
    <a class="nav-item${is('plan')}" href="#plan"><span class="ico">▤</span>${t('studyPlan')}</a>
    <a class="nav-item${is('notes')}" href="#notes"><span class="ico">✎</span>${t('notes')}</a>
    <a class="nav-item${is('glossary')}" href="#glossary"><span class="ico">Aa</span>${t('glossary')}</a>
    <div class="nav-label">${t('account')}</div>
    <a class="nav-item${is('profile')}" href="#profile"><span class="ico">◯</span>${t('profile')}</a>
    <a class="nav-item${is('roadmap')}" href="#roadmap"><span class="ico">↗</span>${t('whatsComing')}</a>
    <a class="nav-item" href="contact-support.html"><span class="ico">?</span>${t('support')}</a>
    <div class="side-foot"><a href="privacy-policy.html">${t('privacy')}</a><a href="terms-of-use.html">${t('terms')}</a><a href="contact-support.html">${t('contact')}</a><button class="link-btn" data-action="shortcuts">⌨ ${t('scShort')}</button><button class="link-btn" data-action="backup">⤓ ${t('bkShort')}</button></div>`;
  const tab = (href, ico, label, on) => `<a href="#${href}" class="${on ? 'active' : ''}"><span class="ico">${ico}</span>${label}</a>`;
  $('#bottom-nav').innerHTML = tab('home', '⌂', t('home'), route === 'home')
    + tab('courses', '▦', t('courses'), route === 'courses' || route.startsWith('course-') || route.startsWith('m-'))
    + tab('practice', '✓', t('practice'), ['practice', 'quizzes', 'flashcards', 'challenges'].includes(route)) + tab('profile', '◯', t('account'), route === 'profile');
}

/* ---------- Views ---------- */
function courseCard(tr, big, step) {
  const s = trackStats(tr), live = tr.status === 'available';
  return `<a class="card course${live ? ' live' : ''}" href="#course-${tr.id}">
    ${step ? `<span class="step-tag">${t('stepN', step)}</span>` : ''}
    <div class="course-top"><span class="cicon" data-track="${tr.id}">${esc(tr.icon)}</span><div style="min-width:0"><h3>${esc(L(tr.title))}</h3><div class="muted">${s.units} ${t('units')} · ${s.count} ${t('modules')}${s.hours ? ` · ≈ ${s.hours} ${t('hours')}` : ''}</div></div></div>
    <p>${esc(L(tr.blurb))}</p>
    ${tr.level ? `<div class="levels"><span class="pill lvl-${tr.level}">${t('difficulty')[tr.level]}${tr.id === 'java' ? ' → ' + t('difficulty').advanced : ''}</span></div>` : ''}
    ${live ? `<div class="progress${s.done === s.count ? ' done' : ''}"><span style="width:${pct(s.done, s.count)}%"></span></div>
      <div class="facts"><span class="pill ok">${t('available')}</span><span class="muted">${t('ofModules', s.done, s.count)}</span></div>`
      : `<div class="facts"><span class="pill soon">${t('comingSoon')}</span>${big && state.notified.has(tr.id) ? `<span class="muted">${t('notified')}</span>` : ''}</div>`}
  </a>`;
}
const voteBtn = (id) => `<button class="vote" data-action="vote" data-id="course-${id}" aria-pressed="${state.votes.has('course-' + id)}">${state.votes.has('course-' + id) ? t('voted') : t('vote')}</button>`;
function plannedCard(p, step) {
  return `<div class="card planned-card">${step ? `<span class="step-tag">${t('stepN', step)}</span>` : ''}<div class="course-top"><span class="cicon" data-track="${p.id}">${esc(p.icon)}</span><div style="min-width:0"><h3><a class="stretch" href="#course-${p.id}">${esc(L(p.title))}</a></h3><span class="pill lvl-${p.level}">${t('difficulty')[p.level]}</span></div></div><p>${esc(L(p.blurb))}</p>
    <div class="facts"><span class="pill soon">${t('stepSoon')}</span>${voteBtn(p.id)}</div></div>`;
}
// A course id from the path: a track (live or outlined) or a planned course.
const anyCourse = (id) => track(id) || DATA.planned.find((p) => p.id === id);
const anyCard = (id, step) => (track(id) ? courseCard(track(id), true, step) : plannedCard(anyCourse(id), step));
// The beginner path on the home page, grouped into three stages of compact course tiles.
// Courses not listed in a stage (new ones added to DATA.path) land in the last stage.
const PATH_STAGES = [['code', ['python', 'cli', 'git']], ['build', ['web', 'sql']], ['understand', ['how-computers-work', 'cybersecurity', 'ai', 'discrete']]];
function pathStepper() {
  const ids = DATA.path.map((st) => st.id), placed = new Set(PATH_STAGES.flatMap(([, list]) => list));
  const stages = PATH_STAGES.map(([key, list], i) => [key, list.filter((id) => ids.includes(id)).concat(i === PATH_STAGES.length - 1 ? ids.filter((id) => !placed.has(id)) : [])]);
  const label = { code: 'stageCode', build: 'stageBuild', understand: 'stageUnderstand' };
  const tile = (id) => {
    const tr = track(id), c = anyCourse(id), live = tr && tr.status === 'available', s = live ? trackStats(tr) : null, done = s && s.count && s.done === s.count;
    const why = DATA.path.find((st) => st.id === id)?.why;
    return `<a class="path-tile${live ? '' : ' planned'}${done ? ' done' : ''}" href="#course-${id}" title="${esc(L(why) || '')}">
      <span class="cicon" data-track="${id}">${esc(c.icon)}</span>
      <span class="path-tile-text"><b>${esc(L(c.title))}</b><small>${!live ? t('stepSoon') : done ? '✓ ' + t('stepDone') : s.done ? t('ofModules', s.done, s.count) : `${s.count} ${t('modules')} · ≈ ${s.hours} h`}</small></span>
      ${live && s.done && !done ? `<span class="path-tile-bar"><span style="width:${pct(s.done, s.count)}%"></span></span>` : ''}</a>`;
  };
  return `<div class="path-stages">${stages.map(([key, list], i) => `<section class="path-stage"><div class="path-stage-head"><span class="path-stage-no">${t('stageWord', i + 1)}</span><h3>${t(label[key])}</h3><p>${t(label[key] + 'Text')}</p></div>
    <div class="path-tiles">${list.map(tile).join('')}</div></section>`).join('')}</div>`;
}
function unitCards(tr, live) {
  return `<div class="units">${tr.units.map((u, i) => `<div class="card unit"><div class="unit-top"><h3>${t('unit')} ${i + 1} · ${esc(L(u.title))}</h3><span class="pill">${u.modules.length} ${u.modules.length === 1 ? t('moduleLower') : t('modules')}</span></div><ul>` +
    u.modules.map((id) => (live
      ? `<li><a href="#m-${id}">${dot(id)}${esc(moduleTitle(id))}<span class="mins">${DATA.modules[id].minutes || ''} ${t('min')}</span></a></li>`
      : `<li><div><span class="dot"></span>${esc(moduleTitle(id))}<span class="mins">${t('soon')}</span></div></li>`)).join('') + '</ul></div>').join('')}</div>`;
}
// One unsolved challenge a day, from the course you are in (or the rest of the path); the same all day.
function dailyChallengeCard() {
  const order = [currentTrack(), ...orderedTracks().map((tr) => tr.id)].filter((id, i, a) => a.indexOf(id) === i);
  let pool = [];
  for (const tid of order) { pool = trackIds(tid).filter(isLive).flatMap((m) => Array.from({ length: DATA.modules[m].counts?.challenges || 0 }, (_, i) => [m, i])); if (pool.some(([m, i]) => !solvedIndex(m, i))) break; }
  const open = pool.filter(([m, i]) => !solvedIndex(m, i));
  if (!open.length) return '';
  const [m, i] = open[today() % open.length], title = DATA.full[m]?.challenges?.[i]?.title;
  if (!DATA.full[m]) loadModuleLessons(m).then(() => { if ((location.hash.slice(1) || 'home') === 'home') render(true); }).catch(() => {});
  return `<a class="card plan-home daily-ch" href="#m-${m}" data-goto-tab="challenges" data-goto-ch="${i}"><span class="cicon" style="width:34px;height:34px;font-size:13px">{ }</span><div class="info"><span class="muted">${t('dailyTitle')}</span><b>${title ? esc(L(title)) : esc(moduleTitle(m))}</b><span class="muted">${esc(moduleTitle(m))}</span></div><span class="btn btn-sm">${t('dailyGo')}</span></a>`;
}
// Whether challenge number i of module m is solved (keys use the challenge id, which needs the lessons).
const solvedIndex = (m, i) => { const ch = DATA.full[m]?.challenges?.[i]; return ch ? state.solved.has(chKey(m, ch)) : [...state.solved].filter((k) => k.startsWith(m + '/')).length > i; };
function viewHome() {
  const live = liveIds(), started = DATA.tracks.find((tr) => tr.id === currentTrack() && trackStats(tr).done) || liveTracks().find((tr) => trackStats(tr).done);
  const s = started ? trackStats(started) : null, next = started ? nextModule(started.id) : null;
  const first = DATA.path.find((st) => track(st.id)?.status === 'available')?.id || liveTracks()[0].id;
  const startCard = (n, href) => `<a class="card start-card" href="${href}"><span class="start-no" aria-hidden="true">${['🌱', '🧰', '🎓'][n - 1]}</span><h3>${t('s' + n + 'Title')}</h3><p>${t('s' + n + 'Text')}</p><span class="start-cta">${t('s' + n + 'Cta')} →</span></a>`;
  const how = (n, ico) => `<div class="how"><span class="how-ico">${ico}</span><div><b>${t('how' + n)}</b><p>${t('how' + n + 'Text')}</p></div></div>`;
  return `<section class="wrap">
    <div class="hero"><div class="hero-text"><h1>${t('heroTitle')}</h1><p class="lead">${t('heroLead')}</p>
      <div class="hero-actions">${started && next ? `<a class="btn" href="#m-${next}">${t('continueCourse', esc(L(started.title)))}</a>` : `<a class="btn" href="#course-${first}">${t('startPython')}</a>`}<a class="btn btn-ghost" href="#courses">${t('browse')}</a></div>
      ${started ? '' : `<p class="hero-note">${t('noExperience')}</p>`}
      <div class="hero-facts"><span><b>${liveTracks().length}</b> ${t('coursesReady')}</span><span><b>${live.length}</b> ${t('modules')}</span><span><b>${live.reduce((n, id) => n + (DATA.modules[id].counts?.examples || 0), 0)}</b> ${t('examples').toLowerCase()}</span><span><b>${live.reduce((n, id) => n + (DATA.modules[id].counts?.challenges || 0), 0)}</b> ${t('challenges').toLowerCase()}</span><span><b>EN · ES</b></span></div></div>
      ${heroArt()}</div>
    ${started ? `<a class="card continue" href="${next ? '#m-' + next : '#course-' + started.id}"><div class="info"><div class="muted">${t('continueTitle')}</div>
      <h3 style="margin-top:2px">${next ? esc(L(started.title)) + ' · ' + esc(moduleTitle(next)) : t('courseDone')}</h3>
      <div class="progress"><span style="width:${pct(s.done, s.count)}%"></span></div><div class="muted" style="margin-top:6px">${t('ofModules', s.done, s.count)}</div></div>
      <span class="btn">${t('continueBtn')}</span></a>` : ''}
    ${!state.user && state.authReady && (state.done.size || Object.values(state.notes).some((x) => x && x.trim())) ? `<div class="card save-card"><div class="info"><b>${t('saveTitle')}</b><span>${t('saveText')}</span></div><button class="btn btn-sm" data-action="open-signup">${t('createFree')}</button></div>` : ''}
    ${!started ? '' : (() => { const p = buildPlan(); return p.finish ? `<div class="card plan-home"><span class="cicon" style="width:34px;height:34px;font-size:15px">▤</span><div class="info">${t('planHome', fmtDate(p.finish, { month: 'long', day: 'numeric' }), planTitle())}</div><a class="btn btn-ghost btn-sm" href="#plan">${t('editPlan')}</a></div>` : ''; })()}
    ${started ? dailyChallengeCard() : ''}
    ${dueCount() ? `<div class="card plan-home due-home"><span class="cicon" style="width:34px;height:34px;font-size:15px">⏰</span><div class="info">${t('dueChip', dueCount())}</div><button class="btn btn-sm" data-action="go-flash" data-id="${DUE}">${t('reviewCards')}</button></div>` : ''}
    ${started ? '' : `<div class="section-head"><h2>${t('startFrom')}</h2></div>
    <div class="start-grid">${startCard(1, '#course-python')}${startCard(2, '#course-cli')}${startCard(3, '#course-java')}</div>`}
    <div class="section-head"><h2>${t('pathTitle')}</h2><a class="muted" href="#courses">${t('allCourses')} →</a></div>
    <p class="muted section-lead">${t('pathLead')}</p>
    ${pathStepper()}
    <div class="section-head"><h2>${t('howTitle')}</h2></div>
    <div class="how-grid">${how(1, '¶')}${how(2, '▶')}${how(3, '✓')}${how(4, '◉')}</div>
    <div class="section-head"><h2>${t('nextTitle')}</h2><a class="muted" href="#courses">${t('allCourses')} →</a></div>
    <p class="muted section-lead">${t('nextLead')}</p>
    <div class="courses">${DATA.next.filter((id) => track(id)).map((id) => courseCard(track(id))).join('')}</div>
    ${(() => { const upcoming = DATA.next.filter((id) => !track(id) && anyCourse(id)); return upcoming.length ? `<div class="also-planned"><span class="muted">${t('alsoPlanned')}</span>${upcoming.map((id) => `<a class="chip-link" href="#course-${id}"><span class="cicon" data-track="${id}">${esc(anyCourse(id).icon)}</span>${esc(L(anyCourse(id).title))}</a>`).join('')}</div>` : ''; })()}
    </section>`;
}
function heroArt() {
  return `<div class="hero-art" aria-hidden="true"><div class="win"><div class="win-bar"><i></i><i></i><i></i><span>first.py</span></div>
<pre>name = <span class="s">"Ada"</span>
scores = [<span class="n">72</span>, <span class="n">95</span>, <span class="n">88</span>]
average = <span class="f">sum</span>(scores) / <span class="f">len</span>(scores)
<span class="k">if</span> average >= <span class="n">80</span>:
    <span class="f">print</span>(<span class="s">"Great work,"</span>, name)
<span class="f">print</span>(<span class="s">"Average:"</span>, <span class="f">round</span>(average, <span class="n">1</span>))</pre>
    <div class="win-out"><span>${t('output')}</span>Great work, Ada<br>Average: 85.0</div></div>
    <div class="float-card fc-1"><span class="tick-c">✓</span><div><b>${t('quiz')} · ${state.lang === 'es' ? 'Decisiones' : 'Decisions'}</b><small>5 / 5</small></div></div>
    <div class="float-card fc-2"><span class="play-c">▶</span><div><b>${t('watchTopic')}</b><small>CS50P · Harvard</small></div></div></div>`;
}
function viewCourses() {
  const nextIds = DATA.next.concat(DATA.tracks.map((x) => x.id).filter((id) => !DATA.next.includes(id) && !DATA.path.some((st) => st.id === id)));
  return `<section class="wrap"><h1>${t('coursesTitle')}</h1><p class="lead">${t('coursesLead')}</p>
    <div class="section-head"><h2>${t('pathTitle')}</h2><span class="muted">${t('pathLead')}</span></div>
    <div class="courses">${DATA.path.map((st, i) => anyCard(st.id, i + 1)).join('')}</div>
    <div class="section-head"><h2>${t('nextTitle')}</h2><span class="muted">${t('nextLead')}</span></div>
    <div class="courses">${nextIds.filter(anyCourse).map((id) => anyCard(id)).join('')}</div></section>`;
}
function viewPlanned(p) {
  const mods = p.outline || [], topics = mods.reduce((n, m) => n + m.topics.length, 0), step = DATA.path.findIndex((st) => st.id === p.id);
  const voted = state.votes.has('course-' + p.id);
  return `<section class="wrap">
    <div class="crumbs"><a href="#courses">${t('courses')}</a><span>/</span><span style="color:var(--text)">${esc(L(p.title))}</span></div>
    <div class="course-hero" style="margin-top:12px"><span class="cicon" data-track="${p.id}">${esc(p.icon)}</span>
      <div style="min-width:0;flex:1"><h1 style="margin-top:0">${esc(L(p.title))}</h1><p class="lead">${esc(L(p.blurb))}</p></div></div>
    <div class="course-stats">${step >= 0 ? `<div><b>${step + 1}</b><span>${t('pathStep')}</span></div>` : ''}${mods.length ? `<div><b>${mods.length}</b><span>${t('modules')}</span></div><div><b>${topics}</b><span>${t('topics')}</span></div>` : ''}<div><b>${t('difficulty')[p.level]}</b><span>${t('levelWord')}</span></div></div>
    <div class="notice"><span class="pill soon">${t('stepSoon')}</span><p>${t(mods.length ? 'outlineNotice' : 'soonNoticePlanned')}</p>
      <button class="btn btn-sm${voted ? ' btn-ghost' : ''}" data-action="vote" data-id="course-${p.id}" aria-pressed="${voted}">${voted ? t('voted') : t('wantThis')}</button></div>
    ${mods.length ? `<div class="section-head"><h2>${t('syllabus')}</h2></div>
    <div class="outline">${mods.map((m, i) => `<div class="card outline-mod"><div class="outline-top"><span class="path-no">${i + 1}</span><div><h3>${esc(L(m.title))}</h3><p>${esc(L(m.description))}</p></div></div>
      <ul class="outline-topics">${m.topics.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div>` : ''}
    ${step >= 0 ? `<div class="section-head"><h2>${t('meanwhile')}</h2></div><div class="courses">${DATA.path.slice(0, step).filter((st) => track(st.id)?.status === 'available').map((st) => courseCard(track(st.id))).join('')}</div>` : ''}
  </section>`;
}
function viewCourse(id) {
  const tr = track(id); if (!tr) { const p = DATA.planned.find((x) => x.id === id); return p ? viewPlanned(p) : viewMissing(); }
  const s = trackStats(tr), live = tr.status === 'available', next = live ? nextModule(id) : null;
  if (live) store.set('lastTrack', id);
  return `<section class="wrap">
    <div class="crumbs"><a href="#courses">${t('courses')}</a><span>/</span><span style="color:var(--text)">${esc(L(tr.title))}</span></div>
    <div class="course-hero" style="margin-top:12px"><span class="cicon" data-track="${tr.id}">${esc(tr.icon)}</span>
      <div style="min-width:0;flex:1"><h1 style="margin-top:0">${esc(L(tr.title))}</h1><p class="lead">${esc(L(tr.blurb))}</p></div></div>
    <div class="course-stats"><div><b>${s.units}</b><span>${t('units')}</span></div><div><b>${s.count}</b><span>${t('modules')}</span></div>${s.hours ? `<div><b>≈ ${s.hours}</b><span>${t('hours')}</span></div>` : ''}${live ? `<div><b>${s.done}/${s.count}</b><span>${t('modulesComplete').toLowerCase()}</span></div>` : ''}</div>
    ${live ? `<div class="hero-actions"><a class="btn" href="#m-${next || trackIds(id)[0]}">${s.done ? t('continueBtn') : t('startBtn')}${next ? ': ' + esc(moduleTitle(next)) : ''}</a></div>`
      : `<div class="notice"><span class="pill soon">${t('comingSoon')}</span><p>${t('soonNotice')}</p><button class="btn btn-sm${state.notified.has(id) ? ' btn-ghost' : ''}" data-action="notify" data-id="${id}" ${state.notified.has(id) ? 'disabled' : ''}>${state.notified.has(id) ? t('notified') : t('notifyMe')}</button></div>`}
    ${live ? `<div class="course-links"><a class="chip-link" href="#sheet-${id}">▤ ${t('cheatSheet')}</a><button class="chip-link" data-action="go-quiz" data-id="course:${id}">✓ ${t('courseQuizBtn')}</button><button class="chip-link" data-action="go-flash" data-id="course:${id}">▭ ${t('courseCardsBtn')}</button></div>` : ''}
    ${live ? certCard(id) : ''}
    ${DATA.videos?.courses?.[id] ? `<div class="section-head"><h2>${t('courseSeries')}</h2></div>${vidCard(DATA.videos.courses[id], true)}` : ''}
    ${(() => { const ps = (DATA.projects || []).filter((p) => p.track === id); return ps.length ? `<div class="section-head"><h2>${t('projectsForCourse')}</h2><a class="muted" href="#projects">${t('allProjects')} →</a></div><div class="project-grid">${ps.map(projectCard).join('')}</div>` : ''; })()}
    <div class="section-head"><h2>${t('unitsTitle')}</h2></div>
    ${unitCards(tr, live)}
    ${!live && DATA.videos ? `<div class="section-head"><h2>${t('watchWait')}</h2></div><p class="muted" style="margin:-6px 0 14px">${t('waitLead')}</p><div class="vids grid-vids">${waitGroups(tr).map((g) => `<div class="wait-card card"><div class="wait-mods">${g.mods.map((m) => `<span>${esc(moduleTitle(m))}</span>`).join('')}</div>${vidCard(g.v, true)}</div>`).join('')}</div>` : ''}</section>`;
}
// A recorded terminal session: lines starting with "$ " are what you type, the rest is what Git prints.
function transcriptHtml(text) {
  let inCmd = false; // lines starting with "> " right after a command continue it (loops, here-documents)
  return String(text).split('\n').map((line) => {
    const ps = line.startsWith('$ ') ? '$' : inCmd && line.startsWith('> ') ? '>' : '';
    inCmd = Boolean(ps);
    return ps ? `<span class="t-cmd"><span class="t-ps">${ps}</span> ${esc(line.slice(2))}</span>` : `<span class="t-out">${esc(line)}</span>`;
  }).join('\n');
}
function viewMissing() { return `<section class="wrap"><h1>${t('notFound')}</h1><a class="btn" href="#home">${t('home')}</a></section>`; }

// At the end of a course, point to the next live course on the beginner path (or Java after it).
function nextCourseLink(tid) {
  const order = DATA.path.map((st) => st.id).concat(DATA.next);
  const after = order.slice(order.indexOf(tid) + 1).map(track).find((tr) => tr && tr.status === 'available');
  return after ? `<a class="btn btn-wrap" href="#course-${after.id}">${t('nextCourse', esc(L(after.title)))}</a>` : '';
}
function moduleSkeleton(id, spinner) {
  const meta = DATA.modules[id], tr = track(meta.track), unit = tr?.units.find((u) => u.modules.includes(id));
  if (!tr || !unit) return spinner;
  return `<section class="wrap">
    <div class="crumbs"><a href="#course-${tr.id}">${esc(L(tr.title))}</a><span>/</span><span>${esc(L(unit.title))}</span><span>/</span><span style="color:var(--text)">${esc(moduleTitle(id))}</span></div>
    <h1>${esc(moduleTitle(id))}</h1><p class="lead">${fmt(L(meta.description))}</p>
    <div class="mod-meta"><span class="pill">${t('difficulty')[meta.difficulty] || meta.difficulty}</span>${meta.minutes ? `<span class="pill">≈ ${meta.minutes} ${t('min')}</span>` : ''}<span class="pill">${meta.topics.length} ${t('topics')}</span></div>
    ${spinner}</section>`;
}
function viewModule(id) {
  const meta = DATA.modules[id], c = DATA.full[id];
  if (!meta) return viewMissing();
  if (!c) return viewCourse(meta.track);
  const tr = track(meta.track), unit = tr.units.find((u) => u.modules.includes(id)), ids = trackIds(tr.id), idx = ids.indexOf(id);
  store.set('lastTrack', tr.id);
  const terminal = exampleLangs(c.examples.main).includes('bash');
  const sets = c.examples.sets;
  const tabs = [['overview', t('overview')], ['examples', t('examples'), sets.length + 1], ['terms', t('terms'), (c.definitions || []).length], ['practice', t('practice'), LL(c.practice).length], ['quiz', t('quiz'), (c.quiz || []).length], ...((c.challenges || []).length ? [['challenges', t('challenges'), c.challenges.length]] : []), ['videos', t('videos'), Object.keys(modVideos(id)?.topics || {}).length + (seriesFor(id) ? 1 : 0)]];
  let body;
  if (state.tab === 'overview') {
    body = `<div class="grid-2"><div>
      <div class="block prose"><h2>${t('why')}</h2>${rich(L(c.whyItMatters))}</div>
      <div class="block"><h2>${t('objectives')}</h2><ul class="checklist">${LL(c.objectives).map((o) => `<li class="card"><span class="tick"></span><span>${fmt(o)}</span></li>`).join('')}</ul></div>
      <div class="block prose"><h2>${t('before')}</h2>${(c.prerequisites || []).length ? `<p>${t('prereq')}: ${c.prerequisites.map((p) => (isLive(p) ? `<a style="color:var(--accent);font-weight:600" href="#m-${p}">${esc(moduleTitle(p))}</a>` : `<b>${esc(moduleTitle(p))}</b>`)).join(', ')}</p>` : ''}<ul>${LL(c.skillsNeeded).map((x) => `<li>${fmt(x)}</li>`).join('')}</ul></div>
      <div class="block"><h2>${t('pitfalls')}</h2><ul class="pitfalls">${LL(c.pitfalls).map((x) => `<li>${fmt(x)}</li>`).join('')}</ul></div>
    </div><aside class="card aside"><h3>${t('takeaways')}</h3><ol>${LL(c.keyTakeaways).map((x) => `<li>${fmt(x)}</li>`).join('')}</ol>
      <button class="btn" data-tab="examples" style="width:100%">${t('seeExamples')}</button>
      <div class="sep"></div><h3><label for="mod-note">${t('myNotes')}</label></h3><textarea id="mod-note" class="mod-note" data-id="${id}" placeholder="${t('notePlaceholder')}">${esc(state.notes[id] || '')}</textarea><div class="muted mod-note-status" id="mod-note-status">${(state.notes[id] || '').trim() ? (state.user ? t('savedAccount') : t('savedDevice')) : ''}</div>
      ${seriesFor(id) ? `<div class="sep"></div><h3>${t('fullSeries')}</h3>${vidCard(seriesFor(id), true)}` : ''}
      <div class="sep"></div><h3>${t('resources')}</h3><div class="res">${(c.resources || []).map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(L(r.label))} ↗</a>`).join('')}</div></aside></div>`;
  } else if (state.tab === 'examples') {
    const ex = state.exIndex === 0 ? c.examples.main : sets[state.exIndex - 1];
    const langs = exampleLangs(ex), lang = langs.includes(state.codeLang) ? state.codeLang : langs[0];
    const code = ex.code[lang], out = (ex.output && ex.output[lang]) || '';
    body = `<div class="chips" role="group" aria-label="${t('examples')}">${[terminal ? t('fullSession') : t('fullProgram'), ...sets.map((s) => L(s.title) || s.topic)].map((label, i) => `<button class="chip" data-ex="${i}" aria-pressed="${i === state.exIndex}">${esc(label)}</button>`).join('')}</div>
      <div class="ex-head"><h2>${state.exIndex === 0 ? (terminal ? t('fullSession') : t('fullProgram')) : esc(L(ex.title))}</h2><p>${fmt(L(state.exIndex === 0 ? meta.description : ex.description))}</p></div>
      ${lang === 'bash' ? `<p class="term-hint">${t('terminalHint')}</p>` : ''}
      <div class="code-card"><div class="code-bar">${langs.map((k) => `<button class="lang" data-code-lang="${k}" aria-pressed="${k === lang}">${LANG_LABEL[k]}</button>`).join('')}<button class="lang copy" data-action="copy">${t('copy')}</button>${lang === 'python' ? `<button class="lang" data-action="try-step" data-id="${id}" title="${t('vizHint')}">⇥ ${t('vizStep')}</button>` : ''}${lang === 'bash' ? '' : `<button class="lang run" data-action="try-it" data-id="${id}">${t('tryIt')}</button>`}</div>
        ${lang === 'bash' ? `<code id="code-block" hidden>${esc(code)}</code><pre tabindex="0" class="code term">${transcriptHtml(out)}</pre>`
          : lang === 'html' ? `<pre tabindex="0" class="code"><code id="code-block" class="language-html">${esc(code)}</code></pre>
        <div class="output preview"><div class="output-label">${t('preview')}</div><iframe class="web-preview" sandbox="allow-scripts allow-forms allow-modals" title="${t('preview')}" src="preview.html" data-html="${esc(code)}"></iframe></div>`
          : `<pre tabindex="0" class="code"><code id="code-block" class="language-${lang}">${esc(code)}</code></pre>
        ${(() => { const veil = state.predictMode && !state.revealed.has(`${id}:${state.exIndex}:${lang}`);
          return `<div class="output${veil ? ' veiled' : ''}"><div class="output-label">${t('output')}<label class="predict-toggle"><input type="checkbox" data-action="predict-mode" ${state.predictMode ? 'checked' : ''}> ${t('predictMode')}</label></div>${veil ? `<div class="veil"><p>${t('predictFirst')}</p><button class="btn btn-sm" data-action="reveal-output" data-key="${id}:${state.exIndex}:${lang}">${t('showOutput')}</button></div>` : `<pre tabindex="0">${esc(out)}</pre>`}</div>`; })()}`}</div>
      ${state.exIndex > 0 ? `<div class="card explain prose"><h2 class="h3">${t('explanation')}</h2>${rich(L(ex.explanation))}</div>` : ''}
      ${(() => { const v = state.exIndex === 0 ? null : modVideos(id)?.topics[ex.topic]; const list = v ? null : seriesFor(id);
        return v || list ? `<div class="watch"><div class="watch-label">${v ? t('watchTopic') : t('fullSeries')}</div>${v ? vidCard(v) : vidCard(list, true)}</div>` : ''; })()}`;
  } else if (state.tab === 'terms') {
    body = `<div class="terms">${(c.definitions || []).map((d) => `<div class="card term"><h2 class="h3">${esc(L(d.term))}</h2><p>${fmt(L(d.definition))}</p></div>`).join('')}</div>`;
  } else if (state.tab === 'practice') {
    body = `<div class="block"><h2>${t('practiceProblems')}</h2><ol class="numbered">${LL(c.practice).map((x) => `<li class="card"><span>${fmt(x)}</span></li>`).join('')}</ol></div>
      <div class="block"><h2>${t('selfCheck')}</h2>${LL(c.selfCheck).map((q) => `<details class="card check"><summary>${fmt(q)}</summary><p>${t('selfCheckHint')}</p></details>`).join('')}</div>`;
  } else if (state.tab === 'challenges' && (c.challenges || []).length) {
    state.chModule = id;
    const solvedN = c.challenges.filter((ch) => state.solved.has(chKey(id, ch))).length;
    body = `<p class="prose ch-lead">${t('challengesLead')} <b>${t('solvedOf', solvedN, c.challenges.length)}</b></p>${c.challenges.map((ch, i) => challengeHtml(id, ch, i)).join('')}`;
  } else if (state.tab === 'videos') {
    const mv = modVideos(id) || { series: null, topics: {} };
    body = `<p class="prose" style="color:var(--text-2);margin:0 0 16px">${t('videosLead')}</p>
      ${seriesFor(id) ? `<div class="vid-topic">${t('fullSeries')}</div>${vidCard(seriesFor(id), true)}` : ''}
      ${meta.topics.map((tp) => mv.topics[tp] ? `<div class="vid-topic">${esc(tp)}</div>${vidCard(mv.topics[tp])}` : '').join('')}`;
  } else {
    body = `<div style="max-width:720px">${quizHtml(id)}</div>`;
  }
  const done = state.done.has(id);
  return `<section class="wrap">
    <div class="crumbs"><a href="#course-${tr.id}">${esc(L(tr.title))}</a><span>/</span><span>${esc(L(unit.title))}</span><span>/</span><span style="color:var(--text)">${esc(moduleTitle(id))}</span></div>
    <h1>${esc(moduleTitle(id))}</h1><p class="lead">${fmt(L(meta.description))}</p>
    <div class="mod-meta"><span class="pill">${t('difficulty')[meta.difficulty] || meta.difficulty}</span>${meta.minutes ? `<span class="pill">≈ ${meta.minutes} ${t('min')}</span>` : ''}<span class="pill">${meta.topics.length} ${t('topics')}</span><span class="pill ok">${terminal ? t('terminalExamples') : exampleLangs(c.examples.main).includes('html') ? t('webExamples') : exampleLangs(c.examples.main).includes('sql') ? t('sqlExamples') : exampleLangs(c.examples.main).length === 1 ? t('pythonExamples') : exampleLangs(c.examples.main).length === 2 ? t('examples2') : t('examples4')}</span>${done ? `<span class="pill accent">${t('marked')}</span>` : ''}</div>
    <div class="tabs" role="tablist">${tabs.map(([k, label, n]) => `<button class="tab" role="tab" data-tab="${k}" aria-selected="${state.tab === k}">${label}${n ? `<span class="count">${n}</span>` : ''}</button>`).join('')}</div>
    ${body}
    <div class="mod-foot"><button class="btn${done ? ' btn-ghost' : ''}" data-action="toggle-done" data-id="${id}">${done ? t('marked') : t('markDone')}</button>
      <a class="report" href="contact-support.html?module=${id}">${t('report')}</a>
      <div class="pn">${idx > 0 ? `<a class="btn btn-ghost" href="#m-${ids[idx - 1]}">${t('prev')}</a>` : ''}${idx < ids.length - 1 ? `<a class="btn btn-ghost" href="#m-${ids[idx + 1]}">${t('next')}</a>` : nextCourseLink(tr.id)}</div></div>
  </section>`;
}

// "Mixed review" draws from every module you have completed (or, before that, your current course).
const MIX = 'mix';
const mixIds = () => { const done = orderedTracks().flatMap((tr) => trackIds(tr.id)).filter((id) => state.done.has(id)); return done.length ? done : trackIds(currentTrack()); };
// Spaced repetition (Leitner boxes): "Got it" moves a card up a box and schedules it further out; "Again" sends it back to box 1.
const DUE = 'due', BOX_DAYS = [0, 1, 3, 7, 16, 35];
const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
const dueKeys = () => Object.keys(state.cardBox).filter((k) => state.cardBox[k].due <= today() && isLive(k.split(':')[0]));
const dueCount = () => dueKeys().length;
const nextDue = () => { const ds = Object.entries(state.cardBox).filter(([k, v]) => v.due > today() && isLive(k.split(':')[0])).map(([, v]) => v.due); return ds.length ? Math.min(...ds) - today() : null; };
// "course:<id>" reviews a whole course: 15 random questions from all its modules, or every one of its terms.
const coursePick = (id) => (typeof id === 'string' && id.startsWith('course:') ? id.slice(7) : null);
const isMixLike = (id) => id === MIX || id === DUE || !!coursePick(id);
const validPick = (id) => id === MIX || id === DUE || (coursePick(id) ? track(coursePick(id))?.status === 'available' : isLive(id));
const pickTitle = (id) => (id === MIX ? t('mixedReview') : id === DUE ? t('dueOption', dueCount()) : coursePick(id) ? t('wholeCourse', L(track(coursePick(id)).title)) : moduleTitle(id));
const courseOptions = (selected) => `<optgroup label="${t('wholeCourses')}">${orderedTracks().map((tr) => `<option value="course:${tr.id}" ${selected === 'course:' + tr.id ? 'selected' : ''}>★ ${esc(t('wholeCourse', L(tr.title)))}</option>`).join('')}</optgroup>`;
function quizItems(id) {
  const ct = coursePick(id);
  if (ct) { if (!state.courseQuiz || state.courseQuiz.id !== id) state.courseQuiz = { id, items: shuffled(trackIds(ct).flatMap((m) => (DATA.full[m]?.quiz || []).map((q) => ({ ...q, mod: m })))).slice(0, 15) }; return state.courseQuiz.items; }
  if (id !== MIX) return (DATA.full[id].quiz || []).map((q) => ({ ...q, mod: id }));
  if (!state.mixQuiz) state.mixQuiz = shuffled(mixIds().flatMap((m) => (DATA.full[m].quiz || []).map((q) => ({ ...q, mod: m })))).slice(0, 10);
  return state.mixQuiz;
}
function deckCards(id) {
  const of = (m) => (DATA.full[m].definitions || []).map((card, i) => ({ mod: m, i, card }));
  if (coursePick(id)) { if (!state.courseDeck || state.courseDeck.id !== id) state.courseDeck = { id, cards: trackIds(coursePick(id)).flatMap(of) }; return state.courseDeck.cards; }
  if (id === DUE) { if (!state.dueDeck) state.dueDeck = shuffled(dueKeys().map((k) => { const [m, i] = k.split(':'); return { mod: m, i: +i, card: DATA.full[m]?.definitions?.[i] }; }).filter((c) => c.card)); return state.dueDeck; }
  if (id !== MIX) return of(id);
  if (!state.mixDeck) state.mixDeck = mixIds().flatMap(of);
  return state.mixDeck;
}
const mixOption = (selected) => `<option value="${MIX}" ${selected === MIX ? 'selected' : ''}>${t('mixedReviewOption', mixIds().length)}</option>`;
const dueOption = (selected) => (dueCount() || selected === DUE ? `<option value="${DUE}" ${selected === DUE ? 'selected' : ''}>${t('dueOption', dueCount())}</option>` : '');
const QUIZ_SECONDS = 30;
// Timed mode: each question gets QUIZ_SECONDS; running out counts as a wrong answer and shows the explanation.
let quizTimer = null;
function armQuizTimer() {
  clearInterval(quizTimer); quizTimer = null;
  const q = state.quiz, box = $('#q-timer');
  if (!box || !q || q.picked != null || q.finished) return;
  if (q.deadlineFor !== q.i) { q.deadline = Date.now() + QUIZ_SECONDS * 1000; q.deadlineFor = q.i; }
  const tick = () => {
    if (!box.isConnected) { clearInterval(quizTimer); return; }
    const left = q.deadline - Date.now();
    if (left <= 0) { clearInterval(quizTimer); q.picked = -1; render(true); return; }
    box.style.setProperty('--left', (left / (QUIZ_SECONDS * 1000)).toFixed(3));
    box.classList.toggle('low', left < 8000);
    box.querySelector('b').textContent = Math.ceil(left / 1000);
  };
  tick(); quizTimer = setInterval(tick, 250);
}
// The questions of the current round: the whole quiz, or only the ones missed last time (q.only).
const roundItems = (q) => { const all = quizItems(q.id); return q.only ? q.only.map((n) => all[n]) : all; };
function quizHtml(id, timed) {
  if (!state.quiz || state.quiz.id !== id) { if (id === MIX) state.mixQuiz = null; if (coursePick(id)) state.courseQuiz = null; state.quiz = { id, i: 0, picked: null, score: 0, finished: false, missed: [] }; }
  const q = state.quiz, qs = roundItems(q);
  if (q.finished) {
    const missed = q.missed || [];
    return `<div class="card quiz"><div class="quiz-top"><span>${t('quiz')} · ${esc(pickTitle(id))}${q.only ? ' · ' + t('missedRound') : ''}</span></div><div class="score"><b>${q.score}/${qs.length}</b><span class="muted">${t('scoreText', q.score, qs.length)}</span></div>
      <div class="quiz-actions" style="justify-content:center;flex-wrap:wrap">${missed.length ? `<button class="btn" data-action="quiz-missed">${t('retryMissed', missed.length)}</button>` : ''}<button class="btn${missed.length ? ' btn-ghost' : ''}" data-action="quiz-retry">${t(q.only ? 'retryAll' : 'retry')}</button></div></div>`;
  }
  const item = qs[q.i], opts = LL(item.options);
  return `<div class="card quiz"><div class="quiz-top"><span>${t('quiz')} · ${esc(pickTitle(id))}${q.only ? ' · ' + t('missedRound') : ''}</span><span>${t('question', q.i + 1, qs.length)}</span></div>
    <div class="progress"><span style="width:${pct(q.i, qs.length)}%"></span></div>
    ${timed && q.picked == null ? `<div class="q-timer" id="q-timer" role="timer" aria-label="${t('secondsLeft')}"><span class="q-timer-bar"></span><b>${QUIZ_SECONDS}</b></div>` : ''}
    ${id === MIX || coursePick(id) ? `<div class="q-from">${esc(L(track(DATA.modules[item.mod].track).title))} · ${esc(moduleTitle(item.mod))}</div>` : ''}
    <h2>${fmt(L(item.question))}</h2>
    <div class="options">${opts.map((o, i) => {
      const cls = q.picked == null ? '' : i === item.correct ? ' right' : i === q.picked ? ' wrong' : '';
      return `<button class="option${cls}" data-action="quiz-pick" data-i="${i}" ${q.picked != null ? 'disabled' : ''}><span class="key">${'ABCDEF'[i]}</span><span>${fmt(o)}</span></button>`;
    }).join('')}</div>
    ${q.picked != null ? `<div class="feedback"><b style="color:${q.picked === item.correct ? 'var(--success)' : 'var(--danger)'}">${q.picked === item.correct ? t('correct') : q.picked === -1 ? t('timeUp') : t('notQuite')}</b> ${fmt(L(item.explanation))}</div>
      <div class="quiz-actions"><span class="muted kbd-hint">${t('quizKeys')}</span><button class="btn" data-action="quiz-next">${q.i < qs.length - 1 ? t('nextQ') : t('finish')}</button></div>` : ''}</div>`;
}
const cardKey = (id, i) => `${id}:${i}`;
const shuffled = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
// "I know it" marks the card as known (synced with the account); "Still learning" un-marks it. Both move on.
function flashStep(knowIt) {
  const f = state.flash; if (!f) return;
  const entry = deckCards(f.id)[f.order[f.pos]], key = cardKey(entry.mod, entry.i);
  if (knowIt) state.cardsKnown.add(key); else state.cardsKnown.delete(key);
  const b = knowIt ? Math.min((state.cardBox[key]?.b || 0) + 1, BOX_DAYS.length - 1) : 1;
  state.cardBox[key] = { b, due: today() + (knowIt ? BOX_DAYS[b] : 0), at: Date.now() };
  if (f.id === DUE) { f.reviewed = (f.reviewed || 0) + 1; if (f.reviewed >= f.order.length) { f.finished = true; save(); render(true); return; } }
  f.pos = (f.pos + 1) % f.order.length; f.flipped = false;
  save(); render(true);
}
function deckStats(id) {
  const cards = deckCards(id);
  return { n: cards.length, known: cards.filter((c) => state.cardsKnown.has(cardKey(c.mod, c.i))).length };
}
function flashHtml(id) {
  if (!state.flash || state.flash.id !== id) { if (id === MIX) state.mixDeck = null; if (coursePick(id)) state.courseDeck = null; if (id === DUE) state.dueDeck = null; const n = deckCards(id).length; state.flash = { id, order: id === MIX ? shuffled([...Array(n).keys()]) : [...Array(n).keys()], pos: 0, flipped: false, shuffled: id === MIX }; }
  if (id === DUE && (!deckCards(id).length || state.flash.finished)) { const nd = nextDue();
    return `<div class="card due-empty"><span class="due-ico">${state.flash.finished ? '🎉' : '⏰'}</span><p>${t(state.flash.finished ? 'dueDone' : 'dueEmpty')}</p>${nd ? `<p class="muted">${t('dueNext', t('inDays', nd))}</p>` : ''}
      <button class="btn btn-sm" data-action="go-flash" data-id="${MIX}">${t('mixedReview')}</button></div>`; }
  const cards = deckCards(id), f = state.flash, entry = cards[f.order[f.pos]], card = entry.card, d = deckStats(id), known = state.cardsKnown.has(cardKey(entry.mod, entry.i));
  return `<div class="deck-top"><span class="muted">${t('cardOf', f.pos + 1, cards.length)}</span><span class="deck-known">${id === DUE ? t('reviewedOf', f.reviewed || 0, d.n) : t('knownOf', d.known, d.n)}</span></div>
    <div class="progress deck-progress${id !== DUE && d.known === d.n ? ' done' : ''}"><span style="width:${id === DUE ? pct(f.reviewed || 0, d.n) : pct(d.known, d.n)}%"></span></div>
    <div class="flash${f.flipped ? ' flipped' : ''}" id="flash" role="button" tabindex="0" aria-label="${t('tapFlip')}" data-action="flip">
      <div class="flash-inner"><div class="flash-face">${known ? `<span class="flash-badge">✓ ${t('knownBadge')}</span>` : ''}<div><div class="muted flash-course">${esc(L(track(DATA.modules[entry.mod].track).title))}${isMixLike(id) ? ' · ' + esc(moduleTitle(entry.mod)) : ''}</div><h2 class="h3">${esc(L(card.term))}</h2><p class="muted" style="margin-top:10px">${t('tapFlip')}</p></div></div>
      <div class="flash-face back"><p>${fmt(L(card.definition))}</p></div></div></div>
    <div class="flash-controls"><button class="btn btn-ghost" data-action="flash-again">← ${t('again')}</button><button class="btn" data-action="flash-next">${t('gotIt')} →</button></div>
    ${id !== DUE && d.known === d.n && d.n ? `<div class="deck-done">🎉 ${t(id === MIX ? 'mixDeckDone' : 'deckDone')} <button class="btn btn-sm" data-action="go-quiz" data-id="${id}">${t('takeQuiz')}</button></div>` : ''}
    <div class="deck-tools"><button class="lang" data-action="flash-shuffle" aria-pressed="${f.shuffled}">⇄ ${t('shuffle')}</button><button class="lang" data-action="flash-reset">${t('resetDeck')}</button><span class="muted kbd-hint">${t('flashKeys')}</span></div>`;
}
const practiceDefault = () => nextModule() || liveIds()[0];
function viewPractice() {
  const ids = liveIds(), qa = quizAverage();
  const totalCards = ids.reduce((n, id) => n + (DATA.modules[id].counts?.terms || 0), 0);
  const knownCards = [...state.cardsKnown].filter((k) => isLive(k.split(':')[0])).length;
  const quizzed = Object.keys(state.quizBest).filter(isLive).length;
  const suggestion = ids.find((id) => state.done.has(id) && !(id in state.quizBest)) || nextModule() || ids[0];
  return `<section class="wrap"><h1>${t('practice')}</h1><p class="lead">${t('practiceLead')}</p>
    <div class="practice-hub">
      <a class="card hub-card" href="#quizzes"><span class="hub-ico">✓</span><div class="hub-body"><h2>${t('quizzes')}</h2><p>${t('hubQuizText')}</p>
        <div class="hub-stats"><span><b>${ids.length}</b> ${t('quizzes').toLowerCase()}</span><span><b>${quizzed}</b> ${t('taken')}</span><span><b>${qa ? qa.avg + '%' : '—'}</b> ${t('average')}</span></div><div class="progress"><span style="width:${pct(quizzed, ids.length)}%"></span></div></div><span class="hub-go">→</span></a>
      <a class="card hub-card" href="#flashcards"><span class="hub-ico">▭</span><div class="hub-body"><h2>${t('flashcards')}</h2><p>${t('hubFlashText')}</p>
        <div class="hub-stats"><span><b>${totalCards}</b> ${t('cards')}</span><span><b>${knownCards}</b> ${t('known')}</span>${dueCount() ? `<span class="due-stat"><b>${dueCount()}</b> ${t('dueWord')}</span>` : ''}</div>
        <div class="progress"><span style="width:${pct(knownCards, totalCards)}%"></span></div></div><span class="hub-go">→</span></a>
      <a class="card hub-card" href="#challenges"><span class="hub-ico">{ }</span><div class="hub-body"><h2>${t('challenges')}</h2><p>${t('hubChallengeText')}</p>
        ${(() => { const total = liveIds().reduce((n, id) => n + (DATA.modules[id].counts?.challenges || 0), 0), solved = [...state.solved].filter((k) => isLive(k.split('/')[0])).length;
          return `<div class="hub-stats"><span><b>${total}</b> ${t('challenges').toLowerCase()}</span><span><b>${solved}</b> ${t('solvedWord')}</span></div><div class="progress"><span style="width:${pct(solved, total)}%"></span></div>`; })()}</div><span class="hub-go">→</span></a>
      ${(DATA.projects || []).length ? (() => { const ps = DATA.projects, steps = ps.reduce((n, p) => n + p.steps, 0), solved = ps.reduce((n, p) => n + projectSolved(p), 0), done = ps.filter((p) => projectSolved(p) === p.steps).length;
        return `<a class="card hub-card" href="#projects"><span class="hub-ico">🛠</span><div class="hub-body"><h2>${t('projects')}</h2><p>${t('hubProjectText')}</p><div class="hub-stats"><span><b>${ps.length}</b> ${t(ps.length === 1 ? 'projectOne' : 'projects').toLowerCase()}</span><span><b>${done}</b> ${t('projectCompleteLabel').toLowerCase()}</span></div><div class="progress"><span style="width:${pct(solved, steps)}%"></span></div></div><span class="hub-go">→</span></a>`; })() : ''}
    </div>
    <div class="card suggest"><div class="suggest-txt"><span class="muted">${t('suggested')}</span><b>${esc(moduleTitle(suggestion))}</b><span class="muted">${esc(L(track(DATA.modules[suggestion].track).title))}</span></div>
      <div class="suggest-actions"><button class="btn btn-sm" data-action="go-quiz" data-id="${suggestion}">${t('takeQuiz')}</button><button class="btn btn-sm btn-ghost" data-action="go-flash" data-id="${suggestion}">${t('reviewCards')}</button></div></div></section>`;
}
// ---- Guided projects: multi-step builds where every step is a challenge (same editors and graders) ----
// The index (DATA.projects) comes with atlas-data.json; the steps load from data/projects.json the first time.
let projectsLoad = null;
const projectKey = (id) => 'project:' + id;
const projectSolved = (p) => (DATA.full[projectKey(p.id)]?.challenges || []).filter((ch) => state.solved.has(chKey(projectKey(p.id), ch))).length
  || [...state.solved].filter((k) => k.startsWith(projectKey(p.id) + '/')).length;
function waitForProjects() {
  if (DATA.projectsFull) return null;
  const route = location.hash;
  projectsLoad = projectsLoad || fetch('data/projects.json?v=' + DATA.projectsVersion).then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
    .then((d) => { DATA.projectsFull = d.projects; d.projects.forEach((p) => { DATA.full[projectKey(p.id)] = { challenges: p.steps }; }); });
  projectsLoad.then(() => { if (location.hash === route) render(true); }).catch(() => { projectsLoad = null; if (location.hash === route) $('#main').innerHTML = `<div class="loading">${t('lessonsFailed')} <button class="btn btn-sm" data-action="reload">${t('retry')}</button></div>`; });
  return `<div class="loading" aria-busy="true"><span class="spinner"></span>${t('loadingLessons')}</div>`;
}
function projectCard(p) {
  const done = projectSolved(p), tr = track(p.track);
  return `<a class="card project-card${done === p.steps ? ' complete' : ''}" href="#project-${p.id}">
    <span class="project-ico" aria-hidden="true">${esc(p.icon || '◆')}</span>
    <div class="project-body"><div class="project-top"><h3>${esc(L(p.title))}</h3>${done === p.steps ? `<span class="pill ok">✓ ${t('projectCompleteLabel')}</span>` : ''}</div>
      <p>${esc(L(p.blurb))}</p>
      <div class="project-meta"><span>${tr ? esc(L(tr.title)) : ''}</span><span>${LANG_LABEL[p.lang === 'js' ? 'javascript' : p.lang] || p.lang}</span><span>${t('projectSteps', p.steps)}</span>${p.minutes ? `<span>${t('projectMinutes', p.minutes)}</span>` : ''}</div>
      <div class="progress"><span style="width:${pct(done, p.steps)}%"></span></div></div></a>`;
}
function viewProjects() {
  const list = DATA.projects || [];
  const groups = orderedTracks().map((tr) => ({ tr, items: list.filter((p) => p.track === tr.id) })).filter((g) => g.items.length);
  return `<section class="wrap"><div class="crumbs"><a href="#practice">${t('practice')}</a><span>/</span><span style="color:var(--text)">${t('projects')}</span></div>
    <h1>${t('projects')}</h1><p class="lead">${t('projectsLead')}</p>
    ${groups.map((g) => `<div class="section-head"><h2>${esc(L(g.tr.title))}</h2></div><div class="project-grid">${g.items.map(projectCard).join('')}</div>`).join('')}</section>`;
}
function viewProject(id) {
  const p = (DATA.projects || []).find((x) => x.id === id), full = (DATA.projectsFull || []).find((x) => x.id === id);
  if (!p || !full) return viewMissing();
  const key = projectKey(id), done = projectSolved(p), tr = track(p.track);
  state.chModule = key;
  return `<section class="wrap project-page"><div class="crumbs"><a href="#projects">${t('projects')}</a><span>/</span><span style="color:var(--text)">${esc(L(p.title))}</span></div>
    <div class="project-hero"><span class="project-ico big" aria-hidden="true">${esc(p.icon || '◆')}</span><div><h1>${esc(L(p.title))}</h1><p class="lead">${esc(L(p.blurb))}</p>
      <div class="project-meta">${tr ? `<a href="#course-${tr.id}">${esc(L(tr.title))}</a>` : ''}<span>${t('projectSteps', p.steps)}</span>${p.minutes ? `<span>${t('projectMinutes', p.minutes)}</span>` : ''}</div></div></div>
    <div class="project-progress"><div class="progress"><span style="width:${pct(done, p.steps)}%"></span></div><span class="muted ch-lead"><b>${t('stepOf', done, p.steps)}</b></span></div>
    <ol class="project-steps-nav">${full.steps.map((st, i) => `<li class="${state.solved.has(chKey(key, st)) ? 'done' : ''}"><a href="#ch-${i}" data-action="jump-step" data-i="${i}">${i + 1}. ${esc(L(st.title))}</a></li>`).join('')}</ol>
    ${full.steps.map((st, i) => challengeHtml(key, st, i)).join('')}</section>`;
}

const solvedIn = (id) => [...state.solved].filter((k) => k.startsWith(id + '/')).length;
function viewChallenges() {
  const mods = orderedTracks().map((tr) => ({ tr, ids: trackIds(tr.id).filter((id) => DATA.modules[id].counts?.challenges) })).filter((g) => g.ids.length);
  const total = mods.reduce((n, g) => n + g.ids.reduce((m, id) => m + DATA.modules[id].counts.challenges, 0), 0);
  const solved = mods.reduce((n, g) => n + g.ids.reduce((m, id) => m + solvedIn(id), 0), 0);
  return `<section class="wrap"><div class="crumbs"><a href="#practice">${t('practice')}</a><span>/</span><span style="color:var(--text)">${t('challenges')}</span></div>
    <h1>${t('challenges')}</h1><p class="lead">${t('challengesPageLead')}</p>
    <div class="ch-total"><b>${solved}</b> / ${total} ${t('solvedWord')}<div class="progress"><span style="width:${pct(solved, total)}%"></span></div></div>
    ${(() => { const next = [currentTrack(), ...mods.map((g) => g.tr.id)].flatMap((tid) => trackIds(tid).filter((id) => DATA.modules[id].counts?.challenges)).find((id) => solvedIn(id) < DATA.modules[id].counts.challenges);
      return next ? `<a class="btn ch-next" href="#m-${next}" data-goto-tab="challenges">${t('nextUnsolved')}: ${esc(moduleTitle(next))} →</a>` : solved ? `<p class="ch-status ok">🎉 ${t('allSolvedCh')}</p>` : ''; })()}
    <div class="ch-courses">${mods.map(({ tr, ids }) => `<div class="card ch-course"><div class="board-title"><span class="cmark" data-track="${tr.id}">${esc(tr.icon)}</span>${esc(L(tr.title))}</div>
      ${ids.map((id) => { const n = DATA.modules[id].counts.challenges, d = solvedIn(id); return `<a class="ch-row" href="#m-${id}" data-goto-tab="challenges"><span>${esc(moduleTitle(id))}</span><span class="pill${d === n ? ' ok' : ''}">${d}/${n}</span></a>`; }).join('')}</div>`).join('')}</div></section>`;
}
function viewQuizzes() {
  if (!state.quizModule || !validPick(state.quizModule)) state.quizModule = practiceDefault();
  const id = state.quizModule;
  const board = orderedTracks().map((tr) => `<div class="board-course"><div class="board-title"><span class="cmark" data-track="${tr.id}">${esc(tr.icon)}</span>${esc(L(tr.title))}</div>
    ${trackIds(tr.id).map((m) => { const best = state.quizBest[m]; return `<button class="board-row${m === id ? ' active' : ''}" data-action="quiz-choose" data-id="${m}"><span>${esc(moduleTitle(m))}</span><span class="pill${best == null ? '' : best === 1 ? ' ok' : ' soon'}">${best == null ? t('notTaken') : Math.round(best * 100) + '%'}</span></button>`; }).join('')}</div>`).join('');
  return `<section class="wrap"><div class="crumbs"><a href="#practice">${t('practice')}</a><span>/</span><span style="color:var(--text)">${t('quizzes')}</span></div>
    <h1>${t('quizzes')}</h1><p class="lead">${t('quizzesLead')}</p>
    <div class="toolbar"><label class="muted" for="quiz-module">${t('pickModule')}</label><select class="select" id="quiz-module">${mixOption(id)}${courseOptions(id)}${moduleOptions(id)}</select><button class="lang timed-toggle" data-action="quiz-timed" aria-pressed="${!!state.quizTimed}" title="${t('timedHint')}">⏱ ${t('timedMode')}</button></div>
    <div class="quiz-layout"><div>${quizHtml(id, state.quizTimed)}</div><aside class="card scoreboard"><h2 class="h3">${t('yourScores')}</h2>${board}</aside></div></section>`;
}
function viewFlashcards() {
  if (!state.flashModule || !validPick(state.flashModule)) state.flashModule = dueCount() ? DUE : practiceDefault();
  const id = state.flashModule;
  return `<section class="wrap"><div class="crumbs"><a href="#practice">${t('practice')}</a><span>/</span><span style="color:var(--text)">${t('flashcards')}</span></div>
    <h1>${t('flashcards')}</h1><p class="lead">${t('flashLead')}</p>
    <div class="toolbar"><label class="muted" for="flash-module">${t('pickModule')}</label><select class="select" id="flash-module">${dueOption(id)}${mixOption(id)}${courseOptions(id)}${moduleOptions(id)}</select></div>
    <div class="deck">${flashHtml(id)}</div></section>`;
}
const initials = (u) => (String(u?.name || u?.username || u?.email || '?').trim().split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('') || '?').toUpperCase();
const dayKey = (ms) => { const d = new Date(ms); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
function activeDays() { return new Set(state.activity.map((a) => dayKey(a.at))); }
function streakDays() {
  const days = activeDays(); let n = 0; const d = new Date();
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1); // a streak survives until the end of today
  while (days.has(dayKey(d))) { n += 1; d.setDate(d.getDate() - 1); }
  return n;
}
function quizAverage() { const v = Object.values(state.quizBest); return v.length ? { avg: Math.round(100 * v.reduce((s, x) => s + x, 0) / v.length), n: v.length } : null; }
function relDay(ms) { const days = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(ms).setHours(0, 0, 0, 0)) / 864e5); return days <= 0 ? t('today') : days === 1 ? t('yesterday') : t('daysAgo', days); }
// Where "keep going" should lead: the next unfinished module of the course you were last in
// (or any started course), else the Courses page.
function continueHref() {
  const order = [currentTrack(), ...liveTracks().map((tr) => tr.id)];
  for (const id of order) { const next = nextModule(id); if (next && trackStats(track(id)).done) return '#m-' + next; }
  const first = DATA.path.find((st) => track(st.id)?.status === 'available');
  return first ? '#course-' + first.id : '#courses';
}
function viewProfile() {
  const u = state.user, liveAll = liveIds(), s = { count: liveAll.length, done: liveAll.filter((m) => state.done.has(m)).length }, qa = quizAverage(), streak = streakDays(), days = activeDays();
  const seg = (opts, cur, action) => `<div class="seg">${opts.map(([v, label]) => `<button aria-pressed="${v === cur}" data-action="${action}" data-v="${v}">${label}</button>`).join('')}</div>`;
  const theme = document.documentElement.dataset.theme || 'system';
  const provider = { google: 'Google', github: 'GitHub', password: t('emailPw') }[u.authProvider] || u.authProvider || t('emailPw');
  const week = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return days.has(dayKey(d)); });
  const notesCount = Object.values(state.notes).filter((x) => x && x.trim()).length;
  const ach = achievements(), recent = state.activity.slice(-6).reverse();
  const actLine = (a) => a.kind === 'done' ? `<span class="kind">✓</span><span>${t('completed')} <b style="color:var(--text)">${esc(moduleTitle(a.id))}</b></span>`
    : a.kind === 'quiz' ? `<span class="kind">%</span><span>${t('quiz')}: ${esc(moduleTitle(a.id))} · ${a.score}/${a.n}</span>`
    : a.kind === 'project' ? `<span class="kind">🏁</span><span>${t('projectDoneIn', esc(moduleTitle(a.id)))}</span>`
    : a.kind === 'challenge' ? `<span class="kind">✓</span><span>${t('challengeSolvedIn', esc(moduleTitle(a.id)))}</span>`
    : `<span class="kind">✎</span><span>${t('notes')}: ${esc(moduleTitle(a.id))}</span>`;
  return `<section class="wrap">
    <div class="card profile-head">${u.avatarUrl ? `<img class="avatar" src="${esc(u.avatarUrl)}" alt="" referrerpolicy="no-referrer">` : `<div class="avatar" aria-hidden="true">${esc(initials(u))}</div>`}
      <div class="profile-id"><h1>${esc(u.name || u.username || u.email)}</h1><div class="muted">${[u.username ? '@' + u.username : '', u.email].filter(Boolean).map(esc).join(' · ')}</div>
        <div class="badges"><span class="pill${u.authProvider === 'google' ? ' google' : ''}">${t('signedInWith', provider)}</span><span class="pill sync" id="sync-pill">${syncLabel()}</span></div></div>
      <div class="profile-actions"><button class="btn btn-ghost" data-action="sign-out">${t('signOut')}</button></div></div>
    <div class="stats">
      <a class="card stat stat-link" href="${continueHref()}" aria-label="${t('modulesComplete')}: ${t('continueBtn')}"><div class="label">${t('modulesComplete')}<span class="stat-go">→</span></div><div class="value">${s.done} / ${s.count}</div><div class="progress"><span style="width:${pct(s.done, s.count)}%"></span></div></a>
      <a class="card stat stat-link" href="#plan"><div class="label">${t('streak')}<span class="stat-go">→</span></div><div class="value">${streak} ${streak === 1 ? t('day') : t('days')}</div><div class="week">${week.map((on) => `<span${on ? ' class="on"' : ''}></span>`).join('')}</div></a>
      <a class="card stat stat-link" href="#quizzes"><div class="label">${t('quizAvg')}<span class="stat-go">→</span></div><div class="value">${qa ? qa.avg + '%' : '—'}</div><div class="muted">${qa ? t('acrossN', qa.n) : t('noQuizYet')}</div></a>
      <a class="card stat stat-link" href="#notes"><div class="label">${t('notes')}<span class="stat-go">→</span></div><div class="value">${notesCount}</div><div class="muted">${t('modulesWithNotes')}</div></a></div>
    <div class="split"><div class="stack">
      <div class="card panel"><h2>${t('yourCourses')}</h2><div class="unit-progress">${DATA.tracks.map((tr) => { const ts = trackStats(tr), live = tr.status === 'available';
        return `<a href="#${live && state.certs[tr.id] ? 'cert' : 'course'}-${tr.id}"><div class="row-top"><span>${esc(L(tr.title))}${live && state.certs[tr.id] ? ` <span class="pill ok" title="${t('certEarned')}">🎓</span>` : ''}</span><span>${live ? `${ts.done} / ${ts.count}` : t('comingSoon')}</span></div><div class="progress${live && ts.done === ts.count ? ' done' : ''}"><span style="width:${live ? pct(ts.done, ts.count) : 0}%"></span></div></a>`; }).join('')}</div></div>
      ${liveTracks().filter((tr) => trackStats(tr).done > 0).map((tr) => `<div class="card panel"><h2>${t('progressUnit', L(tr.title))}</h2><div class="unit-progress">${tr.units.map((un, i) => { const d = un.modules.filter((m) => state.done.has(m)).length;
        return `<div><div class="row-top"><span>${i + 1} · ${esc(L(un.title))}</span><span>${d} / ${un.modules.length}</span></div><div class="progress${d === un.modules.length ? ' done' : ''}"><span style="width:${pct(d, un.modules.length)}%"></span></div></div>`; }).join('')}</div></div>`).join('')}
      <div class="card panel"><h2>${t('prefs')}</h2><div>
        <div class="setting"><div class="txt"><b>${t('language')}</b><span>${t('languageSub')}</span></div>${seg([['en', 'English'], ['es', 'Español']], state.lang, 'set-lang')}</div>
        <div class="setting"><div class="txt"><b>${t('theme')}</b><span>${t('themeSub')}</span></div>${seg([['system', t('system')], ['light', t('light')], ['dark', t('dark')]], theme, 'set-theme')}</div>
        <div class="setting"><div class="txt"><b>${t('exLang')}</b><span>${t('exLangSub')}</span></div><select class="select" id="pref-code-lang" aria-label="${t('exLang')}">${LANGS.map(([k, label]) => `<option value="${k}" ${k === state.codeLang ? 'selected' : ''}>${label}</option>`).join('')}</select></div>
      </div></div></div>
    <div class="stack">
      <div class="card panel"><h2>${t('accountTitle')}</h2>
        <form id="profile-form" class="acct-form">
          <div class="field"><label for="pf-name">${t('displayName')}</label><input class="input" id="pf-name" maxlength="80" value="${esc(u.name || '')}" autocomplete="name"></div>
          <div class="field"><label for="pf-user">${t('username')}</label><input class="input" id="pf-user" maxlength="32" value="${esc(u.username || '')}" autocomplete="username"><small class="hint">${t('userHint')}</small></div>
          <div class="field"><label>${t('email')}</label><div class="readonly email-row">${esc(u.email || '—')}${u.emailVerified ? `<span class="pill ok">✓ ${t('emailConfirmed')}</span>` : auth.emailConfirmation ? `<span class="pill soon">${t('emailNotConfirmed')}</span>` : ''}</div></div>
          <div class="acct-actions"><button class="btn btn-sm" type="submit">${t('saveChanges')}</button><span class="form-status" id="profile-status" role="status"></span></div>
        </form>
        ${u.authProvider === 'password' ? `<div class="sep"></div><form id="password-form" class="acct-form"><h3>${t('changePw')}</h3>
          <div class="field"><label for="pw-cur">${t('currentPw')}</label><input class="input" id="pw-cur" type="password" autocomplete="current-password" required></div>
          <div class="field"><label for="pw-new">${t('newPw')}</label><input class="input" id="pw-new" type="password" autocomplete="new-password" minlength="8" required><small class="hint">${t('pwHint')}</small></div>
          <div class="field"><label for="pw-new2">${t('confirmPw')}</label><input class="input" id="pw-new2" type="password" autocomplete="new-password" required></div>
          <div class="acct-actions"><button class="btn btn-sm btn-ghost" type="submit">${t('changePw')}</button><span class="form-status" id="password-status" role="status"></span></div></form>
          <div class="sep"></div><form id="rc-form" class="acct-form"><h3 id="rc-section">${t('rcTitle')}</h3><p class="muted acct-note" style="margin:0">${t('rcSub')}</p>
          <p class="rc-left" id="rc-left" role="status">${(queueMicrotask(loadRecoveryLeft), '')}</p>
          <div class="field"><label for="rc-pass">${t('currentPw')}</label><input class="input" id="rc-pass" type="password" autocomplete="current-password" required><small class="hint">${t('rcMakeHint')}</small></div>
          <div class="acct-actions"><button class="btn btn-sm btn-ghost" type="submit">${t('rcMake')}</button><span class="form-status" id="rc-status" role="status"></span></div></form>`
        : `<p class="muted acct-note">${t('googleNoPw', { github: 'GitHub', google: 'Google' }[u.authProvider] || 'Google')}</p>`}</div>
      <div class="card panel"><h2 style="display:flex;justify-content:space-between;gap:10px">${t('achievements')}<span class="muted" style="font-weight:500">${t('earned', ach.filter((x) => x[3]).length, ach.length)}</span></h2>
        <div class="badges-grid">${ach.map(([ico, name, how, got]) => `<div class="badge${got ? ' earned' : ''}"><span class="medal">${ico}</span><b>${esc(name)}</b><span>${esc(how)}</span></div>`).join('')}</div></div>
      <div class="card panel"><h2>${t('recent')}</h2>${recent.length ? `<ul class="activity">${recent.map((a) => `<li>${actLine(a)}<span class="when">${relDay(a.at)}</span></li>`).join('')}</ul>` : `<p class="muted" style="margin:0">${t('noActivity')}</p>`}</div>
      <div class="card panel danger"><h2>${t('deleteTitle')}</h2><p class="muted" style="margin:0 0 12px;font-size:13.5px">${t('deleteText')}</p>
        <form id="delete-form" class="stack" style="gap:10px">${u.authProvider === 'password' ? `<div class="field"><label for="del-pass">${t('password')}</label><input class="input" id="del-pass" type="password" autocomplete="current-password" required></div>` : ''}
          <div class="field"><label for="del-confirm">${t('typeDelete')}</label><input class="input" id="del-confirm" autocomplete="off" required></div><button class="btn btn-danger" type="submit">${t('deleteBtn')}</button><div class="form-error" id="delete-error" role="alert"></div></form></div>
    </div></div></section>`;
}

const PG_PY = `# Python runs right here in your browser.
# Change the numbers, then press Run (or try Step through).
scores = [72, 95, 88, 61, 79]
average = sum(scores) / len(scores)
print("average:", round(average, 2))

for s in scores:
    letter = "A" if s >= 90 else "B" if s >= 80 else "C" if s >= 70 else "D"
    print(s, "->", letter)
`;
const PG_SQL = `-- SQL runs in your browser on a fresh SQLite database.
CREATE TABLE students (name TEXT, city TEXT, score REAL);
INSERT INTO students VALUES ('Ana', 'Austin', 91.5), ('Ben', 'Denver', 78), ('Chen', 'Austin', 85.5);

SELECT city, COUNT(*) AS students, ROUND(AVG(score), 1) AS average
FROM students
GROUP BY city
ORDER BY average DESC;
`;
const PG_JAVA = `public class Main {
    public static void main(String[] args) {
        int[] scores = {72, 95, 88};
        int total = 0;
        for (int s : scores) total += s;
        System.out.println("average: " + (double) total / scores.length);
    }
}
`;
const PG_CPP = `#include <iostream>
#include <vector>

int main() {
    std::vector<int> scores = {72, 95, 88};
    int total = 0;
    for (int s : scores) total += s;
    std::cout << "average: " << static_cast<double>(total) / scores.size() << "\\n";
}
`;
const PG_TERM = `# A practice terminal: nothing here touches your computer.
# Change these commands, then press Run.
pwd
ls
cat notes.txt | grep -i git
mkdir -p projects/site
echo "<h1>Hello</h1>" > projects/site/index.html
ls projects/site
for f in photos/*.jpg; do echo "found $f"; done
`;
const PG_TERM_SETUP = "printf '%s\\n' 'Learn Python' 'Practice Git every day' 'Read about git branches' > notes.txt\nmkdir photos\ntouch photos/beach.jpg photos/city.jpg\n";
const PG_HTML = `<!doctype html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; }
    h1 { color: #4f46e5; }
    button { padding: 8px 14px; font-size: 16px; }
  </style>
</head>
<body>
  <h1>Hello, web!</h1>
  <p>You clicked <b id="count">0</b> times.</p>
  <button id="btn">Click me</button>
  <script>
    let clicks = 0;
    document.querySelector('#btn').addEventListener('click', () => {
      clicks += 1;
      document.querySelector('#count').textContent = clicks;
    });
  </script>
</body>
</html>
`;
const PG_SAMPLE = `// JavaScript runs right here in your browser.
// Try changing the numbers, then press Run.
const scores = [72, 95, 88, 61, 79];
const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;
console.log('average:', average.toFixed(2));

const letter = (s) => s >= 90 ? 'A' : s >= 80 ? 'B' : s >= 70 ? 'C' : 'D';
for (const s of scores) console.log(s, '->', letter(s));`;
function viewPlayground() {
  if (!state.pg) state.pg = { lang: 'javascript', code: PG_SAMPLE, expected: '', from: '' };
  const pg = state.pg;
  return `<section class="wrap" style="max-width:1200px"><h1>${t('playground')}</h1><p class="lead">${t('pgLead')}</p>
    <div class="pg" style="margin-top:22px">
      <div class="pg-editor"><div class="code-bar">${PG_LANGS.map(([k, label]) => `<button class="lang" data-action="pg-lang" data-v="${k}" aria-pressed="${k === pg.lang}">${label}</button>`).join('')}
        <button class="lang" data-action="pg-reset" style="margin-left:auto">${t('reset')}</button><button class="lang run" data-action="pg-run">${t('run')}</button></div>
        ${pg.from ? `<div class="pg-from">${esc(t('pgLoaded', pg.from))}</div>` : ''}
        <textarea id="pg-code" wrap="off" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Code editor">${esc(pg.code)}</textarea></div>
      <div class="pg-out"><div class="code-bar"><span class="output-label" style="padding:6px 8px">${t('output')}</span><span class="pg-status" id="pg-status"></span>${pg.lang === 'python' ? `<button class="lang" data-action="pg-step" title="${t('vizHint')}">⇥ ${t('vizStep')}</button>` : ''}<button class="lang" data-action="pg-share" title="${t('pgShareHint')}">🔗 ${t('pgShare')}</button></div><pre id="pg-out"><span class="info">${pg.lang === 'javascript' ? 'Ctrl/⌘ + Enter' : ''}</span></pre></div>
    </div></section>`;
}
let pgWorker = null;
// Shareable playground links: #code/<language>/<code as base64url>. Everything stays in the URL; nothing is uploaded.
const b64url = (str) => { let bin = ''; new TextEncoder().encode(str).forEach((b) => { bin += String.fromCharCode(b); }); return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const unb64url = (s) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0)));
function decodeShared(route) {
  const [, lang, data] = route.split('/');
  try { if (PG_LANGS.some(([k]) => k === lang) && data) return { lang, code: unb64url(data).slice(0, 20000), expected: '', from: t('pgShared') }; } catch (e) { /* bad link */ }
  toast(t('pgBadLink')); return null;
}
function sharePlayground() {
  const pg = state.pg; pg.code = $('#pg-code').value;
  if (pg.code.length > 8000) { toast(t('pgTooLong'), 2600); return; }
  const url = location.origin + location.pathname + '#code/' + pg.lang + '/' + b64url(pg.code);
  const done = () => toast(t('linkCopied'));
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(url).then(done, () => window.prompt(t('copyThisLink'), url)); else window.prompt(t('copyThisLink'), url);
}
// ---- Sandboxed code runner ----
// Code people write (JavaScript, Python, C++ and challenge tests) never runs with this site's identity. It runs in
// workers inside runner.html, a hidden iframe sandboxed WITHOUT allow-same-origin: an opaque origin with no cookies,
// no localStorage, no IndexedDB, no Cache Storage (so it cannot tamper with the offline cache), and a security
// policy that only lets it download the language runtimes from jsDelivr. It cannot reach the account server.
// SandboxWorker mirrors the Worker API, so the runners below use it like a normal worker.
let runnerFrame = null, runnerReady = null, runnerReadyResolve = null, sandboxSeq = 0;
const sandboxWorkers = new Map();
function sandboxRunner() {
  if (!runnerReady) runnerReady = new Promise((resolve) => {
    runnerReadyResolve = resolve;
    runnerFrame = document.createElement('iframe');
    runnerFrame.setAttribute('sandbox', 'allow-scripts');
    runnerFrame.className = 'runner-frame'; runnerFrame.title = 'Code runner'; runnerFrame.tabIndex = -1;
    runnerFrame.setAttribute('aria-hidden', 'true');
    runnerFrame.src = 'runner.html';
    document.body.append(runnerFrame);
  });
  return runnerReady;
}
addEventListener('message', (e) => {
  if (!runnerFrame || e.source !== runnerFrame.contentWindow || !e.data || typeof e.data !== 'object') return;
  const m = e.data;
  if (m.ready) { runnerReadyResolve(); return; }
  const w = sandboxWorkers.get(m.id);
  if (w) w.emit(m.ev, m);
});
class SandboxWorker {
  constructor(src, opts = {}) {
    this.id = ++sandboxSeq; this.onmessage = null; this.onerror = null; this.listeners = new Set();
    sandboxWorkers.set(this.id, this);
    this.queue = sandboxRunner().then(() => runnerFrame.contentWindow.postMessage({ op: 'create', id: this.id, src, opts }, '*'));
  }
  postMessage(data) { this.queue = this.queue.then(() => runnerFrame.contentWindow.postMessage({ op: 'post', id: this.id, data }, '*')); }
  terminate() { sandboxWorkers.delete(this.id); this.queue.then(() => runnerFrame.contentWindow.postMessage({ op: 'terminate', id: this.id }, '*')); }
  addEventListener(type, fn) { if (type === 'message') this.listeners.add(fn); }
  removeEventListener(type, fn) { this.listeners.delete(fn); }
  emit(kind, m) {
    if (kind === 'message') { const ev = { data: m.data }; if (this.onmessage) this.onmessage(ev); this.listeners.forEach((fn) => fn(ev)); }
    else if (this.onerror) this.onerror({ message: m.message || 'Error', preventDefault() {} });
  }
}

// Java runs in the browser with CheerpJ (a full Java 17 runtime in WebAssembly): javac compiles, then the
// class runs. Loaded only the first time someone runs Java. Output arrives in CheerpJ's #console element.
const CHEERPJ_URL = 'https://cjrtnc.leaningtech.com/5.0/loader.js';
let javaLoading = null, javaRuns = 0, javaBusy = false;
function loadJava() {
  if (!javaLoading) javaLoading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = CHEERPJ_URL;
    s.onload = () => window.cheerpjInit({ version: 17, status: 'none' }).then(resolve, reject);
    s.onerror = reject;
    document.head.append(s);
  }).catch((e) => { javaLoading = null; throw e; });
  return javaLoading;
}
// Loop guard and challenge test builder, shared with scripts/verify_challenges.js (scripts/lib/java_tools.js).
let javaToolsCache = null;
const javaTools = () => javaToolsCache || (javaToolsCache = new Function(DATA.javaTools + '\nreturn { guardJavaLoops, buildJavaTests, parseJavaTests };')());
// Compiles the given files ({ 'Name.java': source }) and runs mainClass. Learner code gets the loop guard.
// Returns { error } (Java failed to load or is busy), { compileError }, or { output, timedOut, compileMs, runMs }.
async function javaCompileRun(files, mainClass, onStatus) {
  if (javaBusy) return { error: t('javaBusy') };
  javaBusy = true;
  try {
    onStatus(javaLoading ? t('compiling') : t('javaLoading'));
    try { await loadJava(); } catch (e) { return { error: t('javaFailed') }; }
    let con = $('#console');
    if (!con) { con = document.createElement('pre'); con.id = 'console'; con.hidden = true; document.body.append(con); }
    // CheerpJ's in-memory /str/ folder has no subfolders, so sources keep their class names; each run compiles to its own folder.
    const dir = `/files/r${++javaRuns}/`, paths = Object.entries(files).map(([name, src]) => { window.cheerpOSAddStringFile('/str/' + name, src); return '/str/' + name; });
    con.textContent = ''; onStatus(t('compiling'));
    const t0 = performance.now();
    const compiled = await window.cheerpjRunMain('com.sun.tools.javac.Main', '', '-d', dir, ...paths);
    const compileMs = Math.round(performance.now() - t0);
    if (compiled !== 0) return { compileError: con.textContent.replaceAll('/str/', '') };
    con.textContent = ''; onStatus(t('running'));
    const t1 = performance.now();
    await window.cheerpjRunMain(mainClass, dir);
    const output = con.textContent;
    return { output, timedOut: /AtlasLoopGuard/.test(output), compileMs, runMs: Math.round(performance.now() - t1) };
  } catch (e) { return { error: String(e && e.message || e) }; } finally { javaBusy = false; }
}
async function runJava(code, out, status) {
  out.textContent = '';
  // The file must be named after its public class.
  const cls = (code.match(/public\s+(?:final\s+|abstract\s+)*class\s+([A-Za-z_$][\w$]*)/) || code.match(/\bclass\s+([A-Za-z_$][\w$]*)/) || [])[1] || 'Main';
  const r = await javaCompileRun({ [cls + '.java']: javaTools().guardJavaLoops(code) }, cls, (msg) => { status.textContent = msg; });
  if (r.error) { out.innerHTML = `<span class="err">${esc(r.error)}</span>`; status.textContent = ''; return; }
  if (r.compileError != null) { out.innerHTML = `<span class="info">${t('compileFailed')}</span>\n<span class="err">${esc(r.compileError)}</span>`; status.textContent = ''; return; }
  const text = r.output, crash = text.search(/^Exception in thread /m);
  if (r.timedOut) {
    const printed = text.slice(0, crash).replace(/\n$/, '');
    out.innerHTML = esc(printed) + (printed ? '\n' : '') + `<span class="err">${t('pyTimeout')}</span>`;
    status.textContent = t('pyTimeout'); return;
  }
  // Uncaught exceptions print a stack trace: show it in red.
  out.innerHTML = crash < 0 ? esc(text) : esc(text.slice(0, crash)) + `<span class="err">${esc(text.slice(crash))}</span>`;
  if (!text) out.innerHTML = `<span class="info">${t('pgEmpty')}</span>`;
  status.textContent = t('pgCompiledRan', r.compileMs, r.runMs);
}
// Java challenges: the learner writes class Solution; AtlasTests (built from the challenge's tests) calls it.
async function runJavaChallenge(i, id, ch, key, box, code) {
  const J = javaTools(), spin = (msg) => { box.innerHTML = `<div class="ch-status"><span class="spinner"></span>${esc(msg === t('running') ? t('runningTests') : msg)}</div>`; };
  const r = await javaCompileRun({ 'Solution.java': J.guardJavaLoops(code), 'AtlasTests.java': J.buildJavaTests(ch.tests) }, 'AtlasTests', spin);
  state.chTries[key] = (state.chTries[key] || 0) + 1;
  if (r.error) box.innerHTML = `<div class="ch-status err">${esc(r.error)}</div>`;
  else if (r.compileError != null) box.innerHTML = `<div class="ch-status err">${t('compileFailed')}</div><pre class="ch-err">${esc(r.compileError.trim())}</pre>`;
  else {
    const { results, printed } = J.parseJavaTests(r.output, ch.tests), v = verdict(results);
    box.innerHTML = v.html + (r.timedOut ? `<div class="ch-status err">${t('pyTimeout')}</div>` : '')
      + (printed.trim() && !r.timedOut ? `<div class="ch-printed"><span class="muted">${t('printedOutput')}</span><pre>${esc(printed.trim())}</pre></div>` : '');
    if (v.all) markSolved(i, id, ch, key);
  }
  refreshChallengeHelp(i);
}
// C++ compiles with real Clang/LLVM built for WebAssembly (YoWASP), inside a worker that then runs the program
// with a small WASI layer. The compiler (about 100 MB unpacked) downloads once and is cached by the browser.
const CLANG_URL = 'https://cdn.jsdelivr.net/npm/@yowasp/clang@21.1.4-3/gen/bundle.js';
const WASI_SHIM_URL = 'https://cdn.jsdelivr.net/npm/@bjorn3/browser_wasi_shim@0.4.2/+esm';
let cppWorker = null;
function cppWorkerFor() {
  if (cppWorker) return cppWorker;
  // A classic worker with dynamic import(): the sandbox's opaque origin cannot start blob module workers.
  const src = `const libs = Promise.all([import('${CLANG_URL}'), import('${WASI_SHIM_URL}')]);
const stream = (ConsoleStdout, kind) => { const dec = new TextDecoder(); return new ConsoleStdout((b) => postMessage({ t: kind, v: dec.decode(b, { stream: true }) })); };
let lastPct = -1;
onmessage = async (e) => {
  let runClang, WASI, File, OpenFile, ConsoleStdout;
  try { const [clang, shim] = await libs; ({ runClang } = clang); ({ WASI, File, OpenFile, ConsoleStdout } = shim); }
  catch (x) { postMessage({ t: 'load-error', v: String(x && x.message || x) }); return; }
  let err = '';
  const dec = new TextDecoder();
  let files;
  try {
    files = await runClang(['clang++', '-std=c++20', '-O1', '-fno-exceptions', 'main.cpp', '-o', 'main.wasm'], { 'main.cpp': e.data }, {
      stderr: (b) => { if (b) err += dec.decode(b, { stream: true }); },
      fetchProgress: ({ doneLength, totalLength }) => { const p = totalLength ? Math.floor(doneLength * 100 / totalLength) : 0; if (p !== lastPct) { lastPct = p; postMessage({ t: 'progress', p }); } }
    });
  } catch (x) { postMessage({ t: 'compile-error', v: err || String(x && x.message || x) }); return; }
  postMessage({ t: 'compiled', warn: err });
  const wasi = new WASI([], [], [new OpenFile(new File([])), stream(ConsoleStdout, 'out'), stream(ConsoleStdout, 'err')]);
  try {
    const inst = await WebAssembly.instantiate(await WebAssembly.compile(files['main.wasm']), { wasi_snapshot_preview1: wasi.wasiImport });
    const code = wasi.start(inst);
    postMessage({ t: 'done', code });
  } catch (x) { postMessage({ t: 'crash', v: String(x && x.message || x) }); }
};
postMessage({ t: 'ready' });`;
  cppWorker = new SandboxWorker(src);
  return cppWorker;
}
function runCpp(code, out, status) {
  const w = cppWorkerFor();
  out.textContent = ''; status.textContent = t('cppPreparing');
  const t0 = performance.now();
  let t1 = 0, timer = null;
  const finish = (msg) => { clearTimeout(timer); w.onmessage = null; if (!out.textContent) out.innerHTML = `<span class="info">${t('pgEmpty')}</span>`; status.textContent = msg; };
  w.onmessage = (e) => {
    const m = e.data;
    if (m.t === 'progress') status.textContent = t('cppLoading', m.p);
    else if (m.t === 'load-error') { w.terminate(); cppWorker = null; out.innerHTML = `<span class="err">${t('cppFailed')}</span>`; finish(''); }
    else if (m.t === 'compile-error') {
      const text = m.v.replace(/\/tmp\/[\w.-]+\.o: /g, '');
      out.innerHTML = `<span class="info">${t('compileFailed')}</span>\n<span class="err">${esc(text)}</span>${/__cxa_|exceptions? (are )?disabled|cannot use '(try|throw)'/.test(text) ? `\n<span class="info">${t('cppNoExceptions')}</span>` : ''}`;
      finish('');
    } else if (m.t === 'compiled') {
      t1 = performance.now(); status.textContent = t('running');
      timer = setTimeout(() => { w.terminate(); cppWorker = null; finish(t('pyTimeout')); }, 10000);
    } else if (m.t === 'out') out.insertAdjacentHTML('beforeend', esc(m.v));
    else if (m.t === 'err') out.insertAdjacentHTML('beforeend', `<span class="err">${esc(m.v)}</span>`);
    else if (m.t === 'crash') { out.insertAdjacentHTML('beforeend', `<span class="err">${esc(m.v)}</span>`); finish(''); }
    else if (m.t === 'done') finish(t('pgCompiledRan', Math.round(t1 - t0), Math.round(performance.now() - t1)));
  };
  w.onerror = (e) => { e.preventDefault(); w.terminate(); cppWorker = null; out.innerHTML = `<span class="err">${t('cppFailed')}</span>`; finish(''); };
  w.postMessage(code);
}

function runPlayground() {
  if (state.viz) vizClose();
  const pg = state.pg, out = $('#pg-out'), status = $('#pg-status');
  pg.code = $('#pg-code').value;
  if (pg.lang === 'python') { runPython(pg.code, out, status); return; }
  if (pg.lang === 'sql') { runSql(pg.code, out, status); return; }
  if (pg.lang === 'java') { runJava(pg.code, out, status); return; }
  if (pg.lang === 'cpp') { runCpp(pg.code, out, status); return; }
  if (pg.lang === 'bash') {
    out.innerHTML = `<span class="info">${t('loadingWord')}</span>`;
    loadMiniShell().then((M) => {
      const r = M.runChallengeShell(PG_TERM_SETUP, pg.code);
      out.innerHTML = r.error ? `<span class="err">${esc(r.error)}</span>` : r.transcript.map((x) => `<span class="t-cmd"><span class="t-ps">$</span> ${esc(x.cmd)}</span>\n${esc(x.out)}${x.err ? `<span class="err">${esc(x.err)}</span>` : ''}`).join('') || `<span class="info">${t('pgEmpty')}</span>`;
      status.textContent = t('termRan', r.transcript.length);
    }, () => { out.innerHTML = `<span class="err">${t('shellFailed')}</span>`; });
    return;
  }
  if (pg.lang === 'html') {
    // Web pages render in a sandboxed frame: scripts run, but the page cannot reach this site.
    let frame = $('#pg-frame');
    if (!frame) {
      frame = document.createElement('iframe');
      frame.id = 'pg-frame'; frame.className = 'web-preview pg-frame'; frame.title = t('preview');
      frame.setAttribute('sandbox', 'allow-scripts allow-forms allow-modals');
      out.hidden = true; out.after(frame);
    }
    showPreview(frame, pg.code); status.textContent = t('rendered');
    return;
  }
  if (pg.lang !== 'javascript') {
    out.innerHTML = `<span class="info">${esc(pg.expected ? t('pgServer') : t('pgServerNoExpected'))}</span>${pg.expected ? '\n\n' + esc(pg.expected) : ''}`;
    return;
  }
  if (pgWorker) pgWorker.terminate();
  out.textContent = ''; status.textContent = t('running');
  const prelude = "const __f=(v)=>typeof v==='string'?v:(()=>{try{return JSON.stringify(v)}catch(e){return String(v)}})();"
    + "console.log=console.info=console.warn=(...a)=>postMessage({t:'log',v:a.map(__f).join(' ')});console.error=(...a)=>postMessage({t:'err',v:a.map(__f).join(' ')});"
    + "const require=(m)=>{throw new Error('require(\"'+m+'\") is not available in the browser playground')};";
  const started = performance.now();
  const w = pgWorker = new SandboxWorker(prelude + '\n' + pg.code + "\n;postMessage({t:'done'});");
  const finish = (msg) => { clearTimeout(timer); w.terminate(); if (!out.textContent) out.innerHTML = `<span class="info">${t('pgEmpty')}</span>`; status.textContent = msg; };
  const timer = setTimeout(() => { finish(t('pgTimeout')); }, 3000);
  w.onmessage = (e) => {
    const m = e.data;
    if (m.t === 'done') finish(t('pgDone', Math.round(performance.now() - started)));
    else out.insertAdjacentHTML('beforeend', m.t === 'err' ? `<span class="err">${esc(m.v)}</span>\n` : esc(m.v) + '\n');
  };
  w.onerror = (e) => { e.preventDefault(); out.insertAdjacentHTML('beforeend', `<span class="err">${esc(e.message || 'Error')}</span>\n` + tipFrom(JS_TIPS, e.message)); finish(''); };
}
// Python runs in the browser with Pyodide (CPython compiled to WebAssembly). It is downloaded only the
// first time someone runs Python, inside a worker so a runaway loop can be stopped without freezing the page.
const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
let pyWorker = null, pyReady = false;
function pythonWorker() {
  if (pyWorker) return pyWorker;
  const src = `importScripts('${PYODIDE_URL}pyodide.js');
const ready = loadPyodide({ indexURL: '${PYODIDE_URL}' }).then((py) => {
  py.setStdout({ batched: (s) => postMessage({ t: 'log', v: s }) });
  py.setStderr({ batched: (s) => postMessage({ t: 'err', v: s }) });
  py.setStdin({ stdin: () => null });
  postMessage({ t: 'ready' });
  return py;
});
ready.catch((err) => postMessage({ t: 'fail', v: String(err && err.message || err) }));
onmessage = async (e) => {
  const py = await ready;
  const scope = py.globals.get('dict')();
  try { await py.loadPackagesFromImports(e.data); await py.runPythonAsync(e.data, { globals: scope }); }
  catch (err) { postMessage({ t: 'err', v: String(err.message || err).trim().split('\\n').filter((l, i, a) => i === a.length - 1 || l.includes('File "<exec>"')).map((l) => l.trim().replace('File "<exec>", ', '')).join('\\n') }); }
  finally { scope.destroy(); postMessage({ t: 'done' }); }
};`;
  pyWorker = new SandboxWorker(src);
  pyWorker.addEventListener('message', (e) => { if (e.data.t === 'ready') pyReady = true; });
  return pyWorker;
}
// Runs Python in the shared Pyodide worker and collects its output (used to grade challenges).
function runPythonCapture(code, onStatus) {
  return new Promise((resolve) => {
    const w = pythonWorker();
    let out = '', err = '', timer = null;
    const stop = () => { clearTimeout(timer); w.removeEventListener('message', onMsg); };
    const arm = () => { clearTimeout(timer); timer = setTimeout(() => { stop(); w.terminate(); pyWorker = null; pyReady = false; resolve({ out, err, timeout: true }); }, 10000); };
    const onMsg = (e) => {
      const m = e.data;
      if (m.t === 'ready') { if (onStatus) onStatus('running'); arm(); }
      else if (m.t === 'log') out += m.v + '\n';
      else if (m.t === 'err') err += m.v + '\n';
      else if (m.t === 'fail') { stop(); w.terminate(); pyWorker = null; resolve({ failed: true }); }
      else if (m.t === 'done') { stop(); resolve({ out, err }); }
    };
    w.addEventListener('message', onMsg);
    if (onStatus) onStatus(pyReady ? 'running' : 'loading');
    if (pyReady) arm();
    w.postMessage(code);
  });
}
// Step-through visualizer for Python: the program runs once under sys.settrace in the Pyodide worker,
// recording every line it reaches with the variables of each active function call and how much it has
// printed so far. The page then lets you move through those steps like a slideshow.
const TRACE_PY = String.raw`
import sys, io, json
try:
    import pyodide_js
    await pyodide_js.loadPackagesFromImports(__SRC)
except Exception:
    pass
__steps, __out, __err = [], io.StringIO(), None
def __fmt(v):
    try:
        r = repr(v)
    except Exception:
        r = '?'
    return r if len(r) <= 120 else r[:117] + '...'
def __vars(f):
    out = []
    for k, v in list(f.f_locals.items()):
        if k.startswith('__') or type(v).__name__ in ('module', 'function', 'type', 'builtin_function_or_method'):
            continue
        out.append([k, __fmt(v), type(v).__name__])
    return out
class __Stop(BaseException):
    pass
def __tr(frame, event, arg):
    if frame.f_code.co_filename != '<atlas>':
        return None
    if event in ('line', 'return', 'exception'):
        if len(__steps) >= 600:
            raise __Stop()
        stack, f = [], frame
        while f is not None and f.f_code.co_filename == '<atlas>':
            stack.append({'fn': f.f_code.co_name, 'vars': __vars(f)})
            f = f.f_back
        step = {'line': frame.f_lineno, 'ev': event, 'stack': stack[::-1], 'out': len(__out.getvalue())}
        if event == 'return' and frame.f_code.co_name != '<module>':
            step['ret'] = __fmt(arg)
        if event == 'exception':
            step['exc'] = arg[0].__name__ + ': ' + str(arg[1])
        __steps.append(step)
    return __tr
__g = {'__name__': '__main__'}
__real = sys.stdout
try:
    __code = compile(__SRC, '<atlas>', 'exec')
    sys.stdout = __out
    sys.settrace(__tr)
    exec(__code, __g)
except __Stop:
    __err = 'stopped'
except SyntaxError as e:
    __err = 'SyntaxError: ' + str(e.msg) + ' (line ' + str(e.lineno) + ')'
except BaseException as e:
    __err = type(e).__name__ + ': ' + str(e)
finally:
    sys.settrace(None)
    sys.stdout = __real
print('__ATLAS_TRACE__' + json.dumps({'steps': __steps, 'out': __out.getvalue(), 'error': __err}))
`;
async function traceProgram() {
  const pg = state.pg, out = $('#pg-out'), status = $('#pg-status');
  pg.code = $('#pg-code').value;
  out.hidden = false; $('#pg-viz')?.remove();
  const r = await runPythonCapture(`__SRC = ${JSON.stringify(pg.code)}\n${TRACE_PY}`, (s) => { status.textContent = s === 'loading' ? t('pyLoading') : t('running'); });
  if (r.failed) { status.textContent = t('pyFailed'); return; }
  if (r.timeout) { status.textContent = t('pyTimeout'); return; }
  const line = r.out.split('\n').find((l) => l.startsWith('__ATLAS_TRACE__'));
  if (!line) { out.innerHTML = `<span class="err">${esc((r.err || r.out).trim())}</span>`; status.textContent = ''; return; }
  const trace = JSON.parse(line.slice('__ATLAS_TRACE__'.length));
  if (!trace.steps.length) { out.innerHTML = `<span class="err">${esc(trace.error || t('pgEmpty'))}</span>`; status.textContent = ''; return; }
  state.viz = { trace, i: 0, lines: pg.code.replace(/\s+$/, '').split('\n') };
  status.textContent = t('vizSteps', trace.steps.length);
  out.hidden = true;
  out.insertAdjacentHTML('afterend', '<div class="viz" id="pg-viz" tabindex="0"></div>');
  renderViz();
  $('#pg-viz').focus();
}
function renderViz() {
  const v = state.viz, box = $('#pg-viz'); if (!v || !box) return;
  const steps = v.trace.steps, s = steps[v.i], prev = steps[v.i - 1], last = v.i === steps.length - 1;
  const prevVars = (fn, depth) => { const fr = prev?.stack[depth]; return fr && fr.fn === fn ? Object.fromEntries(fr.vars.map(([k, val]) => [k, val])) : {}; };
  const printed = v.trace.out.slice(0, last ? v.trace.out.length : s.out);
  box.innerHTML = `<div class="viz-bar"><button class="lang" data-action="viz-go" data-v="0" ${v.i ? '' : 'disabled'} aria-label="${t('vizFirst')}">⏮</button><button class="lang" data-action="viz-go" data-v="${v.i - 1}" ${v.i ? '' : 'disabled'}>◀ ${t('vizBack')}</button>
      <span class="viz-count">${t('vizStepOf', v.i + 1, steps.length)}</span><button class="lang" data-action="viz-go" data-v="${v.i + 1}" ${last ? 'disabled' : ''}>${t('vizNext')} ▶</button><button class="lang" data-action="viz-go" data-v="${steps.length - 1}" ${last ? 'disabled' : ''} aria-label="${t('vizLast')}">⏭</button>
      <button class="lang" data-action="viz-close" style="margin-left:auto" aria-label="${t('vizClose')}" title="${t('vizClose')}">✕</button></div>
    <input type="range" class="viz-range" id="viz-range" min="0" max="${steps.length - 1}" value="${v.i}" aria-label="${t('vizStepOf', v.i + 1, steps.length)}">
    <div class="viz-body"><ol class="viz-code">${v.lines.map((ln, n) => `<li class="${n + 1 === s.line ? (s.ev === 'line' ? 'now' : 'ret') : prev && n + 1 === prev.line ? 'was' : ''}"><span class="ln">${n + 1}</span><code>${esc(ln) || ' '}</code></li>`).join('')}</ol>
      <div class="viz-side"><div class="viz-note">${last && v.trace.error && v.trace.error !== 'stopped' ? `<span class="err">${t('vizCrashed', s.line)}</span>` : s.ev === 'line' ? t('vizAbout', s.line) : s.ev === 'return' ? (s.ret != null ? t('vizReturns', esc(s.stack[s.stack.length - 1].fn), esc(s.ret)) : t('vizEnd')) : `<span class="err">${esc(s.exc || '')}</span>`}</div>
        ${s.stack.map((fr, d) => { const pv = prevVars(fr.fn, d); return `<div class="viz-frame${d === s.stack.length - 1 ? ' top' : ''}"><div class="viz-fn">${fr.fn === '<module>' ? t('vizGlobals') : esc(fr.fn) + '()'}</div>
          ${fr.vars.length ? `<table>${fr.vars.map(([k, val, ty]) => `<tr class="${pv[k] !== val ? 'changed' : ''}"><th>${esc(k)}</th><td><code>${esc(val)}</code><span class="ty">${esc(ty)}</span></td></tr>`).join('')}</table>` : `<div class="muted viz-none">${t('vizNoVars')}</div>`}</div>`; }).join('')}
        <div class="viz-printed"><div class="viz-fn">${t('output')}</div><pre>${esc(printed) || `<span class="muted">${t('vizNothing')}</span>`}</pre>${last && v.trace.error && v.trace.error !== 'stopped' ? `<pre class="err">${esc(v.trace.error)}</pre>` : ''}${last && v.trace.error === 'stopped' ? `<p class="muted">${t('vizCapped')}</p>` : ''}</div></div></div>`;
  box.querySelector('.viz-code .now, .viz-code .ret')?.scrollIntoView({ block: 'nearest' });
}
function vizGo(i) { const v = state.viz; if (!v) return; v.i = Math.max(0, Math.min(v.trace.steps.length - 1, i)); renderViz(); }
function vizClose() { state.viz = null; $('#pg-viz')?.remove(); const out = $('#pg-out'); if (out) out.hidden = false; $('#pg-status').textContent = ''; }
const chKey = (id, ch) => `${id}/${ch.id}`;
const chDraft = (id, ch) => (store.get('chDrafts', {})[chKey(id, ch)] ?? ch.starter);
function challengeHtml(id, ch, i) {
  const key = chKey(id, ch), solved = state.solved.has(key), tries = state.chTries[key] || 0;
  return `<div class="card challenge${solved ? ' solved' : ''}" id="ch-${i}">
    <div class="ch-head"><span class="ch-no">${i + 1}</span><h2 class="h3">${esc(L(ch.title))}</h2>${solved ? `<span class="pill ok">✓ ${t('solved')}</span>` : ''}</div>
    <p class="ch-prompt">${fmt(L(ch.prompt))}</p>
    ${ch.lang === 'bash' ? `<details class="ch-tables" open><summary>${t('startingFiles')}</summary><pre tabindex="0" class="code ch-setup" data-shell-setup="${i}"><code>${t('loadingWord')}</code></pre></details>` : ''}
    ${ch.lang === 'predict' ? `<div class="code-card ch-program"><div class="code-bar"><span class="lang is-on">${LANG_LABEL[ch.codeLang] || ch.codeLang}</span></div><pre tabindex="0" class="code"><code class="language-${ch.codeLang}">${esc(ch.code)}</code></pre></div>` : ''}
    ${ch.lang === 'sql' ? `<details class="ch-tables"><summary>${t('seeTables')}</summary><pre tabindex="0" class="code"><code>${esc(ch.setup)}</code></pre></details>` : ''}
    <div class="ch-editor"><div class="code-bar"><span class="lang is-on">${{ sql: 'SQL', html: 'HTML', css: 'HTML · CSS', js: 'JavaScript', java: 'Java', bash: t('terminal'), predict: t('yourAnswer') }[ch.lang] || 'Python'}</span><button class="lang" data-action="ch-reset" data-i="${i}">${t('reset')}</button>${!ch.lang ? `<button class="lang" data-action="ch-step" data-i="${i}" title="${t('chStepHint')}">⇥ ${t('vizStep')}</button>` : ''}<button class="lang run" data-action="ch-run" data-i="${i}">▶ ${ch.lang === 'predict' ? t('checkAnswer') : t('runTests')}</button></div>
      <textarea class="ch-code" id="ch-code-${i}" data-key="${esc(key)}" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off" aria-label="${esc(L(ch.title))}: ${ch.lang === 'predict' ? t('yourAnswer') : t('yourCode')}"${ch.lang === 'predict' ? ` placeholder="${t('predictPlaceholder')}"` : ''}>${esc(chDraft(id, ch))}</textarea></div>
    <div class="ch-result" id="ch-res-${i}" aria-live="polite"></div>
    <div class="ch-help"><details><summary>${t('hint')}</summary><p>${fmt(L(ch.hint))}</p></details>
      ${solved || tries >= 2 ? `<details><summary>${t('showSolution')}</summary><pre tabindex="0" class="code"><code>${esc(ch.solution)}</code></pre></details>` : `<span class="muted ch-lock">${t('solutionAfter')}</span>`}</div>
  </div>`;
}
// SQL challenges: run the setup and the learner's statements in sql.js and compare the last result
// set with the reference solution's (as a set when row order does not matter).
async function runSqlChallenge(i, id, ch, key, box, code) {
  box.innerHTML = `<div class="ch-status"><span class="spinner"></span>${t('sqlLoading')}</div>`;
  let SQL; try { SQL = await loadSqlJs(); } catch (e) { box.innerHTML = `<div class="ch-status err">${t('sqlFailed')}</div>`; return; }
  const run = (sql) => { const db = new SQL.Database(); try { db.exec(ch.setup); const res = db.exec(sql); const last = res[res.length - 1]; return last ? { columns: last.columns, rows: last.values } : { columns: [], rows: [] }; } finally { db.close(); } };
  state.chTries[key] = (state.chTries[key] || 0) + 1;
  let mine;
  try { mine = run(code); } catch (e) { box.innerHTML = `<div class="ch-status err">${t('sqlError')}</div><pre class="ch-err">${esc(e.message)}</pre>${tipFrom(SQL_TIPS, e.message)}`; refreshChallengeHelp(i); return; }
  const want = run(ch.solution), norm = (rows) => (ch.ordered ? rows.map((r) => JSON.stringify(r)) : rows.map((r) => JSON.stringify(r)).sort()).join('\n');
  const ok = mine.rows.length > 0 && norm(mine.rows) === norm(want.rows);
  const table = (r) => (r.columns.length ? sqlTable(r.columns, r.rows) : t('noRowsReturned'));
  box.innerHTML = `<div class="ch-status ${ok ? 'ok' : 'err'}">${ok ? '🎉 ' + t('sqlMatch') : mine.rows.length === want.rows.length ? t('sqlDiffers') : t('sqlNoMatch', mine.rows.length, want.rows.length)}</div>
    <div class="ch-compare"><div><span class="muted">${t('yourResult')}</span><pre class="ch-err">${esc(table(mine))}</pre></div>${ok ? '' : `<div><span class="muted">${t('expectedResult')}</span><pre class="ch-err">${esc(table(want))}</pre></div>`}</div>`;
  if (ok) markSolved(i, id, ch, key);
  refreshChallengeHelp(i);
}
// Pages people write run in preview.html (its own document, so its own relaxed security policy) inside a
// sandboxed frame. The frame says when it is ready and gets the page to show through postMessage.
let previewRun = 0;
function showPreview(frame, html) { frame.dataset.html = html; frame.src = 'preview.html?r=' + (++previewRun); }
addEventListener('message', (e) => {
  if (!e.data || e.data.type !== 'atlas-preview-ready') return;
  const frame = [...document.querySelectorAll('iframe.web-preview')].find((f) => f.contentWindow === e.source);
  if (frame) e.source.postMessage({ type: 'atlas-preview', html: frame.dataset.html || '' }, '*');
});
const testList = (results) => `<ul class="ch-tests">${results.map((x) => `<li class="${x.ok ? 'ok' : 'bad'}"><span class="mk">${x.ok ? '✓' : '✗'}</span>${x.label ? esc(L(x.label)) : `<code>${esc(x.call)}</code>`}${x.ok ? '' : x.note ? `<span class="gw">${esc(x.note)}</span>` : `<span class="gw">${t('got')} <code>${esc(x.got)}</code>${x.want != null ? ` · ${t('expected')} <code>${esc(x.want)}</code>` : ''}</span>`}</li>`).join('')}</ul>`;
const verdict = (results) => { const passed = results.filter((x) => x.ok).length, all = passed === results.length; return { all, html: `<div class="ch-status ${all ? 'ok' : 'err'}">${all ? '🎉 ' + t('allPassed') : t('passedOf', passed, results.length)}</div>${testList(results)}` }; };
// HTML/CSS challenges render in a sandboxed frame with scripts disabled; the checks read its DOM and computed styles.
let webChecker = null;
function runWebChallenge(i, id, ch, key, box, code) {
  webChecker = webChecker || new Function(DATA.webChecks + '\nreturn runWebChecks;')();
  box.innerHTML = `<div class="ch-status"><span class="spinner"></span>${t('runningTests')}</div><iframe class="web-preview ch-frame" sandbox="allow-same-origin" title="${t('preview')}"></iframe>`;
  const frame = box.querySelector('iframe');
  frame.addEventListener('load', () => {
    const results = webChecker(frame.contentDocument, frame.contentWindow, ch.checks), v = verdict(results);
    state.chTries[key] = (state.chTries[key] || 0) + 1;
    box.firstElementChild.outerHTML = v.html + `<div class="muted ch-prev-label">${t('preview')}</div>`;
    if (v.all) markSolved(i, id, ch, key);
    refreshChallengeHelp(i);
  }, { once: true });
  frame.srcdoc = code;
}
// JavaScript challenges run in a throwaway worker with a time limit.
function runJsChallenge(i, id, ch, key, box, code) {
  const harness = `;postMessage((${JSON.stringify(ch.tests)}).map(([call, want]) => { try { const got = eval(call); const g = JSON.stringify(got); return { call, ok: g === JSON.stringify(JSON.parse(want)), got: g === undefined ? String(got) : g, want }; } catch (e) { return { call, ok: false, got: String(e), want }; } }));`;
  const w = new SandboxWorker(code + '\n' + harness);
  const done = () => { clearTimeout(timer); w.terminate(); state.chTries[key] = (state.chTries[key] || 0) + 1; refreshChallengeHelp(i); };
  const timer = setTimeout(() => { done(); box.innerHTML = `<div class="ch-status err">${t('pgTimeout')}</div>`; }, 3000);
  w.onmessage = (e) => { const v = verdict(e.data), bad = e.data.find((x) => !x.ok);
    box.innerHTML = v.html + (bad ? tipFrom(JS_TIPS, bad.got) || (bad.got === 'undefined' ? `<div class="err-tip">💡 ${fmt(t('undefTip'))}</div>` : '') : ''); done(); if (v.all) markSolved(i, id, ch, key); };
  w.onerror = (e) => { e.preventDefault(); box.innerHTML = `<div class="ch-status err">${t('codeError')}</div><pre class="ch-err">${esc(e.message || 'Error')}</pre>${tipFrom(JS_TIPS, e.message)}`; done(); };
}
// Command-line challenges run in a simulated shell (js/mini-shell.js), loaded the first time it is needed.
let shellLoading = null;
function loadMiniShell() {
  if (window.MiniShell) return Promise.resolve(window.MiniShell);
  shellLoading = shellLoading || new Promise((resolve, reject) => { const s = document.createElement('script'); s.src = 'js/mini-shell.js?v=' + (DATA.shellVersion || '1'); s.onload = () => resolve(window.MiniShell); s.onerror = () => { shellLoading = null; reject(new Error('load')); }; document.head.append(s); });
  return shellLoading;
}
// Shows what the home folder looks like before the learner starts: a tree, then the text files.
function shellTree(files, git) {
  if (!files.length) return t('emptyHome');
  const repoNote = (git || []).map((r) => { const n = Object.keys(r.branches).length ? r.branches[r.head]?.commits.length || 0 : 0; return `\n${t('gitRepoNote', r.repo, r.head, n)}${r.status.length ? '\n  git status -s:\n' + r.status.map((l) => '    ' + l).join('\n') : ''}`; }).join('');
  const tree = files.map((f) => '  '.repeat(f.path.replace(/\/$/, '').split('/').length - 1) + f.path.replace(/\/$/, '').split('/').pop() + (f.path.endsWith('/') ? '/' : ''));
  const texts = files.filter((f) => f.data && f.data.length < 2000).map((f) => `\n── ${f.path} ──\n${f.data.replace(/\n$/, '')}`);
  return '~/\n' + tree.map((l) => '  ' + l).join('\n') + repoNote + (texts.length ? '\n' + texts.join('\n') : '');
}
function fillShellSetups() {
  const boxes = document.querySelectorAll('[data-shell-setup]');
  if (!boxes.length) return;
  loadMiniShell().then((M) => boxes.forEach((b) => { const ch = DATA.full[state.chModule]?.challenges?.[+b.dataset.shellSetup]; if (ch) { const r = M.runChallengeShell(ch.setup || '', ''); b.firstChild.textContent = shellTree(r.files, r.git); } }))
    .catch(() => boxes.forEach((b) => { b.firstChild.textContent = t('shellFailed'); }));
}
async function runShellChallenge(i, id, ch, key, box, code) {
  let M; try { M = await loadMiniShell(); } catch (e) { box.innerHTML = `<div class="ch-status err">${t('shellFailed')}</div>`; return; }
  state.chTries[key] = (state.chTries[key] || 0) + 1;
  const g = M.gradeShell(ch, code);
  const term = g.got.error ? `<span class="t-err">${esc(g.got.error)}</span>` : g.got.transcript.length ? g.got.transcript.map((x) => `<span class="t-cmd"><span class="t-ps">$</span> ${esc(x.cmd)}</span>\n${esc(x.out)}${x.err ? `<span class="t-err">${esc(x.err)}</span>` : ''}`).join('') : `<span class="muted">${t('noCommands')}</span>`;
  const list = (a) => (a && a.length ? a.join(', ') : '—');
  const say = (p) => ({ missing: t('shMissing', p.p), extra: t('shExtra', p.p), content: t('shContent', p.p), mode: t('shMode', p.p, p.got, p.want), notExec: t('shNotExec', p.p), exec: t('shExec', p.p),
    noRepo: t('gitNoRepo', p.p), extraRepo: t('gitExtraRepo', p.p), head: t('gitHead', p.got, p.want), noBranch: t('gitNoBranch', p.p), extraBranch: t('gitExtraBranch', p.p),
    commits: t('gitCommits', p.p, list(p.got), list(p.want)), tracked: t('gitTracked', p.p, list(p.got), list(p.want)), status: t('gitStatus', list(p.got), list(p.want)) }[p.k]);
  const filesLabel = t(g.want.git.length ? 'shRepoLabel' : 'shFilesLabel');
  const results = [{ label: { en: filesLabel, es: filesLabel }, ok: !g.problems.length, note: g.problems.slice(0, 4).map(say).join(' · ') + (g.problems.length > 4 ? ' …' : '') }];
  if (ch.output) results.push({ label: { en: t('shOutLabel'), es: t('shOutLabel') }, ok: g.outputOk, got: g.got.out.trim() || t('nothingPrinted'), want: g.wantOut.trim() });
  const v = verdict(results);
  box.innerHTML = `${v.html}<div class="ch-printed"><span class="muted">${t('terminal')}</span><pre class="transcript">${term}</pre></div>`;
  if (v.all && !g.got.error) markSolved(i, id, ch, key);
  refreshChallengeHelp(i);
}
// Predict-the-output: compare the typed answer with the program's verified output, line by line.
// Trailing spaces and blank lines at the end do not matter; the expected lines stay hidden until solved or revealed.
const outLines = (x) => x.replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '').split('\n');
function runPredictChallenge(i, id, ch, key, box, code) {
  state.chTries[key] = (state.chTries[key] || 0) + 1;
  const want = outLines(ch.solution), got = code.trim() ? outLines(code) : [];
  const ok = got.length === want.length && got.every((l, n) => l === want[n]);
  const firstBad = want.findIndex((l, n) => got[n] !== l);
  const rows = got.map((l, n) => `<li class="${want[n] === l ? 'ok' : 'bad'}"><span class="mk">${want[n] === l ? '✓' : '✗'}</span><code>${esc(l) || ' '}</code></li>`).join('');
  box.innerHTML = `<div class="ch-status ${ok ? 'ok' : 'err'}">${ok ? '🎉 ' + t('predictRight') : !got.length ? t('predictEmpty') : got.length !== want.length ? t('predictCount', got.length, want.length) : t('predictLine', firstBad + 1)}</div>${got.length ? `<ul class="ch-tests">${rows}</ul>` : ''}`;
  if (ok) markSolved(i, id, ch, key);
  refreshChallengeHelp(i);
}
function markSolved(i, id, ch, key) {
  if (state.solved.has(key)) return;
  state.solved.add(key); logActivity('challenge', id, { ch: ch.id }); save();
  const card = $('#ch-' + i); card.classList.add('solved');
  card.querySelector('.ch-head').insertAdjacentHTML('beforeend', `<span class="pill ok">✓ ${t('solved')}</span>`);
  toast(t('challengeSolved'));
  const list = DATA.full[id].challenges, lead = $('.ch-lead b'), n = list.filter((c) => state.solved.has(chKey(id, c))).length;
  if (id.startsWith('project:')) {
    if (lead) lead.textContent = t('stepOf', n, list.length);
    const bar = $('.project-progress .progress span'); if (bar) bar.style.width = pct(n, list.length) + '%';
    const navItem = document.querySelectorAll('.project-steps-nav li')[i]; if (navItem) navItem.classList.add('done');
    if (n === list.length) { logActivity('project', id); save(); toast(t('projectDone'), 3500); }
  } else if (lead) lead.textContent = t('solvedOf', n, list.length);
}
async function runChallenge(i) {
  const id = state.chModule, ch = DATA.full[id].challenges[i], key = chKey(id, ch), box = $('#ch-res-' + i), code = $('#ch-code-' + i).value;
  if (ch.lang === 'sql') return runSqlChallenge(i, id, ch, key, box, code);
  if (ch.lang === 'bash') return runShellChallenge(i, id, ch, key, box, code);
  if (ch.lang === 'predict') return runPredictChallenge(i, id, ch, key, box, code);
  if (ch.lang === 'html' || ch.lang === 'css') return runWebChallenge(i, id, ch, key, box, code);
  if (ch.lang === 'js') return runJsChallenge(i, id, ch, key, box, code);
  if (ch.lang === 'java') return runJavaChallenge(i, id, ch, key, box, code);
  const program = `${code}\n__TESTS = ${JSON.stringify(ch.tests)}\n${DATA.harness}`;
  const r = await runPythonCapture(program, (s) => { box.innerHTML = `<div class="ch-status"><span class="spinner"></span>${s === 'loading' ? t('pyLoading') : t('runningTests')}</div>`; });
  if (r.failed) { box.innerHTML = `<div class="ch-status err">${t('pyFailed')}</div>`; return; }
  if (r.timeout) { box.innerHTML = `<div class="ch-status err">${t('pyTimeout')}</div>`; return; }
  const lines = r.out.split('\n'), mark = lines.find((l) => l.startsWith('__ATLAS_RESULTS__'));
  const printed = lines.filter((l) => l && !l.startsWith('__ATLAS_RESULTS__')).join('\n');
  state.chTries[key] = (state.chTries[key] || 0) + 1;
  if (!mark) {
    box.innerHTML = `<div class="ch-status err">${t('codeError')}</div><pre class="ch-err">${esc((r.err || printed).trim())}</pre>${pyTip(r.err || printed)}`;
    refreshChallengeHelp(i);
    return;
  }
  const results = JSON.parse(mark.slice('__ATLAS_RESULTS__'.length)), passed = results.filter((x) => x.ok).length, all = passed === results.length;
  box.innerHTML = `<div class="ch-status ${all ? 'ok' : 'err'}">${all ? '🎉 ' + t('allPassed') : t('passedOf', passed, results.length)}</div>
    <ul class="ch-tests">${results.map((x) => `<li class="${x.ok ? 'ok' : 'bad'}"><span class="mk">${x.ok ? '✓' : '✗'}</span><code>${esc(x.call)}</code>${x.ok ? '' : `<span class="gw">${t('got')} <code>${esc(x.got)}</code> · ${t('expected')} <code>${esc(x.want)}</code></span>`}</li>`).join('')}</ul>
    ${pyTip((results.find((x) => !x.ok && /Error|Exception/.test(x.got)) || {}).got) || (results.some((x) => !x.ok && x.got === 'None' && x.want !== 'None') ? `<div class="err-tip">💡 ${fmt(t('noneTip'))}</div>` : '')}
    ${printed.trim() ? `<div class="ch-printed"><span class="muted">${t('printedOutput')}</span><pre>${esc(printed.trim())}</pre></div>` : ''}`;
  if (all) markSolved(i, id, ch, key);
  refreshChallengeHelp(i);
}
// Plain-language help for the Python errors beginners meet most, matched on the last "SomethingError: message" line.
const PY_TIPS = [
  [/NameError: name '([^']+)'/, { en: (m) => `Python does not know the name \`${m[1]}\` yet. Check the spelling (capitals matter) and that it is created with \`=\` or \`def\` before this line. Text needs quotes.`, es: (m) => `Python todavía no conoce el nombre \`${m[1]}\`. Revisa cómo está escrito (las mayúsculas importan) y que se cree con \`=\` o \`def\` antes de esta línea. El texto va entre comillas.` }],
  [/IndentationError|TabError/, { en: () => 'The lines inside an `if`, `for`, `while` or `def` must be indented the same amount (4 spaces), and the line before them must end with `:`.', es: () => 'Las líneas dentro de un `if`, `for`, `while` o `def` deben tener la misma sangría (4 espacios), y la línea anterior debe terminar en `:`.' }],
  [/SyntaxError/, { en: () => 'Python could not read this line. Look for a missing `:` after `if`/`for`/`def`, a missing closing quote or bracket, or `=` where you meant `==`.', es: () => 'Python no pudo leer esta línea. Busca un `:` que falte después de `if`/`for`/`def`, una comilla o paréntesis sin cerrar, o `=` donde querías `==`.' }],
  [/TypeError: .*NoneType/, { en: () => 'Something is `None`: often a function that forgot to `return` its result.', es: () => 'Algo es `None`: muchas veces una función que olvidó hacer `return` de su resultado.' }],
  [/TypeError: (can only concatenate|unsupported operand|can't multiply|'<' not supported)/, { en: () => 'You are mixing kinds of values, like text and a number. Convert first: `str(x)` for text, `int(x)` or `float(x)` for numbers.', es: () => 'Estás mezclando tipos de valores, como texto y número. Convierte primero: `str(x)` para texto, `int(x)` o `float(x)` para números.' }],
  [/TypeError: .*(missing \d+ required|takes \d+ positional)/, { en: () => 'A function was called with a different number of arguments than its `def` line lists.', es: () => 'Se llamó a una función con un número de argumentos distinto al de su línea `def`.' }],
  [/ZeroDivisionError/, { en: () => 'Something was divided by zero. Check the divisor (for example an empty list has `len` 0) before dividing.', es: () => 'Algo se dividió entre cero. Revisa el divisor (por ejemplo, una lista vacía tiene `len` 0) antes de dividir.' }],
  [/IndexError/, { en: () => 'You asked for a position past the end. A list of length n has indexes 0 to n − 1.', es: () => 'Pediste una posición más allá del final. Una lista de largo n tiene índices de 0 a n − 1.' }],
  [/KeyError: (.+)/, { en: (m) => `The dictionary has no key ${m[1]}. Check with \`in\` first, or use \`.get(key, default)\`.`, es: (m) => `El diccionario no tiene la clave ${m[1]}. Revisa con \`in\` primero o usa \`.get(clave, valor_por_defecto)\`.` }],
  [/AttributeError: '(\w+)' object has no attribute '(\w+)'/, { en: (m) => `A ${m[1]} has no \`.${m[2]}\`. Check the spelling, or whether the value is the type you expect.`, es: (m) => `Un ${m[1]} no tiene \`.${m[2]}\`. Revisa cómo está escrito o si el valor es del tipo que esperas.` }],
  [/ValueError: invalid literal for int/, { en: () => '`int()` can only convert text that looks like a whole number, such as "42".', es: () => '`int()` solo convierte texto que parece un número entero, como "42".' }],
  [/RecursionError/, { en: () => 'The function keeps calling itself. Make sure there is a base case that returns without calling again, and that each call gets closer to it.', es: () => 'La función se sigue llamando a sí misma. Asegúrate de que haya un caso base que regrese sin volver a llamar, y que cada llamada se acerque a él.' }],
];
const SQL_TIPS = [
  [/no such column: (\S+)/, { en: (m) => `There is no column \`${m[1]}\`. Check its spelling against the table (see the tables above), and put text values in single quotes: \`'Austin'\`, not \`Austin\` or \`"Austin"\`.`, es: (m) => `No existe la columna \`${m[1]}\`. Revisa cómo se escribe en la tabla (mira las tablas de arriba) y pon los textos entre comillas simples: \`'Austin'\`, no \`Austin\` ni \`"Austin"\`.` }],
  [/no such table: (\S+)/, { en: (m) => `There is no table \`${m[1]}\`. Check the spelling of the table name after FROM or JOIN.`, es: (m) => `No existe la tabla \`${m[1]}\`. Revisa cómo se escribe el nombre después de FROM o JOIN.` }],
  [/ambiguous column name: (\S+)/, { en: (m) => `Two tables have a column called \`${m[1]}\`; say which one you mean, like \`s.${m[1].split('.').pop()}\`.`, es: (m) => `Dos tablas tienen una columna llamada \`${m[1]}\`; di cuál quieres, como \`s.${m[1].split('.').pop()}\`.` }],
  [/misuse of aggregate|aggregate functions are not allowed in the WHERE/, { en: () => 'Aggregates like COUNT or SUM cannot go in WHERE; filter groups with HAVING after GROUP BY.', es: () => 'Las funciones de agregado como COUNT o SUM no van en WHERE; filtra grupos con HAVING después de GROUP BY.' }],
  [/near "(.+?)": syntax error|incomplete input/, { en: (m) => `SQLite could not read the query${m[1] ? ` near \`${m[1]}\`` : ''}. Check the order SELECT … FROM … WHERE … GROUP BY … ORDER BY, commas between columns, and closing quotes.`, es: (m) => `SQLite no pudo leer la consulta${m[1] ? ` cerca de \`${m[1]}\`` : ''}. Revisa el orden SELECT … FROM … WHERE … GROUP BY … ORDER BY, las comas entre columnas y las comillas de cierre.` }],
  [/UNIQUE constraint failed|PRIMARY KEY/, { en: () => 'A row with that key already exists; each primary key value must be unique.', es: () => 'Ya existe una fila con esa clave; cada valor de clave primaria debe ser único.' }],
];
const JS_TIPS = [
  [/(\w+) is not defined/, { en: (m) => `JavaScript does not know \`${m[1]}\`. Check the spelling (capitals matter) and declare it with \`const\` or \`let\` first.`, es: (m) => `JavaScript no conoce \`${m[1]}\`. Revisa cómo está escrito (las mayúsculas importan) y declárala antes con \`const\` o \`let\`.` }],
  [/Cannot read properties of (undefined|null)/, { en: (m) => `Something is \`${m[1]}\` where you expected an object or array: maybe a missing \`return\`, a misspelled property, or an index past the end.`, es: (m) => `Algo es \`${m[1]}\` donde esperabas un objeto o arreglo: quizá falta un \`return\`, una propiedad está mal escrita o un índice se pasa del final.` }],
  [/is not a function/, { en: () => 'You called something that is not a function. Check the method name (for example `toUpperCase`, `forEach`) and that the value is the type you expect.', es: () => 'Llamaste a algo que no es una función. Revisa el nombre del método (por ejemplo `toUpperCase`, `forEach`) y que el valor sea del tipo que esperas.' }],
  [/Unexpected token|Unexpected end of input|missing \) after/, { en: () => 'JavaScript could not read the code: look for a missing `)`, `}` or quote.', es: () => 'JavaScript no pudo leer el código: busca un `)`, `}` o una comilla que falte.' }],
  [/Assignment to constant variable/, { en: () => 'A `const` cannot be given a new value; use `let` if it needs to change.', es: () => 'A una `const` no se le puede dar otro valor; usa `let` si necesita cambiar.' }],
];
const tipFrom = (list, text) => { for (const [re, msg] of list) { const m = String(text || '').match(re); if (m) return `<div class="err-tip">💡 ${fmt(msg[state.lang === 'es' ? 'es' : 'en'](m))}</div>`; } return ''; };
function pyTip(text) {
  const last = String(text || '').trim().split('\n').reverse().find((l) => /(Error|Exception)\b/.test(l)) || '';
  for (const [re, msg] of PY_TIPS) { const m = last.match(re); if (m) return `<div class="err-tip">💡 ${fmt(msg[state.lang === 'es' ? 'es' : 'en'](m))}</div>`; }
  return '';
}
function refreshChallengeHelp(i) {
  const id = state.chModule, ch = DATA.full[id].challenges[i], key = chKey(id, ch);
  const lock = $('#ch-' + i + ' .ch-lock');
  if (lock && (state.solved.has(key) || (state.chTries[key] || 0) >= 2)) lock.outerHTML = `<details><summary>${t('showSolution')}</summary><pre tabindex="0" class="code"><code>${esc(ch.solution)}</code></pre></details>`;
}
// SQL runs in the browser with sql.js (SQLite compiled to WebAssembly), loaded on first use. Each run
// starts from an empty database and prints results the same way the course examples do.
const SQLJS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/';
let sqlJs = null;
function loadSqlJs() {
  if (!sqlJs) sqlJs = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = SQLJS_URL + 'sql-wasm.js';
    s.onload = () => window.initSqlJs({ locateFile: (f) => SQLJS_URL + f }).then(resolve, reject);
    s.onerror = reject;
    document.head.append(s);
  }).catch((e) => { sqlJs = null; throw e; });
  return sqlJs;
}
function sqlTable(columns, rows) {
  const cells = rows.map((r) => r.map((v) => (v === null ? 'NULL' : String(v))));
  const widths = columns.map((c, i) => Math.max(c.length, ...cells.map((r) => r[i].length)));
  const line = '+' + widths.map((w) => '-'.repeat(w + 2)).join('+') + '+';
  const fmt = (vals) => '| ' + vals.map((v, i) => v.padEnd(widths[i])).join(' | ') + ' |';
  return [line, fmt(columns), line, ...cells.map(fmt), line].join('\n');
}
// Results are separated by blank lines; BEGIN/COMMIT/ROLLBACK lines sit directly under the line above.
function joinSqlParts(parts) {
  return parts.reduce((acc, p, i) => acc + (i === 0 ? '' : (typeof parts[i - 1] === 'object' ? '\n' : '\n\n')) + (typeof p === 'object' ? p.quiet : p), '');
}
async function runSql(code, out, status) {
  out.textContent = ''; status.textContent = t('sqlLoading');
  let SQL;
  try { SQL = await loadSqlJs(); } catch (e) { status.textContent = t('sqlFailed'); return; }
  const started = performance.now(), db = new SQL.Database(), parts = [];
  try {
    db.run('PRAGMA foreign_keys = ON');
    for (const stmt of db.iterateStatements(code)) {
      const text = stmt.getSQL().trim(), kw = text.replace(/^[(\s]+/, '').split(/[\s;]/)[0].toUpperCase();
      const shown = ['SELECT', 'WITH', 'UPDATE', 'DELETE', 'EXPLAIN', 'BEGIN', 'COMMIT', 'ROLLBACK'].includes(kw), quiet = ['BEGIN', 'COMMIT', 'ROLLBACK'].includes(kw);
      const rows = [];
      while (stmt.step()) rows.push(stmt.get());
      const cols = stmt.getColumnNames();
      stmt.free();
      if (!shown) continue;
      const lines = text.split('\n');
      let block = 'sqlite> ' + lines[0] + lines.slice(1).map((l) => '\n   ...> ' + l).join('') + '\n';
      if (kw === 'EXPLAIN') block += 'QUERY PLAN' + rows.map((r) => '\n`--' + r[r.length - 1]).join('');
      else if (cols.length) block += rows.length ? sqlTable(cols, rows) : '(no rows)';
      else if (!quiet) { const n = db.getRowsModified(); block += `(${n} row${n === 1 ? '' : 's'} ${kw === 'UPDATE' ? 'updated' : 'deleted'})`; }
      parts.push(quiet ? { quiet: block.trimEnd() } : block);
    }
    out.textContent = joinSqlParts(parts);
    status.textContent = t('pgDone', Math.round(performance.now() - started));
  } catch (e) {
    out.textContent = joinSqlParts(parts);
    out.insertAdjacentHTML('beforeend', (parts.length ? '\n\n' : '') + `<span class="err">Error: ${esc(e.message)}</span>` + tipFrom(SQL_TIPS, e.message));
    status.textContent = '';
  } finally { db.close(); }
  if (!out.textContent) out.innerHTML = `<span class="info">${t('pgEmpty')}</span>`;
}
function runPython(code, out, status) {
  const w = pythonWorker();
  out.textContent = '';
  status.textContent = pyReady ? t('running') : t('pyLoading');
  let started = performance.now(), timer = null;
  const arm = () => { started = performance.now(); clearTimeout(timer); timer = setTimeout(() => { w.terminate(); pyWorker = null; pyReady = false; finish(t('pyTimeout')); }, 10000); };
  let errText = '';
  const finish = (msg) => { clearTimeout(timer); w.removeEventListener('message', onMsg); if (!out.textContent) out.innerHTML = `<span class="info">${t('pgEmpty')}</span>`; if (errText) out.insertAdjacentHTML('beforeend', pyTip(errText)); status.textContent = msg; };
  const onMsg = (e) => {
    const m = e.data;
    if (m.t === 'err') errText += m.v + '\n';
    if (m.t === 'ready') { status.textContent = t('running'); arm(); }
    else if (m.t === 'fail') { w.terminate(); pyWorker = null; finish(t('pyFailed')); }
    else if (m.t === 'done') finish(t('pgDone', Math.round(performance.now() - started)));
    else out.insertAdjacentHTML('beforeend', m.t === 'err' ? `<span class="err">${esc(m.v)}</span>\n` : esc(m.v) + '\n');
  };
  w.addEventListener('message', onMsg);
  w.onerror = (e) => { e.preventDefault(); w.terminate(); pyWorker = null; finish(t('pyFailed')); };
  if (pyReady) arm();
  w.postMessage(code);
}
function viewNotes() {
  const ids = liveIds();
  if (!state.noteModule) state.noteModule = nextModule() || ids[0];
  const id = state.noteModule, text = state.notes[id] || '';
  const words = (x) => (x.trim() ? x.trim().split(/\s+/).length : 0);
  const hasNotes = Object.entries(state.notes).some(([k, v]) => v && v.trim() && DATA.modules[k]);
  return `<section class="wrap"><div class="page-head"><h1>${t('notes')}</h1>${hasNotes ? `<button class="btn btn-ghost btn-sm" data-action="notes-download">⤓ ${t('notesDownload')}</button>` : ''}</div><p class="lead">${state.user ? t('notesLeadIn') : t('notesLead')}</p>
    <div class="notes" style="margin-top:22px"><div class="card notes-list">${orderedTracks().map((tr) => `<div class="notes-course">${esc(L(tr.title))}</div>` + trackIds(tr.id).map((m) => `<button data-action="note-pick" data-id="${m}" aria-pressed="${m === id}">${dot(m)}<span>${esc(moduleTitle(m))}</span>${state.notes[m] ? `<span class="n">${words(state.notes[m])}</span>` : ''}</button>`).join('')).join('')}</div>
      <div class="card note-editor"><select class="select note-pick" id="note-module" aria-label="${t('module')}">${moduleOptions(id)}</select><div class="row-top"><b>${t('notesFor')} ${esc(moduleTitle(id))}</b><a class="muted" href="#m-${id}">${t('module')} →</a></div>
        <textarea id="note-text" placeholder="${t('notePlaceholder')}">${esc(text)}</textarea>
        <div class="muted" id="note-status">${text ? `${state.user ? t('savedAccount') : t('savedDevice')} · ${words(text)} ${t('words')}` : ''}</div></div></div></section>`;
}
function allTerms() {
  const out = [];
  liveIds().filter((id) => state.glossCourse === 'all' || DATA.modules[id].track === state.glossCourse).forEach((id) => ((DATA.glossary || {})[id] || DATA.full[id]?.definitions || []).forEach((d) => out.push({ id, term: L(d.term), def: L(d.definition) })));
  return out.sort((a, b) => a.term.localeCompare(b.term, state.lang));
}
function glossaryGrid() {
  const q = state.glossQuery.toLowerCase();
  const list = allTerms().filter((x) => (state.glossLetter === 'all' || x.term[0].toUpperCase() === state.glossLetter) && (!q || x.term.toLowerCase().includes(q) || x.def.toLowerCase().includes(q)));
  return list.length ? list.map((x) => `<div class="card term"><h2 class="h3">${esc(x.term)}</h2><p>${fmt(x.def)}</p><a class="from" href="#m-${x.id}">${esc(t('fromModule', moduleTitle(x.id)))}</a></div>`).join('') : `<p class="muted">${t('noResults')}</p>`;
}
function viewGlossary() {
  const terms = allTerms(), have = new Set(terms.map((x) => x.term[0].toUpperCase()));
  return `<section class="wrap"><h1>${t('glossary')}</h1><p class="lead">${t('glossaryLead', terms.length)}</p>
    <div class="toolbar"><input class="input" id="gloss-q" type="search" placeholder="${t('filterTerms')}" value="${esc(state.glossQuery)}" aria-label="${t('filterTerms')}">
      <select class="select" id="gloss-course" aria-label="${t('course')}"><option value="all">${t('allCourses')}</option>${orderedTracks().map((tr) => `<option value="${tr.id}" ${state.glossCourse === tr.id ? 'selected' : ''}>${esc(L(tr.title))}</option>`).join('')}</select></div>
    <div class="letters"><button data-action="gloss-letter" data-v="all" aria-pressed="${state.glossLetter === 'all'}">${t('all')}</button>${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((c) => `<button data-action="gloss-letter" data-v="${c}" aria-pressed="${state.glossLetter === c}" ${have.has(c) ? '' : 'disabled'}>${c}</button>`).join('')}</div>
    <div class="terms" id="gloss-grid">${glossaryGrid()}</div></section>`;
}
const ROADMAP = [
  ['live', 'java', { en: 'Full Java course', es: 'Curso completo de Java' }, { en: '13 modules with lessons, examples in 4 languages, practice and quizzes.', es: '13 módulos con lecciones, ejemplos en 4 lenguajes, práctica y cuestionarios.' }, ['Courses']],
  ['live', 'beginner-path', { en: 'The complete beginner path', es: 'La ruta completa para principiantes' }, { en: 'Nine courses from zero: Python, Command Line, Git, Web Basics, SQL, How Computers Work, Cybersecurity, AI Fundamentals and Discrete Math, each with lessons, runnable examples, quizzes and videos.', es: 'Nueve cursos desde cero: Python, Línea de comandos, Git, Web básica, SQL, Cómo funcionan las computadoras, Ciberseguridad, Fundamentos de IA y Matemáticas discretas, cada uno con lecciones, ejemplos ejecutables, cuestionarios y videos.' }, ['Courses']],
  ['live', 'git', { en: 'Git course', es: 'Curso de Git' }, { en: '2 modules taught through real terminal sessions, each one run with real Git to record its output.', es: '2 módulos enseñados con sesiones reales de terminal, cada una ejecutada con Git real para grabar su salida.' }, ['Courses']],
  ['live', 'discrete', { en: 'Discrete Math course', es: 'Curso de Matemáticas discretas' }, { en: 'Logic, sets, counting and graph theory, with every idea checked by code in 4 languages.', es: 'Lógica, conjuntos, conteo y teoría de grafos, con cada idea comprobada con código en 4 lenguajes.' }, ['Courses']],
  ['live', 'networks', { en: 'Computer Networks course', es: 'Curso de Redes de computadoras' }, { en: '4 modules from packets to the web: IP and routing, TCP and UDP, DNS, HTTP and HTTPS, each simulated in runnable Python.', es: '4 módulos de los paquetes a la web: IP y enrutamiento, TCP y UDP, DNS, HTTP y HTTPS, cada uno simulado en Python ejecutable.' }, ['Courses']],
  ['live', 'dsa', { en: 'Data Structures & Algorithms course', es: 'Curso de estructuras de datos y algoritmos' }, { en: '21 modules from arrays to string algorithms, with run-verified examples in Java and Python and complexity analysis throughout.', es: '21 módulos, de arreglos a algoritmos de cadenas, con ejemplos verificados en Java y Python y análisis de complejidad en todo momento.' }, ['Courses']],
  ['live', 'bilingual', { en: 'English and Spanish everywhere', es: 'Inglés y español en todo' }, { en: 'Every lesson, quiz and menu in both languages.', es: 'Cada lección, cuestionario y menú en ambos idiomas.' }, ['Access']],
  ['live', 'js-playground', { en: 'Playground for Python, JavaScript, SQL and web pages', es: 'Editor para Python, JavaScript, SQL y páginas web' }, { en: 'Run Python, JavaScript, SQL and HTML right in your browser; every example has a Try it button.', es: 'Ejecuta Python, JavaScript, SQL y HTML en tu navegador; cada ejemplo tiene un botón Pruébalo.' }, ['Tools']],
  ['live', 'exercises', { en: 'Auto-graded coding challenges', es: 'Retos de código con calificación automática' }, { en: 'Python, command-line, Git, SQL, HTML, CSS and JavaScript challenges in every beginner course, checked instantly in your browser.', es: 'Retos de Python, línea de comandos, Git, SQL, HTML, CSS y JavaScript en cada curso para principiantes, revisados al instante en tu navegador.' }, ['Practice']],
  ['live', 'offline', { en: 'Install and study offline', es: 'Instalar y estudiar sin conexión' }, { en: 'Add the site to your home screen. Lessons you have opened, and the Python and SQL runners, keep working without internet.', es: 'Agrega el sitio a tu pantalla de inicio. Las lecciones que abriste y los ejecutores de Python y SQL siguen funcionando sin internet.' }, ['Access']],
  ['live', 'srs', { en: 'Spaced-repetition review', es: 'Repaso con repetición espaciada' }, { en: 'Flashcards you know come back after 1, 3, 7, 16 and 35 days, right before you would forget them.', es: 'Las tarjetas que sabes vuelven después de 1, 3, 7, 16 y 35 días, justo antes de que las olvides.' }, ['Practice']],
  ['live', 'certificates', { en: 'Course certificates', es: 'Certificados de curso' }, { en: 'Finish every module and pass every quiz to earn a certificate you can print or save as a PDF.', es: 'Completa todos los módulos y aprueba cada cuestionario para obtener un certificado que puedes imprimir o guardar como PDF.' }, ['Account']],
  ['live', 'visualizers', { en: 'Step-through visualizer for Python', es: 'Visualizador paso a paso para Python' }, { en: 'In the playground, step through any Python program line by line and watch each variable and function call change.', es: 'En el editor, recorre cualquier programa de Python línea por línea y mira cómo cambian cada variable y cada llamada a función.' }, ['Tools']],
  ['live', 'interview', { en: 'Timed quizzes', es: 'Cuestionarios con tiempo' }, { en: '30 seconds per question, on one module or a mixed review of everything you have finished, like a real test.', es: '30 segundos por pregunta, en un módulo o en un repaso mixto de todo lo que terminaste, como en un examen real.' }, ['Practice']],
  ['live', 'sync', { en: 'Accounts and progress sync', es: 'Cuentas y progreso sincronizado' }, { en: 'Google or email sign-in; progress follows you between devices.', es: 'Inicio con Google o correo; tu progreso te sigue entre dispositivos.' }, ['Account']],
  ['live', 'runner', { en: 'Run Java and C++', es: 'Ejecutar Java y C++' }, { en: 'Real compilers (javac and Clang) run inside your browser, so every Java and C++ example opens in the playground and runs. Your code never leaves your device.', es: 'Compiladores reales (javac y Clang) corren dentro de tu navegador, así que cada ejemplo de Java y C++ se abre en el editor y se ejecuta. Tu código nunca sale de tu dispositivo.' }, ['Tools']],
  ['live', 'redesign', { en: 'New design on every device', es: 'Nuevo diseño en todos los dispositivos' }, { en: 'This design: faster, clearer, with a real phone layout and dark mode.', es: 'Este diseño: más rápido, más claro, con versión para teléfono y modo oscuro.' }, ['Design']],
  ['building', 'more-courses', { en: 'x86-64 Assembly', es: 'Ensamblador x86-64' }, { en: 'Rewritten to the same standard as Java, one course at a time.', es: 'Reescritos con el mismo nivel que Java, un curso a la vez.' }, ['Courses']],
  ['planned', 'tutor', { en: 'Hints from an AI tutor', es: 'Pistas de un tutor con IA' }, { en: 'Ask about any line of an example and get a hint, not the full answer.', es: 'Pregunta por cualquier línea de un ejemplo y recibe una pista, no la respuesta.' }, ['Learning']],
  ['planned', 'classrooms', { en: 'Classrooms for teachers', es: 'Aulas para docentes' }, { en: 'Assign modules, see class progress and quiz results.', es: 'Asigna módulos y ve el progreso y los resultados de la clase.' }, ['Teaching']],
  ['planned', 'discussions', { en: 'Questions on every module', es: 'Preguntas en cada módulo' }, { en: 'Ask and answer questions under each lesson.', es: 'Haz y responde preguntas debajo de cada lección.' }, ['Community']]
];
function viewRoadmap() {
  const col = (status, label) => { const items = ROADMAP.filter((r) => r[0] === status);
    return `<div class="road-col"><h2><span class="pill ${status === 'live' ? 'ok' : status === 'building' ? 'accent' : ''}">${label}</span><span class="count">${items.length}</span></h2>
      ${items.map(([st, id, title, desc, tags]) => `<div class="card feat"><h3>${esc(L(title))}</h3><p>${esc(L(desc))}</p><div class="tags">${tags.map((x) => `<span class="pill">${esc(x)}</span>`).join('')}</div>
        ${st !== 'live' ? `<button class="vote" data-action="vote" data-id="${id}" aria-pressed="${state.votes.has(id)}">${state.votes.has(id) ? t('voted') : t('vote')}</button>` : ''}</div>`).join('')}</div>`; };
  return `<section class="wrap" style="max-width:1200px"><h1>${t('roadmap')}</h1><p class="lead">${t('roadmapLead')}</p>
    <div class="road" style="margin-top:24px">${col('live', t('live'))}${col('building', t('building'))}${col('planned', t('planned'))}</div></section>`;
}
function achievements() {
  const d = state.done.size, lt = liveTracks();
  const unitDone = lt.some((tr) => tr.units.some((u) => u.modules.every((m) => state.done.has(m))));
  const courseShare = (tr) => trackIds(tr.id).filter((m) => state.done.has(m)).length / trackIds(tr.id).length;
  const en = state.lang === 'en';
  return [
    ['✓', en ? 'First module' : 'Primer módulo', en ? 'Complete any module' : 'Completa un módulo', d >= 1],
    ['◆', en ? 'Unit cleared' : 'Unidad completa', en ? 'Finish a whole unit' : 'Termina una unidad', unitDone],
    ['½', en ? 'Halfway' : 'A la mitad', en ? 'Half of any course' : 'La mitad de un curso', lt.some((tr) => courseShare(tr) >= 0.5)],
    ['★', en ? 'Course graduate' : 'Curso terminado', en ? 'Every module of a course' : 'Todos los módulos de un curso', lt.some((tr) => courseShare(tr) === 1)],
    ['⑂', en ? 'Two courses' : 'Dos cursos', en ? 'Complete a module in two courses' : 'Completa un módulo en dos cursos', lt.filter((tr) => courseShare(tr) > 0).length >= 2],
    ['100', en ? 'Perfect quiz' : 'Cuestionario perfecto', en ? 'Score 5/5 on a quiz' : 'Saca 5/5', state.aces.size >= 1],
    ['4', en ? 'Polyglot' : 'Políglota', en ? 'View code in all 4 languages' : 'Ve código en los 4 lenguajes', state.langsSeen.size >= 4],
    ['✎', en ? 'Note taker' : 'Toma notas', en ? 'Write your first note' : 'Escribe tu primera nota', Object.values(state.notes).some((x) => x && x.trim())],
    ['5', en ? '5-day streak' : 'Racha de 5 días', en ? 'Study 5 days in a row' : 'Estudia 5 días seguidos', streakDays() >= 5],
    ['{ }', en ? 'First challenge' : 'Primer reto', en ? 'Solve a coding challenge' : 'Resuelve un reto de código', state.solved.size >= 1],
    ['10', en ? 'Problem solver' : 'Resuelve problemas', en ? 'Solve 10 challenges' : 'Resuelve 10 retos', state.solved.size >= 10],
    ['⟳', en ? 'It stuck' : 'Se quedó', en ? 'Remember 10 cards in a later review' : 'Recuerda 10 tarjetas en un repaso posterior', Object.values(state.cardBox).filter((c) => c.b >= 2).length >= 10],
    ['🎓', en ? 'Certified' : 'Certificado', en ? 'Earn a course certificate' : 'Obtén un certificado de curso', Object.keys(state.certs).length >= 1]
  ];
}

function vidCard(v, isList) {
  if (!v) return '';
  const url = isList ? `https://www.youtube.com/playlist?list=${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;
  const meta = [v.channel, isList && v.count ? t('videoCount', v.count) : v.length].filter(Boolean).join(' · ');
  return `<a class="card vid" href="${url}" target="_blank" rel="noopener"><span class="play${isList ? ' list' : ''}">${isList ? '☰' : '▶'}</span><span class="vt"><b>${esc(v.title)}</b><span>${esc(meta)}</span></span><span class="ext">${t('onYoutube')} ↗</span></a>`;
}
function waitGroups(tr) {
  const groups = new Map();
  tr.units.flatMap((u) => u.modules).forEach((m) => { const v = modVideos(m)?.series; if (!v) return; if (!groups.has(v.id)) groups.set(v.id, { v, mods: [] }); groups.get(v.id).mods.push(m); });
  return [...groups.values()];
}
const modVideos = (id) => (DATA.videos && DATA.videos.modules[id]) || null;
// The module's own series, or the whole course's series when the module has none yet.
const seriesFor = (id) => modVideos(id)?.series || DATA.videos?.courses?.[DATA.modules[id]?.track] || null;
const planTrack = () => (state.plan.track === 'path' || track(state.plan.track)?.status === 'available' ? state.plan.track : currentTrack());
// The plan covers one course, or the whole beginner path in order.
const planIds = () => (planTrack() === 'path' ? pathTracks().flatMap((tr) => trackIds(tr.id)) : trackIds(planTrack()));
const planTitle = () => (planTrack() === 'path' ? t('wholePath') : L(track(planTrack()).title));
function buildPlan() {
  const cap = Math.max(1, Number(state.plan.hours)) * 60, left = planIds().filter((id) => !state.done.has(id));
  const weeks = []; let cur = { mods: [], used: 0 };
  left.forEach((id) => { const m = DATA.modules[id].minutes || 90; if (cur.mods.length && cur.used + m > cap) { weeks.push(cur); cur = { mods: [], used: 0 }; } cur.mods.push(id); cur.used += m; });
  if (cur.mods.length) weeks.push(cur);
  const start = new Date((state.plan.start || new Date().toISOString().slice(0, 10)) + 'T12:00:00');
  weeks.forEach((w, i) => { w.from = new Date(start.getTime() + i * 7 * 864e5); w.to = new Date(w.from.getTime() + 6 * 864e5); });
  return { weeks, left, finish: weeks.length ? weeks[weeks.length - 1].to : null };
}
const fmtDate = (d, opts = { month: 'short', day: 'numeric' }) => new Intl.DateTimeFormat(state.lang === 'es' ? 'es' : 'en', opts).format(d);
function viewPlan() {
  const p = buildPlan();
  return `<section class="wrap"><h1>${t('studyPlan')}</h1><p class="lead">${t('planLead')}</p>
    <div class="card plan-controls">
      <div class="field"><label for="plan-track">${t('course')}</label><select class="select" id="plan-track"><option value="path" ${planTrack() === 'path' ? 'selected' : ''}>${t('wholePath')}</option>${orderedTracks().map((tr) => `<option value="${tr.id}" ${tr.id === planTrack() ? 'selected' : ''}>${esc(L(tr.title))}</option>`).join('')}</select></div>
      <div class="field"><label for="plan-hours">${t('hoursWeek')}</label><select class="select" id="plan-hours">${[2, 3, 4, 6, 8, 10, 15].map((h) => `<option value="${h}" ${Number(state.plan.hours) === h ? 'selected' : ''}>${h} h</option>`).join('')}</select></div>
      <div class="field"><label for="plan-start">${t('startOn')}</label><input class="select" id="plan-start" type="date" value="${state.plan.start}"></div>
      ${p.weeks.length ? `<button class="btn btn-ghost" style="margin-left:auto" data-action="calendar">${t('addCalendar')} ↓</button>` : ''}
    </div>
    ${p.weeks.length ? `<div class="plan-summary"><div><b>${fmtDate(p.finish, { month: 'long', day: 'numeric', year: 'numeric' })}</b><span>${t('finishBy')}</span></div><div><b>${p.weeks.length}</b><span>${p.weeks.length === 1 ? t('week1') : t('weeksLeft')}</span></div><div><b>${p.left.length}</b><span>${t('modulesLeft')}</span></div></div>
    <div class="weeks">${p.weeks.map((w, i) => `<div class="card week-card${i === 0 ? ' now' : ''}"><div class="wk"><b>${i === 0 ? t('thisWeek') : t('weekN', i + 1)}</b><span>${fmtDate(w.from)} – ${fmtDate(w.to)}</span></div>
      <div class="mods">${w.mods.map((m) => `<a href="#m-${m}">${planTrack() === 'path' ? `<span class="cmark mini" data-track="${DATA.modules[m].track}">${esc(track(DATA.modules[m].track).icon)}</span>` : ''}${esc(moduleTitle(m))}</a>`).join('')}</div><span class="load">${Math.round(w.used / 6) / 10} h</span></div>`).join('')}</div>`
      : `<div class="notice" style="background:var(--success-soft)"><p>${t('allDone')}</p></div>`}</section>`;
}
/* ---------- Accounts and sync ----------
 * The API lives on Render (js/app-config.js sets the base URL on the public hosts; locally it is
 * the same origin). Browsers often block the API's cookie because it is on another site, so the
 * session token is also kept here and sent as a Bearer header: that is what keeps people signed in.
 * Progress is stored under the `atlas` key of /api/user-state; other keys there are left untouched. */
const API = (window.__APP_CONFIG && window.__APP_CONFIG.apiBaseUrl) || '';
// Java programs (CheerpJ) run on this page and make their HTTP requests with window.fetch. Only api() below, which
// marks its requests with a private symbol, may reach the account server, so a Java program can never call it.
const APP_FETCH = Symbol('app-fetch');
(() => {
  const nativeFetch = window.fetch.bind(window), apiOrigins = new Set([new URL(API || location.origin).origin, 'https://cs-course-atlas-api.onrender.com']);
  const isApi = (u) => { try { const url = new URL(String(u && u.url || u), location.href); return apiOrigins.has(url.origin) && url.pathname.includes('/api/'); } catch (e) { return false; } };
  window.fetch = (input, init) => (isApi(input) && !(init && init[APP_FETCH]) ? Promise.reject(new TypeError('Blocked: only the site may call its account server.')) : nativeFetch(input, init));
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url, ...rest) { if (isApi(url)) throw new TypeError('Blocked: only the site may call its account server.'); return open.call(this, method, url, ...rest); };
})();
const auth = { token: store.get('session', ''), csrf: '', providers: null };
async function api(path, opts = {}) {
  const headers = { Accept: 'application/json' };
  if (opts.body) headers['Content-Type'] = 'application/json';
  if (auth.token) headers.Authorization = 'Bearer ' + auth.token;
  if (auth.csrf && opts.method && opts.method !== 'GET') headers['X-CSRF-Token'] = auth.csrf;
  const ctrl = new AbortController(), timer = setTimeout(() => ctrl.abort(), opts.timeout || 45000); // Render can take ~30 s to wake
  try {
    const r = await fetch(API + path, { method: opts.method || 'GET', headers, credentials: 'include', body: opts.body ? JSON.stringify(opts.body) : undefined, signal: ctrl.signal, [APP_FETCH]: true });
    let data = null; try { data = await r.json(); } catch (e) { /* not JSON */ }
    if (!r.ok) { const err = new Error((data && data.error) || `HTTP ${r.status}`); err.status = r.status; throw err; }
    return data || {};
  } finally { clearTimeout(timer); }
}
function applySession(d) {
  if (d && d.authenticated && d.user) {
    state.user = d.user; if (d.csrfToken) auth.csrf = d.csrfToken;
    if ('emailConfirmation' in d) auth.emailConfirmation = Boolean(d.emailConfirmation);
    if (d.sessionToken) { auth.token = d.sessionToken; store.set('session', auth.token); }
    return true;
  }
  return false;
}
function clearSession() { state.user = null; auth.token = ''; auth.csrf = ''; remoteState = null; store.set('session', ''); }
let remoteState = null, syncTimer = null;
function mergeProgress(a) {
  const union = (key) => (a[key] || []).forEach((x) => state[key].add(x));
  ['done', 'notified', 'aces', 'langsSeen', 'votes', 'cardsKnown', 'solved'].forEach(union);
  Object.entries(a.notes || {}).forEach(([k, v]) => { if (v && !(state.notes[k] || '').trim()) state.notes[k] = v; });
  Object.entries(a.certs || {}).forEach(([k, v]) => { if (v && (!state.certs[k] || v < state.certs[k])) state.certs[k] = v; });
  Object.entries(a.cardBox || {}).forEach(([k, v]) => { if (v && (!state.cardBox[k] || (v.at || 0) > (state.cardBox[k].at || 0))) state.cardBox[k] = v; });
  Object.entries(a.quizBest || {}).forEach(([k, v]) => { state.quizBest[k] = Math.max(v, state.quizBest[k] || 0); });
  const seen = new Set(state.activity.map((x) => `${x.kind}|${x.id}|${x.at}`));
  (a.activity || []).forEach((x) => { if (!seen.has(`${x.kind}|${x.id}|${x.at}`)) state.activity.push(x); });
  state.activity.sort((x, y) => x.at - y.at);
  if (a.plan && !store.get('planTouched', false)) state.plan = a.plan;
  if (a.codeLang && !store.get('codeLangTouched', false)) state.codeLang = a.codeLang;
}
async function pullProgress() {
  try {
    const r = await api('/api/user-state');
    remoteState = r.state && typeof r.state === 'object' && !Array.isArray(r.state) ? r.state : {};
    if (remoteState.atlas) mergeProgress(remoteState.atlas);
    save(); await pushProgress();
  } catch (e) { if (e.status === 401) clearSession(); }
}
function scheduleSync() { if (!state.user) return; clearTimeout(syncTimer); syncTimer = setTimeout(pushProgress, 1200); }
async function pushProgress() {
  if (!state.user) return;
  clearTimeout(syncTimer);
  try {
    await api('/api/user-state', { method: 'PUT', body: { state: { ...(remoteState || {}), atlas: { ...progressSnapshot(), updatedAt: Date.now() } } } });
    state.syncedAt = Date.now();
  } catch (e) { if (e.status === 401) { clearSession(); render(true); } state.syncedAt = null; }
  const pill = $('#sync-pill'); if (pill) pill.textContent = syncLabel();
}
const syncLabel = () => (state.syncedAt ? t('syncedAt', new Intl.DateTimeFormat(state.lang, { hour: 'numeric', minute: '2-digit' }).format(state.syncedAt)) : t('syncPending'));
// Google shows until the server says it is off (it is the usual way in); GitHub shows only once the server says it is on.
const GITHUB_MARK = '<svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';
function oauthButtons() {
  const p = auth.providers || {}, google = p.google?.enabled !== false, github = p.github?.enabled === true;
  return (google ? `<button type="button" class="btn-google" data-action="oauth" data-v="google"><b>G</b>${t('google')}</button>` : '')
    + (github ? `<button type="button" class="btn-google btn-github" data-action="oauth" data-v="github">${GITHUB_MARK}${t('github')}</button>` : '');
}
// Updates just the provider buttons, so whatever someone is typing in the form stays put.
function refreshOAuthButtons() {
  const wrap = $('#google-wrap'); if (!wrap) return;
  wrap.querySelectorAll('.btn-google').forEach((b) => b.remove());
  wrap.insertAdjacentHTML('afterbegin', oauthButtons());
  wrap.hidden = !wrap.querySelector('.btn-google');
}
function startOAuth(provider) {
  const back = location.origin + location.pathname + (location.hash && location.hash !== '#profile' ? location.hash : '#home');
  location.href = `${API}/api/auth/oauth/${provider}/start?returnTo=${encodeURIComponent(back)}`;
}
async function initAuth() {
  const url = new URL(location.href), q = url.searchParams;
  const ticket = q.get('oauth_ticket'), oauth = q.get('oauth');
  if (oauth || ticket) { ['oauth', 'oauth_provider', 'oauth_ticket', 'oauth_error'].forEach((k) => q.delete(k)); history.replaceState(null, '', url.pathname + url.search + url.hash); }
  api('/api/auth/oauth/providers', { timeout: 20000 }).then((r) => { auth.providers = r.providers || null; refreshOAuthButtons(); }).catch(() => {});
  if (ticket) { try { applySession(await api('/api/auth/oauth/exchange-ticket', { method: 'POST', body: { ticket } })); } catch (e) { /* fall back to the cookie below */ } }
  if (!state.user && (auth.token || ticket || oauth || store.get('hadSession', false))) {
    try { if (!applySession(await api('/api/auth/session'))) clearSession(); } catch (e) { if (e.status === 401) clearSession(); }
  }
  state.authReady = true;
  store.set('hadSession', Boolean(state.user));
  if (oauth === 'error' || (oauth === 'success' && !state.user)) toast(t('signinFailed'));
  else if (oauth === 'success') toast(t('welcome', state.user.name || state.user.username || ''));
  if (state.user) await pullProgress();
  render(true);
}
function renderSignIn(err) {
  if (state.signinMode === 'recover') return renderRecover(err);
  const signup = state.signinMode === 'signup';
  const tab = (mode, label) => `<button type="button" role="tab" class="auth-tab" data-action="signin-mode" data-v="${mode}" aria-selected="${state.signinMode === mode}">${label}</button>`;
  const pw = (id, label, ac, hint) => `<div class="field"><label for="${id}">${label}</label><div class="pw-wrap"><input id="${id}" type="password" autocomplete="${ac}" required${signup ? ' minlength="8" maxlength="128"' : ''}><button type="button" class="pw-eye" data-action="pw-eye" data-v="${id}" aria-label="${t('showPw')}">${t('show')}</button></div>${hint ? `<small class="hint">${hint}</small>` : ''}</div>`;
  $('#signin-form').innerHTML = `
    <div class="signin-top"><div class="auth-tabs" role="tablist">${tab('login', t('signIn'))}${tab('signup', t('create'))}</div><button type="button" class="icon-btn" data-action="close-signin" aria-label="Close">✕</button></div>
    <h2 id="signin-title" class="sr-only">${signup ? t('create') : t('signinTitle')}</h2>
    <p class="muted" style="margin:0">${signup ? t('signupSub') : t('signinSub')}</p>
    <div id="google-wrap" class="google-wrap"${oauthButtons() ? '' : ' hidden'}>${oauthButtons()}<div class="or">${signup ? t('orSignupEmail') : t('orEmail')}</div></div>
    <div class="field"><label for="si-email">${signup ? t('email') : t('emailOrUser')}</label><input id="si-email" name="email" type="${signup ? 'email' : 'text'}" autocomplete="${signup ? 'email' : 'username'}" required></div>
    ${signup ? `<div class="field"><label for="si-user">${t('username')}</label><input id="si-user" name="username" autocomplete="username" minlength="3" maxlength="32" pattern="[A-Za-z0-9._\\-]+" required><small class="hint">${t('userHint')}</small></div>` : ''}
    ${pw('si-pass', t('password'), signup ? 'new-password' : 'current-password', signup ? t('pwHint') : '')}
    ${signup ? pw('si-pass2', t('confirmPw'), 'new-password', '') : ''}
    <div class="form-error" id="signin-error" role="alert">${err ? esc(err) : ''}</div>
    <button type="submit" class="btn" style="height:44px" id="signin-submit">${signup ? t('createFree') : t('signIn')}</button>
    ${signup ? '' : `<div class="signin-foot"><button type="button" class="link-btn" data-action="signin-mode" data-v="recover">${t('forgot')}</button></div>`}
    <p class="legal">${t('legal')}</p>`;
}
// Forgot password: a one-time recovery code (shown at sign-up, or made on the Account page) sets a new password.
function renderRecover(err) {
  const pw = (id, label, ac, hint) => `<div class="field"><label for="${id}">${label}</label><div class="pw-wrap"><input id="${id}" type="password" autocomplete="${ac}" required minlength="8" maxlength="128"><button type="button" class="pw-eye" data-action="pw-eye" data-v="${id}" aria-label="${t('showPw')}">${t('show')}</button></div>${hint ? `<small class="hint">${hint}</small>` : ''}</div>`;
  $('#signin-form').innerHTML = `
    <div class="signin-top"><button type="button" class="link-btn" data-action="signin-mode" data-v="login">← ${t('backToSignIn')}</button><button type="button" class="icon-btn" data-action="close-signin" aria-label="Close">✕</button></div>
    <h2 id="signin-title" class="recover-title">${t('recoverTitle')}</h2>
    <p class="muted" style="margin:0">${t('recoverSub')}</p>
    <div class="field"><label for="si-email">${t('emailOrUser')}</label><input id="si-email" name="email" type="text" autocomplete="username" required></div>
    <div class="field"><label for="si-code">${t('recoveryCode')}</label><input id="si-code" class="code-input" name="code" autocomplete="one-time-code" autocapitalize="characters" spellcheck="false" maxlength="40" required><small class="hint">${t('codeHint')}</small>${auth.emailConfirmation !== false ? `<button type="button" class="link-btn email-code-btn" data-action="recover-email">✉ ${t('emailMeCode')}</button><small class="hint form-ok" id="recover-email-status" role="status"></small>` : ''}</div>
    ${pw('si-pass', t('newPw'), 'new-password', t('pwHint'))}
    ${pw('si-pass2', t('confirmPw'), 'new-password', '')}
    <div class="form-error" id="signin-error" role="alert">${err ? esc(err) : ''}</div>
    <button type="submit" class="btn" style="height:44px" id="signin-submit">${t('recoverBtn')}</button>
    <div class="signin-foot"><span>${t('noCode')} <a href="contact-support.html">${t('contactUs')}</a></span></div>`;
}
// Shows a fresh set of recovery codes once, with copy and download.
function showRecoveryCodes(codes) {
  let d = $('#rc-dialog');
  if (!d) { d = document.createElement('dialog'); d.id = 'rc-dialog'; d.className = 'rc-dialog'; d.setAttribute('aria-labelledby', 'rc-title'); document.body.append(d); }
  const text = `${t('rcFileHead')}\n${state.user ? (state.user.email || state.user.username || '') : ''}\n\n${codes.join('\n')}\n\n${t('rcFileUse')}\n`;
  d.innerHTML = `<div class="rc-head"><span class="rc-icon" aria-hidden="true">🔑</span><h2 id="rc-title">${t('rcSaveTitle')}</h2></div>
    <p class="muted">${t('rcSaveText')}</p>
    <ol class="rc-codes">${codes.map((c) => `<li><code>${esc(c)}</code></li>`).join('')}</ol>
    <div class="rc-actions"><button type="button" class="btn btn-sm btn-ghost" data-rc="copy">${t('rcCopy')}</button><button type="button" class="btn btn-sm btn-ghost" data-rc="download">${t('rcDownload')}</button><button type="button" class="btn btn-sm" data-rc="done">${t('rcDone')}</button></div>`;
  d.onclick = async (e) => {
    const b = e.target.closest('[data-rc]'); if (!b) return;
    if (b.dataset.rc === 'copy') { try { await navigator.clipboard.writeText(text); toast(t('rcCopied')); } catch (err) { /* clipboard blocked: the codes are still on screen */ } }
    else if (b.dataset.rc === 'download') { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' })); a.download = 'cs-course-atlas-recovery-codes.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); }
    else { d.close(); if ($('#rc-section')) loadRecoveryLeft(); }
  };
  d.oncancel = (e) => e.preventDefault(); // closed only on purpose, so nobody loses the codes by pressing Esc
  if (!d.open) d.showModal();
  d.querySelector('[data-rc="done"]').focus();
}
async function loadRecoveryLeft() {
  const box = $('#rc-left'); if (!box) return;
  try {
    const r = await api('/api/profile/recovery-codes');
    box.className = 'rc-left' + (r.left <= 2 ? ' low' : '');
    box.textContent = r.left ? `${t('rcLeft', r.left, r.total)}${r.left <= 2 ? ' ' + t('rcLow') : ''}` : t('rcNone');
  } catch (e) { box.textContent = ''; if (e.status === 404 && $('#rc-form')) $('#rc-form').hidden = true; } // server not updated yet
}
async function makeRecoveryCodes() {
  const status = $('#rc-status');
  status.className = 'form-status'; status.textContent = t('working');
  try {
    const r = await api('/api/profile/recovery-codes', { method: 'POST', body: { currentPassword: $('#rc-pass').value } });
    $('#rc-form').reset(); status.textContent = ''; showRecoveryCodes(r.recoveryCodes);
  } catch (e) { status.className = 'form-status err'; status.textContent = e.message; }
}
const USERNAME_RE = /^[A-Za-z0-9._-]{3,32}$/;
async function submitSignIn() {
  const signup = state.signinMode === 'signup', recover = state.signinMode === 'recover', v = (id) => ($('#' + id) ? $('#' + id).value : '');
  const btn = $('#signin-submit'), errBox = $('#signin-error');
  if (recover && v('si-pass').length < 8) { errBox.textContent = t('pwHint'); $('#si-pass').focus(); return; }
  if (recover && v('si-pass') !== v('si-pass2')) { errBox.textContent = t('pwMismatch'); $('#si-pass2').focus(); return; }
  if (signup && !USERNAME_RE.test(v('si-user'))) { errBox.textContent = t('userHint'); $('#si-user').focus(); return; }
  if (signup && v('si-pass').length < 8) { errBox.textContent = t('pwHint'); $('#si-pass').focus(); return; }
  if (signup && v('si-pass') !== v('si-pass2')) { errBox.textContent = t('pwMismatch'); $('#si-pass2').focus(); return; }
  btn.disabled = true; btn.textContent = t('working'); errBox.textContent = '';
  try {
    const d = recover ? await api('/api/auth/recover', { method: 'POST', body: { email: v('si-email'), code: v('si-code'), newPassword: v('si-pass'), confirmPassword: v('si-pass2') } })
      : signup ? await api('/api/auth/signup', { method: 'POST', body: { email: v('si-email'), username: v('si-user'), password: v('si-pass'), confirmPassword: v('si-pass2'), lang: state.lang } })
      : await api('/api/auth/login', { method: 'POST', body: { email: v('si-email'), password: v('si-pass') } });
    if (!applySession({ authenticated: true, ...d })) throw new Error(t('signinFailed'));
    store.set('hadSession', true); state.authReady = true;
    $('#signin').close(); toast(recover ? t('pwReset', d.recoveryCodesLeft || 0) : t('welcome', state.user.name || state.user.username || ''), recover ? 4000 : 1800);
    await pullProgress(); render(true);
    if (Array.isArray(d.recoveryCodes) && d.recoveryCodes.length) showRecoveryCodes(d.recoveryCodes);
  } catch (e) {
    const keep = { 'si-email': v('si-email'), 'si-user': v('si-user'), 'si-code': v('si-code') };
    renderSignIn(e.name === 'AbortError' ? t('serverSlow') : recover && e.status === 404 ? t('recoverOff') : e.message || t('signinFailed'));
    Object.entries(keep).forEach(([id, val]) => { if ($('#' + id)) $('#' + id).value = val; });
    if ($('#si-pass')) $('#si-pass').focus();
  }
}
async function saveProfile() {
  const status = $('#profile-status'), name = $('#pf-name').value.trim(), username = $('#pf-user').value.trim(), u = state.user;
  if (!USERNAME_RE.test(username)) { status.className = 'form-status err'; status.textContent = t('userHint'); return; }
  status.className = 'form-status'; status.textContent = t('working');
  try {
    // The API replaces every profile field, so send the current values of the ones this form does not edit.
    const r = await api('/api/profile', { method: 'POST', body: { profile: { name: name || username, username, goal: u.goal, avatarUrl: u.avatarUrl || '', socialHandle: u.socialHandle || '', socialStatus: u.socialStatus || '', messagingEnabled: Boolean(u.messagingEnabled) } } });
    state.user = { ...u, name: r.profile?.name || name, username: r.profile?.username || username };
    renderChrome(location.hash.slice(1) || 'home');
    const h = $('.profile-id h1'); if (h) h.textContent = state.user.name || state.user.username;
    status.className = 'form-status ok'; status.textContent = t('saved');
  } catch (e) { status.className = 'form-status err'; status.textContent = e.message; }
}
async function changePassword() {
  const status = $('#password-status'), cur = $('#pw-cur').value, next = $('#pw-new').value, again = $('#pw-new2').value;
  if (next.length < 8) { status.className = 'form-status err'; status.textContent = t('pwHint'); return; }
  if (next !== again) { status.className = 'form-status err'; status.textContent = t('pwMismatch'); return; }
  status.className = 'form-status'; status.textContent = t('working');
  try {
    await api('/api/profile/password', { method: 'POST', body: { currentPassword: cur, newPassword: next, confirmPassword: again } });
    $('#password-form').reset(); status.className = 'form-status ok'; status.textContent = t('pwChanged');
  } catch (e) { status.className = 'form-status err'; status.textContent = e.message; }
}
async function signOut() {
  try { await api('/api/auth/logout', { method: 'POST', body: {} }); } catch (e) { /* the local session is cleared either way */ }
  clearSession(); store.set('hadSession', false); location.hash = '#home'; render(); toast(t('signedOut'));
}
async function deleteAccount() {
  const err = $('#delete-error');
  try {
    await api('/api/profile/delete-account', { method: 'POST', body: { currentPassword: $('#del-pass')?.value || '', confirmation: $('#del-confirm').value } });
    clearSession(); store.set('hadSession', false); location.hash = '#home'; toast(t('accountDeleted'));
  } catch (e) { err.textContent = e.message; }
}
function downloadPlanCalendar() {
  const p = buildPlan(), stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const day = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const icsText = (x) => String(x).replace(/[\\,;]/g, (c) => '\\' + c).replace(/\n/g, '\\n');
  const events = p.weeks.map((w, i) => { const end = new Date(w.from.getTime() + 864e5);
    return ['BEGIN:VEVENT', `UID:atlas-${planTrack()}-week-${i + 1}-${day(w.from)}@cscourseatlas`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${day(w.from)}`, `DTEND;VALUE=DATE:${day(end)}`,
      `SUMMARY:${icsText(`${planTitle()} · ${t('weekN', i + 1)}`)}`, `DESCRIPTION:${icsText(w.mods.map(moduleTitle).join('\n'))}`, 'END:VEVENT'].join('\r\n'); });
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CS Course Atlas//Study plan//EN', ...events, 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = `${planTrack()}-study-plan.ics`;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
}
/* ---------- Router ---------- */
let lastRoute = '';
// Which courses' full lessons a page needs before it can render.
function lessonsFor(route) {
  if (route.startsWith('m-')) return [DATA.modules[route.slice(2)]?.track].filter(Boolean);
  const tracksOf = (id) => coursePick(id) ? [coursePick(id)] : [...new Set((id === MIX ? mixIds() : id === DUE ? dueKeys().map((k) => k.split(':')[0]) : [id]).map((m) => DATA.modules[m].track))];
  if (route === 'quizzes') { if (!state.quizModule || !validPick(state.quizModule)) state.quizModule = practiceDefault(); return tracksOf(state.quizModule); }
  if (route === 'flashcards') { if (!state.flashModule || !validPick(state.flashModule)) state.flashModule = dueCount() ? DUE : practiceDefault(); return tracksOf(state.flashModule); }
  if (route.startsWith('sheet-')) return [route.slice(6)].filter((id) => track(id)?.status === 'available');
  return [];
}
// Syntax highlighting is only needed on pages with code, so the library is loaded the first time one opens.
const HLJS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
let hljsLoading = null;
function highlightCode() {
  // The example on screen plus any program shown in a predict-the-output challenge.
  const targets = () => [$('#code-block'), ...document.querySelectorAll('.ch-program code')].filter((c) => c && !c.hidden && !c.dataset.highlighted);
  if (!targets().length) return;
  if (window.hljs) { targets().forEach((c) => window.hljs.highlightElement(c)); return; }
  if (!hljsLoading) hljsLoading = new Promise((resolve) => { const s = document.createElement('script'); s.src = HLJS_URL; s.onload = s.onerror = resolve; document.head.append(s); });
  hljsLoading.then(() => { if (window.hljs) targets().forEach((c) => window.hljs.highlightElement(c)); });
}
function render(keepScroll) {
  if (!DATA) return;
  let route = location.hash.slice(1) || 'home';
  if (route.startsWith('code/')) { const shared = decodeShared(route); if (shared) { state.pg = shared; state.viz = null; } history.replaceState(null, '', '#playground'); route = 'playground'; }
  if (route === 'profile' && !state.user && !state.authReady) { renderChrome(route); $('#main').innerHTML = `<div class="loading">${t('checkingSession')}</div>`; lastRoute = route; return; }
  if (route === 'profile' && !state.user) {
    openSignIn();
    route = lastRoute && lastRoute !== 'profile' ? lastRoute : 'home';
    history.replaceState(null, '', '#' + route);
  }
  if (route !== lastRoute) { state.tab = state.pendingTab || 'overview'; state.pendingTab = null; state.exIndex = 0; state.sideCollapsed.clear(); }
  const needTracks = lessonsFor(route);   // also picks the default quiz/flashcard module
  const onePick = route === 'quizzes' ? state.quizModule : route === 'flashcards' ? state.flashModule : null;
  // A single module (its page, or one picked in Quizzes/Flashcards) needs only its own small lesson file.
  let loading = route.startsWith('m-') && DATA.modules[route.slice(2)] ? waitForModule(route.slice(2))
    : onePick && DATA.modules[onePick] ? waitForModule(onePick)
    : onePick === MIX ? waitForModules(mixIds()) : onePick === DUE ? waitForModules(dueKeys().map((k) => k.split(':')[0]))
    : route === 'glossary' ? waitForGlossary() : route === 'projects' || route.startsWith('project-') ? waitForProjects() : waitForLessons(needTracks);
  // A module whose lessons are still downloading shows its header right away (from the small index), so the page paints fast.
  if (loading && route.startsWith('m-') && DATA.modules[route.slice(2)]) loading = moduleSkeleton(route.slice(2), loading);
  const html = loading || (route === 'home' ? viewHome() : route === 'courses' ? viewCourses() : route === 'practice' ? viewPractice() : route === 'quizzes' ? viewQuizzes() : route === 'flashcards' ? viewFlashcards() : route === 'challenges' ? viewChallenges() : route === 'profile' ? viewProfile() : route === 'playground' ? viewPlayground() : route === 'notes' ? viewNotes() : route === 'glossary' ? viewGlossary() : route === 'roadmap' ? viewRoadmap() : route === 'plan' ? viewPlan()
    : route === 'projects' ? viewProjects() : route.startsWith('project-') ? viewProject(route.slice(8)) : route.startsWith('cert-') ? viewCert(route.slice(5)) : route.startsWith('sheet-') ? viewSheet(route.slice(6)) : route.startsWith('course-') ? viewCourse(route.slice(7)) : route.startsWith('m-') ? viewModule(route.slice(2)) : viewMissing());
  renderChrome(route);
  $('#main').innerHTML = html;
  armQuizTimer();
  fillShellSetups();
  if (state.pendingCh != null && $('#ch-' + state.pendingCh)) { const el = $('#ch-' + state.pendingCh); state.pendingCh = null; setTimeout(() => el.scrollIntoView({ block: 'start', behavior: 'smooth' }), 50); el.classList.add('flash-target'); }
  if (route === 'playground' && state.pgAutoStep) { state.pgAutoStep = false; traceProgram(); }
  highlightCode();
  document.body.classList.remove('drawer-open');
  if (route !== lastRoute && !keepScroll) window.scrollTo(0, 0);
  lastRoute = route;
}
function openSignIn(mode = 'login') { const d = $('#signin'); state.signinMode = mode; renderSignIn(); if (!d.open) d.showModal(); }

/* ---------- Events ---------- */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action],[data-tab],[data-ex],[data-code-lang]');
  if (!el) return;
  if (el.dataset.tab) { state.tab = el.dataset.tab; render(true); const tabs = $('.tabs'); if (tabs && tabs.getBoundingClientRect().top < 0) tabs.scrollIntoView(); return; }
  if (el.dataset.ex != null) { state.exIndex = Number(el.dataset.ex); render(true); return; }
  if (el.dataset.codeLang) { state.codeLang = el.dataset.codeLang; state.langsSeen.add(el.dataset.codeLang); store.set('codeLangTouched', true); save(); render(true); return; }
  const a = el.dataset.action;
  if (a === 'reload') { location.reload(); return; }
  if (a === 'jump-step') { e.preventDefault(); $('#ch-' + el.dataset.i)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
  if (a === 'cf-resend') { resendConfirm(); return; }
  if (a === 'cf-later') { state.confirmLater = true; updateConfirmBar(); return; }
  if (a === 'recover-email') { e.preventDefault(); recoverByEmail(); return; }
  if (a === 'side-toggle') {
    const id = el.dataset.v, opened = new Set(store.get('sideOpen', []));
    if (el.getAttribute('aria-expanded') === 'true') { opened.delete(id); state.sideCollapsed.add(id); } else { opened.add(id); state.sideCollapsed.delete(id); }
    store.set('sideOpen', [...opened]);
    const scroll = $('#sidebar').scrollTop; renderChrome(location.hash.slice(1) || 'home'); $('#sidebar').scrollTop = scroll;
  }
  else if (a === 'oauth') startOAuth(el.dataset.v);
  else if (a === 'close-signin') $('#signin').close();
  else if (a === 'signin-mode') { e.preventDefault(); const keep = $('#si-email')?.value || ''; state.signinMode = el.dataset.v; renderSignIn(); $('#si-email').value = keep; $('#si-email').focus(); }
  else if (a === 'open-signup') openSignIn('signup');
  else if (a === 'pw-eye') { const input = $('#' + el.dataset.v), show = input.type === 'password'; input.type = show ? 'text' : 'password'; el.textContent = show ? t('hide') : t('show'); el.setAttribute('aria-label', show ? t('hidePw') : t('showPw')); }
  else if (a === 'sign-out') signOut();
  else if (a === 'cert-print') window.print();
  else if (a === 'calendar') downloadPlanCalendar();
  else if (a === 'toggle-done') { const id = el.dataset.id; if (state.done.has(id)) state.done.delete(id); else { state.done.add(id); logActivity('done', id); } save(); render(true);
    const tr = track(DATA.modules[id].track), st = trackStats(tr);
    if (state.done.has(id) && st.done === st.count) celebrateCourse(tr); else toast(state.done.has(id) ? t('marked') : t('unmarked')); }
  else if (a === 'notify') { state.notified.add(el.dataset.id); save(); render(true); toast(t('notified')); }
  else if (a === 'copy') {
    const text = $('#code-block')?.textContent || '';
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast(t('copied')), selectCode); else selectCode();
  }
  else if (a === 'quiz-pick') { const q = state.quiz; q.picked = Number(el.dataset.i); if (q.picked === roundItems(q)[q.i].correct) q.score += 1; else (q.missed = q.missed || []).push(q.only ? q.only[q.i] : q.i); render(true); }
  else if (a === 'quiz-missed') { const q = state.quiz; state.quiz = { id: q.id, i: 0, picked: null, score: 0, finished: false, missed: [], only: [...q.missed] }; render(true); }
  else if (a === 'quiz-next') { const q = state.quiz, n = roundItems(q).length; if (q.picked === -1 && !(q.missed || []).includes(q.only ? q.only[q.i] : q.i)) (q.missed = q.missed || []).push(q.only ? q.only[q.i] : q.i);
    if (q.i < n - 1) { q.i += 1; q.picked = null; } else if (q.id === MIX || q.only || coursePick(q.id)) { q.finished = true; } else { q.finished = true; if (q.score === n) state.aces.add(q.id); state.quizBest[q.id] = Math.max(q.score / n, state.quizBest[q.id] || 0); logActivity('quiz', q.id, { score: q.score, n }); save(); } render(true); }
  else if (a === 'ch-run') runChallenge(Number(el.dataset.i));
  else if (a === 'ch-reset') { const i = Number(el.dataset.i), ch = DATA.full[state.chModule].challenges[i], area = $('#ch-code-' + i), drafts = store.get('chDrafts', {}); delete drafts[area.dataset.key]; store.set('chDrafts', drafts); area.value = ch.starter; $('#ch-res-' + i).innerHTML = ''; }
  else if (a === 'quiz-timed') { state.quizTimed = !state.quizTimed; store.set('quizTimed', state.quizTimed); state.quiz = null; state.mixQuiz = null; render(true); }
  else if (a === 'quiz-retry') { state.quiz = null; state.mixQuiz = null; state.courseQuiz = null; render(true); }
  else if (a === 'try-it' || a === 'try-step') { const c = DATA.full[el.dataset.id], ex = state.exIndex === 0 ? c.examples.main : c.examples.sets[state.exIndex - 1];
    const langs = exampleLangs(ex), lang = langs.includes(state.codeLang) ? state.codeLang : langs[0];
    state.pg = { lang, code: ex.code[lang], expected: ex.output?.[lang] || '', from: moduleTitle(el.dataset.id) }; state.pgAutoStep = a === 'try-step' && lang === 'python'; location.hash = '#playground'; }
  else if (a === 'pg-run') runPlayground();
  else if (a === 'pg-lang') {
    state.viz = null;
    const code = $('#pg-code').value, byLang = { javascript: PG_SAMPLE, html: PG_HTML, bash: PG_TERM, python: PG_PY, sql: PG_SQL, java: PG_JAVA, cpp: PG_CPP };
    state.pg.lang = el.dataset.v;
    // Switching languages swaps in that language's starter sample; your own code is kept.
    state.pg.code = Object.values(byLang).includes(code) || !code.trim() ? (byLang[el.dataset.v] || '') : code;
    render(true);
  }
  else if (a === 'pg-reset') { state.pg = null; state.viz = null; render(true); }
  else if (a === 'pg-step') traceProgram();
  else if (a === 'pg-share') sharePlayground();
  else if (a === 'shortcuts') openShortcuts();
  else if (a === 'reveal-output') { state.revealed.add(el.dataset.key); render(true); }
  else if (a === 'predict-mode') { state.predictMode = el.checked; store.set('predictMode', state.predictMode); render(true); }
  else if (a === 'ch-step') {
    // Debug your own challenge code: open it in the playground with the first test call and step through it.
    const i = Number(el.dataset.i), ch = DATA.full[state.chModule].challenges[i], code = $('#ch-code-' + i).value.replace(/\s+$/, '');
    state.pg = { lang: 'python', code: `${code}\n\n# ${t('chStepComment')}\nprint(${ch.tests[0][0]})\n`, expected: '', from: L(ch.title) };
    state.viz = null; state.pgAutoStep = true; location.hash = '#playground';
  }
  else if (a === 'backup') openBackup();
  else if (a === 'backup-download') {
    const a2 = document.createElement('a');
    a2.href = URL.createObjectURL(new Blob([JSON.stringify({ app: 'cs-course-atlas', version: 1, savedAt: new Date().toISOString(), progress: progressSnapshot() }, null, 1)], { type: 'application/json' }));
    a2.download = `cs-course-atlas-progress-${new Date().toISOString().slice(0, 10)}.json`; document.body.append(a2); a2.click(); a2.remove();
    setTimeout(() => URL.revokeObjectURL(a2.href), 1000);
  }
  else if (a === 'backup-restore') $('#backup-file').click();
  else if (a === 'notes-download') {
    // One Markdown file, grouped by course in path order.
    const md = [`# ${t('notes')} · CS Course Atlas`, ''];
    orderedTracks().concat(DATA.tracks.filter((tr) => !orderedTracks().includes(tr))).forEach((tr) => {
      const mods = trackIds(tr.id).filter((m) => (state.notes[m] || '').trim());
      if (!mods.length) return;
      md.push(`## ${L(tr.title)}`, '');
      mods.forEach((m) => md.push(`### ${moduleTitle(m)}`, '', state.notes[m].trim(), ''));
    });
    const a2 = document.createElement('a');
    a2.href = URL.createObjectURL(new Blob([md.join('\n')], { type: 'text/markdown' }));
    a2.download = 'cs-course-atlas-notes.md'; document.body.append(a2); a2.click(); a2.remove();
    setTimeout(() => URL.revokeObjectURL(a2.href), 1000);
  }
  else if (a === 'viz-go') vizGo(+el.dataset.v);
  else if (a === 'viz-close') vizClose();
  else if (a === 'note-pick') { state.noteModule = el.dataset.id; render(true); }
  else if (a === 'gloss-letter') { state.glossLetter = el.dataset.v; render(true); }
  else if (a === 'vote') { const id = el.dataset.id; if (state.votes.has(id)) state.votes.delete(id); else state.votes.add(id); save(); render(true); }
  else if (a === 'flip') { state.flash.flipped = !state.flash.flipped; $('#flash').classList.toggle('flipped', state.flash.flipped); }
  else if (a === 'flash-next' || a === 'flash-again') { flashStep(a === 'flash-next'); }
  else if (a === 'flash-shuffle') { const f = state.flash; f.shuffled = !f.shuffled; f.order = f.shuffled ? shuffled(f.order) : [...f.order].sort((x, y) => x - y); f.pos = 0; f.flipped = false; render(true); }
  else if (a === 'flash-reset') { const f = state.flash; deckCards(f.id).forEach((c) => state.cardsKnown.delete(cardKey(c.mod, c.i))); f.pos = 0; f.flipped = false; save(); render(true); }
  else if (a === 'quiz-choose') { state.quizModule = el.dataset.id; state.quiz = null; render(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  else if (a === 'go-quiz') { state.quizModule = el.dataset.id; state.quiz = null; state.courseQuiz = null; if (location.hash === '#quizzes') render(true); else location.hash = '#quizzes'; }
  else if (a === 'go-flash') { state.flashModule = el.dataset.id; state.flash = null; if (location.hash === '#flashcards') render(true); else location.hash = '#flashcards'; }
  else if (a === 'set-lang') { state.lang = el.dataset.v; save(); render(true); }
  else if (a === 'set-theme') { const v = el.dataset.v; if (v === 'system') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = v; store.set('theme', v); render(true); }
});
function selectCode() { const r = document.createRange(); r.selectNodeContents($('#code-block')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
document.addEventListener('input', (e) => {
  if (e.target.id === 'viz-range') { vizGo(+e.target.value); $('#viz-range').focus(); return; }
  if (e.target.id === 'cert-name') { store.set('certName', e.target.value.trim()); $('#cert-name-out').innerHTML = esc(e.target.value.trim()) || '&nbsp;'; return; }
  if (e.target.classList?.contains('ch-code')) { const drafts = store.get('chDrafts', {}); drafts[e.target.dataset.key] = e.target.value; store.set('chDrafts', drafts); }
  if (e.target.id === 'mod-note') { const mid = e.target.dataset.id, fresh = !(state.notes[mid] || '').trim(); state.notes[mid] = e.target.value; if (fresh && e.target.value.trim()) logActivity('note', mid); save(); $('#mod-note-status').textContent = e.target.value.trim() ? (state.user ? t('savedAccount') : t('savedDevice')) : ''; return; }
  if (e.target.id === 'note-text') { const fresh = !(state.notes[state.noteModule] || '').trim(); state.notes[state.noteModule] = e.target.value; if (fresh && e.target.value.trim()) logActivity('note', state.noteModule); save(); const n = e.target.value.trim() ? e.target.value.trim().split(/\s+/).length : 0; $('#note-status').textContent = n ? `${state.user ? t('savedAccount') : t('savedDevice')} · ${n} ${t('words')}` : ''; }
  if (e.target.id === 'gloss-course') { state.glossCourse = e.target.value; state.glossLetter = 'all'; render(true); }
  if (e.target.id === 'gloss-q') { state.glossQuery = e.target.value; $('#gloss-grid').innerHTML = glossaryGrid(); }
  if (e.target.id === 'pg-code' && state.pg) state.pg.code = e.target.value;
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'quiz-module') { state.quizModule = e.target.value; state.quiz = null; state.mixQuiz = null; render(true); }
  if (e.target.id === 'flash-module') { state.flashModule = e.target.value; state.flash = null; state.mixDeck = null; render(true); }
  if (e.target.id === 'note-module') { state.noteModule = e.target.value; render(true); }
  if (e.target.id === 'pref-code-lang') { state.codeLang = e.target.value; store.set('codeLangTouched', true); save(); }
  if (e.target.id === 'plan-hours' || e.target.id === 'plan-start' || e.target.id === 'plan-track') { state.plan[e.target.id.slice(5)] = e.target.value; store.set('planTouched', true); save(); render(true); }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' && !e.shiftKey && (e.target.classList?.contains('ch-code') || e.target.id === 'pg-code')) {
    e.preventDefault();
    const el = e.target, a = el.selectionStart;
    el.setRangeText('    ', a, el.selectionEnd, 'end');
    el.dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
  if (e.target.classList?.contains('ch-code') && e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); runChallenge(Number(e.target.id.replace('ch-code-', ''))); return; }
  if (e.key === '?' && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && !e.ctrlKey && !e.metaKey) { e.preventDefault(); openShortcuts(); return; }
  if (e.key === 'Escape') closeSearch();
  if (state.viz && e.target.closest?.('#pg-viz') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { e.preventDefault(); vizGo(state.viz.i + (e.key === 'ArrowRight' ? 1 : -1)); return; }
  if (e.target.id === 'search-input' && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
    const items = [...document.querySelectorAll('#search-results .result[href]')];
    if (!items.length) return;
    e.preventDefault();
    let i = items.findIndex((x) => x.classList.contains('kb'));
    if (e.key === 'Enter') { (items[i] || items[0]).click(); return; }
    items.forEach((x) => x.classList.remove('kb'));
    i = e.key === 'ArrowDown' ? (i + 1) % items.length : (i <= 0 ? items.length - 1 : i - 1);
    items[i].classList.add('kb'); items[i].scrollIntoView({ block: 'nearest' });
  }
  if (e.target.id === 'flash' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.target.click(); }
  // Quizzes: 1-4 or A-D pick an answer, Enter moves on (unless typing in a field).
  if ($('.quiz') && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && !e.ctrlKey && !e.metaKey && !e.altKey && !$('#search').classList.contains('open')) {
    const k = e.key.toUpperCase(), opts = [...document.querySelectorAll('.quiz .option')];
    const i = '1234'.indexOf(k) >= 0 ? '1234'.indexOf(k) : 'ABCD'.indexOf(k);
    if (k.length === 1 && i >= 0 && opts[i] && !opts[i].disabled) { e.preventDefault(); opts[i].click(); return; }
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON' && $('[data-action="quiz-next"]')) { e.preventDefault(); $('[data-action="quiz-next"]').click(); return; }
  }
  // Flashcards page: Space flips, arrows rate the card (unless typing in a field).
  if (lastRoute === 'flashcards' && state.flash && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) && !e.ctrlKey && !e.metaKey) {
    if (e.key === ' ' && e.target.id !== 'flash') { e.preventDefault(); $('#flash')?.click(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); flashStep(true); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); flashStep(false); }
  }
  if (e.target.id === 'pg-code') {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); runPlayground(); }
    else if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); const ta = e.target, st = ta.selectionStart; ta.setRangeText('    ', st, ta.selectionEnd, 'end'); state.pg.code = ta.value; }
  }
});
// Back up progress to a file and restore it (merged, never overwriting), for people without an account.
function openBackup() {
  let d = $('#backup');
  if (!d) {
    d = document.createElement('dialog'); d.id = 'backup'; d.className = 'shortcuts'; document.body.append(d);
    d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
    d.addEventListener('change', async (e) => {
      if (e.target.id !== 'backup-file' || !e.target.files[0]) return;
      const msg = $('#backup-msg');
      try {
        const data = JSON.parse(await e.target.files[0].text());
        if (data.app !== 'cs-course-atlas' || !data.progress || typeof data.progress !== 'object') throw new Error('format');
        const before = state.done.size + state.solved.size;
        mergeProgress(data.progress); save(); render(true);
        msg.className = 'ch-status ok'; msg.textContent = t('bkRestored', state.done.size + state.solved.size - before);
      } catch (err) { msg.className = 'ch-status err'; msg.textContent = t('bkBadFile'); }
      e.target.value = '';
    });
  }
  d.innerHTML = `<div class="sc-head"><h2>${t('bkTitle')}</h2><button class="icon-btn" data-close aria-label="${t('vizClose')}">✕</button></div>
    <p class="muted" style="margin:4px 0 14px">${state.user ? t('bkSignedIn') : t('bkLead')}</p>
    <div class="bk-actions"><button class="btn" data-action="backup-download">⤓ ${t('bkDownload')}</button><button class="btn btn-ghost" data-action="backup-restore">⤒ ${t('bkRestore')}</button></div>
    <input type="file" id="backup-file" accept="application/json,.json" hidden><div id="backup-msg" role="status" style="margin-top:12px"></div>`;
  d.showModal();
}
// Finishing the last module of a course: celebrate and point to what comes next.
function celebrateCourse(tr) {
  let d = $('#celebrate');
  if (!d) { d = document.createElement('dialog'); d.id = 'celebrate'; d.className = 'shortcuts celebrate'; document.body.append(d); d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('[data-close]') || e.target.closest('a,[data-action]')) d.close(); }); }
  const c = certStatus(tr.id), next = nextCourseLink(tr.id);
  d.innerHTML = `<div class="cel-burst" aria-hidden="true">🎉</div><h2>${t('celTitle', esc(L(tr.title)))}</h2><p class="muted">${t('celLead', trackStats(tr).count)}</p>
    <div class="cel-steps">
      ${c.earned ? `<a class="btn" href="#cert-${tr.id}">🎓 ${t('certView')}</a>` : `<div class="cel-note">🎓 ${t('celCertLeft', c.quizzes - c.passed)}</div>`}
      <button class="btn btn-ghost" data-action="go-quiz" data-id="course:${tr.id}">✓ ${t('courseQuizBtn')}</button>
      ${next}
    </div><button class="link-btn cel-close" data-close>${t('vizClose')}</button>`;
  d.showModal();
}
// "?" shows every keyboard shortcut in a dialog.
function openShortcuts() {
  let d = $('#shortcuts');
  if (!d) { d = document.createElement('dialog'); d.id = 'shortcuts'; d.className = 'shortcuts'; document.body.append(d); d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('[data-close]')) d.close(); }); }
  const mac = /Mac|iPhone|iPad/.test(navigator.platform), mod = mac ? '⌘' : 'Ctrl';
  const rows = [[t('scSearch'), `${mod} K`], [t('scHelp'), '?'], [t('scRunPg'), `${mod} Enter`], [t('scRunCh'), `${mod} Enter`], [t('scIndent'), 'Tab'], [t('scQuizPick'), '1 – 4 · A – D'], [t('scQuizNext'), 'Enter'], [t('scFlip'), t('scSpace')], [t('scRate'), '← →'], [t('scStep'), '← →'], [t('scClose'), 'Esc']];
  d.innerHTML = `<div class="sc-head"><h2>${t('scTitle')}</h2><button class="icon-btn" data-close aria-label="${t('vizClose')}">✕</button></div><dl>${rows.map(([what, keys]) => `<div><dt>${esc(what)}</dt><dd>${keys.split(' · ').map((k) => `<kbd>${esc(k)}</kbd>`).join(' ')}</dd></div>`).join('')}</dl>`;
  d.showModal();
}
$('#skip-link').addEventListener('click', (e) => { e.preventDefault(); $('#main').focus(); });
// The logo is a real link to the home landing page (home.html, generated at deploy), so it works without JavaScript and in new tabs; in the app it just switches route.
$('#brand-link').addEventListener('click', (e) => { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button) return; e.preventDefault(); location.hash = '#home'; });
$('#menu-btn').addEventListener('click', () => document.body.classList.add('drawer-open'));
$('#scrim').addEventListener('click', () => document.body.classList.remove('drawer-open'));
$('#signin-open').addEventListener('click', () => openSignIn());
document.addEventListener('submit', (e) => {
  if (e.target.id === 'signin-form') { e.preventDefault(); submitSignIn(); }
  if (e.target.id === 'delete-form') { e.preventDefault(); deleteAccount(); }
  if (e.target.id === 'profile-form') { e.preventDefault(); saveProfile(); }
  if (e.target.id === 'password-form') { e.preventDefault(); changePassword(); }
  if (e.target.id === 'rc-form') { e.preventDefault(); makeRecoveryCodes(); }
  if (e.target.id === 'confirm-bar') { e.preventDefault(); confirmEmail(); }
});
$('#lang-btn').addEventListener('click', () => { state.lang = state.lang === 'en' ? 'es' : 'en'; save(); render(true); });
$('#theme-btn').addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark'; store.set('theme', root.dataset.theme);
  if (location.hash === '#profile') render(true);
});
window.addEventListener('hashchange', () => { document.querySelectorAll('dialog[open]').forEach((d) => d.close()); render(); });
// Offline support: the service worker caches the app, the lessons you open and the in-browser runtimes.
if ('serviceWorker' in navigator && window.isSecureContext) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));

/* ---------- Search ---------- */
function openSearch() { $('#search').classList.add('open'); $('#search-input').focus(); }
// Term names and challenge titles for search live in a small file loaded the first time someone searches.
let searchLoad = null;
function loadSearchList() {
  if (!DATA || DATA.search) return;
  searchLoad = searchLoad || fetch('data/search.json?v=' + DATA.searchVersion).then((r) => r.json()).then((x) => { DATA.search = x; const i = $('#search-input'); if (i.value.trim().length > 1) i.dispatchEvent(new Event('input')); }).catch(() => { searchLoad = null; });
}
// Terms come from the lesson files, so searching loads every course's lessons once.
function closeSearch() { $('#search').classList.remove('open'); $('#search-results').hidden = true; }
$('#search-btn').addEventListener('click', (e) => { e.stopPropagation(); openSearch(); });
$('#search-input').addEventListener('focus', loadSearchList);
$('#search-input').addEventListener('input', (e) => {
  loadSearchList();
  const q = e.target.value.trim().toLowerCase(), box = $('#search-results');
  if (q.length < 2 || !DATA) { box.hidden = true; return; }
  const hits = [];
  DATA.tracks.forEach((tr) => { if (L(tr.title).toLowerCase().includes(q)) hits.push({ kind: t('courses'), label: L(tr.title), href: '#course-' + tr.id, soon: tr.status !== 'available' }); });
  Object.entries(DATA.modules).forEach(([id, m]) => {
    if (L(m.title).toLowerCase().includes(q) || m.topics.some((x) => x.toLowerCase().includes(q))) hits.push({ kind: t('module'), label: L(m.title), href: isLive(id) ? '#m-' + id : '#course-' + m.track, soon: !isLive(id) });
  });
  [['practice', t('practice')], ['quizzes', t('quizzes')], ['flashcards', t('flashcards')], ['challenges', t('challenges')], ['playground', t('playground')], ['notes', t('notes')], ['glossary', t('glossary')], ['plan', t('studyPlan')], ['roadmap', t('roadmap')]]
    .forEach(([r, label]) => { if (label && label.toLowerCase().includes(q)) hits.unshift({ kind: t('pageKind'), label, href: '#' + r }); });
  liveTracks().forEach((tr) => { const label = `${t('cheatSheet')} · ${L(tr.title)}`; if (label.toLowerCase().includes(q) || (t('cheatSheet').toLowerCase().includes(q) && q.length > 3)) hits.push({ kind: t('pageKind'), label, href: '#sheet-' + tr.id }); });
  const lx = (en, es) => (state.lang === 'es' ? es || en : en);
  (DATA.search?.challenges || []).forEach(([id, , en, es]) => { if (isLive(id) && lx(en, es).toLowerCase().includes(q)) hits.push({ kind: t('challengeKind'), label: `${lx(en, es)} · ${moduleTitle(id)}`, href: '#m-' + id, tab: 'challenges' }); });
  (DATA.search?.terms || []).forEach(([id, en, es]) => { if (lx(en, es).toLowerCase().includes(q)) hits.push({ kind: t('term'), label: `${lx(en, es)} · ${moduleTitle(id)}`, href: '#m-' + id, tab: 'terms' }); });
  box.innerHTML = hits.length ? hits.slice(0, 12).map((h) => `<a class="result" href="${h.href}" ${h.tab ? `data-goto-tab="${h.tab}"` : ''}><span class="kind">${esc(h.kind)}</span><span>${esc(h.label)}</span>${h.soon ? `<span class="soon">${t('soon')}</span>` : ''}</a>`).join('') : `<div class="result muted">${t('noResults')}</div>`;
  box.hidden = false;
});
$('#search-results').addEventListener('click', (e) => {
  const r = e.target.closest('.result[href]'); if (!r) return;
  const goto = r.dataset.gotoTab;
  $('#search-input').value = ''; closeSearch();
  if (goto) { if (r.getAttribute('href') === location.hash) { state.tab = goto; render(true); } else state.pendingTab = goto; }
});
document.addEventListener('click', (e) => { if (!e.target.closest('#search') && !e.target.closest('#search-btn')) closeSearch(); });
// Links can open a module on a specific tab (data-goto-tab="challenges").
document.addEventListener('click', (e) => { const a = e.target.closest('a[data-goto-tab]'); if (a && !a.closest('#search-results')) { state.pendingTab = a.dataset.gotoTab; state.pendingCh = a.dataset.gotoCh ?? null; } }, true);

/* ---------- Boot ---------- */
// Links from the generated SEO pages use ?route=/java&module=id; turn them into hash routes.
const ROUTE_HASH = { '/home': 'home', '/tracks': 'courses', '/java': 'course-java', '/dsa': 'course-dsa', '/git': 'course-git', '/assembly': 'course-assembly', '/discrete-math': 'course-discrete', '/python': 'course-python', '/command-line': 'course-cli', '/web': 'course-web', '/sql': 'course-sql', '/how-computers-work': 'course-how-computers-work', '/cybersecurity': 'course-cybersecurity', '/ai': 'course-ai', '/networks': 'course-networks',
  '/flashcards': 'flashcards', '/quizzes': 'quizzes', '/challenges': 'challenges', '/playground': 'playground', '/notes': 'notes', '/support': 'roadmap', '/about': 'roadmap' };
function applyLegacyLink() {
  const url = new URL(location.href), q = url.searchParams, mod = q.get('module'), route = q.get('route');
  if (!mod && !route) return;
  const hash = mod ? 'm-' + mod : ROUTE_HASH[route] || 'home';
  q.delete('module'); q.delete('route');
  history.replaceState(null, '', url.pathname + url.search + '#' + hash);
}
// After the first page is on screen, quietly load the module the learner is most likely to open next
// (just that module's small file, not the whole course).
function prefetchLessons() {
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1200));
  idle(() => { const next = nextModule(currentTrack()) || trackIds(currentTrack())[0]; if (next) loadModuleLessons(next).catch(() => {}); });
}
(function boot() {
  applyLegacyLink();
  fetch('data/atlas-data.json').then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); }).then((data) => { DATA = data; DATA.full = {}; render(); initAuth(); prefetchLessons(); })
    .catch(() => { $('#main').innerHTML = '<div class="loading">Could not load the course data. Refresh the page to try again.</div>'; });
})();

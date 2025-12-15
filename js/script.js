// Java DSA Learning Hub - Main JavaScript File

// =================================
// GLOBAL STATE
// =================================
const DEFAULT_PLAYGROUND_SAMPLE = 'hello-world';

const appState = {
    darkMode: false,
    showComments: true,
    completedModules: new Set(),
    completedQuizzes: new Set(),
    expandedCode: new Set(),
    moduleComments: new Map(),
    moduleLanguages: new Map(),
    moduleModes: new Map(),
    searchTerm: '',
    difficultyFilter: 'all',
    glossarySearch: '',
    glossaryCategory: 'all',
    currentFlashcard: 0,
    showFlashcardAnswer: false,
    currentQuiz: null,
    scrollY: 0,
    selectedFlashcardModule: 'all',
    flashcardSession: [],
    flashcardSessionLength: 20,
    theme: 'default',
    accentTheme: 'indigo',
    fontScale: 'base',
    dailyChallengeId: null,
    dailyChallengeDate: null,
    studyTipId: null,
    weeklyGoal: 5,
    hideCompletedModules: false,
    compactLayout: false,
    cardDensity: 'standard',
    studyPlan: null,
    accountProfile: null,
    playground: {
        code: '',
        sample: DEFAULT_PLAYGROUND_SAMPLE,
        output: '// Output will appear here',
        isRunning: false
    }
};

// =================================
// CONSTANTS
// =================================
const CONSTANTS = {
    CODE_PREVIEW_LINES: 15,
    TRUNCATE_INDICATOR: '\n\n// ... (click Expand to see full code)',
    TOTAL_MODULES: 34
};

const STORAGE_KEYS = {
    STUDY_METRICS: 'javaDSAStudyMetrics',
    STUDY_HABIT: 'javaDSAStudyHabit'
};

const RESET_FLAGS = {
    STUDY_TIMES: 'javaDSAResetTimesV2'
};

const SUPPORT_EMAIL = 'eddyarriaga06@gmail.com';
const CODE_RUNNER_ENDPOINT = 'https://emkc.org/api/v2/piston/execute'; // EMKC Piston open-source runner
const CODE_RUNNER_LANGUAGE = 'java';
const CODE_RUNNER_VERSION = '15.0.2';

const ACCOUNT_API_ENDPOINT = '';

const SUPPORTED_LANGUAGES = {
    java: { name: 'Java', icon: '☕' },
    cpp: { name: 'C++', icon: '⚡' },
    python: { name: 'Python', icon: '🐍' },
    javascript: { name: 'JavaScript', icon: '🟨' }
};

const CODE_MODES = {
    code: { name: 'Code', icon: '💻' },
    pseudocode: { name: 'Pseudocode', icon: '📝' }
};

const DIFFICULTY_COLORS = {
    beginner: 'bg-emerald-100 text-emerald-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-rose-100 text-rose-800',
    default: 'bg-slate-100 text-slate-800'
};

const FLASHCARD_SESSION_SIZE = 20;
const FREE_FLASHCARD_MODULES = 10;
const THEME_OPTIONS = ['default', 'ocean', 'sunset', 'forest', 'minimal', 'space'];
const THEME_CLASSES = THEME_OPTIONS.filter(option => option !== 'default').map(option => `theme-${option}`);
const FONT_SCALE_CLASS_MAP = {
    compact: 'font-scale-compact',
    base: 'font-scale-base',
    comfortable: 'font-scale-comfortable',
    spacious: 'font-scale-spacious'
};
const FONT_SCALE_CLASSES = Object.values(FONT_SCALE_CLASS_MAP);
const ACCENT_THEME_OPTIONS = ['indigo', 'emerald', 'amber', 'rose'];
const ACCENT_THEME_CLASSES = ACCENT_THEME_OPTIONS.map(option => `accent-${option}`);
const CARD_DEPTH_OPTIONS = ['flat', 'standard', 'lifted'];
const CARD_DEPTH_CLASSES = CARD_DEPTH_OPTIONS.map(option => `card-depth-${option}`);
const DIFFICULTY_SECTIONS = {
    beginner: { label: 'Beginner Track', icon: '🌱' },
    intermediate: { label: 'Intermediate Trail', icon: '⚙️' },
    advanced: { label: 'Advanced Summit', icon: '🚀' }
};
const studyPlanSelection = { pace: null, focus: null, style: null };
const STUDY_PLAN_LABELS = {
    pace: {
        light: 'Light Pace',
        balanced: 'Balanced',
        intense: 'Accelerated'
    },
    focus: {
        foundations: 'Core Concepts',
        interview: 'Interview Readiness',
        projects: 'Project Driven'
    },
    style: {
        visual: 'Visual',
        practice: 'Practice Heavy',
        blended: 'Blended Approach'
    }
};

const BASE_PLAYGROUND_SNIPPETS = {
    'hello-world': {
        label: 'Hello World',
        code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java explorer!");
    }
}`
    },
    'arrays-primer': {
        label: 'Arrays Primer',
        code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {3, 1, 4, 1, 5, 9};
        Arrays.sort(numbers);
        int largest = numbers[numbers.length - 1];
        System.out.println("Sorted: " + Arrays.toString(numbers));
        System.out.println("Largest value: " + largest);
    }
}`
    },
    'loops-and-conditions': {
        label: 'Loops & Conditions',
        code: `public class Main {
    public static void main(String[] args) {
        int focusMinutes = 0;
        for (int day = 1; day <= 7; day++) {
            focusMinutes += 25;
            if (day % 2 == 0) {
                System.out.println("Day " + day + ": recovery + review");
            } else {
                System.out.println("Day " + day + ": deep practice session");
            }
        }
        System.out.println("Weekly focus minutes: " + focusMinutes);
    }
}`
    },
    'class-basics': {
        label: 'Class Basics',
        code: `public class Main {
    static class ModuleProgress {
        private final String title;
        private int completedLessons;

        ModuleProgress(String title) {
            this.title = title;
        }

        void markLesson() {
            completedLessons++;
            System.out.println("Completed lesson " + completedLessons + " in " + title);
        }
    }

    public static void main(String[] args) {
        ModuleProgress arrays = new ModuleProgress("Arrays & Strings");
        arrays.markLesson();
        arrays.markLesson();
    }
}`
    }
};

function buildPlaygroundSnippetLibrary(modulesList = []) {
    const snippets = {};
    modulesList.forEach(module => {
        const javaSource = (module.codeExamples && module.codeExamples.java) || module.codeExample || '';
        if (!javaSource || typeof javaSource !== 'string') return;
        const snippetId = `module-${module.id}`;
        snippets[snippetId] = {
            label: `${module.title}`,
            code: javaSource.trim()
        };
    });
    return snippets;
}

async function fakeAccountAPI(payload) {
    if (ACCOUNT_API_ENDPOINT) {
        const response = await fetch(ACCOUNT_API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`Account API failed (${response.status})`);
        }
        return response.json();
    }
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                status: 'ok',
                profileId: `local-${Date.now()}`,
                message: 'Profile stored locally. Connect backend to persist.'
            });
        }, 400);
    });
}

const ACHIEVEMENT_LEVELS = [
    {
        id: 'rookie',
        threshold: 0,
        label: 'Trailhead Rookie',
        icon: '🌱',
        description: 'You have the map and motivation—complete your first module to leave the trailhead.',
    },
    {
        id: 'scholar',
        threshold: 3,
        label: 'Sprouting Scholar',
        icon: '📘',
        description: 'Patterns are clicking. Keep finishing fundamentals to unlock tougher structures.',
    },
    {
        id: 'adventurer',
        threshold: 10,
        label: 'Algorithm Adventurer',
        icon: '🧭',
        description: 'You navigate recursion, sorting, and graphs with confidence. Time to optimize.',
    },
    {
        id: 'dynamo',
        threshold: 20,
        label: 'Data Structure Dynamo',
        icon: '⚡',
        description: 'You can dissect any implementation and rebuild it from memory. Keep the momentum.',
    },
    {
        id: 'luminary',
        threshold: 34,
        label: 'DSA Luminary',
        icon: '💎',
        description: 'All modules conquered! Pay it forward by mentoring someone still on the path.',
    }
];

appState.flashcardSessionLength = FLASHCARD_SESSION_SIZE;

let studyMetrics = loadStudyMetrics();
let studyHabit = loadStudyHabit();
let studyTrackerInterval = null;

// =================================
// DATA
// =================================

// Flashcards Data
const baseFlashcards = [
    {
        id: 1,
        question: "What is the time complexity of accessing an element in an array by index?",
        answer: "O(1) - Constant time\n\nArrays provide direct access to elements using their index."
    },
    {
        id: 2,
        question: "What is the difference between Array and ArrayList in Java?",
        answer: "Array: Fixed size, can store primitives and objects\nArrayList: Dynamic size, stores only objects\n\nArray: int[] arr = new int[5];\nArrayList: ArrayList<Integer> list = new ArrayList<>();"
    },
    {
        id: 3,
        question: "Explain the Two Pointer technique with an example.",
        answer: "Use two pointers to scan data from both ends.\n\nExample: Check if a string is a palindrome.\nleft = 0, right = str.length - 1\nCompare and move inward.\n\nTime: O(n), Space: O(1)"
    },
    {
        id: 4,
        question: "What is a LinkedList and when to use it?",
        answer: "LinkedList stores elements as nodes with next pointers.\n\nUse when:\n• Frequent insert/delete\n• Unknown or changing size\n• No random access needed"
    },
    {
        id: 5,
        question: "How does Floyd’s Cycle Detection Algorithm work?",
        answer: "Use two pointers (slow and fast).\nIf there's a cycle, fast eventually meets slow.\nIf not, fast reaches null.\n\nUsed to detect loops in linked lists."
    },
    {
        id: 6,
        question: "Stack vs Queue?",
        answer: "Stack: LIFO (push/pop)\nQueue: FIFO (enqueue/dequeue)\n\nStack: Used in recursion, undo\nQueue: Used in BFS, scheduling"
    },
    {
        id: 7,
        question: "What is Big O notation?",
        answer: "Big O describes worst-case time/space complexity.\n\nExamples:\nO(1) - array access\nO(log n) - binary search\nO(n²) - nested loops"
    },
    {
        id: 8,
        question: "What is a Binary Search Tree (BST)?",
        answer: "Left < root < right\nAll subtrees are also BSTs\n\nAverage time: O(log n)\nWorst case (unbalanced): O(n)"
    },
    {
        id: 9,
        question: "What does the sliding window technique solve?",
        answer: "Efficient for subarray problems (like max sum of size k).\nMove a window across data and update result without restarting.\n\nTime: O(n)"
    },
    {
        id: 10,
        question: "What is the use of prefix sum arrays?",
        answer: "Helps in fast range sum queries.\n\nprefix[i] = sum(arr[0] to arr[i])\n\nTime: O(1) for range sum after O(n) setup"
    },
    {
        id: 11,
        question: "When to use a HashMap?",
        answer: "Use when you need fast key-based lookup.\nAverage Time: O(1) for get/put\n\nExample: Frequency counter"
    },
    {
        id: 12,
        question: "What is the purpose of dynamic programming?",
        answer: "Used to solve overlapping subproblems.\nStore results (memoization or tabulation)\n\nExample: Fibonacci, knapsack"
    },
    {
        id: 13,
        question: "What’s the difference between DFS and BFS?",
        answer: "DFS: Goes deep using stack/recursion\nBFS: Level-order using queue\n\nUsed for different types of graph exploration"
    },
    {
        id: 14,
        question: "What is a Heap?",
        answer: "Binary tree with parent-child ordering.\nMin Heap: parent ≤ children\nMax Heap: parent ≥ children\n\nUsed in Priority Queues"
    },
    {
        id: 15,
        question: "What is memoization?",
        answer: "Top-down DP approach.\nStore function call results in cache to avoid repeated work.\n\nUsed in recursion-heavy problems"
    },
    {
        id: 16,
        question: "What is tabulation?",
        answer: "Bottom-up DP approach.\nBuild solutions iteratively in a table.\nNo recursion needed."
    },
    {
        id: 17,
        question: "When is binary search used?",
        answer: "Used on sorted arrays/lists.\nTime: O(log n)\n\nSplit search space in half each time."
    },
    {
        id: 18,
        question: "How to reverse a linked list?",
        answer: "Use three pointers: prev, curr, next\nIterate and reverse the next pointers\n\nTime: O(n)"
    },
    {
        id: 19,
        question: "What’s the space and time of merge sort?",
        answer: "Time: O(n log n)\nSpace: O(n)\n\nIt’s stable and works well on linked lists"
    },
    {
        id: 20,
        question: "What is a Graph?",
        answer: "Set of nodes connected by edges\nCan be directed/undirected, weighted/unweighted\n\nUsed to model networks, maps, etc."
    },
    {
        id: 21,
        question: "What is a Trie?",
        answer: "Tree used for efficient string storage.\nCommon prefixes are shared.\nUsed in autocomplete and word search."
    },
    {
        id: 22,
        question: "How does quicksort work?",
        answer: "Pick pivot, partition elements\nRecursively sort partitions\n\nTime: Avg O(n log n), Worst O(n²)"
    },
    {
        id: 23,
        question: "What is backtracking?",
        answer: "Try a solution path, if it fails, go back and try another.\nUsed in puzzles, permutations, n-queens."
    },
    {
        id: 24,
        question: "What’s the difference between recursion and iteration?",
        answer: "Recursion: function calls itself\nIteration: uses loops\n\nRecursion is often cleaner but uses more stack space"
    },
    {
        id: 25,
        question: "What is a hash function?",
        answer: "Function that maps keys to indices\nUsed in hash tables\nShould minimize collisions"
    },
    {
        id: 26,
        question: "What is the best case and worst case for bubble sort?",
        answer: "Best: O(n) if already sorted\nWorst: O(n²) with many swaps"
    },
    {
        id: 27,
        question: "What’s a priority queue?",
        answer: "Queue where elements are removed by priority.\nOften implemented with heaps."
    },
    {
        id: 28,
        question: "What is the use of a Set in Java?",
        answer: "Stores unique elements.\nUseful for checking duplicates in O(1) time"
    },
    {
        id: 29,
        question: "What is a base case in recursion?",
        answer: "The stopping condition of a recursive function.\nWithout it, you get infinite recursion."
    },
    {
        id: 30,
        question: "What is the difference between == and .equals() in Java?",
        answer: "== compares references\n.equals() compares actual values"
    },
    {
        id: 31,
        question: "When to use TreeMap vs HashMap?",
        answer: "TreeMap keeps keys sorted (O(log n))\nHashMap is unordered (O(1))"
    },
    {
        id: 32,
        question: "What’s a balanced binary tree?",
        answer: "Tree where left and right subtrees of every node differ in height by at most 1"
    },
    {
        id: 33,
        question: "What’s the difference between call stack and heap?",
        answer: "Call stack: stores function calls\nHeap: stores dynamically allocated memory"
    },
    {
        id: 34,
        question: "What is tail recursion?",
        answer: "Recursive call is the last statement in the function.\nCan be optimized to use less stack"
    },
    {
        id: 35,
        question: "What’s the difference between BFS and Dijkstra?",
        answer: "BFS: for unweighted graphs\nDijkstra: for weighted graphs (no negative weights)"
    },
    {
        id: 36,
        question: "What is a sentinel node in linked lists?",
        answer: "Dummy node that simplifies insertions/deletions at head/tail."
    },
    {
        id: 37,
        question: "What is amortized analysis?",
        answer: "Average performance per operation over a sequence of operations"
    },
    {
        id: 38,
        question: "What’s the time complexity of hashmap operations?",
        answer: "Average: O(1)\nWorst-case (with collisions): O(n)"
    },
    {
        id: 39,
        question: "What is graph coloring?",
        answer: "Assign colors to vertices so no two adjacent vertices have the same color.\nUsed in scheduling problems"
    },
    {
        id: 40,
        question: "What is an adjacency matrix good for?",
        answer: "Fast edge lookup (O(1))\nNot space-efficient for sparse graphs"
    },
    {
        id: 41,
        question: "What are the properties of a Binary Search Tree?",
        answer: "Left < root < right\nNo duplicates\nSubtrees are also BSTs"
    },
    {
        id: 42,
        question: "What is the difference between pre-order, in-order, and post-order traversal?",
        answer: "Pre-order: root, left, right\nIn-order: left, root, right\nPost-order: left, right, root"
    },
    {
        id: 43,
        question: "What is topological sorting?",
        answer: "Linear ordering of nodes in a DAG so u comes before v for all edges u → v"
    },
    {
        id: 44,
        question: "What is a Disjoint Set Union (Union-Find)?",
        answer: "Tracks a set of elements split into disjoint groups.\nSupports union and find operations"
    },
    {
        id: 45,
        question: "What is path compression in Union-Find?",
        answer: "Optimization that flattens the structure of the tree to speed up future operations"
    },
    {
        id: 46,
        question: "What is a lazy update in Segment Trees?",
        answer: "Delays update propagation to improve performance in range updates"
    },
    {
        id: 47,
        question: "What’s the difference between min heap and max heap?",
        answer: "Min heap: smallest element at root\nMax heap: largest element at root"
    },
    {
        id: 48,
        question: "How to detect a cycle in a graph?",
        answer: "Use DFS with visited and recursion stack OR Union-Find"
    },
    {
        id: 49,
        question: "What’s the difference between a shallow copy and deep copy?",
        answer: "Shallow: copies reference\nDeep: copies entire object structure"
    },
    {
        id: 50,
        question: "What is the Knapsack problem?",
        answer: "Optimization problem to choose items with max value and weight <= capacity\nSolved with DP"
    }
];


// Glossary Data  
const glossaryTerms = [
    {
        term: "Algorithm",
        definition: "A step-by-step procedure or formula for solving a problem. Must be finite, definite, and effective.",
        category: "General"
    },
    {
        term: "Array",
        definition: "A data structure consisting of elements stored in contiguous memory locations, accessible by index.",
        category: "Data Structures"
    },
    {
        term: "Big O Notation",
        definition: "Mathematical notation describing the upper bound of algorithm complexity in terms of time or space.",
        category: "Complexity"
    },
    {
        term: "Binary Search",
        definition: "Efficient search algorithm for sorted arrays with O(log n) time complexity by repeatedly dividing search space in half.",
        category: "Algorithms"
    },
    {
        term: "Binary Tree",
        definition: "Hierarchical data structure where each node has at most two children (left and right).",
        category: "Data Structures"
    },
    {
        term: "Breadth-First Search (BFS)",
        definition: "Graph traversal algorithm that explores vertices level by level using a queue.",
        category: "Algorithms"
    },
    {
        term: "Depth-First Search (DFS)",
        definition: "Graph traversal algorithm that explores as far as possible along each branch using a stack or recursion.",
        category: "Algorithms"
    },
    {
        term: "Dynamic Programming",
        definition: "Problem-solving technique that breaks complex problems into simpler subproblems and stores results to avoid redundant calculations.",
        category: "Techniques"
    },
    {
        term: "Graph",
        definition: "Non-linear data structure consisting of vertices (nodes) connected by edges.",
        category: "Data Structures"
    },
    {
        term: "Hash Table",
        definition: "Data structure that implements associative array using hash function to compute index for key-value pairs.",
        category: "Data Structures"
    },
    {
        term: "Heap",
        definition: "Complete binary tree where parent nodes are ordered with respect to children (min-heap or max-heap).",
        category: "Data Structures"
    },
    {
        term: "Linked List",
        definition: "Linear data structure where elements are stored in nodes, each containing data and pointer to next node.",
        category: "Data Structures"
    },
    {
        term: "Queue",
        definition: "FIFO (First In, First Out) data structure with enqueue and dequeue operations.",
        category: "Data Structures"
    },
    {
        term: "Recursion",
        definition: "Programming technique where function calls itself with smaller input until reaching base case.",
        category: "Techniques"
    },
    {
        term: "Stack",
        definition: "LIFO (Last In, First Out) data structure with push and pop operations.",
        category: "Data Structures"
    },
    {
        term: "Time Complexity",
        definition: "Measure of execution time of algorithm as function of input size.",
        category: "Complexity"
    },
    {
        term: "Space Complexity",
        definition: "Measure of memory space required by algorithm as function of input size.",
        category: "Complexity"
    },
    {
        term: "Tree Traversal",
        definition: "Process of visiting each node in tree exactly once (inorder, preorder, postorder).",
        category: "Algorithms"
    },
    {
        term: "Two Pointers",
        definition: "Technique using two pointers to traverse data structure, often from opposite ends.",
        category: "Techniques"
    },
    {
        term: "Greedy Algorithm",
        definition: "Problem-solving approach that makes locally optimal choice at each step.",
        category: "Techniques"
    },
    {
        term: "Sorting Algorithm",
        definition: "Algorithm that rearranges elements in a certain order (e.g., ascending or descending).",
        category: "Algorithms"
    },
    {
        term: "Merge Sort",
        definition: "Divide-and-conquer sorting algorithm with O(n log n) time complexity in all cases.",
        category: "Algorithms"
    },
    {
        term: "Quick Sort",
        definition: "Efficient sorting algorithm that partitions array around pivot; average case O(n log n).",
        category: "Algorithms"
    },
    {
        term: "Bubble Sort",
        definition: "Simple sorting algorithm that repeatedly swaps adjacent elements if they’re in the wrong order.",
        category: "Algorithms"
    },
    {
        term: "Selection Sort",
        definition: "In-place sorting algorithm that repeatedly selects the minimum element and places it at the beginning.",
        category: "Algorithms"
    },
    {
        term: "Insertion Sort",
        definition: "Builds sorted array one element at a time by inserting items into their correct position.",
        category: "Algorithms"
    },
    {
        term: "Binary Heap",
        definition: "Binary tree where parent is smaller (min-heap) or larger (max-heap) than its children.",
        category: "Data Structures"
    },
    {
        term: "Floyd’s Cycle Detection",
        definition: "Algorithm that detects cycles in linked lists using two pointers moving at different speeds.",
        category: "Algorithms"
    },
    {
        term: "Adjacency List",
        definition: "Graph representation using lists where each node stores its neighboring nodes.",
        category: "Data Structures"
    },
    {
        term: "Adjacency Matrix",
        definition: "2D array used to represent a graph, where cells denote presence or absence of edges.",
        category: "Data Structures"
    },
    {
        term: "Bit Manipulation",
        definition: "Using bitwise operators (AND, OR, XOR, SHIFT) to solve problems efficiently.",
        category: "Techniques"
    },
    {
        term: "Prefix Sum",
        definition: "Array that stores cumulative sums to enable quick range sum queries.",
        category: "Techniques"
    },
    {
        term: "Memoization",
        definition: "Optimization that stores results of expensive function calls to avoid redundant computations.",
        category: "Techniques"
    },
    {
        term: "Tabulation",
        definition: "Bottom-up dynamic programming technique using iteration and storage of intermediate results.",
        category: "Techniques"
    },
    {
        term: "Trie",
        definition: "Prefix tree used for storing and searching strings efficiently.",
        category: "Data Structures"
    },
    {
        term: "Set",
        definition: "Unordered collection of unique elements with fast lookup, insertion, and deletion.",
        category: "Data Structures"
    },
    {
        term: "Map",
        definition: "Key-value pair data structure with efficient lookup and update operations.",
        category: "Data Structures"
    },
    {
        term: "Sliding Window",
        definition: "Technique that uses a window (range) over data to solve subarray or substring problems efficiently.",
        category: "Techniques"
    },
    {
        term: "Divide and Conquer",
        definition: "Algorithmic approach that breaks a problem into subproblems, solves each recursively, and combines results.",
        category: "Techniques"
    },
    {
        term: "Backtracking",
        definition: "Recursive technique that tries possible solutions and undoes changes when a path fails.",
        category: "Techniques"
    },
    {
        term: "AVL Tree",
        definition: "Self-balancing binary search tree where heights of left and right subtrees differ by at most one.",
        category: "Data Structures"
    },
    {
        term: "Red-Black Tree",
        definition: "Self-balancing binary search tree with color rules to maintain balance.",
        category: "Data Structures"
    },
    {
        term: "Splay Tree",
        definition: "Self-adjusting binary search tree that moves accessed elements to the root.",
        category: "Data Structures"
    },
    {
        term: "Union-Find",
        definition: "Disjoint set data structure that tracks element groupings and supports union and find operations.",
        category: "Data Structures"
    },
    {
        term: "Path Compression",
        definition: "Optimization in union-find to flatten tree structure for faster lookups.",
        category: "Techniques"
    },
    {
        term: "Topological Sort",
        definition: "Linear ordering of graph vertices such that for every edge u → v, u appears before v.",
        category: "Algorithms"
    },
    {
        term: "Minimum Spanning Tree (MST)",
        definition: "Subset of edges in a weighted graph that connects all vertices with minimum total weight.",
        category: "Algorithms"
    },
    {
        term: "Dijkstra’s Algorithm",
        definition: "Greedy algorithm to find the shortest path from a source to all vertices in a weighted graph.",
        category: "Algorithms"
    },
    {
        term: "Bellman-Ford Algorithm",
        definition: "Algorithm that computes shortest paths even with negative edge weights.",
        category: "Algorithms"
    },
    {
        term: "Kruskal’s Algorithm",
        definition: "Greedy algorithm to build a minimum spanning tree by sorting all edges by weight.",
        category: "Algorithms"
    },
    {
        term: "Prim’s Algorithm",
        definition: "Greedy algorithm that grows a minimum spanning tree from a starting node.",
        category: "Algorithms"
    },
    {
        term: "Two-Pointer Technique",
        definition: "Method highlighted in the Arrays & Strings module: move two indices (start/end or slow/fast) through a collection to compare mirrored values, reverse data, or skip work in O(n) time.",
        category: "Techniques"
    },
    {
        term: "Dummy Head Node",
        definition: "Linked Lists module pattern where an extra node sits before the real head so insert/merge operations treat every node uniformly without special cases.",
        category: "Data Structures"
    },
    {
        term: "Sliding Window",
        definition: "Technique from the queues/stacks and searching modules: keep a moving subarray/substring window, expanding/shrinking it to maintain constraints (e.g., sum, frequency) in linear time.",
        category: "Techniques"
    },
    {
        term: "Segment Tree",
        definition: "Advanced data structure taught in Segment Trees & Range Queries that stores aggregated values for array segments so range queries and point updates run in O(log n).",
        category: "Data Structures"
    },
    {
        term: "Disjoint Set Union (Union-Find)",
        definition: "Structure used in the Disjoint Set Union module to track connectivity between elements using path compression and union-by-rank for near-O(1) find/union.",
        category: "Data Structures"
    },
    {
        term: "Knuth-Morris-Pratt (KMP)",
        definition: "String Pattern Matching module algorithm that uses a longest-prefix-suffix table to resume comparisons without re-checking characters, enabling O(n + m) search.",
        category: "Algorithms"
    }
];

const glossaryCategories = [
    'all',
    ...Array.from(new Set(glossaryTerms.map(term => term.category))).sort()
];


// Quiz Data
const quizData = {
    'arrays-strings': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "What is the time complexity of accessing an element in an array by its index?",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                    correct: 0,
                    explanation: "Random access arrays compute the memory address via base + index × element_size, so lookup cost is constant."
                },
                {
                    id: 2,
                    question: "Which technique is most efficient for checking if a string is a palindrome?",
                    options: ["Reverse and compare", "Two pointers", "Recursion", "Stack-based approach"],
                    correct: 1,
                    explanation: "Two pointers toggled inward compare characters in O(n) time while keeping O(1) extra memory."
                },
                {
                    id: 3,
                    question: "Sliding window works best when:",
                    options: ["You need factorial permutations", "The subarray size or constraint can be updated incrementally", "Data is a tree", "The input is immutable"],
                    correct: 1,
                    explanation: "Sliding windows reuse previous work (add/remove elements) making contiguous-range problems linear rather than quadratic."
                }
            ]
        }]
    },
    'linked-lists': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Why can linked lists grow or shrink more easily than arrays?",
                    options: ["They use less memory", "Elements live on the heap and nodes connect via pointers", "They store indices", "They are cache-optimized"],
                    correct: 1,
                    explanation: "Each node is dynamically allocated and linked, so insertions/deletions adjust pointers without shifting contiguous memory."
                },
                {
                    id: 2,
                    question: "Floyd's cycle detection works because the fast pointer:",
                    options: ["Moves randomly", "Moves twice as fast and therefore laps the slow pointer in a cycle", "Starts at the cycle entry", "Checks node values"],
                    correct: 1,
                    explanation: "The fast pointer gains one node on the slow pointer each iteration, so they eventually meet if a loop exists."
                },
                {
                    id: 3,
                    question: "Reversing a singly linked list in-place requires:",
                    options: ["Three pointers to rewire next references iteratively", "Recursive stack only", "Changing head value only", "Doubly linked nodes"],
                    correct: 0,
                    explanation: "Prev/current/nextTemp allow you to redirect each node's next pointer while progressing through the list once."
                }
            ]
        }]
    },
    'stacks-queues': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Which data structure best validates balanced parentheses?",
                    options: ["Stack", "Queue", "Set", "Heap"],
                    correct: 0,
                    explanation: "A stack mirrors nesting depth—push for '(' and pop for ')'—so mismatches surface immediately."
                },
                {
                    id: 2,
                    question: "Why does BFS depend on FIFO order?",
                    options: ["It mimics recursion", "It must explore closest nodes first", "It sorts nodes", "It caches edges"],
                    correct: 1,
                    explanation: "Level-order exploration requires removing nodes in the same order they were discovered, which a queue guarantees."
                },
                {
                    id: 3,
                    question: "Implementing a queue with two stacks yields what amortized complexity for enqueue/dequeue?",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                    correct: 0,
                    explanation: "While elements occasionally move between stacks, each element is transferred at most twice, leading to amortized O(1)."
                }
            ]
        }]
    },
    'trees-basics': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The height of a binary tree equals:",
                    options: ["Total nodes", "Edges on the longest root-to-leaf path", "Number of leaves", "Depth of minimum node"],
                    correct: 1,
                    explanation: "Height measures the depth of the deepest leaf and dictates recursion depth and balance reasoning."
                },
                {
                    id: 2,
                    question: "In-order traversal of a BST yields:",
                    options: ["Random order", "Sorted ascending keys", "Post-order sequence", "Only leaf nodes"],
                    correct: 1,
                    explanation: "Left subtree < root < right subtree, so visiting them in that order produces sorted keys."
                },
                {
                    id: 3,
                    question: "A full binary tree is defined by:",
                    options: ["Every node has 0 or 2 children", "Perfect balance", "Only leaves at last level", "All nodes same value"],
                    correct: 0,
                    explanation: "Full trees forbid nodes with a single child, which helps when reasoning about structure or converting to arrays."
                }
            ]
        }]
    },
    'hash-tables': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The load factor of a hash table measures:",
                    options: ["Average probe length", "Entries divided by bucket count", "Number of collisions", "Memory usage"],
                    correct: 1,
                    explanation: "Load factor α = n / m drives when to resize; keeping α bounded retains O(1) average operations."
                },
                {
                    id: 2,
                    question: "Separate chaining stores collisions by:",
                    options: ["Linear probing", "Arrays of buckets stored on disk", "Secondary structures (lists/trees) per bucket", "Doubling key size"],
                    correct: 2,
                    explanation: "Each bucket points to a linked list or balanced tree containing all keys hashing to that bucket."
                },
                {
                    id: 3,
                    question: "Open addressing requires careful handling of deletes because:",
                    options: ["Memory leaks occur", "Removed slots break probe sequences unless marked as tombstones", "Load factor resets", "Keys resort automatically"],
                    correct: 1,
                    explanation: "Linear/quad probing relies on contiguous probes; marking deleted slots prevents search termination before real entries."
                }
            ]
        }]
    },
    'heaps': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "A binary heap is stored efficiently in an array because:",
                    options: ["It sorts automatically", "Parent/child indices follow simple math (i→2i+1/2i+2)", "It needs pointers", "Heapify needs recursion"],
                    correct: 1,
                    explanation: "Heap nodes correspond to contiguous indices, so tree relationships derive from arithmetic rather than explicit references."
                },
                {
                    id: 2,
                    question: "Build-heap via bottom-up heapify runs in:",
                    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
                    correct: 0,
                    explanation: "Most nodes are near the leaves, so their heapify cost is small; summing costs yields linear time."
                },
                {
                    id: 3,
                    question: "Heaps underpin priority queues because they:",
                    options: ["Maintain strict sorting", "Allow fast retrieval and adjustment of highest-priority element", "Use BST rotations", "Guarantee O(1) deletion"],
                    correct: 1,
                    explanation: "The max/min sits at the root (O(1) access) and adjustments only traverse tree height (O(log n))."
                }
            ]
        }]
    },
    'sorting-algorithms': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Which algorithm is stable and always O(n log n)?",
                    options: ["Merge Sort", "Quick Sort", "Heap Sort", "Shell Sort"],
                    correct: 0,
                    explanation: "Merge sort splits/merges deterministically so runtime never degrades to quadratic and ties preserve order."
                },
                {
                    id: 2,
                    question: "Why does quick sort degrade on already sorted arrays with naive pivot choice?",
                    options: ["Recursion depth stays constant", "Partitions become unbalanced (n-1 vs 0 elements)", "Randomization fails", "It copies too much"],
                    correct: 1,
                    explanation: "Picking first or last element as pivot yields worst-case recursion depth n and total work O(n²)."
                },
                {
                    id: 3,
                    question: "Counting/Radix sorts beat comparison sorts when:",
                    options: ["Keys have bounded integer ranges or fixed digit count", "Data is unsorted text", "Floating numbers appear", "You need in-place sort"],
                    correct: 0,
                    explanation: "They leverage key structure instead of comparisons, achieving near O(n) time when the domain is limited."
                }
            ]
        }]
    },
    'searching-algorithms': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Binary search requires:",
                    options: ["Linked lists", "Sorted random-access collection", "Hash table", "Tree"],
                    correct: 1,
                    explanation: "Halving the search space depends on direct indexing; without sorted order halving is meaningless."
                },
                {
                    id: 2,
                    question: "Interpolation search excels when:",
                    options: ["Keys are uniformly distributed numbers", "Data is unsorted", "Strings contain duplicates", "You need recursion"],
                    correct: 0,
                    explanation: "The probe position is estimated proportional to value; uniform numeric distributions make this guess accurate."
                },
                {
                    id: 3,
                    question: "Exponential search is helpful because it:",
                    options: ["Avoids recursion", "Quickly finds bounds in infinite or unknown-length arrays before binary searching", "Sorts data", "Builds heaps"],
                    correct: 1,
                    explanation: "It doubles the index until the target is within range, then performs binary search inside that window."
                }
            ]
        }]
    },
    'recursion': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "A base case prevents:",
                    options: ["Compilation errors", "Infinite recursion and stack overflow", "Tail-call optimization", "Caching"],
                    correct: 1,
                    explanation: "Without a terminating condition, calls never stop and the stack eventually exhausts memory."
                },
                {
                    id: 2,
                    question: "Recursion tree analysis helps by:",
                    options: ["Comparing algorithms to loops", "Visualizing how many subcalls occur at each level and summing total cost", "Reducing memory", "Guaranteeing optimality"],
                    correct: 1,
                    explanation: "Drawing branches per call clarifies total work, which is critical for Master Theorem intuition."
                },
                {
                    id: 3,
                    question: "Tail recursion allows compilers to:",
                    options: ["Parallelize automatically", "Reuse the same stack frame for the recursive call", "Skip base cases", "Memoize results"],
                    correct: 1,
                    explanation: "If the recursive call is the final action, the current frame need not persist, so optimized runtimes reuse it."
                }
            ]
        }]
    },
    'dynamic-programming': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Dynamic programming relies on:",
                    options: ["Independent subproblems", "Overlapping subproblems and optimal substructure", "Random choices", "Greedy proofs"],
                    correct: 1,
                    explanation: "DP caches solutions because subproblems repeat, and combining optimal sub-solutions yields a global optimum."
                },
                {
                    id: 2,
                    question: "Memoization differs from tabulation because it:",
                    options: ["Requires iteration", "Evaluates subproblems lazily via recursion and caching", "Uses more memory", "Needs sorted input"],
                    correct: 1,
                    explanation: "Top-down memoization only solves subproblems that appear, mirroring the recursive structure exactly."
                },
                {
                    id: 3,
                    question: "Identifying DP state involves:",
                    options: ["Finding loops", "Choosing variables that uniquely represent a subproblem", "Sorting arrays", "Optimizing constants"],
                    correct: 1,
                    explanation: "State dimensions encode parameters that differentiate subproblems; without clear state boundaries caching fails."
                }
            ]
        }]
    },
    'greedy-algorithms': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The greedy-choice property means:",
                    options: ["Choices are random", "A locally optimal choice leads to a globally optimal solution", "Problem uses DP", "Inputs are sorted"],
                    correct: 1,
                    explanation: "Only when local decisions never preclude optimality can a greedy approach be correct."
                },
                {
                    id: 2,
                    question: "Huffman coding is greedy because it:",
                    options: ["Uses recursion", "Repeatedly merges the two least frequent symbols to build an optimal prefix tree", "Sorts words lexicographically", "Requires dynamic programming"],
                    correct: 1,
                    explanation: "The algorithm always picks the cheapest two nodes to combine, and this strategy is provably optimal."
                },
                {
                    id: 3,
                    question: "Counterexamples are crucial when studying greedy algorithms because they:",
                    options: ["Prove algorithm works", "Demonstrate a single failing case invalidates correctness", "Improve runtime", "Reduce memory"],
                    correct: 1,
                    explanation: "Showing one input where greedy fails is enough to reject the algorithm for the general problem."
                }
            ]
        }]
    },
    'graph-algorithms': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Breadth-first search on an unweighted graph gives shortest paths because:",
                    options: ["It uses recursion", "It explores vertices in increasing distance from the source", "It stores parents", "It visits each vertex once"],
                    correct: 1,
                    explanation: "By expanding level by level via a queue, the first time you reach a node is the shortest path length."
                },
                {
                    id: 2,
                    question: "Dijkstra's algorithm fails with negative edges because:",
                    options: ["Heaps cannot store negatives", "A node may be finalized before discovering a cheaper path through a negative edge", "Graphs become cyclic", "It requires sorted edges"],
                    correct: 1,
                    explanation: "Once a vertex is extracted from the min-heap it's assumed optimal; negative edges can invalidate that assumption."
                },
                {
                    id: 3,
                    question: "Topological ordering exists only for:",
                    options: ["Undirected graphs", "Connected graphs", "Directed acyclic graphs", "Weighted trees"],
                    correct: 2,
                    explanation: "Any directed cycle makes it impossible to linearize edges such that prerequisites precede dependents."
                }
            ]
        }]
    },
    'segment-trees': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Segment trees answer range sum queries in O(log n) because:",
                    options: [
                        "They precompute every possible subarray",
                        "Each query visits only the nodes whose segments exactly cover the range",
                        "They store prefix sums only",
                        "They rely on hashing collisions"
                    ],
                    correct: 1,
                    explanation: "A range decomposes into at most two segments per depth, so the traversal grows with tree height not array length."
                },
                {
                    id: 2,
                    question: "Fenwick (Binary Indexed) trees are a good alternative when:",
                    options: [
                        "You need range minimum queries",
                        "You only require prefix sums + point updates and prefer simpler code",
                        "The array never changes",
                        "You must handle 2D grids"
                    ],
                    correct: 1,
                    explanation: "Fenwick trees have smaller memory footprints for prefix sums, but they cannot handle arbitrary range combinations or min/max as flexibly."
                },
                {
                    id: 3,
                    question: "Point updates in a segment tree work by:",
                    options: [
                        "Rebuilding the entire tree",
                        "Adjusting the leaf value and recomputing parent aggregates on the path to the root",
                        "Modifying only sibling nodes",
                        "Using BFS over all nodes"
                    ],
                    correct: 1,
                    explanation: "Only ancestors of the updated index need to change, so each update touches O(log n) nodes."
                }
            ]
        }]
    },
    'disjoint-set-union': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Path compression speeds up find operations by:",
                    options: [
                        "Caching adjacency lists",
                        "Rewriting each visited node to point directly at the root",
                        "Adding more recursion",
                        "Sorting the nodes"
                    ],
                    correct: 1,
                    explanation: "Flattening the trees ensures later finds jump straight to the representative, approaching inverse Ackermann time."
                },
                {
                    id: 2,
                    question: "Union by rank (or size) keeps the structure shallow by:",
                    options: [
                        "Always attaching higher index under lower index",
                        "Linking the smaller tree beneath the taller/larger tree",
                        "Adding random parents",
                        "Using heaps"
                    ],
                    correct: 1,
                    explanation: "Favoring the taller tree prevents height blowups, making finds nearly constant time."
                },
                {
                    id: 3,
                    question: "Kruskal's MST algorithm relies on DSU to:",
                    options: [
                        "Pick the next lightest edge",
                        "Detect whether adding an edge would form a cycle",
                        "Sort the vertices",
                        "Compute shortest paths"
                    ],
                    correct: 1,
                    explanation: "Before accepting an edge, DSU checks if the endpoints already share a set; if so the edge is skipped."
                }
            ]
        }]
    },
    'string-patterns': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The LPS array used by KMP stores:",
                    options: [
                        "Longest prefix that is also a proper suffix for each prefix",
                        "Hash values of substrings",
                        "Positions of spaces",
                        "Only suffix lengths"
                    ],
                    correct: 0,
                    explanation: "Knowing the longest border tells the matcher how far it can shift without losing confirmed characters."
                },
                {
                    id: 2,
                    question: "When a mismatch happens after j matches in KMP, you:",
                    options: [
                        "Restart from the next character in both text and pattern",
                        "Reset j to lps[j-1] while keeping the text index in place",
                        "Skip ahead by pattern length",
                        "Switch to brute force"
                    ],
                    correct: 1,
                    explanation: "The prefix table gives the size of the next best border so you reuse prior comparisons instead of rescanning text."
                },
                {
                    id: 3,
                    question: "Rolling-hash approaches such as Rabin-Karp beat KMP when:",
                    options: [
                        "You scan one deterministic pattern",
                        "You need to match many patterns simultaneously or slide over multiple substrings quickly",
                        "The alphabet has size one",
                        "You must find palindromes"
                    ],
                    correct: 1,
                    explanation: "Hashing lets you compare many windows cheaply before verifying, which shines for multi-pattern search."
                }
            ]
        }]
    },
    'algorithm-analysis': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Big-O expresses:",
                    options: ["Exact runtime", "Upper bound on asymptotic growth", "Best-case behavior", "Only space complexity"],
                    correct: 1,
                    explanation: "Big-O gives an asymptotic ceiling, ignoring constants and lower-order terms."
                },
                {
                    id: 2,
                    question: "Amortized analysis is useful when:",
                    options: ["All operations cost the same", "Expensive operations are rare and average cost stays low", "Randomization is used", "Parallelism is required"],
                    correct: 1,
                    explanation: "By averaging total cost over a sequence, we show operations like dynamic array resize stay O(1) amortized."
                },
                {
                    id: 3,
                    question: "If an algorithm has nested loops each running n times, the time complexity is:",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                    correct: 3,
                    explanation: "An outer loop of n iterations containing an inner loop of n iterations leads to n × n operations."
                }
            ]
        }]
    },
    'tries': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Trie lookups depend on:",
                    options: ["Number of keys", "Length of the search string", "Hash values", "Balancing rotations"],
                    correct: 1,
                    explanation: "Operations traverse one level per character, so complexity is O(L) independent of stored key count."
                },
                {
                    id: 2,
                    question: "Edges in a trie typically represent:",
                    options: ["Whole words", "Single characters or digits", "Hash collisions", "Node depth"],
                    correct: 1,
                    explanation: "Each edge corresponds to the next symbol in a key, gradually spelling out stored entries."
                },
                {
                    id: 3,
                    question: "Word termination flags are required because:",
                    options: ["They speed up traversal", "Many keys share prefixes, so you need to mark where a valid word ends", "They ensure balance", "They compress memory"],
                    correct: 1,
                    explanation: "Without explicit end markers, prefixes couldn't represent keys distinct from longer words."
                }
            ]
        }]
    },
    'union-find': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Path compression improves which operation?",
                    options: ["Union", "Find", "Initialization", "Deletion"],
                    correct: 1,
                    explanation: "After a find, each node rewires directly to the root, flattening future traversals."
                },
                {
                    id: 2,
                    question: "Union by rank/size keeps trees shallow by:",
                    options: ["Sorting nodes", "Attaching the smaller tree beneath the larger root", "Randomly merging sets", "Rehashing elements"],
                    correct: 1,
                    explanation: "Always linking the shorter tree under the taller one limits height growth."
                },
                {
                    id: 3,
                    question: "Kruskal’s MST algorithm uses union-find to:",
                    options: ["Sort edges", "Detect when adding an edge would create a cycle", "Relax distances", "Count components"],
                    correct: 1,
                    explanation: "Before adding an edge, Kruskal checks whether its endpoints are already connected; union-find tracks that connectivity."
                }
            ]
        }]
    },
    'segment-trees': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Segment trees shine when you need:",
                    options: ["Only point queries", "Range queries/updates over an array in logarithmic time", "Graph traversal", "String parsing"],
                    correct: 1,
                    explanation: "Each node stores aggregate info for a range, so queries touch O(log n) segments."
                },
                {
                    id: 2,
                    question: "Lazy propagation allows you to:",
                    options: ["Delete nodes", "Defer pushing range updates to children until necessary", "Balance the tree", "Reduce depth"],
                    correct: 1,
                    explanation: "Instead of visiting all descendants immediately, lazy tags record pending updates, preserving O(log n) complexity."
                },
                {
                    id: 3,
                    question: "Building a segment tree from scratch costs:",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                    correct: 2,
                    explanation: "Each element contributes to O(1) nodes, resulting in linear construction time."
                }
            ]
        }]
    },
    'binary-indexed-trees': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Fenwick trees are ideal for:",
                    options: ["Graph adjacency", "Prefix sums and point updates in O(log n)", "Sorting strings", "Tree traversals"],
                    correct: 1,
                    explanation: "They maintain cumulative frequency using bit operations to jump between responsible nodes."
                },
                {
                    id: 2,
                    question: "The least significant set bit (LSB) is used to:",
                    options: ["Choose pivots", "Move to parent/child indices covering the next range chunk", "Check parity", "Compress data"],
                    correct: 1,
                    explanation: "Adding the LSB moves upward, subtracting moves downward along the implicit tree."
                },
                {
                    id: 3,
                    question: "Compared to segment trees, BITs are:",
                    options: ["Harder to code", "Simpler for 1D prefix problems but limited to certain operations", "Always faster", "More memory hungry"],
                    correct: 1,
                    explanation: "Fenwick trees excel for prefix aggregates and point updates but cannot handle arbitrary range updates without tweaks."
                }
            ]
        }]
    },
    'advanced-trees': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "AVL trees maintain balance by ensuring:",
                    options: ["Red-black coloring", "Height difference between children is at most 1", "Keys remain sorted", "Root stays median"],
                    correct: 1,
                    explanation: "Each node stores heights; rotations restore the invariant when the difference exceeds one."
                },
                {
                    id: 2,
                    question: "Red-Black trees guarantee logarithmic height because:",
                    options: ["All nodes are black", "Every root-to-leaf path contains the same number of black nodes", "They use hashing", "They rebuild often"],
                    correct: 1,
                    explanation: "The black-height property ensures no path is more than twice as long as another."
                },
                {
                    id: 3,
                    question: "Splay trees are unique because they:",
                    options: ["Require coloring", "Move recently accessed nodes to the root via rotations", "Use heaps", "Need extra memory"],
                    correct: 1,
                    explanation: "Splaying promotes locality—frequently accessed nodes become easier to reach."
                }
            ]
        }]
    },
    'string-algorithms': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "KMP avoids re-checking characters by:",
                    options: ["Hashing strings", "Using the LPS (longest prefix-suffix) table to know where to resume", "Sorting substrings", "Using recursion"],
                    correct: 1,
                    explanation: "When a mismatch occurs, the prefix table tells you the longest prefix equal to a suffix to continue matching efficiently."
                },
                {
                    id: 2,
                    question: "Rabin-Karp leverages rolling hashes to:",
                    options: ["Guarantee collision-free results", "Compare substring hashes in O(1) and verify only on matches", "Sort strings lexicographically", "Use tries"],
                    correct: 1,
                    explanation: "Efficient hash updates allow scanning multiple positions quickly while verifying when hashes match."
                },
                {
                    id: 3,
                    question: "Suffix arrays paired with LCP arrays help:",
                    options: ["Solve shortest path", "Find repeating substrings efficiently by checking adjacent suffixes' longest common prefixes", "Convert to tries", "Balance BSTs"],
                    correct: 1,
                    explanation: "Once suffixes are sorted, neighboring entries share large prefixes; the LCP array quantifies those lengths for queries."
                }
            ]
        }]
    },
    'computational-geometry': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Orientation tests using cross products determine:",
                    options: ["Distance between points", "Whether three points make clockwise, counter-clockwise, or collinear turns", "Convex hull area", "Edge weights"],
                    correct: 1,
                    explanation: "The sign of the cross product indicates the turn direction, which is fundamental for hulls and intersection tests."
                },
                {
                    id: 2,
                    question: "Graham scan builds a convex hull by:",
                    options: ["Dynamic programming", "Sorting points by angle from a pivot and maintaining a stack of hull vertices", "Binary search", "Divide and conquer"],
                    correct: 1,
                    explanation: "After sorting, points that cause clockwise turns are popped, leaving the convex envelope."
                },
                {
                    id: 3,
                    question: "Sweep-line algorithms process geometry by:",
                    options: ["Random sampling", "Moving a line across the plane and handling events in sorted order while tracking active segments", "Brute force", "Only using grids"],
                    correct: 1,
                    explanation: "The sweep line converts geometric problems into ordered events, enabling efficient detection of intersections or coverage."
                }
            ]
        }]
    },
    'number-theory': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The Euclidean algorithm computes:",
                    options: ["Prime factors", "GCD by repeated remainder operations", "LCM", "Modular exponentiation"],
                    correct: 1,
                    explanation: "Repeatedly replacing (a, b) with (b, a mod b) quickly finds the greatest common divisor."
                },
                {
                    id: 2,
                    question: "Modular exponentiation via repeated squaring is efficient because it:",
                    options: ["Avoids multiplication", "Reduces exponentiation to O(log b) multiplications while applying modulus each step", "Needs primes only", "Uses floating point"],
                    correct: 1,
                    explanation: "By squaring intermediate results and reducing modulo m, numbers stay small and operations drop to logarithmic count."
                },
                {
                    id: 3,
                    question: "The Sieve of Eratosthenes marks composites by:",
                    options: ["Dividing by primes repeatedly", "Marking multiples of each prime starting at p²", "Random testing", "Using recursion"],
                    correct: 1,
                    explanation: "Multiples below p² were already marked by smaller primes, so starting at p² avoids redundant work."
                }
            ]
        }]
    },
    'bit-manipulation': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Expression x & (-x) isolates:",
                    options: ["Most significant bit", "Least significant set bit", "Parity", "All ones"],
                    correct: 1,
                    explanation: "Two's complement negation flips bits and adds one, leaving only the lowest set bit when ANDed."
                },
                {
                    id: 2,
                    question: "XOR is handy for finding a single unique element because:",
                    options: ["It sorts values", "a ^ a = 0 so duplicates cancel, leaving the odd-occurring value", "It shifts bits", "It multiplies values"],
                    correct: 1,
                    explanation: "Pairing duplicates removes them from the accumulator, revealing the lone number."
                },
                {
                    id: 3,
                    question: "To set bit i of integer n you can:",
                    options: ["n &= ~(1 << i)", "n |= (1 << i)", "n ^= (1 << i)", "n >>= i"],
                    correct: 1,
                    explanation: "OR with a mask containing only bit i ensures that bit becomes 1 without affecting others."
                }
            ]
        }]
    },
    'java-basics': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Java's char type stores:",
                    options: ["8-bit ASCII", "16-bit UTF-16 code units", "32-bit Unicode", "Only digits"],
                    correct: 1,
                    explanation: "char is an unsigned 16-bit value capable of representing UTF-16 units, enabling Unicode support."
                },
                {
                    id: 2,
                    question: "Java passes everything by:",
                    options: ["Reference", "Value (object references themselves are copied)", "Pointer arithmetic", "Copy-on-write"],
                    correct: 1,
                    explanation: "Even though objects are manipulated indirectly, the reference value is passed by value."
                },
                {
                    id: 3,
                    question: "The keyword final on a variable means:",
                    options: ["Immutable object", "Reference cannot be reassigned after initialization", "Static binding", "Thread-safe access"],
                    correct: 1,
                    explanation: "final stops reassignment; for objects it locks the reference, not the object's internal state."
                }
            ]
        }]
    },
    'control-flow': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The enhanced for-each loop cannot safely:",
                    options: ["Iterate arrays", "Remove elements while iterating", "Read values", "Handle collections"],
                    correct: 1,
                    explanation: "Modifying the underlying collection structure triggers ConcurrentModificationException; use iterators instead."
                },
                {
                    id: 2,
                    question: "Modern switch expressions (Java 14+) allow:",
                    options: ["Returning values via -> syntax", "Only integers", "Fallthrough by default", "Polymorphic dispatch"],
                    correct: 0,
                    explanation: "Switch expressions evaluate to a value, letting you assign results directly."
                },
                {
                    id: 3,
                    question: "A do-while loop differs because:",
                    options: ["It checks condition first", "It guarantees the body executes at least once", "It is faster", "It only works with ints"],
                    correct: 1,
                    explanation: "Condition evaluation occurs after the body, ensuring at least one iteration."
                }
            ]
        }]
    },
    'oop-basics': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Encapsulation means:",
                    options: ["Public fields only", "Bundling data and behavior with restricted access", "Multiple inheritance", "Runtime polymorphism"],
                    correct: 1,
                    explanation: "Objects hide their state by exposing controlled interfaces."
                },
                {
                    id: 2,
                    question: "Polymorphism lets you:",
                    options: ["Avoid inheritance", "Treat different subclass instances via a common supertype interface", "Optimize memory", "Disable overriding"],
                    correct: 1,
                    explanation: "Dynamic dispatch ensures the correct overridden method executes based on runtime type."
                },
                {
                    id: 3,
                    question: "final classes cannot be:",
                    options: ["Instantiated", "Subclassed", "Used", "Serialized"],
                    correct: 1,
                    explanation: "Marking a class final prevents other classes from extending it."
                }
            ]
        }]
    },
    'exception-handling': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Checked exceptions must be:",
                    options: ["Ignored", "Handled with try/catch or declared with throws", "Converted to runtime exceptions automatically", "Thrown only by JVM"],
                    correct: 1,
                    explanation: "The compiler enforces that checked exceptions are either caught or declared."
                },
                {
                    id: 2,
                    question: "Finally blocks execute except when:",
                    options: ["Return is used", "System.exit or catastrophic VM failure occurs", "Exception thrown", "Break executes"],
                    correct: 1,
                    explanation: "Normal path or exceptions still run finally, but VM termination prevents it."
                },
                {
                    id: 3,
                    question: "Try-with-resources automatically:",
                    options: ["Retries operations", "Closes AutoCloseable resources after the block even on exceptions", "Makes code faster", "Handles unchecked exceptions"],
                    correct: 1,
                    explanation: "Resources declared in the try statement are closed deterministically, reducing boilerplate."
                }
            ]
        }]
    },
    'collections-framework': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "LinkedHashMap maintains:",
                    options: ["Sorted order", "Insertion order via a doubly linked list of entries", "Random iteration", "Thread safety"],
                    correct: 1,
                    explanation: "It combines a hash table with a linked list to preserve predictable iteration order."
                },
                {
                    id: 2,
                    question: "ArrayList is preferable to LinkedList when:",
                    options: ["Frequent head insertions occur", "Random access dominates operations", "Memory is tight", "You need lock-free behavior"],
                    correct: 1,
                    explanation: "ArrayList provides O(1) get/set while LinkedList must traverse nodes."
                },
                {
                    id: 3,
                    question: "ConcurrentHashMap scales by:",
                    options: ["Using a single global lock", "Segmenting buckets/using striped locks and allowing lock-free reads", "Copying on write", "Sorting keys"],
                    correct: 1,
                    explanation: "It minimizes contention by locking only portions of the map or using CAS for writes."
                }
            ]
        }]
    },
    'file-io': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Buffered streams speed IO because they:",
                    options: ["Encrypt data", "Batch reads/writes in memory, reducing system calls", "Use multithreading", "Skip disk"],
                    correct: 1,
                    explanation: "Fewer trips to the OS block device drastically reduce overhead."
                },
                {
                    id: 2,
                    question: "Try-with-resources is ideal for IO since it:",
                    options: ["Makes files optional", "Automatically closes streams even when exceptions occur", "Retries operations", "Caches bytes"],
                    correct: 1,
                    explanation: "Resources implementing AutoCloseable are cleaned up without manual finally blocks."
                },
                {
                    id: 3,
                    question: "The java.nio.file.Files utility provides:",
                    options: ["Database connections", "Modern path handling, metadata, and atomic move/copy helpers", "Network protocols", "Only synchronous IO"],
                    correct: 1,
                    explanation: "NIO's Files class includes convenience methods for interacting with the filesystem safely."
                }
            ]
        }]
    },
    'multithreading': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "synchronized in Java ensures:",
                    options: ["Order of thread execution", "Mutual exclusion and visibility for a block/object monitor", "Faster code", "Automatic deadlock prevention"],
                    correct: 1,
                    explanation: "It acquires the intrinsic lock and establishes happens-before relationships."
                },
                {
                    id: 2,
                    question: "Executors simplify concurrency by:",
                    options: ["Eliminating threads", "Managing thread pools and decoupling task submission from execution", "Enforcing parallel streams", "Replacing interrupts"],
                    correct: 1,
                    explanation: "You submit Runnable/Callable tasks; the executor handles scheduling and lifecycle."
                },
                {
                    id: 3,
                    question: "volatile guarantees:",
                    options: ["Atomicity of compound actions", "Visibility/no reordering of reads and writes", "Lock-free algorithms", "Lower memory usage"],
                    correct: 1,
                    explanation: "volatile fields are read/written directly to main memory, preventing stale values."
                }
            ]
        }]
    },
    'design-patterns': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The Singleton pattern ensures:",
                    options: ["Multiple instances", "Exactly one instance with global access", "Loose coupling", "Observer behavior"],
                    correct: 1,
                    explanation: "It hides constructors and exposes a single accessor for the lone instance."
                },
                {
                    id: 2,
                    question: "Strategy pattern enables:",
                    options: ["Multiple inheritance", "Swapping algorithms at runtime via a common interface", "Event notification", "Adapting interfaces"],
                    correct: 1,
                    explanation: "Clients can inject different behavior objects without changing the context code."
                },
                {
                    id: 3,
                    question: "Observer pattern decouples components by:",
                    options: ["Sharing state globally", "Letting subjects publish events to subscribed observers", "Copying data", "Using inheritance"],
                    correct: 1,
                    explanation: "Observers register for updates and subjects notify them when state changes."
                }
            ]
        }]
    },
    'lambda-streams': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "A functional interface contains:",
                    options: ["Multiple abstract methods", "Exactly one abstract method (plus optional defaults)", "No methods", "Only static methods"],
                    correct: 1,
                    explanation: "Single Abstract Method interfaces (SAM) are lambda compatible."
                },
                {
                    id: 2,
                    question: "Which stream operation is terminal?",
                    options: ["map", "filter", "collect", "peek"],
                    correct: 2,
                    explanation: "collect triggers evaluation and gathers results, closing the stream pipeline."
                },
                {
                    id: 3,
                    question: "Streams should not be reused because:",
                    options: ["They copy data", "Terminal operations consume them and mark them closed", "They leak memory", "They are slow"],
                    correct: 1,
                    explanation: "Once a terminal operation executes, further use throws IllegalStateException."
                }
            ]
        }]
    },
    'generics': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Type erasure means that:",
                    options: ["Generics persist at runtime", "Generic type info is removed during compilation and replaced with bounds/casts", "Generics cannot be nested", "Only primitives allowed"],
                    correct: 1,
                    explanation: "The JVM sees raw types; the compiler enforces type safety and inserts casts."
                },
                {
                    id: 2,
                    question: "The wildcard ? extends T allows you to:",
                    options: ["Insert arbitrary T values", "Read T or subclasses safely but not insert arbitrary values", "Modify list freely", "Use primitives"],
                    correct: 1,
                    explanation: "Producer Extends: treat the structure as a producer; writes are unsafe except null."
                },
                {
                    id: 3,
                    question: "Generic methods differ from generic classes because they:",
                    options: ["Require inheritance", "Declare their own type parameters independent of the class", "Only work in interfaces", "Need reflection"],
                    correct: 1,
                    explanation: "Method-level generics introduce <T> before the return type, enabling flexible reuse."
                }
            ]
        }]
    },
    'testing-junit': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "@BeforeEach in JUnit 5 runs:",
                    options: ["Once per class", "Before every @Test to reset fixtures", "After tests", "Only on failure"],
                    correct: 1,
                    explanation: "Each test gets a fresh setup so state does not leak."
                },
                {
                    id: 2,
                    question: "assertThrows is used to:",
                    options: ["Compare objects", "Verify a lambda throws a specific exception type", "Skip tests", "Measure runtime"],
                    correct: 1,
                    explanation: "It ensures the provided executable raises the expected exception."
                },
                {
                    id: 3,
                    question: "Parameterized tests allow you to:",
                    options: ["Mock dependencies", "Run the same logic with multiple inputs from sources like @CsvSource", "Parallelize automatically", "Disable assertions"],
                    correct: 1,
                    explanation: "Junit feeds different argument sets to one test method, reducing duplication."
                }
            ]
        }]
    },
    'jdbc-basics': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Which JDBC object executes SQL statements?",
                    options: ["Connection", "Statement/PreparedStatement", "ResultSet", "DriverManager"],
                    correct: 1,
                    explanation: "PreparedStatement compiles SQL with parameters and sends it over an active Connection."
                },
                {
                    id: 2,
                    question: "Prepared statements help prevent SQL injection because they:",
                    options: ["Encrypt traffic", "Separate query structure from user parameters", "Use hashing", "Auto-escape strings"],
                    correct: 1,
                    explanation: "Parameters are bound, so input cannot alter the SQL command structure."
                },
                {
                    id: 3,
                    question: "Calling ResultSet.next() returns false when:",
                    options: ["Column is null", "Cursor moves past the last row", "Transaction commits", "Statement closes"],
                    correct: 1,
                    explanation: "next() advances the cursor; when there are no more rows it returns false."
                }
            ]
        }]
    }
};
// Modules Data (Complete with ALL LANGUAGES)
const modules = [
    {
        id: 'arrays-strings',
        title: 'Arrays and Strings',
        description: 'We slow down every array and string helper so you see why guards exist, how loops scan data, and how pointer swaps work. Each method is annotated with plain-English comments plus a bullet-by-bullet breakdown under the code block, perfect for a first pass through Java collections.',
        difficulty: 'beginner',
        topics: ['Array Traversal', 'String Methods', 'Two Pointers', 'Sliding Window', 'Array Sorting'],
        codeExamples: {
            java: `// ArraysAndStrings demonstrates three starter utilities.
// Every method explains *why* each line exists so you can trace the logic.
public class ArraysAndStrings {
    
    // Finds the largest value by scanning left to right once.
    // Time: O(n), Space: O(1) because we only track the best-so-far value.
    public static int findMax(int[] arr) {
        // Defensive check: an empty array has no max, so we signal with MIN_VALUE.
        if (arr.length == 0) return Integer.MIN_VALUE;
        
        int max = arr[0]; // Start by assuming the first element is the answer.
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i]; // Whenever we discover something larger, record it.
            }
        }
        return max; // After the loop finishes the best value lives here.
    }
    
    // Reverses a string by swapping symmetric characters.
    public static String reverseString(String str) {
        char[] chars = str.toCharArray(); // Strings are immutable, so work on a char array.
        int left = 0, right = chars.length - 1; // Two pointers move toward the centre.
        
        while (left < right) {
            // Swap the characters at the current pointers.
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            
            left++;          // Moving the pointers shrinks the window.
            right--;
        }
        
        return new String(chars); // Convert the mutated array back to a String.
    }
    
    // Returns true only when the cleaned string reads the same forward/backward.
    public static boolean isPalindrome(String str) {
        // Normalize by removing punctuation/spacing differences.
        str = str.toLowerCase().replaceAll("[^a-z0-9]", "");
        int left = 0, right = str.length() - 1; // Compare mirrored characters.
        
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false; // As soon as we find a mismatch the string is not a palindrome.
            }
            left++;
            right--;
        }
        return true; // All mirrored pairs matched, so the string is a palindrome.
    }
}`,
            cpp: `// Array and String fundamentals in C++
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <climits>

class ArraysAndStrings {
public:
    // Find maximum element in array
    static int findMax(const std::vector<int>& arr) {
        if (arr.empty()) return INT_MIN;
        
        int max = arr[0]; // Initialize with first element
        for (int i = 1; i < arr.size(); i++) {
            if (arr[i] > max) {
                max = arr[i]; // Update maximum
            }
        }
        return max;
    }
    
    // Reverse a string using two pointers
    static std::string reverseString(std::string str) {
        int left = 0, right = str.length() - 1;
        
        while (left < right) {
            // Swap characters
            std::swap(str[left], str[right]);
            
            left++;  // Move pointers toward center
            right--;
        }
        
        return str;
    }
    
    // Check if string is palindrome
    static bool isPalindrome(std::string str) {
        // Convert to lowercase and keep only alphanumeric
        std::string cleaned = "";
        for (char c : str) {
            if (std::isalnum(c)) {
                cleaned += std::tolower(c);
            }
        }
        
        int left = 0, right = cleaned.length() - 1;
        while (left < right) {
            if (cleaned[left] != cleaned[right]) {
                return false; // Characters don't match
            }
            left++;
            right--;
        }
        return true; // All characters matched
    }
};`,
            python: `# Array and String fundamentals in Python
def find_max(arr):
    """Find maximum element in array"""
    if not arr:
        return float('-inf')
    
    max_val = arr[0]  # Initialize with first element
    for num in arr[1:]:
        if num > max_val:
            max_val = num  # Update maximum
    return max_val

def reverse_string(s):
    """Reverse a string using slicing"""
    return s[::-1]  # Python's elegant slicing

def reverse_string_two_pointers(s):
    """Reverse using two pointers (more explicit)"""
    chars = list(s)
    left, right = 0, len(chars) - 1
    
    while left < right:
        # Swap characters
        chars[left], chars[right] = chars[right], chars[left]
        left += 1   # Move pointers toward center
        right -= 1
    
    return ''.join(chars)

def is_palindrome(s):
    """Check if string is palindrome"""
    # Clean string: lowercase and alphanumeric only
    cleaned = ''.join(char.lower() for char in s if char.isalnum())
    return cleaned == cleaned[::-1]  # Compare with reverse

def is_palindrome_two_pointers(s):
    """Check palindrome using two pointers"""
    cleaned = ''.join(char.lower() for char in s if char.isalnum())
    left, right = 0, len(cleaned) - 1
    
    while left < right:
        if cleaned[left] != cleaned[right]:
            return False  # Characters don't match
        left += 1
        right -= 1
    
    return True  # All characters matched`,
            javascript: `// Array and String fundamentals in JavaScript
class ArraysAndStrings {
    
    // Find maximum element in array
    static findMax(arr) {
        if (arr.length === 0) return -Infinity;
        
        let max = arr[0]; // Initialize with first element
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i]; // Update maximum
            }
        }
        return max;
    }
    
    // Reverse a string using two pointers
    static reverseString(str) {
        const chars = str.split('');
        let left = 0, right = chars.length - 1;
        
        while (left < right) {
            // Swap characters
            [chars[left], chars[right]] = [chars[right], chars[left]];
            
            left++;  // Move pointers toward center
            right--;
        }
        
        return chars.join('');
    }
    
    // Check if string is palindrome
    static isPalindrome(str) {
        // Clean string: lowercase and alphanumeric only
        const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        let left = 0, right = cleaned.length - 1;
        
        while (left < right) {
            if (cleaned[left] !== cleaned[right]) {
                return false; // Characters don't match
            }
            left++;
            right--;
        }
        return true; // All characters matched
    }
}

// Alternative functional approach
const findMaxFunctional = arr => arr.length === 0 ? -Infinity : Math.max(...arr);
const reverseStringFunctional = str => str.split('').reverse().join('');
const isPalindromeFunctional = str => {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
};`
        },
        explanation: `Arrays and strings form the foundation of programming. Arrays provide indexed access to elements, while strings are sequences of characters. Key concepts include traversal patterns, the two-pointer technique for efficient processing, and understanding how memory layout affects performance. These data structures appear in countless real-world applications.`,
        codeBreakdown: [
            { label: 'findMax', detail: 'Shows how to seed an answer with the first element, loop through the rest, and update the running best when a larger value appears.' },
            { label: 'reverseString', detail: 'Demonstrates the two-pointer technique: convert to a char array, swap mirrored characters, and walk the pointers toward the centre.' },
            { label: 'isPalindrome', detail: 'Explains preprocessing (lowercase + alphanumeric), then compares mirrored characters to confirm the string reads the same both ways.' }
        ],
        resources: [
            { text: 'Oracle Java Arrays Tutorial', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html' },
            { text: 'Two Pointer Technique Guide – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/two-pointers-technique/' },
            { text: 'String Algorithm Patterns (CP-Algorithms)', url: 'https://cp-algorithms.com/string/' }
        ],
    },
    {
        id: 'linked-lists',
        title: 'Linked Lists',
        description: 'Line-by-line narration shows how `reverseList` flips `next` pointers, how Floyd\'s tortoise–hare loop guard works inside `hasCycle`, and how the dummy node plus pointer weaving in `mergeTwoLists` prevents null-pointer bugs.',
        difficulty: 'intermediate',
        topics: ['Singly Linked Lists', 'Doubly Linked Lists', 'Cycle Detection', 'List Reversal', 'Merge Operations'],
        codeExamples: {
            java: `// Linked List implementation and operations
class ListNode {
    int val;
    ListNode next;
    
    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}

public class LinkedListOperations {
    
    // Reverse a linked list iteratively
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null) {
            ListNode nextTemp = current.next; // Store next node
            current.next = prev;              // Reverse link
            prev = current;                   // Move prev forward
            current = nextTemp;               // Move current forward
        }
        
        return prev; // New head of reversed list
    }
    
    // Detect cycle using Floyd's algorithm (tortoise and hare)
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }
        
        ListNode slow = head;      // Tortoise: moves 1 step
        ListNode fast = head.next; // Hare: moves 2 steps
        
        while (fast != null && fast.next != null) {
            if (slow == fast) {
                return true; // Cycle detected
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return false; // No cycle found
    }
    
    // Merge two sorted linked lists
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0); // Dummy node for easy handling
        ListNode current = dummy;
        
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        // Attach remaining nodes
        current.next = (l1 != null) ? l1 : l2;
        
        return dummy.next; // Return actual head
    }
}`,
            cpp: `// Linked List implementation and operations in C++
#include <iostream>

struct ListNode {
    int val;
    ListNode* next;
    
    ListNode(int x) : val(x), next(nullptr) {}
};

class LinkedListOperations {
public:
    // Reverse a linked list iteratively
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* current = head;
        
        while (current != nullptr) {
            ListNode* nextTemp = current->next; // Store next node
            current->next = prev;               // Reverse link
            prev = current;                     // Move prev forward
            current = nextTemp;                 // Move current forward
        }
        
        return prev; // New head of reversed list
    }
    
    // Detect cycle using Floyd's algorithm (tortoise and hare)
    bool hasCycle(ListNode* head) {
        if (head == nullptr || head->next == nullptr) {
            return false;
        }
        
        ListNode* slow = head;       // Tortoise: moves 1 step
        ListNode* fast = head->next; // Hare: moves 2 steps
        
        while (fast != nullptr && fast->next != nullptr) {
            if (slow == fast) {
                return true; // Cycle detected
            }
            slow = slow->next;
            fast = fast->next->next;
        }
        
        return false; // No cycle found
    }
    
    // Merge two sorted linked lists
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummy(0); // Dummy node for easy handling
        ListNode* current = &dummy;
        
        while (l1 != nullptr && l2 != nullptr) {
            if (l1->val <= l2->val) {
                current->next = l1;
                l1 = l1->next;
            } else {
                current->next = l2;
                l2 = l2->next;
            }
            current = current->next;
        }
        
        // Attach remaining nodes
        current->next = (l1 != nullptr) ? l1 : l2;
        
        return dummy.next; // Return actual head
    }
};`,
            python: `# Linked List implementation and operations in Python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedListOperations:
    
    def reverse_list(self, head):
        """Reverse a linked list iteratively"""
        prev = None
        current = head
        
        while current:
            next_temp = current.next  # Store next node
            current.next = prev       # Reverse link
            prev = current           # Move prev forward
            current = next_temp      # Move current forward
        
        return prev  # New head of reversed list
    
    def has_cycle(self, head):
        """Detect cycle using Floyd's algorithm (tortoise and hare)"""
        if not head or not head.next:
            return False
        
        slow = head       # Tortoise: moves 1 step
        fast = head.next  # Hare: moves 2 steps
        
        while fast and fast.next:
            if slow == fast:
                return True  # Cycle detected
            slow = slow.next
            fast = fast.next.next
        
        return False  # No cycle found
    
    def merge_two_lists(self, l1, l2):
        """Merge two sorted linked lists"""
        dummy = ListNode(0)  # Dummy node for easy handling
        current = dummy
        
        while l1 and l2:
            if l1.val <= l2.val:
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next
            current = current.next
        
        # Attach remaining nodes
        current.next = l1 if l1 else l2
        
        return dummy.next  # Return actual head`,
            javascript: `// Linked List implementation and operations in JavaScript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedListOperations {
    
    // Reverse a linked list iteratively
    reverseList(head) {
        let prev = null;
        let current = head;
        
        while (current !== null) {
            const nextTemp = current.next; // Store next node
            current.next = prev;           // Reverse link
            prev = current;                // Move prev forward
            current = nextTemp;            // Move current forward
        }
        
        return prev; // New head of reversed list
    }
    
    // Detect cycle using Floyd's algorithm (tortoise and hare)
    hasCycle(head) {
        if (!head || !head.next) {
            return false;
        }
        
        let slow = head;      // Tortoise: moves 1 step
        let fast = head.next; // Hare: moves 2 steps
        
        while (fast && fast.next) {
            if (slow === fast) {
                return true; // Cycle detected
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return false; // No cycle found
    }
    
    // Merge two sorted linked lists
    mergeTwoLists(l1, l2) {
        const dummy = new ListNode(0); // Dummy node for easy handling
        let current = dummy;
        
        while (l1 && l2) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        // Attach remaining nodes
        current.next = l1 || l2;
        
        return dummy.next; // Return actual head
    }
}`
        },
        explanation: `We slow down every pointer mutation: storing \`nextTemp\`, rerouting \`current.next\`, advancing slow/fast pointers, and stitching two sorted lists together with a dummy head so you can reason about ownership and edge cases (empty lists, one node, intersecting chains).`,
        codeBreakdown: [
            { label: 'reverseList', detail: 'Introduces a prev pointer, stores the next node, rewires the current link, then advances both pointers until the list flips.' },
            { label: 'hasCycle', detail: 'Uses slow/fast pointers to detect loops; the sample explains why moving two steps vs one guarantees a meeting point when a cycle exists.' },
            { label: 'mergeTwoLists', detail: 'Builds a dummy node so you always have a stable head reference while weaving the smaller node from either list into the result.' }
        ],
        resources: [
            { text: 'Linked List Animations - VisuAlgo', url: 'https://visualgo.net/en/list' },
            { text: "Floyd's Cycle Detection - GeeksforGeeks", url: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/' },
            { text: 'Merge Two Sorted Lists Walkthrough - LeetCode Discuss', url: 'https://leetcode.com/problems/merge-two-sorted-lists/solutions/' }
        ]
    },
    // Additional modules (blank templates as in original)
    {
        id: 'stacks-queues',
        title: 'Stacks and Queues',
        description: 'We treat stacks and queues like story problems: every method describes the data movement and why errors are thrown. The walkthrough compares LIFO vs FIFO behavior, visualizes each push/pop/enqueue/dequeue, and finishes with usage tips (undo buffers vs schedulers).',
        difficulty: 'beginner',
        topics: ['Stack Operations', 'Queue Operations', 'Deque', 'Priority Queue', 'Applications'],
        codeExample: `// Simple Stack and Queue implementations in Java.
// ArrayDeque gives us both LIFO and FIFO behaviour without writing array math by hand.
import java.util.ArrayDeque;
import java.util.NoSuchElementException;

class ArrayStack<E> {
    private final ArrayDeque<E> data = new ArrayDeque<>();

    // Adds an element to the *top* of the stack.
    public void push(E value) {
        data.push(value); // O(1) because ArrayDeque stores a pointer to the current head.
    }

    // Removes and returns the most recent element.
    public E pop() {
        if (data.isEmpty()) throw new NoSuchElementException("Stack empty");
        return data.pop(); // ArrayDeque throws if empty, so we guard first.
    }

    // Looks at the top element without removing it.
    public E peek() {
        return data.peek();
    }
}

class ArrayQueue<E> {
    private final ArrayDeque<E> data = new ArrayDeque<>();

    // Adds to the *tail* to preserve FIFO ordering.
    public void enqueue(E value) {
        data.offer(value); // offer adds to the back of the deque.
    }

    // Removes from the *head* because the oldest element leaves first.
    public E dequeue() {
        if (data.isEmpty()) throw new NoSuchElementException("Queue empty");
        return data.poll(); // poll returns null when empty, but we already guarded.
    }

    public int size() {
        return data.size();
    }
}

public class StackQueueDemo {
    public static void main(String[] args) {
        // Demonstrate stack usage.
        ArrayStack<Integer> stack = new ArrayStack<>();
        stack.push(10);
        stack.push(20);
        System.out.println("Stack peek: " + stack.peek()); // Shows the top without removing it (20).
        System.out.println("Stack pop: " + stack.pop());   // Removes 20 and prints it.

        // Demonstrate queue usage.
        ArrayQueue<String> queue = new ArrayQueue<>();
        queue.enqueue("Alice");
        queue.enqueue("Bob");
        System.out.println("Queue dequeue: " + queue.dequeue()); // Alice leaves first.
        System.out.println("Queue size: " + queue.size());       // Shows remaining items.
    }
}`,
        explanation: `Stacks model LIFO flows used in call stacks, undo buffers, and expression evaluation, while queues deliver FIFO order for schedulers, BFS, and streaming pipelines. This lesson contrasts their implementations (array vs. linked), explains amortized push/pop/enqueue costs, and walks through real interview problems like balanced parentheses, sliding windows, and task queues.`,
        codeBreakdown: [
            { label: 'ArrayStack', detail: 'push adds to the top, pop removes from the top, and peek inspects the next value. Guards explain how to handle empty structures.' },
            { label: 'ArrayQueue', detail: 'enqueue places elements at the back, dequeue removes from the front, and size helps drive UI counters.' },
            { label: 'StackQueueDemo', detail: 'Sequences through both abstractions so you can watch how the operations interleave in a single main method.' }
        ],
        resources: [
            { text: 'Visualizing Stack & Queue Operations – VisuAlgo', url: 'https://visualgo.net/en/list' },
            { text: 'Java ArrayDeque Official Docs', url: 'https://docs.oracle.com/javase/8/docs/api/java/util/ArrayDeque.html' },
            { text: 'Stack vs Queue Cheat Sheet – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/stack-vs-queue-data-structures/' }
        ]
    },
    {
        id: 'trees-basics',
        title: 'Binary Trees',
        description: 'The walkthrough pauses inside `insertRecursive`, `inorder`, and `levelOrderTraversal` so you can watch how new nodes find their spot, how recursive DFS prints sorted data, and how the queue-driven BFS fans through each level.',
        difficulty: 'intermediate',
        topics: ['Tree Traversal', 'Binary Search Trees', 'Tree Height', 'Path Problems', 'Tree Construction'],
        codeExample: `// Binary tree traversals and insert in Java
class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class BinaryTree {
    TreeNode root;

    public void insert(int value) {
        root = insertRecursive(root, value);
    }

    private TreeNode insertRecursive(TreeNode node, int value) {
        if (node == null) {
            return new TreeNode(value);
        }
        if (value < node.value) {
            node.left = insertRecursive(node.left, value);
        } else if (value > node.value) {
            node.right = insertRecursive(node.right, value);
        }
        return node;
    }

    public void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        System.out.print(node.value + " ");
        inorder(node.right);
    }

    public void levelOrderTraversal() {
        java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            System.out.print(current.value + " ");
            if (current.left != null) queue.offer(current.left);
            if (current.right != null) queue.offer(current.right);
        }
    }

    public static void main(String[] args) {
        BinaryTree bst = new BinaryTree();
        int[] values = {8, 3, 10, 1, 6, 14, 4};
        for (int value : values) {
            bst.insert(value);
        }
        System.out.print("Inorder: ");
        bst.inorder(bst.root); // 1 3 4 6 8 10 14
        System.out.print("\\nLevel order: ");
        bst.levelOrderTraversal();
    }
}`,
        explanation: `We draw the BST invariant at every recursive call so you see why values smaller than the current node drift left and larger values drift right. Then we highlight how inorder guarantees sorted output, why queues help with BFS level markers, and how to adapt the same patterns to path-sum or serialization tasks.`,
        codeBreakdown: [
            { label: 'insertRecursive', detail: 'Checks whether to branch left or right, creates a node when it reaches null, and returns the rebuilt subtree to the parent call.' },
            { label: 'inorder', detail: 'Visits left subtree, logs the current value, then visits the right subtree to yield ascending output in a BST.' },
            { label: 'levelOrderTraversal', detail: 'Uses a queue to pop the current node and push children so values stream out level by level.' }
        ],
        resources: [
            { text: 'Binary Tree Traversals - Programiz', url: 'https://www.programiz.com/dsa/tree-traversal' },
            { text: 'BST Visualizer - VisuAlgo', url: 'https://visualgo.net/en/bst' },
            { text: 'Breadth First Search for Trees - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/level-order-tree-traversal/' }
        ]
    },
    {
        id: 'hash-tables',
        title: 'Hash Tables and Maps',
        description: 'First we trace how `HashMap.merge` updates a character-frequency map, then we build a lightweight `SimpleHashTable` so you can watch hashing, bucket selection, and collision resolution happen in slow motion.',
        difficulty: 'intermediate',
        topics: ['Hash Functions', 'Collision Resolution', 'HashMap Operations', 'Hash Sets', 'Load Factor'],
        codeExample: `// Frequency counter using HashMap and simple custom hash table
import java.util.*;

public class HashTableDemo {
    public static Map<Character, Integer> countLetters(String word) {
        Map<Character, Integer> frequency = new HashMap<>();
        for (char c : word.toCharArray()) {
            frequency.merge(c, 1, Integer::sum);
        }
        return frequency;
    }

    static class SimpleHashTable {
        private static class Entry {
            final String key;
            String value;
            Entry(String key, String value) {
                this.key = key;
                this.value = value;
            }
        }
        private final List<List<Entry>> buckets;

        SimpleHashTable(int capacity) {
            buckets = new ArrayList<>(capacity);
            for (int i = 0; i < capacity; i++) {
                buckets.add(new ArrayList<>());
            }
        }

        private int hash(String key) {
            return Math.abs(key.hashCode()) % buckets.size();
        }

        public void put(String key, String value) {
            int bucketIndex = hash(key);
            List<Entry> bucket = buckets.get(bucketIndex);
            for (Entry entry : bucket) {
                if (entry.key.equals(key)) {
                    entry.value = value;
                    return;
                }
            }
            bucket.add(new Entry(key, value));
        }

        public Optional<String> get(String key) {
            int bucketIndex = hash(key);
            for (Entry entry : buckets.get(bucketIndex)) {
                if (entry.key.equals(key)) {
                    return Optional.of(entry.value);
                }
            }
            return Optional.empty();
        }
    }

    public static void main(String[] args) {
        System.out.println(countLetters(\"datastructures\")); // {a=2, d=1, ...}

        SimpleHashTable table = new SimpleHashTable(8);
        table.put(\"java\", \"Coffee language\");
        table.put(\"python\", \"Snake language\");
        System.out.println(table.get(\"java\").orElse(\"Not found\")); // Coffee language
    }
}`,
        explanation: `Zoomed-in commentary shows how a string key becomes a bucket index, what happens when two keys collide, and how chaining keeps entries accessible. You will also compare average-case O(1) operations with worst-case O(n) scans, tweak load factors, and reason about when to reach for LinkedHashMap or TreeMap.`,
        codeBreakdown: [
            { label: 'countLetters', detail: 'Uses HashMap.merge to increment counts atomically, demonstrating why hash tables shine for aggregations.' },
            { label: 'SimpleHashTable.put', detail: 'Computes the bucket, scans for an existing key, then either updates the value or appends a new entry.' },
            { label: 'SimpleHashTable.get', detail: 'Reuses the same hash -> bucket mapping to locate entries and wraps the answer in Optional for safe reads.' }
        ],
        resources: [
            { text: 'Hash Table Basics - Programiz', url: 'https://www.programiz.com/dsa/hash-table' },
            { text: 'Java HashMap Tutorial - Baeldung', url: 'https://www.baeldung.com/java-hashmap' },
            { text: 'Collision Resolution Strategies - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/collision-resolution-techniques/' }
        ]
    },
    {
        id: 'heaps',
        title: 'Heaps and Priority Queues',
        description: '`priorityQueueDemo` confirms how Java\'s PriorityQueue pops the smallest element, then `heapify`/`buildMinHeap` rebuild the structure from an array so you can trace the parent/child index math, swaps, and bubbling logic yourself.',
        difficulty: 'intermediate',
        topics: ['Min Heap', 'Max Heap', 'Heap Operations', 'Heapify', 'Priority Queues'],
        codeExample: `// Min-heap using PriorityQueue plus manual heapify
import java.util.Arrays;
import java.util.PriorityQueue;

public class HeapExamples {
    public static void priorityQueueDemo() {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.addAll(Arrays.asList(7, 3, 10, 4));

        while (!minHeap.isEmpty()) {
            System.out.print(minHeap.poll() + \" \"); // 3 4 7 10
        }
        System.out.println();
    }

    public static void heapify(int[] arr, int i, int n) {
        int smallest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] < arr[smallest]) smallest = left;
        if (right < n && arr[right] < arr[smallest]) smallest = right;

        if (smallest != i) {
            int temp = arr[i];
            arr[i] = arr[smallest];
            arr[smallest] = temp;
            heapify(arr, smallest, n);
        }
    }

    public static void buildMinHeap(int[] arr) {
        for (int i = arr.length / 2 - 1; i >= 0; i--) {
            heapify(arr, i, arr.length);
        }
    }

    public static void main(String[] args) {
        priorityQueueDemo();

        int[] arr = {9, 5, 6, 2, 3};
        buildMinHeap(arr);
        System.out.println(\"Heapified array: \" + Arrays.toString(arr));
    }
}`,
        explanation: `We highlight the array representation (parent i -> children 2i+1 / 2i+2), explain why heapify works from the last parent backwards, and compare the ergonomics of the library queue vs manual implementations. Practice prompts connect heaps to scheduling, streaming medians, and graph algorithms.`,
        codeBreakdown: [
            { label: 'priorityQueueDemo', detail: "Uses Java's PriorityQueue to show automatic heap ordering and repeated poll behavior." },
            { label: 'heapify', detail: 'Looks at both children, finds the smallest, swaps as needed, and recurses until the subtree satisfies the heap property.' },
            { label: 'buildMinHeap', detail: 'Starts at the last non-leaf index and calls heapify on each parent so the structure stabilizes in O(n) time.' }
        ],
        resources: [
            { text: 'Binary Heap Tutorial - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/binary-heap/' },
            { text: 'PriorityQueue API - Oracle Docs', url: 'https://docs.oracle.com/javase/8/docs/api/java/util/PriorityQueue.html' },
            { text: 'Heap Visualization - VisuAlgo', url: 'https://visualgo.net/en/heap' }
        ]
    },
    {
        id: 'sorting-algorithms',
        title: 'Sorting Algorithms',
        description: '`bubbleSort`, `mergeSort`, and `quickSort` live in one class so we can pause after each comparison, swap, merge, and pivot partition to explain exactly why elements move the way they do.',
        difficulty: 'intermediate',
        topics: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Radix Sort'],
        codeExample: `// Detailed sorting implementations with analysis
import java.util.Arrays;

public class SortingAlgorithms {

    public static void bubbleSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                    swapped = true;
                }
            }
            if (!swapped) break; // already sorted
        }
    }

    public static void mergeSort(int[] arr) {
        mergeSort(arr, 0, arr.length - 1, new int[arr.length]);
    }

    private static void mergeSort(int[] arr, int left, int right, int[] temp) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid, temp);
        mergeSort(arr, mid + 1, right, temp);
        merge(arr, left, mid, right, temp);
    }

    private static void merge(int[] arr, int left, int mid, int right, int[] temp) {
        int i = left, j = mid + 1, k = left;
        while (i <= mid && j <= right) {
            temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        for (int idx = left; idx <= right; idx++) arr[idx] = temp[idx];
    }

    public static void quickSort(int[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }

    private static void quickSort(int[] arr, int low, int high) {
        if (low >= high) return;
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                swap(arr, i, j);
                i++;
            }
        }
        swap(arr, i, high);
        return i;
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main(String[] args) {
        int[] sample = {5, 2, 9, 1, 5, 6};
        quickSort(sample);
        System.out.println(\"Quick Sort: \" + Arrays.toString(sample));
        int[] other = {5, 2, 9, 1, 5, 6};
        mergeSort(other);
        System.out.println(\"Merge Sort: \" + Arrays.toString(other));
    }
}`,
        explanation: `We annotate inner loops, highlight invariants (left side already sorted, pivot partitioned, temp array holding the merge), and summarize time/space costs so you can instantly match a real problem with the right sorting strategy.`,
        codeBreakdown: [
            { label: 'bubbleSort', detail: 'Nested loops bubble the largest value to the end, and the swapped flag explains the early exit optimization.' },
            { label: 'mergeSort', detail: 'Splits the array, recurses, and merges using a helper buffer so you see how stable merging works.' },
            { label: 'quickSort', detail: 'Chooses a pivot, partitions the array in place, then recurses on the subarrays to finish in average O(n log n).' }
        ],
        resources: [
            { text: 'Sorting Algorithm Visualizer - VisuAlgo', url: 'https://visualgo.net/en/sorting' },
            { text: 'Sorting Summary Table - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sorting-algorithms/' },
            { text: 'Merge vs Quick Sort - Baeldung', url: 'https://www.baeldung.com/cs/merge-sort-vs-quicksort' }
        ]
    },
    {
        id: 'searching-algorithms',
        title: 'Searching Algorithms',
        description: 'Linear, binary, and exponential search are implemented side by side with narrated pointer movements, annotated boundary updates, and a recap of when to choose each strategy.',
        difficulty: 'beginner',
        topics: ['Linear Search', 'Binary Search', 'Interpolation Search', 'Exponential Search'],
        codeExample: `// Searching utilities highlighting multiple techniques.
// Read the comments top-to-bottom to follow how the pointers move.
import java.util.Arrays;

public class SearchingAlgorithms {

    // Walks each element until it finds the target or reaches the end.
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i; // Break out as soon as we see the target.
        }
        return -1; // Not found.
    }

    // Binary search halves the search space on every comparison.
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid; // Found it!
            if (arr[mid] < target) {
                left = mid + 1; // Toss the left half, keep searching the right half.
            } else {
                right = mid - 1; // Toss the right half, search the left half.
            }
        }
        return -1; // The pointers crossed, so the target is absent.
    }

    // Exponential search finds a reasonable window, then reuses binary search.
    public static int exponentialSearch(int[] arr, int target) {
        if (arr.length == 0) return -1; // Nothing to do.
        int bound = 1; // Start by looking at index 1 (after index 0).
        while (bound < arr.length && arr[bound] < target) {
            bound *= 2; // Double the range until we overshoot the target.
        }
        // Search the window [bound / 2, bound] because the target must be inside it.
        return Arrays.binarySearch(arr, bound / 2, Math.min(bound + 1, arr.length), target);
    }

    public static void main(String[] args) {
        int[] sorted = {2, 4, 6, 8, 10, 12, 14};
        System.out.println(\"Linear search 8: \" + linearSearch(sorted, 8));
        System.out.println(\"Binary search 10: \" + binarySearch(sorted, 10));
        System.out.println(\"Exponential search 12: \" + exponentialSearch(sorted, 12));
    }
}`,
        explanation: `Beyond linear search, you will master binary search patterns on arrays, answer-range problems, and implicit search spaces such as answer-guessing or peak finding. We also cover interpolation/exponential search and how to adapt search templates to rotated arrays and matrix traversal.`,
        codeBreakdown: [
            { label: 'linearSearch', detail: 'Use when input is tiny or unsorted. The loop simply compares every element with the target.' },
            { label: 'binarySearch', detail: 'Ideal for sorted arrays. Watch how the left/right pointers shrink the search window by half each iteration.' },
            { label: 'exponentialSearch', detail: 'Perfect when the length is unknown (streams/infinite arrays). Quickly find bounds, then reuse binary search inside them.' }
        ],
        resources: [
            { text: 'Binary Search Illustrated – Khan Academy', url: 'https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search' },
            { text: 'Searching Algorithms Overview – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/searching-algorithms/' },
            { text: 'Exponential Search Explained – Programiz', url: 'https://www.programiz.com/dsa/exponential-search' }
        ]
    },
    {
        id: 'recursion',
        title: 'Recursion and Backtracking',
        description: 'Factorial, maze solving, and subset generation illustrate how base cases, choices, and backtracking fit together; we explain what each recursive frame is doing and when it unwinds.',
        difficulty: 'intermediate',
        topics: ['Recursive Functions', 'Base Cases', 'Backtracking', 'Memoization', 'Tree Recursion'],
        codeExample: `// Recursion and backtracking patterns
import java.util.*;

public class RecursionExamples {

    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    public static boolean solveMaze(char[][] maze, int row, int col) {
        if (row < 0 || col < 0 || row >= maze.length || col >= maze[0].length || maze[row][col] == '#') {
            return false;
        }
        if (maze[row][col] == 'G') return true;
        maze[row][col] = '#'; // mark visited
        boolean found = solveMaze(maze, row + 1, col) ||
                        solveMaze(maze, row - 1, col) ||
                        solveMaze(maze, row, col + 1) ||
                        solveMaze(maze, row, col - 1);
        maze[row][col] = '.'; // backtrack
        return found;
    }

    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int[] nums, int index, List<Integer> slate, List<List<Integer>> result) {
        result.add(new ArrayList<>(slate));
        for (int i = index; i < nums.length; i++) {
            slate.add(nums[i]);
            backtrack(nums, i + 1, slate, result);
            slate.remove(slate.size() - 1);
        }
    }

    public static void main(String[] args) {
        System.out.println(\"Factorial(5) = \" + factorial(5));
        int[] nums = {1, 2, 3};
        System.out.println(\"Subsets: \" + subsets(nums));
    }
}`,
        explanation: `We break recursion into base case, choice, and exploration phases, then show how to convert naive recursion into efficient backtracking with state restoration. Examples include permutations, N-Queens, subsets, and memoized tree DP, helping you reason about call stacks and termination.`,
        resources: ['Recursion Patterns', 'Backtracking Guide']
    },
    {
        id: 'dynamic-programming',
        title: 'Dynamic Programming',
        description: 'The memoized Fibonacci map, LIS DP array, and 0/1 knapsack table are spelled out step by step so you can follow how states are cached, transitions chosen, and answers read back.',
        difficulty: 'advanced',
        topics: ['Memoization', 'Tabulation', 'Optimal Substructure', 'Overlapping Subproblems'],
        codeExample: `// Dynamic programming examples (memoization + tabulation)
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class DynamicProgramming {

    private static final Map<Integer, Long> fibMemo = new HashMap<>();
    static {
        fibMemo.put(0, 0L);
        fibMemo.put(1, 1L);
    }

    public static long fibonacci(int n) {
        if (fibMemo.containsKey(n)) return fibMemo.get(n);
        long value = fibonacci(n - 1) + fibonacci(n - 2);
        fibMemo.put(n, value);
        return value;
    }

    public static int longestIncreasingSubsequence(int[] nums) {
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int max = 1;
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            max = Math.max(max, dp[i]);
        }
        return max;
    }

    public static int knapSack(int capacity, int[] weights, int[] values) {
        int[][] dp = new int[weights.length + 1][capacity + 1];
        for (int i = 1; i <= weights.length; i++) {
            for (int w = 0; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp[weights.length][capacity];
    }

    public static void main(String[] args) {
        System.out.println(\"Fib(10) = \" + fibonacci(10));
        System.out.println(\"LIS length = \" + longestIncreasingSubsequence(new int[]{10,9,2,5,3,7,101,18}));
        System.out.println(\"0/1 Knapsack = \" + knapSack(7, new int[]{1,3,4,5}, new int[]{1,4,5,7}));
    }
}`,
        explanation: `Expect a repeatable framework: define subproblems, derive transitions, then choose memoization or tabulation with optimized space. Classic problems (knapsack, LIS, coin change) plus pattern summaries (1D, 2D grid, partition, interval) ensure you can form DP recurrences on the fly.`,
        resources: ['DP Patterns', 'Optimization Techniques']
    },
    {
        id: 'greedy-algorithms',
        title: 'Greedy Algorithms',
        description: 'Activity selection walks through the start/finish arrays while `coinChange` repeatedly peels denominations, making it easy to see why each greedy comparison or subtraction works.',
        difficulty: 'intermediate',
        topics: ['Greedy Choice', 'Activity Selection', 'Huffman Coding', 'Minimum Spanning Tree'],
        codeExample: `// Greedy strategies for scheduling and coin change
import java.util.*;

public class GreedyAlgorithms {

    public static List<int[]> selectMaxActivities(int[] start, int[] finish) {
        List<int[]> result = new ArrayList<>();
        int lastFinish = -1;
        for (int i = 0; i < start.length; i++) {
            if (start[i] >= lastFinish) {
                result.add(new int[]{start[i], finish[i]});
                lastFinish = finish[i];
            }
        }
        return result;
    }

    public static Map<Integer, Integer> coinChange(int amount, int[] denominations) {
        Map<Integer, Integer> used = new LinkedHashMap<>();
        for (int coin : denominations) {
            int count = amount / coin;
            if (count > 0) {
                used.put(coin, count);
                amount -= coin * count;
            }
        }
        if (amount != 0) throw new IllegalArgumentException(\"Cannot make exact change with given denominations\");
        return used;
    }

    public static void main(String[] args) {
        int[] start = {1, 3, 0, 5, 8, 5};
        int[] finish = {2, 4, 6, 7, 9, 9};
        System.out.println(\"Selected activities: \" + selectMaxActivities(start, finish));

        int[] coins = {25, 10, 5, 1};
        System.out.println(\"Coin change for 68: \" + coinChange(68, coins));
    }
}`,
        explanation: `You will learn to prove the greedy-choice property, test counterexamples, and detect matroid-like structures. Hands-on labs cover interval scheduling, Huffman coding, Kruskal vs Prim MSTs, and coin systems so you know exactly when greedy beats DP.`,
        resources: ['Greedy Strategy', 'Optimization Problems']
    },
    {
        id: 'graph-algorithms',
        title: 'Graph Algorithms',
        description: '`Graph.addEdge`, `bfs`, and `dijkstra` all run in one demo, giving you line-by-line insight into adjacency lists, queue-based traversal, and heap-driven distance relaxation.',
        difficulty: 'advanced',
        topics: ['Graph Representation', 'DFS', 'BFS', 'Shortest Path', 'Minimum Spanning Tree'],
        codeExample: `// Graph traversal and Dijkstra shortest path
import java.util.*;

class Graph {
    private final Map<Integer, List<int[]>> adjacency = new HashMap<>();

    public void addEdge(int from, int to, int weight) {
        adjacency.computeIfAbsent(from, k -> new ArrayList<>()).add(new int[]{to, weight});
        adjacency.computeIfAbsent(to, k -> new ArrayList<>());
    }

    public void bfs(int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new ArrayDeque<>();
        queue.offer(start);
        visited.add(start);
        while (!queue.isEmpty()) {
            int current = queue.poll();
            System.out.print(current + \" \");
            for (int[] edge : adjacency.getOrDefault(current, Collections.emptyList())) {
                int neighbor = edge[0];
                if (visited.add(neighbor)) {
                    queue.offer(neighbor);
                }
            }
        }
        System.out.println();
    }

    public Map<Integer, Integer> dijkstra(int source) {
        Map<Integer, Integer> dist = new HashMap<>();
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        pq.offer(new int[]{source, 0});
        dist.put(source, 0);
        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int node = current[0];
            int distance = current[1];
            if (distance > dist.getOrDefault(node, Integer.MAX_VALUE)) continue;
            for (int[] edge : adjacency.getOrDefault(node, Collections.emptyList())) {
                int neighbor = edge[0];
                int weight = edge[1];
                int newDist = distance + weight;
                if (newDist < dist.getOrDefault(neighbor, Integer.MAX_VALUE)) {
                    dist.put(neighbor, newDist);
                    pq.offer(new int[]{neighbor, newDist});
                }
            }
        }
        return dist;
    }

    public static void main(String[] args) {
        Graph graph = new Graph();
        graph.addEdge(0, 1, 4);
        graph.addEdge(0, 2, 1);
        graph.addEdge(2, 1, 2);
        graph.addEdge(1, 3, 1);
        graph.addEdge(2, 3, 5);
        System.out.print(\"BFS: \");
        graph.bfs(0);
        System.out.println(\"Dijkstra distances from 0: \" + graph.dijkstra(0));
    }
}`,
        explanation: `We review adjacency list/matrix trade-offs, then dive into traversal patterns (DFS/BFS), topological sorting, shortest paths, and MST designs. Visual walkthroughs show how to reason about connectivity, detect cycles, and optimize graph algorithms with priority queues or union-find.`,
        resources: ['Graph Algorithms', 'DFS and BFS']
    },
    {
        id: 'algorithm-analysis',
        title: 'Algorithm Analysis and Big O',
        description: 'Tiny helpers such as `getFirst`, `sum`, and `binarySearchOperations` are instrumented so you can correlate the code with O(1), O(n), and O(log n) behavior and actual comparison counts.',
        difficulty: 'advanced',
        topics: ['Big O Notation', 'Time Complexity', 'Space Complexity', 'Best/Worst Case', 'Algorithm Optimization'],
        codeExample: `// Measuring algorithmic complexity with instrumentation
public class AlgorithmAnalysis {

    public static int getFirst(int[] arr) {
        return arr.length == 0 ? -1 : arr[0]; // O(1)
    }

    public static int sum(int[] arr) {
        int total = 0;
        for (int num : arr) {
            total += num; // O(n)
        }
        return total;
    }

    public static int binarySearchOperations(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        int comparisons = 0;
        while (left <= right) {
            comparisons++;
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                return comparisons;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return comparisons;
    }

    public static void main(String[] args) {
        int[] sample = {1, 3, 5, 7, 9, 11, 13};
        System.out.println(\"First element: \" + getFirst(sample));
        System.out.println(\"Sum: \" + sum(sample));
        System.out.println(\"Binary search comparisons: \" + binarySearchOperations(sample, 11));
    }
}`,
        explanation: `Instead of memorizing Big O, you will learn to count dominant operations, reason about best/worst/average cases, and evaluate memory footprints. Worked examples explain logarithms, recursion-tree analysis, and amortized proofs so you can justify complexity claims during interviews.`,
        resources: ['Big O Guide', 'Complexity Analysis']
    },
    {
        id: 'tries',
        title: 'Tries (Prefix Trees)',
        description: 'The trie builds nodes character by character in `insert`, reuses them via `traverse`, and flags words/prefixes, so we spell out how each loop navigates the shared structure.',
        difficulty: 'intermediate',
        topics: ['Trie Construction', 'Insert/Search/Delete', 'Prefix Matching', 'Auto-complete'],
        codeExample: `// Trie / prefix tree implementation
import java.util.HashMap;
import java.util.Map;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isWord;
}

public class Trie {
    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode current = root;
        for (char c : word.toCharArray()) {
            current = current.children.computeIfAbsent(c, k -> new TrieNode());
        }
        current.isWord = true;
    }

    public boolean search(String word) {
        TrieNode node = traverse(word);
        return node != null && node.isWord;
    }

    public boolean startsWith(String prefix) {
        return traverse(prefix) != null;
    }

    private TrieNode traverse(String sequence) {
        TrieNode current = root;
        for (char c : sequence.toCharArray()) {
            TrieNode next = current.children.get(c);
            if (next == null) return null;
            current = next;
        }
        return current;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert(\"code\");
        trie.insert(\"coder\");
        trie.insert(\"coding\");
        System.out.println(trie.search(\"code\"));      // true
        System.out.println(trie.startsWith(\"cod\"));  // true
        System.out.println(trie.search(\"codes\"));    // false
    }
}`,
        explanation: `The trie unit illustrates how prefix trees compress shared paths to enable O(L) lookups, autosuggest, and wildcard search. You will add delete operations, explore ternary search trees, and implement word dictionary problems leveraging prefix counting.`,
        resources: ['Trie Applications', 'String Processing']
    },
    {
        id: 'union-find',
        title: 'Union-Find (Disjoint Set)',
        description: '`find` performs recursive path compression and `union` compares ranks before reparenting nodes, letting you trace exactly how the disjoint-set forest flattens.',
        difficulty: 'intermediate',
        topics: ['Union by Rank', 'Path Compression', 'Connected Components', 'Cycle Detection'],
        codeExample: `// Disjoint Set Union (Union-Find) with path compression
public class UnionFind {
    private final int[] parent;
    private final int[] rank;

    public UnionFind(int size) {
        parent = new int[size];
        rank = new int[size];
        for (int i = 0; i < size; i++) {
            parent[i] = i;
        }
    }

    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // path compression
        }
        return parent[x];
    }

    public void union(int a, int b) {
        int rootA = find(a);
        int rootB = find(b);
        if (rootA == rootB) return;
        if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
        } else if (rank[rootA] > rank[rootB]) {
            parent[rootB] = rootA;
        } else {
            parent[rootB] = rootA;
            rank[rootA]++;
        }
    }

    public static void main(String[] args) {
        UnionFind uf = new UnionFind(6);
        uf.union(0, 1);
        uf.union(1, 2);
        uf.union(3, 4);
        System.out.println(\"Find(2) = \" + uf.find(2));
        System.out.println(\"Connected components merged? \" + (uf.find(0) == uf.find(2)));
    }
}`,
        explanation: `We implement disjoint-set unions with path compression and union-by-rank, analyze their near-constant complexity, and apply them to connectivity, Kruskal MST, and cycle detection. Visual traces clarify how parent trees flatten after repeated operations.`,
        resources: ['Disjoint Set Operations', 'Path Compression']
    },
    {
        id: 'segment-trees',
        title: 'Segment Trees',
        description: '`build`, `update`, and `rangeSum` split ranges by midpoint, handle cover/disjoint/partial cases, and bubble results upward so the entire range-query story is easy to follow.',
        difficulty: 'advanced',
        topics: ['Range Queries', 'Lazy Propagation', 'Point Updates', 'Range Updates'],
        codeExample: `// Segment tree supporting range sum query and point update
class SegmentTree {
    private final int[] tree;
    private final int n;

    public SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 0, 0, n - 1);
    }

    private void build(int[] arr, int node, int left, int right) {
        if (left == right) {
            tree[node] = arr[left];
            return;
        }
        int mid = (left + right) / 2;
        build(arr, node * 2 + 1, left, mid);
        build(arr, node * 2 + 2, mid + 1, right);
        tree[node] = tree[node * 2 + 1] + tree[node * 2 + 2];
    }

    public void update(int index, int value) {
        update(0, 0, n - 1, index, value);
    }

    private void update(int node, int left, int right, int index, int value) {
        if (left == right) {
            tree[node] = value;
            return;
        }
        int mid = (left + right) / 2;
        if (index <= mid) update(node * 2 + 1, left, mid, index, value);
        else update(node * 2 + 2, mid + 1, right, index, value);
        tree[node] = tree[node * 2 + 1] + tree[node * 2 + 2];
    }

    public int rangeSum(int ql, int qr) {
        return rangeSum(0, 0, n - 1, ql, qr);
    }

    private int rangeSum(int node, int left, int right, int ql, int qr) {
        if (ql <= left && qr >= right) return tree[node];
        if (qr < left || ql > right) return 0;
        int mid = (left + right) / 2;
        return rangeSum(node * 2 + 1, left, mid, ql, qr)
             + rangeSum(node * 2 + 2, mid + 1, right, ql, qr);
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11};
        SegmentTree st = new SegmentTree(arr);
        System.out.println(\"Sum 1-3: \" + st.rangeSum(1, 3));
        st.update(1, 10);
        System.out.println(\"Sum 1-3 after update: \" + st.rangeSum(1, 3));
    }
}`,
        explanation: `Segment trees store aggregated range data (sum, min, gcd) and answer queries in O(log n); you will build both iterative and recursive versions. We also cover lazy propagation for range updates and compare segment trees with Fenwick trees in terms of capabilities.`,
        resources: ['Range Query Optimization', 'Lazy Propagation']
    },
    {
        id: 'binary-indexed-trees',
        title: 'Binary Indexed Trees (Fenwick Trees)',
        description: 'The BIT demo emphasizes the lowbit trick: `update` climbs with `i += i & -i`, `prefixSum` walks downward, and `rangeSum` just subtracts prefixes so you can visualize the implicit tree.',
        difficulty: 'advanced',
        topics: ['Prefix Sums', 'Range Sum Queries', 'Point Updates', 'Lower Bit Operation'],
        codeExample: `// Fenwick Tree / Binary Indexed Tree
class BinaryIndexedTree {
    private final int[] tree;

    public BinaryIndexedTree(int size) {
        tree = new int[size + 1]; // 1-based indexing
    }

    public void update(int index, int delta) {
        for (int i = index + 1; i < tree.length; i += i & -i) {
            tree[i] += delta;
        }
    }

    public int prefixSum(int index) {
        int sum = 0;
        for (int i = index + 1; i > 0; i -= i & -i) {
            sum += tree[i];
        }
        return sum;
    }

    public int rangeSum(int left, int right) {
        return prefixSum(right) - prefixSum(left - 1);
    }

    public static void main(String[] args) {
        BinaryIndexedTree bit = new BinaryIndexedTree(10);
        int[] nums = {1, 2, 3, 4, 5};
        for (int i = 0; i < nums.length; i++) {
            bit.update(i, nums[i]);
        }
        System.out.println(\"Prefix sum(3) = \" + bit.prefixSum(3));
        bit.update(2, 5); // add 5 to index 2
        System.out.println(\"Range sum(1,3) = \" + bit.rangeSum(1, 3));
    }
}`,
        explanation: `Fenwick trees offer a compact alternative for prefix sums and point updates; this lesson explains the lowbit trick, building from scratch, and performing range queries. Practice exercises include inversion counting, running frequency tables, and 2D BIT extensions.`,
        resources: ['Fenwick Tree Guide', 'Prefix Sum Optimization']
    },
    {
        id: 'advanced-trees',
        title: 'Advanced Tree Structures',
        description: 'The AVL insert pipeline updates heights, checks balance factors, and triggers the correct rotations before an inorder traversal verifies the tree stayed sorted.',
        difficulty: 'advanced',
        topics: ['AVL Trees', 'Red-Black Trees', 'B-Trees', 'Splay Trees', 'Tree Rotations'],
        codeExample: `// AVL tree with rotations to maintain balance
class AVLTree {
    static class Node {
        int key, height;
        Node left, right;
        Node(int key) {
            this.key = key;
            height = 1;
        }
    }

    private Node root;

    public void insert(int key) {
        root = insert(root, key);
    }

    private Node insert(Node node, int key) {
        if (node == null) return new Node(key);
        if (key < node.key) {
            node.left = insert(node.left, key);
        } else if (key > node.key) {
            node.right = insert(node.right, key);
        } else {
            return node; // no duplicates
        }
        updateHeight(node);
        return rebalance(node);
    }

    private Node rebalance(Node node) {
        int balance = getBalance(node);
        if (balance > 1 && getBalance(node.left) >= 0) return rotateRight(node);
        if (balance > 1 && getBalance(node.left) < 0) {
            node.left = rotateLeft(node.left);
            return rotateRight(node);
        }
        if (balance < -1 && getBalance(node.right) <= 0) return rotateLeft(node);
        if (balance < -1 && getBalance(node.right) > 0) {
            node.right = rotateRight(node.right);
            return rotateLeft(node);
        }
        return node;
    }

    private Node rotateLeft(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        y.left = x;
        x.right = T2;
        updateHeight(x);
        updateHeight(y);
        return y;
    }

    private Node rotateRight(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        x.right = y;
        y.left = T2;
        updateHeight(y);
        updateHeight(x);
        return x;
    }

    private void updateHeight(Node node) {
        node.height = 1 + Math.max(height(node.left), height(node.right));
    }

    private int height(Node node) {
        return node == null ? 0 : node.height;
    }

    private int getBalance(Node node) {
        return node == null ? 0 : height(node.left) - height(node.right);
    }

    public void inorderTraversal() {
        inorder(root);
        System.out.println();
    }

    private void inorder(Node node) {
        if (node == null) return;
        inorder(node.left);
        System.out.print(node.key + \" \");
        inorder(node.right);
    }

    public static void main(String[] args) {
        AVLTree tree = new AVLTree();
        int[] values = {30, 20, 40, 10, 25, 35, 50, 5};
        for (int v : values) tree.insert(v);
        tree.inorderTraversal();
    }
}`,
        explanation: `Balanced trees (AVL, Red-Black, B/B+ trees) enforce height guarantees via rotations. You will see animation-style walkthroughs of insert/delete, compare balancing strategies, and study use cases such as ordered maps, interval trees, and database indexes.`,
        resources: ['Self-Balancing Trees', 'Tree Rotation Techniques']
    },
    {
        id: 'string-algorithms',
        title: 'Advanced String Algorithms',
        description: 'We build the KMP prefix table and feed it into `kmpSearch`, pausing on each pointer jump so you understand how the `lps` array skips redundant comparisons.',
        difficulty: 'advanced',
        topics: ['KMP Algorithm', 'Rabin-Karp', 'Boyer-Moore', 'Suffix Arrays', 'String Hashing'],
        codeExample: `// Knuth-Morris-Pratt (KMP) pattern matching
import java.util.Arrays;

public class StringAlgorithms {

    public static int[] buildPrefixTable(String pattern) {
        int[] lps = new int[pattern.length()];
        int len = 0;
        for (int i = 1; i < pattern.length();) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                lps[i++] = ++len;
            } else if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i++] = 0;
            }
        }
        return lps;
    }

    public static int kmpSearch(String text, String pattern) {
        if (pattern.isEmpty()) return 0;
        int[] lps = buildPrefixTable(pattern);
        int i = 0, j = 0;
        while (i < text.length()) {
            if (text.charAt(i) == pattern.charAt(j)) {
                i++; j++;
                if (j == pattern.length()) return i - j; // match found
            } else if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        String text = \"abxabcabcaby\";
        String pattern = \"abcaby\";
        System.out.println(\"Prefix table: \" + Arrays.toString(buildPrefixTable(pattern)));
        System.out.println(\"KMP search index: \" + kmpSearch(text, pattern));
    }
}`,
        explanation: `We derive prefix-function tables for KMP, rolling hashes for Rabin-Karp, and good/bad character heuristics for Boyer–Moore. Further topics include suffix arrays/automata, Z-algorithm, and how to combine hashing with binary search for substring problems.`,
        resources: ['Pattern Matching', 'String Processing Optimization']
    },
    {
        id: 'computational-geometry',
        title: 'Computational Geometry',
        description: 'Graham scan sorts points, grows lower/upper hulls, and uses the `cross` helper to pop clockwise turns, letting you watch the hull form in stack-sized steps.',
        difficulty: 'advanced',
        topics: ['Point Operations', 'Line Intersection', 'Convex Hull', 'Closest Pair', 'Area Calculation'],
        codeExample: `// Convex hull using Graham scan
import java.util.*;

public class GeometryAlgorithms {
    static class Point {
        final int x, y;
        Point(int x, int y) { this.x = x; this.y = y; }
        @Override public String toString() { return \"(\" + x + \",\" + y + \")\"; }
    }

    private static int cross(Point a, Point b, Point c) {
        return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    }

    public static List<Point> convexHull(List<Point> points) {
        if (points.size() <= 1) return points;
        points.sort(Comparator.comparingInt((Point p) -> p.x).thenComparingInt(p -> p.y));
        List<Point> lower = new ArrayList<>();
        for (Point p : points) {
            while (lower.size() >= 2 && cross(lower.get(lower.size()-2), lower.get(lower.size()-1), p) <= 0) {
                lower.remove(lower.size()-1);
            }
            lower.add(p);
        }
        List<Point> upper = new ArrayList<>();
        Collections.reverse(points);
        for (Point p : points) {
            while (upper.size() >= 2 && cross(upper.get(upper.size()-2), upper.get(upper.size()-1), p) <= 0) {
                upper.remove(upper.size()-1);
            }
            upper.add(p);
        }
        lower.remove(lower.size()-1);
        upper.remove(upper.size()-1);
        lower.addAll(upper);
        return lower;
    }

    public static void main(String[] args) {
        List<Point> points = Arrays.asList(
            new Point(0, 3), new Point(2, 2), new Point(1, 1),
            new Point(2, 1), new Point(3, 0), new Point(0, 0),
            new Point(3, 3)
        );
        System.out.println(\"Convex Hull: \" + convexHull(new ArrayList<>(points)));
    }
}`,
        explanation: `Geometry topics include vector math, orientation tests, sweep lines, and robustness tips to avoid floating-point pitfalls. Projects walk through Graham scan, rotating calipers, point-in-polygon tests, and collision detection for games or simulations.`,
        resources: ['Geometric Algorithms', 'Convex Hull Methods']
    },
    {
        id: 'number-theory',
        title: 'Number Theory Algorithms',
        description: '`sieve`, `modPow`, and `gcd` are annotated so you can track loop invariants, modulus reductions, and Euclid swaps for common number-theory building blocks.',
        difficulty: 'intermediate',
        topics: ['Prime Numbers', 'GCD/LCM', 'Modular Arithmetic', 'Sieve of Eratosthenes', 'Fast Exponentiation'],
        codeExample: `// Number theory helpers: sieve, gcd, modular exponentiation
import java.util.Arrays;

public class NumberTheory {

    public static boolean[] sieve(int limit) {
        boolean[] prime = new boolean[limit + 1];
        Arrays.fill(prime, true);
        prime[0] = prime[1] = false;
        for (int p = 2; p * p <= limit; p++) {
            if (prime[p]) {
                for (int multiple = p * p; multiple <= limit; multiple += p) {
                    prime[multiple] = false;
                }
            }
        }
        return prime;
    }

    public static long modPow(long base, long exponent, long mod) {
        long result = 1;
        base %= mod;
        while (exponent > 0) {
            if ((exponent & 1) == 1) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
            exponent >>= 1;
        }
        return result;
    }

    public static int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    public static void main(String[] args) {
        boolean[] prime = sieve(30);
        System.out.println(\"Primes <= 30: \");
        for (int i = 2; i < prime.length; i++) {
            if (prime[i]) System.out.print(i + \" \");
        }
        System.out.println(\"\\nGCD(24, 18) = \" + gcd(24, 18));
        System.out.println(\"2^20 mod 1_000_000_007 = \" + modPow(2, 20, 1_000_000_007L));
    }
}`,
        explanation: `You will code sieves, fast exponentiation, modular inverses, and extended Euclid, then apply them to gcd-based proofs, combinatorics mod p, and cryptography-style puzzles. Emphasis is on deriving formulas and spotting when arithmetic shortcuts beat brute force.`,
        resources: ['Prime Algorithms', 'Modular Arithmetic']
    },
    {
        id: 'bit-manipulation',
        title: 'Bit Manipulation',
        description: 'Functions like `isPowerOfTwo`, `countBits`, `singleNumber`, and `lowbit` expose masks and XOR tricks; we call out what each operation does to the underlying bits.',
        difficulty: 'intermediate',
        topics: ['Bitwise Operators', 'Bit Masks', 'Power of Two', 'XOR Properties', 'Bit Counting'],
        codeExample: `// Common bit manipulation techniques
public class BitManipulation {

    public static boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }

    public static int countBits(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1); // drop lowest set bit
            count++;
        }
        return count;
    }

    public static int singleNumber(int[] nums) {
        int xor = 0;
        for (int num : nums) {
            xor ^= num;
        }
        return xor;
    }

    public static int lowbit(int n) {
        return n & -n;
    }

    public static void main(String[] args) {
        System.out.println(\"Is 16 power of two? \" + isPowerOfTwo(16));
        System.out.println(\"Bits in 29: \" + countBits(29));
        System.out.println(\"Single number: \" + singleNumber(new int[]{2, 3, 2, 4, 4})); // 3
        System.out.println(\"Lowbit of 12: \" + lowbit(12));
    }
}`,
        explanation: `Bit tricks allow O(1) state tracking, subset iteration, and arithmetic optimizations. We practice masking, toggling, lowbit extraction, Gray codes, and XOR-based problems so you can reason confidently about binary representations.`,
        resources: ['Bitwise Operations', 'Bit Tricks']
    },

    // BASIC PROGRAMMING CONCEPTS (Great for beginners)

    {
        id: 'java-basics',
        title: 'Java Fundamentals',
        description: 'We linger on the basics: fields, constructors, getters, and the `main` method. Every line spells out what the JVM is doing so absolute beginners can connect the dots between syntax and mental models.',
        difficulty: 'beginner',
        topics: ['Variables', 'Data Types', 'Methods', 'Classes', 'Objects'],
        codeExample: `// JavaBasics demonstrates how a class stores state and exposes behaviour.
// Follow the numbered comments to see the life cycle of an object.
public class JavaBasics {
    // 1️⃣ Instance variables belong to each object made from this class.
    private String name;
    private int age;
    
    // 2️⃣ Constructors run when you call "new" and allow you to provide initial values.
    public JavaBasics(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // 3️⃣ Instance methods can use those fields to compute friendly strings.
    public String getInfo() {
        return "Name: " + name + ", Age: " + age;
    }
    
    // 4️⃣ The JVM starts executing in main. We create an object and call its method.
    public static void main(String[] args) {
        JavaBasics person = new JavaBasics("Alice", 25);
        System.out.println(person.getInfo());
    }
}`,
        explanation: `This primer explains the JVM model, primitive vs reference types, memory layout, and how to structure small programs with packages and build tools. Each topic is paired with short exercises so you can move from syntax memorization to writing idiomatic Java.`,
        codeBreakdown: [
            { label: 'Fields', detail: 'Represent the data every instance remembers (name and age).' },
            { label: 'Constructor', detail: 'Runs once per object to copy parameters into the fields.' },
            { label: 'getInfo', detail: 'Demonstrates string concatenation and returning values.' },
            { label: 'main', detail: 'Shows how to instantiate the class and call methods.' }
        ],
        resources: [
            { text: 'Oracle Java Tutorials – Language Basics', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/' },
            { text: 'Java Classes and Objects – W3Schools', url: 'https://www.w3schools.com/java/java_classes.asp' },
            { text: 'Understanding main() in Java – Baeldung', url: 'https://www.baeldung.com/java-main-method' }
        ]
    },

    {
        id: 'control-flow',
        title: 'Control Flow Statements',
        description: 'We narrate the entire method: how if/else chooses a branch, how classic for loops change counters, how enhanced for loops iterate arrays, and what happens if you accidentally create infinite loops.',
        difficulty: 'beginner',
        topics: ['If-Else', 'For Loops', 'While Loops', 'Switch', 'Break/Continue'],
        codeExample: `// Control Flow Examples with detailed narration.
public class ControlFlow {
    public static void main(String[] args) {
        // 1️⃣ If/else ladder chooses exactly one branch.
        int score = 85;
        if (score >= 90) {
            System.out.println("A grade");
        } else if (score >= 80) {
            System.out.println("B grade");
        } else {
            System.out.println("C grade or below");
        }
        
        // 2️⃣ Standard for loop: init → condition check → body → increment.
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
        
        // 3️⃣ Enhanced for loop reads "for each number in numbers".
        int[] numbers = {1, 2, 3, 4, 5};
        for (int num : numbers) {
            System.out.println("Number: " + num);
        }
    }
}`,
        explanation: `We relate each control structure to real scenarios (validation, accumulation, menu handling) and highlight pitfalls like infinite loops or fall-through switches. Flowchart exercises plus debugging tips reinforce how to trace program execution step by step.`,
        codeBreakdown: [
            { label: 'If/Else', detail: 'Selects exactly one path based on the score variable.' },
            { label: 'Classic For Loop', detail: 'Initialises i, checks the condition, runs the body, then increments i.' },
            { label: 'Enhanced For Loop', detail: 'Iterates an array without manual index tracking, perfect for read-only loops.' }
        ],
        resources: [
            { text: 'Oracle Docs – Control Flow Statements', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html' },
            { text: 'Java Loops Made Easy – LearnJava', url: 'https://www.learnjavaonline.org/en/Loops' },
            { text: 'Understanding If/Else – Baeldung', url: 'https://www.baeldung.com/java-if-else' }
        ]
    },

    {
        id: 'oop-basics',
        title: 'Object-Oriented Programming',
        description: 'We zoom in on encapsulation, inheritance, and polymorphism. Comments spell out why `Animal` is abstract, how `Dog` reuses and overrides behaviour, and what happens when you call methods through the base type.',
        difficulty: 'beginner',
        topics: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction', 'Interfaces'],
        codeExample: `// OOP Concepts with heavy narration.
abstract class Animal {
    protected String name; // Shared state for all subclasses.
    
    public Animal(String name) {
        this.name = name; // Constructor ensures every animal has a name.
    }
    
    public abstract void makeSound(); // Subclasses must explain how they sound.
    
    public void sleep() {
        System.out.println(name + " is sleeping"); // Concrete behaviour shared by all animals.
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name); // Reuse the parent constructor.
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says Woof!"); // Polymorphic behaviour unique to Dog.
    }
}

public class OopDemo {
    public static void main(String[] args) {
        Animal pet = new Dog("Luna"); // Reference type is Animal, object type is Dog.
        pet.makeSound(); // Calls Dog.makeSound thanks to dynamic dispatch.
        pet.sleep();     // Inherited method defined in Animal.
    }
}`,
        explanation: `Encapsulation, inheritance, and polymorphism are demonstrated with cohesive mini-systems (bank accounts, game entities) so you see how design choices affect flexibility. Interfaces vs abstract classes, composition-over-inheritance, and SOLID principles round out the lesson.`,
        codeBreakdown: [
            { label: 'Animal', detail: 'Abstract base class that defines what every animal must know/do (name + makeSound + sleep).' },
            { label: 'Dog', detail: 'Concrete subclass that reuses the constructor and overrides makeSound.' },
            { label: 'OopDemo', detail: 'Shows how polymorphism lets us treat a Dog as its base type while still running Dog-specific code.' }
        ],
        resources: [
            { text: 'Oracle Java Tutorials – Object-Oriented Concepts', url: 'https://docs.oracle.com/javase/tutorial/java/concepts/' },
            { text: 'GeeksforGeeks – OOP in Java', url: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/' },
            { text: 'Abstract Classes vs Interfaces – Baeldung', url: 'https://www.baeldung.com/java-interfaces-vs-abstract-classes' }
        ]
    },

    {
        id: 'exception-handling',
        title: 'Exception Handling',
        description: 'We narrate how try/catch/finally sequences execute (success vs failure) and how to throw your own checked exception with meaningful context.',
        difficulty: 'beginner',
        topics: ['Try-Catch', 'Finally Block', 'Custom Exceptions', 'Throws', 'Exception Types'],
        codeExample: `// Exception Handling with narration.
public class ExceptionExample {
    // Handles both the happy path and divide-by-zero failure.
    public static void divide(int a, int b) {
        try {
            int result = a / b; // May throw ArithmeticException if b == 0.
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero!");
        } finally {
            System.out.println("Division operation completed."); // Always runs.
        }
    }
    
    // Demonstrates throwing your own checked exception.
    public static void validateAge(int age) throws InvalidAgeException {
        if (age < 0) {
            throw new InvalidAgeException("Age cannot be negative");
        }
        System.out.println("Validated age: " + age);
    }
}
`,
        explanation: `You will categorize checked vs unchecked exceptions, design custom hierarchies, and use try-with-resources for safe cleanup. Realistic scenarios cover logging, wrapping exceptions to add context, and establishing global handlers to keep apps resilient.`,
        codeBreakdown: [
            { label: 'divide', detail: 'Wraps risky arithmetic in try/catch and shows how finally executes regardless of success.' },
            { label: 'validateAge', detail: 'Illustrates how to throw a custom checked exception with a helpful message.' }
        ],
        resources: [
            { text: 'Oracle Java Tutorials – Exceptions', url: 'https://docs.oracle.com/javase/tutorial/essential/exceptions/' },
            { text: 'Guide to Java Exception Handling – Baeldung', url: 'https://www.baeldung.com/java-exceptions' },
            { text: 'Custom Exception Patterns – GeeksforGeeks', url: 'https://www.geeksforgeeks.org/user-defined-custom-exception-in-java/' }
        ]
    },

    // INTERMEDIATE CONCEPTS

    {
        id: 'collections-framework',
        title: 'Java Collections Framework',
        description: '`CollectionsExample` builds an `ArrayList`, `HashMap`, and `HashSet` inside `main`, highlighting adds, puts, and duplicate handling so each collection’s behavior is tangible.',
        difficulty: 'intermediate',
        topics: ['ArrayList', 'HashMap', 'HashSet', 'TreeMap', 'LinkedList', 'Iterators'],
        codeExample: `// Collections Framework
import java.util.*;

public class CollectionsExample {
    public static void main(String[] args) {
        // ArrayList example
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        
        // HashMap example
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        
        // HashSet example
        Set<Integer> uniqueNumbers = new HashSet<>();
        uniqueNumbers.add(1);
        uniqueNumbers.add(2);
        uniqueNumbers.add(1); // Duplicate ignored
        
        System.out.println("Unique numbers: " + uniqueNumbers.size());
    }
}`,
        explanation: `We benchmark List/Set/Map variants, discuss ordering and concurrency characteristics, and show how iterators, streams, and collectors interact with collections. Practical labs include implementing caches, frequency tables, and multi-map utilities.`,
        resources: ['Java Collections', 'Map vs Set', 'Collection Performance']
    },

    {
        id: 'file-io',
        title: 'File Input/Output',
        description: '`writeToFile` and `readFromFile` pair try-with-resources with FileWriter and Scanner, illustrating how to open, stream, and close files while surfacing friendly error messages.',
        difficulty: 'intermediate',
        topics: ['FileReader', 'FileWriter', 'BufferedReader', 'Scanner', 'Path API'],
        codeExample: `// File I/O Operations
import java.io.*;
import java.util.Scanner;

public class FileIOExample {
    public static void writeToFile(String filename, String content) {
        try (FileWriter writer = new FileWriter(filename)) {
            writer.write(content);
            System.out.println("File written successfully!");
        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }
    }
    
    public static void readFromFile(String filename) {
        try (Scanner scanner = new Scanner(new File(filename))) {
            while (scanner.hasNextLine()) {
                System.out.println(scanner.nextLine());
            }
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        }
    }
}`,
        explanation: `The I/O unit compares classic streams vs NIO.2, shows buffered vs unbuffered performance, and demonstrates reading JSON/CSV safely. You will practice try-with-resources, directory walking, and serialization basics to build small ETL pipelines.`,
        resources: ['Java I/O Streams', 'File Handling', 'NIO.2 Path API']
    },

    {
        id: 'multithreading',
        title: 'Multithreading Basics',
        description: 'A `Counter` implements Runnable, prints progress inside `run`, and two threads are started in `main`, letting you trace scheduling, sleeping, and graceful interruption.',
        difficulty: 'intermediate',
        topics: ['Thread Class', 'Runnable Interface', 'Synchronization', 'Thread Safety'],
        codeExample: `// Multithreading Example
public class ThreadExample {
    // Implementing Runnable
    static class Counter implements Runnable {
        private String name;
        
        public Counter(String name) {
            this.name = name;
        }
        
        @Override
        public void run() {
            for (int i = 1; i <= 5; i++) {
                System.out.println(name + ": " + i);
                try {
                    Thread.sleep(1000); // Sleep for 1 second
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }
    
    public static void main(String[] args) {
        Thread t1 = new Thread(new Counter("Thread-1"));
        Thread t2 = new Thread(new Counter("Thread-2"));
        
        t1.start();
        t2.start();
    }
}`,
        explanation: `We start with thread lifecycle basics, then introduce synchronization primitives (locks, volatile, atomics) and higher-level executors. Case studies cover producer-consumer queues, progress bars, and responsiveness tips for desktop or server apps.`,
        resources: ['Java Concurrency', 'Thread Synchronization', 'Executor Framework']
    },

    // ADVANCED CONCEPTS

    {
        id: 'design-patterns',
        title: 'Design Patterns',
        description: 'We showcase a synchronized lazy `DatabaseConnection` singleton plus a switch-based `ShapeFactory`, explaining why constructors stay private and how factories centralize object creation.',
        difficulty: 'advanced',
        topics: ['Singleton', 'Factory', 'Observer', 'Strategy', 'MVC'],
        codeExample: `// Design Patterns - Singleton Example
public class DatabaseConnection {
    private static DatabaseConnection instance;
    private String connectionString;
    
    private DatabaseConnection() {
        connectionString = "jdbc:mysql://localhost:3306/mydb";
    }
    
    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
    
    public void connect() {
        System.out.println("Connected to: " + connectionString);
    }
}

// Factory Pattern Example
interface Shape {
    void draw();
}

class ShapeFactory {
    public static Shape createShape(String type) {
        switch (type.toLowerCase()) {
            case "circle": return new Circle();
            case "rectangle": return new Rectangle();
            default: throw new IllegalArgumentException("Unknown shape");
        }
    }
}`,
        explanation: `Each pattern includes intent, class diagrams, and annotated Java implementations so you know when to apply it. Coverage spans creational, structural, and behavioral patterns plus modern twists like dependency injection and event-driven design.`,
        resources: ['Gang of Four Patterns', 'Java Design Patterns', 'When to Use Patterns']
    },

    {
        id: 'lambda-streams',
        title: 'Lambda Expressions & Streams',
        description: 'The stream pipeline filters even numbers, maps them to squares, collects a list, then chains mapToInt/filter/average, so each stage’s role is spelled out in order.',
        difficulty: 'advanced',
        topics: ['Lambda Expressions', 'Stream API', 'Method References', 'Functional Interfaces'],
        codeExample: `// Lambda and Streams
import java.util.*;
import java.util.stream.*;

public class LambdaStreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Lambda with Streams
        List<Integer> evenSquares = numbers.stream()
            .filter(n -> n % 2 == 0)           // Lambda expression
            .map(n -> n * n)                   // Method reference alternative: Integer::square
            .collect(Collectors.toList());
        
        System.out.println("Even squares: " + evenSquares);
        
        // More complex stream operations
        OptionalDouble average = numbers.stream()
            .mapToInt(Integer::intValue)
            .filter(n -> n > 5)
            .average();
        
        average.ifPresent(avg -> System.out.println("Average: " + avg));
    }
}`,
        explanation: `Lambda labs emphasize pure functions, higher-order utilities, and fluent stream operations. You'll write collectors, compose predicates, handle optional values, and contrast imperative vs declarative implementations for clarity and parallelism.`,
        resources: ['Java 8 Features', 'Stream API Guide', 'Functional Programming']
    },

    {
        id: 'generics',
        title: 'Java Generics',
        description: 'Generic `Box<T>`, the `<T> void swap` helper, and the bounded `average` method demonstrate how type parameters travel through classes, methods, and Number constraints.',
        difficulty: 'intermediate',
        topics: ['Generic Classes', 'Generic Methods', 'Wildcards', 'Type Erasure', 'Bounds'],
        codeExample: `// Generics Example
public class GenericExample {
    // Generic class
    static class Box<T> {
        private T content;
        
        public void set(T content) {
            this.content = content;
        }
        
        public T get() {
            return content;
        }
    }
    
    // Generic method
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    // Bounded generics
    public static <T extends Number> double average(T[] numbers) {
        double sum = 0.0;
        for (T num : numbers) {
            sum += num.doubleValue();
        }
        return sum / numbers.length;
    }
}`,
        explanation: `We explore how generics enforce type safety, how wildcards (? extends/? super) guide API design, and what type erasure means at runtime. Exercises include building generic repositories, comparators, and fluent builders without casting.`,
        resources: ['Java Generics Tutorial', 'Type Safety', 'Wildcard Usage']
    },

    {
        id: 'testing-junit',
        title: 'Unit Testing with JUnit',
        description: '`CalculatorTest` uses `@BeforeEach` setup, assertion-based tests, exception checks, and a parameterized suite, clarifying what each annotation adds to the run.',
        difficulty: 'intermediate',
        topics: ['JUnit Basics', 'Test Assertions', 'Test Lifecycle', 'Mocking', 'TDD'],
        codeExample: `// JUnit Testing Example
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {
    private Calculator calculator;
    
    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }
    
    @Test
    @DisplayName("Addition should work correctly")
    void testAddition() {
        assertEquals(5, calculator.add(2, 3));
        assertEquals(0, calculator.add(-1, 1));
    }
    
    @Test
    void testDivision() {
        assertEquals(2.0, calculator.divide(10, 5), 0.001);
        
        // Testing exceptions
        assertThrows(ArithmeticException.class, () -> {
            calculator.divide(10, 0);
        });
    }
    
    @ParameterizedTest
    @ValueSource(ints = {2, 4, 6, 8})
    void testEvenNumbers(int number) {
        assertTrue(calculator.isEven(number));
    }
}`,
        explanation: `Beyond basic assertions, you will organize tests with lifecycle hooks, parameterized inputs, and nested suites. We also integrate mocks, coverage targets, and CI habits so your codebase gains reliable regression protection.`,
        resources: ['JUnit 5 Guide', 'Test Driven Development', 'Mocking Frameworks']
    },

    // DATABASE & WEB CONCEPTS

    {
        id: 'jdbc-basics',
        title: 'Database Connectivity (JDBC)',
        description: '`getStudents` and `insertStudent` open connections with try-with-resources, build statements (plain vs prepared), bind parameters, and iterate result sets so database I/O order is explicit.',
        difficulty: 'intermediate',
        topics: ['JDBC Drivers', 'Connection', 'Statement', 'ResultSet', 'Prepared Statements'],
        codeExample: `// JDBC Example
import java.sql.*;

public class JDBCExample {
    private static final String URL = "jdbc:mysql://localhost:3306/school";
    private static final String USER = "username";
    private static final String PASSWORD = "password";
    
    public static void getStudents() {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM students")) {
            
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id") + 
                                 ", Name: " + rs.getString("name"));
            }
        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
        }
    }
    
    public static void insertStudent(String name, int age) {
        String sql = "INSERT INTO students (name, age) VALUES (?, ?)";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, name);
            pstmt.setInt(2, age);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error inserting student: " + e.getMessage());
        }
    }
}`,
        explanation: `JDBC coverage includes driver setup, connection pooling, prepared statements, and transaction management. You'll practice defensive coding against SQL injection, map result sets to objects, and compare raw JDBC with higher-level ORM approaches.`,
        resources: ['JDBC Tutorial', 'SQL Basics', 'Database Best Practices']
    },
    {
        id: 'graph-algorithms-pro',
        title: 'Graph Algorithms Pro',
        description: 'We pair a reusable `WeightedGraph` class with Dijkstra and topological sort helpers so you can see adjacency lists, priority queues, and indegree tracking working together.',
        difficulty: 'advanced',
        topics: ['Dijkstra', 'Topological Sort', 'Directed Graphs', 'Adjacency List', 'Cycle Detection'],
        codeExample: `import java.util.*;

class WeightedGraph {
    static class Edge {
        final int to, weight;
        Edge(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }

    private final Map<Integer, List<Edge>> graph = new HashMap<>();

    public void addEdge(int from, int to, int weight) {
        graph.computeIfAbsent(from, k -> new ArrayList<>()).add(new Edge(to, weight));
        graph.computeIfAbsent(to, k -> new ArrayList<>());
    }

    public Map<Integer, Integer> dijkstra(int source) {
        Map<Integer, Integer> distance = new HashMap<>();
        graph.keySet().forEach(node -> distance.put(node, Integer.MAX_VALUE));
        distance.put(source, 0);

        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        pq.offer(new int[]{source, 0});

        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int node = current[0];
            int dist = current[1];
            if (dist > distance.get(node)) continue;

            for (Edge edge : graph.getOrDefault(node, List.of())) {
                int newDist = dist + edge.weight;
                if (newDist < distance.get(edge.to)) {
                    distance.put(edge.to, newDist);
                    pq.offer(new int[]{edge.to, newDist});
                }
            }
        }
        return distance;
    }

    public List<Integer> topoSort() {
        Map<Integer, Integer> indegree = new HashMap<>();
        graph.keySet().forEach(node -> indegree.put(node, 0));
        graph.forEach((node, edges) -> edges.forEach(edge -> indegree.merge(edge.to, 1, Integer::sum)));

        Queue<Integer> queue = new ArrayDeque<>();
        indegree.forEach((node, degree) -> {
            if (degree == 0) queue.offer(node);
        });

        List<Integer> ordering = new ArrayList<>();
        while (!queue.isEmpty()) {
            int node = queue.poll();
            ordering.add(node);
            for (Edge edge : graph.getOrDefault(node, List.of())) {
                indegree.merge(edge.to, -1, Integer::sum);
                if (indegree.get(edge.to) == 0) {
                    queue.offer(edge.to);
                }
            }
        }
        return ordering;
    }

    public static void main(String[] args) {
        WeightedGraph graph = new WeightedGraph();
        graph.addEdge(0, 1, 2);
        graph.addEdge(0, 2, 5);
        graph.addEdge(1, 2, 1);
        graph.addEdge(1, 3, 4);

        System.out.println(graph.dijkstra(0)); // {0=0, 1=2, 2=3, 3=6}
        System.out.println(graph.topoSort());  // valid DAG ordering
    }
}`,
        explanation: `You will practice modeling weighted graphs, implementing Dijkstra with a PQ, and producing topological orders using indegree buckets. We also cover how to detect negative edges, cache parent pointers for shortest path reconstruction, and reason about DAG DP.`,
        resources: ['Dijkstra Visualization', 'Topological Ordering Guide', 'Graph Pattern Cheat Sheet']
    },
    {
        id: 'dynamic-programming-playbook',
        title: 'Dynamic Programming Playbook',
        description: 'The module disassembles LIS and classic knapsack from brute force to memoization/tabulation so the DP transition, base cases, and reconstruction flow are explicit.',
        difficulty: 'advanced',
        topics: ['Memoization', 'Tabulation', 'Knapsack', 'LIS', 'State Compression'],
        codeExample: `import java.util.Arrays;

public class DynamicProgrammingPlaybook {
    public static int longestIncreasingSubsequence(int[] nums) {
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int best = 0;
        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            best = Math.max(best, dp[i]);
        }
        return best;
    }

    public static int knapSack(int capacity, int[] weights, int[] values) {
        int[][] dp = new int[weights.length + 1][capacity + 1];
        for (int i = 1; i <= weights.length; i++) {
            for (int w = 0; w <= capacity; w++) {
                if (weights[i - 1] > w) {
                    dp[i][w] = dp[i - 1][w];
                } else {
                    dp[i][w] = Math.max(
                        dp[i - 1][w],
                        values[i - 1] + dp[i - 1][w - weights[i - 1]]
                    );
                }
            }
        }
        return dp[weights.length][capacity];
    }

    public static void main(String[] args) {
        System.out.println(longestIncreasingSubsequence(new int[]{10,9,2,5,3,7,101,18})); // 4
        System.out.println(knapSack(7, new int[]{1,3,4,5}, new int[]{1,4,5,7})); // 9
    }
}`,
        explanation: `We zoom in on identifying state variables, transitions, and reusing memory. Expect tear-downs of LIS, knapsack, edit distance, and grid DP so you learn to move from recursion → memoization → tabulation confidently.`,
        resources: ['DP Patterns', 'Top 14 DP Problems', 'State Compression Tips']
    },
    {
        id: 'concurrency-basics',
        title: 'Concurrency & Threading Basics',
        description: 'A `Counter` with synchronized blocks, an `ExecutorService` based worker pool, and scheduled tasks demonstrate race-free increments, cooperative shutdown, and periodic reminders.',
        difficulty: 'intermediate',
        topics: ['Threads', 'Synchronization', 'ExecutorService', 'Atomic Variables', 'Scheduling'],
        codeExample: `import java.util.concurrent.*;
import java.util.stream.IntStream;

class Counter {
    private int value = 0;
    public synchronized void increment() {
        value++;
    }
    public int getValue() {
        return value;
    }
}

public class ConcurrencyBasics {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        ExecutorService pool = Executors.newFixedThreadPool(4);

        IntStream.range(0, 1000).forEach(i -> pool.submit(counter::increment));
        pool.shutdown();
        pool.awaitTermination(1, TimeUnit.SECONDS);
        System.out.println("Count = " + counter.getValue());

        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(() -> System.out.println("Hydrate + stretch!"), 0, 30, TimeUnit.SECONDS);

        Thread.sleep(95); // demo only
        scheduler.shutdownNow();
    }
}`,
        explanation: `This module explains why race conditions appear, when to use synchronized blocks vs. locks, and how thread pools simplify workload fan-out. You will also practice with scheduled jobs, futures, and graceful shutdown so your CLI tools don’t leak threads.`,
        resources: ['Java Concurrency Guide', 'ExecutorService Patterns', 'Effective Java Concurrency Chapter']
    },
    {
        id: 'segment-trees',
        title: 'Segment Trees & Range Queries',
        description: 'We build a reusable segment tree that supports O(log n) range sum queries and point updates, annotating every recursion branch so you understand how the tree spans the array.',
        difficulty: 'advanced',
        topics: ['Divide and Conquer', 'Range Queries', 'Lazy Propagation', 'Tree Recursion'],
        codeExamples: {
            java: `// Segment tree for range sum queries with point updates
class SegmentTree {
    private final int[] tree;
    private final int n;

    SegmentTree(int[] nums) {
        n = nums.length;
        tree = new int[4 * n];
        build(1, 0, n - 1, nums); // Node, left, right, source array
    }

    private void build(int node, int left, int right, int[] nums) {
        if (left == right) { // Leaf holds single element
            tree[node] = nums[left];
            return;
        }
        int mid = (left + right) / 2;
        build(node * 2, left, mid, nums);
        build(node * 2 + 1, mid + 1, right, nums);
        tree[node] = tree[node * 2] + tree[node * 2 + 1]; // Parent = sum(children)
    }

    public void update(int index, int value) {
        update(1, 0, n - 1, index, value);
    }

    private void update(int node, int left, int right, int index, int value) {
        if (left == right) {
            tree[node] = value;
            return;
        }
        int mid = (left + right) / 2;
        if (index <= mid) update(node * 2, left, mid, index, value);
        else update(node * 2 + 1, mid + 1, right, index, value);
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    }

    public int query(int l, int r) {
        return query(1, 0, n - 1, l, r);
    }

    private int query(int node, int left, int right, int l, int r) {
        if (r < left || right < l) return 0;   // Segment outside range
        if (l <= left && right <= r) return tree[node]; // Fully covered
        int mid = (left + right) / 2;
        int leftSum = query(node * 2, left, mid, l, r);
        int rightSum = query(node * 2 + 1, mid + 1, right, l, r);
        return leftSum + rightSum;
    }
}`,
            cpp: `// Segment tree for range sum queries
class SegmentTree {
    vector<int> tree;
    int n;

    void build(int node, int left, int right, const vector<int>& nums) {
        if (left == right) {
            tree[node] = nums[left];
            return;
        }
        int mid = (left + right) / 2;
        build(node * 2, left, mid, nums);
        build(node * 2 + 1, mid + 1, right, nums);
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    }

public:
    SegmentTree(const vector<int>& nums) {
        n = nums.size();
        tree.assign(4 * n, 0);
        build(1, 0, n - 1, nums);
    }

    void update(int index, int value, int node, int left, int right) {
        if (left == right) {
            tree[node] = value;
            return;
        }
        int mid = (left + right) / 2;
        if (index <= mid) update(index, value, node * 2, left, mid);
        else update(index, value, node * 2 + 1, mid + 1, right);
        tree[node] = tree[node * 2] + tree[node * 2 + 1];
    }

    int query(int l, int r, int node, int left, int right) {
        if (r < left || right < l) return 0;
        if (l <= left && right <= r) return tree[node];
        int mid = (left + right) / 2;
        return query(l, r, node * 2, left, mid) +
               query(l, r, node * 2 + 1, mid + 1, right);
    }
};`,
            python: `# Segment tree for range sums
class SegmentTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (4 * self.n)
        self._build(1, 0, self.n - 1, nums)

    def _build(self, node, left, right, nums):
        if left == right:
            self.tree[node] = nums[left]
            return
        mid = (left + right) // 2
        self._build(node * 2, left, mid, nums)
        self._build(node * 2 + 1, mid + 1, right, nums)
        self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1]

    def update(self, index, value, node=1, left=0, right=None):
        right = self.n - 1 if right is None else right
        if left == right:
            self.tree[node] = value
            return
        mid = (left + right) // 2
        if index <= mid:
            self.update(index, value, node * 2, left, mid)
        else:
            self.update(index, value, node * 2 + 1, mid + 1, right)
        self.tree[node] = self.tree[node * 2] + self.tree[node * 2 + 1]

    def query(self, ql, qr, node=1, left=0, right=None):
        right = self.n - 1 if right is None else right
        if qr < left or right < ql:
            return 0
        if ql <= left and right <= qr:
            return self.tree[node]
        mid = (left + right) // 2
        return self.query(ql, qr, node * 2, left, mid) + \
               self.query(ql, qr, node * 2 + 1, mid + 1, right)`,
            javascript: `// Segment tree implemented with arrays
class SegmentTree {
    constructor(nums) {
        this.n = nums.length;
        this.tree = Array(4 * this.n).fill(0);
        this.build(1, 0, this.n - 1, nums);
    }

    build(node, left, right, nums) {
        if (left === right) {
            this.tree[node] = nums[left];
            return;
        }
        const mid = Math.floor((left + right) / 2);
        this.build(node * 2, left, mid, nums);
        this.build(node * 2 + 1, mid + 1, right, nums);
        this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
    }

    update(index, value, node = 1, left = 0, right = this.n - 1) {
        if (left === right) {
            this.tree[node] = value;
            return;
        }
        const mid = Math.floor((left + right) / 2);
        if (index <= mid) this.update(index, value, node * 2, left, mid);
        else this.update(index, value, node * 2 + 1, mid + 1, right);
        this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
    }

    query(l, r, node = 1, left = 0, right = this.n - 1) {
        if (r < left || right < l) return 0;
        if (l <= left && right <= r) return this.tree[node];
        const mid = Math.floor((left + right) / 2);
        return this.query(l, r, node * 2, left, mid) +
               this.query(l, r, node * 2 + 1, mid + 1, right);
    }
}`
        },
        explanation: `Range structures feel abstract, so we trace every recursive branch, annotate overlap checks, and compare complexity with prefix sums. Extensions cover lazy propagation, min/max trees, and when Fenwick trees are a tighter fit.`,
        resources: ['Segment Tree Visualizer', 'Fenwick vs Segment Trees', 'Range Query Patterns']
    },
    {
        id: 'disjoint-set-union',
        title: 'Disjoint Set Union (Union-Find)',
        description: 'The DSU module instruments path compression and union by rank with console logs so you can watch parent pointers flatten and understand how connectivity answers become near constant time.',
        difficulty: 'intermediate',
        topics: ['Union-Find', 'Path Compression', 'Connected Components', 'Cycle Detection'],
        codeExamples: {
            java: `// Disjoint Set Union with path compression and union by rank
class DisjointSet {
    private final int[] parent;
    private final int[] rank;

    DisjointSet(int size) {
        parent = new int[size];
        rank = new int[size];
        for (int i = 0; i < size; i++) {
            parent[i] = i; // Each node starts as its own parent
        }
    }

    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }

    void union(int a, int b) {
        int rootA = find(a);
        int rootB = find(b);
        if (rootA == rootB) return; // Already connected
        if (rank[rootA] < rank[rootB]) parent[rootA] = rootB;
        else if (rank[rootA] > rank[rootB]) parent[rootB] = rootA;
        else {
            parent[rootB] = rootA;
            rank[rootA]++;
        }
    }

    boolean connected(int a, int b) {
        return find(a) == find(b);
    }
}`,
            cpp: `// DSU implementation
class DisjointSet {
    vector<int> parent, rank;
public:
    DisjointSet(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }

    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]);
        return parent[x];
    }

    void unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return;
        if (rank[a] < rank[b]) swap(a, b);
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
    }
};`,
            python: `# Disjoint set union
class DisjointSet:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a, b):
        root_a, root_b = self.find(a), self.find(b)
        if root_a == root_b:
            return
        if self.rank[root_a] < self.rank[root_b]:
            root_a, root_b = root_b, root_a
        self.parent[root_b] = root_a
        if self.rank[root_a] == self.rank[root_b]:
            self.rank[root_a] += 1`,
            javascript: `// Union-Find data structure
class DisjointSet {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(a, b) {
        let rootA = this.find(a);
        let rootB = this.find(b);
        if (rootA === rootB) return;
        if (this.rank[rootA] < this.rank[rootB]) {
            [rootA, rootB] = [rootB, rootA];
        }
        this.parent[rootB] = rootA;
        if (this.rank[rootA] === this.rank[rootB]) {
            this.rank[rootA]++;
        }
    }
}`
        },
        explanation: `We explore DSU internals, build a cycle detector for undirected graphs, and visualize how repeated finds reshape the forest. You will also wire DSU into Kruskal’s MST and friend-group problems to see practical payoffs.`,
        resources: ['Union-Find Guide', 'Kruskal Walkthrough', 'Dynamic Connectivity Patterns']
    },
    {
        id: 'string-patterns',
        title: 'String Pattern Matching',
        description: 'This module implements the Knuth-Morris-Pratt (KMP) matcher and contrasts it with a sliding window brute force so you can trace prefix table construction and reuse.',
        difficulty: 'advanced',
        topics: ['KMP', 'Prefix Function', 'Pattern Matching', 'String Algorithms'],
        codeExamples: {
            java: `// KMP string matching
class KMPMatcher {
    private int[] buildLPS(String pattern) {
        int[] lps = new int[pattern.length()];
        int len = 0;
        for (int i = 1; i < pattern.length(); ) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                lps[i++] = ++len;
            } else if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i++] = 0;
            }
        }
        return lps;
    }

    int search(String text, String pattern) {
        if (pattern.isEmpty()) return 0;
        int[] lps = buildLPS(pattern);
        int i = 0, j = 0;
        while (i < text.length()) {
            if (text.charAt(i) == pattern.charAt(j)) {
                i++; j++;
                if (j == pattern.length()) return i - j;
            } else if (j != 0) {
                j = lps[j - 1]; // Reuse previous border
            } else {
                i++;
            }
        }
        return -1;
    }
}`,
            cpp: `// KMP search in C++
vector<int> buildLPS(const string& pattern) {
    vector<int> lps(pattern.size());
    int len = 0;
    for (int i = 1; i < pattern.size(); ) {
        if (pattern[i] == pattern[len]) {
            lps[i++] = ++len;
        } else if (len != 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}

int kmpSearch(const string& text, const string& pattern) {
    if (pattern.empty()) return 0;
    vector<int> lps = buildLPS(pattern);
    int i = 0, j = 0;
    while (i < text.size()) {
        if (text[i] == pattern[j]) {
            i++; j++;
            if (j == pattern.size()) return i - j;
        } else if (j != 0) {
            j = lps[j - 1];
        } else {
            i++;
        }
    }
    return -1;
}`,
            python: `# KMP search in Python with comments
def build_lps(pattern):
    lps = [0] * len(pattern)
    length = 0  # Length of the previous longest prefix suffix
    i = 1
    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length != 0:
            length = lps[length - 1]  # Fall back to shorter border
        else:
            lps[i] = 0
            i += 1
    return lps

def kmp_search(text, pattern):
    if not pattern:
        return 0
    lps = build_lps(pattern)
    i = j = 0
    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                return i - j
        elif j != 0:
            j = lps[j - 1]
        else:
            i += 1
    return -1`,
            javascript: `// JavaScript KMP implementation
function buildLPS(pattern) {
    const lps = Array(pattern.length).fill(0);
    let len = 0;
    for (let i = 1; i < pattern.length; ) {
        if (pattern[i] === pattern[len]) {
            lps[i++] = ++len;
        } else if (len !== 0) {
            len = lps[len - 1];
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}

function kmpSearch(text, pattern) {
    if (!pattern.length) return 0;
    const lps = buildLPS(pattern);
    let i = 0, j = 0;
    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++; j++;
            if (j === pattern.length) return i - j;
        } else if (j !== 0) {
            j = lps[j - 1];
        } else {
            i++;
        }
    }
    return -1;
}`
        },
        explanation: `We demystify the prefix table (LPS array), visualize how matches shift without rescanning characters, and compare with Rabin-Karp and Z-algorithm trade-offs. Practice exercises include DNA motif search and log scanning.`,
        resources: ['KMP Tutorial', 'Visual String Matching', 'Pattern Matching Cheat Sheet']
    }
];

const MODULE_DISPLAY_ORDER = {
    'java-basics': 0,
    'control-flow': 1,
    'oop-basics': 2,
    'exception-handling': 3,
    'arrays-strings': 4,
    'stacks-queues': 5,
    'linked-lists': 6,
    'trees-basics': 7,
    'hash-tables': 8,
    'heaps': 9,
    'sorting-algorithms': 10,
    'searching-algorithms': 11
};

const DIFFICULTY_RANK = { beginner: 0, intermediate: 1, advanced: 2 };

modules.sort((a, b) => {
    const priorityA = MODULE_DISPLAY_ORDER[a.id] ?? Number.MAX_SAFE_INTEGER;
    const priorityB = MODULE_DISPLAY_ORDER[b.id] ?? Number.MAX_SAFE_INTEGER;
    if (priorityA !== priorityB) return priorityA - priorityB;
    const diffRank = (DIFFICULTY_RANK[a.difficulty] ?? 99) - (DIFFICULTY_RANK[b.difficulty] ?? 99);
    if (diffRank !== 0) return diffRank;
    return a.title.localeCompare(b.title);
});

const modulePlaygroundSnippets = buildPlaygroundSnippetLibrary(modules);
const PLAYGROUND_SNIPPETS = { ...BASE_PLAYGROUND_SNIPPETS, ...modulePlaygroundSnippets };
const BASE_PLAYGROUND_SNIPPET_KEYS = Object.keys(BASE_PLAYGROUND_SNIPPETS);
const MODULE_PLAYGROUND_SNIPPET_KEYS = Object.keys(modulePlaygroundSnippets);

const SAMPLE_LANGUAGES = ['java', 'python', 'cpp', 'javascript'];

function formatIdentifier(id = '') {
    return id.split(/[-\s]/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('') || 'Module';
}

function buildSampleCode(module, language) {
    const title = module.title || 'Module';
    const summary = (module.topics || []).slice(0, 3).join(', ') || 'core concepts';
    const className = formatIdentifier(module.id);

    switch (language) {
        case 'python':
            return `# ${title} in Python
# Focus: ${summary}

class ${className}Module:
    def __init__(self):
        self.notes = []

    def walkthrough(self):
        print("Working through ${title}...")
        for step in ["review theory", "trace code", "practice problems"]:
            print(f"- {step}")


if __name__ == "__main__":
    module = ${className}Module()
    module.walkthrough()
`;
        case 'cpp':
            return `// ${title} in C++
// Topics: ${summary}
#include <iostream>
#include <vector>

class ${className}Module {
public:
    void walkthrough() {
        std::vector<std::string> steps = {"review theory", "trace code", "implement practice"};
        for (const auto& step : steps) {
            std::cout << step << std::endl;
        }
    }
};

int main() {
    ${className}Module module;
    module.walkthrough();
    return 0;
}
`;
        case 'javascript':
            return `// ${title} in JavaScript
// Highlights: ${summary}
class ${className}Module {
    walkthrough() {
        const steps = ["concept overview", "code tracing", "practice challenge"];
        steps.forEach(step => console.log(\`✔️ \${step}\`));
    }
}

const module = new ${className}Module();
module.walkthrough();
`;
        default:
            return module.codeExample || `// ${title} in Java
// Topics: ${summary}
public class ${className}Module {
    public void walkthrough() {
        String[] steps = {"concept overview", "code tracing", "practice challenge"};
        for (String step : steps) {
            System.out.println("✔️ " + step);
        }
    }

    public static void main(String[] args) {
        new ${className}Module().walkthrough();
    }
}
`;
    }
}

modules.forEach(module => {
    module.codeExamples = module.codeExamples ? { ...module.codeExamples } : {};
    SAMPLE_LANGUAGES.forEach(language => {
        if (!module.codeExamples[language]) {
            module.codeExamples[language] = buildSampleCode(module, language);
        }
    });
});

CONSTANTS.TOTAL_MODULES = modules.length;
const luminaryLevel = ACHIEVEMENT_LEVELS.find(level => level.id === 'luminary');
if (luminaryLevel) {
    luminaryLevel.threshold = CONSTANTS.TOTAL_MODULES;
}

const flashcardDecks = generateFlashcardDecks(modules, baseFlashcards);

const dailyChallenges = [
    {
        id: 'arrays-two-pointer-refresh',
        title: 'Two-Pointer Sprint',
        description: 'Recreate the palindrome checker from memory, then extend it to ignore emoji or punctuation.',
        steps: [
            'Rewrite the base palindrome helper without looking.',
            'Add support for Unicode or emoji filtering.',
            'Test with at least 3 tricky strings.'
        ],
        moduleId: 'arrays-strings'
    },
    {
        id: 'linkedlist-cycle-visual',
        title: 'Cycle Detective',
        description: 'Trace Floyd’s cycle algorithm with a custom diagram.',
        steps: [
            'Draw a small linked list with a loop.',
            'Record the positions of slow/fast for 4 iterations.',
            'Explain in your own words why they must meet.'
        ],
        moduleId: 'linked-lists'
    },
    {
        id: 'graphs-bfs-refresh',
        title: 'BFS Map Builder',
        description: 'Turn the BFS demo into pseudo-code with comments you would ship to a teammate.',
        steps: [
            'Outline the queue operations and visited set usage.',
            'Add a guard for disconnected nodes.',
            'Write one real-world scenario where BFS beats DFS.'
        ],
        moduleId: 'graph-algorithms'
    },
    {
        id: 'dp-table',
        title: 'DP Table Snapshot',
        description: 'Freeze-frame the LIS dynamic programming table and annotate the transitions.',
        steps: [
            'Log the dp[] array after each iteration.',
            'Summarize why LIS is O(n²) here.',
            'Convert the solution to a tabulation diagram.'
        ],
        moduleId: 'dynamic-programming'
    },
    {
        id: 'heaps-visual',
        title: 'Heapify Drill',
        description: 'Practice manual heapify by writing down the array after each swap.',
        steps: [
            'Start with the sample array in the module.',
            'Track each left/right child comparison.',
            'Explain when you’d reach for a heap instead of a sorted list.'
        ],
        moduleId: 'heaps'
    }
];

const studyTips = [
    'Chunk study time into 25-minute deep work blocks and log them in the Focus Tracker.',
    'Explain an algorithm out loud or to a rubber duck before reading the official solution.',
    'Switch the global font size in Settings if your eyes feel strained—comfort boosts focus.',
    'Mark modules as complete only after you can summarize the code without peeking.',
    'Use the Daily Challenge as your warm-up, then tackle a related module exercise.',
    'Pair flashcards with code: after seeing a definition, open the module snippet it references.',
    'Refresh the Study Tip when you finish a module to keep motivation high.'
];

function generateFlashcardDecks(modulesData, generalCards = []) {
    const decks = {};

    modulesData.forEach(module => {
        const cards = [];
        const topics = module.topics || [];
        const explanation = module.explanation || module.description || '';
        const resources = (module.resources || [])
            .map(resource => typeof resource === 'string' ? resource : resource?.text || resource?.url || '')
            .filter(Boolean);

        cards.push({
            moduleId: module.id,
            question: `What is the focus of ${module.title}?`,
            answer: module.description
        });

        if (explanation) {
            cards.push({
                moduleId: module.id,
                question: `Why is ${module.title} important for your Java DSA journey?`,
                answer: explanation
            });
        }

        if (topics.length) {
            cards.push({
                moduleId: module.id,
                question: `List some of the topics covered in ${module.title}.`,
                answer: topics.join(', ')
            });

            topics.slice(0, 10).forEach(topic => {
                cards.push({
                    moduleId: module.id,
                    question: `Which module should you revisit for ${topic}?`,
                    answer: `${module.title} (${module.difficulty})`
                });
            });
        }

        cards.push({
            moduleId: module.id,
            question: `What is the difficulty level of ${module.title}?`,
            answer: module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)
        });

        if (resources.length) {
            const resourceText = resources.map(resource => {
                if (typeof resource === 'string') return resource;
                if (resource.text) return resource.text;
                return resource.url || 'Resource';
            }).join(', ');
            cards.push({
                moduleId: module.id,
                question: `Name a supporting resource for ${module.title}.`,
                answer: resourceText
            });
        }

        cards.push({
            moduleId: module.id,
            question: `How would you describe ${module.title} to a classmate?`,
            answer: module.description
        });

        decks[module.id] = cards;
    });

    const deckCollection = { ...decks };

    if (generalCards.length) {
        deckCollection.general = generalCards.map(card => ({
            ...card,
            moduleId: 'general'
        }));
    }

    deckCollection.all = [
        ...(deckCollection.general || []),
        ...Object.values(decks).flat()
    ];

    return deckCollection;
}

function getFlashcardDeck(moduleId) {
    if (moduleId === 'general') {
        return flashcardDecks.general || [];
    }
    if (moduleId === 'all') {
        const unlockedDecks = modules
            .filter(module => isFlashcardModuleAccessible(module.id))
            .flatMap(module => flashcardDecks[module.id] || []);
        return [
            ...(flashcardDecks.general || []),
            ...unlockedDecks
        ];
    }
    if (!isFlashcardModuleAccessible(moduleId)) return [];
    return flashcardDecks[moduleId] || [];
}

function shuffleArray(array) {
    const cloned = [...array];
    for (let i = cloned.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }
    return cloned;
}

function isFlashcardModuleAccessible(moduleId) {
    if (!moduleId || moduleId === 'all' || moduleId === 'general') return true;
    const moduleIndex = modules.findIndex(module => module.id === moduleId);
    if (moduleIndex === -1) return true;
    if (moduleIndex < FREE_FLASHCARD_MODULES) return true;
    return appState.completedQuizzes.has(moduleId);
}

function markQuizCompleted(moduleId) {
    if (!moduleId) return;
    if (!appState.completedQuizzes.has(moduleId)) {
        appState.completedQuizzes.add(moduleId);
        populateFlashcardModuleSelect();
        if (appState.selectedFlashcardModule === moduleId) {
            refreshFlashcardSession(moduleId, { persist: false });
        }
        saveToLocalStorage();
    }
}

function chooseRandomChallenge(excludeId = null) {
    if (!dailyChallenges.length) return null;
    const pool = excludeId ? dailyChallenges.filter(challenge => challenge.id !== excludeId) : dailyChallenges;
    const source = pool.length ? pool : dailyChallenges;
    return source[Math.floor(Math.random() * source.length)];
}

function ensureDailyChallenge(force = false) {
    if (!dailyChallenges.length) return null;
    const today = new Date().toISOString().split('T')[0];
    let changed = false;

    if (
        force ||
        !appState.dailyChallengeId ||
        appState.dailyChallengeDate !== today
    ) {
        const nextChallenge = chooseRandomChallenge(force ? appState.dailyChallengeId : null) || dailyChallenges[0];
        appState.dailyChallengeId = nextChallenge.id;
        appState.dailyChallengeDate = today;
        changed = true;
    }

    const challenge = dailyChallenges.find(item => item.id === appState.dailyChallengeId) || dailyChallenges[0];
    if (changed) saveToLocalStorage();
    return challenge;
}

function renderDailyChallenge(force = false) {
    const challenge = ensureDailyChallenge(force);
    if (!challenge) return;

    const titleEl = document.getElementById('daily-challenge-title');
    const descEl = document.getElementById('daily-challenge-description');
    const stepsEl = document.getElementById('daily-challenge-steps');
    const hintEl = document.getElementById('daily-challenge-hint');

    if (titleEl) titleEl.textContent = challenge.title;
    if (descEl) descEl.textContent = challenge.description;
    if (stepsEl) {
        stepsEl.innerHTML = (challenge.steps || []).map(step => `<li>${step}</li>`).join('');
    }
    if (hintEl) {
        const module = modules.find(m => m.id === challenge.moduleId);
        hintEl.textContent = module ? `Focus module: ${module.title}` : '';
    }
}

function chooseRandomStudyTip(excludeId = null) {
    if (!studyTips.length) return null;
    const pool = excludeId !== null ? studyTips.filter((tip, idx) => `${idx}` !== excludeId) : studyTips;
    const source = pool.length ? pool : studyTips;
    const index = Math.floor(Math.random() * source.length);
    const tipText = source[index];
    const absoluteIndex = studyTips.indexOf(tipText);
    return { text: tipText, id: `${absoluteIndex}` };
}

function ensureStudyTip(force = false) {
    if (!studyTips.length) return null;
    if (!force && appState.studyTipId !== null && studyTips[Number(appState.studyTipId)] !== undefined) {
        return {
            text: studyTips[Number(appState.studyTipId)],
            id: appState.studyTipId
        };
    }
    const tip = chooseRandomStudyTip(force ? appState.studyTipId : null) || { text: studyTips[0], id: '0' };
    appState.studyTipId = tip.id;
    saveToLocalStorage();
    return tip;
}

function renderStudyTip(force = false) {
    const tip = ensureStudyTip(force);
    if (!tip) return;
    const tipEl = document.getElementById('study-tip-text');
    if (tipEl) tipEl.textContent = tip.text;
}

// =================================
// UTILITY FUNCTIONS
// =================================

// Local Storage Management
function saveToLocalStorage() {
    const stateToSave = {
        darkMode: appState.darkMode,
        showComments: appState.showComments,
        completedModules: Array.from(appState.completedModules),
        completedQuizzes: Array.from(appState.completedQuizzes),
        expandedCode: Array.from(appState.expandedCode),
        moduleComments: Array.from(appState.moduleComments.entries()),
        moduleLanguages: Array.from(appState.moduleLanguages.entries()),
        moduleModes: Array.from(appState.moduleModes.entries()),
        searchTerm: appState.searchTerm,
        difficultyFilter: appState.difficultyFilter,
        glossaryCategory: appState.glossaryCategory,
        currentFlashcard: appState.currentFlashcard,
        selectedFlashcardModule: appState.selectedFlashcardModule,
        theme: appState.theme,
        accentTheme: appState.accentTheme,
        fontScale: appState.fontScale,
        dailyChallengeId: appState.dailyChallengeId,
        dailyChallengeDate: appState.dailyChallengeDate,
        studyTipId: appState.studyTipId,
        weeklyGoal: appState.weeklyGoal,
        hideCompletedModules: appState.hideCompletedModules,
        compactLayout: appState.compactLayout,
        cardDensity: appState.cardDensity,
        studyPlan: appState.studyPlan,
        accountProfile: appState.accountProfile,
        playground: {
            code: appState.playground.code,
            sample: appState.playground.sample,
            output: appState.playground.output
        }
    };
    localStorage.setItem('javaDSAHub', JSON.stringify(stateToSave));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('javaDSAHub');
    if (saved) {
        try {
            const state = JSON.parse(saved);
            appState.darkMode = state.darkMode || false;
            appState.showComments = state.showComments !== undefined ? state.showComments : true;
            appState.completedModules = new Set(state.completedModules || []);
            appState.expandedCode = new Set(state.expandedCode || []);
            appState.moduleComments = new Map(state.moduleComments || []);
            appState.moduleLanguages = new Map(state.moduleLanguages || []);
            appState.moduleModes = new Map(state.moduleModes || []);
            appState.searchTerm = state.searchTerm || '';
            appState.difficultyFilter = state.difficultyFilter || 'all';
            appState.glossaryCategory = state.glossaryCategory || 'all';
            appState.currentFlashcard = state.currentFlashcard || 0;
            appState.selectedFlashcardModule = state.selectedFlashcardModule || 'all';
            appState.theme = state.theme || 'default';
            appState.accentTheme = state.accentTheme || 'indigo';
            appState.fontScale = state.fontScale || 'base';
            appState.completedQuizzes = new Set(state.completedQuizzes || []);
            appState.dailyChallengeId = state.dailyChallengeId || null;
            appState.dailyChallengeDate = state.dailyChallengeDate || null;
            appState.studyTipId = state.studyTipId || null;
            appState.weeklyGoal = Number(state.weeklyGoal) || 5;
            appState.hideCompletedModules = Boolean(state.hideCompletedModules);
            appState.compactLayout = Boolean(state.compactLayout);
            appState.cardDensity = state.cardDensity || 'standard';
            appState.studyPlan = state.studyPlan || null;
            appState.accountProfile = state.accountProfile || null;
            appState.playground = {
                code: state.playground?.code || '',
                sample: state.playground?.sample || DEFAULT_PLAYGROUND_SAMPLE,
                output: state.playground?.output || '// Output will appear here',
                isRunning: false
            };
        } catch (e) {
            console.error('Failed to load saved state:', e);
        }
    }
}

// Code Processing Functions
function removeComments(code, language = 'java') {
    let processedCode = code;
    switch (language) {
        case 'python':
            processedCode = code.split('\n').map(line => {
                if (line.match(/^\s*#\s*[🎯📚🔒🏗️🔓🔄📝📊🆕🔍🌟💪🔀⚡🧮🎨🔧]/)) return line;
                return line.replace(/#.*$/, '').trimEnd();
            }).join('\n').replace(/"""[\s\S]*?"""/g, '').replace(/'''[\s\S]*?'''/g, '');
            break;
        case 'javascript':
            processedCode = code.split('\n').map(line => {
                if (line.match(/^\s*\/\/\s*[🎯📚🔒🏗️🔓🔄📝📊🆕🔍🌟💪🔀⚡🧮🎨🔧]/)) return line;
                return line.replace(/\/\/.*$/, '').trimEnd();
            }).join('\n').replace(/\/\*[\s\S]*?\*\//g, '');
            break;
        default: // java, cpp
            processedCode = code.split('\n').map(line => {
                if (line.match(/^\s*\/\/\s*[🎯📚🔒🏗️🔓🔄📝📊🆕🔍🌟💪🔀⚡🧮🎨🔧]/)) return line;
                return line.replace(/\/\/.*$/, '').trimEnd();
            }).join('\n').replace(/\/\*[\s\S]*?\*\//g, '');
            break;
    }
    return processedCode.replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
}

function convertToPseudocode(code, language = 'java', shouldKeepComments = true) {
    let processedCode = shouldKeepComments ? code : removeComments(code, language);

    switch (language) {
        case 'python':
            return processedCode
                .replace(/class\s+(\w+).*?:/g, 'DEFINE CLASS $1')
                .replace(/def\s+__init__\s*\(.*?\):/g, 'CONSTRUCTOR')
                .replace(/def\s+(\w+)\s*\([^)]*\):/g, 'FUNCTION $1')
                .replace(/if\s+__name__\s*==\s*["']__main__["']:/g, 'BEGIN PROGRAM')
                .replace(/if\s+(.+?):/g, 'IF $1 THEN')
                .replace(/elif\s+(.+?):/g, 'ELSE IF $1 THEN')
                .replace(/else:/g, 'ELSE')
                .replace(/for\s+(\w+)\s+in\s+(.+?):/g, 'FOR EACH $1 in $2')
                .replace(/while\s+(.+?):/g, 'WHILE $1')
                .replace(/print\s*\(\s*([^)]+)\s*\)/g, 'PRINT $1')
                .replace(/return\s+(.+)/g, 'RETURN $1')
                .replace(/:/g, '').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
        case 'javascript':
            return processedCode
                .replace(/class\s+(\w+)/g, 'DEFINE CLASS $1')
                .replace(/constructor\s*\([^)]*\)\s*\{/g, 'CONSTRUCTOR')
                .replace(/function\s+(\w+)\s*\([^)]*\)\s*\{/g, 'FUNCTION $1')
                .replace(/(\w+)\s*\([^)]*\)\s*\{/g, 'FUNCTION $1')
                .replace(/if\s*\(\s*([^)]+)\s*\)/g, 'IF $1 THEN')
                .replace(/else\s+if\s*\(\s*([^)]+)\s*\)/g, 'ELSE IF $1 THEN')
                .replace(/else/g, 'ELSE')
                .replace(/for\s*\(\s*let\s+(\w+)\s*=\s*([^;]+);\s*([^;]+);\s*\w+\+\+\s*\)/g, 'FOR $1 from $2 while $3')
                .replace(/for\s*\(\s*(?:let|const)\s+(\w+)\s+of\s+(\w+)\s*\)/g, 'FOR EACH $1 in $2')
                .replace(/while\s*\(\s*([^)]+)\s*\)/g, 'WHILE $1')
                .replace(/console\.log\s*\(\s*([^)]+)\s*\);/g, 'PRINT $1')
                .replace(/return\s+([^;]+);/g, 'RETURN $1')
                .replace(/\{/g, '').replace(/\}/g, 'END').replace(/;/g, '')
                .replace(/let|const|var/g, '').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
        default: // java, cpp
            return processedCode
                .replace(/public\s+class\s+(\w+)/g, 'DEFINE CLASS $1')
                .replace(/class\s+(\w+)/g, 'DEFINE CLASS $1')
                .replace(/struct\s+(\w+)/g, 'DEFINE STRUCTURE $1')
                .replace(/public\s+static\s+void\s+main.*?\{/g, 'BEGIN PROGRAM')
                .replace(/public\s+(\w+)\s+(\w+)\s*\([^)]*\)\s*\{/g, 'FUNCTION $2 RETURNS $1')
                .replace(/private\s+(\w+)\s+(\w+);/g, 'DECLARE private $1 variable $2')
                .replace(/(\w+)\s*=\s*new\s+(\w+)\s*\([^)]*\);/g, 'CREATE new $2 object and assign to $1')
                .replace(/for\s*\(\s*int\s+(\w+)\s*=\s*([^;]+);\s*([^;]+);\s*\w+\+\+\s*\)/g, 'FOR $1 from $2 while $3')
                .replace(/for\s*\(\s*(\w+)\s+(\w+)\s*:\s*(\w+)\s*\)/g, 'FOR EACH $2 in $3')
                .replace(/if\s*\(\s*([^)]+)\s*\)/g, 'IF $1 THEN')
                .replace(/else\s+if\s*\(\s*([^)]+)\s*\)/g, 'ELSE IF $1 THEN')
                .replace(/else/g, 'ELSE')
                .replace(/while\s*\(\s*([^)]+)\s*\)/g, 'WHILE $1')
                .replace(/System\.out\.println\s*\(\s*([^)]+)\s*\);/g, 'PRINT $1')
                .replace(/std::cout\s*<<\s*([^;]+)\s*;/g, 'PRINT $1')
                .replace(/return\s+([^;]+);/g, 'RETURN $1')
                .replace(/\{/g, '').replace(/\}/g, 'END').replace(/;/g, '')
                .replace(/public|private|static/g, '').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
    }
}

function truncateCode(code, lines = CONSTANTS.CODE_PREVIEW_LINES) {
    const codeLines = code.split('\n');
    if (codeLines.length <= lines) {
        return code;
    }
    return codeLines.slice(0, lines).join('\n') + CONSTANTS.TRUNCATE_INDICATOR;
}

// Module Helper Functions
function shouldShowComments(moduleId) {
    const individualSetting = appState.moduleComments.get(moduleId);
    return individualSetting !== undefined ? individualSetting : appState.showComments;
}

function getModuleLanguage(moduleId) {
    return appState.moduleLanguages.get(moduleId) || 'java';
}

function getModuleMode(moduleId) {
    return appState.moduleModes.get(moduleId) || 'code';
}

function getCodeExample(module) {
    const language = getModuleLanguage(module.id);
    if (module.codeExamples && module.codeExamples[language]) {
        return module.codeExamples[language];
    }
    return module.codeExample || 'Code example coming soon...';
}

function processCode(code, moduleId) {
    const showCommentsForModule = shouldShowComments(moduleId);
    const language = getModuleLanguage(moduleId);
    const mode = getModuleMode(moduleId);

    if (mode === 'pseudocode') {
        return convertToPseudocode(code, language, showCommentsForModule);
    } else if (!showCommentsForModule) {
        return removeComments(code, language);
    }
    return code;
}

function getDifficultyColor(difficulty) {
    return DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.default;
}

// =================================
// UI UPDATE FUNCTIONS
// =================================

function applyTheme() {
    const body = document.body;
    THEME_CLASSES.forEach(cls => body.classList.remove(cls));
    if (appState.theme && appState.theme !== 'default') {
        body.classList.add(`theme-${appState.theme}`);
    }
}

function applyAccentTheme() {
    const body = document.body;
    ACCENT_THEME_CLASSES.forEach(cls => body.classList.remove(cls));
    const selected = ACCENT_THEME_OPTIONS.includes(appState.accentTheme) ? appState.accentTheme : 'indigo';
    body.classList.add(`accent-${selected}`);
}

function applyCardDepth() {
    const body = document.body;
    CARD_DEPTH_CLASSES.forEach(cls => body.classList.remove(cls));
    const selected = CARD_DEPTH_OPTIONS.includes(appState.cardDensity) ? appState.cardDensity : 'standard';
    body.classList.add(`card-depth-${selected}`);
}

function getPlaygroundSnippet(key) {
    return PLAYGROUND_SNIPPETS[key] || PLAYGROUND_SNIPPETS[DEFAULT_PLAYGROUND_SAMPLE];
}

function populatePlaygroundSnippetOptions() {
    const select = document.getElementById('playground-snippets');
    if (!select) return;

    const optionGroups = [];

    if (BASE_PLAYGROUND_SNIPPET_KEYS.length) {
        const baseOptions = BASE_PLAYGROUND_SNIPPET_KEYS.map(key => {
            const snippet = BASE_PLAYGROUND_SNIPPETS[key];
            const label = snippet?.label || formatIdentifier(key);
            return `<option value="${key}">${label}</option>`;
        }).join('');
        optionGroups.push(`<optgroup label="Starter Samples">${baseOptions}</optgroup>`);
    }

    const moduleOptions = modules
        .map((module, index) => {
            const snippetKey = `module-${module.id}`;
            if (!modulePlaygroundSnippets[snippetKey]) return null;
            return `<option value="${snippetKey}">${index + 1}. ${module.title}</option>`;
        })
        .filter(Boolean)
        .join('');

    if (moduleOptions) {
        optionGroups.push(`<optgroup label="Module Walkthroughs">${moduleOptions}</optgroup>`);
    }

    if (!optionGroups.length) {
        optionGroups.push('<option value="hello-world">Hello World</option>');
    }

    select.innerHTML = optionGroups.join('');
    const preferredSample = PLAYGROUND_SNIPPETS[appState.playground.sample]
        ? appState.playground.sample
        : DEFAULT_PLAYGROUND_SAMPLE;
    select.value = preferredSample;
}

function initPlayground() {
    const editor = document.getElementById('playground-editor');
    if (!editor) return;

    populatePlaygroundSnippetOptions();
    const select = document.getElementById('playground-snippets');
    if (!appState.playground.code) {
        const snippet = getPlaygroundSnippet(appState.playground.sample);
        appState.playground.code = snippet.code;
    }
    editor.value = appState.playground.code;
    if (select) {
        const fallbackSample = PLAYGROUND_SNIPPETS[appState.playground.sample]
            ? appState.playground.sample
            : DEFAULT_PLAYGROUND_SAMPLE;
        select.value = fallbackSample;
        appState.playground.sample = fallbackSample;
        select.addEventListener('change', (event) => {
            setPlaygroundSample(event.target.value);
        });
    }
    editor.addEventListener('input', (event) => {
        appState.playground.code = event.target.value;
        saveToLocalStorage();
    });
    document.getElementById('playground-run')?.addEventListener('click', runPlaygroundCode);
    document.getElementById('playground-reset')?.addEventListener('click', resetPlaygroundEditor);
    document.getElementById('playground-copy')?.addEventListener('click', copyPlaygroundOutput);
    updatePlaygroundOutput(appState.playground.output || '// Output will appear here');
    updatePlaygroundStatus('Idle', false);
}

function setPlaygroundSample(sampleKey) {
    if (!PLAYGROUND_SNIPPETS[sampleKey]) {
        sampleKey = DEFAULT_PLAYGROUND_SAMPLE;
    }
    appState.playground.sample = sampleKey;
    appState.playground.code = getPlaygroundSnippet(sampleKey).code;
    const select = document.getElementById('playground-snippets');
    if (select) {
        select.value = sampleKey;
    }
    const editor = document.getElementById('playground-editor');
    if (editor) {
        editor.value = appState.playground.code;
    }
    appState.playground.output = '// Output will appear here';
    updatePlaygroundOutput(appState.playground.output);
    saveToLocalStorage();
}

async function runPlaygroundCode() {
    if (appState.playground.isRunning) return;
    const code = appState.playground.code.trim();
    if (!code) {
        updatePlaygroundOutput('Add some Java code before running the playground.', 'error');
        return;
    }
    if (!CODE_RUNNER_ENDPOINT) {
        updatePlaygroundOutput('Set CODE_RUNNER_ENDPOINT in js/script.js to connect a Java runner.', 'error');
        return;
    }

    updatePlaygroundStatus('Running', true);

    try {
        const payload = {
            language: CODE_RUNNER_LANGUAGE,
            version: CODE_RUNNER_VERSION,
            files: [{ name: 'Main.java', content: code }]
        };
        const response = await fetch(CODE_RUNNER_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`Runner responded with ${response.status}`);
        }
        const data = await response.json();
        const stdout = data?.run?.stdout?.trim();
        const stderr = data?.run?.stderr?.trim() || data?.run?.output?.trim();
        const outputText = [stdout, stderr].filter(Boolean).join('\n').trim() || '// Program finished with no output';
        const status = stderr ? 'error' : 'success';
        updatePlaygroundOutput(outputText, status);
        appState.playground.output = outputText;
        saveToLocalStorage();
    } catch (error) {
        updatePlaygroundOutput(`Unable to reach the runner (${error.message}). Make sure you are online or configure a local endpoint.`, 'error');
    } finally {
        updatePlaygroundStatus('Idle', false);
    }
}

function resetPlaygroundEditor() {
    setPlaygroundSample(appState.playground.sample);
}

function updatePlaygroundOutput(text, status = 'info') {
    const outputEl = document.getElementById('playground-output');
    if (!outputEl) return;
    outputEl.textContent = text;
    outputEl.classList.remove('success', 'error');
    if (status === 'success') outputEl.classList.add('success');
    if (status === 'error') outputEl.classList.add('error');
}

function updatePlaygroundStatus(label, running) {
    const statusEl = document.getElementById('playground-status');
    if (statusEl) {
        statusEl.textContent = running ? 'Running...' : label;
        statusEl.classList.toggle('bg-emerald-100', running);
        statusEl.classList.toggle('text-emerald-700', running);
        statusEl.classList.toggle('bg-slate-100', !running);
        statusEl.classList.toggle('text-slate-600', !running);
    }
    appState.playground.isRunning = running;
}

function copyPlaygroundOutput() {
    const outputEl = document.getElementById('playground-output');
    if (!outputEl) return;
    navigator.clipboard.writeText(outputEl.textContent || '')
        .then(() => showToast?.('Playground output copied!', 'success'))
        .catch(() => showToast?.('Copy failed. Select the text and copy manually.', 'error'));
}

function applyFontScale() {
    const root = document.documentElement;
    FONT_SCALE_CLASSES.forEach(cls => root.classList.remove(cls));
    const appliedClass = FONT_SCALE_CLASS_MAP[appState.fontScale] || FONT_SCALE_CLASS_MAP.base;
    if (appliedClass) {
        root.classList.add(appliedClass);
    }
}

function applyCompactLayout() {
    document.body.classList.toggle('compact-modules', !!appState.compactLayout);
}

function updateProgress() {
    const progressPercentage = Math.round((appState.completedModules.size / CONSTANTS.TOTAL_MODULES) * 100);

    document.getElementById('progress-text').textContent =
        `${appState.completedModules.size} of ${CONSTANTS.TOTAL_MODULES} modules completed`;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('progress-percentage').textContent = `${progressPercentage}%`;

    renderAchievements();
}

function updateDarkMode() {
    const body = document.body;
    const darkModeSlider = document.getElementById('dark-mode-slider');

    if (appState.darkMode) {
        body.classList.add('dark');
        document.getElementById('dark-mode-toggle').classList.remove('bg-slate-300');
        document.getElementById('dark-mode-toggle').classList.add('bg-indigo-600');
        darkModeSlider.classList.remove('translate-x-0.5');
        darkModeSlider.classList.add('translate-x-7');
    } else {
        body.classList.remove('dark');
        document.getElementById('dark-mode-toggle').classList.remove('bg-indigo-600');
        document.getElementById('dark-mode-toggle').classList.add('bg-slate-300');
        darkModeSlider.classList.remove('translate-x-7');
        darkModeSlider.classList.add('translate-x-0.5');
    }
}

function syncToggleState(toggleId, sliderId, isActive) {
    const toggle = document.getElementById(toggleId);
    const slider = document.getElementById(sliderId);
    if (!toggle || !slider) return;
    toggle.classList.toggle('bg-indigo-600', isActive);
    toggle.classList.toggle('bg-slate-300', !isActive);
    slider.classList.toggle('translate-x-7', isActive);
    slider.classList.toggle('translate-x-0.5', !isActive);
}

function updateCommentsToggle() {
    syncToggleState('comments-toggle', 'comments-slider', appState.showComments);
}

function updateHideCompletedToggle() {
    syncToggleState('hide-completed-toggle', 'hide-completed-slider', appState.hideCompletedModules);
}

function updateCompactLayoutToggle() {
    syncToggleState('compact-layout-toggle', 'compact-layout-slider', appState.compactLayout);
}

function updateHeaderShrink() {
    const header = document.getElementById('main-header');
    const title = document.getElementById('main-title');
    const subtitle = document.getElementById('main-subtitle');
    const buttons = document.getElementById('header-buttons');

    const progress = Math.min(appState.scrollY / 200, 1);
    const isScrolled = appState.scrollY > 10;
    const isFullyShrunken = appState.scrollY > 100;

    // Header padding - smaller values for optimization
    const paddingY = Math.max(12 - progress * 6, 6);
    header.style.paddingTop = `${paddingY}px`;
    header.style.paddingBottom = `${paddingY}px`;

    // Title size - optimized sizes
    if (isFullyShrunken) {
        title.className = title.className.replace(/text-\w+/g, '') + ' text-lg sm:text-xl lg:text-2xl';
    } else {
        title.className = title.className.replace(/text-\w+/g, '') + ' text-xl sm:text-2xl lg:text-3xl';
    }

    // Subtitle opacity
    const subtitleOpacity = Math.max(1 - progress * 1.5, 0);
    subtitle.style.opacity = subtitleOpacity;
    subtitle.style.transform = subtitleOpacity < 0.3 ? 'translateY(-10px)' : 'translateY(0)';

    // Buttons
    const buttonOpacity = Math.max(1 - progress * 1.2, 0);
    const buttonScale = Math.max(1 - progress * 0.3, 0.7);
    buttons.style.opacity = buttonOpacity;
    buttons.style.transform = `scale(${buttonScale})`;
    buttons.style.transformOrigin = 'top right';

    // Add/remove shadow
    if (isScrolled) {
        header.classList.add('shadow-2xl', 'backdrop-blur-sm');
    } else {
        header.classList.remove('shadow-2xl', 'backdrop-blur-sm');
    }
}

function filterModules() {
    const searchTerm = appState.searchTerm.trim().toLowerCase();
    const hasSearch = searchTerm.length > 0;
    const difficultyFilter = appState.difficultyFilter;

    return modules.filter(module => {
        const matchesSearch = !hasSearch ||
            module.title.toLowerCase().includes(searchTerm) ||
            module.description.toLowerCase().includes(searchTerm) ||
            module.topics.some(topic => topic.toLowerCase().includes(searchTerm));

        const matchesDifficulty = difficultyFilter === 'all' || module.difficulty === difficultyFilter;
        const passesCompletionFilter = !appState.hideCompletedModules || !appState.completedModules.has(module.id);

        return matchesSearch && matchesDifficulty && passesCompletionFilter;
    });
}

function renderModules() {
    const filteredModules = filterModules();
    const grid = document.getElementById('modules-grid');
    const searchResultsCount = document.getElementById('search-results-count');

    if (filteredModules.length !== modules.length) {
        searchResultsCount.textContent = `Showing ${filteredModules.length} of ${modules.length} modules`;
        searchResultsCount.style.display = 'block';
    } else {
        searchResultsCount.style.display = 'none';
    }

    const difficultyOrder = ['beginner', 'intermediate', 'advanced'];
    const groupedContent = difficultyOrder.map(level => {
        const bucket = filteredModules.filter(module => module.difficulty === level);
        if (!bucket.length) return '';
        const meta = DIFFICULTY_SECTIONS[level] || { label: level, icon: '📘' };
        return `
            <div class="module-section">
                <div class="module-section-heading">${meta.icon} ${meta.label}</div>
                ${bucket.map(buildModuleCard).join('')}
            </div>
        `;
    }).join('');
    const otherModules = filteredModules.filter(module => !difficultyOrder.includes(module.difficulty));
    const otherSection = otherModules.length ? `
        <div class="module-section">
            <div class="module-section-heading">🧭 Additional Modules</div>
            ${otherModules.map(buildModuleCard).join('')}
        </div>
    ` : '';
    const sectionMarkup = [groupedContent, otherSection].filter(Boolean).join('');

    grid.innerHTML = sectionMarkup || `
        <div class="text-center p-8 rounded-xl bg-white shadow">
            <p class="font-semibold text-slate-700">No modules match your filters yet.</p>
            <p class="text-sm text-slate-500 mt-1">Try changing the difficulty or clearing the search.</p>
        </div>
    `;

    renderInsights();
}

function buildModuleCard(module) {
    const isCompleted = appState.completedModules.has(module.id);
    const isCodeExpanded = appState.expandedCode.has(module.id);
    const currentLanguage = getModuleLanguage(module.id);
    const currentMode = getModuleMode(module.id);
    const hasMultipleLanguages = module.codeExamples && Object.keys(module.codeExamples).length > 1;
    const codeToDisplay = getCodeExample(module);
    const displayCode = isCodeExpanded ? codeToDisplay : truncateCode(codeToDisplay);
    const showExpandButton = codeToDisplay.split('\n').length > CONSTANTS.CODE_PREVIEW_LINES;
    const processedCode = processCode(displayCode, module.id);
    const supportSummary = module.topics?.slice(0, 2).join(' • ') || 'Guided office hours and async help.';

    return `
        <div id="module-${module.id}" data-module-card="${module.id}" class="module-card bg-white border-slate-200 rounded-xl p-4 sm:p-6 shadow-xl border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                <h3 class="text-lg sm:text-xl font-semibold text-indigo-600 leading-tight">${module.title}</h3>
                <span class="px-2 sm:px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium ${getDifficultyColor(module.difficulty)} whitespace-nowrap self-start sm:self-auto difficulty-badge">
                    ${module.difficulty}
                </span>
            </div>
            <p class="text-slate-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">${module.description}</p>
            <div class="mb-3 sm:mb-4">
                <h4 class="font-semibold mb-2 text-slate-800 text-sm">Topics Covered:</h4>
                <div class="flex flex-wrap gap-1 sm:gap-1.5">
                    ${(module.topics || []).map(topic => `
                        <span class="px-2 py-0.5 sm:py-1 text-xs rounded-md font-medium bg-slate-100 text-slate-700 topic-badge">
                            ${topic}
                        </span>
                    `).join('')}
                </div>
            </div>
            <div class="bg-slate-50 border-slate-200 rounded-lg border overflow-hidden mb-3 sm:mb-4">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-3 py-2 border-b border-slate-200 bg-slate-100">
                    <div class="flex items-center gap-1.5">
                        <span class="text-xs font-medium text-slate-600">💻 Code Example</span>
                        ${hasMultipleLanguages ? `
                            <span class="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
                                ${SUPPORTED_LANGUAGES[currentLanguage]?.icon} ${SUPPORTED_LANGUAGES[currentLanguage]?.name}
                            </span>
                        ` : ''}
                        ${currentMode === 'pseudocode' ? `
                            <span class="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">
                                📝 Pseudocode
                            </span>
                        ` : ''}
                    </div>
                    <div class="flex flex-wrap gap-1 w-full sm:w-auto">
                        <button onclick="toggleModuleComments('${module.id}')" class="text-xs px-2 py-1 rounded transition-all duration-200 font-medium shadow-sm hover:shadow-md flex-shrink-0 ${shouldShowComments(module.id) ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white'}" title="${shouldShowComments(module.id) ? 'Hide Comments' : 'Show Comments'}">
                            💬 ${shouldShowComments(module.id) ? 'ON' : 'OFF'}
                        </button>
                        <select onchange="setModuleLanguage('${module.id}', this.value)" class="text-xs px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white border-0 font-medium" title="Select Programming Language">
                            ${Object.entries(SUPPORTED_LANGUAGES).map(([langKey, langInfo]) => module.codeExamples && module.codeExamples[langKey] ? `
                                <option value="${langKey}" ${currentLanguage === langKey ? 'selected' : ''} class="bg-white text-black">
                                    ${langInfo.icon} ${langInfo.name}
                                </option>
                            ` : '').join('')}
                        </select>
                        <select onchange="setModuleMode('${module.id}', this.value)" class="text-xs px-2 py-1 rounded border-0 font-medium ${currentMode === 'pseudocode' ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}" title="Select Code Display Mode">
                            ${Object.entries(CODE_MODES).map(([modeKey, modeInfo]) => `
                                <option value="${modeKey}" ${currentMode === modeKey ? 'selected' : ''} class="bg-white text-black">
                                    ${modeInfo.icon} ${modeInfo.name}
                                </option>
                            `).join('')}
                        </select>
                        ${showExpandButton ? `
                            <button onclick="toggleCodeExpansion('${module.id}')" class="text-xs px-2 py-1 rounded transition-all duration-200 font-medium shadow-sm hover:shadow-md flex-shrink-0 ${isCodeExpanded ? 'bg-slate-500 hover:bg-slate-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}">
                                ${isCodeExpanded ? '📄 Collapse' : '📖 Expand'}
                            </button>
                        ` : ''}
                    </div>
                </div>
                <div class="p-3 overflow-x-auto">
                    <pre class="text-xs leading-relaxed">
                        <code class="whitespace-pre-wrap font-mono">${processedCode}</code>
                    </pre>
                </div>
            </div>
            <div class="bg-indigo-50 border-indigo-200 border-l-4 border-l-indigo-500 p-3 sm:p-4 mb-3 sm:mb-4 rounded-r-lg">
                <div class="whitespace-pre-line text-xs sm:text-sm text-slate-800">${module.explanation}</div>
            </div>
            ${module.codeBreakdown && module.codeBreakdown.length ? `
                <div class="code-breakdown-card">
                    <h4>🧠 Code Breakdown</h4>
                    <ul>
                        ${module.codeBreakdown.map(item => `<li><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.detail)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            <div class="module-support-panel">
                <p>Student Support • ${supportSummary}</p>
                <button type="button" class="support-button" onclick="openSupportModal('${module.id}')">📣 Contact Student Support</button>
            </div>
            <div class="mb-3 sm:mb-4">
                <h4 class="font-semibold mb-2 text-slate-800 text-sm">📚 Learning Resources:</h4>
                <div class="space-y-1">
                    ${(module.resources || []).map(resource => {
                        const label = typeof resource === 'string' ? resource : resource.text || resource.url;
                        const link = typeof resource === 'string' ? null : resource.url || null;
                        if (link) {
                            return `<a href="${link}" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:text-indigo-800 text-xs transition-colors duration-200 block">• ${label}</a>`;
                        }
                        return `<div class="text-indigo-600 hover:text-indigo-800 text-xs transition-colors duration-200 cursor-pointer">• ${label}</div>`;
                    }).join('')}
                </div>
            </div>
            <div class="space-y-2">
                <button onclick="openQuiz('${module.id}')" class="w-full py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm ${quizData[module.id] && quizData[module.id].parts[0].questions.length > 0 ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white hover:-translate-y-0.5' : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white cursor-not-allowed'}" ${!quizData[module.id] || quizData[module.id].parts[0].questions.length === 0 ? 'disabled' : ''}>
                    ${quizData[module.id] && quizData[module.id].parts[0].questions.length > 0 ? '🧠 Take Quiz' : '🔒 Quiz Coming Soon'}
                </button>
                
                <button onclick="toggleCompletion('${module.id}')" class="w-full py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm ${isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:-translate-y-0.5' : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white hover:-translate-y-0.5'}">
                    ${isCompleted ? '✅ Completed!' : '📝 Mark as Complete'}
                </button>
            </div>
        </div>
    `;
}

function getAchievementState() {
    const completed = appState.completedModules.size;
    const sortedLevels = [...ACHIEVEMENT_LEVELS].sort((a, b) => a.threshold - b.threshold);
    let current = sortedLevels[0];
    let next = null;

    for (let i = 0; i < sortedLevels.length; i++) {
        const level = sortedLevels[i];
        if (completed >= level.threshold) {
            current = level;
            next = sortedLevels[i + 1] || null;
        } else {
            next = level;
            break;
        }
    }

    return { completed, current, next };
}

function renderAchievements() {
    const card = document.getElementById('achievements-card');
    if (!card) return;

    const {
        completed,
        current,
        next
    } = getAchievementState();

    const badgeLabel = document.getElementById('achievement-badge-label');
    const badgeName = document.getElementById('achievement-badge-name');
    const badgeIcon = document.getElementById('achievement-badge-icon');
    const descriptionEl = document.getElementById('achievement-description');
    const progressBar = document.getElementById('achievement-progress-bar');
    const progressLabel = document.getElementById('achievement-progress-label');
    const totalLabel = document.getElementById('achievement-total-label');
    const nextHint = document.getElementById('achievement-next-hint');

    if (badgeLabel) badgeLabel.textContent = current.label;
    if (badgeName) badgeName.textContent = current.label;
    if (badgeIcon) badgeIcon.textContent = current.icon;
    if (descriptionEl) descriptionEl.textContent = current.description;
    if (totalLabel) totalLabel.textContent = `${CONSTANTS.TOTAL_MODULES} total modules`;

    const previousThreshold = current.threshold;
    const nextThreshold = next ? next.threshold : CONSTANTS.TOTAL_MODULES;
    const span = Math.max(nextThreshold - previousThreshold, 1);
    const modulesTowardNext = next ? Math.max(0, completed - previousThreshold) : span;
    const progressPercent = next ? Math.min((modulesTowardNext / span) * 100, 100) : 100;

    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }

    if (progressLabel) {
        if (next) {
            progressLabel.textContent = `${modulesTowardNext} / ${span} modules toward next badge`;
        } else {
            progressLabel.textContent = `All achievements unlocked – ${completed} modules completed!`;
        }
    }

    if (nextHint) {
        nextHint.textContent = next
            ? `Next: ${next.label} at ${next.threshold} modules`
            : 'Legend achieved! Keep challenging yourself.';
    }
}

function escapeHtml(text = '') {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeRegExp(string = '') {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightGlossaryText(text, searchTerm) {
    const safe = escapeHtml(text);
    if (!searchTerm.trim()) return safe;
    const pattern = new RegExp(`(${escapeRegExp(searchTerm.trim())})`, 'gi');
    return safe.replace(pattern, '<span class="glossary-highlight">$1</span>');
}

function renderGlossaryFilters() {
    const container = document.getElementById('glossary-categories');
    if (!container) return;

    container.innerHTML = glossaryCategories.map(category => {
        const isActive = appState.glossaryCategory === category;
        const label = category === 'all' ? 'All Terms' : category;
        return `<button type="button" class="glossary-chip ${isActive ? 'active' : ''}" data-category="${category}">${escapeHtml(label)}</button>`;
    }).join('');

    Array.from(container.querySelectorAll('button')).forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.category || 'all';
            if (appState.glossaryCategory === selectedCategory) return;
            appState.glossaryCategory = selectedCategory;
            renderGlossary();
            saveToLocalStorage();
        });
    });
}

function renderGlossary() {
    renderGlossaryFilters();

    const searchTerm = appState.glossarySearch.trim().toLowerCase();
    const selectedCategory = appState.glossaryCategory;
    const filteredTerms = glossaryTerms.filter(term => {
        const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
        if (!matchesCategory) return false;
        if (!searchTerm) return true;
        return (
            term.term.toLowerCase().includes(searchTerm) ||
            term.definition.toLowerCase().includes(searchTerm) ||
            term.category.toLowerCase().includes(searchTerm)
        );
    });

    const content = document.getElementById('glossary-content');
    const stats = document.getElementById('glossary-stats');
    if (stats) {
        const label = selectedCategory === 'all' ? 'All categories' : `Category: ${selectedCategory}`;
        stats.innerHTML = `
            <span><strong>${filteredTerms.length}</strong> of <strong>${glossaryTerms.length}</strong> terms</span>
            <span>${escapeHtml(label)}</span>
        `;
    }

    if (filteredTerms.length === 0) {
        content.innerHTML = `
            <div class="col-span-2 text-center py-12">
                <p class="text-lg text-slate-600">No terms found matching your search.</p>
            </div>
        `;
        return;
    }

    const highlightTerm = appState.glossarySearch.trim();
    content.innerHTML = filteredTerms.map(item => `
        <div class="p-4 rounded-xl border transition-all duration-200 hover:shadow-lg bg-slate-50 border-slate-200 hover:bg-white">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-lg text-indigo-600">${highlightGlossaryText(item.term, highlightTerm)}</h4>
                <span class="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
                    ${escapeHtml(item.category)}
                </span>
            </div>
            <p class="text-sm leading-relaxed text-slate-800">${highlightGlossaryText(item.definition, highlightTerm)}</p>
        </div>
    `).join('');
}

function renderFlashcard() {
    const session = appState.flashcardSession;
    const totalCards = session.length;
    const deck = getFlashcardDeck(appState.selectedFlashcardModule);
    const content = document.getElementById('flashcard-content');
    const counter = document.getElementById('flashcard-counter');
    const toggleButton = document.getElementById('toggle-flashcard-answer');
    const prevButton = document.getElementById('prev-flashcard');
    const nextButton = document.getElementById('next-flashcard');
    const sessionMeta = document.getElementById('flashcard-session-meta');
    const desiredLength = appState.flashcardSessionLength || FLASHCARD_SESSION_SIZE;
    const deckSize = deck.length;
    if (!content || !counter || !toggleButton || !prevButton || !nextButton) {
        return;
    }

    if (!totalCards) {
        counter.textContent = 'No active session';
        content.innerHTML = `
            <div class="text-center text-slate-600">
                <p class="text-lg font-semibold mb-2">Choose a module above</p>
                <p class="text-sm">Start a ${desiredLength}-card session to load flashcards.</p>
            </div>
        `;
        toggleButton.textContent = 'Show Answer';
        toggleButton.disabled = true;
        prevButton.disabled = true;
        nextButton.disabled = true;
        prevButton.classList.add('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        prevButton.classList.remove('hover:-translate-y-0.5');
        nextButton.classList.add('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        nextButton.classList.remove('hover:-translate-y-0.5');
        if (sessionMeta) {
            sessionMeta.textContent = deckSize
                ? `${deckSize} cards available. Start a session to study them in batches of ${desiredLength}.`
                : 'No cards available for this module yet.';
        }
        return;
    }

    toggleButton.disabled = false;
    const card = session[appState.currentFlashcard];
    counter.textContent = `Card ${appState.currentFlashcard + 1} of ${totalCards}`;

    if (sessionMeta) {
        const repeats = deckSize && deckSize < desiredLength;
        sessionMeta.textContent = `${totalCards} card session • ${deckSize} cards in deck${repeats ? ` (deck repeats to reach ${desiredLength})` : ''}`;
    }

    if (!appState.showFlashcardAnswer) {
        content.innerHTML = `
            <div class="text-center">
                <div class="mb-6">
                    <span class="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium">Question</span>
                </div>
                <p class="text-xl mb-6 leading-relaxed">${card.question}</p>
                <p class="text-sm text-slate-500">Click to reveal answer</p>
            </div>
        `;
        toggleButton.textContent = 'Show Answer';
    } else {
        content.innerHTML = `
            <div class="text-center">
                <div class="mb-6">
                    <span class="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium">Answer</span>
                </div>
                <div class="text-lg leading-relaxed whitespace-pre-line">${card.answer}</div>
                <p class="text-sm mt-6 text-slate-500">Click to hide answer</p>
            </div>
        `;
        toggleButton.textContent = 'Hide Answer';
    }

    prevButton.disabled = appState.currentFlashcard === 0;
    nextButton.disabled = appState.currentFlashcard === totalCards - 1;

    if (prevButton.disabled) {
        prevButton.classList.add('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        prevButton.classList.remove('hover:-translate-y-0.5');
    } else {
        prevButton.classList.remove('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        prevButton.classList.add('hover:-translate-y-0.5');
    }

    if (nextButton.disabled) {
        nextButton.classList.add('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        nextButton.classList.remove('hover:-translate-y-0.5');
    } else {
        nextButton.classList.remove('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        nextButton.classList.add('hover:-translate-y-0.5');
    }
}

// =================================
// EVENT HANDLERS
// =================================

// Module Functions
function toggleCodeExpansion(moduleId) {
    if (appState.expandedCode.has(moduleId)) {
        appState.expandedCode.delete(moduleId);
    } else {
        appState.expandedCode.add(moduleId);
    }
    renderModules();
    saveToLocalStorage();
}

function toggleModuleComments(moduleId) {
    const currentSetting = appState.moduleComments.get(moduleId);
    appState.moduleComments.set(moduleId, currentSetting === undefined ? !appState.showComments : !currentSetting);
    renderModules();
    saveToLocalStorage();
}

function setModuleLanguage(moduleId, language) {
    const module = modules.find(m => m.id === moduleId);
    if (module) {
        module.codeExamples = module.codeExamples || {};
        if (!module.codeExamples[language]) {
            module.codeExamples[language] = buildSampleCode(module, language);
        }
    }
    appState.moduleLanguages.set(moduleId, language);
    renderModules();
    saveToLocalStorage();
}

function setModuleMode(moduleId, mode) {
    appState.moduleModes.set(moduleId, mode);
    renderModules();
    saveToLocalStorage();
}

function toggleCompletion(moduleId) {
    if (appState.completedModules.has(moduleId)) {
        appState.completedModules.delete(moduleId);
    } else {
        appState.completedModules.add(moduleId);
        maybePromptStudyPlan(moduleId);
    }
    updateProgress();
    renderModules();
    saveToLocalStorage();
}

// Modal Functions
function openSettings() {
    document.getElementById('settings-modal').style.display = 'flex';
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

function openGlossary() {
    document.getElementById('glossary-modal').style.display = 'flex';
    renderGlossary();
}

function closeGlossary() {
    document.getElementById('glossary-modal').style.display = 'none';
}

function openFlashcards() {
    document.getElementById('flashcards-modal').style.display = 'flex';
    populateFlashcardModuleSelect();
    const moduleSelect = document.getElementById('flashcard-module-select');
    if (moduleSelect) {
        moduleSelect.value = appState.selectedFlashcardModule;
    }
    if (!appState.flashcardSession.length) {
        refreshFlashcardSession(appState.selectedFlashcardModule, { persist: false });
    } else {
        renderFlashcard();
    }
}

function closeFlashcards() {
    document.getElementById('flashcards-modal').style.display = 'none';
}

function openStudyPlanModal() {
    document.getElementById('study-plan-modal').style.display = 'flex';
    resetStudyPlanSelection();
}

function closeStudyPlanModal() {
    document.getElementById('study-plan-modal').style.display = 'none';
}

function resetStudyPlanSelection() {
    studyPlanSelection.pace = appState.studyPlan?.pace || null;
    studyPlanSelection.focus = appState.studyPlan?.focus || null;
    studyPlanSelection.style = appState.studyPlan?.style || null;
    document.querySelectorAll('.plan-option').forEach(button => {
        const group = button.closest('.plan-option-group')?.dataset.planGroup;
        const value = button.dataset.planValue;
        const isActive = group && studyPlanSelection[group] === value;
        button.classList.toggle('active', Boolean(isActive));
    });
    const notes = document.getElementById('study-plan-notes');
    if (notes) notes.value = appState.studyPlan?.notes || '';
}

function selectPlanOption(group, value) {
    studyPlanSelection[group] = value;
    const groupEl = document.querySelector(`.plan-option-group[data-plan-group="${group}"]`);
    if (groupEl) {
        groupEl.querySelectorAll('.plan-option').forEach(button => {
            button.classList.toggle('active', button.dataset.planValue === value);
        });
    }
}

function saveStudyPlan() {
    if (!studyPlanSelection.pace || !studyPlanSelection.focus || !studyPlanSelection.style) {
        showToast?.('Please answer all study plan questions before saving.', 'warning');
        return;
    }
    const notes = document.getElementById('study-plan-notes')?.value.trim() || '';
    appState.studyPlan = {
        ...studyPlanSelection,
        notes,
        summary: `${STUDY_PLAN_LABELS.pace[studyPlanSelection.pace]} • ${STUDY_PLAN_LABELS.focus[studyPlanSelection.focus]}`
    };
    closeStudyPlanModal();
    renderInsights();
    saveToLocalStorage();
    showToast?.('Study plan saved! Your recommendations will reflect it.', 'success');
}

function maybePromptStudyPlan(moduleId) {
    if (moduleId === 'arrays-strings' && appState.completedModules.has('arrays-strings') && !appState.studyPlan) {
        openStudyPlanModal();
    }
}

function openAccountModal() {
    document.getElementById('account-modal').style.display = 'flex';
    const profile = appState.accountProfile || {};
    document.getElementById('account-name').value = profile.name || '';
    document.getElementById('account-email').value = profile.email || '';
    document.getElementById('account-goal').value = profile.goal || 'exploring';
}

function closeAccountModal() {
    document.getElementById('account-modal').style.display = 'none';
}

async function saveAccountProfile() {
    const name = document.getElementById('account-name').value.trim();
    const email = document.getElementById('account-email').value.trim();
    const goal = document.getElementById('account-goal').value;
    if (!name || !email) {
        showToast?.('Enter a name and email to personalize your profile.', 'warning');
        return;
    }
    const payload = { name, email, goal };
    const pendingToast = showToast?.('Saving profile...', 'info');
    try {
        const response = await fakeAccountAPI(payload);
        appState.accountProfile = { ...payload, profileId: response.profileId };
        updateAccountChip();
        closeAccountModal();
        saveToLocalStorage();
        if (pendingToast) pendingToast.dismiss?.();
        showToast?.(response.message || 'Account saved locally.', 'success');
    } catch (error) {
        if (pendingToast) pendingToast.dismiss?.();
        showToast?.('Unable to save profile right now. Try again soon.', 'error');
        console.error('Account save failed:', error);
    }
    updateAccountChip();
}

function updateAccountChip() {
    const chip = document.getElementById('account-chip');
    if (!chip) return;
    if (appState.accountProfile?.name) {
        chip.textContent = `👋 Welcome back, ${appState.accountProfile.name.split(' ')[0]}`;
        chip.classList.remove('hidden');
    } else {
        chip.textContent = '';
        chip.classList.add('hidden');
    }
}

function openSupportModal(moduleId = null) {
    const modal = document.getElementById('support-modal');
    const select = document.getElementById('support-module');
    if (select && !select.children.length) {
        select.innerHTML = modules.map(module => `<option value="${module.id}">${module.title}</option>`).join('');
    }
    if (moduleId && select) {
        select.value = moduleId;
    }
    document.getElementById('support-topic').value = '';
    document.getElementById('support-message').value = '';
    modal.style.display = 'flex';
}

function closeSupportModal() {
    document.getElementById('support-modal').style.display = 'none';
}

function submitSupportRequest(event) {
    event.preventDefault();
    const moduleId = document.getElementById('support-module')?.value;
    const topic = document.getElementById('support-topic')?.value.trim();
    const message = document.getElementById('support-message')?.value.trim();
    if (!topic || !message) {
        showToast?.('Share a topic and short description so mentors can help.', 'warning');
        return;
    }
    closeSupportModal();
    const moduleTitle = modules.find(m => m.id === moduleId)?.title || 'General Module';
    const subject = `[Java DSA Support] ${topic}`;
    const bodyLines = [
        `Module: ${moduleTitle} (${moduleId || 'n/a'})`,
        `Topic: ${topic}`,
        '',
        message,
        '',
        '-- Sent from the Java DSA Learning Hub'
    ];
    const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.open(mailtoUrl, '_blank');
    showToast?.('Support email drafted in your mail app.', 'success');
}
// Flashcard Functions
function prevFlashcard() {
    if (!appState.flashcardSession.length) return;
    if (appState.currentFlashcard > 0) {
        appState.currentFlashcard--;
        appState.showFlashcardAnswer = false;
        renderFlashcard();
        saveToLocalStorage();
    }
}

function nextFlashcard() {
    if (!appState.flashcardSession.length) return;
    if (appState.currentFlashcard < appState.flashcardSession.length - 1) {
        appState.currentFlashcard++;
        appState.showFlashcardAnswer = false;
        renderFlashcard();
        saveToLocalStorage();
    }
}

function randomFlashcard() {
    if (!appState.flashcardSession.length) return;
    appState.currentFlashcard = Math.floor(Math.random() * appState.flashcardSession.length);
    appState.showFlashcardAnswer = false;
    renderFlashcard();
    saveToLocalStorage();
}

function toggleFlashcardAnswer() {
    if (!appState.flashcardSession.length) return;
    appState.showFlashcardAnswer = !appState.showFlashcardAnswer;
    renderFlashcard();
}

function refreshFlashcardSession(moduleId = appState.selectedFlashcardModule, { persist = true } = {}) {
    appState.selectedFlashcardModule = moduleId;
    if (!isFlashcardModuleAccessible(moduleId)) {
        appState.flashcardSession = [];
        appState.currentFlashcard = 0;
        appState.showFlashcardAnswer = false;
        renderFlashcard();
        const meta = document.getElementById('flashcard-session-meta');
        if (meta && moduleId !== 'all' && moduleId !== 'general') {
            meta.textContent = 'Complete this module and pass its quiz to unlock its flashcards.';
        }
        if (persist) saveToLocalStorage();
        return;
    }
    const deck = getFlashcardDeck(moduleId);

    if (!deck.length) {
        appState.flashcardSession = [];
        appState.currentFlashcard = 0;
        appState.showFlashcardAnswer = false;
        renderFlashcard();
        if (persist) saveToLocalStorage();
        return;
    }

    const desiredLength = appState.flashcardSessionLength || FLASHCARD_SESSION_SIZE;
    const session = [];
    let pool = shuffleArray(deck);

    while (session.length < desiredLength) {
        if (!pool.length) {
            pool = shuffleArray(deck);
        }
        session.push(pool.shift());
    }

    appState.flashcardSession = session.slice(0, desiredLength);
    appState.currentFlashcard = 0;
    appState.showFlashcardAnswer = false;
    renderFlashcard();
    if (persist) saveToLocalStorage();
}

function populateFlashcardModuleSelect() {
    const select = document.getElementById('flashcard-module-select');
    if (!select) return;
    const previousValue = select.value || appState.selectedFlashcardModule || 'all';
    const options = ['<option value="all">All Modules (mix)</option>'];
    modules.forEach((module, index) => {
        const unlocked = isFlashcardModuleAccessible(module.id);
        const lockLabel = unlocked ? '' : ' (Complete quiz to unlock)';
        options.push(`<option value="${module.id}" ${unlocked ? '' : 'disabled'}>${index + 1}. ${module.title}${lockLabel}</option>`);
    });
    select.innerHTML = options.join('');
    const valueToSet = isFlashcardModuleAccessible(previousValue) ? previousValue : 'all';
    select.value = valueToSet;
    appState.selectedFlashcardModule = valueToSet;
}

// Quiz Functions
function openQuiz(moduleId) {
    const quiz = quizData[moduleId];
    if (!quiz || !quiz.parts[0].questions.length) return;

    appState.currentQuiz = {
        moduleId,
        questions: quiz.parts[0].questions,
        currentQuestion: 0,
        answers: [],
        showResults: false,
        score: 0
    };

    document.getElementById('quiz-modal').style.display = 'flex';
    renderQuiz();
}

function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
    appState.currentQuiz = null;
}

function renderQuiz() {
    if (!appState.currentQuiz) return;

    const module = modules.find(m => m.id === appState.currentQuiz.moduleId);
    const title = document.getElementById('quiz-title');
    const content = document.getElementById('quiz-content');

    title.textContent = `🧠 Quiz: ${module?.title || 'Quiz'}`;

    if (!appState.currentQuiz.showResults) {
        content.innerHTML = `
            <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm text-slate-600">
                        Question ${appState.currentQuiz.currentQuestion + 1} of ${appState.currentQuiz.questions.length}
                    </span>
                    <div class="h-2 bg-gray-200 rounded-full flex-1 ml-4 overflow-hidden">
                        <div class="h-full bg-indigo-500 transition-all duration-300" style="width: ${((appState.currentQuiz.currentQuestion + 1) / appState.currentQuiz.questions.length) * 100}%"></div>
                    </div>
                </div>
                <h4 class="text-xl font-semibold mb-6 text-slate-800">
                    ${appState.currentQuiz.questions[appState.currentQuiz.currentQuestion].question}
                </h4>
            </div>

            <div class="space-y-3 mb-8">
                ${appState.currentQuiz.questions[appState.currentQuiz.currentQuestion].options.map((option, index) => `
                    <button onclick="answerQuestion(${index})" class="w-full p-4 text-left rounded-xl border-2 transition-all duration-200 quiz-option ${appState.currentQuiz.answers[appState.currentQuiz.currentQuestion] === index ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 bg-white hover:bg-slate-50'}">
                        <span class="font-medium text-slate-800">
                            ${String.fromCharCode(65 + index)}. ${option}
                        </span>
                    </button>
                `).join('')}
            </div>

            <div class="flex justify-between">
                <button onclick="prevQuestion()" ${appState.currentQuiz.currentQuestion === 0 ? 'disabled' : ''} class="px-6 py-3 rounded-xl font-medium transition-all duration-200 ${appState.currentQuiz.currentQuestion === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600 text-white'}">
                    Previous
                </button>

                <button onclick="nextQuestion()" ${appState.currentQuiz.answers[appState.currentQuiz.currentQuestion] === undefined ? 'disabled' : ''} class="px-6 py-3 rounded-xl font-medium transition-all duration-200 ${appState.currentQuiz.answers[appState.currentQuiz.currentQuestion] === undefined ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}">
                    ${appState.currentQuiz.currentQuestion === appState.currentQuiz.questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="text-center">
                <div class="mb-6">
                    <div class="text-6xl mb-4">
                        ${appState.currentQuiz.score === appState.currentQuiz.questions.length ? '🎉' :
                appState.currentQuiz.score >= appState.currentQuiz.questions.length * 0.7 ? '👏' : '📚'}
                    </div>
                    <h4 class="text-3xl font-bold mb-2 text-indigo-600">Quiz Complete!</h4>
                    <p class="text-xl text-slate-800">
                        You scored ${appState.currentQuiz.score} out of ${appState.currentQuiz.questions.length}
                    </p>
                    <p class="text-lg text-slate-600">
                        (${Math.round((appState.currentQuiz.score / appState.currentQuiz.questions.length) * 100)}%)
                    </p>
                </div>

                <div class="space-y-4 mb-8">
                    ${appState.currentQuiz.questions.map((question, index) => `
                        <div class="text-left p-4 rounded-xl border ${appState.currentQuiz.answers[index] === question.correct ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}">
                            <div class="flex items-start gap-3">
                                <span class="text-xl">
                                    ${appState.currentQuiz.answers[index] === question.correct ? '✅' : '❌'}
                                </span>
                                <div class="flex-1">
                                    <p class="font-medium mb-2 text-slate-800">${question.question}</p>
                                    <p class="text-sm text-slate-600">
                                        <strong>Your answer:</strong> ${question.options[appState.currentQuiz.answers[index]]}
                                    </p>
                                    ${appState.currentQuiz.answers[index] !== question.correct ? `
                                        <p class="text-sm text-slate-600">
                                            <strong>Correct answer:</strong> ${question.options[question.correct]}
                                        </p>
                                    ` : ''}
                                    <p class="text-sm mt-2 text-slate-800">
                                        <strong>Explanation:</strong> ${question.explanation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="flex gap-4 justify-center">
                    <button onclick="restartQuiz()" class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        🔄 Retake Quiz
                    </button>
                    <button onclick="closeQuiz()" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        Close
                    </button>
                </div>
            </div>
        `;
    }
}

function answerQuestion(answerIndex) {
    if (!appState.currentQuiz) return;
    appState.currentQuiz.answers[appState.currentQuiz.currentQuestion] = answerIndex;
    renderQuiz();
}

function nextQuestion() {
    if (!appState.currentQuiz) return;

    if (appState.currentQuiz.currentQuestion < appState.currentQuiz.questions.length - 1) {
        appState.currentQuiz.currentQuestion++;
        renderQuiz();
    } else {
        // Calculate score and show results
        const score = appState.currentQuiz.answers.reduce((acc, answer, index) => {
            return acc + (answer === appState.currentQuiz.questions[index].correct ? 1 : 0);
        }, 0);

        appState.currentQuiz.showResults = true;
        appState.currentQuiz.score = score;
        markQuizCompleted(appState.currentQuiz.moduleId);
        renderQuiz();
    }
}

function prevQuestion() {
    if (!appState.currentQuiz) return;

    if (appState.currentQuiz.currentQuestion > 0) {
        appState.currentQuiz.currentQuestion--;
        renderQuiz();
    }
}

function restartQuiz() {
    if (!appState.currentQuiz) return;

    appState.currentQuiz.currentQuestion = 0;
    appState.currentQuiz.answers = [];
    appState.currentQuiz.showResults = false;
    appState.currentQuiz.score = 0;
    renderQuiz();
}

// Other Functions
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress?')) {
        appState.completedModules.clear();
        appState.completedQuizzes.clear();
        appState.expandedCode.clear();
        appState.moduleComments.clear();
        appState.moduleLanguages.clear();
        appState.moduleModes.clear();
        appState.searchTerm = '';
        appState.difficultyFilter = 'all';
        appState.glossarySearch = '';
        appState.glossaryCategory = 'all';
        appState.currentFlashcard = 0;
        appState.showFlashcardAnswer = false;
        appState.currentQuiz = null;
        appState.selectedFlashcardModule = 'all';
        appState.flashcardSession = [];
        appState.dailyChallengeId = null;
        appState.dailyChallengeDate = null;
        appState.studyTipId = null;

        // Reset UI
        document.getElementById('search-input').value = '';
        document.getElementById('difficulty-filter').value = 'all';
        document.getElementById('glossary-search').value = '';

        updateProgress();
        renderModules();
        populateFlashcardModuleSelect();
        refreshFlashcardSession('all', { persist: false });
        renderDailyChallenge(true);
        renderStudyTip(true);
        saveToLocalStorage();
    }
}

// =================================
// INITIALIZATION
// =================================

function init() {
    // Load saved state
    loadFromLocalStorage();
    ensureStudyTimesReset();
    studyTimer.startTime = null;
    studyTimer.totalTime = studyMetrics.totalTimeMs || 0;
    studyTimer.isActive = false;

    // Apply loaded state to UI
    applyFontScale();
    applyTheme();
    applyAccentTheme();
    applyCompactLayout();
    applyCardDepth();
    updateDarkMode();
    updateCommentsToggle();
    updateHideCompletedToggle();
    updateCompactLayoutToggle();
    updateAccountChip();
    updateProgress();
    renderModules();
    renderDailyChallenge();
    renderStudyTip();
    initPlayground();

    // Set initial form values
    document.getElementById('search-input').value = appState.searchTerm;
    document.getElementById('difficulty-filter').value = appState.difficultyFilter;

    // Add event listeners
    document.getElementById('settings-btn').addEventListener('click', openSettings);
    document.getElementById('close-settings').addEventListener('click', closeSettings);
    document.getElementById('save-settings').addEventListener('click', closeSettings);

    document.getElementById('glossary-btn').addEventListener('click', openGlossary);
    document.getElementById('close-glossary').addEventListener('click', closeGlossary);

    document.getElementById('flashcards-btn').addEventListener('click', openFlashcards);
    document.getElementById('close-flashcards').addEventListener('click', closeFlashcards);

    document.getElementById('close-quiz').addEventListener('click', closeQuiz);

    document.getElementById('account-btn').addEventListener('click', openAccountModal);
    document.getElementById('close-account').addEventListener('click', closeAccountModal);
    document.getElementById('save-account').addEventListener('click', saveAccountProfile);

    document.getElementById('close-study-plan').addEventListener('click', closeStudyPlanModal);
    document.getElementById('save-study-plan').addEventListener('click', saveStudyPlan);
    const planCtaButton = document.getElementById('insight-plan-cta');
    if (planCtaButton) {
        planCtaButton.addEventListener('click', openStudyPlanModal);
    }

    document.querySelectorAll('.plan-option').forEach(button => {
        button.addEventListener('click', () => {
            const group = button.closest('.plan-option-group')?.dataset.planGroup;
            if (!group) return;
            selectPlanOption(group, button.dataset.planValue);
        });
    });

    document.getElementById('close-support').addEventListener('click', closeSupportModal);
    document.getElementById('support-form').addEventListener('submit', submitSupportRequest);

    document.getElementById('reset-btn').addEventListener('click', resetProgress);

    const studyToggleButton = document.getElementById('study-session-toggle');
    if (studyToggleButton) {
        studyToggleButton.addEventListener('click', toggleManualStudySession);
    }

    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        appState.darkMode = !appState.darkMode;
        updateDarkMode();
        saveToLocalStorage();
    });

    // Comments toggle
    document.getElementById('comments-toggle').addEventListener('click', () => {
        appState.showComments = !appState.showComments;
        updateCommentsToggle();
        renderModules();
        saveToLocalStorage();
    });

    const hideCompletedToggle = document.getElementById('hide-completed-toggle');
    if (hideCompletedToggle) {
        hideCompletedToggle.addEventListener('click', () => {
            appState.hideCompletedModules = !appState.hideCompletedModules;
            updateHideCompletedToggle();
            renderModules();
            saveToLocalStorage();
        });
    }

    const compactLayoutToggle = document.getElementById('compact-layout-toggle');
    if (compactLayoutToggle) {
        compactLayoutToggle.addEventListener('click', () => {
            appState.compactLayout = !appState.compactLayout;
            updateCompactLayoutToggle();
            applyCompactLayout();
            saveToLocalStorage();
        });
    }

    // Search and filter
    document.getElementById('search-input').addEventListener('input', (e) => {
        appState.searchTerm = e.target.value;
        renderModules();
        saveToLocalStorage();
    });

    document.getElementById('difficulty-filter').addEventListener('change', (e) => {
        appState.difficultyFilter = e.target.value;
        renderModules();
        saveToLocalStorage();
    });

    // Glossary search
    document.getElementById('glossary-search').addEventListener('input', (e) => {
        appState.glossarySearch = e.target.value;
        renderGlossary();
    });

    // Flashcard event listeners
    document.getElementById('prev-flashcard').addEventListener('click', prevFlashcard);
    document.getElementById('next-flashcard').addEventListener('click', nextFlashcard);
    document.getElementById('random-flashcard').addEventListener('click', randomFlashcard);
    document.getElementById('toggle-flashcard-answer').addEventListener('click', toggleFlashcardAnswer);
    document.getElementById('flashcard-content').addEventListener('click', toggleFlashcardAnswer);
    populateFlashcardModuleSelect();
    const flashcardModuleSelect = document.getElementById('flashcard-module-select');
    if (flashcardModuleSelect) {
        const hasOption = Array.from(flashcardModuleSelect.options).some(option => option.value === appState.selectedFlashcardModule);
        if (!hasOption) {
            appState.selectedFlashcardModule = 'all';
        }
        flashcardModuleSelect.value = appState.selectedFlashcardModule;
        flashcardModuleSelect.addEventListener('change', (e) => {
            appState.selectedFlashcardModule = e.target.value;
            refreshFlashcardSession(appState.selectedFlashcardModule);
        });
    }
    const flashcardStartButton = document.getElementById('flashcard-start-session');
    if (flashcardStartButton) {
        flashcardStartButton.addEventListener('click', () => {
            refreshFlashcardSession(appState.selectedFlashcardModule);
        });
    }

    // Scroll event for header shrinking
    window.addEventListener('scroll', () => {
        appState.scrollY = window.scrollY;
        updateHeaderShrink();
    });

    // Modal backdrop clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('fixed') && e.target.classList.contains('inset-0')) {
            if (e.target.id === 'settings-modal') closeSettings();
            if (e.target.id === 'glossary-modal') closeGlossary();
            if (e.target.id === 'flashcards-modal') closeFlashcards();
            if (e.target.id === 'quiz-modal') closeQuiz();
            if (e.target.id === 'account-modal') closeAccountModal();
            if (e.target.id === 'study-plan-modal') closeStudyPlanModal();
            if (e.target.id === 'support-modal') closeSupportModal();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key to close modals
        if (e.key === 'Escape') {
            closeSettings();
            closeGlossary();
            closeFlashcards();
            closeQuiz();
            closeAccountModal();
            closeStudyPlanModal();
            closeSupportModal();
        }

        // Arrow keys for flashcards (when flashcard modal is open)
        if (document.getElementById('flashcards-modal').style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevFlashcard();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextFlashcard();
            }
            if (e.key === ' ') {
                e.preventDefault();
                toggleFlashcardAnswer();
            }
        }
    });

    updateStudyTrackerUI();
    if (!studyTimer.isActive) {
        startStudySession();
    }

    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = appState.theme;
        themeSelect.addEventListener('change', (e) => {
            appState.theme = e.target.value;
            applyTheme();
            saveToLocalStorage();
        });
    }

    const accentSelect = document.getElementById('accent-select');
    if (accentSelect) {
        accentSelect.value = appState.accentTheme || 'indigo';
        accentSelect.addEventListener('change', (e) => {
            appState.accentTheme = e.target.value;
            applyAccentTheme();
            saveToLocalStorage();
        });
    }

    const weeklyGoalSelect = document.getElementById('weekly-goal-select');
    if (weeklyGoalSelect) {
        weeklyGoalSelect.value = String(appState.weeklyGoal || 5);
        weeklyGoalSelect.addEventListener('change', (e) => {
            appState.weeklyGoal = Number(e.target.value) || 5;
            renderInsights();
            saveToLocalStorage();
        });
    }

    const refreshChallengeBtn = document.getElementById('refresh-challenge');
    if (refreshChallengeBtn) {
        refreshChallengeBtn.addEventListener('click', () => {
            renderDailyChallenge(true);
        });
    }

    const refreshStudyTipBtn = document.getElementById('refresh-study-tip');
    if (refreshStudyTipBtn) {
        refreshStudyTipBtn.addEventListener('click', () => {
            renderStudyTip(true);
        });
    }

    const fontScaleSelect = document.getElementById('font-scale-select');
    if (fontScaleSelect) {
        fontScaleSelect.value = appState.fontScale;
        fontScaleSelect.addEventListener('change', (e) => {
            appState.fontScale = e.target.value;
            applyFontScale();
            saveToLocalStorage();
        });
    }

    const cardDepthSelect = document.getElementById('card-depth-select');
    if (cardDepthSelect) {
        cardDepthSelect.value = appState.cardDensity || 'standard';
        cardDepthSelect.addEventListener('change', (e) => {
            appState.cardDensity = e.target.value;
            applyCardDepth();
            saveToLocalStorage();
        });
    }

    console.log('Java DSA Learning Hub initialized successfully!');
}

// =================================
// ADDITIONAL UTILITY FUNCTIONS
// =================================

function loadStudyMetrics() {
    const defaults = { totalTimeMs: 0, todayMs: 0, todayDate: null };
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.STUDY_METRICS);
        if (!stored) return { ...defaults };
        const parsed = JSON.parse(stored);
        return { ...defaults, ...parsed };
    } catch (error) {
        console.warn('Unable to load study metrics:', error);
        return { ...defaults };
    }
}

function saveStudyMetrics() {
    localStorage.setItem(STORAGE_KEYS.STUDY_METRICS, JSON.stringify(studyMetrics));
}

function ensureTodayMetrics() {
    const today = new Date().toISOString().split('T')[0];
    if (studyMetrics.todayDate !== today) {
        studyMetrics.todayDate = today;
        studyMetrics.todayMs = 0;
        saveStudyMetrics();
    }
}

function loadStudyHabit() {
    const defaults = { streak: 0, lastDate: null, longestStreak: 0 };
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.STUDY_HABIT);
        if (!stored) return { ...defaults };
        const parsed = JSON.parse(stored);
        return { ...defaults, ...parsed };
    } catch (error) {
        console.warn('Unable to load study habit data:', error);
        return { ...defaults };
    }
}

function saveStudyHabit() {
    localStorage.setItem(STORAGE_KEYS.STUDY_HABIT, JSON.stringify(studyHabit));
}

function ensureStudyTimesReset() {
    try {
        if (localStorage.getItem(RESET_FLAGS.STUDY_TIMES) === 'done') {
            return;
        }
    } catch (error) {
        console.warn('Unable to read reset flag:', error);
    }
    studyMetrics = { totalTimeMs: 0, todayMs: 0, todayDate: null };
    saveStudyMetrics();
    studyHabit = { streak: 0, lastDate: null, longestStreak: 0 };
    saveStudyHabit();
    try {
        localStorage.setItem(RESET_FLAGS.STUDY_TIMES, 'done');
    } catch (error) {
        console.warn('Unable to persist reset flag:', error);
    }
}

function updateStudyHabit(sessionTime) {
    if (!sessionTime || sessionTime < 60000) return; // ignore sessions under a minute
    const today = new Date().toISOString().split('T')[0];
    const lastDate = studyHabit.lastDate;

    if (lastDate === today) {
        return;
    }

    if (!lastDate) {
        studyHabit.streak = 1;
    } else {
        const last = new Date(lastDate);
        const current = new Date(today);
        const diffDays = Math.round((current - last) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
            studyHabit.streak += 1;
        } else if (diffDays > 1) {
            studyHabit.streak = 1;
        }
    }

    studyHabit.lastDate = today;
    studyHabit.longestStreak = Math.max(studyHabit.longestStreak || 1, studyHabit.streak);
    saveStudyHabit();
}

function formatMinutes(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    if (remaining === 0) {
        return `${hours}h`;
    }
    return `${hours}h ${remaining}m`;
}

function getBreakReminder() {
    if (!studyTimer.isActive || !studyTimer.startTime) {
        return '⏱ Break reminder in 25 min';
    }
    const minutesElapsed = Math.floor((Date.now() - studyTimer.startTime) / 60000);
    if (minutesElapsed >= 25) {
        return '🌿 Stretch & hydrate now!';
    }
    return `⏱ Break in ${25 - minutesElapsed} min`;
}

function updateStudyTrackerUI() {
    const statusEl = document.getElementById('study-session-status');
    const todayEl = document.getElementById('study-time-today');
    const totalEl = document.getElementById('study-time-total');
    const streakEl = document.getElementById('study-streak-count');
    const toggleBtn = document.getElementById('study-session-toggle');
    const breakEl = document.getElementById('next-break-pill');

    if (!statusEl || !todayEl || !totalEl || !streakEl) return;

    ensureTodayMetrics();
    const totalMinutes = Math.max(0, Math.round((studyMetrics.totalTimeMs || 0) / 60000));
    const todayMinutes = Math.max(0, Math.round((studyMetrics.todayMs || 0) / 60000));

    statusEl.textContent = studyTimer.isActive ? 'Focusing' : 'Idle';
    statusEl.classList.toggle('bg-emerald-100', studyTimer.isActive);
    statusEl.classList.toggle('text-emerald-700', studyTimer.isActive);

    todayEl.textContent = `${todayMinutes} min`;
    totalEl.textContent = formatMinutes(totalMinutes);
    streakEl.textContent = `${studyHabit.streak || 0} day${(studyHabit.streak || 0) === 1 ? '' : 's'}`;

    if (toggleBtn) {
        toggleBtn.textContent = studyTimer.isActive ? 'Pause Focus Session' : 'Start Focus Session';
    }

    if (breakEl) {
        breakEl.textContent = getBreakReminder();
    }
}

function renderInsights() {
    const progressEl = document.getElementById('insights-progress-percent');
    const progressBar = document.getElementById('insights-progress-bar');
    const completedEl = document.getElementById('insights-completed-count');
    const totalEl = document.getElementById('insights-total-count');
    const breakdownEl = document.getElementById('difficulty-breakdown');
    const insightUpdates = document.getElementById('insight-updates');
    const learningPathProgress = document.getElementById('learning-path-progress');
    const learningPathNext = document.getElementById('learning-path-next');
    const recommendedList = document.getElementById('recommended-modules-list');
    const highlightGoalEl = document.getElementById('insight-weekly-goal');
    const highlightGoalNoteEl = document.getElementById('insight-weekly-note');
    const highlightFocusEl = document.getElementById('insight-focus-minutes');
    const highlightFocusNoteEl = document.getElementById('insight-focus-note');
    const highlightStreakValueEl = document.getElementById('insight-streak-value');
    const highlightStreakNoteEl = document.getElementById('insight-streak-note');
    const planLabelEl = document.getElementById('insight-plan-label');
    const planNoteEl = document.getElementById('insight-plan-note');
    const planPillEl = document.getElementById('insight-plan-pill');
    const planButtonEl = document.getElementById('insight-plan-cta');
    const momentumStreakEl = document.getElementById('insight-momentum-streak');
    const momentumTodayEl = document.getElementById('insight-momentum-today');
    const momentumLongestEl = document.getElementById('insight-momentum-longest');
    const momentumTrendEl = document.getElementById('insight-momentum-trend');
    const momentumTipEl = document.getElementById('insight-momentum-tip');

    if (!progressEl || !progressBar) {
        updateStudyTrackerUI();
        return;
    }

    const stats = getModuleStats();
    const learningPath = generateLearningPath();
    ensureTodayMetrics();
    const totalMinutes = Math.max(0, Math.round((studyMetrics.totalTimeMs || 0) / 60000));
    const todayMinutes = Math.max(0, Math.round((studyMetrics.todayMs || 0) / 60000));
    const streak = studyHabit.streak || 0;
    const longestStreak = Math.max(streak, studyHabit.longestStreak || 0);
    const weeklyGoal = Math.max(1, Number(appState.weeklyGoal) || 5);
    const modulesRemaining = Math.max(0, stats.total - stats.completed);
    const finishWeeks = modulesRemaining === 0 ? 0 : Math.max(1, Math.ceil(modulesRemaining / weeklyGoal));
    const progress = Number.isFinite(stats.percentage) ? stats.percentage : 0;
    const normalizedProgress = Math.max(0, Math.min(100, progress));

    progressEl.textContent = `${normalizedProgress}%`;
    progressBar.style.width = `${normalizedProgress}%`;
    completedEl.textContent = `${stats.completed} completed`;
    totalEl.textContent = `${stats.total} total modules`;

    if (learningPathProgress) {
        learningPathProgress.textContent = `${learningPath.progress}% complete`;
    }

    if (learningPathNext) {
        if (learningPath.next) {
            const topics = (learningPath.next.topics || []).slice(0, 3).join(', ') || 'Core DSA';
            learningPathNext.innerHTML = `
                <p class="font-semibold text-indigo-600">${learningPath.next.title}</p>
                <p class="text-xs text-slate-500 mb-1">${learningPath.next.difficulty} • ${topics}</p>
                <p class="text-sm text-slate-600">${learningPath.next.description}</p>
            `;
        } else {
            learningPathNext.textContent = 'Awesome job! You have explored all available modules.';
        }
    }

    if (recommendedList) {
        const recommendations = learningPath.upcoming && learningPath.upcoming.length > 0
            ? learningPath.upcoming
            : getRecommendedModules();

        if (recommendations.length === 0) {
            recommendedList.innerHTML = `
                <li class="text-xs text-slate-500">All modules completed. Check back soon for new content!</li>
            `;
        } else {
            recommendedList.innerHTML = recommendations.map(module => {
                const topics = (module.topics || []).slice(0, 3).join(', ') || 'Practice set';
                return `
                <li>
                    <button class="recommended-link" onclick="focusModule('${module.id}')">
                        <div class="font-semibold text-slate-800 dark:text-slate-100">${module.title}</div>
                        <div class="text-xs text-slate-500">${topics}</div>
                    </button>
                </li>
            `;
            }).join('');
        }
    }

    if (breakdownEl) {
        const difficulties = Object.keys(DIFFICULTY_COLORS);
        const totals = stats.byDifficulty || {};
        const completedTotals = stats.completedByDifficulty || {};
        breakdownEl.innerHTML = difficulties
            .filter(level => level !== 'default')
            .map(level => {
                const total = totals[level] || 0;
                const completed = completedTotals[level] || 0;
                const percent = total ? Math.round((completed / total) * 100) : 0;
                return `
                    <span class="insight-pill">
                        ${level.charAt(0).toUpperCase() + level.slice(1)} · ${completed}/${total} (${percent}%)
                    </span>
                `;
            }).join('');
    }

        if (insightUpdates) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        insightUpdates.textContent = `Synced ${timestamp}`;
    }

    const planSummary = appState.studyPlan?.summary || null;
    const hasPlan = Boolean(appState.studyPlan);
    if (planLabelEl) {
        planLabelEl.textContent = hasPlan
            ? `${STUDY_PLAN_LABELS.pace[appState.studyPlan.pace]} pace`
            : 'Not configured';
    }
    if (planNoteEl) {
        if (hasPlan) {
            const focus = STUDY_PLAN_LABELS.focus[appState.studyPlan.focus];
            const style = STUDY_PLAN_LABELS.style[appState.studyPlan.style];
            planNoteEl.textContent = `${focus} • Prefers ${style}`;
        } else {
            planNoteEl.textContent = 'Answer 3 quick questions to personalize pacing.';
        }
    }
    if (planPillEl) {
        planPillEl.textContent = hasPlan ? 'Active' : 'Set up';
        planPillEl.classList.toggle('bg-emerald-100', hasPlan);
        planPillEl.classList.toggle('text-emerald-700', hasPlan);
        planPillEl.classList.toggle('bg-slate-100', !hasPlan);
        planPillEl.classList.toggle('text-slate-600', !hasPlan);
    }
    if (planButtonEl) {
        planButtonEl.textContent = hasPlan ? 'Adjust Plan' : 'Personalize';
    }
    if (highlightGoalEl) {
        highlightGoalEl.textContent = `${weeklyGoal} modules/wk`;
    }
    if (highlightGoalNoteEl) {
        const finishText = modulesRemaining === 0
            ? 'Goal complete! Review & reinforce.'
            : `Finish in ~${finishWeeks} week${finishWeeks === 1 ? '' : 's'}`;
        highlightGoalNoteEl.textContent = planSummary ? `${planSummary} • ${finishText}` : finishText;
    }
    if (highlightFocusEl) {
        highlightFocusEl.textContent = `${formatMinutes(todayMinutes)} today`;
    }
    if (highlightFocusNoteEl) {
        const mentor = appState.accountProfile?.name ? `${appState.accountProfile.name.split(' ')[0]}'s` : 'Lifetime';
        highlightFocusNoteEl.textContent = `${mentor} total ${formatMinutes(totalMinutes)}`;
    }
    if (highlightStreakValueEl) {
        highlightStreakValueEl.textContent = `${streak}-day streak`;
    }
    if (highlightStreakNoteEl) {
        highlightStreakNoteEl.textContent = `Longest streak: ${longestStreak} day${longestStreak === 1 ? '' : 's'}`;
    }

    if (momentumStreakEl) {
        momentumStreakEl.textContent = `${streak} day${streak === 1 ? '' : 's'}`;
    }
    if (momentumTodayEl) {
        momentumTodayEl.textContent = formatMinutes(todayMinutes);
    }
    if (momentumLongestEl) {
        momentumLongestEl.textContent = `${longestStreak} day${longestStreak === 1 ? '' : 's'}`;
    }
    if (momentumTrendEl) {
        let trendLabel = 'Getting started';
        if (streak >= 3 || todayMinutes >= 45) trendLabel = 'On track';
        if (streak >= 7 || todayMinutes >= 90) trendLabel = 'Momentum unlocked';
        momentumTrendEl.textContent = trendLabel;
    }
    if (momentumTipEl) {
        let tip = 'Log a focus session to start building momentum.';
        const weeklyNeed = modulesRemaining === 0 ? 0 : Math.min(modulesRemaining, weeklyGoal);
        if (modulesRemaining === 0) {
            tip = 'All modules complete—spend time on flashcards or mentor a friend.';
        } else if (streak >= 7) {
            tip = '🔥 Your streak is on fire! Consider revisiting advanced challenge sets.';
        } else if (todayMinutes < 30) {
            tip = 'Try a focused 30-minute sprint to lock in a module today.';
        } else if (appState.studyPlan) {
            tip = `Follow your ${STUDY_PLAN_LABELS.focus[appState.studyPlan.focus]} focus—${weeklyNeed} module${weeklyNeed === 1 ? '' : 's'} keeps you on pace.`;
        } else {
            tip = `Complete ${weeklyNeed} module${weeklyNeed === 1 ? '' : 's'} this week to stay on pace.`;
        }
        momentumTipEl.textContent = tip;
    }

    updateStudyTrackerUI();
}

function focusModule(moduleId) {
    const target = document.querySelector(`[data-module-card="${moduleId}"]`);
    if (!target) {
        showToast('Module not visible. Try adjusting filters!', 'warning');
        return;
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.classList.add('module-highlight');
    setTimeout(() => target.classList.remove('module-highlight'), 1600);
}

function toggleManualStudySession() {
    if (studyTimer.isActive) {
        endStudySession({ notify: false });
        showToast('Focus session logged. Nice work!', 'success');
    } else {
        startStudySession({ notify: false });
        showToast('Focus session started. You got this!', 'info');
    }
}

// Generate PayPal donation URL
function generatePayPalUrl(amount, description) {
    const params = new URLSearchParams({
        business: 'your.email@paypal.com',
        amount: amount,
        currency_code: 'USD',
        item_name: description
    });
    return `https://www.paypal.com/donate?${params.toString()}`;
}

// Copy code to clipboard
function copyCodeToClipboard(moduleId) {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    const code = getCodeExample(module);
    navigator.clipboard.writeText(code).then(() => {
        // Show temporary success message
        showToast('Code copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy code:', err);
        showToast('Failed to copy code', 'error');
    });
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform translate-x-full`;

    switch (type) {
        case 'success':
            toast.classList.add('bg-green-500');
            break;
        case 'error':
            toast.classList.add('bg-red-500');
            break;
        case 'warning':
            toast.classList.add('bg-yellow-500');
            break;
        default:
            toast.classList.add('bg-blue-500');
    }

    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Enhanced search functionality
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Module statistics
function getModuleStats() {
    const total = modules.length;
    const completed = appState.completedModules.size;
    const byDifficulty = modules.reduce((acc, module) => {
        acc[module.difficulty] = (acc[module.difficulty] || 0) + 1;
        return acc;
    }, {});

    const completedByDifficulty = modules.reduce((acc, module) => {
        if (appState.completedModules.has(module.id)) {
            acc[module.difficulty] = (acc[module.difficulty] || 0) + 1;
        }
        return acc;
    }, {});

    return {
        total,
        completed,
        percentage: Math.round((completed / total) * 100),
        byDifficulty,
        completedByDifficulty
    };
}

// Export progress as JSON
function exportProgress() {
    const stats = getModuleStats();
    const exportData = {
        timestamp: new Date().toISOString(),
        version: '1.0',
        stats,
        progress: {
            completedModules: Array.from(appState.completedModules),
            moduleSettings: {
                comments: Array.from(appState.moduleComments.entries()),
                languages: Array.from(appState.moduleLanguages.entries()),
                modes: Array.from(appState.moduleModes.entries())
            },
            preferences: {
                darkMode: appState.darkMode,
                showComments: appState.showComments
            }
        }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `java-dsa-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Progress exported successfully!', 'success');
}

// Import progress from JSON
function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importData = JSON.parse(e.target.result);

            if (importData.version && importData.progress) {
                // Restore progress
                appState.completedModules = new Set(importData.progress.completedModules);
                appState.moduleComments = new Map(importData.progress.moduleSettings.comments);
                appState.moduleLanguages = new Map(importData.progress.moduleSettings.languages);
                appState.moduleModes = new Map(importData.progress.moduleSettings.modes);
                appState.darkMode = importData.progress.preferences.darkMode;
                appState.showComments = importData.progress.preferences.showComments;

                // Update UI
                updateDarkMode();
                updateCommentsToggle();
                updateProgress();
                renderModules();
                saveToLocalStorage();

                showToast('Progress imported successfully!', 'success');
            } else {
                throw new Error('Invalid file format');
            }
        } catch (error) {
            console.error('Import error:', error);
            showToast('Failed to import progress. Invalid file format.', 'error');
        }
    };

    reader.readAsText(file);
}

// Print study guide
function printStudyGuide() {
    const completedModules = modules.filter(m => appState.completedModules.has(m.id));

    if (completedModules.length === 0) {
        showToast('Complete some modules first to generate a study guide!', 'warning');
        return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Java DSA Study Guide</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
                h2 { color: #6366f1; margin-top: 30px; }
                .module { margin-bottom: 30px; page-break-inside: avoid; }
                .topics { background: #f8fafc; padding: 10px; border-radius: 5px; }
                .explanation { margin: 15px 0; line-height: 1.6; }
                .resources { margin-top: 15px; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <h1>Java DSA Study Guide</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <p>Completed Modules: ${completedModules.length} of ${modules.length}</p>
            
            ${completedModules.map(module => `
                <div class="module">
                    <h2>${module.title}</h2>
                    <p><strong>Difficulty:</strong> ${module.difficulty}</p>
                    <div class="topics">
                        <strong>Topics:</strong> ${module.topics.join(', ')}
                    </div>
                    <div class="explanation">
                        ${module.explanation.replace(/\n/g, '<br>')}
                    </div>
                    <div class="resources">
                        <strong>Resources:</strong>
                        <ul>
                            ${module.resources.map(resource => `<li>${resource}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
}

// Enhanced error handling
function handleError(error, context = 'Application') {
    console.error(`${context} Error:`, error);
    showToast(`${context} error occurred. Please try again.`, 'error');
}

// Performance monitoring
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}

// Accessibility improvements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Theme management
function toggleTheme() {
    appState.darkMode = !appState.darkMode;
    updateDarkMode();
    saveToLocalStorage();
    announceToScreenReader(`Switched to ${appState.darkMode ? 'dark' : 'light'} mode`);
}

// Advanced search with debouncing
let searchTimeout;
function debouncedSearch(searchTerm) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        appState.searchTerm = searchTerm;
        renderModules();
        saveToLocalStorage();
    }, 300);
}

// Mobile detection and optimization
function isMobile() {
    return window.innerWidth <= 768;
}

function optimizeForMobile() {
    const mobile = isMobile();
    document.body.classList.toggle('is-mobile', mobile);
    document.documentElement.style.setProperty('--animation-duration', mobile ? '0.1s' : '0.25s');
}

// Service Worker registration for offline support
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Analytics and usage tracking (privacy-friendly)
function trackUsage(action, category = 'General') {
    const usage = JSON.parse(localStorage.getItem('dsaHubUsage') || '{}');
    const today = new Date().toISOString().split('T')[0];

    if (!usage[today]) {
        usage[today] = {};
    }

    if (!usage[today][category]) {
        usage[today][category] = {};
    }

    usage[today][category][action] = (usage[today][category][action] || 0) + 1;

    localStorage.setItem('dsaHubUsage', JSON.stringify(usage));
}

// Module recommendation system
function getRecommendedModules() {
    const completed = Array.from(appState.completedModules);
    const incomplete = modules.filter(m => !completed.includes(m.id));

    if (completed.length === 0) {
        // Recommend beginner modules
        return incomplete.filter(m => m.difficulty === 'beginner').slice(0, 3);
    }

    // Simple recommendation based on completed modules
    const completedDifficulties = completed.map(id =>
        modules.find(m => m.id === id)?.difficulty
    ).filter(Boolean);

    const mostCommonDifficulty = completedDifficulties
        .reduce((acc, diff) => {
            acc[diff] = (acc[diff] || 0) + 1;
            return acc;
        }, {});

    const recommended = Object.keys(mostCommonDifficulty)
        .sort((a, b) => mostCommonDifficulty[b] - mostCommonDifficulty[a])[0];

    return incomplete.filter(m => m.difficulty === recommended).slice(0, 3);
}

// Study session timer
let studyTimer = {
    startTime: null,
    totalTime: studyMetrics.totalTimeMs || 0,
    isActive: false
};

function startStudySession(options = {}) {
    if (studyTimer.isActive) return;
    const { notify = false } = options;
    studyTimer.startTime = Date.now();
    studyTimer.isActive = true;
    if (studyTrackerInterval) {
        clearInterval(studyTrackerInterval);
    }
    studyTrackerInterval = setInterval(updateStudyTrackerUI, 1000);
    updateStudyTrackerUI();
    if (notify) {
        showToast('Focus session started. Stay sharp!', 'info');
    }
    trackUsage('study_session_started', 'Learning');
}

function endStudySession(options = {}) {
    if (!studyTimer.isActive || !studyTimer.startTime) return;
    const { notify = true } = options;
    const sessionTime = Date.now() - studyTimer.startTime;
    studyTimer.totalTime += sessionTime;
    studyTimer.startTime = null;
    studyTimer.isActive = false;
    ensureTodayMetrics();
    studyMetrics.totalTimeMs = studyTimer.totalTime;
    studyMetrics.todayMs += sessionTime;
    saveStudyMetrics();
    updateStudyHabit(sessionTime);
    if (studyTrackerInterval) {
        clearInterval(studyTrackerInterval);
        studyTrackerInterval = null;
    }
    updateStudyTrackerUI();

    const minutes = Math.max(1, Math.round(sessionTime / 60000));
    if (notify) {
        showToast(`Study session logged: ${minutes} min`, 'success');
    }
    trackUsage('study_session_completed', 'Learning');
}

// Enhanced quiz functionality
function getQuizStats() {
    const quizData = JSON.parse(localStorage.getItem('dsaHubQuizStats') || '{}');
    return quizData;
}

function saveQuizResult(moduleId, score, totalQuestions) {
    const stats = getQuizStats();
    const today = new Date().toISOString().split('T')[0];

    if (!stats[moduleId]) {
        stats[moduleId] = [];
    }

    stats[moduleId].push({
        date: today,
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100)
    });

    localStorage.setItem('dsaHubQuizStats', JSON.stringify(stats));
    trackUsage('quiz_completed', 'Assessment');
}

// Learning path suggestions
function generateLearningPath() {
    const completed = Array.from(appState.completedModules);
    const recommended = getRecommendedModules();

    const path = {
        next: recommended[0],
        upcoming: recommended.slice(1),
        completed: completed.length,
        total: modules.length,
        progress: Math.round((completed.length / modules.length) * 100)
    };

    return path;
}

// Add to the window object for global access
window.javaDSAHub = {
    exportProgress,
    importProgress,
    printStudyGuide,
    generateLearningPath,
    getModuleStats,
    getQuizStats,
    toggleTheme,
    trackUsage
};

// Error boundary
window.addEventListener('error', (event) => {
    handleError(event.error, 'Global');
});

window.addEventListener('unhandledrejection', (event) => {
    handleError(event.reason, 'Promise');
});

// Visibility change handler for study sessions
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        endStudySession();
    } else {
        startStudySession();
    }
});

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    optimizeForMobile();
    registerServiceWorker();
    startStudySession();
});

// Add window resize handler for responsive adjustments
window.addEventListener('resize', () => {
    optimizeForMobile();
    updateHeaderShrink(); // Recalculate header shrinking on resize
});

console.log('Java DSA Learning Hub - All systems loaded successfully! 🚀');

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
    categoryFilter: 'all',
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
    reduceMotion: false,
    highContrast: false,
    studyPlan: null,
    accountProfile: null,
    currentModulePage: 1,
    promptTimers: new Map(),
    playground: {
        code: '',
        sample: DEFAULT_PLAYGROUND_SAMPLE,
        output: '// Output will appear here',
        language: 'java',
        isRunning: false
    }
};

const interactiveQuizState = {
    moduleId: null,
    questions: [],
    current: 0,
    answers: []
};

// =================================
// CONSTANTS
// =================================
const CONSTANTS = {
    CODE_PREVIEW_LINES: 15,
    TRUNCATE_INDICATOR: '\n\n// ... (click Expand to see full code)',
    TOTAL_MODULES: 34
};

const QUIZ_CONFIG = {
    poolSize: 15,
    questionsPerAttempt: 4
};

const MODULES_PER_PAGE = 5;

const DEFAULT_DISTRACTOR_TEXTS = [
    'Review the glossary entry for clarity.',
    'Revisit the flashcards for this module.',
    'Trace through the annotated code example.',
    'Discuss this concept with a peer.'
];

const STORAGE_KEYS = {
    STUDY_METRICS: 'javaDSAStudyMetrics',
    STUDY_HABIT: 'javaDSAStudyHabit',
    NOTES: 'javaDSANotes'
};

const INLINE_GLOSSARY_LIMIT = 60;
const TIMED_PROMPT_SECONDS = 20 * 60;

const RESET_FLAGS = {
    STUDY_TIMES: 'javaDSAResetTimesV2'
};

const SUPPORT_EMAIL = 'eddyarriaga06@gmail.com';
const CODE_RUNNER_ENDPOINT = 'https://emkc.org/api/v2/piston/execute'; // EMKC Piston open-source runner
const CODE_RUNNER_CONFIG = {
    java: { language: 'java', version: '15.0.2', filename: 'Main.java' },
    python: { language: 'python', version: '3.10.0', filename: 'main.py' },
    cpp: { language: 'cpp', version: '10.2.0', filename: 'Main.cpp' },
    javascript: { language: 'javascript', version: '18.15.0', filename: 'main.js' }
};

const ACCOUNT_API_ENDPOINT = '';

const SUPPORTED_LANGUAGES = {
    java: { name: 'Java', icon: '☕' },
    cpp: { name: 'C++', icon: '⚡' },
    python: { name: 'Python', icon: '🐍' },
    javascript: { name: 'JavaScript', icon: '🟨' },
    assembly: { name: 'Assembly (x86-32)', icon: '⚙️' }
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
const INTERVIEW_PAGE_SIZE = 2;
let interviewPage = 1;
const DONATION_URL = 'https://www.paypal.com/donate?business=your.email@paypal.com&amount=1.00&currency_code=USD&item_name=Java%20DSA%20Notes%20Support';
const MODULE_CATEGORIES = ['all', 'dsa', 'discrete', 'systems'];

const interviewExamples = [
    {
        id: 'two-sum',
        title: 'Two Sum (Hash Map)',
        language: 'Java',
        difficulty: 'Easy',
        code: `class TwoSum {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{-1, -1};
    }
}`
    },
    {
        id: 'valid-parens',
        title: 'Valid Parentheses (Stack)',
        language: 'Java',
        difficulty: 'Easy',
        code: `class Solution {
    public boolean isValid(String s) {
        Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (pairs.containsKey(c)) {
                if (stack.isEmpty() || stack.pop() != pairs.get(c)) return false;
            } else {
                stack.push(c);
            }
        }
        return stack.isEmpty();
    }
}`
    },
    {
        id: 'merge-intervals',
        title: 'Merge Intervals',
        language: 'Java',
        difficulty: 'Medium',
        code: `class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
        List<int[]> merged = new ArrayList<>();
        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.get(merged.size() - 1)[1] =
                    Math.max(merged.get(merged.size() - 1)[1], interval[1]);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`
    },
    {
        id: 'bfs-level-order',
        title: 'Binary Tree Level Order (BFS)',
        language: 'Java',
        difficulty: 'Medium',
        code: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> levels = new ArrayList<>();
        if (root == null) return levels;
        Queue<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            levels.add(level);
        }
        return levels;
    }
}`
    },
    {
        id: 'lrucache',
        title: 'LRU Cache',
        language: 'Java',
        difficulty: 'Medium',
        code: `class LRUCache {
    private final int cap;
    private final Map<Integer, Node> map = new HashMap<>();
    private final Node head = new Node(0, 0);
    private final Node tail = new Node(0, 0);

    static class Node {
        int k, v; Node prev, next;
        Node(int k, int v) { this.k = k; this.v = v; }
    }

    public LRUCache(int capacity) {
        this.cap = capacity;
        head.next = tail; tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        moveToFront(node);
        return node.v;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.v = value;
            moveToFront(node);
        } else {
            if (map.size() == cap) {
                Node lru = tail.prev;
                remove(lru);
                map.remove(lru.k);
            }
            Node fresh = new Node(key, value);
            insertAfter(head, fresh);
            map.put(key, fresh);
        }
    }

    private void moveToFront(Node node) {
        remove(node);
        insertAfter(head, node);
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insertAfter(Node prev, Node node) {
        node.next = prev.next;
        node.prev = prev;
        prev.next.prev = node;
        prev.next = node;
    }
}`
    },
    {
        id: 'meeting-rooms',
        title: 'Meeting Rooms (Greedy)',
        language: 'Python',
        difficulty: 'Medium',
        code: `import heapq

def min_meeting_rooms(intervals):
    intervals.sort(key=lambda x: x[0])
    h = []
    for s, e in intervals:
        if h and h[0] <= s:
            heapq.heapreplace(h, e)
        else:
            heapq.heappush(h, e)
    return len(h)

print(min_meeting_rooms([[0,30],[5,10],[15,20]]))  # 2`
    }
];

const notesLibrary = [
    {
        id: 'arrays-basics',
        title: 'Arrays & Strings Fundamentals',
        category: 'Foundations',
        summary: 'Cheat sheet of array operations, common pitfalls, and string helpers.',
        pages: 6,
        url: '#'
    },
    {
        id: 'stacks-queues',
        title: 'Stacks vs Queues',
        category: 'Foundations',
        summary: 'Use-cases, diagrams, and practice prompts with complexity tables.',
        pages: 5,
        url: '#'
    },
    {
        id: 'trees-overview',
        title: 'Binary Trees & Traversals',
        category: 'Trees',
        summary: 'DFS/BFS orders, recursion templates, and interview-ready patterns.',
        pages: 7,
        url: '#'
    },
    {
        id: 'hashing',
        title: 'Hash Maps & Sets',
        category: 'Hashing',
        summary: 'Collision strategies, load factor intuition, and sample walkthroughs.',
        pages: 5,
        url: '#'
    },
    {
        id: 'graphs',
        title: 'Graphs & Traversals',
        category: 'Graphs',
        summary: 'Adjacency list vs matrix, BFS/DFS templates, and cycle detection notes.',
        pages: 8,
        url: '#'
    }
];

const notesCategories = ['All', ...Array.from(new Set(notesLibrary.map(n => n.category)))];
let activeNotesCategory = 'All';

function normalizeCategoryFilter(value) {
    return MODULE_CATEGORIES.includes(value) ? value : 'all';
}

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
        codeByLanguage: {
            java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java explorer!");
    }
}`,
            python: `def main():
    print("Hello, Python explorer!")


if __name__ == "__main__":
    main()
`,
            cpp: `#include <iostream>

int main() {
    std::cout << "Hello, C++ explorer!" << std::endl;
    return 0;
}
`,
            javascript: `function main() {
    console.log("Hello, JavaScript explorer!");
}

main();
`
        }
    },
    'arrays-primer': {
        label: 'Arrays Primer',
        codeByLanguage: {
            java: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {3, 1, 4, 1, 5, 9};
        Arrays.sort(numbers);
        int largest = numbers[numbers.length - 1];
        System.out.println("Sorted: " + Arrays.toString(numbers));
        System.out.println("Largest value: " + largest);
    }
}`,
            python: `def arrays_primer():
    numbers = [3, 1, 4, 1, 5, 9]
    numbers.sort()
    largest = numbers[-1]
    print(f"Sorted: {numbers}")
    print(f"Largest value: {largest}")


if __name__ == "__main__":
    arrays_primer()
`,
            cpp: `#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> numbers = {3, 1, 4, 1, 5, 9};
    std::sort(numbers.begin(), numbers.end());
    int largest = numbers.back();

    std::cout << "Sorted: ";
    for (size_t i = 0; i < numbers.size(); ++i) {
        std::cout << numbers[i] << (i + 1 == numbers.size() ? "" : ", ");
    }
    std::cout << std::endl;
    std::cout << "Largest value: " << largest << std::endl;
    return 0;
}
`,
            javascript: `function arraysPrimer() {
    const numbers = [3, 1, 4, 1, 5, 9];
    numbers.sort((a, b) => a - b);
    const largest = numbers[numbers.length - 1];
    console.log("Sorted:", numbers.join(", "));
    console.log("Largest value:", largest);
}

arraysPrimer();
`
        }
    },
    'loops-and-conditions': {
        label: 'Loops & Conditions',
        codeByLanguage: {
            java: `public class Main {
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
}`,
            python: `def loops_and_conditions():
    focus_minutes = 0
    for day in range(1, 8):
        focus_minutes += 25
        if day % 2 == 0:
            print(f"Day {day}: recovery + review")
        else:
            print(f"Day {day}: deep practice session")
    print(f"Weekly focus minutes: {focus_minutes}")


if __name__ == "__main__":
    loops_and_conditions()
`,
            cpp: `#include <iostream>
#include <string>

int main() {
    int focusMinutes = 0;
    for (int day = 1; day <= 7; day++) {
        focusMinutes += 25;
        if (day % 2 == 0) {
            std::cout << "Day " << day << ": recovery + review" << std::endl;
        } else {
            std::cout << "Day " << day << ": deep practice session" << std::endl;
        }
    }
    std::cout << "Weekly focus minutes: " << focusMinutes << std::endl;
    return 0;
}
`,
            javascript: `function loopsAndConditions() {
    let focusMinutes = 0;
    for (let day = 1; day <= 7; day++) {
        focusMinutes += 25;
        if (day % 2 === 0) {
            console.log(\`Day \${day}: recovery + review\`);
        } else {
            console.log(\`Day \${day}: deep practice session\`);
        }
    }
    console.log("Weekly focus minutes:", focusMinutes);
}

loopsAndConditions();
`
        }
    },
    'class-basics': {
        label: 'Class Basics',
        codeByLanguage: {
            java: `public class Main {
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
}`,
            python: `class ModuleProgress:
    def __init__(self, title):
        self.title = title
        self.completed_lessons = 0

    def mark_lesson(self):
        self.completed_lessons += 1
        print(f"Completed lesson {self.completed_lessons} in {self.title}")


if __name__ == "__main__":
    arrays = ModuleProgress("Arrays & Strings")
    arrays.mark_lesson()
    arrays.mark_lesson()
`,
            cpp: `#include <iostream>
#include <string>

class ModuleProgress {
public:
    explicit ModuleProgress(const std::string& title) : title(title), completedLessons(0) {}

    void markLesson() {
        completedLessons++;
        std::cout << "Completed lesson " << completedLessons << " in " << title << std::endl;
    }

private:
    std::string title;
    int completedLessons;
};

int main() {
    ModuleProgress arrays("Arrays & Strings");
    arrays.markLesson();
    arrays.markLesson();
    return 0;
}
`,
            javascript: `class ModuleProgress {
    constructor(title) {
        this.title = title;
        this.completedLessons = 0;
    }

    markLesson() {
        this.completedLessons += 1;
        console.log(\`Completed lesson \${this.completedLessons} in \${this.title}\`);
    }
}

const arrays = new ModuleProgress("Arrays & Strings");
arrays.markLesson();
arrays.markLesson();
`
        }
    }
};

function buildPlaygroundSnippetLibrary(modulesList = []) {
    const snippets = {};
    modulesList.forEach(module => {
        const snippetId = `module-${module.id}`;
        const codeByLanguage = {};
        const languages = Object.keys(SUPPORTED_LANGUAGES);

        languages.forEach(language => {
            const sample = (module.codeExamples && module.codeExamples[language]) || module.codeExample || '';
            if (!sample || typeof sample !== 'string') return;
            const content = language === 'java'
                ? ensureRunnableJava(sample, module.title)
                : sample;
            codeByLanguage[language] = content.trim();
        });

        if (!Object.keys(codeByLanguage).length) return;

        snippets[snippetId] = {
            label: `${module.title}`,
            codeByLanguage
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
    },
    {
        id: 51,
        question: "What does it mean for a sort to be stable?",
        answer: "Stable sorts keep equal elements in their original relative order (important for multi-key sorts)."
    },
    {
        id: 52,
        question: "When would you prefer BFS over DFS?",
        answer: "Use BFS for shortest path in unweighted graphs and level-order problems; DFS for depth-first exploration and backtracking."
    },
    {
        id: 53,
        question: "What is a monotonic stack used for?",
        answer: "Keeps elements in increasing/decreasing order to answer next greater/smaller queries in linear time."
    },
    {
        id: 54,
        question: "What does in-place mean?",
        answer: "Algorithm transforms data using O(1) extra space beyond the input (e.g., reversing an array with swaps)."
    },
    {
        id: 55,
        question: "How does a deque support sliding window minimum/maximum?",
        answer: "Store candidates in a monotonic deque; pop back while worse, pop front when out of window."
    },
    {
        id: 56,
        question: "What is a Binary Indexed Tree (Fenwick Tree) good for?",
        answer: "Supports prefix sums and point updates in O(log n) with less code than a segment tree."
    },
    {
        id: 57,
        question: "Why do we add a sentinel/dummy node in linked lists?",
        answer: "It removes head-edge cases so insertions/merges treat every node uniformly."
    },
    {
        id: 58,
        question: "When do you reach for a heap instead of a balanced BST?",
        answer: "When you mostly need fast min/max extraction (priority queues) and rarely need ordered iteration."
    },
    {
        id: 59,
        question: "What is path compression in union-find?",
        answer: "After finds, reattach nodes directly to the root to flatten the tree and speed future finds."
    },
    {
        id: 60,
        question: "How does prefix sum help with range queries?",
        answer: "Precompute cumulative sums so any range [l, r] is O(1): prefix[r] - prefix[l-1]."
    },
    {
        id: 61,
        question: "What is the purpose of the LPS (prefix) table in KMP?",
        answer: "It tells where to resume in the pattern after a mismatch, avoiding rechecking characters."
    },
    {
        id: 62,
        question: "What makes quicksort fast on average?",
        answer: "Good pivots split the array, yielding ~O(n log n); in-place partitioning keeps space O(1)."
    },
    {
        id: 63,
        question: "What does tail recursion optimization do?",
        answer: "Reuses the current stack frame for the final recursive call, reducing stack usage if supported."
    },
    {
        id: 64,
        question: "Why is immutability helpful in multithreading?",
        answer: "Immutable objects are safe to share without locks because their state cannot change."
    },
    {
        id: 65,
        question: "How do you solve Two Sum in linear time?",
        answer: "Scan once, store seen values in a hash map, and check if target - current exists."
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
    },
    {
        term: "Stable Sort",
        definition: "A sorting algorithm that preserves the relative order of equal elements—critical when sorting by multiple keys.",
        category: "Algorithms"
    },
    {
        term: "Monotonic Stack",
        definition: "Stack kept in increasing or decreasing order to answer next greater/smaller queries in O(n).",
        category: "Techniques"
    },
    {
        term: "Deque",
        definition: "Double-ended queue supporting push/pop at both ends; used for sliding window min/max.",
        category: "Data Structures"
    },
    {
        term: "Binary Indexed Tree",
        definition: "Fenwick Tree supporting prefix sums and point updates in O(log n) with low memory.",
        category: "Data Structures"
    },
    {
        term: "In-Place Algorithm",
        definition: "Algorithm that transforms data using O(1) or constant extra space beyond the input.",
        category: "Techniques"
    },
    {
        term: "Immutability",
        definition: "Property where an object's state cannot change after creation, simplifying reasoning and thread safety.",
        category: "Concepts"
    },
    {
        term: "Sentinel Node",
        definition: "Dummy node added to simplify edge cases at list head/tail or tree boundaries.",
        category: "Data Structures"
    },
    {
        term: "NP-Complete",
        definition: "Class of problems both in NP and NP-hard; if one has a polynomial-time solution, all do.",
        category: "Complexity"
    },
    {
        term: "P vs NP",
        definition: "Open question asking whether every efficiently verifiable problem (NP) is also efficiently solvable (P).",
        category: "Complexity"
    },
    {
        term: "Greedy Choice Property",
        definition: "Condition where locally optimal choices lead to a global optimum, enabling greedy algorithms.",
        category: "Concepts"
    },
    {
        term: "Overlapping Subproblems",
        definition: "DP trait where the same subproblems recur, justifying memoization/tabulation.",
        category: "Techniques"
    },
    // Arrays & Strings module (20 terms)
    { term: "Two-Pointer Swap", definition: "Use a left/right index to swap mirrored characters or values in-place.", category: "Arrays & Strings (Module)" },
    { term: "Sliding Window Min/Max", definition: "Maintain window bounds while updating a running best (count, sum, freq).", category: "Arrays & Strings (Module)" },
    { term: "Prefix Check", definition: "Verify a string starts with a pattern before further processing.", category: "Arrays & Strings (Module)" },
    { term: "Suffix Check", definition: "Confirm trailing characters match a pattern (file extensions, endings).", category: "Arrays & Strings (Module)" },
    { term: "Char Frequency Map", definition: "Hash map counting occurrences of characters for anagram or uniqueness checks.", category: "Arrays & Strings (Module)" },
    { term: "Distinct Window", definition: "Sliding window ensuring all characters are unique before expansion.", category: "Arrays & Strings (Module)" },
    { term: "Palindrome Normalization", definition: "Lowercase and strip non-alphanumerics prior to palindrome testing.", category: "Arrays & Strings (Module)" },
    { term: "In-Place Reverse", definition: "Swap ends of an array/string without allocating extra memory.", category: "Arrays & Strings (Module)" },
    { term: "Merge Two Sorted Arrays", definition: "Walk two sorted arrays to build a combined sorted result in linear time.", category: "Arrays & Strings (Module)" },
    { term: "Two-Sum with Hashing", definition: "Store complements in a map to find pairs summing to a target in O(n).", category: "Arrays & Strings (Module)" },
    { term: "Kadane’s Algorithm", definition: "Track running max subarray sum with O(1) extra space.", category: "Arrays & Strings (Module)" },
    { term: "Dutch Flag Partition", definition: "Three-way partitioning to group values (e.g., 0/1/2) in one pass.", category: "Arrays & Strings (Module)" },
    { term: "Substring Search", definition: "Scan for a pattern in text; naive, KMP, or sliding window approaches.", category: "Arrays & Strings (Module)" },
    { term: "Rotation Check", definition: "Determine if one string is a rotation of another using concatenation.", category: "Arrays & Strings (Module)" },
    { term: "Prefix Sum Array", definition: "Cumulative sums enabling O(1) range queries after O(n) setup.", category: "Arrays & Strings (Module)" },
    { term: "Balanced Brackets (String)", definition: "Verify bracket order using a stack and mapping of open→close.", category: "Arrays & Strings (Module)" },
    { term: "Array Deduplication", definition: "Remove duplicates by overwriting in-place with two pointers.", category: "Arrays & Strings (Module)" },
    { term: "Stable Sort by Key", definition: "Sort by secondary key while keeping equal primary-order intact.", category: "Arrays & Strings (Module)" },
    { term: "Character Classification", definition: "Check char type (alpha, digit, whitespace) before processing.", category: "Arrays & Strings (Module)" },
    { term: "Run-Length Encoding", definition: "Compress repeated characters as count+char while scanning once.", category: "Arrays & Strings (Module)" },
    // Stacks & Queues module (20 terms)
    { term: "Push/Pop Semantics", definition: "Stack operations adding/removing from the same end (LIFO).", category: "Stacks & Queues (Module)" },
    { term: "Peek Safety", definition: "Check emptiness before peeking to avoid exceptions.", category: "Stacks & Queues (Module)" },
    { term: "Queue Enqueue/Dequeue", definition: "FIFO operations add to back, remove from front.", category: "Stacks & Queues (Module)" },
    { term: "Deque for Sliding Window", definition: "Use a monotonic deque to track best candidates per window.", category: "Stacks & Queues (Module)" },
    { term: "Min Stack", definition: "Augment stack to retrieve current minimum in O(1).", category: "Stacks & Queues (Module)" },
    { term: "Undo Stack", definition: "Store prior states to roll back changes (text editors, commands).", category: "Stacks & Queues (Module)" },
    { term: "BFS Queue", definition: "Breadth-first traversal uses a queue to visit neighbors level by level.", category: "Stacks & Queues (Module)" },
    { term: "Prefix Evaluation", definition: "Evaluate prefix expressions using a stack (operators before operands).", category: "Stacks & Queues (Module)" },
    { term: "Infix to Postfix", definition: "Convert expressions with a stack to manage operator precedence.", category: "Stacks & Queues (Module)" },
    { term: "Parentheses Validation", definition: "Use a stack of opens to ensure each close matches type/order.", category: "Stacks & Queues (Module)" },
    { term: "Circular Queue", definition: "Fixed-size queue that wraps indices to reuse freed slots.", category: "Stacks & Queues (Module)" },
    { term: "Queue Backpressure", definition: "Slow producers when consumer lags to avoid overflow.", category: "Stacks & Queues (Module)" },
    { term: "DFS with Stack", definition: "Iterative DFS using an explicit stack instead of recursion.", category: "Stacks & Queues (Module)" },
    { term: "Call Stack Frames", definition: "Each function call pushes a frame; recursion deepens the stack.", category: "Stacks & Queues (Module)" },
    { term: "Top of Stack (TOS)", definition: "Pointer/index to the next push/pop position.", category: "Stacks & Queues (Module)" },
    { term: "Queue Throughput", definition: "Rate of items processed per time unit; impacted by batching.", category: "Stacks & Queues (Module)" },
    { term: "Priority Queue via Heap", definition: "Back a priority queue with a heap for O(log n) updates.", category: "Stacks & Queues (Module)" },
    { term: "Monotonic Increasing Stack", definition: "Stack that keeps elements in non-decreasing order to find next greater.", category: "Stacks & Queues (Module)" },
    { term: "Queue Drain", definition: "Process all items until empty; common in event loops.", category: "Stacks & Queues (Module)" },
    { term: "Stack Overflow (Recursion)", definition: "Exceeding call stack depth causes a runtime stack overflow error.", category: "Stacks & Queues (Module)" },
    // Searching Algorithms module (20 terms)
    { term: "Binary Search Invariant", definition: "Maintain sorted half where target can still exist; shrink bounds accordingly.", category: "Searching Algorithms (Module)" },
    { term: "Mid Overflow Guard", definition: "Compute mid as left + (right-left)/2 to avoid integer overflow.", category: "Searching Algorithms (Module)" },
    { term: "Lower Bound", definition: "First index where value is not less than target (>=).", category: "Searching Algorithms (Module)" },
    { term: "Upper Bound", definition: "First index where value is greater than target (>).", category: "Searching Algorithms (Module)" },
    { term: "Infinite Array Search", definition: "Expand bounds exponentially, then binary search within.", category: "Searching Algorithms (Module)" },
    { term: "Rotated Array Search", definition: "Binary search while detecting which half is sorted each step.", category: "Searching Algorithms (Module)" },
    { term: "2D Matrix Search", definition: "Treat rows/cols as sorted lists; walk from corner or flatten index math.", category: "Searching Algorithms (Module)" },
    { term: "Interpolation Search", definition: "Estimate position by value distribution; good for uniformly distributed data.", category: "Searching Algorithms (Module)" },
    { term: "Ternary Search", definition: "Split search space into three parts for unimodal functions.", category: "Searching Algorithms (Module)" },
    { term: "Exponential Search", definition: "Double range size until surpassing target, then binary search range.", category: "Searching Algorithms (Module)" },
    { term: "Jump Search", definition: "Skip ahead fixed steps, then linear scan within the block.", category: "Searching Algorithms (Module)" },
    { term: "Binary Search on Answer", definition: "Search over solution space (e.g., capacity, time) not just array indices.", category: "Searching Algorithms (Module)" },
    { term: "Monotonic Predicate", definition: "Condition that flips once; enables binary search over answers.", category: "Searching Algorithms (Module)" },
    { term: "Peak Element Search", definition: "Find local maximum by comparing mid with neighbors; narrow to uphill side.", category: "Searching Algorithms (Module)" },
    { term: "Bitonic Array Search", definition: "Find peak in a bitonic array then binary search both halves.", category: "Searching Algorithms (Module)" },
    { term: "Nearest Value Search", definition: "Return closest element; track best candidate during binary search.", category: "Searching Algorithms (Module)" },
    { term: "Duplicate Handling", definition: "Adjust bounds carefully when equals appear to avoid infinite loops.", category: "Searching Algorithms (Module)" },
    { term: "Search Insert Position", definition: "Return index where target would be inserted to keep order.", category: "Searching Algorithms (Module)" },
    { term: "Frequency Binary Search", definition: "Count occurrences by finding first and last positions via binary search.", category: "Searching Algorithms (Module)" },
    { term: "Binary Search Templates", definition: "Predefined loop patterns to avoid off-by-one errors.", category: "Searching Algorithms (Module)" }
];

const glossaryCategories = [
    'all',
    ...Array.from(new Set(glossaryTerms.map(term => term.category))).sort()
];


// Quiz Data
let quizData = {};


// Modules Data (Complete with ALL LANGUAGES)
const modules = [
    {
        id: 'arrays-strings',
        title: 'Arrays and Strings',
        description: 'We slow down every array and string helper so you see why guards exist, how loops scan data, and how pointer swaps work. Each method is annotated with plain-English comments plus a bullet-by-bullet breakdown under the code block, perfect for a first pass through Java collections.',
        difficulty: 'beginner',
        topics: ['Array Traversal', 'String Methods', 'Two Pointers', 'Sliding Window', 'Array Sorting'],
        interviewPrompts: [
            {
                title: 'Two Sum Variants',
                prompt: 'Given an array of integers and a target, return indices of two numbers adding to target. Follow up: return all unique pairs. Aim for O(n) with extra space.',
                durationMinutes: 20
            },
            {
                title: 'Longest Unique Substring',
                prompt: 'Find the length of the longest substring without repeating characters. Explain your sliding window and how you track last-seen indices.',
                durationMinutes: 20
            }
        ],
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
        interviewPrompts: [
            {
                title: 'Reverse in K-Groups',
                prompt: 'Given the head of a linked list, reverse nodes in groups of k and return the modified list. Keep O(1) extra space and describe edge cases.',
                durationMinutes: 25
            },
            {
                title: 'Cycle Start Detection',
                prompt: 'Detect if a cycle exists and return the node where the cycle begins. Use O(1) space and explain the math behind the meeting point.',
                durationMinutes: 20
            }
        ],
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
class InvalidAgeException extends Exception {
    InvalidAgeException(String message) {
        super(message);
    }
}

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

    public static void main(String[] args) {
        divide(10, 2);  // Works
        divide(5, 0);   // Triggers ArithmeticException

        try {
            validateAge(-5); // Triggers our custom checked exception
        } catch (InvalidAgeException e) {
            System.out.println("Caught custom exception: " + e.getMessage());
        }
    }
}
`,
        explanation: `You will categorize checked vs unchecked exceptions, design custom hierarchies, and use try-with-resources for safe cleanup. Realistic scenarios cover logging, wrapping exceptions to add context, and establishing global handlers to keep apps resilient.`,
        codeBreakdown: [
            { label: 'divide', detail: 'Wraps risky arithmetic in try/catch and shows how finally executes regardless of success.' },
            { label: 'validateAge', detail: 'Illustrates how to throw a custom checked exception with a helpful message.' },
            { label: 'InvalidAgeException', detail: 'Custom checked exception extends Exception and carries a human-friendly message.' },
            { label: 'main', detail: 'Runs happy-path division, a divide-by-zero failure, and a negative-age check to exercise both catch blocks.' }
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
    },
    {
        id: 'assembly-basics',
        title: 'Assembly Language Basics',
        category: 'systems',
        description: 'Learn how high-level constructs map to registers, the stack, and instructions. We show loads/stores, loops, and function calls, then line up the same logic in Java so you can cross-compare.',
        difficulty: 'intermediate',
        topics: ['Registers', 'Stack Frames', 'Memory Addressing', 'Loops', 'Syscalls'],
        codeExamples: {
            assembly: `; Assembly Basics (x86-32) — detailed, line-by-line comments
; cdecl calling convention, 32-bit registers, little-endian
; int sum_array(int* arr, int len)

section .text
global sum_array

sum_array:
    push ebp                ; save caller frame pointer
    mov  ebp, esp           ; establish our stack frame
    push ebx                ; preserve callee-saved register
    mov  ebx, [ebp+8]       ; ebx = arr pointer   (arg0)
    mov  ecx, [ebp+12]      ; ecx = len           (arg1)
    xor  eax, eax           ; eax = 0 (running sum)
.loop:
    cmp  ecx, 0             ; are we done? if len == 0, exit
    je   .done
    mov  edx, [ebx + 4*(ecx-1)] ; edx = arr[len-1] using scaled index
    add  eax, edx           ; sum += arr[i]
    dec  ecx                ; i--
    jmp  .loop
.done:
    pop  ebx                ; restore callee-saved
    mov  esp, ebp           ; tear down frame
    pop  ebp
    ret                     ; return sum in eax

; int add_then_double(int a, int b)
global add_then_double
add_then_double:
    push ebp
    mov  ebp, esp
    mov  eax, [ebp+8]       ; eax = a
    add  eax, [ebp+12]      ; eax += b
    shl  eax, 1             ; eax *= 2 (shift left by 1)
    mov  esp, ebp
    pop  ebp
    ret
`,
            'assembly-pseudocode': `PROCEDURE sum_array(arr, len):
  save frame + callee registers
  sum <- 0
  FOR i from len-1 down to 0:
    sum <- sum + arr[i]
  restore registers; return sum in eax

PROCEDURE add_then_double(a, b):
  result <- a + b
  result <- result * 2
  return result`
        },
        explanation: 'We annotate each Java line with its assembly counterpart: registers stand in for locals, loops map to compare/jump pairs, and calls mirror stack-frame setup/teardown. You will see how addressing works, why alignment matters, and how to reason about side effects.',
        codeBreakdown: [
            { label: 'Registers', detail: 'Map Java locals to general purpose registers (rax, rbx, rcx, rdx) and track their lifetimes.' },
            { label: 'Stack Frame', detail: 'Prologue/epilogue pairs protect caller data; locals live at negative rbp offsets.' },
            { label: 'Branches', detail: 'Loops and ifs compile into cmp/test plus conditional jumps—trace flags to understand flow.' }
        ],
        resources: [
            { text: 'x86-64 Basics (CS61)', url: 'https://cs61c.org' },
            { text: 'Godbolt Compiler Explorer', url: 'https://godbolt.org/' }
        ]
    },
    {
        id: 'discrete-math-1',
        title: 'Discrete Mathematics I: Logic & Sets',
        category: 'discrete',
        description: 'Master propositions, truth tables, set operations, and proof patterns with theory-first explanations. We walk through law simplifications, contrapositive/contradiction reasoning, and Venn-style set identities before you ever touch code. Examples: DeMorgan transformations, distributive law rewrites, and direct vs. contrapositive proofs of conditional statements.',
        difficulty: 'beginner',
        topics: ['Propositions', 'Truth Tables', 'Set Operations', 'Proof Sketches', 'Logic Laws'],
        exampleHighlight: 'Examples include: full truth tables for p→q, p↔q, ¬(p∨q); DeMorgan and distributive rewrites; direct vs. contrapositive proof outlines.',
        examples: [
            'Truth table (p→q): (F,F)->T, (F,T)->T, (T,F)->F, (T,T)->T with column-by-column evaluation.',
            'Truth table (p↔q): (F,F)->T, (F,T)->F, (T,F)->F, (T,T)->T to show equivalence symmetry.',
            'DeMorgan: ¬(p ∨ q) ≡ (¬p ∧ ¬q) with stepwise law application.',
            'Proof skeleton: If n is even then n² is even — direct and contrapositive outlines side by side.'
        ],
        truthTables: [
            {
                title: 'Implication (p → q)',
                headers: ['p', 'q', 'p → q'],
                rows: [
                    ['F', 'F', 'T'],
                    ['F', 'T', 'T'],
                    ['T', 'F', 'F'],
                    ['T', 'T', 'T']
                ]
            },
            {
                title: 'Equivalence (p ↔ q)',
                headers: ['p', 'q', 'p ↔ q'],
                rows: [
                    ['F', 'F', 'T'],
                    ['F', 'T', 'F'],
                    ['T', 'F', 'F'],
                    ['T', 'T', 'T']
                ]
            },
            {
                title: 'DeMorgan: ¬(p ∨ q) ≡ (¬p ∧ ¬q)',
                headers: ['p', 'q', 'p ∨ q', '¬(p ∨ q)', '¬p', '¬q', '¬p ∧ ¬q'],
                rows: [
                    ['F', 'F', 'F', 'T', 'T', 'T', 'T'],
                    ['F', 'T', 'T', 'F', 'T', 'F', 'F'],
                    ['T', 'F', 'T', 'F', 'F', 'T', 'F'],
                    ['T', 'T', 'T', 'F', 'F', 'F', 'F']
                ]
            }
        ],
        codeExamples: {
            java: `// Theory-focused module: use the tables and notes above.
// Key formulas and patterns:
// - Truth tables for p→q, p↔q, ¬(p∨q) vs ¬p∧¬q
// - Law rewrites (DeMorgan, distributive)
// - Proof outlines (direct, contrapositive, contradiction)
// Treat this block as pinned notes, not executable code.`
        },
        skipAutoExamples: true,
        explanation: 'Heavy theory first: translate English claims to symbolic form, build full truth tables, and apply equivalence laws to simplify. We compare direct proof, contrapositive, and contradiction with short, annotated outlines. Code appears only as a calculator to verify steps (truth tables, set operations) after you reason them out on paper.',
        codeBreakdown: [
            { label: 'Truth tables', detail: 'Iterate over boolean pairs to see how implications and equivalences behave.' },
            { label: 'Set operations', detail: 'Use HashSet union/intersection to mirror Venn diagram reasoning.' },
            { label: 'Proof outline', detail: 'A reusable five-step scaffold for direct or contradiction proofs.' }
        ],
        resources: [
            { text: 'Discrete Math Notes – Logic', url: 'https://discrete.openmathbooks.org' }
        ]
    },
    {
        id: 'discrete-math-2',
        title: 'Discrete Mathematics II: Counting & Graphs',
        category: 'discrete',
        description: 'Dive deep into theory: addition/multiplication rules, permutations vs. combinations, pigeonhole principle, and recurrence solving (iteration and substitution). Graph basics cover paths, degrees, and connectivity before touching code. Examples: counting handshakes, arranging books, pigeonhole applications, and walking through BFS layers on a small graph.',
        difficulty: 'intermediate',
        topics: ['Counting', 'Recurrence Relations', 'Permutations', 'Combinations', 'Graph Basics'],
        exampleHighlight: 'Examples include: handshake lemma on K₄, arranging 5 distinct books on 3 shelves, pigeonhole proof for repeated initials, Fibonacci via recurrence unfolding, and BFS layer-by-layer on a 6-node graph.',
        examples: [
            'Counting: 10 students shaking hands → 10·9/2 = 45; verify with handshake lemma.',
            'Permutations vs. combinations: choose 3 of 5 books (C(5,3)=10) versus ordering 3 of 5 (P(5,3)=60).',
            'Pigeonhole: 13 people ⇒ at least 2 share a birth month; extend to initials example.',
            'Recurrence: T(n)=2T(n-1)+1 unfolded to closed form 2^n-1; Fibonacci partial table up to F(10).',
            'Graph example: BFS on adjacency list {1:[2,3],2:[4],3:[4,5],4:[6],5:[6]} produces layers [1],[2,3],[4,5],[6].'
        ],
        codeExamples: {
            java: `// Theory-focused module: counting + graph notes (no code).
// Use these as pinned references:
// - Counting rules, nCk vs permutations
// - Pigeonhole principle examples
// - Recurrence unfolding/substitution sketches
// - BFS layering for connectivity/distance intuition`
        },
        skipAutoExamples: true,
        explanation: 'Theory-heavy walkthroughs of counting arguments and recurrence patterns, then short code to verify your manual answers. We annotate why nCk formulas work, how Pascal’s triangle embodies recursion, and how BFS layers reflect graph distance. Use the snippets as calculators after you reason through the combinatorial logic.',
        codeBreakdown: [
            { label: 'nCk DP', detail: 'Binomial coefficients via Pascal\'s triangle show how combinations build from smaller subproblems.' },
            { label: 'Recurrences', detail: 'Memoized Fibonacci illustrates recurrence unfolding and overlapping subproblems.' },
            { label: 'Graphs', detail: 'Breadth-first search orders vertices layer by layer for shortest-path intuition on unweighted graphs.' }
        ],
        resources: [
            { text: 'Discrete Math – Counting', url: 'https://discrete.openmathbooks.org/dmoi3/sec_counting.html' },
            { text: 'Intro Graphs', url: 'https://cp-algorithms.com/graph/' }
        ]
    },
    {
        id: 'discrete-math-3',
        title: 'Discrete Mathematics III: Induction & Number Theory',
        category: 'discrete',
        description: 'A theory-only deep dive into induction (weak/strong), invariants, divisibility, primes, and modular arithmetic. We avoid code and focus on proof patterns and worked numeric examples.',
        difficulty: 'intermediate',
        topics: ['Induction', 'Strong Induction', 'Invariants', 'Modular Arithmetic', 'Divisibility'],
        exampleHighlight: 'Examples include: proving sum of first n integers by induction, tiling invariants, gcd/Euclid walkthrough, modular inverses for small primes, and parity proofs.',
        examples: [
            'Induction: 1+2+…+n = n(n+1)/2 with base n=1 and inductive step.',
            'Strong induction: any integer >1 factors into primes (outline the inductive hypothesis).',
            'Invariant: checkerboard domino tiling after removing opposite corners (parity/coloring argument).',
            'Euclid’s algorithm: gcd(252,105) step-by-step until remainder 0.',
            'Mod arithmetic: solve 3x ≡ 1 (mod 7) via checking residues; introduce inverses.',
            'Parity: prove n² and n have same parity and use it in simple Diophantine checks.'
        ],
        codeExamples: {
            java: `// Theory-focused module: no executable code.
// Use the examples list and truth tables to reason by hand.`
        },
        skipAutoExamples: true
    },
    {
        id: 'discrete-math-4',
        title: 'Discrete Mathematics IV: Relations & Graph Theory',
        category: 'discrete',
        description: 'Focus on definitions and properties: relations (reflexive, symmetric, transitive), equivalence classes, partial orders, and core graph properties. Heavy notes with layered examples, minimal code.',
        difficulty: 'intermediate',
        topics: ['Relations', 'Equivalence', 'Partial Orders', 'Graph Properties', 'Connectivity'],
        exampleHighlight: 'Examples include: classifying relations on small sets, drawing Hasse diagrams for divisibility, equivalence classes for congruence mod n, and computing degrees/paths on small graphs.',
        examples: [
            'Relation table on {1,2,3}: test reflexive/symmetric/transitive with adjacency grid.',
            'Equivalence: congruence mod 3 creates classes {[0],[1],[2]} with examples.',
            'Partial order: divisibility on {1,2,4,8,16} with Hasse diagram explanation.',
            'Graph: degrees and paths on a 5-node undirected graph; check for Euler path using odd-degree count.',
            'Connectivity: BFS layers on a small graph to decide connected components.'
        ],
        codeExamples: {
            java: `// Theory-focused module: no executable code.
// Work through the examples and diagrams provided in the module.`
        },
        skipAutoExamples: true
    },
    {
        id: 'assembly-stack-calls',
        title: 'Assembly: Stack Frames & Calls (x86-32)',
        category: 'systems',
        description: 'Pure assembly walkthrough of 32-bit stack frames, calling conventions, and parameter passing. No high-level languages—only assembly and structured pseudocode.',
        difficulty: 'intermediate',
        topics: ['Stack Frames', 'EBP/ESP', 'CALL/RET', 'Parameter Passing', 'Prologue/Epilogue'],
        exampleHighlight: 'Examples include: prologue/epilogue template, summing an array with ESI/EDI, and nested calls showing saved EBP/ret addresses.',
        examples: [
            'Prologue/Epilogue: push ebp; mov ebp, esp; sub esp, locals ... mov esp, ebp; pop ebp; ret.',
            'Sum loop: mov ecx, len; xor eax, eax; mov esi, arr; loop add eax, [esi+4*edx].',
            'Call chain: main -> foo -> bar with stack snapshots labeling return addresses and saved ebp.'
        ],
        codeExamples: {
            assembly: `; Sum array and show frame layout (x86-32)
section .text
global sum_array

sum_array:
    push ebp
    mov ebp, esp
    push ebx              ; save callee-saved
    mov ebx, [ebp+8]      ; arr pointer
    mov ecx, [ebp+12]     ; length
    xor eax, eax          ; sum = 0
.loop:
    cmp ecx, 0
    je .done
    add eax, [ebx + 4*(ecx-1)]
    dec ecx
    jmp .loop
.done:
    pop ebx
    mov esp, ebp
    pop ebp
    ret
`,
            'assembly-pseudocode': `PROCEDURE sum_array(arr, len):
  SAVE base pointer
  SAVE callee-saved registers
  sum <- 0
  FOR i from len-1 downto 0:
    sum <- sum + arr[i]
  RESTORE registers
  RETURN sum`
        },
        skipAutoExamples: true
    },
    {
        id: 'assembly-branching',
        title: 'Assembly: Branching & Loops (x86-32)',
        category: 'systems',
        description: 'Only assembly + pseudocode. Compare cmp/test with conditional jumps, build counted loops, while loops, and simple switch-like jump tables.',
        difficulty: 'beginner',
        topics: ['CMP/TEST', 'Jumps', 'Loops', 'Flags', 'Jump Tables'],
        exampleHighlight: 'Examples include: translating if/else, do-while, counting loop with ecx, and a small jump table for cases 0–2.',
        examples: [
            'If/else: cmp eax, ebx; jl less; ... ; jmp end; less: ...',
            'Do-while: label -> body -> evaluate condition -> jnz label.',
            'For loop: mov ecx, n; xor eax, eax; loop add eax, ecx; loop label decrements ecx automatically.',
            'Jump table: bounds check then indirect jump to cases for 0/1/2.'
        ],
        codeExamples: {
            assembly: `; Branching and loops (x86-32)
section .text
global abs_val

abs_val:
    push ebp
    mov ebp, esp
    mov eax, [ebp+8]
    cmp eax, 0
    jge .done
    neg eax
.done:
    mov esp, ebp
    pop ebp
    ret

; Simple switch via jump table (cases 0,1,2)
global tiny_switch
tiny_switch:
    push ebp
    mov ebp, esp
    mov eax, [ebp+8]   ; value
    cmp eax, 2
    ja .default
    jmp [jump_table + eax*4]
.case0:
    mov eax, 10
    jmp .end
.case1:
    mov eax, 20
    jmp .end
.case2:
    mov eax, 30
    jmp .end
.default:
    mov eax, -1
.end:
    mov esp, ebp
    pop ebp
    ret

jump_table:
    dd .case0, .case1, .case2
`,
            'assembly-pseudocode': `IF x < 0 THEN x <- -x
SWITCH x IN {0,1,2} RETURN 10/20/30 ELSE -1`
        },
        skipAutoExamples: true
    },
    {
        id: 'assembly-bitwise',
        title: 'Assembly: Bitwise Tricks (x86-32)',
        category: 'systems',
        description: 'Practice bitwise AND/OR/XOR/SHL/SHR with annotated 32-bit examples. Focus on masks, toggling bits, and quick parity checks.',
        difficulty: 'beginner',
        topics: ['AND/OR/XOR', 'SHL/SHR', 'Masks', 'Parity', 'Flags'],
        exampleHighlight: 'Examples include: clearing/setting/toggling bits, extracting bytes, and counting set bits with a loop.',
        examples: [
            'Clear bit k: and eax, ~(1 << k); Set bit k: or eax, (1 << k); Toggle bit k: xor eax, (1 << k).',
            'Mask low byte: mov bl, al ; and bl, 0xFF.',
            'Count set bits: test al,1 ; shr al,1 in a loop.',
            'Parity: xor folding chunks to compute a parity bit.'
        ],
        codeExamples: {
            assembly: `; Bitwise ops (x86-32)
section .text
global clear_set_toggle, count_bits

; void clear_set_toggle(int* x, int k)
clear_set_toggle:
    push ebp
    mov  ebp, esp
    mov  eax, [ebp+8]     ; ptr
    mov  ecx, [ebp+12]    ; k
    mov  edx, [eax]       ; value
    mov  ebx, 1
    shl  ebx, cl          ; ebx = 1 << k
    and  edx, not ebx     ; clear bit k
    or   edx, ebx         ; set bit k (demo)
    xor  edx, ebx         ; toggle bit k (demo)
    mov  [eax], edx
    mov  esp, ebp
    pop  ebp
    ret

; int count_bits(int x)
count_bits:
    push ebp
    mov  ebp, esp
    mov  eax, [ebp+8]     ; eax = x
    xor  ecx, ecx         ; count = 0
.loop:
    test eax, eax
    je   .done
    add  ecx, eax & 1
    shr  eax, 1
    jmp  .loop
.done:
    mov  eax, ecx         ; return count
    mov  esp, ebp
    pop  ebp
    ret
`,
            'assembly-pseudocode': `clear_set_toggle(*x, k):
  mask <- 1 << k
  x := (x & ~mask) ; clear
  x := (x | mask)  ; set (demo)
  x := (x ^ mask)  ; toggle

count_bits(x):
  count <- 0
  while x != 0:
    count += (x & 1)
    x >>= 1
  return count`
        },
        skipAutoExamples: true
    },
    {
        id: 'assembly-stack-strings',
        title: 'Assembly: Stack & Strings (x86-32)',
        category: 'systems',
        description: 'Manipulate the stack for temporary buffers, copy/compare small strings, and see how null terminators are handled at 32-bit alignment boundaries.',
        difficulty: 'intermediate',
        topics: ['Stack Buffers', 'String Copy', 'String Compare', 'Alignment', 'Cdecl'],
        exampleHighlight: 'Examples include: pushing bytes to build a string, copying with movsb, and strcmp-style compare using repe cmpsb.',
        examples: [
            'Build a short string on stack: sub esp, 16; mov dword [esp], 0x00646c72 ("rld\\0").',
            'Copy loop: use esi/edi with movsb and a countdown in ecx.',
            'Compare loop: repe cmpsb and check ZF for equality.',
            'Alignment: adjust ESP by multiples of 4 for 32-bit alignment.'
        ],
        codeExamples: {
            assembly: `; Stack + strings (x86-32)
section .text
global copy_str, cmp_str

; void copy_str(char* dst, char* src, int n)
copy_str:
    push ebp
    mov  ebp, esp
    push esi
    push edi
    mov  edi, [ebp+8]     ; dst
    mov  esi, [ebp+12]    ; src
    mov  ecx, [ebp+16]    ; n
    rep movsb             ; copy n bytes
    pop  edi
    pop  esi
    mov  esp, ebp
    pop  ebp
    ret

; int cmp_str(char* a, char* b, int n)
cmp_str:
    push ebp
    mov  ebp, esp
    push esi
    push edi
    mov  esi, [ebp+8]
    mov  edi, [ebp+12]
    mov  ecx, [ebp+16]
    repe cmpsb            ; compare byte-by-byte
    jne  .diff
    xor  eax, eax         ; equal -> return 0
    jmp  .done
.diff:
    mov  al, [esi-1]
    sub  al, [edi-1]      ; sign result: <0,0,>0
.done:
    pop  edi
    pop  esi
    mov  esp, ebp
    pop  ebp
    ret
`,
            'assembly-pseudocode': `copy_str(dst, src, n):
  for i in 0..n-1: dst[i] <- src[i]

cmp_str(a, b, n):
  for i in 0..n-1:
    if a[i] != b[i]: return a[i]-b[i]
  return 0`
        },
        skipAutoExamples: true
    },
    {
        id: 'discrete-math-5',
        title: 'Discrete Mathematics V: Probability Basics',
        category: 'discrete',
        description: 'Beginner-friendly probability with sample spaces, events, conditional probability, Bayes’ rule, and independence. Heavy notes, worked examples, and mini tables.',
        difficulty: 'beginner',
        topics: ['Sample Spaces', 'Events', 'Conditional Probability', 'Bayes', 'Independence'],
        exampleHighlight: 'Examples include: dice/coin sample spaces, conditional probability table for cards, and a Bayes’ rule medical test walkthrough.',
        examples: [
            'Sample space: roll 2 dice (36 outcomes), event of sum=7 enumerated.',
            'Conditional: P(heart | face card) using 12 face cards, 3 hearts.',
            'Bayes: false-positive/false-negative test example with explicit totals.',
            'Independence: check P(A∩B) vs P(A)P(B) on coin flips.',
            'Expectation: E[X] for a fair die (3.5) and for Bernoulli(p).'
        ],
        codeExamples: {
            java: `// Theory-only module: probability tables and examples are in the notes.`
        },
        skipAutoExamples: true,
        codeBreakdown: [
            { label: 'Sample spaces', detail: 'List outcomes and define events clearly before computing probabilities.' },
            { label: 'Conditional/Bayes', detail: 'Use totals to compute P(A|B) = P(A∩B)/P(B); apply Bayes with numeric tables.' },
            { label: 'Independence', detail: 'Verify P(A∩B) = P(A)P(B) with simple coin/die events.' }
        ],
        truthTables: [],
        resources: [
            { text: 'Intro Probability Notes', url: 'https://prob140.org' }
        ]
    },
    {
        id: 'discrete-math-6',
        title: 'Discrete Mathematics VI: Proof Strategies & Practice',
        category: 'discrete',
        description: 'Deepen proof skills with direct, contrapositive, contradiction, and induction practice. Heavy scaffolding, worked examples, and checklists for beginners.',
        difficulty: 'beginner',
        topics: ['Direct Proof', 'Contrapositive', 'Contradiction', 'Induction', 'Proof Structure'],
        exampleHighlight: 'Examples include: parity proofs, divisibility proofs, induction on sums, and contradiction examples on irrationals.',
        examples: [
            'Direct: prove sum of two even numbers is even with explicit algebraic steps.',
            'Contrapositive: if n² is even then n is even — rewrite and prove.',
            'Contradiction: √2 is irrational — outline with assumptions and prime factorization.',
            'Induction: 1+2+…+n = n(n+1)/2 with base and inductive step annotated.',
            'Template: checklist for assumptions, goal restatement, and closure.'
        ],
        codeExamples: {
            java: `// Theory-only module: use the proof templates and worked examples.`
        },
        skipAutoExamples: true,
        codeBreakdown: [
            { label: 'Direct/Contrapositive', detail: 'Rewrite the goal, assume hypotheses, derive target; for contrapositive, flip and negate carefully.' },
            { label: 'Contradiction', detail: 'Assume the negation of the claim and force an impossibility (parity/irrational examples).' },
            { label: 'Induction', detail: 'State base, hypothesis, and step; highlight where the hypothesis is used.' }
        ],
        truthTables: [],
        resources: [
            { text: 'Proof Strategies Guide', url: 'https://people.math.harvard.edu/~elkies/Misc/proofs.pdf' }
        ]
    }
];

function enrichModuleDetails(modulesList = []) {
    modulesList.forEach(module => {
        const baseDescription = module.descriptionBase || module.description || '';
        const baseExplanation = module.explanationBase || module.explanation || baseDescription;
        const topics = (module.topics || []).slice(0, 4).join(', ') || 'core concepts';
        const sampleLanguages = Object.keys(module.codeExamples || {});

        module.descriptionBase = baseDescription;
        module.explanationBase = baseExplanation;

        const examplesList = Array.isArray(module.examples) ? module.examples : [];
        if ((!examplesList.length) && !shouldSkipAutoExamples(module)) {
            module.examples = buildDefaultExamples(module);
        } else {
            module.examples = examplesList;
        }
        if (!module.exampleHighlight) {
            const preview = Array.isArray(module.examples) ? module.examples.slice(0, 3) : [];
            module.exampleHighlight = `Examples include: ${preview.join('; ') || topics}.`;
        }
        const exampleSnippet = module.exampleHighlight || `Examples include: ${topics}.`;
        module.description = `${baseDescription} You will see how the sample code maps each idea to practice, watch inputs flow through the helpers, and learn when to pick these techniques (${topics}). ${exampleSnippet}`;

        module.explanation = `${baseExplanation} The walkthrough points out guard clauses, setup/teardown steps, complexity trade-offs, and mirrors the Java sample across ${sampleLanguages.length ? sampleLanguages.join(', ') : 'Java'} so you can cross-check logic in multiple languages. ${exampleSnippet}`;

        const baseBreakdown = module.codeBreakdownBase || module.codeBreakdown || [];
        module.codeBreakdownBase = baseBreakdown;

        const enrichedBreakdown = baseBreakdown.map(entry => ({
            ...entry,
            detail: `${entry.detail} Follow the input/output flow, the edge-case guard, and the time/space footprint as annotated in the code.`
        }));

        if (!enrichedBreakdown.length) {
            (module.topics || []).slice(0, 3).forEach(topic => {
                enrichedBreakdown.push({
                    label: topic,
                    detail: `Explains how ${topic} is implemented in the sample and what invariants to check while stepping through the code.`
                });
            });
        }

        module.codeBreakdown = enrichedBreakdown;
    });
}

enrichModuleDetails(modules);

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

const SAMPLE_LANGUAGES = Object.keys(SUPPORTED_LANGUAGES);

function formatIdentifier(id = '') {
    return id.split(/[-\s]/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('') || 'Module';
}

function buildSampleCode(module, language) {
    const title = module.title || 'Module';
    const summary = (module.topics || []).slice(0, 3).join(', ') || 'core concepts';
    const className = formatIdentifier(module.id);
    const guidance = [
        'Read the description to anchor the concept.',
        'Follow the code comments to see control flow.',
        'Trace sample inputs and note edge cases.',
        'Compare time/space complexity.'
    ];

    switch (language) {
        case 'python':
            return `# ${title} in Python
# Focus: ${summary}
# Each step mirrors the Java sample so you can compare logic side by side.

class ${className}Module:
    def __init__(self):
        self.topics = ${JSON.stringify(module.topics || [])}

    def walkthrough(self):
        print("Working through ${title}...")
        for step in ${JSON.stringify(guidance)}:
            print(f"- {step}")
        if self.topics:
            print("Key topics:")
            for topic in self.topics:
                print(f"  • {topic}")


if __name__ == "__main__":
    demo = ${className}Module()
    demo.walkthrough()
`;
        case 'cpp':
            return `// ${title} in C++\n// Topics: ${summary}\n// Follows the same flow as the Java sample: read, trace, practice.\n#include <iostream>\n#include <vector>\n#include <string>\n\nclass ${className}Module {\npublic:\n    void walkthrough() {\n        std::vector<std::string> guidance = {${guidance.map(s => `"${s}"`).join(', ')}};\n        std::vector<std::string> topics = {${(module.topics || []).map(t => `"${t}"`).join(', ')}};\n        std::cout << "Working through ${title}..." << std::endl;\n        for (const auto& step : guidance) {\n            std::cout << "- " << step << std::endl;\n        }\n        if (!topics.empty()) {\n            std::cout << "Key topics:" << std::endl;\n            for (const auto& topic : topics) {\n                std::cout << "  • " << topic << std::endl;\n            }\n        }\n    }\n};\n\nint main() {\n    ${className}Module demo;\n    demo.walkthrough();\n    return 0;\n}\n`;
        case 'javascript':
            return `// ${title} in JavaScript\n// Highlights: ${summary}\n// Mirrors the Java sample: read comments, trace control flow, then practice.\nclass ${className}Module {\n    constructor() {\n        this.topics = ${JSON.stringify(module.topics || [])};\n        this.guidance = ${JSON.stringify(guidance)};\n    }\n\n    walkthrough() {\n        console.log("Working through ${title}...");\n        this.guidance.forEach(step => console.log(\`- \${step}\`));\n        if (this.topics.length) {\n            console.log("Key topics:");\n            this.topics.forEach(topic => console.log(\`  • \${topic}\`));\n        }\n    }\n}\n\nconst demo = new ${className}Module();\ndemo.walkthrough();\n`;
        default:
            return module.codeExample || `// ${title} in Java\n// Topics: ${summary}\npublic class ${className}Module {\n    public void walkthrough() {\n        String[] steps = {"concept overview", "code tracing", "practice challenge"};\n        for (String step : steps) {\n            System.out.println("✔️ " + step);\n        }\n    }\n\n    public static void main(String[] args) {\n        new ${className}Module().walkthrough();\n    }\n}\n`;
    }
}

function isPlaceholderExample(code = '') {
    if (!code || typeof code !== 'string') return true;
    const markers = ['Working through', 'walkthrough', 'guidance =', 'topics =', 'demo.walkthrough', 'focus:', 'Mirrors the Java sample'];
    return markers.some(marker => code.toLowerCase().includes(marker.toLowerCase()));
}

function translateJavaToPython(javaCode = '') {
    const lines = javaCode.replace(/\r/g, '').split('\n');
    let indent = 0;
    const translated = [];

    lines.forEach(rawLine => {
        let line = rawLine.trim();
        if (!line) {
            translated.push('');
            return;
        }
        if (line.includes('}')) indent = Math.max(0, indent - 1);

        line = line
            .replace(/System\.out\.println\s*\((.*)\)\s*;?/, 'print(\\1)')
            .replace(/System\.out\.print\s*\((.*)\)\s*;?/, 'print(\\1, end="")')
            .replace(/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{?/, 'def main():')
            .replace(/\bString\b/g, '')
            .replace(/\bint\b/g, '')
            .replace(/\bdouble\b/g, '')
            .replace(/\bboolean\b/g, '')
            .replace(/\bchar\b/g, '')
            .replace(/\bnew\s+([A-Za-z0-9_<>]+)\s*\(\)/g, '\\1()')
            .replace(/\/\/\s?/g, '# ')
            .replace(/;/g, '');

        if (line.endsWith('{')) {
            line = line.replace(/\{\s*$/, ':');
        }

        translated.push(`${'    '.repeat(indent)}${line}`);

        if (rawLine.includes('{') && !line.startsWith('def main():')) {
            indent += 1;
        }
    });

    if (!translated.find(l => l.trim().startsWith('if __name__'))) {
        translated.push('');
        translated.push('if __name__ == "__main__":');
        translated.push('    main()');
    }
    return translated.join('\n');
}

function translateJavaToJavaScript(javaCode = '') {
    return javaCode
        .replace(/System\.out\.println\s*\((.*)\)\s*;?/g, 'console.log($1);')
        .replace(/System\.out\.print\s*\((.*)\)\s*;?/g, 'process.stdout.write(String($1));')
        .replace(/\bpublic\s+class\b/g, 'class')
        .replace(/\bpublic\s+static\s+void\s+main\s*\(([^)]*)\)\s*\{?/g, 'function main($1) {')
        .replace(/\bString\b/g, '')
        .replace(/\bint\b/g, 'let')
        .replace(/\bdouble\b/g, 'let')
        .replace(/\bboolean\b/g, 'let')
        .replace(/\bchar\b/g, 'let');
}

function translateJavaToCpp(javaCode = '') {
    const header = '#include <bits/stdc++.h>\\nusing namespace std;\\n';
    const body = javaCode
        .replace(/System\.out\.println\s*\((.*)\)\s*;?/g, 'cout << $1 << endl;')
        .replace(/System\.out\.print\s*\((.*)\)\s*;?/g, 'cout << $1;')
        .replace(/\bString\b/g, 'string')
        .replace(/\bboolean\b/g, 'bool')
        .replace(/\btrue\b/g, 'true')
        .replace(/\bfalse\b/g, 'false')
        .replace(/\bpublic\s+class\s+([A-Za-z0-9_]+)\s*\{/g, 'class $1 {')
        .replace(/\bpublic\s+static\s+void\s+main\s*\([^)]*\)\s*\{?/g, 'int main() {')
        .replace(/new\s+int\[\]/g, 'vector<int>()')
        .replace(/new\s+String\[\]/g, 'vector<string>()');
    return `${header}${body}`;
}

function extractJavaOutputs(javaCode = '') {
    const outputs = [];
    const regex = /System\.out\.print(?:ln)?\s*\(([^;]+)\)/g;
    let match;
    while ((match = regex.exec(javaCode)) !== null) {
        const raw = match[1]?.trim() || '';
        const stringLiterals = raw.match(/"(?:[^"\\]|\\.)*"/g);
        if (stringLiterals && stringLiterals.length) {
            const joined = stringLiterals.map(s => s.slice(1, -1)).join(' ').replace(/\s+/g, ' ').trim();
            if (joined) outputs.push(joined);
        } else {
            outputs.push(raw.replace(/\s+/g, ' ').trim());
        }
    }
    return outputs;
}

function buildAlignedFromJavaOutputs(module, language, javaCode = '') {
    const base = javaCode || module.codeExamples?.java || module.codeExample || '';
    const label = SUPPORTED_LANGUAGES[language]?.name || language;
    const header = language === 'python'
        ? `# ${label} translation of "${module.title}"\n`
        : `// ${label} translation of "${module.title}"\n`;

    let translated = base;
    switch (language) {
        case 'python':
            translated = translateJavaToPython(base);
            break;
        case 'javascript':
            translated = translateJavaToJavaScript(base);
            break;
        case 'cpp':
            translated = translateJavaToCpp(base);
            break;
        default:
            translated = base;
    }
    return `${header}${translated}`;
}

function buildDefaultExamples(module) {
    const title = module.title || 'This module';
    const topicList = module.topics || [];
    const primary = topicList[0] || 'core idea';
    const secondary = topicList[1] || topicList[0] || 'related concept';
    const difficultyLabel = module.difficulty ? `${module.difficulty} level` : 'all levels';
    return [
        `${title}: apply ${primary} on a small input and trace the steps.`,
        `Compare two approaches for ${secondary}: brute force vs. optimized (${difficultyLabel}).`,
        `Walk through edge cases (empty input, single item, duplicate values) to see how ${title} handles them.`
    ];
}

function shouldSkipAutoExamples(module) {
    return module.skipAutoExamples || module.category === 'systems' || module.category === 'discrete';
}

function alignNonJavaExamples(modulesList = []) {
    modulesList.forEach(module => {
        if (shouldSkipAutoExamples(module)) return;
        const javaCode = (module.codeExamples && module.codeExamples.java) || module.codeExample || '';
        if (!javaCode) return;

        // Normalize to ensure codeExamples exists for downstream consumers
        module.codeExamples = module.codeExamples ? { ...module.codeExamples } : { java: javaCode };

        SAMPLE_LANGUAGES.forEach(language => {
            if (language === 'java') return;
            module.codeExamples[language] = buildAlignedFromJavaOutputs(module, language, javaCode);
            const pseudoKey = `${language}-pseudocode`;
            module.codeExamples[pseudoKey] = convertToPseudocode(module.codeExamples[language], language, true);
        });
        module.codeExamples['java-pseudocode'] = convertToPseudocode(javaCode, 'java', true);
    });
}

modules.forEach(module => {
    const isSystems = module.category === 'systems';
    const isDiscrete = module.category === 'discrete';
    module.codeExamples = module.codeExamples ? { ...module.codeExamples } : {};

    if (isSystems) {
        // Keep only assembly / pseudocode
        Object.keys(module.codeExamples).forEach(key => {
            if (key !== 'assembly' && key !== 'assembly-pseudocode') {
                delete module.codeExamples[key];
            }
        });
        if (!module.codeExamples.assembly) {
            module.codeExamples.assembly = buildSampleCode(module, 'assembly');
        }
        if (!module.codeExamples['assembly-pseudocode']) {
            module.codeExamples['assembly-pseudocode'] = convertToPseudocode(module.codeExamples.assembly, 'assembly', true);
        }
        return;
    }

    if (isDiscrete) {
        return; // theory-focused; skip auto code generation
    }

    SAMPLE_LANGUAGES.forEach(language => {
        if (!module.codeExamples[language]) {
            module.codeExamples[language] = buildSampleCode(module, language);
        }
    });
});

alignNonJavaExamples(modules);

const modulePlaygroundSnippets = buildPlaygroundSnippetLibrary(modules);
const PLAYGROUND_SNIPPETS = { ...BASE_PLAYGROUND_SNIPPETS, ...modulePlaygroundSnippets };
const BASE_PLAYGROUND_SNIPPET_KEYS = Object.keys(BASE_PLAYGROUND_SNIPPETS);
const MODULE_PLAYGROUND_SNIPPET_KEYS = Object.keys(modulePlaygroundSnippets);

CONSTANTS.TOTAL_MODULES = modules.length;
const luminaryLevel = ACHIEVEMENT_LEVELS.find(level => level.id === 'luminary');
if (luminaryLevel) {
    luminaryLevel.threshold = CONSTANTS.TOTAL_MODULES;
}

const flashcardDecks = generateFlashcardDecks(modules, baseFlashcards);
quizData = buildModuleQuizBanks(modules, flashcardDecks, glossaryTerms);

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

function pickRandomItems(array = [], count = 1, exclude = []) {
    const excludeSet = new Set(exclude);
    const available = array.filter(item => item && !excludeSet.has(item));
    const shuffled = shuffleArray(available);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function getResourceText(resource) {
    if (!resource) return '';
    if (typeof resource === 'string') return resource;
    return resource.text || resource.url || '';
}

function createQuestion(questionText, correctOption, distractorOptions = [], explanation = '') {
    if (!questionText || !correctOption) return null;
    const used = new Set([correctOption]);
    const options = [correctOption];
    distractorOptions.forEach(option => {
        if (!option || used.has(option) || options.length >= 4) return;
        options.push(option);
        used.add(option);
    });
    let fillerIndex = 0;
    while (options.length < 4) {
        const filler = DEFAULT_DISTRACTOR_TEXTS[fillerIndex % DEFAULT_DISTRACTOR_TEXTS.length];
        fillerIndex++;
        if (used.has(filler)) continue;
        options.push(filler);
        used.add(filler);
    }
    const shuffled = shuffleArray(options);
    return {
        question: questionText,
        options: shuffled,
        correct: shuffled.indexOf(correctOption),
        explanation: explanation || 'This detail comes directly from the module walkthrough or glossary.'
    };
}

function ensureRunnableJava(code, moduleTitle = 'Module') {
    if (/public\s+static\s+void\s+main\s*\(/i.test(code)) {
        return code;
    }
    const stub = `

class Main {
    public static void main(String[] args) {
        System.out.println("Loaded ${moduleTitle} sample. Add method calls or tests here.");
    }
}
`;
    return `${code.trim()}\n${stub}`;
}

function dedupeQuestions(questions = []) {
    const seen = new Set();
    return questions.filter(question => {
        if (!question || !question.question) return false;
        const key = question.question.trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function findGlossaryMatches(module, glossaryList = []) {
    const haystack = [
        module.title,
        module.description,
        module.explanation,
        ...(module.topics || [])
    ].join(' ').toLowerCase();
    return glossaryList.filter(term => {
        const value = term.term?.toLowerCase();
        return value && haystack.includes(value);
    });
}

function buildDifficultyQuestion(module) {
    if (!module.difficulty) return null;
    const label = module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1);
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    const distractors = pickRandomItems(difficulties.filter(item => item !== label), 3);
    return createQuestion(
        `How is ${module.title} categorized in the curriculum?`,
        label,
        distractors,
        `${module.title} is intentionally presented at the ${label.toLowerCase()} level so you can plan your learning pace.`
    );
}

function buildDescriptionQuestion(module, modulesList) {
    if (!module.description) return null;
    const distractors = pickRandomItems(
        modulesList.filter(other => other.id !== module.id).map(other => other.description).filter(Boolean),
        3
    );
    return createQuestion(
        `Which summary best matches ${module.title}?`,
        module.description,
        distractors,
        module.description
    );
}

function buildExplanationQuestion(module, modulesList) {
    const detail = module.explanation || module.description;
    if (!detail) return null;
    const distractors = pickRandomItems(
        modulesList.filter(other => other.id !== module.id).map(other => other.explanation || other.description).filter(Boolean),
        3
    );
    return createQuestion(
        `Why is ${module.title} an important stop on your Java DSA roadmap?`,
        detail,
        distractors,
        detail
    );
}

function buildResourceQuestion(module, resource, resourcePool) {
    const resourceText = getResourceText(resource);
    if (!resourceText) return null;
    const distractors = pickRandomItems(
        resourcePool.filter(item => item !== resourceText),
        3
    );
    return createQuestion(
        `Which supporting resource is listed under ${module.title}?`,
        resourceText,
        distractors,
        `This link is surfaced directly under ${module.title}'s resources list.`
    );
}

function buildTopicQuestion(module, topic, modulesList) {
    if (!topic) return null;
    const distractors = pickRandomItems(
        modulesList.filter(other => other.id !== module.id).map(other => other.title),
        3
    );
    return createQuestion(
        `Which module should you revisit to strengthen ${topic}?`,
        module.title,
        distractors,
        `${topic} is one of the highlighted topics for ${module.title}.`
    );
}

function buildBreakdownQuestion(module, breakdown, breakdownPool) {
    if (!breakdown?.detail) return null;
    const distractors = pickRandomItems(
        breakdownPool.filter(item => item !== breakdown.detail),
        3
    );
    return createQuestion(
        `In ${module.title}, what does the ${breakdown.label} walkthrough emphasize?`,
        breakdown.detail,
        distractors,
        breakdown.detail
    );
}

function buildGlossaryDefinitionQuestion(term, glossaryList) {
    if (!term?.definition) return null;
    const distractors = pickRandomItems(
        glossaryList.filter(entry => entry.term !== term.term).map(entry => entry.definition),
        3
    );
    return createQuestion(
        `According to the glossary, what does ${term.term} mean?`,
        term.definition,
        distractors,
        term.definition
    );
}

function buildFlashcardQuestion(module, card, answerPool) {
    if (!card?.question || !card?.answer) return null;
    const distractors = pickRandomItems(
        answerPool.filter(answer => answer !== card.answer),
        3
    );
    return createQuestion(
        card.question,
        card.answer,
        distractors,
        `This matches the flashcard explanation for ${module.title}.`
    );
}

function ensureQuestionPool(pool, module, modulesList) {
    const builders = [
        () => buildDescriptionQuestion(module, modulesList),
        () => buildExplanationQuestion(module, modulesList),
        () => buildDifficultyQuestion(module)
    ];
    let attempts = 0;
    while (pool.length < QUIZ_CONFIG.poolSize && attempts < 20) {
        const candidate = builders[attempts % builders.length]();
        attempts++;
        if (!candidate) continue;
        if (pool.some(existing => existing.question === candidate.question)) continue;
        pool.push(candidate);
    }
    return pool;
}

function buildModuleQuizBanks(modulesList, deckCollection, glossaryList) {
    const resourcePool = modulesList.flatMap(module => (module.resources || []).map(getResourceText)).filter(Boolean);
    const breakdownPool = modulesList.flatMap(module => (module.codeBreakdown || []).map(entry => entry.detail)).filter(Boolean);
    const answerPool = Object.entries(deckCollection)
        .filter(([deckId]) => deckId !== 'general' && deckId !== 'all')
        .flatMap(([, cards]) => cards.map(card => card.answer).filter(Boolean));

    const quizBank = {};

    modulesList.forEach(module => {
        const moduleQuestions = [];
        moduleQuestions.push(buildDifficultyQuestion(module));
        moduleQuestions.push(buildDescriptionQuestion(module, modulesList));
        moduleQuestions.push(buildExplanationQuestion(module, modulesList));

        (module.resources || []).forEach(resource => {
            moduleQuestions.push(buildResourceQuestion(module, resource, resourcePool));
        });

        (module.topics || []).forEach(topic => {
            moduleQuestions.push(buildTopicQuestion(module, topic, modulesList));
        });

        (module.codeBreakdown || []).forEach(breakdown => {
            moduleQuestions.push(buildBreakdownQuestion(module, breakdown, breakdownPool));
        });

        const glossaryMatches = findGlossaryMatches(module, glossaryList);
        glossaryMatches.forEach(term => {
            moduleQuestions.push(buildGlossaryDefinitionQuestion(term, glossaryList));
        });

        (deckCollection[module.id] || []).forEach(card => {
            moduleQuestions.push(buildFlashcardQuestion(module, card, answerPool));
        });

        const cleaned = dedupeQuestions(moduleQuestions.filter(Boolean));
        const completed = ensureQuestionPool(cleaned, module, modulesList);
        const finalQuestions = shuffleArray(completed)
            .slice(0, QUIZ_CONFIG.poolSize)
            .map((question, index) => ({
                ...question,
                id: `${module.id}-q${index + 1}`
            }));

        quizBank[module.id] = {
            parts: [
                { questions: finalQuestions }
            ]
        };
    });

    return quizBank;
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

function shuffleArray(array = []) {
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
        appState.completedModules.add(moduleId);
        populateFlashcardModuleSelect();
        if (appState.selectedFlashcardModule === moduleId) {
            refreshFlashcardSession(moduleId, { persist: false });
        }
        updateProgress();
        renderInsights();
        renderModules();
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
        categoryFilter: appState.categoryFilter,
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
        reduceMotion: appState.reduceMotion,
        highContrast: appState.highContrast,
        studyPlan: appState.studyPlan,
        accountProfile: appState.accountProfile,
        playground: {
            code: appState.playground.code,
            sample: appState.playground.sample,
            output: appState.playground.output,
            language: appState.playground.language
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
            appState.difficultyFilter = ['beginner', 'intermediate', 'advanced', 'all'].includes(state.difficultyFilter) ? state.difficultyFilter : 'all';
            appState.categoryFilter = normalizeCategoryFilter(state.categoryFilter);
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
            appState.reduceMotion = Boolean(state.reduceMotion);
            appState.highContrast = Boolean(state.highContrast);
            appState.studyPlan = state.studyPlan || null;
            appState.accountProfile = state.accountProfile || null;
            appState.playground = {
                code: state.playground?.code || '',
                sample: state.playground?.sample || DEFAULT_PLAYGROUND_SAMPLE,
                output: state.playground?.output || '// Output will appear here',
                language: state.playground?.language || 'java',
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

// Lightweight confetti burst (CSS injected once)
function triggerConfetti() {
    const existing = document.getElementById('confetti-style');
    if (!existing) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
        @keyframes confetti-fall {
            0% { transform: translate3d(0,0,0) rotate(0deg); opacity: 1; }
            100% { transform: translate3d(var(--confetti-x, 0px), 120vh, 0) rotate(720deg); opacity: 0; }
        }`;
        document.head.appendChild(style);
    }

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';

    const colors = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7'];
    const pieces = 60;
    for (let i = 0; i < pieces; i++) {
        const piece = document.createElement('span');
        const size = Math.random() * 8 + 6;
        piece.style.position = 'absolute';
        piece.style.top = '-10px';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.width = `${size}px`;
        piece.style.height = `${size * 0.4}px`;
        piece.style.background = colors[i % colors.length];
        piece.style.borderRadius = '2px';
        piece.style.opacity = '0.9';
        piece.style.animation = `confetti-fall ${Math.random() * 1 + 1.2}s ease-out forwards`;
        piece.style.setProperty('--confetti-x', `${(Math.random() - 0.5) * 200}px`);
        container.appendChild(piece);
    }

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 1800);
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

function getCodeExample(module, languageOverride = null) {
    const language = languageOverride || getModuleLanguage(module.id);
    const codeExamples = (module && typeof module.codeExamples === 'object') ? module.codeExamples : {};
    const mode = getModuleMode(module.id);
    const pseudoKey = `${language}-pseudocode`;
    const primary = mode === 'pseudocode'
        ? (typeof codeExamples[pseudoKey] === 'string' ? codeExamples[pseudoKey] : null)
        : (typeof codeExamples[language] === 'string' ? codeExamples[language] : null);
    const javaFallback = mode === 'pseudocode'
        ? (typeof codeExamples['java-pseudocode'] === 'string' ? codeExamples['java-pseudocode'] : null)
        : (typeof codeExamples.java === 'string' ? codeExamples.java : null);
    const legacy = typeof module.codeExample === 'string' ? module.codeExample : null;
    return primary || javaFallback || legacy || 'Code example coming soon...';
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

function applyReducedMotion() {
    document.body.classList.toggle('reduce-motion', !!appState.reduceMotion);
}

function applyHighContrast() {
    document.body.classList.toggle('high-contrast', !!appState.highContrast);
}

// Inline glossary popover
let glossaryPopoverEl = null;

function ensureGlossaryPopover() {
    if (glossaryPopoverEl) return glossaryPopoverEl;
    glossaryPopoverEl = document.createElement('div');
    glossaryPopoverEl.className = 'glossary-popover';
    glossaryPopoverEl.setAttribute('role', 'tooltip');
    glossaryPopoverEl.style.display = 'block';
    document.body.appendChild(glossaryPopoverEl);
    return glossaryPopoverEl;
}

function showGlossaryPopover(target) {
    const term = target?.dataset?.glossaryTerm;
    if (!term) return;
    const entry = getGlossaryEntry(term);
    if (!entry) return;
    const pop = ensureGlossaryPopover();
    pop.innerHTML = `<strong>${escapeHtml(entry.term)}</strong><br>${escapeHtml(entry.definition)}`;
    pop.classList.add('visible');
    const rect = target.getBoundingClientRect();
    const top = rect.top + window.scrollY - pop.offsetHeight - 10;
    const left = rect.left + window.scrollX + (rect.width / 2) - (pop.offsetWidth / 2);
    pop.style.top = `${Math.max(8, top)}px`;
    pop.style.left = `${Math.max(8, left)}px`;
}

function hideGlossaryPopover() {
    if (glossaryPopoverEl) {
        glossaryPopoverEl.classList.remove('visible');
    }
}

function attachInlineGlossaryHandlers() {
    document.body.removeEventListener('click', handleGlossaryClick, true);
    document.body.removeEventListener('mouseover', handleGlossaryHover, true);
    document.body.removeEventListener('mouseout', handleGlossaryLeave, true);
    document.body.addEventListener('click', handleGlossaryClick, true);
    document.body.addEventListener('mouseover', handleGlossaryHover, true);
    document.body.addEventListener('mouseout', handleGlossaryLeave, true);
}

function handleGlossaryHover(event) {
    const target = event.target.closest('.glossary-inline');
    if (!target) return;
    showGlossaryPopover(target);
}

function handleGlossaryLeave(event) {
    if (!event.target.closest('.glossary-inline')) return;
    hideGlossaryPopover();
}

function handleGlossaryClick(event) {
    const target = event.target.closest('.glossary-inline');
    if (!target) return;
    event.stopPropagation();
    showGlossaryPopover(target);
    setTimeout(() => hideGlossaryPopover(), 2200);
}

function updateToggleState(toggleId, sliderId, isOn) {
    const toggle = document.getElementById(toggleId);
    const slider = document.getElementById(sliderId);
    if (!toggle || !slider) return;
    toggle.classList.toggle('bg-indigo-600', isOn);
    toggle.classList.toggle('bg-slate-300', !isOn);
    slider.classList.toggle('translate-x-7', isOn);
    slider.classList.toggle('translate-x-0.5', !isOn);
}

// Complexity visualizer
function computeOps(n, complexity, constant = 1) {
    switch (complexity) {
        case 'constant': return constant;
        case 'log': return constant * Math.max(1, Math.log2(Math.max(1, n)));
        case 'linear': return constant * n;
        case 'nlogn': return constant * n * Math.max(1, Math.log2(Math.max(1, n)));
        case 'quadratic': return constant * n * n;
        default: return constant * n;
    }
}

function initComplexityVisualizer() {
    const nInput = document.getElementById('complexity-n');
    const levelInput = document.getElementById('complexity-level');
    const presetSelect = document.getElementById('complexity-preset');
    const helpEl = document.getElementById('complexity-help');
    const opsEl = document.getElementById('complexity-ops');
    const opsNote = document.getElementById('complexity-ops-note');
    const spaceEl = document.getElementById('complexity-space-usage');
    const spaceNote = document.getElementById('complexity-space-note');
    const summary = document.getElementById('complexity-summary');
    const nValue = document.getElementById('complexity-n-value');
    const logValue = document.getElementById('complexity-log-value');
    const labelEl = document.getElementById('complexity-label');

    const levels = [
        { key: 'constant', label: 'O(1)' },
        { key: 'log', label: 'O(log n)' },
        { key: 'linear', label: 'O(n)' },
        { key: 'nlogn', label: 'O(n log n)' },
        { key: 'quadratic', label: 'O(n²)' }
    ];

    const presetMap = {
        constant: { level: 1, help: 'Hash map lookups or direct indexing run in constant time.' },
        log: { level: 2, help: 'Binary search and balanced trees shrink the search space each step.' },
        linear: { level: 3, help: 'Linear scans touch each element once (arrays, strings).' },
        nlogn: { level: 4, help: 'Efficient sorts (merge/quick/heap) and many divide-and-conquer routines.' },
        quadratic: { level: 5, help: 'Nested loops (brute-force pairs) grow quickly—optimize if possible.' }
    };

    if (!nInput || !levelInput) return;

    function update() {
        const n = Number(nInput.value) || 1;
        const levelIndex = Math.min(levels.length - 1, Math.max(0, (Number(levelInput.value) || 1) - 1));
        const { key, label } = levels[levelIndex];
        const ops = Math.round(computeOps(n, key, 1));
        const spaceUnits = Math.round(computeOps(n, key, 1));
        if (opsEl) opsEl.textContent = `${ops.toLocaleString()} ops`;
        if (spaceEl) spaceEl.textContent = `${spaceUnits.toLocaleString()} units`;
        if (opsNote) opsNote.textContent = `Assuming ${label} growth.`;
        if (spaceNote) spaceNote.textContent = `Space mirrors ${label} for n items.`;
        if (summary) summary.textContent = `n=${n.toLocaleString()} • ${label}`;
        if (nValue) nValue.textContent = n.toLocaleString();
        if (logValue) logValue.textContent = Math.max(1, Math.round(Math.log2(Math.max(1, n)))).toLocaleString();
        if (labelEl) labelEl.textContent = label;
    }

    if (presetSelect) {
        presetSelect.addEventListener('change', (e) => {
            const selected = e.target.value;
            const preset = presetMap[selected];
            if (preset) {
                levelInput.value = preset.level;
                if (helpEl) helpEl.textContent = preset.help;
                update();
            }
        });
    }

    [nInput, levelInput].forEach(el => {
        el.addEventListener('input', update);
        el.addEventListener('change', update);
    });
    update();
}

// Interview examples copy
function copyExample(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.textContent || '';
    navigator.clipboard.writeText(text).then(() => {
        showToast?.('Example copied!', 'success');
    }).catch(() => showToast?.('Copy failed. Select and copy manually.', 'error'));
}

function renderInterviewExamples(page = interviewPage) {
    const grid = document.getElementById('interview-examples-grid');
    if (!grid) return;
    const totalPages = Math.max(1, Math.ceil(interviewExamples.length / INTERVIEW_PAGE_SIZE));
    interviewPage = Math.min(totalPages, Math.max(1, page));
    const start = (interviewPage - 1) * INTERVIEW_PAGE_SIZE;
    const current = interviewExamples.slice(start, start + INTERVIEW_PAGE_SIZE);
    grid.innerHTML = current.map(example => `
        <div class="interview-card">
            <div class="flex items-center justify-between mb-2">
                <div class="flex flex-col">
                    <span class="font-semibold text-slate-800">${escapeHtml(example.title)}</span>
                    <span class="text-[11px] uppercase tracking-wide text-slate-500">${escapeHtml(example.language)} · ${escapeHtml(example.difficulty)}</span>
                </div>
                <button onclick="copyExample('example-${example.id}')" class="text-xs px-2 py-1 rounded bg-indigo-500 text-white">Copy</button>
            </div>
            <pre class="interview-pre" id="example-${example.id}">${escapeHtml(example.code)}</pre>
        </div>
    `).join('');
    renderInterviewPagination(totalPages);
}

function renderInterviewPagination(totalPages) {
    const container = document.getElementById('interview-pagination');
    if (!container) return;
    container.innerHTML = Array.from({ length: totalPages }, (_, idx) => {
        const page = idx + 1;
        const active = page === interviewPage;
        return `<button class="interview-page ${active ? 'active' : ''}" data-page="${page}">${page}</button>`;
    }).join('');
}

function renderNotesLibrary() {
    const catContainer = document.getElementById('notes-library-categories');
    const list = document.getElementById('notes-library-list');
    if (!catContainer || !list) return;
    catContainer.innerHTML = notesCategories.map(cat => `
        <button class="notes-chip ${cat === activeNotesCategory ? 'active' : ''}" data-notes-cat="${cat}">${cat}</button>
    `).join('');
    const filtered = activeNotesCategory === 'All'
        ? notesLibrary
        : notesLibrary.filter(n => n.category === activeNotesCategory);
    list.innerHTML = filtered.map(item => `
        <div class="notes-card">
            <h4>${escapeHtml(item.title)}</h4>
            <p>${escapeHtml(item.summary)}</p>
            <p class="text-[11px] uppercase tracking-wide text-slate-500">Category: ${escapeHtml(item.category)} • ${item.pages} pages</p>
            <div class="notes-actions">
                <button class="notes-download" data-notes-download="${item.id}">Download ($1)</button>
                <span class="text-xs text-slate-500">Preview available in class</span>
            </div>
        </div>
    `).join('');

    catContainer.querySelectorAll('[data-notes-cat]').forEach(btn => {
        btn.addEventListener('click', () => {
            activeNotesCategory = btn.dataset.notesCat || 'All';
            renderNotesLibrary();
        });
    });
    list.querySelectorAll('[data-notes-download]').forEach(btn => {
        btn.addEventListener('click', () => {
            openNotesDownloadModal(btn.dataset.notesDownload);
        });
    });
}

// Notes
function loadNotes() {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
        return saved || '';
    } catch {
        return '';
    }
}

function saveNotes() {
    const textarea = document.getElementById('notes-input');
    if (!textarea) return;
    try {
        localStorage.setItem(STORAGE_KEYS.NOTES, textarea.value);
        showToast?.('Notes saved locally.', 'success');
    } catch {
        showToast?.('Unable to save notes locally.', 'error');
    }
}

function downloadNotes() {
    const textarea = document.getElementById('notes-input');
    if (!textarea) return;
    const blob = new Blob([textarea.value || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'java-dsa-notes.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Data Structure Playground
const dsState = {
    active: 'array',
    array: [],
    stack: [],
    queue: [],
    heap: [],
    graph: { nodes: [], edges: [] },
    trie: {},
    tree: null,
    hashing: null,
    heapsort: null,
    rbtree: null,
    circuits: null,
    greedy: null,
    visualN: 8,
    lastAction: 'Pick a structure and run an operation.'
};

const dsConfigs = {
    array: {
        label: 'Array',
        ops: [
            { label: 'Load sample', action: () => { dsState.array = [2, 4, 7, 9, 13]; } },
            { label: 'Append example', action: () => dsState.array.push(21) },
            { label: 'Remove last', action: () => dsState.array.pop() }
        ],
        complexity: 'Access O(1), Insert/Remove end O(1) amortized'
    },
    stack: {
        label: 'Stack',
        ops: [
            { label: 'Load call stack sample', action: () => { dsState.stack = ['main', 'dfs', 'visit']; } },
            { label: 'Push frame', action: () => dsState.stack.push('helper()') },
            { label: 'Pop frame', action: () => dsState.stack.pop() }
        ],
        complexity: 'Push/Pop O(1)'
    },
    queue: {
        label: 'Queue',
        ops: [
            { label: 'Load print queue', action: () => { dsState.queue = ['docA', 'docB', 'docC']; } },
            { label: 'Enqueue job', action: () => dsState.queue.push('docX') },
            { label: 'Dequeue job', action: () => dsState.queue.shift() }
        ],
        complexity: 'Enqueue/Dequeue O(1) amortized'
    },
    heap: {
        label: 'Min-Heap',
        ops: [
            { label: 'Load priorities', action: () => { dsState.heap = []; [5, 9, 12, 20, 3].forEach(v => heapInsert(v)); } },
            { label: 'Insert priority', action: () => heapInsert(7) },
            { label: 'Extract min', action: () => heapExtractMin() }
        ],
        complexity: 'Insert/Extract O(log n); Peek O(1)'
    },
    graph: {
        label: 'Graph',
        ops: [
            { label: 'Load sample graph', action: () => { dsState.graph = { nodes: ['A', 'B', 'C', 'D'], edges: [['A', 'B'], ['B', 'C'], ['A', 'D']] }; } },
            { label: 'Add node', action: () => addGraphNode() },
            { label: 'Add edge', action: () => addGraphEdge() }
        ],
        complexity: 'Adjacency list: Add edge O(1); traversal O(V+E)'
    },
    trie: {
        label: 'Trie',
        ops: [
            { label: 'Load sample words', action: () => loadSampleTrie() },
            { label: 'Insert word', action: () => insertTrieWord(sampleWord()) },
            { label: 'Reset', action: () => { dsState.trie = {}; } }
        ],
        complexity: 'Insert/Lookup O(L) where L = word length'
    },
    tree: {
        label: 'Binary Tree',
        ops: [
            { label: 'Load sample tree', action: () => loadSampleTree() },
            { label: 'Insert node', action: () => insertTreeValue(randomValue()) },
            { label: 'Reset', action: () => { dsState.tree = null; } }
        ],
        complexity: 'Insert/Search O(log n) avg; Traversal O(n)'
    },
    hashing: {
        label: 'Hashing',
        ops: [
            { label: 'Load sample table', action: () => { dsState.hashing = createSampleHash(); } },
            { label: 'Insert key', action: () => insertHashKey(sampleWord()) },
            { label: 'Reset', action: () => { dsState.hashing = createSampleHash(); } }
        ],
        complexity: 'Average O(1) lookup/insert; collisions handled with chaining'
    },
    heapsort: {
        label: 'Heap Sort',
        ops: [
            { label: 'Load unsorted', action: () => { dsState.heapsort = { input: [7, 1, 9, 3, 6, 2], sorted: [], heapBuilt: false }; } },
            { label: 'Heapify + extract', action: () => runHeapSortStep() },
            { label: 'Reset', action: () => { dsState.heapsort = { input: [7, 1, 9, 3, 6, 2], sorted: [], heapBuilt: false }; } }
        ],
        complexity: 'O(n log n) time; O(1) extra space'
    },
    rbtree: {
        label: 'Red-Black Tree',
        ops: [
            { label: 'Load balanced sample', action: () => { dsState.rbtree = createSampleRBTree(); } },
            { label: 'Insert node', action: () => insertRBValue(randomValue()) },
            { label: 'Reset', action: () => { dsState.rbtree = createSampleRBTree(); } }
        ],
        complexity: 'Insert/Search O(log n) guaranteed via balancing'
    },
    circuits: {
        label: 'Circuits (Topo)',
        ops: [
            { label: 'Load DAG sample', action: () => { dsState.circuits = createSampleCircuit(); } },
            { label: 'Add gate', action: () => addCircuitGate() },
            { label: 'Reset', action: () => { dsState.circuits = createSampleCircuit(); } }
        ],
        complexity: 'Topological order O(V+E)'
    },
    greedy: {
        label: 'Greedy',
        ops: [
            { label: 'Load intervals', action: () => { dsState.greedy = createSampleGreedy(); } },
            { label: 'Pick optimal', action: () => pickGreedyInterval() },
            { label: 'Reset', action: () => { dsState.greedy = createSampleGreedy(); } }
        ],
        complexity: 'Sort O(n log n) + selection O(n)'
    }
};

const dsComplexityMap = {
    array: 'linear',
    stack: 'constant',
    queue: 'constant',
    heap: 'log',
    graph: 'linear',
    trie: 'linear',
    tree: 'log',
    hashing: 'constant',
    heapsort: 'nlogn',
    rbtree: 'log',
    circuits: 'linear',
    greedy: 'nlogn'
};

function randomValue() {
    return Math.floor(Math.random() * 99) + 1;
}

function heapInsert(val) {
    dsState.heap.push(val);
    let i = dsState.heap.length - 1;
    while (i > 0) {
        const p = Math.floor((i - 1) / 2);
        if (dsState.heap[p] <= dsState.heap[i]) break;
        [dsState.heap[p], dsState.heap[i]] = [dsState.heap[i], dsState.heap[p]];
        i = p;
    }
}

function heapExtractMin() {
    if (!dsState.heap.length) return null;
    const min = dsState.heap[0];
    const last = dsState.heap.pop();
    if (dsState.heap.length) {
        dsState.heap[0] = last;
        let i = 0;
        while (true) {
            const l = i * 2 + 1;
            const r = i * 2 + 2;
            let smallest = i;
            if (l < dsState.heap.length && dsState.heap[l] < dsState.heap[smallest]) smallest = l;
            if (r < dsState.heap.length && dsState.heap[r] < dsState.heap[smallest]) smallest = r;
            if (smallest === i) break;
            [dsState.heap[i], dsState.heap[smallest]] = [dsState.heap[smallest], dsState.heap[i]];
            i = smallest;
        }
    }
    return min;
}

function addGraphNode() {
    const id = `N${dsState.graph.nodes.length + 1}`;
    dsState.graph.nodes.push(id);
}

function addGraphEdge() {
    if (dsState.graph.nodes.length < 2) return;
    const [a, b] = dsState.graph.nodes.slice(-2);
    dsState.graph.edges.push([a, b]);
}

function insertTrieWord(word = sampleWord()) {
    let node = dsState.trie;
    for (const ch of word) {
        node.children = node.children || {};
        node.children[ch] = node.children[ch] || {};
        node = node.children[ch];
    }
    node.isEnd = true;
}

function loadSampleTrie() {
    dsState.trie = {};
    ['code', 'stack', 'queue', 'tree'].forEach(w => insertTrieWord(w));
}

function createSampleHash() {
    const buckets = Array.from({ length: 5 }, () => []);
    ['map', 'stack', 'queue', 'tree'].forEach(key => insertHashKey(key, buckets));
    return { buckets };
}

function hashKey(key, size = 5) {
    let hash = 0;
    for (const ch of key) {
        hash = (hash * 31 + ch.charCodeAt(0)) % size;
    }
    return hash;
}

function insertHashKey(key, buckets = dsState.hashing?.buckets) {
    const table = buckets || (dsState.hashing && dsState.hashing.buckets);
    if (!table) return;
    const idx = hashKey(key, table.length);
    table[idx].push(key);
    dsState.hashing = { buckets: table };
}

function runHeapSortStep() {
    if (!dsState.heapsort) {
        dsState.heapsort = { input: [7, 1, 9, 3, 6, 2], sorted: [] };
    }
    const { input, sorted } = dsState.heapsort;
    if (!input.length && dsState.heap.length === 0) return;
    // Build heap on first call
    if (!dsState.heapsort.heapBuilt) {
        dsState.heap = [];
        input.forEach(v => heapInsert(v));
        dsState.heapsort.heapBuilt = true;
    }
    const min = heapExtractMin();
    if (min !== null && min !== undefined) {
        sorted.push(min);
    }
    dsState.heapsort.input = dsState.heap.slice();
    dsState.heapsort.sorted = sorted;
}

function sampleWord() {
    const words = ['code', 'tree', 'heap', 'stack', 'queue', 'graph'];
    return words[Math.floor(Math.random() * words.length)];
}

function loadSampleTree() {
    dsState.tree = {
        value: 8,
        left: { value: 4, left: { value: 2 }, right: { value: 6 } },
        right: { value: 12, left: { value: 10 }, right: { value: 14 } }
    };
}

function insertTreeValue(val) {
    if (!dsState.tree) {
        dsState.tree = { value: val };
        return;
    }
    let node = dsState.tree;
    while (node) {
        if (val < node.value) {
            if (!node.left) {
                node.left = { value: val };
                return;
            }
            node = node.left;
        } else {
            if (!node.right) {
                node.right = { value: val };
                return;
            }
            node = node.right;
        }
    }
}

function setActiveStructure(key) {
    dsState.active = key;
    ensureSampleData(key);
    renderDSPlayground();
}

function renderDSPlayground() {
    const tabs = document.getElementById('ds-tabs');
    const controls = document.getElementById('ds-controls');
    const stateEl = document.getElementById('ds-state');
    const complexityEl = document.getElementById('ds-complexity');
    const visualEl = document.getElementById('ds-visual');
    const nSlider = document.getElementById('ds-complexity-n');
    const quickSummary = document.getElementById('ds-complexity-summary');
    const quickOps = document.getElementById('ds-complexity-ops');
    const quickLabel = document.getElementById('ds-complexity-label');
    const statusEl = document.getElementById('ds-status');
    if (!tabs || !controls || !stateEl || !complexityEl) return;

    ensureSampleData(dsState.active);

    tabs.innerHTML = Object.entries(dsConfigs).map(([key, cfg]) => `
        <button class="px-3 py-1 rounded-lg text-sm font-semibold ${dsState.active === key ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-800'}"
            onclick="setActiveStructure('${key}')">${cfg.label}</button>
    `).join('');

    const cfg = dsConfigs[dsState.active];
    controls.innerHTML = cfg.ops.map(op => `
        <button class="w-full px-3 py-2 rounded-lg text-sm font-semibold bg-white border border-slate-200 hover:border-indigo-300"
            onclick="performDSOp('${dsState.active}', '${op.label}')">${op.label}</button>
    `).join('');

    let stateText = '';
    switch (dsState.active) {
        case 'array':
            stateText = JSON.stringify(dsState.array);
            break;
        case 'stack':
            stateText = `Top -> ${JSON.stringify(dsState.stack.slice().reverse())}`;
            break;
        case 'queue':
            stateText = `Front -> ${JSON.stringify(dsState.queue)}`;
            break;
        case 'heap':
            stateText = `Heap array: ${JSON.stringify(dsState.heap)}`;
            break;
        case 'graph':
            stateText = `Nodes: ${dsState.graph.nodes.join(', ')}\nEdges: ${dsState.graph.edges.map(e => `${e[0]}-${e[1]}`).join(', ')}`;
            break;
        case 'trie':
            stateText = JSON.stringify(dsState.trie, null, 2);
            break;
        case 'tree':
            stateText = `Nodes (in-order approx): ${JSON.stringify(listTreeValues(dsState.tree))}`;
            break;
        case 'hashing':
            stateText = (dsState.hashing?.buckets || []).map((bucket, idx) => `Bucket ${idx}: ${bucket.join(', ') || 'empty'}`).join('\n');
            break;
        case 'heapsort':
            stateText = `Heap array: ${JSON.stringify(dsState.heap || [])}\nSorted out: ${JSON.stringify(dsState.heapsort?.sorted || [])}`;
            break;
        case 'rbtree':
            stateText = `Nodes: ${treeLevels(dsState.rbtree).flat().map(n => `${n.value}(${n.color || 'black'})`).join(', ')}`;
            break;
        case 'circuits':
            stateText = `Gates: ${(dsState.circuits?.gates || []).join(', ')}\nEdges: ${(dsState.circuits?.edges || []).map(e => `${e[0]}->${e[1]}`).join(', ')}`;
            break;
        case 'greedy':
            stateText = `Intervals: ${(dsState.greedy?.intervals || []).map(iv => `[${iv[0]},${iv[1]}]`).join(' ')}\nChosen: ${(dsState.greedy?.chosen || []).join(' ')}`;
            break;
        default:
            stateText = '';
    }
    stateEl.textContent = stateText || 'No data yet.';
    complexityEl.textContent = cfg.complexity;
    if (statusEl) {
        statusEl.textContent = dsState.lastAction || '';
    }

    if (visualEl) {
        visualEl.innerHTML = buildDSVisual(dsState.active);
    }

    if (nSlider && quickSummary && quickOps && quickLabel) {
        const activeKey = dsState.active;
        if (!nSlider.dataset.bound) {
            nSlider.addEventListener('input', () => {
                dsState.visualN = Number(nSlider.value) || dsState.visualN;
                renderDSPlayground();
            });
            nSlider.dataset.bound = 'true';
        }
        const n = Number(nSlider.value) || dsState.visualN || 8;
        dsState.visualN = n;
        const complexityKey = dsComplexityMap[activeKey] || 'linear';
        const labelMap = {
            constant: 'O(1)',
            log: 'O(log n)',
            linear: 'O(n)',
            nlogn: 'O(n log n)',
            quadratic: 'O(n²)'
        };
        const ops = Math.round(computeOps(n, complexityKey, 1));
        quickSummary.textContent = `n=${n} • ${labelMap[complexityKey] || 'O(n)'}`;
        quickOps.textContent = `${ops.toLocaleString()} ops`;
        quickLabel.textContent = labelMap[complexityKey] || '';
    }
}

function performDSOp(structKey, opLabel) {
    const cfg = dsConfigs[structKey];
    if (!cfg) return;
    const op = cfg.ops.find(o => o.label === opLabel);
    if (op) {
        op.action();
        dsState.lastAction = `${cfg.label}: ${op.label}`;
    }
    renderDSPlayground();
}

function buildDSVisual(structKey) {
    switch (structKey) {
        case 'stack': {
            if (!dsState.stack.length) return '<div class="text-xs text-slate-400">Stack is empty</div>';
            const items = dsState.stack.map(val => `<div class="ds-box">${val}</div>`).join('');
            return `<div class="text-[11px] uppercase text-emerald-200 font-semibold">Top</div><div class="ds-stack">${items}</div><div class="text-[11px] uppercase text-slate-400 font-semibold">Bottom</div>`;
        }
        case 'queue': {
            if (!dsState.queue.length) return '<div class="text-xs text-slate-400">Queue is empty</div>';
            const items = dsState.queue.map(val => `<div class="ds-box">${val}</div>`).join('');
            return `<div class="ds-queue">${items}</div><div class="flex justify-between text-[11px] text-slate-300 mt-1"><span>Front</span><span>Back</span></div>`;
        }
        case 'array': {
            if (!dsState.array.length) return '<div class="text-xs text-slate-400">Array is empty</div>';
            const items = dsState.array.map((val, idx) => `<div class="ds-box">${idx}: ${val}</div>`).join('');
            return `<div class="ds-array">${items}</div>`;
        }
        case 'heap': {
            if (!dsState.heap.length) return '<div class="text-xs text-slate-400">Heap is empty</div>';
            const items = dsState.heap.map((val, idx) => `<div class="ds-box">${val} <span class="text-[10px] opacity-70">(${idx})</span></div>`).join('');
            return `<div class="ds-heap">${items}</div>`;
        }
        case 'graph': {
            if (!dsState.graph.nodes.length) return '<div class="text-xs text-slate-400">Graph is empty</div>';
            const nodes = dsState.graph.nodes.map(n => `<span class="ds-graph-node">${n}</span>`).join('');
            const edges = dsState.graph.edges.map(e => `${e[0]} — ${e[1]}`).join(', ');
            return `<div class="ds-graph-nodes">${nodes}</div><div class="ds-graph-edges mt-1">Edges: ${edges || 'None'}</div>`;
        }
        case 'trie': {
            const hasNodes = Object.keys(dsState.trie).length;
            const words = hasNodes ? listTrieWords(dsState.trie) : [];
            const content = hasNodes ? words.join(', ') : 'Insert a word to see the trie grow.';
            return `<div class="ds-trie text-xs whitespace-pre-wrap">Words: ${escapeHtml(content)}</div>`;
        }
        case 'tree': {
            return buildTreeVisual(dsState.tree);
        }
        case 'hashing': {
            if (!dsState.hashing || !dsState.hashing.buckets) return '<div class="text-xs text-slate-400">Hash table empty</div>';
            return `
                <div class="space-y-1">
                    ${dsState.hashing.buckets.map((bucket, idx) => `
                        <div class="flex items-center gap-2">
                            <span class="text-[11px] text-slate-300 font-semibold">Bucket ${idx}</span>
                            <div class="ds-array">${bucket.map(key => `<div class="ds-box">${escapeHtml(key)}</div>`).join('') || '<span class="text-xs text-slate-500">empty</span>'}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        case 'heapsort': {
            const data = dsState.heapsort || { input: [], sorted: [] };
            const inputBoxes = (data.input || []).map(v => `<div class="ds-box">${v}</div>`).join('');
            const sortedBoxes = (data.sorted || []).map(v => `<div class="ds-box">${v}</div>`).join('');
            return `
                <div class="space-y-2">
                    <div>
                        <div class="text-[11px] text-slate-300 uppercase font-semibold">Current Heap Array</div>
                        <div class="ds-array">${inputBoxes || '<span class="text-xs text-slate-500">empty</span>'}</div>
                    </div>
                    <div>
                        <div class="text-[11px] text-emerald-200 uppercase font-semibold">Sorted Output</div>
                        <div class="ds-array">${sortedBoxes || '<span class="text-xs text-slate-500">empty</span>'}</div>
                    </div>
                </div>
            `;
        }
        case 'rbtree': {
            const tree = dsState.rbtree || createSampleRBTree();
            const levels = treeLevels(tree);
            return `
                <div class="space-y-2">
                    ${levels.map(level => `
                        <div class="flex justify-center gap-2">
                            ${level.map(n => `<div class="ds-box" style="background:${n.color === 'red' ? 'rgba(239, 68, 68, 0.22)' : 'rgba(59, 130, 246, 0.18)'};border-color:${n.color === 'red' ? 'rgba(239,68,68,0.5)' : 'rgba(59,130,246,0.35)'}">${n.value}</div>`).join('')}
                        </div>
                    `).join('')}
                    <div class="text-[11px] text-slate-300">Balanced red/black tree</div>
                </div>
            `;
        }
        case 'circuits': {
            const data = dsState.circuits || createSampleCircuit();
            const gates = data.gates || [];
            return `
                <div class="space-y-2">
                    <div class="flex flex-wrap gap-2">
                        ${gates.map(g => `<div class="ds-box">${escapeHtml(g)}</div>`).join('')}
                    </div>
                    <div class="text-[11px] text-slate-300">Edges: ${data.edges.map(e => `${e[0]}→${e[1]}`).join(', ') || 'none'}</div>
                </div>
            `;
        }
        case 'greedy': {
            const data = dsState.greedy || createSampleGreedy();
            const intervals = data.intervals || [];
            const chosen = data.chosen || [];
            return `
                <div class="space-y-2">
                    <div class="text-[11px] text-slate-300 uppercase font-semibold">Intervals (start, end)</div>
                    <div class="flex flex-wrap gap-2">
                        ${intervals.map(iv => {
                            const tag = `${iv[0]},${iv[1]}`;
                            const picked = chosen.includes(tag);
                            return `<div class="ds-box" style="background:${picked ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.12)'}">${iv[0]}-${iv[1]}</div>`;
                        }).join('')}
                    </div>
                    <div class="text-[11px] text-emerald-200">Greedy picks non-overlapping shortest finishing times.</div>
                </div>
            `;
        }
        default:
            return '<div class="text-xs text-slate-400">Choose a structure to visualize.</div>';
    }
}

function ensureSampleData(key) {
    switch (key) {
        case 'array':
            if (!dsState.array.length) dsState.array = [2, 4, 7, 9, 13];
            break;
        case 'stack':
            if (!dsState.stack.length) dsState.stack = ['main', 'dfs'];
            break;
        case 'queue':
            if (!dsState.queue.length) dsState.queue = ['docA', 'docB'];
            break;
        case 'heap':
            if (!dsState.heap.length) {
                dsState.heap = [];
                [5, 9, 12, 20, 3].forEach(v => heapInsert(v));
            }
            break;
        case 'graph':
            if (!dsState.graph.nodes.length) {
                dsState.graph = { nodes: ['A', 'B', 'C'], edges: [['A', 'B'], ['B', 'C']] };
            }
            break;
        case 'trie':
            if (!Object.keys(dsState.trie).length) {
                loadSampleTrie();
            }
            break;
        case 'tree':
            if (!dsState.tree) {
                loadSampleTree();
            }
            break;
        case 'hashing':
            if (!dsState.hashing) {
                dsState.hashing = createSampleHash();
            }
            break;
        case 'heapsort':
            if (!dsState.heapsort) {
                dsState.heapsort = { input: [7, 1, 9, 3, 6], sorted: [], heapBuilt: false };
            }
            break;
        case 'rbtree':
            if (!dsState.rbtree) {
                dsState.rbtree = createSampleRBTree();
            }
            break;
        case 'circuits':
            if (!dsState.circuits) {
                dsState.circuits = createSampleCircuit();
            }
            break;
        case 'greedy':
            if (!dsState.greedy) {
                dsState.greedy = createSampleGreedy();
            }
            break;
        default:
            break;
    }
}

function listTrieWords(node = dsState.trie, prefix = '', words = []) {
    if (!node) return words;
    if (node.isEnd) words.push(prefix);
    const children = node.children || {};
    Object.keys(children).forEach(ch => listTrieWords(children[ch], prefix + ch, words));
    return words;
}

function buildTreeVisual(tree = dsState.tree) {
    if (!tree) return '<div class="text-xs text-slate-400">Tree is empty</div>';
    const levels = [];
    const queue = [{ node: tree, depth: 0 }];
    while (queue.length) {
        const { node, depth } = queue.shift();
        levels[depth] = levels[depth] || [];
        levels[depth].push(node);
        if (node.left) queue.push({ node: node.left, depth: depth + 1 });
        if (node.right) queue.push({ node: node.right, depth: depth + 1 });
    }
    return `
        <div class="space-y-2">
            ${levels.map((level, idx) => `
                <div class="flex justify-center gap-2">
                    ${level.map(n => `<div class="ds-box">${n.value}</div>`).join('')}
                </div>
            `).join('')}
            <div class="text-[11px] text-slate-300">Level order · ${levels.length} levels</div>
        </div>
    `;
}

function listTreeValues(tree, arr = []) {
    if (!tree) return arr;
    if (tree.left) listTreeValues(tree.left, arr);
    arr.push(tree.value);
    if (tree.right) listTreeValues(tree.right, arr);
    return arr;
}

function treeLevels(tree) {
    if (!tree) return [];
    const levels = [];
    const queue = [{ node: tree, depth: 0 }];
    while (queue.length) {
        const { node, depth } = queue.shift();
        levels[depth] = levels[depth] || [];
        levels[depth].push(node);
        if (node.left) queue.push({ node: node.left, depth: depth + 1 });
        if (node.right) queue.push({ node: node.right, depth: depth + 1 });
    }
    return levels;
}

function createSampleRBTree() {
    return {
        value: 10,
        color: 'black',
        left: { value: 5, color: 'red', left: { value: 3, color: 'black' }, right: { value: 7, color: 'black' } },
        right: { value: 15, color: 'red', left: { value: 13, color: 'black' }, right: { value: 18, color: 'black' } }
    };
}

function insertRBValue(val) {
    if (!dsState.rbtree) {
        dsState.rbtree = createSampleRBTree();
    }
    // Simplified insert: append to rightmost for visualization only
    let node = dsState.rbtree;
    while (node.right) node = node.right;
    node.right = { value: val, color: 'red' };
}

function createSampleCircuit() {
    return {
        gates: ['Input A', 'Input B', 'AND', 'NOT', 'Output'],
        edges: [['Input A', 'AND'], ['Input B', 'AND'], ['AND', 'NOT'], ['NOT', 'Output']]
    };
}

function addCircuitGate() {
    if (!dsState.circuits) dsState.circuits = createSampleCircuit();
    const idx = dsState.circuits.gates.length + 1;
    const name = `Gate ${idx}`;
    dsState.circuits.gates.push(name);
    if (dsState.circuits.gates.length > 1) {
        const prev = dsState.circuits.gates[dsState.circuits.gates.length - 2];
        dsState.circuits.edges.push([prev, name]);
    }
}

function createSampleGreedy() {
    return { intervals: [[1, 3], [2, 4], [3, 5], [0, 6], [5, 7]], chosen: [] };
}

function pickGreedyInterval() {
    if (!dsState.greedy) dsState.greedy = createSampleGreedy();
    const { intervals } = dsState.greedy;
    const sorted = intervals.slice().sort((a, b) => a[1] - b[1]);
    const chosen = [];
    let lastEnd = -Infinity;
    sorted.forEach(iv => {
        if (iv[0] >= lastEnd) {
            chosen.push(`${iv[0]},${iv[1]}`);
            lastEnd = iv[1];
        }
    });
    dsState.greedy.chosen = chosen;
}

function getPlaygroundSnippet(key, language = appState.playground.language) {
    const snippet = PLAYGROUND_SNIPPETS[key] || PLAYGROUND_SNIPPETS[DEFAULT_PLAYGROUND_SAMPLE];
    if (!snippet) return { label: '', code: '' };
    const languageKey = SUPPORTED_LANGUAGES[language] ? language : 'java';
    const code = (snippet.codeByLanguage && (snippet.codeByLanguage[languageKey] || snippet.codeByLanguage.java))
        || snippet.code
        || '';
    return {
        label: snippet.label || formatIdentifier(key),
        code
    };
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

function populatePlaygroundLanguageOptions() {
    const languageSelect = document.getElementById('playground-language');
    if (!languageSelect) return;

    languageSelect.innerHTML = Object.entries(SUPPORTED_LANGUAGES)
        .map(([key, meta]) => `<option value="${key}">${meta.icon} ${meta.name}</option>`)
        .join('');

    const preferredLanguage = SUPPORTED_LANGUAGES[appState.playground.language]
        ? appState.playground.language
        : 'java';

    appState.playground.language = preferredLanguage;
    languageSelect.value = preferredLanguage;

    languageSelect.addEventListener('change', (event) => {
        setPlaygroundLanguage(event.target.value);
    });
}

function initPlayground() {
    const editor = document.getElementById('playground-editor');
    if (!editor) return;

    populatePlaygroundSnippetOptions();
    populatePlaygroundLanguageOptions();
    const select = document.getElementById('playground-snippets');
    const fallbackSample = PLAYGROUND_SNIPPETS[appState.playground.sample]
        ? appState.playground.sample
        : DEFAULT_PLAYGROUND_SAMPLE;

    if (!appState.playground.code) {
        const snippet = getPlaygroundSnippet(fallbackSample, appState.playground.language);
        appState.playground.code = snippet.code;
    }
    appState.playground.sample = fallbackSample;

    if (select) {
        select.value = fallbackSample;
        select.addEventListener('change', (event) => {
            setPlaygroundSample(event.target.value);
        });
    }

    editor.value = appState.playground.code;
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
    const snippet = getPlaygroundSnippet(sampleKey, appState.playground.language);
    appState.playground.code = snippet.code;
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

function setPlaygroundLanguage(language) {
    const normalized = SUPPORTED_LANGUAGES[language] ? language : 'java';
    appState.playground.language = normalized;

    const languageSelect = document.getElementById('playground-language');
    if (languageSelect) {
        languageSelect.value = normalized;
    }

    const snippet = getPlaygroundSnippet(appState.playground.sample, normalized);
    appState.playground.code = snippet.code;

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
        updatePlaygroundOutput('Add some code before running the playground.', 'error');
        return;
    }
    if (!CODE_RUNNER_ENDPOINT) {
        updatePlaygroundOutput('Set CODE_RUNNER_ENDPOINT in js/script.js to connect a code runner.', 'error');
        return;
    }

    const languageKey = SUPPORTED_LANGUAGES[appState.playground.language]
        ? appState.playground.language
        : 'java';
    const runnerConfig = CODE_RUNNER_CONFIG[languageKey] || CODE_RUNNER_CONFIG.java;

    updatePlaygroundStatus(`Running ${SUPPORTED_LANGUAGES[languageKey]?.name || ''}`, true);

    try {
        const payload = {
            language: runnerConfig.language,
            version: runnerConfig.version,
            files: [{ name: runnerConfig.filename, content: code }]
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
        const stderr = data?.run?.stderr?.trim();
        const fallback = data?.run?.output?.trim();

        let outputText = '// Program finished with no output';
        let status = 'info';

        if (stderr) {
            outputText = stderr;
            status = 'error';
        } else if (stdout) {
            outputText = stdout;
            status = 'success';
        } else if (fallback) {
            outputText = fallback;
            status = 'info';
        }

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
    const goalEl = document.getElementById('progress-goal');
    if (goalEl) {
        goalEl.textContent = `Goal: Complete all ${CONSTANTS.TOTAL_MODULES} modules`;
    }

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
    const categoryFilter = normalizeCategoryFilter(appState.categoryFilter);

    try {
        return modules.filter(module => {
            const moduleCategory = module.category || 'dsa';
            const moduleTopics = Array.isArray(module.topics) ? module.topics : [];
            const moduleDescription = typeof module.description === 'string' ? module.description : '';
            const matchesSearch = !hasSearch ||
                module.title.toLowerCase().includes(searchTerm) ||
                moduleDescription.toLowerCase().includes(searchTerm) ||
                moduleTopics.some(topic => topic.toLowerCase().includes(searchTerm));

            const matchesDifficulty = difficultyFilter === 'all' || module.difficulty === difficultyFilter;
            const matchesCategory = categoryFilter === 'all' || moduleCategory === categoryFilter;
            const passesCompletionFilter = !appState.hideCompletedModules || !appState.completedModules.has(module.id);

            return matchesSearch && matchesDifficulty && matchesCategory && passesCompletionFilter;
        });
    } catch (err) {
        console.error('filterModules error', err);
        return modules;
    }
}

function renderModules() {
    try {
        let filteredModules = filterModules();
        if (!filteredModules.length && appState.categoryFilter !== 'all') {
            appState.categoryFilter = 'all';
            const catSelect = document.getElementById('category-filter');
            if (catSelect) catSelect.value = 'all';
            filteredModules = filterModules();
        }
        const grid = document.getElementById('modules-grid');
        const searchResultsCount = document.getElementById('search-results-count');

        if (filteredModules.length !== modules.length) {
            searchResultsCount.textContent = `Showing ${filteredModules.length} of ${modules.length} modules`;
            searchResultsCount.style.display = 'block';
        } else {
            searchResultsCount.style.display = 'none';
        }

        const totalPages = Math.max(1, Math.ceil(filteredModules.length / MODULES_PER_PAGE));
        if (appState.currentModulePage > totalPages) {
            appState.currentModulePage = totalPages;
        }
        const startIndex = (appState.currentModulePage - 1) * MODULES_PER_PAGE;
        const pageModules = filteredModules.slice(startIndex, startIndex + MODULES_PER_PAGE);

        const difficultyOrder = ['beginner', 'intermediate', 'advanced'];
        const groupedContent = difficultyOrder.map(level => {
            const bucket = pageModules.filter(module => module.difficulty === level);
            if (!bucket.length) return '';
            const meta = DIFFICULTY_SECTIONS[level] || { label: level, icon: '📘' };
            return `
                <div class="module-section">
                    <div class="module-section-heading">${meta.icon} ${meta.label}</div>
                    ${bucket.map(buildModuleCard).join('')}
                </div>
            `;
        }).join('');
        const otherModules = pageModules.filter(module => !difficultyOrder.includes(module.difficulty));
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

        renderPagination(totalPages);
        renderInsights();
    } catch (err) {
        const grid = document.getElementById('modules-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="text-center p-6 rounded-xl bg-white shadow">
                    <p class="font-semibold text-rose-600">Modules failed to load.</p>
                    <p class="text-sm text-slate-600 mt-1">Check console for details.</p>
                </div>
            `;
        }
        console.error('renderModules error', err);
    }
}

function buildModuleCard(module) {
    const isCompleted = appState.completedModules.has(module.id);
    const isCodeExpanded = appState.expandedCode.has(module.id);
    const isDiscrete = module.category === 'discrete';
    const isSystems = module.category === 'systems';
    if (isSystems) {
        Object.keys(module.codeExamples || {}).forEach(key => {
            if (key !== 'assembly' && key !== 'assembly-pseudocode') {
                delete module.codeExamples[key];
            }
        });
    }
    const availableLanguages = isDiscrete ? [] : Object.keys(module.codeExamples || {}).filter(lang => SUPPORTED_LANGUAGES[lang]);
    const currentLanguage = isDiscrete ? null : getModuleLanguage(module.id);
    const effectiveLanguage = isDiscrete
        ? null
        : (availableLanguages.includes(currentLanguage) ? currentLanguage : (availableLanguages[0] || currentLanguage));
    if (!isDiscrete && effectiveLanguage && !availableLanguages.includes(currentLanguage)) {
        appState.moduleLanguages.set(module.id, effectiveLanguage);
    }
    const currentMode = isDiscrete ? 'code' : getModuleMode(module.id);
    const hasMultipleLanguages = availableLanguages.length > 1;
    const rawCode = isDiscrete
        ? 'Theory-focused module: review the examples, truth tables, and notes.'
        : getCodeExample(module, effectiveLanguage);
    const processedCode = isDiscrete
        ? rawCode
        : processCode(isCodeExpanded ? rawCode : truncateCode(rawCode), module.id);
    const showExpandButton = !isDiscrete && rawCode.split('\n').length > CONSTANTS.CODE_PREVIEW_LINES;
    const supportSummary = module.topics?.slice(0, 2).join(' • ') || 'Guided office hours and async help.';
const bonusBlock = module.interviewPrompts && module.interviewPrompts.length ? `
        <div class="module-bonus-card">
            <div class="flex items-center justify-between mb-2">
                <span class="font-semibold text-indigo-600 text-sm">Bonus: Timed Interview Practice</span>
                <span class="text-[11px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold uppercase tracking-wide">2 prompts</span>
            </div>
            <div class="space-y-2">
                ${module.interviewPrompts.slice(0, 2).map((prompt, idx) => `
                    <div class="p-2 rounded-lg border border-slate-200 bg-white timed-prompt-card">
                        <div class="flex items-center justify-between gap-2">
                            <span class="text-sm font-semibold text-slate-800">${escapeHtml(prompt.title)}</span>
                            <button class="text-xs px-2 py-1 rounded bg-indigo-500 hover:bg-indigo-600 text-white" onclick="startTimedPrompt('${module.id}', ${idx})">
                                ⏱ ${prompt.durationMinutes || 20} min
                            </button>
                        </div>
                        <p class="text-xs text-slate-600 mt-1">${escapeHtml(prompt.prompt)}</p>
                        <p class="text-[11px] text-emerald-600 mt-1" id="prompt-timer-${module.id}-${idx}"></p>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';
    const visualKey = getModuleVisualKey(module);
    const visualLink = visualKey ? `
        <button class="text-xs px-2.5 py-1 rounded font-semibold visual-link"
            onclick="openPlaygroundStructure('${visualKey}')">
            🔍 View visual in playground
        </button>
    ` : '';

    return `
        <div id="module-${module.id}" data-module-card="${module.id}" class="module-card bg-white border-slate-200 rounded-xl p-4 sm:p-6 shadow-xl border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div class="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                <h3 class="text-lg sm:text-xl font-semibold text-indigo-600 leading-tight">${module.title}</h3>
                <span class="px-2 sm:px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium ${getDifficultyColor(module.difficulty)} whitespace-nowrap self-start sm:self-auto difficulty-badge">
                    ${module.difficulty}
                </span>
            </div>
            <div class="flex flex-wrap gap-2 mb-2">
                ${visualLink}
            </div>
            <p class="text-slate-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">${wrapGlossaryInline(module.description)}</p>
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
                        <span class="text-xs font-medium text-slate-600">${isDiscrete ? '📘 Discrete Mathematics (Theory)' : '💻 Code Example'}</span>
                        ${!isDiscrete && hasMultipleLanguages ? `
                            <span class="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
                                ${SUPPORTED_LANGUAGES[effectiveLanguage]?.icon} ${SUPPORTED_LANGUAGES[effectiveLanguage]?.name}
                            </span>
                        ` : ''}
                        ${!isDiscrete && currentMode === 'pseudocode' ? `
                            <span class="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">
                                📝 Pseudocode
                            </span>
                        ` : ''}
                        ${isDiscrete ? `<span class="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">Theory Only</span>` : ''}
                    </div>
                    <div class="flex flex-wrap gap-1 w-full sm:w-auto">
                        <button onclick="toggleModuleComments('${module.id}')" class="text-xs px-2 py-1 rounded transition-all duration-200 font-medium shadow-sm hover:shadow-md flex-shrink-0 ${shouldShowComments(module.id) ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white'}" title="${shouldShowComments(module.id) ? 'Hide Comments' : 'Show Comments'}">
                            💬 ${shouldShowComments(module.id) ? 'ON' : 'OFF'}
                        </button>
                        ${!isDiscrete && availableLanguages.length ? `
                        <select onchange="setModuleLanguage('${module.id}', this.value)" class="text-xs px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white border-0 font-medium" title="Select Programming Language">
                            ${availableLanguages.map(langKey => `
                                <option value="${langKey}" ${effectiveLanguage === langKey ? 'selected' : ''} class="bg-white text-black">
                                    ${SUPPORTED_LANGUAGES[langKey]?.icon || ''} ${SUPPORTED_LANGUAGES[langKey]?.name || langKey}
                                </option>
                            `).join('')}
                        </select>` : ''}
                        ${!isDiscrete ? `
                        <select onchange="setModuleMode('${module.id}', this.value)" class="text-xs px-2 py-1 rounded border-0 font-medium ${currentMode === 'pseudocode' ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}" title="Select Code Display Mode">
                            ${Object.entries(CODE_MODES).map(([modeKey, modeInfo]) => `
                                <option value="${modeKey}" ${currentMode === modeKey ? 'selected' : ''} class="bg-white text-black">
                                    ${modeInfo.icon} ${modeInfo.name}
                                </option>
                            `).join('')}
                        </select>` : ''}
                        ${!isDiscrete && showExpandButton ? `
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
            ${bonusBlock}
            ${module.codeBreakdown && module.codeBreakdown.length ? `
                <div class="code-breakdown-card">
                    <h4>🧠 Code Breakdown</h4>
                    <ul>
            ${module.codeBreakdown.map(item => `<li><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.detail)}</li>`).join('')}
        </ul>
    </div>
` : ''}
            ${module.examples && module.examples.length ? `
                <div class="code-breakdown-card">
                    <h4>📌 Examples</h4>
                    <ul>
                        ${module.examples.map(example => `<li>${escapeHtml(example)}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            ${module.truthTables && module.truthTables.length ? `
                <div class="code-breakdown-card truth-table-card">
                    <h4>🧮 Truth Tables</h4>
                    ${module.truthTables.map(table => `
                        <div class="truth-table-wrapper">
                            <div class="truth-table-title">${escapeHtml(table.title || '')}</div>
                            <table class="truth-table">
                                <thead>
                                    <tr>${(table.headers || []).map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr>
                                </thead>
                                <tbody>
                                    ${(table.rows || []).map(row => `<tr>${row.map(cell => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}
                                </tbody>
                            </table>
                        </div>
                    `).join('')}
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

function getModuleVisualKey(module) {
    const text = `${module.id || ''} ${module.title || ''} ${(module.topics || []).join(' ')}`.toLowerCase();
    if (text.includes('hash')) return 'hashing';
    if (text.includes('heap')) return 'heap';
    if (text.includes('stack')) return 'stack';
    if (text.includes('queue')) return 'queue';
    if (text.includes('graph')) return 'graph';
    if (text.includes('trie')) return 'trie';
    if (text.includes('tree') || text.includes('bst') || text.includes('avl') || text.includes('red-black')) return 'tree';
    if (text.includes('sort')) return 'heapsort';
    if (text.includes('greedy')) return 'greedy';
    return null;
}

function openPlaygroundStructure(structKey) {
    if (!dsConfigs[structKey]) return;
    setActiveStructure(structKey);
    const el = document.getElementById('ds-playground');
    if (el) {
        el.scrollIntoView({ behavior: appState.reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
}

function renderPagination(totalPages) {
    const containers = [
        document.getElementById('modules-pagination'),
        document.getElementById('modules-pagination-top')
    ].filter(Boolean);
    if (!containers.length) return;

    const buildButtons = () => {
        if (totalPages <= 1) return '';
        const buttons = [];
        for (let page = 1; page <= totalPages; page++) {
            const isActive = page === appState.currentModulePage;
            buttons.push(`
                <button data-page="${page}" class="pagination-button px-3 py-1.5 text-sm font-semibold border ${isActive ? 'active' : ''}">
                    ${page}
                </button>
            `);
        }
        return buttons.join('');
    };

    const markup = buildButtons();
    containers.forEach(container => {
        container.innerHTML = markup;
        container.classList.toggle('hidden', !markup);
    });
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

function wrapGlossaryInline(text = '') {
    if (!text || typeof text !== 'string') return text;
    const termsToLink = glossaryTerms.slice(0, INLINE_GLOSSARY_LIMIT);
    let output = escapeHtml(text);
    termsToLink.forEach(term => {
        const pattern = new RegExp(`\\b(${escapeRegExp(term.term)})\\b`, 'i');
        output = output.replace(
            pattern,
            `<span class="glossary-inline" data-glossary-term="${escapeHtml(term.term)}"><strong><em>$1</em></strong></span>`
        );
    });
    return output;
}

function getGlossaryEntry(term = '') {
    const normalized = term.trim().toLowerCase();
    return glossaryTerms.find(entry => entry.term.toLowerCase() === normalized);
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
            <div class="flex justify-between items-start mb-2 gap-2">
                <h4 class="font-semibold text-lg text-indigo-600">${highlightGlossaryText(item.term, highlightTerm)}</h4>
                <span class="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 whitespace-nowrap">
                    ${escapeHtml(item.category)}
                </span>
            </div>
            <p class="text-sm leading-relaxed text-slate-800 mb-2">${highlightGlossaryText(item.definition, highlightTerm)}</p>
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
    if (!module || !SUPPORTED_LANGUAGES[language]) return;
    const availableLanguages = Object.keys(module.codeExamples || {});
    if (shouldSkipAutoExamples(module) && !availableLanguages.includes(language)) {
        return; // do not auto-generate for restricted modules
    }
    module.codeExamples = module.codeExamples ? { ...module.codeExamples } : {};
    if (!module.codeExamples[language]) {
        module.codeExamples[language] = module.codeExamples.java || module.codeExample || buildSampleCode(module, language);
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
    renderInsights();
    renderModules();
    saveToLocalStorage();
}

const promptIntervals = new Map();
const promptWorkspaceState = {
    moduleId: null,
    promptIndex: 0,
    solution: '',
    language: 'java',
    notes: ''
};

function startTimedPrompt(moduleId, promptIndex = 0) {
    const module = modules.find(m => m.id === moduleId);
    if (!module || !module.interviewPrompts || !module.interviewPrompts[promptIndex]) return;
    const targetId = `prompt-timer-${moduleId}-${promptIndex}`;
    const display = document.getElementById(targetId);
    if (!display) return;

    if (promptIntervals.has(targetId)) {
        clearInterval(promptIntervals.get(targetId));
        promptIntervals.delete(targetId);
    }

    let remaining = (module.interviewPrompts[promptIndex].durationMinutes || 20) * 60;
    display.textContent = `Timer started: ${Math.ceil(remaining / 60)} min`;

    const interval = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
            clearInterval(interval);
            promptIntervals.delete(targetId);
            display.textContent = '⏱ Time! Review your solution and complexity.';
            showToast?.('Time is up! Reflect on your approach and complexity.', 'info');
        } else {
            const mins = Math.floor(remaining / 60);
            const secs = remaining % 60;
            display.textContent = `⏳ ${mins}m ${secs.toString().padStart(2, '0')}s left`;
        }
    }, 1000);

    promptIntervals.set(targetId, interval);
    openPromptWorkspace(moduleId, promptIndex);
}

function openPromptWorkspace(moduleId, promptIndex = 0) {
    const module = modules.find(m => m.id === moduleId);
    const prompt = module?.interviewPrompts?.[promptIndex];
    const modal = document.getElementById('prompt-workspace-modal');
    if (!module || !prompt || !modal) return;

    const lang = getModuleLanguage(moduleId) || 'java';
    const solution = prompt.solution || getCodeExample(module, lang) || '';
    const notes = prompt.solutionNotes || 'Review the reference solution and compare complexity and edge cases.';
    promptWorkspaceState.moduleId = moduleId;
    promptWorkspaceState.promptIndex = promptIndex;
    promptWorkspaceState.solution = solution;
    promptWorkspaceState.language = lang;
    promptWorkspaceState.notes = notes;

    const title = document.getElementById('prompt-workspace-title');
    const meta = document.getElementById('prompt-workspace-meta');
    const promptText = document.getElementById('prompt-workspace-prompt');
    const input = document.getElementById('prompt-workspace-input');
    const solutionEl = document.getElementById('prompt-workspace-solution');
    const notesEl = document.getElementById('prompt-workspace-notes');
    const langPill = document.getElementById('prompt-workspace-language');

    if (title) title.textContent = prompt.title || 'Interview Prompt';
    if (meta) meta.textContent = `${module.title} • ${lang.toUpperCase()} • ${prompt.durationMinutes || 20} min`;
    if (promptText) promptText.textContent = prompt.prompt || '';
    if (input) input.value = '';
    if (solutionEl) solutionEl.textContent = 'Submit to reveal the reference solution.';
    if (notesEl) notesEl.textContent = '';
    if (langPill) langPill.textContent = lang.toUpperCase();

    modal.classList.remove('hidden');
}

function closePromptWorkspace() {
    const modal = document.getElementById('prompt-workspace-modal');
    if (modal) modal.classList.add('hidden');
}

function submitPromptWorkspace() {
    const solutionEl = document.getElementById('prompt-workspace-solution');
    const notesEl = document.getElementById('prompt-workspace-notes');
    if (solutionEl) {
        solutionEl.textContent = promptWorkspaceState.solution || 'Reference solution unavailable.';
    }
    if (notesEl && notesEl.textContent.trim().length === 0) {
        notesEl.textContent = promptWorkspaceState.notes || '';
    }
    showToast?.('Compare your code with the reference and note differences.', 'info');
}

function openNotesDownloadModal(itemId) {
    const modal = document.getElementById('notes-download-modal');
    if (!modal) return;
    const item = notesLibrary.find(n => n.id === itemId);
    const title = document.getElementById('notes-download-title');
    const meta = document.getElementById('notes-download-meta');
    const donateLink = document.getElementById('notes-donate-link');
    if (title) title.textContent = item ? item.title : 'Notes PDF';
    if (meta) meta.textContent = item ? `${item.category} • ${item.pages} pages` : '';
    if (donateLink) donateLink.href = item?.url && item.url !== '#' ? item.url : DONATION_URL;
    modal.classList.remove('hidden');
}

function closeNotesDownloadModal() {
    const modal = document.getElementById('notes-download-modal');
    if (modal) modal.classList.add('hidden');
}

// Modal Functions
function openSettings() {
    openModal('settings-modal');
}

function closeSettings() {
    closeModal('settings-modal');
}

function openGlossary() {
    openModal('glossary-modal');
    renderGlossary();
}

function closeGlossary() {
    closeModal('glossary-modal');
}

function openFlashcards() {
    openModal('flashcards-modal');
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
    const moduleLabel = document.getElementById('flashcard-module-label');
    if (moduleLabel) {
        const currentModule = modules.find(m => m.id === appState.selectedFlashcardModule);
        moduleLabel.textContent = currentModule ? currentModule.title : 'All Modules';
    }
}

function closeFlashcards() {
    closeModal('flashcards-modal');
}

const MODAL_IDS = [
    'settings-modal',
    'glossary-modal',
    'flashcards-modal',
    'quiz-modal',
    'study-plan-modal',
    'account-modal',
    'support-modal'
];

function bindClick(id, handler) {
    const el = document.getElementById(id);
    if (!el || typeof handler !== 'function') return null;
    el.addEventListener('click', handler);
    return el;
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'flex';
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}

function closeAllModals() {
    MODAL_IDS.forEach(closeModal);
}

function openStudyPlanModal() {
    openModal('study-plan-modal');
    resetStudyPlanSelection();
}

function closeStudyPlanModal() {
    closeModal('study-plan-modal');
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
    openModal('account-modal');
    const profile = appState.accountProfile || {};
    document.getElementById('account-name').value = profile.name || '';
    document.getElementById('account-email').value = profile.email || '';
    document.getElementById('account-goal').value = profile.goal || 'exploring';
}

function closeAccountModal() {
    closeModal('account-modal');
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
    openModal('support-modal');
}

function closeSupportModal() {
    closeModal('support-modal');
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
    // Try both navigation + new window to maximize compatibility.
    window.location.href = mailtoUrl;
    window.open(mailtoUrl, '_blank');

    // Fallback: copy the message so users can paste if a mail client is not configured.
    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(bodyLines.join('\n')).catch(() => {});
    }
    showToast?.('Support email is ready to send. If no mail app opens, paste from clipboard.', 'success');
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
    const questionPool = quiz?.parts?.[0]?.questions || [];
    if (!quiz || !questionPool.length) return;

    const selection = pickRandomItems(
        questionPool,
        Math.min(QUIZ_CONFIG.questionsPerAttempt, questionPool.length)
    );

    appState.currentQuiz = {
        moduleId,
        questions: selection,
        questionPool,
        currentQuestion: 0,
        answers: [],
        showResults: false,
        score: 0,
        wasPerfect: false
    };

    openModal('quiz-modal');
    renderQuiz();
}

function closeQuiz() {
    closeModal('quiz-modal');
    if (appState.currentQuiz?.wasPerfect) {
        triggerConfetti();
        showToast?.('Congrats on acing that quiz!', 'success');
        updateProgress();
        renderInsights();
        renderAchievements();
        renderModules();
    }
    appState.currentQuiz = null;
}

// Interactive Quiz Library (footer entry)
function openInteractiveQuizLibrary() {
    const modal = document.getElementById('interactive-quiz-modal');
    const select = document.getElementById('interactive-quiz-module');
    if (!modal || !select) return;

    populateInteractiveQuizModules();
    const firstOption = select.options[0];
    const initialModule = interactiveQuizState.moduleId || (firstOption ? firstOption.value : null);
    loadInteractiveQuizModule(initialModule);
    openModal('interactive-quiz-modal');
}

function closeInteractiveQuizLibrary() {
    closeModal('interactive-quiz-modal');
}

function populateInteractiveQuizModules() {
    const select = document.getElementById('interactive-quiz-module');
    if (!select) return;
    const options = Object.entries(quizData)
        .filter(([id, data]) => data?.parts?.[0]?.questions?.length)
        .map(([id, data]) => {
            const module = modules.find(m => m.id === id);
            const title = module?.title || data?.title || id;
            const count = data?.parts?.[0]?.questions?.length || 0;
            return `<option value="${id}">${title} (${count} Qs)</option>`;
        })
        .join('');
    select.innerHTML = options || '<option disabled>No quizzes available</option>';
}

function loadInteractiveQuizModule(moduleId) {
    const select = document.getElementById('interactive-quiz-module');
    if (select && moduleId) select.value = moduleId;
    interactiveQuizState.moduleId = moduleId;
    const questions = quizData[moduleId]?.parts?.[0]?.questions || [];
    interactiveQuizState.questions = questions;
    interactiveQuizState.current = 0;
    interactiveQuizState.answers = new Array(questions.length).fill(null);
    renderInteractiveQuizQuestion();
}

function renderInteractiveQuizQuestion() {
    const body = document.getElementById('interactive-quiz-body');
    const progress = document.getElementById('interactive-quiz-progress');
    if (!body) return;

    const questions = interactiveQuizState.questions || [];
    const total = questions.length;

    if (!total) {
        body.innerHTML = `<div class="p-6 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">No questions available for this module yet.</div>`;
        if (progress) progress.textContent = '';
        return;
    }

    const current = interactiveQuizState.current;
    const question = questions[current];
    const selected = interactiveQuizState.answers[current];

    const feedback = selected === null
        ? ''
        : selected === question.correct
            ? `<p class="text-sm text-emerald-600 font-semibold mt-2">✅ Correct! ${question.explanation || ''}</p>`
            : `<p class="text-sm text-rose-600 font-semibold mt-2">❌ Try again. ${question.explanation || ''}</p>`;

    body.innerHTML = `
        <div class="flex items-center justify-between text-sm text-slate-600 mb-2">
            <span>Question ${current + 1} of ${total}</span>
            <span>${Math.round(((current + 1) / total) * 100)}% through</span>
        </div>
        <div class="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
            <h4 class="text-lg font-semibold text-slate-800 mb-4">${question.question}</h4>
            <div class="space-y-2">
                ${question.options.map((option, idx) => {
                    const isSelected = selected === idx;
                    const isCorrect = idx === question.correct;
                    let stateClass = 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50';
                    if (selected !== null) {
                        if (isCorrect) stateClass = 'border-emerald-500 bg-emerald-50';
                        else if (isSelected) stateClass = 'border-rose-500 bg-rose-50';
                    }
                    return `
                        <button class="w-full text-left p-3 rounded-lg border transition-all duration-200 ${stateClass}"
                            onclick="answerInteractiveQuiz(${idx})">
                            <span class="font-medium text-slate-800">${String.fromCharCode(65 + idx)}. ${option}</span>
                        </button>`;
                }).join('')}
            </div>
            ${feedback}
            <div class="flex justify-between items-center mt-4 gap-3">
                <button class="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 bg-white hover:border-indigo-300 hover:bg-indigo-50 transition"
                    ${current === 0 ? 'disabled' : ''} onclick="prevInteractiveQuizQuestion()">
                    ◀ Previous
                </button>
                <button class="px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 shadow-sm transition"
                    ${current >= total - 1 ? 'disabled' : ''} onclick="nextInteractiveQuizQuestion()">
                    Next ▶
                </button>
            </div>
        </div>
    `;

    if (progress) {
        const answered = interactiveQuizState.answers.filter(a => a !== null).length;
        progress.textContent = `${answered} answered • ${total} total`;
    }
}

function answerInteractiveQuiz(index) {
    interactiveQuizState.answers[interactiveQuizState.current] = index;
    renderInteractiveQuizQuestion();
}

function nextInteractiveQuizQuestion() {
    if (interactiveQuizState.current < interactiveQuizState.questions.length - 1) {
        interactiveQuizState.current++;
        renderInteractiveQuizQuestion();
    }
}

function prevInteractiveQuizQuestion() {
    if (interactiveQuizState.current > 0) {
        interactiveQuizState.current--;
        renderInteractiveQuizQuestion();
    }
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
        const score = appState.currentQuiz.answers.reduce((acc, answer, index) => {
            return acc + (answer === appState.currentQuiz.questions[index].correct ? 1 : 0);
        }, 0);
        const total = appState.currentQuiz.questions.length;
        const perfectScore = score === total;

        appState.currentQuiz.showResults = true;
        appState.currentQuiz.score = score;
        appState.currentQuiz.wasPerfect = perfectScore;

        if (perfectScore) {
            markQuizCompleted(appState.currentQuiz.moduleId);
        } else {
            showToast?.('Score 100% to mark this quiz as complete.', 'info');
        }
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
    const pool =
        appState.currentQuiz.questionPool ||
        quizData[appState.currentQuiz.moduleId]?.parts?.[0]?.questions ||
        [];
    const selection = pickRandomItems(
        pool,
        Math.min(QUIZ_CONFIG.questionsPerAttempt, pool.length)
    );
    appState.currentQuiz.questions = selection;
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
        appState.currentModulePage = 1;

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

function resetDSPlayground() {
    dsState.array = [];
    dsState.stack = [];
    dsState.queue = [];
    dsState.heap = [];
    dsState.graph = { nodes: [], edges: [] };
    dsState.trie = {};
    dsState.tree = null;
    dsState.hashing = null;
    dsState.heapsort = null;
    dsState.rbtree = null;
    dsState.circuits = null;
    dsState.greedy = null;
    dsState.lastAction = 'Reset to defaults.';
    ensureSampleData(dsState.active);
    renderDSPlayground();
}

// =================================
// INITIALIZATION
// =================================

function init() {
    // Load saved state
    loadFromLocalStorage();
    appState.categoryFilter = normalizeCategoryFilter(appState.categoryFilter);
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
    applyReducedMotion();
    applyHighContrast();
    updateDarkMode();
    updateCommentsToggle();
    updateHideCompletedToggle();
    updateCompactLayoutToggle();
    updateToggleState('reduce-motion-toggle', 'reduce-motion-slider', appState.reduceMotion);
    updateToggleState('high-contrast-toggle', 'high-contrast-slider', appState.highContrast);
    updateAccountChip();
    updateProgress();
    renderModules();
    renderInsights();
    renderDailyChallenge();
    renderStudyTip();
    initPlayground();
    initComplexityVisualizer();
    renderDSPlayground();
    renderInterviewExamples();
    attachInlineGlossaryHandlers();

    // Set initial form values
    document.getElementById('search-input').value = appState.searchTerm;
    document.getElementById('difficulty-filter').value = appState.difficultyFilter;
    const notesInput = document.getElementById('notes-input');
    if (notesInput) {
        notesInput.value = loadNotes();
    }

    // Add event listeners
    bindClick('settings-btn', openSettings);
    bindClick('close-settings', closeSettings);
    bindClick('save-settings', closeSettings);

    bindClick('glossary-btn', openGlossary);
    bindClick('close-glossary', closeGlossary);

    bindClick('flashcards-btn', openFlashcards);
    bindClick('close-flashcards', closeFlashcards);

    bindClick('close-quiz', closeQuiz);

    bindClick('account-btn', openAccountModal);
    bindClick('close-account', closeAccountModal);
    bindClick('save-account', saveAccountProfile);

    bindClick('close-study-plan', closeStudyPlanModal);
    bindClick('save-study-plan', saveStudyPlan);
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

    bindClick('close-support', closeSupportModal);
    const supportForm = document.getElementById('support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', submitSupportRequest);
    }

    bindClick('interactive-quiz-btn', openInteractiveQuizLibrary);
    bindClick('close-interactive-quiz', closeInteractiveQuizLibrary);
    const interactiveModuleSelect = document.getElementById('interactive-quiz-module');
    if (interactiveModuleSelect) {
        interactiveModuleSelect.addEventListener('change', (e) => {
            loadInteractiveQuizModule(e.target.value);
        });
    }

    bindClick('reset-btn', resetProgress);

    const reduceMotionToggle = document.getElementById('reduce-motion-toggle');
    if (reduceMotionToggle) {
        reduceMotionToggle.addEventListener('click', () => {
            appState.reduceMotion = !appState.reduceMotion;
            applyReducedMotion();
            updateToggleState('reduce-motion-toggle', 'reduce-motion-slider', appState.reduceMotion);
            saveToLocalStorage();
        });
    }

    const highContrastToggle = document.getElementById('high-contrast-toggle');
    if (highContrastToggle) {
        highContrastToggle.addEventListener('click', () => {
            appState.highContrast = !appState.highContrast;
            applyHighContrast();
            updateToggleState('high-contrast-toggle', 'high-contrast-slider', appState.highContrast);
            saveToLocalStorage();
        });
    }

    const studyToggleButton = document.getElementById('study-session-toggle');
    if (studyToggleButton) {
        studyToggleButton.addEventListener('click', toggleManualStudySession);
    }

    const saveNotesBtn = document.getElementById('save-notes');
    if (saveNotesBtn) {
        saveNotesBtn.addEventListener('click', saveNotes);
    }
    const downloadNotesBtn = document.getElementById('download-notes');
    if (downloadNotesBtn) {
        downloadNotesBtn.addEventListener('click', downloadNotes);
    }

    // Dark mode toggle
    bindClick('dark-mode-toggle', () => {
        appState.darkMode = !appState.darkMode;
        updateDarkMode();
        saveToLocalStorage();
    });

    // Comments toggle
    bindClick('comments-toggle', () => {
        appState.showComments = !appState.showComments;
        updateCommentsToggle();
        renderModules();
        saveToLocalStorage();
    });

    // Close modals on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close all modals with Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });

    const hideCompletedToggle = document.getElementById('hide-completed-toggle');
    if (hideCompletedToggle) {
        hideCompletedToggle.addEventListener('click', () => {
            appState.hideCompletedModules = !appState.hideCompletedModules;
            updateHideCompletedToggle();
            appState.currentModulePage = 1;
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

    const resetDSBtn = document.getElementById('ds-reset-all');
    if (resetDSBtn) {
        resetDSBtn.addEventListener('click', resetDSPlayground);
    }

    // Search and filter
    document.getElementById('search-input').addEventListener('input', (e) => {
        appState.searchTerm = e.target.value;
        appState.currentModulePage = 1;
        renderModules();
        saveToLocalStorage();
    });

    document.getElementById('difficulty-filter').addEventListener('change', (e) => {
        appState.difficultyFilter = e.target.value;
        appState.currentModulePage = 1;
        renderModules();
        saveToLocalStorage();
    });
    document.getElementById('difficulty-filter').addEventListener('input', (e) => {
        appState.difficultyFilter = e.target.value;
        appState.currentModulePage = 1;
        renderModules();
        saveToLocalStorage();
    });

    // Glossary search
    document.getElementById('glossary-search').addEventListener('input', (e) => {
        appState.glossarySearch = e.target.value;
        renderGlossary();
    });

    const paginationContainers = [
        document.getElementById('modules-pagination'),
        document.getElementById('modules-pagination-top')
    ].filter(Boolean);
    paginationContainers.forEach(container => {
        container.addEventListener('click', (event) => {
            const target = event.target.closest('[data-page]');
            if (!target) return;
            const page = Number(target.dataset.page);
            if (Number.isFinite(page)) {
                setModulePage(page);
            }
        });
    });

    const interviewPagination = document.getElementById('interview-pagination');
    if (interviewPagination) {
        interviewPagination.addEventListener('click', (event) => {
            const target = event.target.closest('[data-page]');
            if (!target) return;
            const page = Number(target.dataset.page);
            if (Number.isFinite(page)) {
                renderInterviewExamples(page);
            }
        });
    }

    bindClick('prompt-workspace-submit', submitPromptWorkspace);
    const promptModal = document.getElementById('prompt-workspace-modal');
    if (promptModal) {
        promptModal.addEventListener('click', (e) => {
            if (e.target === promptModal) closePromptWorkspace();
        });
    }

    renderNotesLibrary();
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.value = appState.categoryFilter;
        const handleCategory = (value) => {
            appState.categoryFilter = value;
            appState.currentModulePage = 1;
            renderModules();
            saveToLocalStorage();
        };
        categoryFilter.addEventListener('change', (e) => handleCategory(e.target.value));
        categoryFilter.addEventListener('input', (e) => handleCategory(e.target.value));
    }

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
    studyMetrics = { totalTimeMs: 0, todayMs: 0, todayDate: null };
    saveStudyMetrics();
    studyHabit = { streak: 0, lastDate: null, longestStreak: 0 };
    saveStudyHabit();
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
        appState.currentModulePage = 1;
        renderModules();
        saveToLocalStorage();
    }, 300);
}

function setModulePage(page) {
    const filtered = filterModules();
    const totalPages = Math.max(1, Math.ceil(filtered.length / MODULES_PER_PAGE));
    const nextPage = Math.min(Math.max(1, page), totalPages);
    if (nextPage === appState.currentModulePage) return;
    appState.currentModulePage = nextPage;
    renderModules();
    saveToLocalStorage();
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
    renderInsights();

    const minutes = Math.max(1, Math.round(sessionTime / 60000));
    if (notify) {
        showToast(`Study session logged: ${minutes} min`, 'success');
    }
    trackUsage('study_session_completed', 'Learning');
}

// Enhanced quiz functionality
function getQuizStats() {
    const storedStats = JSON.parse(localStorage.getItem('dsaHubQuizStats') || '{}');
    return storedStats;
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
    if (document.hidden && studyTimer.isActive) {
        endStudySession({ notify: false });
    }
});

// Start the application when DOM is loaded
function safeInit() {
    try {
        init();
    } catch (err) {
        console.error('Init failed', err);
        const grid = document.getElementById('modules-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="text-center p-6 rounded-xl bg-white shadow">
                    <p class="font-semibold text-rose-600">Modules failed to load.</p>
                    <p class="text-sm text-slate-600 mt-1">Open console for details.</p>
                </div>
            `;
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        safeInit();
        optimizeForMobile();
        registerServiceWorker();
    });
} else {
    safeInit();
    optimizeForMobile();
    registerServiceWorker();
}

// Add window resize handler for responsive adjustments
window.addEventListener('resize', () => {
    optimizeForMobile();
    updateHeaderShrink(); // Recalculate header shrinking on resize
});

console.log('Java DSA Learning Hub - All systems loaded successfully! 🚀');

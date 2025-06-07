"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Code, Play, Save, Download, RotateCcw, Copy, FileText, Terminal } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface CodeTemplate {
  id: string
  name: string
  language: string
  code: string
  description: string
}

const codeTemplates: CodeTemplate[] = [
  {
    id: "html-basic",
    name: "Basic HTML",
    language: "html",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f0f0f0;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to My Web Page!</h1>
        <p>This is a simple HTML page with some styling.</p>
        <button class="button" onclick="alert('Hello World!')">Click Me!</button>
        
        <h2>Features:</h2>
        <ul>
            <li>Responsive design</li>
            <li>Interactive elements</li>
            <li>Clean styling</li>
        </ul>
    </div>
    
    <script>
        console.log('Page loaded successfully!');
        
        // Add some interactivity
        document.addEventListener('DOMContentLoaded', function() {
            const button = document.querySelector('.button');
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });
    </script>
</body>
</html>`,
    description: "A complete HTML page with CSS and JavaScript",
  },
  {
    id: "js-basics",
    name: "JavaScript Basics",
    language: "javascript",
    code: `// JavaScript Fundamentals Demo

// Variables and Data Types
let name = "StudyBridge";
const year = 2024;
let isActive = true;
let numbers = [1, 2, 3, 4, 5];
let user = {
    name: "John Doe",
    age: 20,
    major: "Computer Science"
};

console.log("Welcome to", name, "in", year);

// Functions
function greetUser(userName) {
    return \`Hello, \${userName}! Welcome to our coding playground.\`;
}

// Arrow function
const calculateSum = (a, b) => a + b;

// Array methods
const doubledNumbers = numbers.map(num => num * 2);
const evenNumbers = numbers.filter(num => num % 2 === 0);

// Object manipulation
function displayUserInfo(userObj) {
    console.log(\`Name: \${userObj.name}\`);
    console.log(\`Age: \${userObj.age}\`);
    console.log(\`Major: \${userObj.major}\`);
}

// Async function example
async function fetchData() {
    try {
        // Simulating API call
        const response = await new Promise(resolve => 
            setTimeout(() => resolve("Data fetched successfully!"), 1000)
        );
        console.log(response);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Event handling simulation
function handleButtonClick() {
    console.log("Button clicked!");
    alert("Interactive JavaScript in action!");
}

// Execute examples
console.log(greetUser("Student"));
console.log("Sum of 5 + 3 =", calculateSum(5, 3));
console.log("Doubled numbers:", doubledNumbers);
console.log("Even numbers:", evenNumbers);
displayUserInfo(user);
fetchData();

// DOM manipulation (if running in browser)
if (typeof document !== 'undefined') {
    document.body.innerHTML += \`
        <div style="padding: 20px; font-family: Arial;">
            <h2>JavaScript Output</h2>
            <p>Check the console for detailed output!</p>
            <button onclick="handleButtonClick()">Test Button</button>
        </div>
    \`;
}`,
    description: "JavaScript fundamentals with examples",
  },
  {
    id: "python-basics",
    name: "Python Basics",
    language: "python",
    code: `# Python Fundamentals Demo

# Variables and Data Types
name = "StudyBridge"
year = 2024
is_active = True
numbers = [1, 2, 3, 4, 5]
user = {
    "name": "John Doe",
    "age": 20,
    "major": "Computer Science"
}

print(f"Welcome to {name} in {year}")

# Functions
def greet_user(user_name):
    return f"Hello, {user_name}! Welcome to our coding playground."

def calculate_sum(a, b):
    return a + b

# List comprehensions
doubled_numbers = [num * 2 for num in numbers]
even_numbers = [num for num in numbers if num % 2 == 0]

# Dictionary operations
def display_user_info(user_dict):
    print(f"Name: {user_dict['name']}")
    print(f"Age: {user_dict['age']}")
    print(f"Major: {user_dict['major']}")

# Class example
class Student:
    def __init__(self, name, age, major):
        self.name = name
        self.age = age
        self.major = major
        self.courses = []
    
    def add_course(self, course):
        self.courses.append(course)
        print(f"Added {course} to {self.name}'s courses")
    
    def get_info(self):
        return f"{self.name}, {self.age} years old, studying {self.major}"

# Error handling
def safe_divide(a, b):
    try:
        result = a / b
        return f"{a} / {b} = {result}"
    except ZeroDivisionError:
        return "Error: Cannot divide by zero!"
    except Exception as e:
        return f"Error: {e}"

# File operations simulation
def create_study_notes():
    notes = """
    Python Study Notes:
    1. Python is interpreted language
    2. Indentation matters in Python
    3. Lists are mutable, tuples are immutable
    4. Dictionaries store key-value pairs
    5. Functions are first-class objects
    """
    return notes

# Execute examples
print(greet_user("Student"))
print(f"Sum of 5 + 3 = {calculate_sum(5, 3)}")
print(f"Doubled numbers: {doubled_numbers}")
print(f"Even numbers: {even_numbers}")

print("\\n--- User Information ---")
display_user_info(user)

print("\\n--- Student Class Demo ---")
student = Student("Alice", 19, "Mathematics")
student.add_course("Calculus")
student.add_course("Linear Algebra")
print(student.get_info())
print(f"Courses: {student.courses}")

print("\\n--- Error Handling Demo ---")
print(safe_divide(10, 2))
print(safe_divide(10, 0))

print("\\n--- Study Notes ---")
print(create_study_notes())

# Advanced: Generator example
def fibonacci_generator(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print("\\n--- Fibonacci Sequence (first 10 numbers) ---")
fib_numbers = list(fibonacci_generator(10))
print(fib_numbers)`,
    description: "Python fundamentals with practical examples",
  },
  {
    id: "css-flexbox",
    name: "CSS Flexbox Layout",
    language: "css",
    code: `/* CSS Flexbox Layout Demo */

/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

/* Main container */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Header with flexbox */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #667eea;
}

.nav {
    display: flex;
    gap: 1rem;
}

.nav-item {
    padding: 0.5rem 1rem;
    background: #667eea;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.3s ease;
}

.nav-item:hover {
    background: #5a6fd8;
}

/* Main content area */
.main-content {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
}

.content {
    flex: 2;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sidebar {
    flex: 1;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Card grid using flexbox */
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem 0;
}

.card {
    flex: 1 1 300px;
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

.card h3 {
    color: #667eea;
    margin-bottom: 1rem;
}

/* Feature showcase */
.features {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 2rem 0;
}

.feature {
    text-align: center;
    flex: 1;
}

.feature-icon {
    width: 60px;
    height: 60px;
    background: #667eea;
    border-radius: 50%;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
}

/* Footer */
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

/* Responsive design */
@media (max-width: 768px) {
    .header {
        flex-direction: column;
        gap: 1rem;
    }
    
    .main-content {
        flex-direction: column;
    }
    
    .features {
        flex-direction: column;
        gap: 2rem;
    }
    
    .card-grid {
        flex-direction: column;
    }
}

/* Animation examples */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.animated {
    animation: fadeIn 0.6s ease-out;
}

/* Utility classes */
.text-center { text-align: center; }
.text-primary { color: #667eea; }
.bg-primary { background-color: #667eea; }
.rounded { border-radius: 10px; }
.shadow { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }`,
    description: "Modern CSS with Flexbox layouts and animations",
  },
]

export default function CodePlaygroundPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("html")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [savedProjects, setSavedProjects] = useState<any[]>([])
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Load default template
    const defaultTemplate = codeTemplates.find((t) => t.language === selectedLanguage)
    if (defaultTemplate) {
      setCode(defaultTemplate.code)
    }
  }, [selectedLanguage])

  const runCode = () => {
    setIsRunning(true)
    setOutput("")

    try {
      if (selectedLanguage === "html") {
        // For HTML, render in iframe
        if (iframeRef.current) {
          const iframe = iframeRef.current
          iframe.srcdoc = code
        }
      } else if (selectedLanguage === "javascript") {
        // For JavaScript, capture console output
        const originalLog = console.log
        const originalError = console.error
        let output = ""

        console.log = (...args) => {
          output += args.join(" ") + "\n"
          originalLog(...args)
        }

        console.error = (...args) => {
          output += "ERROR: " + args.join(" ") + "\n"
          originalError(...args)
        }

        try {
          // Create a function to execute the code
          const func = new Function(code)
          func()
          setOutput(output || "Code executed successfully!")
        } catch (error) {
          setOutput(`Error: ${error}`)
        } finally {
          console.log = originalLog
          console.error = originalError
        }
      } else if (selectedLanguage === "python") {
        // For Python, simulate execution (in real app, you'd use a Python interpreter)
        setOutput(
          "Python code simulation:\n\n" +
            "Note: This is a simulation. In a real implementation, you would use:\n" +
            "- Pyodide for client-side Python execution\n" +
            "- Or a backend service to execute Python code\n\n" +
            "Your Python code:\n" +
            code,
        )
      } else if (selectedLanguage === "css") {
        // For CSS, show a preview
        const htmlPreview = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>${code}</style>
          </head>
          <body>
            <div class="container">
              <header class="header">
                <div class="logo">StudyBridge</div>
                <nav class="nav">
                  <a href="#" class="nav-item">Home</a>
                  <a href="#" class="nav-item">About</a>
                  <a href="#" class="nav-item">Contact</a>
                </nav>
              </header>
              
              <div class="main-content">
                <main class="content">
                  <h1>CSS Flexbox Demo</h1>
                  <p>This demonstrates the CSS styles you've written.</p>
                  
                  <div class="card-grid">
                    <div class="card animated">
                      <h3>Feature 1</h3>
                      <p>This is a sample card with your custom styling.</p>
                    </div>
                    <div class="card animated">
                      <h3>Feature 2</h3>
                      <p>Another card to show the grid layout.</p>
                    </div>
                    <div class="card animated">
                      <h3>Feature 3</h3>
                      <p>Third card completing the layout.</p>
                    </div>
                  </div>
                </main>
                
                <aside class="sidebar">
                  <h3>Sidebar</h3>
                  <p>This is the sidebar content area.</p>
                </aside>
              </div>
              
              <div class="features">
                <div class="feature">
                  <div class="feature-icon">🎨</div>
                  <h4>Design</h4>
                  <p>Beautiful layouts</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">⚡</div>
                  <h4>Fast</h4>
                  <p>Quick loading</p>
                </div>
                <div class="feature">
                  <div class="feature-icon">📱</div>
                  <h4>Responsive</h4>
                  <p>Mobile friendly</p>
                </div>
              </div>
              
              <footer class="footer">
                <p>&copy; 2024 StudyBridge. CSS Demo Page.</p>
              </footer>
            </div>
          </body>
          </html>
        `

        if (iframeRef.current) {
          iframeRef.current.srcdoc = htmlPreview
        }
      }
    } catch (error) {
      setOutput(`Error: ${error}`)
    }

    setIsRunning(false)
  }

  const saveProject = () => {
    const project = {
      id: Date.now().toString(),
      name: `${selectedLanguage}-project-${Date.now()}`,
      language: selectedLanguage,
      code,
      createdAt: new Date().toISOString(),
    }
    setSavedProjects([...savedProjects, project])
    alert("Project saved successfully!")
  }

  const loadTemplate = (templateId: string) => {
    const template = codeTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedLanguage(template.language)
      setCode(template.code)
    }
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `code.${selectedLanguage === "javascript" ? "js" : selectedLanguage}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    alert("Code copied to clipboard!")
  }

  const resetCode = () => {
    const template = codeTemplates.find((t) => t.language === selectedLanguage)
    if (template) {
      setCode(template.code)
    } else {
      setCode("")
    }
    setOutput("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Code className="h-8 w-8 mr-3 text-blue-600" />
          Live Coding Playground
        </h1>
        <p className="text-gray-600">Practice coding with instant feedback and live preview</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Code Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Code Editor</CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant="outline">{selectedLanguage.toUpperCase()}</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={runCode} disabled={isRunning}>
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
                <Button variant="outline" onClick={saveProject}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={copyCode}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" onClick={downloadCode}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" onClick={resetCode}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`Write your ${selectedLanguage} code here...`}
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>

        {/* Output and Templates */}
        <div className="space-y-6">
          {/* Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Code Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {codeTemplates.map((template) => (
                  <Button
                    key={template.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => loadTemplate(template.id)}
                  >
                    <Badge variant="secondary" className="mr-2">
                      {template.language.toUpperCase()}
                    </Badge>
                    {template.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Terminal className="h-5 w-5 mr-2" />
                Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedLanguage === "html" || selectedLanguage === "css" ? (
                <div className="border rounded-lg overflow-hidden">
                  <iframe ref={iframeRef} className="w-full h-64" title="Code Output" sandbox="allow-scripts" />
                </div>
              ) : (
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[200px] whitespace-pre-wrap">
                  {output || 'Click "Run Code" to see output...'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Saved Projects */}
          {savedProjects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Save className="h-5 w-5 mr-2" />
                  Saved Projects ({savedProjects.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {savedProjects.slice(-5).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-gray-500">{new Date(project.createdAt).toLocaleDateString()}</div>
                      </div>
                      <Badge variant="outline">{project.language}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Features Info */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Play className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold">Instant Execution</h3>
            </div>
            <p className="text-sm text-gray-600">
              Run your code instantly and see results in real-time with our live execution environment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Code Templates</h3>
            </div>
            <p className="text-sm text-gray-600">
              Start with pre-built templates for common programming tasks and learn by example.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Save className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold">Save & Share</h3>
            </div>
            <p className="text-sm text-gray-600">
              Save your projects and share them with others. Download your code anytime.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

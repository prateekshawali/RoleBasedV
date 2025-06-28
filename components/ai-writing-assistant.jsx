"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, Minimize2, Maximize2, X, User, Lightbulb, FileText, Edit, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AIWritingAssistant({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hi! I'm your AI Writing Assistant. I can help you write technical articles, brainstorm ideas, improve your writing, and answer questions. What would you like to work on today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isMinimized, setIsMinimized] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const quickPrompts = [
    { icon: FileText, text: "Write an article about...", color: "bg-blue-100 text-blue-700" },
    { icon: Lightbulb, text: "Give me topic ideas", color: "bg-yellow-100 text-yellow-700" },
    { icon: Edit, text: "Improve my writing", color: "bg-green-100 text-green-700" },
    { icon: Sparkles, text: "Create an outline", color: "bg-purple-100 text-purple-700" },
  ]

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    // Article writing responses
    if (lowerMessage.includes("write") && lowerMessage.includes("article")) {
      return `I'd be happy to help you write an article! Here's a structured approach:

**1. Choose Your Topic**
- Pick something you're passionate about
- Consider your audience's needs
- Focus on practical, actionable content

**2. Create an Outline**
- Introduction with a hook
- 3-5 main sections
- Conclusion with key takeaways

**3. Writing Tips**
- Start with a compelling introduction
- Use clear, concise language
- Include code examples where relevant
- Add practical examples

What specific topic would you like to write about? I can help you create a detailed outline and provide writing guidance!`
    }

    // Topic ideas
    if (lowerMessage.includes("topic") || lowerMessage.includes("idea")) {
      return `Here are some trending technical topics perfect for knowledge sharing:

**Frontend Development:**
- React 18 New Features & Best Practices
- CSS Grid vs Flexbox: When to Use What
- Web Performance Optimization Techniques

**Backend Development:**
- API Design Patterns & Best Practices
- Database Optimization Strategies
- Microservices Architecture Guide

**DevOps & Tools:**
- Docker Containerization for Beginners
- CI/CD Pipeline Setup Guide
- Monitoring & Logging Best Practices

**Emerging Technologies:**
- AI Integration in Web Development
- WebAssembly Practical Applications
- Progressive Web Apps (PWA) Guide

Which area interests you most? I can help you develop any of these topics into a comprehensive article!`
    }

    // Writing improvement
    if (lowerMessage.includes("improve") || lowerMessage.includes("better")) {
      return `Here are key strategies to improve your technical writing:

**Structure & Clarity:**
- Use clear headings and subheadings
- Write short, focused paragraphs
- Include bullet points for lists
- Add code examples with explanations

**Engagement:**
- Start with a problem or question
- Use real-world examples
- Include screenshots or diagrams
- End with actionable takeaways

**Technical Writing Best Practices:**
- Define technical terms clearly
- Use consistent terminology
- Include working code examples
- Test all code before publishing

**Review Process:**
- Read aloud to check flow
- Have someone else review
- Check for grammar and spelling
- Verify all links and code work

Would you like me to review a specific piece of writing or help you with a particular aspect?`
    }

    // Outline creation
    if (lowerMessage.includes("outline") || lowerMessage.includes("structure")) {
      return `Here's a proven article outline structure:

**1. Introduction (10-15%)**
- Hook: Start with a problem or interesting fact
- Context: Why this topic matters
- Preview: What readers will learn

**2. Background/Problem (15-20%)**
- Current challenges
- Why existing solutions fall short
- What you'll address

**3. Main Content (60-70%)**
- Section 1: Core concept with examples
- Section 2: Implementation details
- Section 3: Best practices & tips
- Section 4: Common pitfalls to avoid

**4. Conclusion (10-15%)**
- Summarize key points
- Provide next steps
- Include additional resources

**Pro Tips:**
- Use descriptive subheadings
- Include code examples in each section
- Add diagrams or screenshots
- End each section with a key takeaway

What topic would you like me to create a specific outline for?`
    }

    // Code examples
    if (lowerMessage.includes("code") || lowerMessage.includes("example")) {
      return `I can help you create clear, well-documented code examples! Here's how to make them effective:

**Code Example Best Practices:**

\`\`\`javascript
// ✅ Good: Clear, commented code
function calculateUserScore(user) {
  // Validate input
  if (!user || !user.activities) {
    return 0;
  }
  
  // Calculate base score from activities
  const baseScore = user.activities.reduce((total, activity) => {
    return total + (activity.points || 0);
  }, 0);
  
  // Apply multiplier for consistency
  const consistencyMultiplier = user.streakDays > 7 ? 1.2 : 1.0;
  
  return Math.round(baseScore * consistencyMultiplier);
}
\`\`\`

**What makes this good:**
- Clear function name
- Input validation
- Helpful comments
- Readable variable names
- Error handling

What kind of code example would you like help with?`
    }

    // Default helpful response
    return `I'm here to help with your technical writing! I can assist with:

**📝 Article Writing**
- Topic brainstorming
- Content structure and outlines
- Writing guidance and tips

**💡 Content Ideas**
- Trending technical topics
- Audience-specific suggestions
- Problem-solving approaches

**✨ Writing Improvement**
- Clarity and readability
- Technical accuracy
- Engagement techniques

**🔧 Practical Help**
- Code examples and explanations
- Documentation best practices
- Review and feedback

Just tell me what you'd like to work on, or click one of the quick prompts below to get started!`
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse = {
          id: Date.now() + 1,
          type: "bot",
          content: generateAIResponse(inputMessage),
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    ) // 1.5-2.5 seconds
  }

  const handleQuickPrompt = (promptText) => {
    setInputMessage(promptText)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card
        className={`bg-white shadow-2xl border-2 border-blue-200 transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        }`}
      >
        {/* Header */}
        <CardHeader className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">AI Writing Assistant</CardTitle>
                {!isMinimized && (
                  <p className="text-xs text-blue-100">{isTyping ? "Thinking..." : "Ready to help you write!"}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20 p-1 h-8 w-8"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 p-1 h-8 w-8" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "bot" && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                  {message.type === "user" && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="p-4 border-t bg-gray-50">
                <p className="text-xs text-gray-600 mb-3">Quick prompts to get started:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className={`${prompt.color} border-0 text-xs h-auto p-2 justify-start`}
                      onClick={() => handleQuickPrompt(prompt.text)}
                    >
                      <prompt.icon className="w-3 h-3 mr-1" />
                      {prompt.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about writing..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

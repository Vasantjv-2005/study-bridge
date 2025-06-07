"use client"

import type * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Globe,
  Award,
  Brain,
  Code,
  CreditCard,
  Calendar,
  Calculator,
  BookOpen,
  Video,
  FileText,
  Map,
  Bot,
  Trophy,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  User,
  Home,
  HelpCircle,
  VideoIcon,
  Zap,
  Lightbulb,
  PenTool,
  BarChart3,
  Shield,
  MessageSquare,
  Lock,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

// Navigation data
const navigationData = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Questions",
      url: "/questions",
      icon: HelpCircle,
    },
    {
      title: "Materials",
      url: "/materials",
      icon: BookOpen,
    },
    {
      title: "Video Chat",
      url: "/chat",
      icon: VideoIcon,
    },
  ],
  coreTools: [
    {
      title: "Interactive Quiz Generator",
      url: "/tools/quiz-generator",
      icon: Brain,
      description: "Auto-grade quizzes with explanations",
    },
    {
      title: "Live Coding Playground",
      url: "/tools/code-playground",
      icon: Code,
      description: "Practice coding in-browser",
    },
    {
      title: "Flashcards System",
      url: "/tools/flashcards",
      icon: CreditCard,
      description: "Spaced repetition learning",
    },
    {
      title: "Progress Tracker",
      url: "/tools/progress",
      icon: BarChart3,
      description: "Track your learning journey",
    },
    {
      title: "Video Lessons",
      url: "/tools/video-lessons",
      icon: Video,
      description: "Watch and take notes",
    },
  ],
  learningTools: [
    {
      title: "AI Doubt Solver",
      url: "/tools/ai-solver",
      icon: Bot,
      description: "Get instant explanations",
    },
    {
      title: "Mind Mapping Tool",
      url: "/tools/mind-map",
      icon: Map,
      description: "Visualize concepts",
    },
    {
      title: "Note-Taking Editor",
      url: "/tools/notes",
      icon: PenTool,
      description: "Smart note taking",
    },
  ],
  utilityTools: [
    {
      title: "Calculator Suite",
      url: "/tools/calculator",
      icon: Calculator,
      description: "Math & science tools",
    },
    {
      title: "Study Calendar",
      url: "/tools/calendar",
      icon: Calendar,
      description: "Schedule & reminders",
    },
    {
      title: "Resume Builder",
      url: "/tools/resume",
      icon: FileText,
      description: "Create academic CV",
    },
  ],
  community: [
    {
      title: "Discussion Forum",
      url: "/community/forum",
      icon: MessageSquare,
      description: "Ask and answer",
    },
    {
      title: "Leaderboard",
      url: "/community/leaderboard",
      icon: Trophy,
      description: "Rankings & badges",
    },
    {
      title: "Study Groups",
      url: "/community/groups",
      icon: Users,
      description: "Join study groups",
    },
  ],
  userManagement: [
    {
      title: "Secure Login",
      url: "/auth/login",
      icon: Lock,
      description: "Email/password or Google login",
    },
    {
      title: "User Profile",
      url: "/profile",
      icon: User,
      description: "Manage your profile",
    },
  ],
  admin: [
    {
      title: "Admin Dashboard",
      url: "/admin",
      icon: Shield,
      description: "Manage platform",
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: Users,
      description: "Manage users",
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart3,
      description: "Platform insights",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const handleNavigation = (url: string) => {
    router.push(url)
    setOpenMobile(false)
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center space-x-2 px-2 py-1">
              <Globe className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StudyBridge
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    onClick={() => handleNavigation(item.url)}
                  >
                    <button className="w-full flex items-center">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Core Educational Tools */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            Core Educational Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.coreTools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.description}>
                    <button className="w-full flex items-center" onClick={() => handleNavigation(item.url)}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Learning Enhancement Tools */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            <Lightbulb className="h-4 w-4 mr-2" />
            Learning Enhancement
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.learningTools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.description}>
                    <button className="w-full flex items-center" onClick={() => handleNavigation(item.url)}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Utility Tools */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Utility Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.utilityTools.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.description}>
                    <button className="w-full flex items-center" onClick={() => handleNavigation(item.url)}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Community */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Community
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.community.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.description}>
                    <button className="w-full flex items-center" onClick={() => handleNavigation(item.url)}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            User Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.userManagement.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.description}>
                    <button className="w-full flex items-center" onClick={() => handleNavigation(item.url)}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section (only for admins) */}
        {user?.user_metadata?.role === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationData.admin.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.description}>
                      <button className="w-full flex items-center" onClick={() => handleNavigation(item.url)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.user_metadata?.avatar_url || "/placeholder.svg"} />
                    <AvatarFallback>
                      {user?.user_metadata?.first_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{user?.user_metadata?.first_name || "User"}</div>
                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem onClick={() => handleNavigation("/profile")}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("/settings")}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Points Display */}
        <div className="px-2 py-1">
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
            <Award className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">1,250 pts</span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

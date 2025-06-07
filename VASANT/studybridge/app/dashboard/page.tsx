import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  BookOpen,
  Calendar,
  Globe,
  MessageCircle,
  Plus,
  Star,
  TrendingUp,
  Video,
  Award,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { AuthGuard } from "@/components/auth-guard"

export default function Dashboard() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">StudyBridge</span>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard" className="text-blue-600 font-medium">
                  Dashboard
                </Link>
                <Link href="/questions" className="text-gray-600 hover:text-blue-600">
                  Questions
                </Link>
                <Link href="/materials" className="text-gray-600 hover:text-blue-600">
                  Materials
                </Link>
                <Link href="/chat" className="text-gray-600 hover:text-blue-600">
                  Video Chat
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">1,250 pts</span>
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
            <p className="text-gray-600">Ready to learn and help others today?</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Questions Answered</p>
                        <p className="text-2xl font-bold text-green-600">23</p>
                      </div>
                      <MessageCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Materials Shared</p>
                        <p className="text-2xl font-bold text-blue-600">12</p>
                      </div>
                      <BookOpen className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Video Sessions</p>
                        <p className="text-2xl font-bold text-purple-600">8</p>
                      </div>
                      <Video className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Streak Days</p>
                        <p className="text-2xl font-bold text-orange-600">15</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest interactions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="questions" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="questions">Questions</TabsTrigger>
                      <TabsTrigger value="materials">Materials</TabsTrigger>
                      <TabsTrigger value="sessions">Sessions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="questions" className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4 p-4 border rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>MK</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">Maria K.</span>
                              <Badge variant="secondary">Brazil</Badge>
                              <span className="text-sm text-gray-500">2 hours ago</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              How do I solve quadratic equations using the quadratic formula?
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MessageCircle className="h-3 w-3 mr-1" />3 answers
                              </span>
                              <Badge className="bg-blue-100 text-blue-700">Mathematics</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 border rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>YT</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">Yuki T.</span>
                              <Badge variant="secondary">Japan</Badge>
                              <span className="text-sm text-gray-500">5 hours ago</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Can someone explain the difference between mitosis and meiosis?
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MessageCircle className="h-3 w-3 mr-1" />1 answer
                              </span>
                              <Badge className="bg-green-100 text-green-700">Biology</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="materials" className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">Calculus Study Guide</span>
                              <Badge className="bg-blue-100 text-blue-700">Mathematics</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              Comprehensive guide covering derivatives and integrals
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Star className="h-3 w-3 mr-1" />
                                4.8 rating
                              </span>
                              <span>Downloaded 45 times</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="sessions" className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4 p-4 border rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>AS</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">Ahmed S.</span>
                              <Badge variant="secondary">Egypt</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Physics problem-solving session</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />1 hour
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Yesterday
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <span>Your Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Level 3 Helper</span>
                      <span>1,250 / 2,000 pts</span>
                    </div>
                    <Progress value={62.5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Questions Answered</span>
                      <Badge variant="secondary">23/30</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Materials Shared</span>
                      <Badge variant="secondary">12/15</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Video Sessions</span>
                      <Badge variant="secondary">8/10</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span>Upcoming Sessions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>LM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Chemistry Study Group</p>
                      <p className="text-xs text-gray-600">Today, 3:00 PM</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Spanish Practice</p>
                      <p className="text-xs text-gray-600">Tomorrow, 10:00 AM</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Global Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-green-600" />
                    <span>Global Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>🇧🇷 Maria just answered a math question</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>🇯🇵 Yuki shared biology notes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>🇪🇬 Ahmed started a physics session</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>🇮🇳 Priya joined the platform</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/questions">
                      <Plus className="h-4 w-4 mr-2" />
                      Ask a Question
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/materials">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Share Materials
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/chat">
                      <Video className="h-4 w-4 mr-2" />
                      Schedule Session
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

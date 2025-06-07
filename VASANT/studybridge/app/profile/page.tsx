import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Edit,
  MapPin,
  Calendar,
  Award,
  Star,
  BookOpen,
  MessageCircle,
  Video,
  Globe,
  Languages,
  GraduationCap,
  Trophy,
  Users,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
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
              <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold mb-2">John Doe</h2>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">🇺🇸 United States</span>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Joined March 2024</span>
                </div>
                <Button className="w-full mb-3">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>4.8 rating</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>156 helped</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  <span>Level Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Level 3 Helper</span>
                    <span>1,250 / 2,000 pts</span>
                  </div>
                  <Progress value={62.5} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">750 points to Level 4</p>
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

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Languages className="h-5 w-5 text-blue-600" />
                  <span>Languages</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">English</span>
                  <Badge className="bg-green-100 text-green-700">Native</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Spanish</span>
                  <Badge className="bg-blue-100 text-blue-700">Intermediate</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">French</span>
                  <Badge className="bg-yellow-100 text-yellow-700">Beginner</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Subjects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                  <span>Expertise</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="bg-blue-100 text-blue-700 mr-2 mb-2">Mathematics</Badge>
                <Badge className="bg-green-100 text-green-700 mr-2 mb-2">Computer Science</Badge>
                <Badge className="bg-purple-100 text-purple-700 mr-2 mb-2">Physics</Badge>
                <Badge className="bg-orange-100 text-orange-700 mr-2 mb-2">Statistics</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">23</div>
                  <div className="text-sm text-gray-600">Questions Answered</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Materials Shared</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Video className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <div className="text-sm text-gray-600">Video Sessions</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">1,250</div>
                  <div className="text-sm text-gray-600">Total Points</div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Activity & Contributions</CardTitle>
                <CardDescription>Your recent activity on StudyBridge</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="questions" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="questions">Questions</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>

                  <TabsContent value="questions" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-l-green-500 pl-4 py-2">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className="bg-green-100 text-green-700">Answered</Badge>
                          <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        <h4 className="font-medium">How to solve quadratic equations?</h4>
                        <p className="text-sm text-gray-600">Provided step-by-step solution with examples</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                          <span className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            5.0 rating
                          </span>
                          <span>+50 points earned</span>
                        </div>
                      </div>

                      <div className="border-l-4 border-l-blue-500 pl-4 py-2">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge className="bg-blue-100 text-blue-700">Asked</Badge>
                          <span className="text-sm text-gray-500">1 day ago</span>
                        </div>
                        <h4 className="font-medium">Best practices for algorithm optimization?</h4>
                        <p className="text-sm text-gray-600">Looking for advice on improving code efficiency</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                          <span>3 answers received</span>
                          <span>Marked as solved</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="materials" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">Linear Algebra Study Guide</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            Comprehensive notes on matrices and vector spaces
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              4.9 (15 reviews)
                            </span>
                            <span>Downloaded 89 times</span>
                            <span>+75 points earned</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="sessions" className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 border rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>MK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">Calculus Tutoring Session</h4>
                          <p className="text-sm text-gray-600 mb-2">Helped Maria with integration problems</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              60 minutes
                            </span>
                            <span className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              5.0 rating
                            </span>
                            <span>+100 points earned</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="achievements" className="space-y-4 mt-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                          <Trophy className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-yellow-800">First Answer</h4>
                          <p className="text-sm text-yellow-600">Answered your first question</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Star className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800">Helpful Helper</h4>
                          <p className="text-sm text-blue-600">Received 10 five-star ratings</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800">Knowledge Sharer</h4>
                          <p className="text-sm text-green-600">Uploaded 10 study materials</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Video className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-800">Session Master</h4>
                          <p className="text-sm text-purple-600">Completed 5 video sessions</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

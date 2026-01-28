"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Github,
  Mail,
  Linkedin,
  ExternalLink,
  Award,
  Code,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
  Palette,
  ShoppingCart,
  Brain,
  Share2,
  Video,
  Package,
  Pizza,
  CheckSquare,
} from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { CoverLetterSection } from "@/components/cover-letter"

interface Certificate {
  id: string
  title: string
  organization: string
  imageUrl: string
  date: string
  description: string
}

export default function Home() {
  const professionalCertificates: Certificate[] = [
    {
      id: "css-cert",
      title: "CSS Certification",
      organization: "One Roadmap",
      imageUrl: "/css-skill-certificate.png",
      date: "May 30, 2025",
      description: "Passed the One Roadmap Skill Certification Test in CSS styling and web design.",
    },
  ]

  const primaryCertificates: Certificate[] = [
    {
      id: "html-css-udemy",
      title: "Build Responsive Real-World Websites with HTML and CSS",
      organization: "Udemy",
      imageUrl: "/html-css-udemy-certificate.png",
      date: "April 12, 2025",
      description: "Completed 37.5 hour course on building responsive websites with HTML and CSS.",
    },
    {
      id: "python-master-udemy",
      title: "Learn Python Programming - Beginner to Master",
      organization: "Udemy",
      imageUrl: "/python-master-udemy-certificate.png",
      date: "May 29, 2025",
      description: "Completed 61.5 hour comprehensive Python programming course.",
    },
    {
      id: "python-assessment",
      title: "Python Assessment",
      organization: "LearnTube.ai",
      imageUrl: "/python-assessment-certificate.png",
      date: "June 02, 2025",
      description: "Successfully completed Python Assessment with LearnTube.ai.",
    },
    {
      id: "wordpress-master",
      title: "WordPress Masterclass 2025",
      organization: "Udemy",
      imageUrl: "/wordpress-master-certificate.png",
      date: "May 12, 2025",
      description: "Completed 8.5 hour WordPress Masterclass course.",
    },
    {
      id: "python-data-science",
      title: "Python 101 for Data Science",
      organization: "Cognitive Class (IBM)",
      imageUrl: "/excel-certificate.png",
      date: "June 13, 2025",
      description: "Successfully completed Python 101 for Data Science course powered by IBM Developer Skills Network.",
    },
  ]

  const internshipCertificates: Certificate[] = [
    {
      id: "elevate-labs-best-performer",
      title: "Web Development Internship - Best Performer",
      organization: "Elevate Labs & Skill India",
      imageUrl: "/elevate-labs-best-performer.png",
      date: "June 23 - July 28, 2025",
      description:
        "Completed Web Development Internship at Elevate Labs with Best Performer recognition, demonstrating exceptional skills and dedication.",
    },
    {
      id: "codveda-internship-new",
      title: "Frontend Development Internship",
      organization: "Codveda Technologies",
      imageUrl: "/codveda-internship-new.png",
      date: "July 2025 - August 2025",
      description:
        "Successfully completed Frontend Development internship with Codveda Technologies, demonstrating remarkable dedication and strong desire to learn.",
    },
    {
      id: "oasis-infobyte-new",
      title: "Web Development and Designing Internship",
      organization: "OASIS INFOBYTE",
      imageUrl: "/oasis-infobyte-new.png",
      date: "July 5 - August 15, 2025",
      description:
        "Successfully completed 1 month AICTE OIB-SIP internship in Web Development and Designing with wonderful remarks.",
    },
    {
      id: "facemood-app-internship",
      title: "FaceMood App Internship",
      organization: "Course Central",
      imageUrl: "/infosys-excel-certificate.png",
      date: "July 17, 2025",
      description:
        "Successfully completed summer internship project on FaceMood App with Course Central in collaboration with TRYST IIT DELHI.",
    },
    {
      id: "electro-zone-internship",
      title: "Electro-Zone E-Commerce Platform Internship",
      organization: "Course Central",
      imageUrl: "/tata-data-analytics-certificate.png",
      date: "July 23, 2025",
      description:
        "Successfully completed summer internship project on Electro-Zone E-Commerce Platform with Course Central in collaboration with TRYST IIT DELHI.",
    },
    {
      id: "frontend-dev-certificate",
      title: "Front-End Development Course Completion",
      organization: "Course Central & Tryst IIT Delhi",
      imageUrl: "/facemood-app-internship.png",
      date: "July 05, 2025",
      description: "Completed the Front-End Development course.",
    },
    {
      id: "quiz-app-internship",
      title: "Quiz App Internship",
      organization: "Course Central",
      imageUrl: "/electro-zone-internship.png",
      date: "July 08, 2025",
      description:
        "Successfully completed summer internship project on Quiz App with Course Central in collaboration with TRYST IIT DELHI.",
    },
    {
      id: "alfido-tech-internship",
      title: "Frontend Developer Internship",
      organization: "Alfido Tech",
      imageUrl: "/frontend-dev-certificate.png",
      date: "June 15 - July 15, 2025",
      description: "Completed a 1-month internship as a Frontend Developer.",
    },
    {
      id: "codealpha-internship",
      title: "Frontend Development Internship",
      organization: "CodeAlpha",
      imageUrl: "/quiz-app-internship.png",
      date: "July 1 - July 30, 2025",
      description:
        "Successfully completed Frontend Development Internship with CodeAlpha Virtual Internship Program, demonstrating dedication and hard work in web development.",
    },
    {
      id: "interncourse-internship",
      title: "Frontend Development Internship",
      organization: "InternCourse",
      imageUrl: "/alfido-tech-internship.png",
      date: "July 1 - August 1, 2025",
      description:
        "Completed Frontend Development internship program with InternCourse, achieving outstanding results in web development skills.",
    },
    {
      id: "course-central-summer-internship",
      title: "Front-End Development Summer Training",
      organization: "Course Central & TRYST IIT Delhi",
      imageUrl: "/codealpha-internship.png",
      date: "June - July 2025",
      description:
        "Completed Summer Training/Internship Program 2025 in Front-End Development in collaboration with TRYST IIT Delhi.",
    },
    {
      id: "codec-technologies-internship",
      title: "Full Stack Developer Internship",
      organization: "Codec Technologies",
      imageUrl: "/codec-technologies-internship.png",
      date: "July 1 - August 1, 2025",
      description:
        "Completed 1 Month AICTE & ICAC Approved internship program as Full Stack Developer Intern with Google for Education Partner certification.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold hover:text-accent transition-colors">
              Vasant Jevengekar
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: "About", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Projects", href: "#projects" },
                { name: "Education", href: "#education" },
                { name: "Certifications", href: "#certifications" },
                { name: "Internships", href: "#internships" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <MobileNav />
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-pastel-blue opacity-50"></div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-bold text-accent uppercase tracking-wider">Full Stack Developer</p>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                  Hi, I'm
                  <br />
                  <span className="text-accent">Vasant Jevengekar</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  A passionate full-stack developer creating responsive, user-friendly web applications that bring ideas
                  to life with modern technologies.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base bg-accent hover:bg-accent/90 glow-gold">
                  <Link href="#projects">
                    View My Work
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="text-base border-accent/50 hover:bg-accent/10 bg-transparent"
                >
                  <Link href="#contact">Get In Touch</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <Link href="https://github.com/Vasantjv-2005" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="hover:text-accent hover:bg-accent/10">
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/j-vasant-3226612b5/" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="hover:text-accent hover:bg-accent/10">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="mailto:vasantjv2005@gmail.com">
                  <Button variant="ghost" size="icon" className="hover:text-accent hover:bg-accent/10">
                    <Mail className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-accent/30 shadow-2xl glow-gold">
                <Image
                  src="/profile-photo.png"
                  alt="Vasant Jevengekar"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border/40" id="about">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-balance">About Me</h2>

            <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a web developer and designer with a passion for creating elegant solutions to complex problems.
                  With expertise in React, Next.js, and modern web technologies, I build responsive and accessible web
                  applications that make a difference.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As an aspiring full-stack developer, I've been actively building my skills through self-driven
                  projects, internships, and continuous learning. I have successfully completed internships at Course
                  Central, Alfido Tech, Codectechnologies, Codveda Technologies, InternCourse, and CodeAlpha, where I
                  gained practical exposure to real-world projects and collaborative workflows.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-border/40 bg-card/50 backdrop-blur-sm gradient-pastel-purple">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center glow-gold">
                        <Code className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold">Technical Skills</h3>
                    </div>

                    <div className="space-y-4">
                      {[
                        { skill: "Frontend Development", percentage: 92 },
                        { skill: "HTML & CSS", percentage: 95 },
                        { skill: "JavaScript & TypeScript", percentage: 88 },
                        { skill: "React & Next.js", percentage: 90 },
                        { skill: "Responsive Design", percentage: 94 },
                        { skill: "UI/UX Design", percentage: 87 },
                      ].map((item) => (
                        <div key={item.skill} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{item.skill}</span>
                            <span className="text-sm text-accent font-bold">{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-secondary/50 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-accent to-accent/70 h-2 rounded-full transition-all duration-1000 glow-gold"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/40 bg-card/50 backdrop-blur-sm gradient-pastel-blue">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center glow-gold">
                        <Briefcase className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold">Experience</h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      Through my internship experiences, I've developed a strong foundation in modern web technologies
                      and honed my ability to create clean, responsive, and accessible web interfaces. I'm passionate
                      about integrating AI to enhance user experiences through personalization and automation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border/40" id="services">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-balance">Services</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-accent/30 hover:border-accent transition-all duration-300 bg-card/50 backdrop-blur-sm gradient-pastel-purple glow-purple">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-accent">Web Designer</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I'm a passionate and creative web designer dedicated to crafting visually stunning and user-friendly
                    websites. With a keen eye for design and a love for clean, functional interfaces, I transform ideas
                    into engaging digital experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-accent/30 hover:border-accent transition-all duration-300 bg-card/50 backdrop-blur-sm gradient-pastel-blue glow-blue">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-accent">Web Developer</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I'm a dedicated and innovative web developer with a passion for building fast, functional, and
                    user-focused websites. I specialize in turning ideas into interactive digital experiences using
                    modern web technologies.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Letter Section */}
      <CoverLetterSection />

      <section className="py-24 border-t border-border/40" id="education">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-balance">Education</h2>

            <div className="space-y-8">
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm gradient-gold-accent glow-gold">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">BS-MS in Computer Science</h3>
                      <p className="text-accent font-medium mb-2">Vishwa Vishwani Institute · 2023 - Present</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Currently pursuing Bachelor of Science in Computer Science, focusing on modern software
                        development practices and emerging technologies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/50 backdrop-blur-sm gradient-pastel-blue">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">High School</h3>
                      <p className="text-accent font-medium mb-2">Narayana Junior College · Graduated 2020</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Completed high school education with an outstanding 10.0 CGPA, demonstrating academic excellence
                        and dedication to learning.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border/40" id="certifications">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 p-6 rounded-xl border border-accent/30 bg-gradient-to-r from-accent/10 to-accent/5 backdrop-blur-sm">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Vasant Jevengekar Digital Portfolio</h3>
                  <p className="text-muted-foreground">
                    Explore my comprehensive digital portfolio with interactive presentations
                  </p>
                </div>
                <Button asChild className="bg-accent hover:bg-accent/90 glow-gold">
                  <Link href="https://j-vasant-dev-9tn40l0.gamma.site/" target="_blank" rel="noopener noreferrer">
                    View Digital Portfolio
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-balance">Certifications</h2>

            <div className="space-y-16">
              <div>
                <h3 className="text-2xl font-bold mb-8 text-accent">Professional Certifications</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {professionalCertificates.map((cert) => (
                    <Card
                      key={cert.id}
                      className="border-accent/30 hover:border-accent transition-all duration-300 group bg-card/50 backdrop-blur-sm hover:glow-gold"
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg aspect-[4/3]">
                          <Image
                            src={cert.imageUrl || "/placeholder.svg"}
                            alt={cert.title}
                            width={400}
                            height={300}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6 space-y-2">
                          <h4 className="font-bold line-clamp-2">{cert.title}</h4>
                          <p className="text-sm text-accent font-medium">{cert.organization}</p>
                          <p className="text-sm text-muted-foreground">{cert.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-8 text-accent">Course Certifications</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {primaryCertificates.map((cert) => (
                    <Card
                      key={cert.id}
                      className="border-accent/30 hover:border-accent transition-all duration-300 group bg-card/50 backdrop-blur-sm hover:glow-gold"
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg aspect-[4/3]">
                          <Image
                            src={cert.imageUrl || "/placeholder.svg"}
                            alt={cert.title}
                            width={400}
                            height={300}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-6 space-y-2">
                          <h4 className="font-bold line-clamp-2">{cert.title}</h4>
                          <p className="text-sm text-accent font-medium">{cert.organization}</p>
                          <p className="text-sm text-muted-foreground">{cert.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border/40" id="internships">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-balance">Internships</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {internshipCertificates.map((cert, index) => (
                <Card
                  key={cert.id}
                  className="border-accent/30 hover:border-accent transition-all duration-300 group bg-card/50 backdrop-blur-sm hover:glow-gold overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image
                        src={cert.imageUrl || "/placeholder.svg"}
                        alt={cert.title}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="inline-flex items-center space-x-2 text-accent font-bold text-sm">
                        <Award className="w-4 h-4" />
                        <span>Internship #{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight group-hover:text-accent transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-accent font-semibold">{cert.organization}</p>
                      <p className="text-sm text-muted-foreground font-medium">{cert.date}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border/40" id="projects">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-balance">Featured Projects</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Single Page Application",
                  description:
                    "A dynamic single-page application designed for seamless user interaction and efficient content delivery.",
                  link: "https://lustrous-frangollo-a58d31.netlify.app/",
                  gradient: "from-blue-500/20 to-cyan-500/20",
                  borderColor: "hover:border-blue-400",
                  icon: <Code className="w-5 h-5 text-blue-400" />,
                },
                {
                  title: "Portfolio Generator",
                  description:
                    "A dynamic tool designed to help developers quickly generate and customize their online portfolios.",
                  link: "https://elevate-labs-project.vercel.app/",
                  gradient: "from-purple-500/20 to-pink-500/20",
                  borderColor: "hover:border-purple-400",
                  icon: <Briefcase className="w-5 h-5 text-purple-400" />,
                },
                {
                  title: "HabitFlow Tracker",
                  description:
                    "A progressive web application designed to help users track and build positive habits seamlessly.",
                  link: "https://habit-tracker-pwa-elevate-labs.vercel.app/",
                  gradient: "from-green-500/20 to-emerald-500/20",
                  borderColor: "hover:border-green-400",
                  icon: <CheckSquare className="w-5 h-5 text-green-400" />,
                },
                {
                  title: "Electro-zone E-commerce",
                  description:
                    "A comprehensive e-commerce platform specializing in electronics, offering a seamless shopping experience.",
                  link: "https://endearing-pastelito-fec631.netlify.app/",
                  gradient: "from-orange-500/20 to-amber-500/20",
                  borderColor: "hover:border-orange-400",
                  icon: <ShoppingCart className="w-5 h-5 text-orange-400" />,
                },
                {
                  title: "Study Pal AI",
                  description:
                    "An innovative AI-powered study companion designed to enhance learning and knowledge retention.",
                  link: "https://v0.dev/chat/fork-of-study-plan-ai-website-sma0lqCUbEJ?f=1&b=b_kas0UO54Iupadd",
                  gradient: "from-indigo-500/20 to-violet-500/20",
                  borderColor: "hover:border-indigo-400",
                  icon: <Brain className="w-5 h-5 text-indigo-400" />,
                },
                {
                  title: "X-Share",
                  description: "A social media platform for sharing thoughts, images, and connecting with friends.",
                  link: "https://v0.dev/chat/fork-of-x-share-design-brief-anidxz.vercel.app/",
                  gradient: "from-sky-500/20 to-blue-500/20",
                  borderColor: "hover:border-sky-400",
                  icon: <Share2 className="w-5 h-5 text-sky-400" />,
                },
                {
                  title: "Vid-Tube",
                  description:
                    "A video streaming platform with a YouTube-inspired interface, allowing users to browse, search, and watch videos.",
                  link: "https://harmonious-dragon-e610a1.netlify.app/",
                  gradient: "from-red-500/20 to-rose-500/20",
                  borderColor: "hover:border-red-400",
                  icon: <Video className="w-5 h-5 text-red-400" />,
                },
                {
                  title: "E-Commerce Store",
                  description:
                    "A modern e-commerce platform with product listings, shopping cart functionality, and streamlined checkout.",
                  link: "https://bucolic-sunburst-b418f2.netlify.app/",
                  gradient: "from-teal-500/20 to-cyan-500/20",
                  borderColor: "hover:border-teal-400",
                  icon: <Package className="w-5 h-5 text-teal-400" />,
                },
                {
                  title: "Pizza Delivery App",
                  description:
                    "A modern pizza delivery application with online ordering, real-time tracking, and seamless payment integration.",
                  link: "https://v0-pizza-delivery-app-eight.vercel.app/",
                  gradient: "from-yellow-500/20 to-orange-500/20",
                  borderColor: "hover:border-yellow-500",
                  icon: <Pizza className="w-5 h-5 text-yellow-500" />,
                },
                {
                  title: "Task-Flow",
                  description:
                    "A comprehensive task management application with Supabase integration, featuring user authentication and real-time updates.",
                  link: "https://task-flow-sooty.vercel.app/",
                  gradient: "from-slate-500/20 to-gray-500/20",
                  borderColor: "hover:border-slate-400",
                  icon: <CheckSquare className="w-5 h-5 text-slate-400" />,
                },
                {
                  title: "Canvas Collab",
                  description:
                    "A collaborative canvas application enabling real-time drawing and design collaboration with multiple users.",
                  link: "https://canvas-collab-five.vercel.app/",
                  gradient: "from-fuchsia-500/20 to-pink-500/20",
                  borderColor: "hover:border-fuchsia-400",
                  icon: <Palette className="w-5 h-5 text-fuchsia-400" />,
                },
                {
                  title: "Material App",
                  description:
                    "A modern Material UI-based application with updated code and responsive design.",
                  link: "https://get-material-app-updated-code-13-20.vercel.app/",
                  gradient: "from-blue-500/20 to-cyan-500/20",
                  borderColor: "hover:border-blue-400",
                  icon: <Code className="w-5 h-5 text-blue-400" />,
                },
              ].map((project) => (
                <Card
                  key={project.title}
                  className={`border-border/40 ${project.borderColor} transition-all duration-300 group overflow-hidden bg-card/50 backdrop-blur-sm hover:glow-gold`}
                >
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-br ${project.gradient} p-8 border-b border-border/50`}>
                      <div className="w-12 h-12 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        {project.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full bg-transparent border-accent/50 hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          View Project
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border/40" id="contact">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Get In Touch</h2>
            <p className="text-xl text-muted-foreground mb-12">
              Feel free to reach out for collaborations or just a friendly hello.
            </p>
            <div className="gradient-pastel-purple p-8 rounded-2xl border border-accent/30 glow-purple">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Vasant Jevengekar. All rights reserved.
            </p>

            <div className="flex items-center space-x-4">
              <Link href="https://www.linkedin.com/in/j-vasant-3226612b5/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-accent hover:bg-accent/10">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://github.com/Vasantjv-2005" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="hover:text-accent hover:bg-accent/10">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

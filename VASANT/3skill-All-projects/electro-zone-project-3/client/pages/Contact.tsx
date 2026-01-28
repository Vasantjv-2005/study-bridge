import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Headphones,
  Shield,
  Zap,
} from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email Support",
      content: "vasantjv2005@gmail.com",
      description: "Get answers to your questions via email",
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Phone Support",
      content: "9392069322",
      description: "Mon–Sat, 10:00 AM to 6:00 PM",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Office Address",
      content: "ElectroZone Pvt. Ltd.",
      description:
        "5th Floor, Tech Plaza, Hitech City, Hyderabad, Telangana – 500081, India",
    },
  ];

  const supportFeatures = [
    {
      icon: <Headphones className="h-5 w-5 text-primary" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your queries",
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Secure Help",
      description: "Safe and confidential support for order issues",
    },
    {
      icon: <Zap className="h-5 w-5 text-primary" />,
      title: "Quick Response",
      description: "Fast replies within 24 hours guaranteed",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <Badge className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground text-lg px-6 py-3">
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact ElectroZone
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                We're{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Here to Help
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Have questions, feedback, or need help with an order? We're here
                for you! Our dedicated support team is ready to assist.
              </p>
            </div>

            {/* Support Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {supportFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="text-center space-y-3 p-4 rounded-2xl bg-background/60 backdrop-blur-sm border"
                >
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
              <p className="text-lg text-muted-foreground">
                Choose the best way to reach us. We're committed to providing
                quick and helpful responses to all inquiries.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="border-0 bg-gradient-to-br from-background to-muted/30 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        {info.icon}
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="text-lg font-semibold">{info.title}</h3>
                        <p className="text-primary font-medium">
                          {info.content}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Business Hours */}
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Business Hours</h3>
                    <div className="space-y-1 text-sm">
                      <p className="flex justify-between">
                        <span>Monday - Saturday:</span>
                        <span className="font-medium">10:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-medium">Closed</span>
                      </p>
                      <p className="text-muted-foreground text-xs mt-2">
                        * Email support available 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Send a Message</h2>
              <p className="text-lg text-muted-foreground">
                Fill out our contact form and our team will get back to you as
                soon as possible.
              </p>
            </div>

            <Card className="border-0 bg-gradient-to-br from-background to-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2 text-primary" />
                  Contact Form
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-foreground"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-muted-foreground/20 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-muted-foreground/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-foreground"
                    >
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="border-muted-foreground/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="border-muted-foreground/20 focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg py-6"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    By submitting this form, you agree to our privacy policy and
                    terms of service.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to common questions about orders, delivery, and
                support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <Card className="border-0 bg-background/80">
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold">
                    How long does delivery take?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Standard delivery takes 3-5 business days. Express delivery
                    is available for 1-2 day delivery in major cities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-background/80">
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold">What is your return policy?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer easy returns within 7 days of delivery. Products
                    must be in original condition with all accessories.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-background/80">
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold">Are all products genuine?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, all our products are 100% genuine and sourced directly
                    from authorized dealers and brand partners.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-background/80">
                <CardContent className="p-6 space-y-3">
                  <h3 className="font-semibold">Do you provide warranty?</h3>
                  <p className="text-sm text-muted-foreground">
                    All products come with manufacturer warranty. Extended
                    warranty options are available for selected items.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

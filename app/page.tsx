"use client"

import { useState, useEffect } from "react"
import { Mail, Github, Linkedin, ExternalLink, Menu, X, ArrowDown } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedBackground } from "@/components/animated-background"
import { ScrollProgress } from "@/components/scroll-progress"
import { MagneticButton } from "@/components/magnetic-button"
import { TextReveal } from "@/components/text-reveal"
import { ContactBackground } from "@/components/contact-background"

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
   const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const skillsRef = useRef(null)
  const contactRef = useRef(null)

const isHeroInViewRaw = useInView(heroRef, { margin: "-50%" })
  const y1Raw = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2Raw = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3Raw = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacityRaw = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  const isHeroInView = mounted && typeof window !== "undefined" ? isHeroInViewRaw : false
  const y1 = mounted && typeof window !== "undefined" ? y1Raw : { get: () => 0 }
  const y2 = mounted && typeof window !== "undefined" ? y2Raw : { get: () => 0 }
  const y3 = mounted && typeof window !== "undefined" ? y3Raw : { get: () => 0 }
  const opacity = mounted && typeof window !== "undefined" ? opacityRaw : { get: () => 1 }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "contact"]
      const scrollPosition = window.scrollY + 100

      setIsScrolled(window.scrollY > 50)

      for (const section of sections) {
         if (typeof window === "undefined" || typeof document === "undefined") return
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

    const scrollToSection = (sectionId: string) => {
    if (!mounted || typeof document === "undefined") return

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  if (!mounted) {
    return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
             <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
            Arsalan Reshi
          </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
              Crafting Digital Experiences
            </p>
          </div>
        </div>
      
    )
  }
  const projects = [
    {
      title: "Dashboard",
      description:
        "A responsive data management tool built with React, Node.js, and MongoDB, featuring secure authentication, role-based access, and interactive analytics.",
      image: "/dashboard.png?height=300&width=400",
      tech: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
  
    {
      title: "Personal Portfolio",
      description:
        "A personal portfolio website showcasing my projects, skills, and experience.",
      image: '/port.png?height=300&width=400',
      tech: ["JavaScript", "React",],
      link: "#",
    },
  ]

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    // { name: "Node.js", level: 80 },
    // { name: "Python", level: 75 },
    { name: "CSS/SCSS", level: 88 },
    { name: "MongoDB", level: 60 },
    { name: "Git", level: 85 },
    { name: "UI/UX Design", level: 78 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    hover: {
      scale: 1.05,
      y: -15,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-premium-dark dark:bg-gradient-premium-dark light:bg-gradient-premium-light relative overflow-x-hidden transition-colors duration-500">
      <ScrollProgress />
      <AnimatedBackground />
      {mounted && (
        <>

      <motion.div
        style={{ y: y1, opacity }}
        className="fixed top-20 left-20 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/20 light:bg-blue-400/15 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="fixed bottom-20 right-20 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/20 light:bg-cyan-400/15 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y3, opacity }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 dark:bg-indigo-500/20 light:bg-indigo-400/15 rounded-full blur-3xl"
      />
      </>
      )}

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? "glass-nav scrolled" : "glass-nav"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-display font-bold text-gradient-primary">
              Arsalan Reshi
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "projects", "skills", "contact"].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 font-medium relative ${
                    activeSection === item
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 dark:text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </motion.button>
            </div>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden glass-card mb-4 rounded-lg overflow-hidden"
            >
              <div className="px-4 py-2 space-y-2">
                {["home", "about", "projects", "skills", "contact"].map((item, index) => (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left capitalize text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 py-2 font-medium"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-4 relative" ref={heroRef}>
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card-premium p-8 md:p-12 rounded-2xl relative"
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-display font-bold text-gradient-primary mb-6"
            >
              Arsalan Reshi
            </motion.h1>

            <TextReveal className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 font-medium" delay={0.5}>
              Crafting Digital Experiences
            </TextReveal>

            <TextReveal
              className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
              delay={0.7}
            >
              Where innovation meets design. Passionate about building scalable websites that make a difference in
              the digital world.
            </TextReveal>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton
                onClick={() => scrollToSection("projects")}
                className="glass-button-primary px-8 py-3 rounded-full text-white font-semibold"
              >
                Explore My Work
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollToSection("contact")}
                className="glass-button-secondary px-8 py-3 rounded-full text-gray-700 dark:text-white font-semibold"
              >
                Get In Touch
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

       {mounted && isHeroInView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="flex flex-col items-center text-gray-500 dark:text-gray-400"
            >
              <span className="text-sm mb-2 font-medium">Scroll to explore</span>
              <ArrowDown size={20} />
            </motion.div>
          </motion.div>
        )}
      </section>

      <section id="about" className="py-20 px-4" ref={aboutRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card-premium p-8 md:p-12 rounded-2xl"
          >
            <TextReveal className="text-4xl md:text-5xl font-display font-bold text-gradient-primary mb-8 text-center">
              About Me
            </TextReveal>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                >
                 I’m a Front-End Web Developer with a passion for crafting clean, responsive, and user-friendly interfaces. I specialize in turning design concepts into interactive, accessible websites that not only look great but also deliver a smooth, intuitive user experience.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                >
                 With expertise in HTML, CSS, JavaScript, and modern frameworks like React, I love building projects that merge creativity with functionality. I believe in writing maintainable code, optimizing performance, and always keeping the end-user in mind.

When I’m not coding, you can usually find me exploring new design trends, experimenting with animations, or tinkering with side projects that push my skills further. My goal is simple: create web experiences that people enjoy using.
                </motion.p>
                 <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                >
                

When I’m not coding, you can usually find me exploring new design trends, experimenting with animations, or tinkering with side projects that push my skills further. My goal is simple: create web experiences that people enjoy using.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex space-x-4"
                >
                  {[Github, Linkedin, Mail].map((Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.3, rotate: 10, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="text-blue-600 dark:text-blue-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                    >
                      <Icon size={24} />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="glass-card p-6 rounded-xl transform-gpu"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img src="/arsalan.png?height=400&width=400" alt="Profile" className="w-full h-auto rounded-lg" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4" ref={projectsRef}>
        <div className="max-w-7xl mx-auto">
          <TextReveal className="text-4xl md:text-5xl font-display font-bold text-gradient-primary mb-12 text-center">
            Featured Projects
          </TextReveal>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="glass-card p-6 rounded-xl cursor-pointer transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <motion.img
                    whileHover={{ scale: 1.15, rotate: 2 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.3 }}
                    
                  />
                </div>
                <motion.h3
                  className="text-xl font-display font-bold text-gray-800 dark:text-white mb-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {project.description}
                </motion.p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ delay: techIndex * 0.1, duration: 0.3 }}
                      className="px-3 py-1 bg-blue-500/20 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <motion.a
                  href={project.link}
                  whileHover={{ x: 8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors font-medium"
                >
                  View Project <ExternalLink size={16} className="ml-1" />
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4" ref={skillsRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card-premium p-8 md:p-12 rounded-2xl"
          >
            <TextReveal className="text-4xl md:text-5xl font-display font-bold text-gradient-primary mb-12 text-center">
              Skills & Expertise
            </TextReveal>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {skills.map((skill, index) => (
                <motion.div key={index} variants={itemVariants} className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <motion.span
                      className="text-gray-800 dark:text-white font-semibold"
                      whileHover={{ x: 5, scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill.name}
                    </motion.span>
                    <motion.span
                      className="text-blue-600 dark:text-blue-400 font-medium"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="w-full bg-gray-300/30 dark:bg-gray-700/30 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: `${skill.level}%`, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.1 + 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="h-full skill-bar-enhanced rounded-full relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 shimmer"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                          delay: index * 0.2,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 relative" ref={contactRef}>
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card-premium-contact p-8 md:p-12 rounded-2xl relative overflow-hidden"
          >
            <ContactBackground />

            {/* Enhanced glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 dark:from-white/3 dark:via-transparent dark:to-blue-400/10 pointer-events-none" />

            <div className="relative z-10">
              <TextReveal className="text-4xl md:text-5xl font-display font-bold text-gradient-primary mb-8 text-center">
                Get In Touch
              </TextReveal>

              <TextReveal
                className="text-lg text-gray-700 dark:text-gray-200 text-center mb-12 max-w-2xl mx-auto leading-relaxed"
                delay={0.2}
              >
                Ready to bring your ideas to life? Let's collaborate and create something amazing together.
              </TextReveal>

              <motion.form
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-gray-800 dark:text-white font-semibold mb-2">
                      Name
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 glass-input-enhanced rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-gray-800 dark:text-white font-semibold mb-2">
                      Email
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 glass-input-enhanced rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                </div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="subject" className="block text-gray-800 dark:text-white font-semibold mb-2">
                    Subject
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 glass-input-enhanced rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all duration-300"
                    placeholder="Project Inquiry"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-gray-800 dark:text-white font-semibold mb-2">
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 glass-input-enhanced rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none transition-all duration-300"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="text-center">
                  <MagneticButton className="glass-button-primary-enhanced px-8 py-3 rounded-full text-white font-semibold">
                    Send Message
                  </MagneticButton>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-8 px-4 border-t border-gray-200/20 dark:border-white/10"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            className="text-gray-500 dark:text-gray-400"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            © {new Date().getFullYear()} Arsalan Reshi. Crafted with passion and modern web technologies.
          </motion.p>
        </div>
      </motion.footer>
    </div>
  )
}

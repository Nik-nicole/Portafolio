import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import Projects from "@/components/projects"
import SkillsHexagon from "@/components/skills-hexagon"
import Timeline from "@/components/timeline"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <AboutSection />
      <Projects />
      <SkillsHexagon />
      <Timeline />
    </main>
  )
}

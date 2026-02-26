import MainNav from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Stack from "@/components/ui/swipecarddemo";
import Link from "next/link";
import Iridescence from "@/components/Iridescence";
import RotatingText from "@/components/RotatingText";

const images = [
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
];

const demoUsers = [
  {
    id: 1,
    name: "Ayan",
    bio: "Full stack dev building SaaS.",
    skills: ["React", "Node"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
  },
  {
    id: 2,
    name: "Riya",
    bio: "UI/UX Designer crafting experiences.",
    skills: ["Figma", "Brand"],
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",
  },
  {
    id: 3,
    name: "Dev",
    bio: "AI Engineer. ML + Product.",
    skills: ["Python", "ML"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
  },
];

export default function Home() {
  return (
    <div className="relative w-full text-black">

      {/* Fixed Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Iridescence
          speed={1}
          amplitude={0.1}
          mouseReact
        />
      </div>

      <MainNav />

      {/* HERO */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl text-violet-500">
          Swipe. Match. <br />
          Build with{" "}
          <RotatingText
            texts={["Developers", "Designers", "Founders", "AI Builders"]}
            mainClassName="inline-block px-3 bg-white/15 backdrop-blur-md text-violet-500 rounded-md"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
        </h1>

        <div className="relative mt-12 w-72 h-[520px] z-10">
  <Stack
    randomRotation
    sensitivity={200}
    sendToBackOnClick
    autoplay
    autoplayDelay={3000}
    pauseOnHover={false}
    cards={demoUsers.map((user) => (
      <div
        key={user.id}
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Background */}
        <img
          src={user.image}
          alt={user.name}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Bottom Content */}
        <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
          <h2 className="text-2xl font-semibold">
            {user.name}
          </h2>

          <p className="text-sm text-gray-200 mt-1">
            {user.bio}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs bg-white/20 backdrop-blur-md rounded-full border border-white/30"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  />
</div>
        <p className="mt-8 text-lg md:text-xl text-gray-700 max-w-2xl">
          Lumeva connects developers, designers, and creators based on real
          skills — not just profiles.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/register"
            className="px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition"
          >
            Get Started
          </Link>

          <Link
            href="/features"
            className="px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            How It Works
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-semibold">Create Profile</h3>
              <p className="mt-3 text-gray-600">
                Add your skills, experience level, and what you're looking for.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Swipe Smart</h3>
              <p className="mt-3 text-gray-600">
                Discover collaborators based on real compatibility.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Match & Build</h3>
              <p className="mt-3 text-gray-600">
                Connect instantly and start building meaningful projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Built for Serious Builders
          </h2>

          <div className="mt-12 grid md:grid-cols-3 gap-10">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold">Skill-Based Matching</h3>
              <p className="mt-3 text-gray-600">
                Matches are generated using shared and complementary skills.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold">Project-Driven</h3>
              <p className="mt-3 text-gray-600">
                Find people who are actively building — not just networking.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold">Clean & Fast</h3>
              <p className="mt-3 text-gray-600">
                No noise. Just meaningful connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-violet-500 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Ready to Build Your Dream Team?
        </h2>

        <Link
          href="/register"
          className="inline-block mt-8 px-8 py-3 bg-white text-black rounded-lg hover:opacity-90 transition"
        >
          Join Lumeva Today
        </Link>
      </section>

      <Footer />
    </div>
  );
}
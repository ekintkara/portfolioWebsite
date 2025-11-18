const config = {
  title: "Taylan Ekin Kara | Software Engineer",
  description: {
    long: "Explore the portfolio of Taylan, a Software Engineer specializing in modern web development, interactive experiences, and creative technology solutions with a focus on user-centered design and innovative applications.",
    short:
      "Discover the portfolio of Taylan, a Software Engineer creating interactive web experiences and modern applications.",
  },
  keywords: [
    "Taylan",
    "Taylan Ekin Kara",
    "taylanekinkara",
    "taylanekinkara.com",
    "Taylan Ekin Kara portfolio",
    "portfolio",
    "Software Engineer",
    "Web Development",
    "Frontend Development",
    "React Development",
    "Next.js Development",
    "Interactive Design",
    "Web Applications",
    // "GSAP",
    // "React",
    // "Next.js",
    // "Spline",
    // "Framer Motion",
    "TypeScript",
    "JavaScript",
    "Modern Web",
    "Creative Developer",
  ],
  author: "Taylan Ekin Kara",
  email: "taylanekinkara@example.com",
  site: "https://taylanekinkara.com.tr",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    linkedin: "https://www.linkedin.com/in/ekintkara/",
    github: "https://github.com/ekintkara/",
  },
};
export { config };

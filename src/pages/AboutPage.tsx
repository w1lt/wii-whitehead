import { motion } from "framer-motion";

function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg"
    >
      <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>
      <p className="text-xl text-gray-700 leading-relaxed mb-4">
        Hi, I'm <span className="font-semibold">Will</span>. I'm a Computer
        Science student at the University of Kansas and a passionate software
        developer with a strong background in web development.
      </p>
      <p className="text-xl text-gray-700 leading-relaxed mb-4">
        I'm currently working on two exciting projects:
        <span className="font-semibold"> CSjobs</span> and
        <span className="font-semibold"> Tickget</span>. Both projects focus on
        creating streamlined solutions for job seekers and event ticket
        management.
      </p>
      <p className="text-xl text-gray-700 leading-relaxed mb-4">
        I'm really excited to start my next semester at KU, and I'm actively
        seeking summer internship roles for{" "}
        <span className="font-semibold">'25</span>. I love collaborating with
        teams to build meaningful software, and I'm eager to apply my skills and
        learn more in the industry.
      </p>
      <p className="text-xl text-gray-700 leading-relaxed">
        Feel free to reach out if you'd like to connect!
      </p>
    </motion.div>
  );
}

export default AboutPage;

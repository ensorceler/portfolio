import {motion} from "framer-motion";

export default function TechStack() {

    const techCategories = [
        {
            name: "Frontend Realm",
            techs: ["React", "Next.js", "Remix", "Angular", "Three.js", "Tailwind CSS", "HTML/CSS"]
        },
        {
            name: "Backend Kingdom",
            techs: ["Golang", "Node.js", "TypeScript", "PHP/Laravel", "Python", "Bash"]
        },
        {
            name: "DevOps Fortress",
            techs: ["Docker", "AWS", "Linux", "Nginx", "CI/CD", "Tomcat"]
        },
        {
            name: "Data Vaults",
            techs: ["PostgreSQL", "MongoDB", "Redis", "Cassandra", "DynamoDB"]
        },
        {
            name: "Cartography",
            techs: ["Geoserver", "ArcGIS", "OpenLayers", "CesiumJS"]
        }
    ];
    return (
        <section className="flex flex-col gap-3 mt-8 mb-4">
            <h2 className="text-xl font-bold font-medieval underline underline-offset-8 decoration-4 decoration-neutral-600 dark:text-amber-100">
                Tech Arsenal
            </h2>

            <div className="space-y-1 mt-2">
                {techCategories.map((category, index) => (
                    <div key={index} className="space-y-1">
                        <h3 className="font-manuscript text-sm font-semibold dark:text-title">{category.name}</h3>
                        <div
                            className="relative overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-amber-800/30 scrollbar-track-transparent">
                            <div className="flex space-x-3 pb-1 lg:flex-wrap">
                                {category.techs.map((tech, techIndex) => (
                                    <motion.div
                                        key={techIndex}
                                        initial={{opacity: 0, y: 10}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.3, delay: techIndex * 0.05}}
                                        className="px-3 py-1 lg:mt-2 text-xs whitespace-nowrap rounded-md border border-amber-800/30 dark:border-amber-700/20 dark:text-neutral-400 hover:dark:bg-amber-900/20 transition-colors"
                                    >
                                        {tech}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
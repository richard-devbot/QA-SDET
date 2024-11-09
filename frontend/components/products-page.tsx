import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { LightbulbIcon, SearchIcon, FileTextIcon, CodeIcon, CompassIcon, ChevronDownIcon } from 'lucide-react'

const products = [
  {
    name: "IdeaForge",
    description: "Generate comprehensive test scenarios using advanced AI algorithms, ensuring thorough coverage of your application's functionality.",
    icon: LightbulbIcon,
    image: "/IdeaForgeimage.png?",
  },
  {
    name: "DOMDetective",
    description: "Automatically identify and analyze web elements with precision, streamlining the process of element selection and interaction in your tests.",
    icon: SearchIcon,
    image: "/DomDetectiveimage.png?",
  },
  {
    name: "CucumberCraft",
    description: "Transform user stories into clear, concise Gherkin feature files, bridging the gap between business requirements and test scenarios.",
    icon: FileTextIcon,
    image: "/CucumberCraftimage.png?",
  },
  {
    name: "AutoScribe",
    description: "Generate test automation scripts in multiple languages automatically, reducing the time and effort required to create and maintain test code.",
    icon: CodeIcon,
    image: "/AutoScribeimage.png?",
  },
  {
    name: "WebTrekker",
    description: "Leverage AI to automatically explore and test complex user journeys, uncovering edge cases and potential issues that manual testing might miss.",
    icon: CompassIcon,
    image: "/WebTrekkerimage.png?",
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      <main className="pt-20">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-16">Our Products</h1>
        
        {products.map((product, index) => (
          <section key={product.name} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-32 items-center">
              <div className="space-y-12">
                <div className="flex items-center gap-3">
                  <product.icon className="w-12 h-12 text-blue-600" />
                  <h2 className="text-4xl font-bold text-blue-900">{product.name}</h2>
                </div>
                <p className="text-xl text-gray-700">{product.description}</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">See Demo</Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-lg transform rotate-3 w-[500px] h-[525px]"></div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={525}
                  className="relative z-10 rounded-lg shadow-xl"
                />
              </div>
            </div>
          </section>
        ))}
      </main>

    </div>
  )
}
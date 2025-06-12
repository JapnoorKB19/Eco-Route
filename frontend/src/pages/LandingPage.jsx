import React from "react";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { Leaf, Route, GaugeCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";  // <-- import here

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/plan");  // <-- navigate to PlanRoutePage (path you defined in App.jsx)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 text-gray-800">
      <header className="w-full py-6 px-4 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-700 flex items-center gap-2">
          <Leaf className="text-green-600" /> EcoRoute
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#features" className="hover:text-green-600">Features</a>
          <a href="#how-it-works" className="hover:text-green-600">How It Works</a>
          <a href="#contact" className="hover:text-green-600">Contact</a>
        </nav>
        <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
      </header>

      <main className="px-4 md:px-12 py-12 flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          className="flex-1 space-y-6"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-green-800">
            Navigate Smarter. Drive Greener.
          </h1>
          <p className="text-lg text-gray-700">
            EcoRoute helps you choose the most fuel-efficient and eco-friendly routes
            using smart data-driven predictions. Save fuel, reduce CO₂ emissions, and
            make every trip count for the planet.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-lg " onClick={handleGetStarted} >
            Start Exploring
          </Button>
        </motion.div>

        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img src="/eco-route-illustration.svg" alt="Eco Route Illustration" className="w-full max-w-md mx-auto" />
        </motion.div>
      </main>

      <section id="features" className="py-16 px-4 md:px-12 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-md hover:shadow-lg transition duration-300">
            <CardContent className="p-6 space-y-4">
              <Route className="text-green-600 w-8 h-8" />
              <h3 className="text-xl font-semibold text-green-800">Eco-Optimized Routing</h3>
              <p className="text-gray-600">Get real-time route suggestions that prioritize environmental impact over speed alone.</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition duration-300">
            <CardContent className="p-6 space-y-4">
              <GaugeCircle className="text-green-600 w-8 h-8" />
              <h3 className="text-xl font-semibold text-green-800">Fuel & CO₂ Prediction</h3>
              <p className="text-gray-600">Advanced models predict your trip’s fuel consumption and carbon footprint before you go.</p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition duration-300">
            <CardContent className="p-6 space-y-4">
              <Leaf className="text-green-600 w-8 h-8" />
              <h3 className="text-xl font-semibold text-green-800">Sustainability Insights</h3>
              <p className="text-gray-600">Track your eco-saving stats and see the positive impact you make over time.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-green-700 text-white py-6 px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>&copy; 2025 EcoRoute. All rights reserved.</div>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Header from './ui/Header'
import Footer from './ui/Footer'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Home() {
    const username = localStorage.getItem('username')
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <section className="text-black py-20" style={{ backgroundColor: "linen" }}>
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-georgia">Welcome to Our Platform</h1>
                        <p className="text-xl md:text-2xl mb-8 font-serif">Discover amazing features and boost your productivity</p>
                        <Link to={username ? "/homepage" : "/authpage"}>
                            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                                Get Started <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </section>
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                                <p>Our platform is designed with simplicity in mind, ensuring a smooth user experience.</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">Powerful Features</h3>
                                <p>Access a wide range of tools and features to enhance your workflow.</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                                <p>Our dedicated team is always ready to assist you with any questions or issues.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}


import AboutInfo from "@/components/landing/about-info";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Testimonial from "@/components/landing/testimonial";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex space-y-16 flex-col">
            <Header />
            <main className="flex-grow space-y-16 p-4">
                <Hero />
                <Features />
                <Testimonial />
                <AboutInfo />
            </main>
            <Footer  />
        </div>
    );
}

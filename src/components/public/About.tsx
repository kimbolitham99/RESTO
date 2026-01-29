import { Award, Users, Clock, Leaf } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for culinary excellence with multiple industry awards',
    },
    {
      icon: Users,
      title: 'Expert Chefs',
      description: 'Our team of world-class chefs bring passion to every dish',
    },
    {
      icon: Clock,
      title: 'Fresh Daily',
      description: 'Ingredients sourced fresh every morning for peak flavor',
    },
    {
      icon: Leaf,
      title: 'Sustainable',
      description: 'Committed to eco-friendly practices and local sourcing',
    },
  ];

  return (
    <section id="about" className="py-20 bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=500&fit=crop"
                alt="Restaurant interior"
                className="rounded-2xl w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop"
                alt="Chef preparing food"
                className="rounded-2xl w-full h-48 object-cover"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop"
                alt="Fine dining dish"
                className="rounded-2xl w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=500&fit=crop"
                alt="Restaurant ambiance"
                className="rounded-2xl w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-amber-500 font-medium tracking-widest uppercase mb-2">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              A Tradition of Excellence
            </h2>
            <p className="text-stone-300 text-lg mb-6 leading-relaxed">
             Since 2000, Kantin Mak Vika has been a center of culinary excellence in the heart of the city. Our founder brought her family's traditional recipes and combined them with modern techniques to create an unforgettable dining experience.
            </p>
            <p className="text-stone-300 text-lg mb-8 leading-relaxed">
              Every dish tells a story of tradition, passion, and innovation. We believe in 
              using only the finest ingredients, sourced from local farms and trusted suppliers, 
              to bring you authentic flavors that transport you to the Italian countryside.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-stone-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

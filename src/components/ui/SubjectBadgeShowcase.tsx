import React from 'react';
import SubjectBadge from './SubjectBadge';
import { subjectIcons, getSubjectsByCategory } from '../../config/subjectIcons';

const SubjectBadgeShowcase: React.FC = () => {
  const categorizedSubjects = getSubjectsByCategory();
  
  // Example products to test automatic detection
  const exampleProducts = [
    {
      title: "Complete Machine Learning Course with Python",
      description: "Learn data science, artificial intelligence and machine learning algorithms",
      category: "Technology"
    },
    {
      title: "Advanced Mathematics for Engineers",
      description: "Calculus, linear algebra, differential equations and statistics",
      category: "Engineering"
    },
    {
      title: "Business Strategy and Management",
      description: "Learn entrepreneurship, leadership and strategic planning",
      category: "Business"
    },
    {
      title: "Digital Art and Design Fundamentals",
      description: "Creative design, visual arts, and digital illustration techniques",
      category: "Creative Arts"
    },
    {
      title: "Spanish Language Immersion",
      description: "Learn Spanish communication, grammar, and conversation skills",
      category: "Languages"
    },
    {
      title: "Web Development with React",
      description: "Frontend development, programming, and modern web technologies",
      category: "Programming"
    }
  ];

  return (
    <div className="p-8 bg-secondary min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Subject Badge System Showcase</h1>
        
        {/* Automatic Detection Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">🤖 Automatic Subject Detection</h2>
          <p className="text-white/70 mb-6">
            These badges are automatically detected based on the product title, description, and category:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exampleProducts.map((product, index) => (
              <div key={index} className="bg-secondary-light rounded-lg p-6 border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-white font-medium text-sm flex-1 mr-2">
                    {product.title}
                  </h3>
                  <SubjectBadge 
                    title={product.title}
                    description={product.description}
                    category={product.category}
                    size="small"
                    variant="filled"
                    showText={false}
                  />
                </div>
                <p className="text-white/60 text-xs mb-2">{product.category}</p>
                <p className="text-white/50 text-xs">{product.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Size Variants */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">📏 Size Variants</h2>
          <div className="bg-secondary-light rounded-lg p-6 border border-white/10">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-white text-sm w-20">Small:</span>
                <SubjectBadge subjectId="mathematics" size="small" />
                <SubjectBadge subjectId="computer_science" size="small" />
                <SubjectBadge subjectId="art" size="small" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white text-sm w-20">Medium:</span>
                <SubjectBadge subjectId="mathematics" size="medium" />
                <SubjectBadge subjectId="computer_science" size="medium" />
                <SubjectBadge subjectId="art" size="medium" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white text-sm w-20">Large:</span>
                <SubjectBadge subjectId="mathematics" size="large" />
                <SubjectBadge subjectId="computer_science" size="large" />
                <SubjectBadge subjectId="art" size="large" />
              </div>
            </div>
          </div>
        </div>

        {/* Style Variants */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">🎨 Style Variants</h2>
          <div className="bg-secondary-light rounded-lg p-6 border border-white/10">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-white text-sm w-20">Filled:</span>
                <SubjectBadge subjectId="physics" variant="filled" />
                <SubjectBadge subjectId="business" variant="filled" />
                <SubjectBadge subjectId="music" variant="filled" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white text-sm w-20">Outline:</span>
                <SubjectBadge subjectId="physics" variant="outline" />
                <SubjectBadge subjectId="business" variant="outline" />
                <SubjectBadge subjectId="music" variant="outline" />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white text-sm w-20">Minimal:</span>
                <SubjectBadge subjectId="physics" variant="minimal" />
                <SubjectBadge subjectId="business" variant="minimal" />
                <SubjectBadge subjectId="music" variant="minimal" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Toggle */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">📝 With/Without Text</h2>
          <div className="bg-secondary-light rounded-lg p-6 border border-white/10">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-white text-sm w-20">With text:</span>
                <SubjectBadge subjectId="chemistry" showText={true} />
                <SubjectBadge subjectId="languages" showText={true} />
                <SubjectBadge subjectId="psychology" showText={true} />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white text-sm w-20">Icon only:</span>
                <SubjectBadge subjectId="chemistry" showText={false} />
                <SubjectBadge subjectId="languages" showText={false} />
                <SubjectBadge subjectId="psychology" showText={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Complete Library */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">📚 Complete Subject Library</h2>
          {Object.entries(categorizedSubjects).map(([categoryName, subjects]) => (
            <div key={categoryName} className="mb-8">
              <h3 className="text-lg font-medium text-white mb-4">{categoryName}</h3>
              <div className="flex flex-wrap gap-3">
                {subjects.map((subject) => (
                  <SubjectBadge
                    key={subject.id}
                    subjectId={subject.id}
                    size="medium"
                    variant="filled"
                    showText={true}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Usage Examples */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">💡 Usage Examples</h2>
          <div className="bg-secondary-light rounded-lg p-6 border border-white/10">
            <h4 className="text-white font-medium mb-4">Product Card Integration</h4>
            <div className="space-y-4">
              <div className="bg-secondary rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-white font-medium text-sm flex-1 mr-2">
                    Advanced Python Programming Course
                  </h5>
                  <SubjectBadge 
                    title="Advanced Python Programming Course"
                    description="Learn advanced programming concepts, data structures and algorithms"
                    category="Programming"
                    size="small"
                    variant="filled"
                    showText={false}
                  />
                </div>
                <p className="text-white/60 text-xs">Programming Category</p>
              </div>
              
              <div className="bg-secondary rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-white font-medium text-sm flex-1 mr-2">
                    Financial Markets and Investment Strategies
                  </h5>
                  <SubjectBadge 
                    title="Financial Markets and Investment Strategies"
                    description="Learn about stock markets, trading, and investment portfolio management"
                    category="Finance"
                    size="small"
                    variant="filled"
                    showText={false}
                  />
                </div>
                <p className="text-white/60 text-xs">Finance Category</p>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Test */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">📱 Responsive Design Test</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {subjectIcons.slice(0, 12).map((subject) => (
              <div key={subject.id} className="bg-secondary-light rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-xs flex-1 mr-2">{subject.name}</span>
                  <SubjectBadge
                    subjectId={subject.id}
                    size="small"
                    variant="filled"
                    showText={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectBadgeShowcase;
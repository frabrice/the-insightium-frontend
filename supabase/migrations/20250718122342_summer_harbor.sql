/*
  # Add Recent Test Articles

  1. New Test Articles
    - 3 articles published in the last 3 days
    - Different categories and authors
    - Realistic content for testing main articles functionality
  
  2. Purpose
    - Enable testing of main articles management
    - Provide recent articles for selection
    - Demonstrate the 3-day filter functionality
*/

-- Insert 3 recent test articles for main articles testing
INSERT INTO articles (
  title, 
  subtitle, 
  excerpt, 
  content, 
  category_name, 
  author, 
  author_bio, 
  publish_date, 
  read_time, 
  tags, 
  featured_image, 
  featured_image_alt, 
  meta_description, 
  status, 
  featured, 
  trending, 
  views
)
VALUES
  (
    'AI Tutoring Systems Revolutionize Personalized Learning', 
    'How artificial intelligence is creating customized educational experiences for every student', 
    'Discover how AI-powered tutoring systems are adapting to individual learning styles, providing real-time feedback, and helping students achieve better outcomes through personalized instruction.',
    'Artificial intelligence is transforming education through sophisticated tutoring systems that adapt to each student''s unique learning style and pace. These systems use machine learning algorithms to analyze student performance, identify knowledge gaps, and provide targeted interventions.\n\n## Personalized Learning Paths\n\nAI tutoring systems create individualized learning experiences by:\n\n- Analyzing student responses to identify strengths and weaknesses\n- Adapting content difficulty based on performance\n- Providing immediate feedback and explanations\n- Suggesting additional resources for challenging topics\n\n## Real-World Applications\n\nSchools across Africa are implementing AI tutoring systems with remarkable results:\n\n- **Mathematics**: AI systems help students master complex concepts through step-by-step guidance\n- **Language Learning**: Personalized vocabulary and grammar exercises based on proficiency levels\n- **Science**: Interactive simulations that adapt to student understanding\n\n## The Future of AI in Education\n\nAs AI technology continues to advance, we can expect even more sophisticated tutoring systems that understand not just what students know, but how they learn best. This represents a fundamental shift toward truly personalized education that meets every student where they are.',
    'Tech Trends',
    'Dr. Fatima Al-Zahra',
    'AI in Education Researcher at Cairo University',
    CURRENT_DATE - INTERVAL '1 day',
    '9 min read',
    'AI, Tutoring, Personalized Learning, EdTech',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'Student using AI-powered learning system',
    'How AI tutoring systems are revolutionizing personalized education across Africa',
    'published',
    false,
    false,
    '28.4K'
  ),
  (
    'Sustainable Campus Initiatives Lead Environmental Change', 
    'Universities across Africa pioneer green technologies and sustainable practices', 
    'From solar-powered dormitories to zero-waste cafeterias, African universities are becoming leaders in environmental sustainability while educating the next generation of eco-conscious leaders.',
    'African universities are at the forefront of the sustainability movement, implementing innovative green technologies and practices that serve as models for institutions worldwide. These initiatives not only reduce environmental impact but also provide hands-on learning opportunities for students.\n\n## Green Infrastructure\n\nUniversities are investing in sustainable infrastructure:\n\n- **Solar Energy Systems**: Campus-wide solar installations reducing reliance on grid electricity\n- **Rainwater Harvesting**: Collection systems providing water for irrigation and non-potable uses\n- **Green Buildings**: LEED-certified structures with natural ventilation and energy-efficient design\n- **Waste Management**: Comprehensive recycling and composting programs\n\n## Student-Led Initiatives\n\nStudents are driving many sustainability efforts:\n\n- Environmental clubs organizing campus clean-up drives\n- Student-run organic gardens supplying campus cafeterias\n- Peer education programs on climate change and conservation\n- Innovation competitions for sustainable technology solutions\n\n## Academic Integration\n\nSustainability is being woven into curriculum across disciplines:\n\n- Engineering students designing renewable energy systems\n- Business students developing sustainable enterprise models\n- Agriculture students researching climate-resilient crops\n- Social science students studying environmental policy\n\n## Measuring Impact\n\nThese initiatives are producing measurable results in carbon reduction, cost savings, and student engagement, while preparing graduates to address global environmental challenges.',
    'Research World',
    'Prof. Kwame Nkrumah',
    'Environmental Science Department Head at University of Ghana',
    CURRENT_DATE - INTERVAL '2 days',
    '11 min read',
    'Sustainability, Environment, Green Campus, Climate Change',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'Solar panels on university campus',
    'How African universities are leading environmental sustainability initiatives',
    'published',
    false,
    false,
    '31.7K'
  ),
  (
    'Community Learning Hubs Transform Rural Education Access', 
    'Innovative local centers bring quality education to remote communities', 
    'Discover how community-driven learning hubs are bridging educational gaps in rural areas, providing access to digital resources, skilled instruction, and collaborative learning opportunities.',
    'In remote villages across Africa, community learning hubs are revolutionizing access to quality education. These locally-managed centers combine traditional teaching methods with modern technology to create vibrant learning environments that serve learners of all ages.\n\n## The Hub Model\n\nCommunity learning hubs operate on principles of local ownership and sustainability:\n\n- **Community Leadership**: Local committees manage operations and curriculum\n- **Multi-generational Learning**: Programs for children, youth, and adults\n- **Flexible Scheduling**: Classes adapted to agricultural and work cycles\n- **Cultural Integration**: Learning materials in local languages and contexts\n\n## Technology Integration\n\nHubs leverage appropriate technology to enhance learning:\n\n- **Satellite Internet**: Connecting remote areas to global educational resources\n- **Solar Power**: Ensuring reliable electricity for devices and lighting\n- **Tablet Libraries**: Shared devices loaded with educational content\n- **Video Conferencing**: Connecting with expert instructors and other hubs\n\n## Curriculum Innovation\n\nPrograms address both academic and practical skills:\n\n- **Literacy and Numeracy**: Foundation skills for all age groups\n- **Digital Literacy**: Computer skills and internet safety\n- **Vocational Training**: Skills for local economic opportunities\n- **Health Education**: Community health and wellness programs\n\n## Success Stories\n\nCommunities report significant improvements in educational outcomes, economic opportunities, and social cohesion. Many hub graduates have gone on to pursue higher education or start successful businesses.\n\n## Scaling the Model\n\nThe success of community learning hubs is inspiring replication across the continent, with support from governments, NGOs, and international development organizations.',
    'Spirit of Africa',
    'Grace Wanjiku',
    'Community Education Coordinator',
    CURRENT_DATE,
    '8 min read',
    'Community Education, Rural Learning, Digital Access, Local Development',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'Community learning hub with students and computers',
    'How community learning hubs are transforming rural education access in Africa',
    'published',
    false,
    false,
    '22.9K'
  )
ON CONFLICT (id) DO NOTHING;
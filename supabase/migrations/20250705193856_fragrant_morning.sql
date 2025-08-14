/*
  # Complete Schema Setup

  1. New Tables
    - `categories` - Stores article categories
    - `articles` - Stores all article content
    - `videos` - Stores video content
    - `podcast_episodes` - Stores podcast episode content
    - `main_articles` - Tracks which articles are featured as main articles
    - `featured_articles` - Tracks featured articles
    - `editors_pick` - Tracks editor's pick articles
    - `trending_articles` - Tracks trending articles
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public access
*/

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  excerpt text NOT NULL,
  content text NOT NULL,
  category_id uuid REFERENCES categories(id),
  category_name text NOT NULL,
  author text NOT NULL,
  author_bio text,
  publish_date timestamptz NOT NULL,
  read_time text,
  tags text,
  featured_image text NOT NULL,
  featured_image_alt text,
  meta_description text,
  status text NOT NULL CHECK (status IN ('draft', 'review', 'published')),
  allow_comments boolean DEFAULT true,
  featured boolean DEFAULT false,
  trending boolean DEFAULT false,
  views text DEFAULT '0',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Videos Table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  views text DEFAULT '0',
  upload_date timestamptz NOT NULL,
  thumbnail text NOT NULL,
  youtube_url text NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'published')),
  category text NOT NULL,
  section text NOT NULL CHECK (section IN ('Magazine', 'FullEpisodes', 'MindBattles', 'PitchPerfect', 'InsightStories', 'BehindInsight')),
  rating numeric DEFAULT 4.5,
  is_new boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Podcast Episodes Table
CREATE TABLE IF NOT EXISTS podcast_episodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  guest text NOT NULL,
  duration text NOT NULL,
  plays text DEFAULT '0',
  downloads text DEFAULT '0',
  publish_date timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'published', 'scheduled')),
  youtube_url text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Main Articles Table
CREATE TABLE IF NOT EXISTS main_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  position text NOT NULL CHECK (position IN ('main', 'second')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(position)
);

-- Featured Articles Table
CREATE TABLE IF NOT EXISTS featured_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  display_order int NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(display_order)
);

-- Editors Pick Table
CREATE TABLE IF NOT EXISTS editors_pick (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  display_order int NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(display_order)
);

-- Trending Articles Table
CREATE TABLE IF NOT EXISTS trending_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  display_order int NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(display_order)
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE main_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE editors_pick ENABLE ROW LEVEL SECURITY;
ALTER TABLE trending_articles ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- Categories Policies
CREATE POLICY "Public can read categories"
  ON categories
  FOR SELECT
  TO anon
  USING (true);

-- Articles Policies
CREATE POLICY "Public can read published articles"
  ON articles
  FOR SELECT
  TO anon
  USING (status = 'published');

-- Videos Policies
CREATE POLICY "Public can read published videos"
  ON videos
  FOR SELECT
  TO anon
  USING (status = 'published');

-- Podcast Episodes Policies
CREATE POLICY "Public can read published podcast episodes"
  ON podcast_episodes
  FOR SELECT
  TO anon
  USING (status = 'published');

-- Main Articles Policies
CREATE POLICY "Public can read main articles"
  ON main_articles
  FOR SELECT
  TO anon
  USING (true);

-- Featured Articles Policies
CREATE POLICY "Public can read featured articles"
  ON featured_articles
  FOR SELECT
  TO anon
  USING (true);

-- Editors Pick Policies
CREATE POLICY "Public can read editors pick"
  ON editors_pick
  FOR SELECT
  TO anon
  USING (true);

-- Trending Articles Policies
CREATE POLICY "Public can read trending articles"
  ON trending_articles
  FOR SELECT
  TO anon
  USING (true);

-- Insert default categories
INSERT INTO categories (name, description)
VALUES
  ('Research World', 'Academic research and educational studies'),
  ('Spirit of Africa', 'Cultural and traditional aspects of African education'),
  ('Tech Trends', 'Technology innovations in education'),
  ('Need to Know', 'Essential educational information and updates'),
  ('Echoes of Home', 'Stories about local educational initiatives'),
  ('Career Campus', 'Career development and professional education'),
  ('Mind and Body Quest', 'Mental health and physical wellbeing in education'),
  ('E! Corner', 'Entertainment and creative aspects of education')
ON CONFLICT (name) DO NOTHING;

-- Insert sample articles
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
    'The Future of African Education Technology', 
    'How AI and digital innovation are reshaping learning across the continent', 
    'Explore the groundbreaking technologies and innovative approaches that are transforming education in Africa, from AI-powered learning platforms to mobile-first solutions reaching remote communities.',
    'The landscape of education in Africa is undergoing a revolutionary transformation, driven by cutting-edge technology and innovative approaches that are reshaping how students learn and teachers teach across the continent.\n\n## The Digital Revolution in African Classrooms\n\nAcross the continent, educators are embracing new technologies that make learning more accessible, engaging, and effective. From rural schools using solar-powered tablets to urban universities implementing AI-driven learning platforms, the educational landscape is evolving rapidly.\n\n### Mobile-First Solutions\n\nWith mobile phone penetration exceeding 80% in many African countries, educational technology developers are creating mobile-first solutions that work even in areas with limited internet connectivity. These applications allow students to download content when they have access to the internet and continue learning offline.\n\n## Addressing Unique Challenges\n\nAfrican edtech innovators are developing solutions tailored to the continent''s unique challenges:\n\n- **Language diversity**: Applications that support multiple local languages\n- **Infrastructure limitations**: Low-bandwidth solutions and offline capabilities\n- **Scalability**: Platforms designed to reach millions of learners at minimal cost\n\n## The Role of Artificial Intelligence\n\nAI is playing an increasingly important role in personalizing education for African learners. Adaptive learning platforms can identify knowledge gaps and adjust content accordingly, ensuring that each student receives the support they need.\n\n## Looking Ahead\n\nAs technology continues to evolve and become more accessible, the future of education in Africa looks increasingly digital, personalized, and inclusive. The innovations happening today are laying the groundwork for a generation of digitally-empowered learners who will shape the continent''s future.',
    'Tech Trends',
    'Dr. Amara Okafor',
    'Education Technology Researcher at University of Cape Town',
    '2024-03-15',
    '12 min read',
    'AI, Education, Technology, Africa',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'Students using technology in classroom',
    'Discover how AI and digital innovation are transforming education across Africa',
    'published',
    false,
    false,
    '45.2K'
  ),
  (
    'Women Leading Educational Innovation Across Africa', 
    'Celebrating the female pioneers transforming learning landscapes', 
    'Meet the remarkable women who are breaking barriers and creating new pathways in education, from grassroots initiatives to cutting-edge research that''s changing lives across the continent.',
    'Across the African continent, women are at the forefront of educational innovation, leading transformative initiatives that are reshaping how we think about learning and teaching.\n\n## Breaking Barriers in Leadership\n\nFrom university chancellors to education ministers, women are taking on leadership roles that were once dominated by men. These pioneers are not only breaking glass ceilings but also bringing fresh perspectives to educational policy and administration.\n\n### Grassroots Innovators\n\nAt the community level, female educators are developing creative solutions to local challenges:\n\n- Village-based literacy programs led by women for women\n- Mobile schools that bring education to nomadic communities\n- Mentorship networks connecting professional women with young girls\n\n## Technology Trailblazers\n\nWomen are also leading the way in educational technology:\n\n- Developing apps that teach coding to girls\n- Creating digital platforms that make learning accessible in multiple African languages\n- Designing hardware solutions for schools with limited infrastructure\n\n## The Path Forward\n\nWhile progress has been made, challenges remain. Gender disparities in educational leadership positions persist, and many girls still face barriers to education. However, the women profiled in this article demonstrate that change is possible and that the future of African education will be shaped by diverse voices and perspectives.',
    'Career Campus',
    'Sarah Mwangi',
    'Gender & Education Policy Analyst',
    '2024-03-12',
    '10 min read',
    'Women, Leadership, Education, Innovation',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'African women in education leadership',
    'Celebrating female pioneers transforming education across Africa',
    'published',
    false,
    false,
    '38.7K'
  ),
  (
    'Mental Health Support in Universities',
    'Addressing the growing mental health challenges among students with innovative support systems and campus-wide initiatives.',
    'Universities across Africa are implementing comprehensive mental health support systems to address the growing challenges faced by students in today''s high-pressure academic environment.',
    'The mental health of university students has become a critical concern across African institutions of higher learning. As academic pressures mount and social media creates unrealistic expectations, more students than ever are reporting anxiety, depression, and burnout.\n\n## The Scale of the Challenge\n\nRecent studies indicate that up to 35% of university students experience significant mental health challenges during their academic careers. These issues can impact academic performance, social relationships, and long-term wellbeing.\n\n## Innovative Support Systems\n\nUniversities are responding with multi-faceted approaches:\n\n- **Peer counseling networks** that train students to provide first-line support\n- **24/7 crisis hotlines** staffed by mental health professionals\n- **Integration of mental health literacy** into core curriculum\n- **Wellness centers** that combine traditional and modern therapeutic approaches\n\n## Technology Solutions\n\nDigital tools are expanding the reach of mental health services:\n\n- Anonymous support apps that connect students with counselors\n- AI-powered mood tracking and intervention systems\n- Virtual reality therapy for anxiety management\n\n## Cultural Considerations\n\nEffective mental health support must be culturally appropriate. Many universities are incorporating traditional healing practices alongside Western psychological approaches, creating holistic systems that resonate with diverse student populations.\n\n## The Road Ahead\n\nWhile progress has been made, stigma around mental health remains a significant barrier. University leaders are working to normalize conversations about mental wellbeing and create campus cultures where seeking help is seen as a sign of strength rather than weakness.',
    'Mind and Body Quest',
    'Dr. Sarah Ochieng',
    'Clinical Psychologist and University Counseling Director',
    '2024-03-10',
    '8 min read',
    'Mental Health, Universities, Student Wellbeing, Support Systems',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'Student in university counseling session',
    'How African universities are addressing the student mental health crisis',
    'published',
    true,
    false,
    '32.1K'
  ),
  (
    'Traditional Wisdom Meets Modern Learning',
    'How indigenous knowledge systems are being integrated into contemporary educational frameworks across Africa.',
    'The integration of traditional wisdom with modern educational approaches is creating powerful learning experiences that honor cultural heritage while preparing students for the future.',
    'Across Africa, a revolution in education is taking place as traditional knowledge systems are being woven into contemporary learning frameworks. This integration honors ancestral wisdom while equipping students with the tools they need for the modern world.\n\n## The Value of Indigenous Knowledge\n\nIndigenous knowledge systems contain centuries of observations about the natural world, sustainable practices, and social organization. These systems offer valuable insights that complement scientific understanding and provide culturally relevant learning contexts.\n\n## Practical Applications\n\nThe integration takes many forms:\n\n- **Environmental education** that incorporates traditional conservation practices\n- **Mathematics curriculum** that explores indigenous counting systems and geometric patterns\n- **Literature courses** that elevate oral storytelling traditions alongside written texts\n- **Agricultural programs** that combine traditional farming techniques with modern innovations\n\n## Community Involvement\n\nElders and knowledge keepers play crucial roles as guest lecturers, curriculum advisors, and mentors. Their involvement ensures authenticity and creates intergenerational connections that strengthen community bonds.\n\n## Challenges and Solutions\n\nIntegrating traditional knowledge presents challenges, including documentation of oral traditions and reconciling different epistemological approaches. Successful programs address these challenges through:\n\n- Collaborative research involving elders and academics\n- Development of culturally appropriate assessment methods\n- Creation of multilingual learning materials\n\n## The Future of Integrated Education\n\nAs this approach gains momentum, it promises to create educational experiences that are more relevant, engaging, and effective for African learners. By honoring both traditional and modern knowledge systems, schools can help students develop strong cultural identities while preparing them to thrive in a global context.',
    'Spirit of Africa',
    'Chief Amina Hassan',
    'Traditional Knowledge Keeper and Educational Consultant',
    '2024-03-08',
    '6 min read',
    'Indigenous Knowledge, Cultural Heritage, Educational Innovation, Traditional Wisdom',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'Elder teaching traditional knowledge to students',
    'Integrating indigenous knowledge systems into modern African education',
    'published',
    true,
    false,
    '28.9K'
  ),
  (
    'The Rise of EdTech Startups in Africa',
    'Young entrepreneurs are revolutionizing education through innovative technology solutions tailored for African contexts.',
    'A new generation of African entrepreneurs is creating innovative educational technology solutions that address unique local challenges while opening up global opportunities for learners across the continent.',
    'From Nairobi to Lagos, Cape Town to Cairo, a wave of educational technology startups is transforming how Africans learn. These companies, often founded by young entrepreneurs who understand local challenges firsthand, are creating solutions that work within African contexts while connecting students to global opportunities.\n\n## Solving Local Challenges\n\nAfrican edtech startups are addressing specific regional needs:\n\n- **Connectivity solutions** that work in low-bandwidth environments\n- **Multilingual platforms** supporting local languages alongside international ones\n- **Offline capabilities** for areas with intermittent electricity and internet\n- **Mobile-first approaches** that recognize smartphones as the primary computing device\n\n## Success Stories\n\nSeveral startups have already achieved significant impact:\n\n- **M-Shule** in Kenya uses AI-powered SMS to deliver personalized learning to primary school students\n- **Ubongo** reaches millions of children across Africa with educational cartoons and interactive content\n- **Ulesson** provides comprehensive K-12 learning through an affordable app with engaging video lessons\n\n## Funding Landscape\n\nInvestment in African edtech has grown exponentially, with venture capital funding increasing by 300% since 2019. This influx of capital is enabling startups to scale their solutions and reach more learners.\n\n## Challenges and Opportunities\n\nDespite progress, challenges remain, including regulatory hurdles, infrastructure limitations, and the need for sustainable business models. However, these challenges are driving innovation, with startups developing creative approaches to overcome barriers.\n\n## The Future\n\nAs African edtech continues to evolve, we can expect to see more specialized solutions targeting specific educational needs, greater collaboration between startups and traditional institutions, and increased focus on developing advanced skills like coding, AI, and data science that will power Africa''s digital economy.',
    'Tech Trends',
    'James Mwangi',
    'Technology Journalist and EdTech Analyst',
    '2024-03-05',
    '7 min read',
    'EdTech, Startups, Innovation, Entrepreneurship',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'Young African tech entrepreneurs working on educational solutions',
    'How African entrepreneurs are creating innovative educational technology solutions',
    'published',
    true,
    false,
    '41.3K'
  ),
  (
    'Revolutionary Teaching Methods Transforming African Classrooms',
    'Innovative pedagogical approaches that are changing how students learn and engage with educational content.',
    'Across African classrooms, revolutionary teaching methods are transforming the educational experience, moving beyond rote learning to foster critical thinking, creativity, and practical skills.',
    'The traditional image of African classrooms filled with students memorizing facts is rapidly giving way to dynamic learning environments where critical thinking, creativity, and practical skills take center stage. Innovative educators across the continent are pioneering teaching methods that engage students more deeply and prepare them for the challenges of the 21st century.\n\n## Beyond Rote Learning\n\nProgressive educators are moving away from memorization-based approaches to methods that develop higher-order thinking skills:\n\n- **Problem-based learning** that presents students with real-world challenges\n- **Flipped classroom models** where content is studied at home and class time is used for discussion and application\n- **Peer teaching** approaches that empower students to share knowledge\n\n## Technology as an Enabler\n\nWhile innovative teaching doesn''t require technology, digital tools are amplifying what''s possible:\n\n- Virtual science labs making experiments accessible even in resource-limited schools\n- Collaborative digital platforms connecting rural classrooms with global learning communities\n- Gamified learning applications that make practice engaging and rewarding\n\n## Assessment Revolution\n\nAs teaching methods evolve, so too are approaches to assessment:\n\n- Portfolio-based evaluation that captures the full range of student abilities\n- Project assessments that measure application of knowledge rather than memorization\n- Self and peer assessment practices that develop metacognitive skills\n\n## Teacher Development\n\nThe success of these approaches depends on well-prepared teachers. New teacher training programs focus on:\n\n- Practical classroom management techniques for student-centered learning\n- Technology integration skills\n- Facilitation rather than lecturing\n\n## Measuring Impact\n\nEarly results are promising. Schools implementing these innovative approaches report higher student engagement, improved retention, and better performance on assessments that measure critical thinking and problem-solving.\n\n## Challenges and Solutions\n\nImplementing new teaching methods isn''t without challenges. Large class sizes, limited resources, and examination-focused education systems can create barriers. However, creative educators are finding ways to adapt innovative approaches to work within these constraints, demonstrating that meaningful educational change is possible even in challenging contexts.',
    'Research World',
    'Prof. Kwame Asante',
    'Educational Researcher and Pedagogical Innovator',
    '2024-03-03',
    '9 min read',
    'Teaching Methods, Pedagogy, Educational Innovation, Critical Thinking',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'Innovative classroom setup with students engaged in collaborative learning',
    'Innovative teaching methods transforming education across Africa',
    'published',
    false,
    true,
    '35.7K'
  ),
  (
    'Digital Literacy for Rural Communities',
    'Bridging the digital divide through innovative educational programs in remote areas.',
    'Rural communities across Africa are gaining access to digital literacy programs that are opening new opportunities for education, entrepreneurship, and connection to the wider world.',
    'In remote villages and rural communities across Africa, a quiet revolution is taking place as innovative digital literacy programs bridge the gap between technological haves and have-nots. These initiatives are creating pathways to education, entrepreneurship, and global connection for populations that have historically been left behind in the digital transformation.\n\n## Mobile Classrooms\n\nOne of the most successful approaches involves mobile digital literacy units that travel between rural communities:\n\n- Solar-powered computer labs housed in converted buses or containers\n- Training programs tailored to local needs and contexts\n- Curriculum that focuses on practical digital skills with immediate applications\n\n## Community Tech Hubs\n\nPermanent technology centers in rural areas serve as anchors for ongoing digital education:\n\n- Shared computing resources managed by the community\n- Regular classes for different age groups and skill levels\n- Internet access points that serve the broader community\n\n## Appropriate Technology\n\nSuccessful programs recognize that digital literacy in rural areas requires appropriate technology solutions:\n\n- Low-power devices that can operate with intermittent electricity\n- Offline-first applications that sync when connectivity is available\n- User interfaces designed for those new to digital technology\n\n## Beyond Basic Skills\n\nWhile basic computer operation and internet navigation form the foundation, many programs go further:\n\n- Digital entrepreneurship training that opens new economic opportunities\n- Media literacy to help users critically evaluate online information\n- Digital citizenship education that promotes safe and ethical technology use\n\n## Measuring Success\n\nThe impact of these programs extends far beyond technical skills:\n\n- Students using digital resources to supplement formal education\n- Farmers accessing market information and agricultural techniques online\n- Small business owners expanding their customer base through digital platforms\n- Community members connecting with distant relatives and broader social networks\n\n## Challenges and Innovations\n\nDespite progress, challenges remain, including infrastructure limitations, device affordability, and cultural barriers. Innovative approaches to address these challenges include community device-sharing models, content in local languages, and integration with existing community structures like schools, churches, and markets.',
    'Tech Trends',
    'Dr. Kemi Adebayo',
    'Digital Inclusion Researcher',
    '2024-03-01',
    '6 min read',
    'Digital Literacy, Rural Education, Technology Access, Digital Divide',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'Rural students learning digital skills',
    'How digital literacy programs are transforming opportunities in rural African communities',
    'published',
    false,
    true,
    '18.3K'
  )
ON CONFLICT (id) DO NOTHING;

-- Set up main articles
DO $$
DECLARE
  main_article_id uuid;
  second_article_id uuid;
BEGIN
  -- Get IDs for main articles
  SELECT id INTO main_article_id FROM articles WHERE title = 'The Future of African Education Technology' LIMIT 1;
  SELECT id INTO second_article_id FROM articles WHERE title = 'Women Leading Educational Innovation Across Africa' LIMIT 1;
  
  -- Insert main articles if IDs were found
  IF main_article_id IS NOT NULL THEN
    INSERT INTO main_articles (article_id, position) 
    VALUES (main_article_id, 'main')
    ON CONFLICT (position) DO UPDATE SET article_id = EXCLUDED.article_id;
  END IF;
  
  IF second_article_id IS NOT NULL THEN
    INSERT INTO main_articles (article_id, position) 
    VALUES (second_article_id, 'second')
    ON CONFLICT (position) DO UPDATE SET article_id = EXCLUDED.article_id;
  END IF;
END $$;

-- Set up featured articles
DO $$
DECLARE
  article_id uuid;
  counter int := 1;
BEGIN
  -- Get featured articles
  FOR article_id IN 
    SELECT id FROM articles 
    WHERE featured = true 
    ORDER BY publish_date DESC 
    LIMIT 3
  LOOP
    INSERT INTO featured_articles (article_id, display_order)
    VALUES (article_id, counter)
    ON CONFLICT (display_order) DO UPDATE SET article_id = EXCLUDED.article_id;
    
    counter := counter + 1;
  END LOOP;
END $$;

-- Set up trending articles
DO $$
DECLARE
  article_id uuid;
  counter int := 1;
BEGIN
  -- Get trending articles
  FOR article_id IN 
    SELECT id FROM articles 
    WHERE trending = true 
    ORDER BY publish_date DESC
  LOOP
    INSERT INTO trending_articles (article_id, display_order)
    VALUES (article_id, counter)
    ON CONFLICT (display_order) DO UPDATE SET article_id = EXCLUDED.article_id;
    
    counter := counter + 1;
  END LOOP;
END $$;

-- Insert sample videos
INSERT INTO videos (
  title,
  description,
  duration,
  views,
  upload_date,
  thumbnail,
  youtube_url,
  status,
  category,
  section,
  rating,
  is_new
)
VALUES
  (
    'The Future of Education in Africa',
    'A comprehensive look at educational transformation across the continent',
    '25:30',
    '125K',
    '2024-03-15',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://youtube.com/watch?v=example1',
    'published',
    'Tech Trends',
    'Magazine',
    4.8,
    true
  ),
  (
    'Digital Learning Revolution',
    'How technology is reshaping classrooms worldwide',
    '18:45',
    '98K',
    '2024-03-12',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://youtube.com/watch?v=example2',
    'published',
    'Tech Trends',
    'Magazine',
    4.6,
    false
  ),
  (
    'Women in STEM Education',
    'Inspiring stories of female leaders in science and technology education',
    '22:15',
    '87K',
    '2024-03-10',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://youtube.com/watch?v=example3',
    'published',
    'Career Campus',
    'Magazine',
    4.9,
    false
  ),
  (
    'Innovation in Rural Schools',
    'Creative solutions for educational challenges in remote areas',
    '20:30',
    '76K',
    '2024-03-08',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://youtube.com/watch?v=example4',
    'published',
    'Spirit of Africa',
    'Magazine',
    4.7,
    false
  ),
  (
    'Innovation Challenge: Episode 12',
    'Young innovators present groundbreaking solutions to Africa''s educational challenges',
    '58:42',
    '125K',
    '2024-03-15',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://youtube.com/watch?v=example5',
    'published',
    'Tech Trends',
    'FullEpisodes',
    4.9,
    true
  ),
  (
    'Mathematics Showdown',
    'Intense mathematical problem-solving under pressure',
    '15:22',
    '245K',
    '2024-03-12',
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://youtube.com/watch?v=example6',
    'published',
    'Mind and Body Quest',
    'MindBattles',
    4.9,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Insert sample podcast episodes
INSERT INTO podcast_episodes (
  title,
  guest,
  duration,
  plays,
  downloads,
  publish_date,
  status,
  youtube_url,
  description,
  image
)
VALUES
  (
    'The Future of Learning: AI in Education',
    'Dr. Kwame Asante',
    '58 min',
    '12.5K',
    '5.2K',
    '2024-03-15',
    'published',
    'https://youtube.com/watch?v=podcast1',
    'Join us for an in-depth conversation with leading AI researchers and educators as we explore how artificial intelligence is reshaping the educational landscape.',
    'https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  ),
  (
    'Building Inclusive Learning Environments',
    'Prof. Amina Hassan',
    '45 min',
    '8.2K',
    '3.7K',
    '2024-03-08',
    'published',
    'https://youtube.com/watch?v=podcast2',
    'Exploring strategies for creating educational spaces that welcome and support all learners.',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  ),
  (
    'The Power of Storytelling in Education',
    'Marcus Johnson',
    '52 min',
    '9.7K',
    '4.3K',
    '2024-03-01',
    'published',
    'https://youtube.com/watch?v=podcast3',
    'How narrative techniques can transform the way we teach and learn complex subjects.',
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  )
ON CONFLICT (id) DO NOTHING;
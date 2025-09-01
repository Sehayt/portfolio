// Define available languages
export type Language = 'en' | 'fr';

// Define the translations structure
export interface Translations {
  [key: string]: {
    [key in Language]?: string;
  };
}

// Simple translations dictionary
export const translations: Translations = {
  // Navigation
  'nav.home': {
    en: 'Home',
    fr: 'Accueil'
  },
  'nav.education': {
    en: 'Education',
    fr: 'Formation'
  },
  'nav.experience': {
    en: 'Experience',
    fr: 'Expérience'
  },
  'nav.projects': {
    en: 'Projects',
    fr: 'Projets'
  },
  'nav.skills': {
    en: 'Skills',
    fr: 'Compétences'
  },
  'nav.services': {
    en: 'Services',
    fr: 'Services'
  },
  'nav.contact': {
    en: 'Contact',
    fr: 'Contact'
  },
  'nav.blog': {
    en: 'Blog',
    fr: 'Blog'
  },
  

  // Hero Section
  'hero.greeting': {
    en: 'Hey !',
    fr: 'Salut !'
  },
  'hero.iam': {
    en: 'I\'m',
    fr: 'Je suis'
  },
  'hero.title': {
    en: 'DATA ENTHUSIAST',
    fr: 'DATA ENTHUSIAST'
  },
  'hero.description': {
    en: 'Welcome to my portfolio! I specialize in building high-performance data infrastructures, optimizing workflows, and integrating AI-driven innovations to drive business growth. With hands-on experience, I’ve led impactful projects for industry leaders, transforming data into strategic insights and scalable solutions. I thrive on solving complex challenges that make a real impact. Innovation is at the core of what I do. 🚀',
    fr: 'Bienvenue sur mon portfolio ! Je suis spécialisé dans la conception d’infrastructures de données haute performance, l’optimisation des workflows et l’intégration d’innovations basées sur l’IA pour stimuler la croissance des entreprises. Grâce à une expérience concrète, j’ai mené des projets d’envergure pour des leaders du secteur, transformant les données en insights stratégiques et en solutions évolutives. J’aime relever des défis complexes qui ont un impact réel. L’innovation est au cœur de mon travail. 🚀'
  },
  'hero.download': {
    en: 'Download Resume',
    fr: 'Télécharger CV'
  },
  'hero.scrollDown': {
    en: 'Scroll Down',
    fr: 'Défiler vers le bas'
  },
  'hero.getInTouch': {
    en: 'Get in Touch',
    fr: 'Me Contacter'
  },

  // Section Titles
  'education.title': {
    en: 'Education Journey',
    fr: 'Parcours Académique'
  },
  'education.subtitle': {
    en: 'An interactive timeline of my academic background and continuous learning',
    fr: 'Une chronologie interactive de mon parcours académique et apprentissage continu'
  },
  'education.clickPrompt': {
    en: 'Click on any milestone to see more details about my educational journey and achievements.',
    fr: 'Cliquez sur une étape pour découvrir mon parcours éducatif et les accomplissements qui l\'ont marqué.'
  },
  'experience.title': {
    en: 'Professional Journey',
    fr: 'Parcours Professionnel'
  },
  'experience.clickPrompt': {
    en: 'Click on any milestone to view details about my role, achievements, and key projects.',
    fr: 'Cliquez sur une étape pour voir les détails de mon rôle, mes réalisations et les projets clés.'
  },  
  'experience.subtitle': {
    en: 'An interactive timeline showcasing my career progression and key projects',
    fr: 'Une chronologie interactive présentant ma progression de carrière et mes projets clés'
  },
  'projects.title': {
    en: 'My Projects',
    fr: 'Mes Projets'
  },
  'projects.subtitle': {
    en: 'Here are some of my projects I have done.',
    fr: 'Voici quelques projets que j\'ai réalisés.'
  },
  'skills.title': {
    en: 'Skills & Technologies',
    fr: 'Compétences & Technologies'
  },
  'skills.subtitle': {
    en: 'Tools and technologies I use to build modern, responsive, and user-friendly applications',
    fr: 'Outils et technologies que j\'utilise pour créer des applications modernes, réactives et conviviales'
  },
  'contact.title': {
    en: 'Let\'s Connect',
    fr: 'Entrons en Contact'
  },
  'contact.subtitle': {
    en: 'Have a question or want to work together? Get in touch and let\'s create something amazing.',
    fr: 'Vous avez une question ou souhaitez collaborer ? Contactez-moi et créons quelque chose d\'incroyable.'
  },
  'contact.email': {
    en: 'Email',
    fr: 'Email'
  },
  'contact.phone': {
    en: 'Phone',
    fr: 'Téléphone'
  },
  'contact.location': {
    en: 'Location',
    fr: 'Localisation'
  },
  'contact.form.firstName': {
    en: 'First Name',
    fr: 'Prénom'
  },
  'contact.form.lastName': {
    en: 'Last Name',
    fr: 'Nom'
  },
  'contact.form.email': {
    en: 'Email',
    fr: 'Email'
  },
  'contact.form.message': {
    en: 'Message',
    fr: 'Message'
  },
  'contact.form.send': {
    en: 'Send Message',
    fr: 'Envoyer Message'
  },
  'contact.form.sending': {
    en: 'Sending...',
    fr: 'Envoi...'
  },
  'contact.form.successMessage': {
    en: 'Thank you for your message! I\'ll get back to you soon.',
    fr: 'Merci pour votre message ! Je vous répondrai bientôt.'
  },
  'contact.form.errorMessage': {
    en: 'Sorry, there was an error sending your message. Please try again.',
    fr: 'Désolé, une erreur s\'est produite lors de l\'envoi de votre message. Veuillez réessayer.'
  },
  'blog.title': {
    en: 'Blog & Insights',
    fr: 'Blog & Insights'
  },
  'blog.subtitle': {
    en: 'Thoughts, tutorials, and insights on Data Engineering, Cloud Computing, and Generative AI.',
    fr: 'Idées, tutoriels et réflexions sur le Data Engineering, le Cloud Computing et l’IA Générative'
  },

  // Services Section
  'services.title': {
    en: 'My Services',
    fr: 'Mes Services'
  },
  'services.subtitle': {
    en: 'Specialized data and cloud engineering services to help organizations transform their data into valuable insights and operational advantages.',
    fr: 'Services spécialisés en ingénierie de données et cloud pour aider les organisations à transformer leurs données en informations précieuses et en avantages opérationnels.'
  },
  'services.dataEngineering.title': {
    en: 'Data Engineering',
    fr: 'Ingénierie des Données'
  },
  'services.dataEngineering.description': {
    en: 'Expert design and implementation of data pipelines, ETL processes, and data warehousing solutions using technologies like GCP, BigQuery, and Apache tools. Turning raw data into structured and accessible information for your business.',
    fr: 'Conception et implémentation expertes de pipelines de données, de processus ETL et de solutions d\'entreposage de données utilisant des technologies comme GCP, BigQuery et les outils Apache. Transformation de données brutes en informations structurées et accessibles pour votre entreprise.'
  },
  'services.cloudSolutions.title': {
    en: 'Cloud Solutions',
    fr: 'Solutions Cloud'
  },
  'services.cloudSolutions.description': {
    en: 'Implementation of cloud-based architectures on GCP and Azure with focus on scalability, security, and cost-efficiency. Design and deployment of cloud data platforms with continuous integration pipelines.',
    fr: 'Implémentation d\'architectures basées sur le cloud sur GCP et Azure avec un accent sur l\'évolutivité, la sécurité et la rentabilité. Conception et déploiement de plateformes de données cloud avec des pipelines d\'intégration continue.'
  },
  'services.dataAnalytics.title': {
    en: 'Data Analytics & Visualization',
    fr: 'Analyse de Données & Visualisation'
  },
  'services.dataAnalytics.description': {
    en: 'Development of comprehensive analytical dashboards and reports using Power BI and other visualization tools. Transforming complex data into clear, actionable insights for strategic decision-making.',
    fr: 'Développement de tableaux de bord analytiques complets et de rapports utilisant Power BI et d\'autres outils de visualisation. Transformation de données complexes en informations claires et exploitables pour la prise de décision stratégique.'
  },
  'services.machineLearning.title': {
    en: 'Machine Learning Solutions',
    fr: 'Solutions d\'Apprentissage Automatique'
  },
  'services.machineLearning.description': {
    en: 'Design and implementation of custom machine learning and NLP models for business applications. Specialized in text analysis, document processing, and predictive analytics using PyTorch and Hugging Face.',
    fr: 'Conception et implémentation de modèles personnalisés d\'apprentissage automatique et de NLP pour applications professionnelles. Spécialisé dans l\'analyse de texte, le traitement de documents et l\'analyse prédictive utilisant PyTorch et Hugging Face.'
  },
  'services.dataAPIs.title': {
    en: 'Data APIs & Integration',
    fr: 'APIs de Données & Intégration'
  },
  'services.dataAPIs.description': {
    en: 'Development of robust APIs for data services using Flask, FastAPI, and GraphQL. Seamless integration of data systems with existing applications and third-party services for efficient information flow.',
    fr: 'Développement d\'APIs robustes pour services de données utilisant Flask, FastAPI et GraphQL. Intégration transparente des systèmes de données avec les applications existantes et les services tiers pour un flux d\'informations efficace.'
  },
  'services.consulting.title': {
    en: 'Data Strategy Consulting',
    fr: 'Conseil en Stratégie de Données'
  },
  'services.consulting.description': {
    en: 'Strategic guidance on data architecture, governance, and analytics roadmaps. Helping organizations leverage their data assets effectively, improve data quality, and implement best practices for data-driven operations.',
    fr: 'Orientation stratégique sur l\'architecture de données, la gouvernance et les feuilles de route analytiques. Aide aux organisations pour tirer parti efficacement de leurs actifs de données, améliorer la qualité des données et mettre en œuvre les meilleures pratiques pour les opérations basées sur les données.'
  },


  // Common Labels
  'common.keyAchievements': {
    en: 'Key Achievements',
    fr: 'Réalisations Clés'
  },
  'common.keyCourses': {
    en: 'Key Courses',
    fr: 'Cours Principaux'
  },
  'common.keyProjects': {
    en: 'Key Projects',
    fr: 'Projets Clés'
  },
  'common.certificates': {
    en: 'Certificates',
    fr: 'Certificats'
  },
  'common.certifications': {
    en: 'Certifications',
    fr: 'Certifications'
  },
  'common.showMore': {
    en: 'Show',
    fr: 'Afficher'
  },
  'common.moreProject': {
    en: 'more project',
    fr: 'projet supplémentaire'
  },
  'common.moreProjects': {
    en: 'more projects',
    fr: 'projets supplémentaires'
  },

  // Education Content
  'education.esi.institution': {
    en: 'THE SCHOOL OF INFORMATION SCIENCES (ESI)',
    fr: 'ÉCOLE DES SCIENCES DE L\'INFORMATION (ESI)'
  },
  'education.esi.degree': {
    en: 'State Engineer Degree in Data and Knowledge',
    fr: 'Diplôme d\'Ingénieur d\'État en Données et Connaissances'
  },
  'education.esi.description': {
    en: 'Earned a State Engineer Degree specializing in Data and Knowledge engineering, focusing on advanced data processing techniques and knowledge management systems.',
    fr: 'Obtention d\'un diplôme d\'ingénieur d\'État spécialisé en ingénierie des données et des connaissances, axé sur les techniques avancées de traitement des données et les systèmes de gestion des connaissances.'
  },
  'education.esi.achievement1': {
    en: 'Specialized in data engineering and knowledge management',
    fr: 'Spécialisé en ingénierie des données et gestion des connaissances'
  },
  'education.esi.achievement2': {
    en: 'Developed expertise in Python, Java, SQL, and data processing frameworks',
    fr: 'Développé une expertise en Python, Java, SQL et frameworks de traitement de données'
  },
  'education.esi.achievement3': {
    en: 'Participated in academic research on machine learning applications',
    fr: 'Participation à la recherche académique sur les applications d\'apprentissage automatique'
  },
  'education.esi.achievement4': {
    en: 'Member of technical teams in clubs like Enactus and Geni Entreprise',
    fr: 'Membre d\'équipes techniques dans des clubs comme Enactus et Geni Entreprise'
  },
  'education.esi.achievement5': {
    en: 'Completed internships focused on data science and analytics',
    fr: 'Stages effectués axés sur la science des données et l\'analytique'
  },
  'education.esi.course1': {
    en: 'Data Engineering',
    fr: 'Ingénierie des Données'
  },
  'education.esi.course2': {
    en: 'Machine Learning',
    fr: 'Apprentissage Automatique'
  },
  'education.esi.course3': {
    en: 'Database Systems',
    fr: 'Systèmes de Bases de Données'
  },
  'education.esi.course4': {
    en: 'Web Application Development',
    fr: 'Développement d\'Applications Web'
  },
  'education.esi.course5': {
    en: 'Big Data Processing',
    fr: 'Traitement des Mégadonnées'
  },
  'education.esi.course6': {
    en: 'AI Fundamentals',
    fr: 'Fondamentaux de l\'IA'
  },

  'education.cpge.institution': {
    en: 'Preparatory Classes for Engineering Schools (CPGE)',
    fr: 'Classes Préparatoires aux Grandes Écoles (CPGE)'
  },
  'education.cpge.degree': {
    en: 'Mathematics - Physics (MP)',
    fr: 'Mathématiques - Physique (MP)'
  },
  'education.cpge.description': {
    en: 'Completed intensive two-year preparatory program focusing on advanced mathematics and physics, providing strong analytical foundations for engineering studies.',
    fr: 'Programme préparatoire intensif de deux ans axé sur les mathématiques et la physique avancées, fournissant de solides bases analytiques pour les études d\'ingénierie.'
  },
  'education.cpge.achievement1': {
    en: 'Mastered advanced mathematical concepts and physical theories',
    fr: 'Maîtrise des concepts mathématiques avancés et théories physiques'
  },
  'education.cpge.achievement2': {
    en: 'Developed strong problem-solving and analytical skills',
    fr: 'Développement de solides compétences en résolution de problèmes et analyse'
  },
  'education.cpge.achievement3': {
    en: 'Prepared for and passed competitive entrance exams for engineering schools',
    fr: 'Préparation et réussite aux concours d\'entrée des écoles d\'ingénieurs'
  },
  'education.cpge.achievement4': {
    en: 'Ranked among top students in national competitive exams',
    fr: 'Classé parmi les meilleurs étudiants aux concours nationaux'
  },
  'education.cpge.achievement5': {
    en: 'Built strong foundations in scientific and engineering principles',
    fr: 'Construction de bases solides en principes scientifiques et d\'ingénierie'
  },
  'education.cpge.course1': {
    en: 'Advanced Mathematics',
    fr: 'Mathématiques Avancées'
  },
  'education.cpge.course2': {
    en: 'Theoretical Physics',
    fr: 'Physique Théorique'
  },
  'education.cpge.course3': {
    en: 'Linear Algebra',
    fr: 'Algèbre Linéaire'
  },
  'education.cpge.course4': {
    en: 'Differential Equations',
    fr: 'Équations Différentielles'
  },
  'education.cpge.course5': {
    en: 'Mechanics',
    fr: 'Mécanique'
  },
  'education.cpge.course6': {
    en: 'Scientific Computing',
    fr: 'Calcul Scientifique'
  },

  'education.certifications.institution': {
    en: 'Professional Certifications',
    fr: 'Certifications Professionnelles'
  },
  'education.certifications.degree': {
    en: 'Cloud & Data Engineering Certifications',
    fr: 'Certifications Cloud et Ingénierie des Données'
  },
  'education.certifications.description': {
    en: 'Attained multiple professional certifications in cloud technologies, data engineering, and project management.',
    fr: 'Obtention de multiples certifications professionnelles en technologies cloud, ingénierie des données et gestion de projet.'
  },
  'education.certifications.cert1': {
    en: 'Google Cloud Associate Data Practitioner',
    fr: 'Google Cloud Associate Data Practitioner'
  },
  'education.certifications.cert2': {
    en: 'Astronomer Certification for Apache Airflow Fundamentals',
    fr: 'Certification Astronomer pour les Fondamentaux d\'Apache Airflow'
  },
  'education.certifications.cert3': {
    en: 'Databricks Lakehouse Fundamentals',
    fr: 'Fondamentaux Databricks Lakehouse'
  },
  'education.certifications.cert4': {
    en: 'Scrum Foundation Professional Certification (SFPC™)',
    fr: 'Certification Professionnelle Scrum Foundation (SFPC™)'
  },

  // Experience Content
  'experience.alten.title': {
    en: 'Data & Analytics Engineer',
    fr: 'Ingénieur Données & Analytics'
  },
  'experience.alten.description': {
    en: 'Data & Analytics Engineer with dual roles supporting corporate strategy and analytics engineering for major clients like Bouygues Telecom and Renault. Implementing data analysis systems to support strategic decision-making using cloud technologies.',
    fr: 'Ingénieur Données & Analytics avec double rôle soutenant la stratégie d\'entreprise et l\'ingénierie analytique pour des clients majeurs comme Bouygues Telecom et Renault. Implémentation de systèmes d\'analyse de données pour soutenir la prise de décision stratégique utilisant les technologies cloud.'
  },
  'experience.alten.achievement1': {
    en: 'Designed data pipelines using Google Cloud Platform services for efficient data processing',
    fr: 'Conception de pipelines de données utilisant les services Google Cloud Platform pour un traitement efficace des données'
  },
  'experience.alten.achievement2': {
    en: 'Used BigQuery for complex queries and data analysis, optimizing processing efficiency',
    fr: 'Utilisation de BigQuery pour des requêtes complexes et l\'analyse de données, optimisant l\'efficacité du traitement'
  },
  'experience.alten.achievement3': {
    en: 'Developed Power BI dashboards for real-time monitoring of productivity and operational metrics',
    fr: 'Développement de tableaux de bord Power BI pour le suivi en temps réel de la productivité et des métriques opérationnelles'
  },
  'experience.alten.achievement4': {
    en: 'Implemented real-time data flows with Google Cloud services for continuous data ingestion from Salesforce',
    fr: 'Implémentation de flux de données en temps réel avec les services Google Cloud pour l\'ingestion continue de données depuis Salesforce'
  },
  'experience.alten.achievement5': {
    en: 'Created dynamic reports in Power BI, integrating complex data models for data-driven decisions',
    fr: 'Création de rapports dynamiques dans Power BI, intégrant des modèles de données complexes pour des décisions basées sur les données'
  },
  'experience.alten.achievement6': {
    en: 'Collaborated on market analysis and recruitment process optimization initiatives',
    fr: 'Collaboration sur l\'analyse de marché et les initiatives d\'optimisation des processus de recrutement'
  },
  'experience.alten.project1.name': {
    en: 'Corporate & Strategy Analytics',
    fr: 'Analytique Corporate & Stratégique'
  },
  'experience.alten.project1.description': {
    en: 'Implemented data analysis systems using business intelligence tools (Azure, Python, Power Platform) for data automation and reporting',
    fr: 'Implémentation de systèmes d\'analyse de données utilisant des outils de business intelligence (Azure, Python, Power Platform) pour l\'automatisation des données et le reporting'
  },
  'experience.alten.project2.name': {
    en: 'Bouygues Telecom Data Pipelines',
    fr: 'Pipelines de Données Bouygues Telecom'
  },
  'experience.alten.project2.description': {
    en: 'Designed and optimized data pipelines on Google Cloud Platform for efficient data processing and analysis',
    fr: 'Conception et optimisation de pipelines de données sur Google Cloud Platform pour un traitement et une analyse efficaces des données'
  },
  'experience.alten.project3.name': {
    en: 'Renault Salesforce Integration',
    fr: 'Intégration Salesforce Renault'
  },
  'experience.alten.project3.description': {
    en: 'Implemented real-time data flows from Salesforce with dynamic Power BI reporting dashboards',
    fr: 'Implémentation de flux de données en temps réel depuis Salesforce avec des tableaux de bord de reporting Power BI dynamiques'
  },
  'experience.alten.team': {
    en: 'Data & Analytics Team',
    fr: 'Équipe Données & Analytics'
  },

  'experience.ocp.title': {
    en: 'Data & Analytics Engineer',
    fr: 'Ingénieur Données & Analytics'
  },
  'experience.ocp.description': {
    en: 'Developed a generic framework for machine learning techniques, with a focus on multilingual summary models. Implemented NLP solutions and integrated AI features with web applications.',
    fr: 'Développement d\'un framework générique pour les techniques d\'apprentissage automatique, avec un focus sur les modèles de résumé multilingues. Implémentation de solutions NLP et intégration de fonctionnalités IA avec des applications web.'
  },
  'experience.ocp.achievement1': {
    en: 'Developed a generic framework for machine learning techniques, including multilingual summary models',
    fr: 'Développement d\'un framework générique pour les techniques d\'apprentissage automatique, incluant des modèles de résumé multilingues'
  },
  'experience.ocp.achievement2': {
    en: 'Deployed NLP models using Hugging Face and PyTorch for automatic text summarization',
    fr: 'Déploiement de modèles NLP utilisant Hugging Face et PyTorch pour la synthèse automatique de texte'
  },
  'experience.ocp.achievement3': {
    en: 'Integrated APIs with Flask to add AI features to interactive web applications',
    fr: 'Intégration d\'APIs avec Flask pour ajouter des fonctionnalités IA aux applications web interactives'
  },
  'experience.ocp.achievement4': {
    en: 'Worked with document processing pipelines using Elasticsearch and Parquet for efficient data storage',
    fr: 'Travail avec des pipelines de traitement de documents utilisant Elasticsearch et Parquet pour un stockage efficace des données'
  },
  'experience.ocp.achievement5': {
    en: 'Implemented full-stack solutions connecting ML models with front-end interfaces',
    fr: 'Implémentation de solutions full-stack connectant les modèles ML avec les interfaces front-end'
  },
  'experience.ocp.project1.name': {
    en: 'Multilingual Text Summarization',
    fr: 'Synthèse de Texte Multilingue'
  },
  'experience.ocp.project1.description': {
    en: 'Developed and deployed NLP models for automatic multilingual text summarization',
    fr: 'Développement et déploiement de modèles NLP pour la synthèse automatique de texte multilingue'
  },
  'experience.ocp.project2.name': {
    en: 'AI Web Integration',
    fr: 'Intégration Web IA'
  },
  'experience.ocp.project2.description': {
    en: 'Integrated machine learning models with web applications through REST APIs',
    fr: 'Intégration de modèles d\'apprentissage automatique avec des applications web via des APIs REST'
  },
  'experience.ocp.project3.name': {
    en: 'Document Processing Pipeline',
    fr: 'Pipeline de Traitement de Documents'
  },
  'experience.ocp.project3.description': {
    en: 'Created data processing pipeline for document storage and retrieval',
    fr: 'Création d\'un pipeline de traitement de données pour le stockage et la récupération de documents'
  },
  'experience.ocp.team': {
    en: 'AI & Machine Learning Team',
    fr: 'Équipe IA & Apprentissage Automatique'
  },

  'experience.1mweb.title': {
    en: 'Data Scientist',
    fr: 'Data Scientist'
  },
  'experience.1mweb.description': {
    en: 'Developed a machine learning model for automatic CV information extraction. Leveraged NLP libraries for CV data analysis and extraction, automated workflows for parallel CV processing.',
    fr: 'Développement d\'un modèle d\'apprentissage automatique pour l\'extraction automatique d\'informations de CV. Utilisation de bibliothèques NLP pour l\'analyse et l\'extraction de données de CV, automatisation des workflows pour le traitement parallèle de CV.'
  },
  'experience.1mweb.achievement1': {
    en: 'Developed a machine learning model for automatic CV information extraction',
    fr: 'Développement d\'un modèle d\'apprentissage automatique pour l\'extraction automatique d\'informations de CV'
  },
  'experience.1mweb.achievement2': {
    en: 'Leveraged NLP libraries (NLTK, SpaCy, TextBlob) for CV data analysis and extraction',
    fr: 'Utilisation de bibliothèques NLP (NLTK, SpaCy, TextBlob) pour l\'analyse et l\'extraction de données de CV'
  },
  'experience.1mweb.achievement3': {
    en: 'Automated workflows using Apache Airflow for parallel CV processing',
    fr: 'Automatisation des workflows utilisant Apache Airflow pour le traitement parallèle de CV'
  },
  'experience.1mweb.achievement4': {
    en: 'Worked in an Agile environment to integrate models into existing systems',
    fr: 'Travail dans un environnement Agile pour intégrer les modèles dans les systèmes existants'
  },
  'experience.1mweb.achievement5': {
    en: 'Enhanced recruitment processes through AI-powered document analysis',
    fr: 'Amélioration des processus de recrutement grâce à l\'analyse de documents alimentée par l\'IA'
  },
  'experience.1mweb.project1.name': {
    en: 'CV Information Extraction',
    fr: 'Extraction d\'Informations de CV'
  },
  'experience.1mweb.project1.description': {
    en: 'ML-powered system to automatically extract structured data from CVs and resumes',
    fr: 'Système alimenté par ML pour extraire automatiquement des données structurées des CV'
  },
  'experience.1mweb.project2.name': {
    en: 'Workflow Automation',
    fr: 'Automatisation des Workflows'
  },
  'experience.1mweb.project2.description': {
    en: 'Parallel processing system for CV analysis using Apache Airflow',
    fr: 'Système de traitement parallèle pour l\'analyse de CV utilisant Apache Airflow'
  },
  'experience.1mweb.team': {
    en: 'Data Science Team',
    fr: 'Équipe Data Science'
  },

  'experience.ispits.title': {
    en: 'Data Scientist',
    fr: 'Data Scientist'
  },
  'experience.ispits.description': {
    en: 'Designed and developed a mobile app with Java and Android Studio for monitoring smartphone usage. Built a Flask backend for managing app data and implemented real-time notifications.',
    fr: 'Conception et développement d\'une application mobile avec Java et Android Studio pour surveiller l\'utilisation des smartphones. Construction d\'un backend Flask pour gérer les données de l\'application et implémentation de notifications en temps réel.'
  },
  'experience.ispits.achievement1': {
    en: 'Designed and developed a mobile app with Java and Android Studio for monitoring smartphone usage',
    fr: 'Conception et développement d\'une application mobile avec Java et Android Studio pour surveiller l\'utilisation des smartphones'
  },
  'experience.ispits.achievement2': {
    en: 'Built a Flask backend for managing app data, user sessions, and frontend-server communication',
    fr: 'Construction d\'un backend Flask pour gérer les données de l\'application, les sessions utilisateur et la communication frontend-serveur'
  },
  'experience.ispits.achievement3': {
    en: 'Implemented real-time notifications to alert users of risky behaviors',
    fr: 'Implémentation de notifications en temps réel pour alerter les utilisateurs de comportements à risque'
  },
  'experience.ispits.achievement4': {
    en: 'Created UI/UX designs using Figma for intuitive user experience',
    fr: 'Création de designs UI/UX utilisant Figma pour une expérience utilisateur intuitive'
  },
  'experience.ispits.achievement5': {
    en: 'Integrated data collection and analysis components for usage pattern detection',
    fr: 'Intégration de composants de collecte et d\'analyse de données pour la détection de modèles d\'utilisation'
  },
  'experience.ispits.project1.name': {
    en: 'Smartphone Usage Monitor',
    fr: 'Moniteur d\'Utilisation de Smartphone'
  },
  'experience.ispits.project1.description': {
    en: 'Mobile application for tracking and analyzing smartphone usage patterns',
    fr: 'Application mobile pour suivre et analyser les modèles d\'utilisation des smartphones'
  },
  'experience.ispits.project2.name': {
    en: 'App Backend System',
    fr: 'Système Backend d\'Application'
  },
  'experience.ispits.project2.description': {
    en: 'Server-side application for data storage, analysis, and user management',
    fr: 'Application côté serveur pour le stockage de données, l\'analyse et la gestion des utilisateurs'
  },
  'experience.ispits.project3.name': {
    en: 'UI/UX Design',
    fr: 'Design UI/UX'
  },
  'experience.ispits.project3.description': {
    en: 'Design of intuitive user interfaces and experiences for mobile application',
    fr: 'Conception d\'interfaces utilisateur et d\'expériences intuitives pour application mobile'
  },
  'experience.ispits.team': {
    en: 'Mobile Development Team',
    fr: 'Équipe de Développement Mobile'
  },

  // Common elements
  'common.filter': {
    en: 'Filter',
    fr: 'Filtrer'
  },
  'common.clearAll': {
    en: 'Clear all',
    fr: 'Tout effacer'
  },
  'common.search': {
    en: 'Search',
    fr: 'Rechercher'
  },
  'common.send': {
    en: 'Send Message',
    fr: 'Envoyer Message'
  },
  'common.sending': {
    en: 'Sending...',
    fr: 'Envoi...'
  },

  // File uploader
  'fileUploader.dragDrop': {
    en: 'Drag and drop files here or click to browse',
    fr: 'Glissez et déposez des fichiers ici ou cliquez pour parcourir'
  },
  'fileUploader.maxSize': {
    en: 'Maximum file size',
    fr: 'Taille maximale de fichier'
  },
  'fileUploader.maxFiles': {
    en: 'Maximum files',
    fr: 'Nombre maximum de fichiers'
  },
  'fileUploader.fileTooLarge': {
    en: 'File exceeds size limit',
    fr: 'Le fichier dépasse la limite de taille'
  },
  'fileUploader.fileDuplicate': {
    en: 'File already added',
    fr: 'Fichier déjà ajouté'
  },
  'fileUploader.tooManyFiles': {
    en: 'Maximum files limit reached',
    fr: 'Limite maximale de fichiers atteinte'
  },
  'fileUploader.selectedFiles': {
    en: 'Selected Files',
    fr: 'Fichiers Sélectionnés'
  },
  'fileUploader.addMore': {
    en: 'Add More',
    fr: 'Ajouter Plus'
  },
  'fileUploader.clearAll': {
    en: 'Clear All',
    fr: 'Tout Effacer'
  }
};

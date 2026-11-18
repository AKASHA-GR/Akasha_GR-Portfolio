export const profile = {
  name: 'AKASHA G R',
  github: 'https://github.com/AKASHA-GR',
  linkedin: 'https://www.linkedin.com/in/akasha-gr/',
  email: 'akashmlk2021@gmail.com',
  phone: '+91 9353220519',
  location: 'Karnataka, India'
}

export const skillGroups = [
  { title: 'Programming', icon: 'Code2', items: ['Java', 'JavaScript', 'SQL'] },
  { title: 'Backend', icon: 'Server', items: ['Core Java', 'OOP', 'Collections Framework', 'Exception Handling', 'JDBC', 'Servlets', 'Hibernate', 'JPA', 'Spring Core', 'Spring MVC', { name: 'Spring Boot', note: 'Learning' }] },
  { title: 'Frontend', icon: 'PanelsTopLeft', items: ['HTML5', 'CSS3', 'JavaScript', { name: 'React.js', note: 'Basic' }, 'Bootstrap', { name: 'Tailwind CSS', note: 'Learning' }] },
  { title: 'Database', icon: 'Database', items: ['MySQL', 'PostgreSQL'] },
  { title: 'Tools', icon: 'Wrench', items: ['Git', 'GitHub', 'Maven', 'Postman', 'IntelliJ IDEA'] }
]

export const projects = [
  {
    number: '01',
    name: 'PlacePro',
    subtitle: 'Campus Placement Management System',
    description: 'A full-stack campus placement management platform for managing students, companies, job opportunities, applications, interviews, and placement records.',
    scope: [
      'Role-based access control with Spring Security & JWT (Admin, Officer, Student)',
      'RESTful APIs with Spring Boot and Spring Data JPA for CRUD operations',
      'Student profile, skills, and certificate management',
      'Company listings, job application tracking, and interview scheduling'
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'Spring Data JPA', 'Hibernate', 'PostgreSQL', 'React.js', 'Bootstrap', 'Maven'],
    github: 'https://github.com/AKASHA-GR/Placement_Management_System',
    live: null,
    image: null,
    status: 'Full-Stack Application · Role-Based Auth',
    visual: 'placepro'
  },
  {
    number: '02',
    name: 'Inventory Management System',
    subtitle: 'Inventory & Stock Operations',
    description: 'A web-based inventory management application designed to handle product catalogs, stock level updates, purchase and sales record tracking.',
    scope: [
      'Product catalog and stock monitoring dashboard',
      'CRUD operations implemented using Java Servlets & JDBC',
      'Relational database design and persistence with MySQL',
      'Responsive web UI built with HTML5, CSS3, JavaScript & Bootstrap'
    ],
    stack: ['Java', 'Servlets', 'JDBC', 'MySQL', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    github: 'https://github.com/AKASHA-GR/Inventory-management-system',
    live: null,
    image: null,
    status: 'Java Web Application · MVC & JDBC',
    visual: 'inventory'
  }
]

export const journey = [
  { title: 'Core Java & OOP', detail: 'Java syntax, object-oriented principles and core programming foundations.', state: 'completed' },
  { title: 'Collections & Exception Handling', detail: 'Working with Java collections and handling runtime errors.', state: 'completed' },
  { title: 'JDBC & SQL', detail: 'Database connectivity, queries and relational data fundamentals.', state: 'completed' },
  { title: 'Servlets', detail: 'Java web fundamentals and request-response lifecycle.', state: 'completed' },
  { title: 'Hibernate & JPA', detail: 'ORM concepts and persistence with Java.', state: 'completed' },
  { title: 'Spring Core & Spring MVC', detail: 'Dependency injection and MVC-based web development.', state: 'completed' },
  { title: 'Spring Boot & REST APIs', detail: 'Building production-style backend services.', state: 'learning' },
  { title: 'React.js & Full Stack Development', detail: 'Developing responsive interfaces and integrating APIs.', state: 'learning' }
]

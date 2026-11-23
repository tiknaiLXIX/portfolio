// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Ian Kit Belen',
  initials: 'IB',
  photo: 'assets/profile.jpg',
  role: 'Electrical Engineering',
  // the hero headline types through these
  headlines: ['Electrical Engineering Graduate', 'Control Systems', 'Sensor Fusion', 'Embedded & Cloud Software'],
  location: 'Brisbane, QLD',
  meta: ['QUT · B.Eng (Hons) Electrical', 'Graduating Dec 2026', 'Open to 2027 graduate roles'],
  email: 'iankitbelen@outlook.com',
  linkedin: 'https://www.linkedin.com/in/iankitbelen',
  resume: 'Ian_Kit_Belen_Resume.pdf',
};

export const about = {
  title: 'Engineering across hardware, control and software.',
  lead: "I'm a final-year Bachelor of Engineering (Honours, Electrical) student at QUT. My work runs from MATLAB/Simulink control design to breadboard prototypes, robot state estimation and cloud pipelines on AWS. I'm looking for 2027 graduate roles across Australia.",
  focus: [
    'Control systems: LQR, Takagi–Sugeno fuzzy control, LMI design',
    'State estimation and sensor fusion: EKF, UKF, camera–LiDAR',
    'Analog electronics and instrumentation: filters, amplifiers, PCB',
    'Software: Python, C, React, Node.js and serverless AWS',
  ],
};

export const featured = {
  meta: 'HONOURS RESEARCH · 2026 · Supervisor: Connor Malone',
  title: 'Autonomous Vehicle Perception for Flooded Road Detection',
  images: [
    { src: 'assets/flood.jpg', alt: 'Camera frame of a flooded road from the FRED dataset' },
    { src: 'assets/bev.jpg', alt: "Camera samples, LiDAR bird's-eye-view channels and BEV labels" },
  ],
  body: [
    'Cameras see water as reflections that look like road, and LiDAR often gets no return from it at all. Because the two sensors fail differently, I tested whether fusing them gives more reliable flood detection, using the Flooded Road Environments Dataset (FRED).',
    "I built a late-fusion pipeline that predicts a bird's-eye-view map (background, road, water). Camera labels were transferred onto LiDAR points to create BEV ground truth, then separate U-Net and SegFormer models for camera and LiDAR were trained and their class probabilities combined per cell. Every result comes from leave-one-location-out cross-validation, so models are always tested on unseen sites.",
  ],
  result: (
    'Fused mean water IoU **0.497**, against 0.440 for LiDAR and 0.416 for camera alone. Fusion was never the worst sensor at any location, and covered for LiDAR beyond 20 m.'
  ),
  tags: ['Python', 'U-Net', 'SegFormer', 'LiDAR', 'Sensor fusion', 'Computer vision'],
};

// Aoyama Gakuin internship: shown as a video showcase block.
// Videos are the MATLAB animations from the internship presentation.
export const simulation = {
  meta: 'RESEARCH INTERNSHIP · AOYAMA GAKUIN UNIVERSITY, JAPAN · 2026',
  title: 'Optimal and Takagi–Sugeno Fuzzy Control of Aircraft',
  body: [
    'Modelled the longitudinal dynamics of a Boeing 747 and a UAV in state space, then designed three controllers to recover the aircraft from a pitch disturbance: an LQR, a Takagi–Sugeno fuzzy controller using parallel distributed compensation, and an optimal (guaranteed-cost) fuzzy controller with the performance index built into the LMI constraints.',
    'Gains came from LMI optimisation in MATLAB and were tested in MATLAB/Simulink. I wrote the 3D animations to show the aircraft pitch, elevator input and pitch angle together for each controller.',
  ],
  result: 'Presented the methodology and findings to academic staff at the end of the internship.',
  tags: ['MATLAB', 'Simulink', 'LQR', 'LMI', 'T–S fuzzy control', 'State-space'],
  videos: [
    {
      label: 'Optimal fuzzy vs LQR',
      src: 'assets/video/fuzzy-vs-lqr.mp4',
      caption: 'The optimal fuzzy controller and the LQR side by side on the same pitch disturbance.',
    },
    {
      label: 'Optimal fuzzy',
      src: 'assets/video/optimal-fuzzy.mp4',
      caption: 'Guaranteed-cost T–S fuzzy controller: stability and a performance bound from one LMI problem.',
    },
    {
      label: 'T–S fuzzy (PDC)',
      src: 'assets/video/fuzzy-pdc.mp4',
      caption: 'Takagi–Sugeno fuzzy controller designed by parallel distributed compensation.',
    },
    {
      label: 'LQR',
      src: 'assets/video/lqr.mp4',
      caption: 'Linear quadratic regulator on the linearised longitudinal model.',
    },
    {
      label: 'LQR weightings',
      src: 'assets/video/lqr-weights.mp4',
      caption: 'Effect of the LQR weights: Q = 100, R = 4 against Q = 4, R = 100.',
    },
  ],
};

// EGB439 self-assigned project: EKF vs UKF on the real PenguinPi robot.
// Clips are the hardware runs side by side (EKF left, UKF right), 2x speed, muted.
export const localisation = {
  meta: 'EGB439 ADVANCED ROBOTICS · SELF-ASSIGNED PROJECT · 2026',
  title: 'EKF vs UKF Localisation on a Real Robot',
  body: [
    'Does an Unscented Kalman Filter localise a differential-drive robot better than an Extended Kalman Filter? I tested both on a PenguinPi robot, fusing wheel-encoder odometry with camera observations of three coloured beacons, over two loops of a circle (which builds up heading uncertainty) and two loops of a figure-eight (repeated changes in curvature and heading).',
    'Both filters tracked the robot on both paths with no divergence. On the circle their estimates were visually indistinguishable, because frequent beacon updates kept errors in check. On the figure-eight, the UKF tracked with less error, so its advantage shows as motion becomes more nonlinear, while the EKF remains a cheaper option for simpler paths.',
    'In the same unit I also built EKF-SLAM with OpenCV beacon detection and a pure-pursuit path follower for the PiBot.',
  ],
  result: 'The UKF performed better on the **figure-eight**; the two filters matched on the **circle**.',
  tags: ['Python', 'EKF', 'UKF', 'Sensor fusion', 'OpenCV', 'PenguinPi'],
  videos: [
    {
      label: 'Figure-eight: EKF vs UKF',
      src: 'assets/video/localisation-lemniscate.mp4',
      poster: 'assets/localisation-lemniscate.jpg',
      caption: 'Hardware runs on the figure-eight path, EKF (left) and UKF (right), with the live localiser plot on the laptop. 2× speed.',
    },
    {
      label: 'Circle: EKF vs UKF',
      src: 'assets/video/localisation-circle.mp4',
      poster: 'assets/localisation-circle.jpg',
      caption: 'Hardware runs on the circle path, EKF (left) and UKF (right), with the live localiser plot on the laptop. 2× speed.',
    },
  ],
};

// category drives the filter chips
export const projects = [
  {
    category: 'Software',
    meta: 'CAB432 CLOUD COMPUTING · 2026',
    title: 'Warehouse Inspection Fleet: Cloud Robotics Platform',
    // clip from the project demo (2:45–3:15 at 1.5x, muted)
    video: {
      src: 'assets/video/fleet-demo.mp4',
      caption: 'Live operator dashboard tracking robot-01 and the hazard map while the Gazebo simulation runs alongside',
    },
    image: { src: 'assets/fleet-poster.jpg', alt: 'Operator dashboard with live warehouse map beside the Gazebo simulation' },
    extraImage: {
      src: 'assets/warehouse.jpg',
      alt: 'Gazebo simulation of the warehouse with aisles, AprilTags, hazards and the patrol robot',
      label: 'View the Gazebo warehouse →',
    },
    body: 'Robots patrol warehouse aisles in a ROS 2 / Gazebo simulation and upload a frame per second with their pose. Frames go to S3 through pre-signed URLs from API Gateway + Lambda; S3 events queue jobs on SQS for autoscaling ECS Fargate workers that detect spills, extinguishers and fallen boxes and decode AprilTags. Results land in DynamoDB with a Memcached cache, shown on a live CloudFront dashboard.',
    result: 'Hazards reached the database in **0.24–0.30 s** (target 2 s). Load-tested with 50 simulated robots, and costed at about USD 50 per robot per month.',
    tags: ['AWS', 'ROS 2', 'Gazebo', 'ECS Fargate', 'DynamoDB', 'Python'],
  },
  {
    category: 'Software',
    meta: 'CAB230 WEB COMPUTING · ASSIGNMENT 2 · 2026',
    title: 'Rental Property Search: React Client',
    image: { src: 'assets/rentals-detail.jpg', alt: 'Rental detail page with star rating, property details and location map' },
    extraImage: {
      src: 'assets/rentals-search.jpg',
      alt: 'Rental search page with advanced filters and the AG Grid results table',
      label: 'View the search page →',
    },
    body: 'A React single-page app for finding rental properties across Australia through a REST API. Users filter by state, postcode, suburb, property type, rent, bedrooms, bathrooms, parking and rating, scroll results in an AG Grid table that loads more as they go, and open a detail page with a Pigeon Maps location map. Logged-in users can rate properties and review their rating history.',
    tags: ['React', 'React Router', 'AG Grid', 'Pigeon Maps', 'Bootstrap', 'JWT auth'],
  },
  {
    category: 'Software',
    meta: 'CAB432 CLOUD COMPUTING · ASSIGNMENT 1 · 2026',
    title: 'Strobe: Moving a Photo-sharing App to Serverless AWS',
    body: 'Strobe started as a monolith on one virtual machine. I moved its Python backend onto AWS Lambda behind API Gateway, packaging the shared code as a Lambda layer, while keeping the existing API so the provided web app works unchanged. Sign-up, login and account deletion moved to Amazon Cognito, the LowDB JSON store moved to DynamoDB tables, and photo uploads and downloads go through S3 pre-signed URLs that expire after 5 minutes.',
    tags: ['AWS Lambda', 'API Gateway', 'Cognito', 'DynamoDB', 'S3', 'Python'],
  },
  {
    category: 'Software',
    meta: 'CAB230 WEB COMPUTING · ASSIGNMENT 3 · 2026',
    title: 'Rentals REST API: Express Server',
    body: 'The server side of the rentals app: an Express REST API over MySQL using Knex. It covers rental search with filters and sorting, states and property types, user registration and login with Argon2 password hashing and JWTs, protected rating and profile routes, Swagger/OpenAPI docs at /docs, request logging with Morgan, and HTTPS.',
    tags: ['Node.js', 'Express', 'MySQL', 'Knex', 'JWT', 'Swagger'],
  },
  {
    category: 'Electronics',
    meta: 'EGH449 · GROUP PROJECT · 2026',
    title: 'Precision Weigh Scale Instrumentation Amplifier',
    image: { src: 'assets/weigh.jpg', alt: 'Breadboard prototype of the weigh scale instrumentation amplifier' },
    body: 'A three op-amp instrumentation amplifier conditions the 5 mV full-scale output of a TAL220 load cell into the 0–1 V XADC input of an Arty FPGA, with a gain of 1000 V/V split 100 × 10. It includes a voltage reference for single-supply LT1013 op-amps, diode input protection and an MCP1824T regulator. Verified with LTspice transient and Monte Carlo analysis, then built on a breadboard and laid out as a 2-layer KiCad PCB.',
    result: 'Measured unknown masses within **3%**, improving to **under 2%** with two-point calibration.',
    tags: ['LTspice', 'KiCad', 'Op-amps', 'FPGA XADC', 'Instrumentation'],
  },
  {
    category: 'Electronics',
    meta: 'UNIDUS COMMUNITY CENTRE · INTERNSHIP',
    title: 'Fail-safe Oil Pump Motor Controller',
    body: 'Designed relay-logic motor control for an oil pump system so it fails to a safe state. Simulated the circuit in Falstad and modelled the enclosure in Autodesk Inventor.',
    tags: ['Relay logic', 'Falstad', 'Inventor'],
  },
  {
    category: 'Software',
    meta: 'CAB403 SYSTEMS PROGRAMMING · 2025',
    title: 'Multi-car Elevator Control System in C',
    body: 'A networked elevator system in C: a TCP controller assigns car calls, car processes share state through POSIX shared memory, and a separate safety monitor checks it. Written with threads, sockets and a Makefile build.',
    tags: ['C', 'POSIX threads', 'TCP sockets', 'Shared memory'],
  },
  {
    category: 'Electronics',
    meta: 'EGB342 TELECOMMUNICATIONS · GROUP PROJECT',
    title: '3–5 GHz Superheterodyne Receiver Design',
    body: 'Conceptual design of a microwave receiver: LNA, mixer, filter and oscillator selection from datasheets, then gain, noise figure and image-rejection analysis to check it met spec.',
    tags: ['RF design', 'MATLAB', 'Datasheets'],
  },
  {
    category: 'Electronics',
    meta: 'EGB240 · 2024',
    title: 'Anti-aliasing Filter for a Digital Voice Recorder',
    body: 'A 6th-order Chebyshev low-pass filter in a multiple-feedback topology (4.4 kHz passband, 7.8 kHz stopband). The prototype achieved 46.4 dB stopband attenuation against a 48 dB target, with the gap traced to breadboard noise and component tolerance.',
    tags: ['Analog filters', 'LTspice', 'Prototyping'],
  },
  {
    category: 'Electronics',
    meta: 'EESS CLUB · 2025',
    title: 'Custom Game Controller',
    body: 'Modelled the PCB and a 3D-printable case in Fusion 360 and programmed the controller with Arduino.',
    tags: ['Fusion 360', 'Arduino', '3D printing'],
  },
  {
    category: 'Software',
    meta: 'QLD HERBARIUM · FREELANCE',
    title: 'Species Data-matching Automation',
    body: 'Replaced a manual task with a Python script that matches scientific names in field data to reference IDs and keeps traceable outputs, plus Excel pivot tables and charts to interpret survey data.',
    tags: ['Python', 'Excel', 'Data cleaning'],
  },
];

export const experience = [
  {
    when: 'Jun – Jul 2026',
    role: 'Research Intern',
    where: 'Aoyama Gakuin University · Sagamihara, Japan',
    points: [
      'Designed and evaluated optimal and Takagi–Sugeno fuzzy controllers for aircraft and UAV longitudinal dynamics using modelling, LMI optimisation and MATLAB/Simulink.',
      'Presented the methodology and findings to academic staff.',
    ],
  },
  {
    when: 'Nov 2025 – Feb 2026',
    role: 'Electrical Engineering Intern',
    where: 'Unidus Community Centre · Willawong, QLD',
    points: [
      'Supported facility maintenance and projects, including building repairs, supplier coordination, technical proposal reviews and a solar and battery system upgrade.',
      'Designed and validated a fail-safe relay-logic motor controller for an oil pump system.',
    ],
  },
  {
    when: 'Nov 2025 – Present',
    role: 'Kitchen Attendant',
    where: 'Stanley Restaurant · Brisbane City',
    points: ['Support chefs during peak service in a high-volume kitchen, where speed, organisation and teamwork matter.'],
  },
  {
    when: '2025',
    role: 'Research / Field Data Assistant (Freelance)',
    where: 'Queensland Herbarium · Toowong',
    points: ['Automated species data matching in Python and built Excel visualisations of ecological survey data.'],
  },
  {
    when: 'Expected Dec 2026',
    role: 'Bachelor of Engineering (Honours), Electrical',
    where: 'Queensland University of Technology',
    points: ['GPA 6.26 / 7. Honours thesis on camera–LiDAR fusion for flooded road detection.'],
  },
];

// icon = Devicon path (cdn.jsdelivr.net/gh/devicons/devicon); no icon = lettered tile
export const skills = [
  { name: 'Python', icon: 'python/python-original' },
  { name: 'MATLAB', icon: 'matlab/matlab-original' },
  { name: 'Simulink' },
  { name: 'C', icon: 'c/c-original' },
  { name: 'C++', icon: 'cplusplus/cplusplus-original' },
  { name: 'C#', icon: 'csharp/csharp-original' },
  { name: 'JavaScript', icon: 'javascript/javascript-original' },
  { name: 'React', icon: 'react/react-original' },
  { name: 'Node.js', icon: 'nodejs/nodejs-original' },
  { name: 'Express', icon: 'express/express-original' },
  { name: 'MySQL / SQL', icon: 'mysql/mysql-original' },
  { name: 'AWS', icon: 'amazonwebservices/amazonwebservices-plain-wordmark' },
  { name: 'OpenCV', icon: 'opencv/opencv-original' },
  { name: 'ROS 2', icon: 'ros/ros-original' },
  { name: 'Arduino', icon: 'arduino/arduino-original' },
  { name: 'KiCad' },
  { name: 'LTspice' },
  { name: 'Fusion 360' },
  { name: 'Autodesk Inventor' },
  { name: 'Excel' },
  { name: 'Git', icon: 'git/git-original' },
  { name: 'LaTeX', icon: 'latex/latex-original' },
];

import {
  Terminal,
  Shield,
  Lock,
  Eye,
  Globe,
  Wifi,
  Search,
  Code,
  Cloud,
} from 'lucide-react';

export interface Experience {
  num: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Project {
  num: string;
  title: string;
  tech: string;
  description: string;
  link: string;
}

export interface SkillGroup {
  num: string;
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export interface Education {
  num: string;
  school: string;
  degree: string;
  period: string;
  location: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    num: '01',
    company: 'TryHackMe',
    role: 'AI Security Path',
    period: '2024 – Present',
    location: 'Remote',
    description: [
      'Build a practical foundation in AI security. Learn how AI systems are built, where they break, and how to defend them.',
      'Mastered Metasploit Framework for vulnerability exploitation, payload generation, and post-exploitation activities.',
      'Practiced Burp Suite Pro for intercepting HTTP traffic, identifying OWASP Top 10 vulnerabilities including SQLi, XSS, IDOR, and SSRF.',
      'Performed network enumeration using Nmap, Gobuster, and Nikto to discover open ports, services, and attack surfaces.',
      'Exploited misconfigured Linux/Windows services to achieve privilege escalation via SUID binaries, cronjobs, and kernel exploits.',
    ],
  },
  {
    num: '02',
    company: 'TryHackMe',
    role: 'SOC Level 1 & 2 Paths',
    period: '2024',
    location: 'Remote',
    description: [
      'Built core SOC analyst skills: SIEM configuration, log analysis, alert triage, and incident response workflows.',
      'Worked with Splunk and ELK Stack (Elasticsearch, Logstash, Kibana) to ingest, correlate, and visualize security events.',
      'Analysed network traffic with Wireshark and Zeek to detect anomalies, C2 beaconing, and data exfiltration patterns.',
      'Deployed and tuned Snort/Suricata IDS rules to detect intrusion attempts and malicious payloads in real traffic.',
      'Conducted threat hunting using MITRE ATT&CK framework to map adversary TTPs and identify gaps in detection coverage.',
    ],
  },
  {
    num: '03',
    company: 'TryHackMe',
    role: 'Red Teaming Path',
    period: '2024',
    location: 'Remote',
    description: [
      'Simulated full kill-chain attacks against Active Directory environments: initial access, lateral movement, and domain compromise.',
      'Deployed and operated C2 frameworks to maintain persistence, establish encrypted channels, and evade basic defences.',
      'Executed phishing campaigns with credential harvesting pages and macro-enabled payloads using GoPhish and SET.',
      'Performed BloodHound/SharpHound AD enumeration to identify attack paths, Kerberoastable accounts, and DCSync targets.',
      'Practised OPSEC tradecraft: timestomping, log clearing, living-off-the-land binaries (LOLBins), and memory-only execution.',
    ],
  },
];

export const projects: Project[] = [
  {
    num: '01',
    title: 'Network Vulnerability Scanner',
    tech: 'Python · Nmap · SQLite · FastAPI · React',
    description:
      'Automated network reconnaissance tool that orchestrates Nmap scans, parses XML output, scores CVE severity, and exposes results via a FastAPI REST interface with a React dashboard for visualisation.',
    link: 'https://github.com/saitarrun',
  },
  {
    num: '02',
    title: 'CTF Write-up Collection',
    tech: 'Python · Burp Suite · Pwntools · GDB · Markdown',
    description:
      'Documented 20+ TryHackMe and HackTheBox CTF solutions covering web exploitation, binary exploitation, reverse engineering, and forensics challenges with step-by-step methodology and tooling notes.',
    link: 'https://github.com/saitarrun',
  },
  {
    num: '03',
    title: 'Active Directory Attack Lab',
    tech: 'Windows Server · PowerShell · BloodHound · Impacket · VMware',
    description:
      'Home lab simulating a corporate AD environment with a Windows Server DC and two domain-joined clients. Used to practise Kerberoasting, Pass-the-Hash, DCSync, and Golden Ticket attacks in an isolated network.',
    link: 'https://github.com/saitarrun',
  },
  {
    num: '04',
    title: 'SIEM Detection Rules Engine',
    tech: 'Splunk SPL · Python · MITRE ATT&CK · Sigma · ELK',
    description:
      'Custom detection rule library mapped to MITRE ATT&CK techniques. Includes Sigma rules converted for Splunk and ELK, automated alert pipelines, and a Python script to validate rule coverage against ATT&CK matrix.',
    link: 'https://github.com/saitarrun',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    num: '01',
    title: 'Offensive Security',
    icon: <Terminal className="w-6 h-6" />,
    skills: ['Metasploit', 'Exploit Development', 'SQLi', 'XSS', 'Buffer Overflow', 'Privilege Escalation'],
  },
  {
    num: '02',
    title: 'Red Teaming',
    icon: <Shield className="w-6 h-6" />,
    skills: ['C2 Frameworks', 'AD Attacks', 'Lateral Movement', 'Phishing', 'OPSEC', 'BloodHound'],
  },
  {
    num: '03',
    title: 'SOC & Monitoring',
    icon: <Eye className="w-6 h-6" />,
    skills: ['Splunk', 'ELK Stack', 'Snort/Suricata', 'Wireshark', 'Alert Triage', 'Incident Response'],
  },
  {
    num: '04',
    title: 'Threat Intelligence',
    icon: <Search className="w-6 h-6" />,
    skills: ['MITRE ATT&CK', 'OSINT', 'IOC Analysis', 'Threat Hunting', 'Sigma Rules', 'YARA'],
  },
  {
    num: '05',
    title: 'Web App Security',
    icon: <Globe className="w-6 h-6" />,
    skills: ['OWASP Top 10', 'Burp Suite', 'IDOR', 'SSRF', 'XXE', 'Insecure Deserialization'],
  },
  {
    num: '06',
    title: 'Network Security',
    icon: <Wifi className="w-6 h-6" />,
    skills: ['TCP/IP', 'Nmap', 'Nessus', 'Firewall Config', 'VPN', 'IDS/IPS'],
  },
  {
    num: '07',
    title: 'Digital Forensics',
    icon: <Lock className="w-6 h-6" />,
    skills: ['Memory Analysis', 'Disk Forensics', 'Volatility', 'Autopsy', 'Log Analysis', 'Steganography'],
  },
  {
    num: '08',
    title: 'Scripting & Tools',
    icon: <Code className="w-6 h-6" />,
    skills: ['Python', 'Bash', 'PowerShell', 'Gobuster', 'Hydra', 'John the Ripper'],
  },
  {
    num: '09',
    title: 'Cloud Security',
    icon: <Cloud className="w-6 h-6" />,
    skills: ['AWS IAM', 'S3 Misconfigs', 'Azure AD', 'Cloud Pentesting', 'Secrets Management', 'CSPM'],
  },
];

export const education: Education[] = [
  {
    num: '01',
    school: 'California State University, Fullerton',
    degree: 'Master of Science, Computer Science',
    period: 'Aug 2024 – May 2026',
    location: 'Fullerton, CA',
    description: [
      'Published peer-reviewed IEEE conference paper: "Hardware Trojan Detection with Machine Learning and Power Side-Channels: A Post-Deployment Analysis" (IEEE CNS 2025)',
      'Coursework: Advanced Algorithms, Cloud Computing, System Design, Machine Learning, Artificial Intelligence',
    ],
  },
];

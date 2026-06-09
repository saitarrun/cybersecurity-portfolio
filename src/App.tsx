import { useEffect, useRef, useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import {
  Activity,
  ArrowRight,
  Award,
  BrainCircuit,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  LockKeyhole,
  Mail,
  MemoryStick,
  Network,
  Download,
  Shield,
  ShieldAlert,
  Terminal,
} from 'lucide-react';
import { education, experiences, projects, skillGroups } from './data/portfolio';

const SOFTWARE_PORTFOLIO_URL = 'https://software-engineer-portfolio-wuzw.vercel.app/';

const navItems = [
  { href: '#bios', label: 'BIOS', icon: BrainCircuit },
  { href: '#training', label: 'LAB_LOGS', icon: Shield },
  { href: '#certifications', label: 'CERTS', icon: Award },
  { href: '#modules', label: 'SKILLS_MATRIX', icon: MemoryStick },
  { href: '#nodes', label: 'ARCHIVES', icon: Network },
  {
    href: SOFTWARE_PORTFOLIO_URL,
    label: 'SOFTWARE',
    icon: Terminal,
    isSoftwareLink: true,
  },
  { href: '#uplink', label: 'UPLINK', icon: LockKeyhole },
];

const terminalLines = [
  '> INITIALIZING VIRTUAL_ENVIRONMENT...',
  '> DEPLOYING OFFENSIVE_FRAMEWORKS...',
  '> VERIFYING SECURE_UPLINK...',
];

const projectIcons = [Shield, FileText, Network, Terminal];
const certificates = [
  {
    name: 'Pre Security Learning Path',
    id: 'THM-LP2IFN12H2',
    href: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-LP2IFN12H2.pdf',
    action: 'OPEN_PDF',
  },
  {
    name: 'Advent of Cyber 2022',
    id: 'THM-ENECM0YMRB',
    href: 'https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-ENECM0YMRB.pdf',
    action: 'OPEN_PDF',
  },
  {
    name: 'Mr Robot CTF',
    id: 'COMPLETED_ROOM',
    href: 'https://tryhackme.com/room/mrrobot?utm_campaign=social_share&utm_medium=social&utm_content=share-completed-room&utm_source=copy&sharerId=6360027da1107000416f6c70',
    action: 'OPEN_ROOM',
  },
  {
    name: 'OhSINT',
    id: 'COMPLETED_ROOM',
    href: 'https://tryhackme.com/room/ohsint?utm_campaign=social_share&utm_medium=social&utm_content=share-completed-room&utm_source=copy&sharerId=6360027da1107000416f6c70',
    action: 'OPEN_ROOM',
  },
  {
    name: 'Linux Shells',
    id: 'COMPLETED_ROOM',
    href: 'https://tryhackme.com/room/linuxshells?utm_campaign=social_share&utm_medium=social&utm_content=share-completed-room&utm_source=copy&sharerId=6360027da1107000416f6c70',
    action: 'OPEN_ROOM',
  },
  {
    name: 'Content Discovery',
    id: 'COMPLETED_ROOM',
    href: 'https://tryhackme.com/room/contentdiscovery?utm_campaign=social_share&utm_medium=social&utm_content=share-completed-room&utm_source=copy&sharerId=6360027da1107000416f6c70',
    action: 'OPEN_ROOM',
  },
  {
    name: 'ISC2 Candidate',
    id: 'CREDLY_BADGE',
    href: 'https://www.credly.com/badges/1ed96e91-a15b-4761-afd0-7f8eebc8e954/linked_in_profile',
    action: 'OPEN_BADGE',
  },
  {
    name: 'Cryptography',
    id: 'COURSERA_M92VYQ72DG34',
    href: 'https://www.coursera.org/account/accomplishments/verify/M92VYQ72DG34?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
    action: 'VERIFY_CERT',
  },
  {
    name: 'Learn Ethical Hacking From Scratch',
    id: 'ZSECURITY_UC-8C029682',
    href: 'https://www.udemy.com/certificate/UC-8c029682-c92b-4fc0-94d2-f756809f8277/',
    action: 'VERIFY_CERT',
  },
];

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};


function formatUptime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}

function useLiveTelemetry() {
  const [telemetry, setTelemetry] = useState({
    cpuLoad: 24,
    ping: 8,
    uptimeSeconds: 0,
  });

  useEffect(() => {
    const startedAt = Date.now();

    const updateTelemetry = () => {
      setTelemetry((current) => ({
        cpuLoad: Math.max(18, Math.min(74, current.cpuLoad + Math.floor(Math.random() * 13) - 6)),
        ping: Math.floor(Math.random() * 26) + 3,
        uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
      }));
    };

    updateTelemetry();
    const interval = window.setInterval(updateTelemetry, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return telemetry;
}

function TryHackMeLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a.625.625 0 1 0 0-1.25H4.761a3.273 3.273 0 0 1-3.27-3.27A3.273 3.273 0 0 1 6.59 7.08a.625.625 0 0 0 .7-1.035 4.488 4.488 0 0 0-1.68-.69 5.223 5.223 0 0 1 5.096-4.104 5.221 5.221 0 0 1 5.174 4.57 4.489 4.489 0 0 0-.488.305.625.625 0 1 0 .731 1.013 3.245 3.245 0 0 1 1.912-.616 3.278 3.278 0 0 1 3.203 2.61.625.625 0 0 0 1.225-.251 4.533 4.533 0 0 0-4.428-3.61 4.54 4.54 0 0 0-.958.105C16.556 2.328 13.9 0 10.705 0zm5.192 10.64a.925.925 0 0 0-.462.108.913.913 0 0 0-.313.29 1.27 1.27 0 0 0-.175.427 2.39 2.39 0 0 0-.054.514c0 .181.018.353.054.517.036.164.095.307.175.43a.899.899 0 0 0 .313.297c.127.073.281.11.462.11.18 0 .334-.037.46-.11a.897.897 0 0 0 .309-.296c.08-.124.137-.267.173-.431.036-.164.054-.336.054-.517 0-.18-.018-.352-.054-.514a1.271 1.271 0 0 0-.173-.426.901.901 0 0 0-.309-.291.917.917 0 0 0-.46-.108zm6.486 0a.925.925 0 0 0-.462.108.913.913 0 0 0-.313.29 1.27 1.27 0 0 0-.175.427 2.39 2.39 0 0 0-.053.514c0 .181.017.353.053.517.036.164.095.307.175.43a.899.899 0 0 0 .313.297c.127.073.281.11.462.11.18 0 .334-.037.46-.11a.897.897 0 0 0 .31-.296c.078-.124.136-.267.172-.431.036-.164.054-.336.054-.517 0-.18-.018-.352-.054-.514a1.271 1.271 0 0 0-.173-.426.901.901 0 0 0-.308-.291.916.916 0 0 0-.461-.108zm-8.537.068-.84.618.313.43.476-.368v1.877h.603v-2.557zm6.486 0-.841.618.314.43.477-.368v1.877h.603v-2.557zm-4.435.445c.08 0 .143.028.193.084.05.057.087.127.114.21.026.083.044.173.054.269a2.541 2.541 0 0 1 0 .533c-.01.097-.028.187-.054.27a.584.584 0 0 1-.114.21.243.243 0 0 1-.193.085.248.248 0 0 1-.195-.086.584.584 0 0 1-.118-.209 1.245 1.245 0 0 1-.056-.27 2.645 2.645 0 0 1 0-.533c.01-.096.029-.186.056-.27a.583.583 0 0 1 .118-.209.25.25 0 0 1 .195-.084zm6.486 0c.08 0 .144.028.193.084.05.057.087.127.114.21.027.083.044.173.054.269a2.541 2.541 0 0 1 0 .533c-.01.097-.027.187-.054.27a.584.584 0 0 1-.114.21.243.243 0 0 1-.193.085.249.249 0 0 1-.195-.086.581.581 0 0 1-.117-.209 1.245 1.245 0 0 1-.056-.27 2.642 2.642 0 0 1 0-.533c.01-.096.028-.186.056-.27a.58.58 0 0 1 .117-.209.25.25 0 0 1 .195-.084zm-2.191 3.51a.93.93 0 0 0-.463.109.908.908 0 0 0-.312.291c-.08.122-.139.263-.175.426a2.383 2.383 0 0 0-.054.514c0 .18.018.353.054.516.036.164.094.308.175.432a.91.91 0 0 0 .312.296.92.92 0 0 0 .463.11c.18 0 .333-.037.46-.11a.892.892 0 0 0 .308-.296 1.32 1.32 0 0 0 .174-.432c.036-.163.054-.335.054-.516 0-.18-.018-.352-.054-.514a1.274 1.274 0 0 0-.174-.426.89.89 0 0 0-.309-.291.918.918 0 0 0-.46-.108zm-6.402.07-.841.617.314.43.476-.369v1.878h.604v-2.557zm2.125 0-.841.617.314.43.477-.369v1.878h.603v-2.557zm2.116 0-.84.617.313.43.477-.369v1.878h.603v-2.557zm2.16.443c.08 0 .144.028.194.085a.605.605 0 0 1 .114.21c.026.083.044.172.053.269a2.639 2.639 0 0 1 0 .532 1.28 1.28 0 0 1-.053.27.585.585 0 0 1-.114.21.244.244 0 0 1-.193.085.25.25 0 0 1-.196-.085.589.589 0 0 1-.117-.21 1.245 1.245 0 0 1-.056-.27 2.597 2.597 0 0 1 0-.532c.01-.097.028-.186.056-.27a.589.589 0 0 1 .117-.209.249.249 0 0 1 .196-.085zm-6.729 3.073a.676.676 0 0 0-.335.078.661.661 0 0 0-.227.211.91.91 0 0 0-.127.31c-.027.118-.04.242-.04.373s.013.256.04.375a.93.93 0 0 0 .127.313.65.65 0 0 0 .227.215c.092.053.204.08.335.08a.655.655 0 0 0 .334-.08.65.65 0 0 0 .225-.215c.057-.09.1-.194.125-.313a1.75 1.75 0 0 0 .04-.375c0-.13-.014-.255-.04-.373a.931.931 0 0 0-.125-.31.658.658 0 0 0-.225-.21.667.667 0 0 0-.334-.08zm3.086 0a.675.675 0 0 0-.336.078.661.661 0 0 0-.226.211.907.907 0 0 0-.127.31 1.69 1.69 0 0 0-.04.373c0 .131.013.256.04.375a.928.928 0 0 0 .127.313c.058.09.134.162.226.215.093.053.205.08.336.08a.655.655 0 0 0 .334-.08.65.65 0 0 0 .224-.215c.058-.09.1-.194.126-.313a1.752 1.752 0 0 0 0-.748.94.94 0 0 0-.126-.31.657.657 0 0 0-.224-.21.667.667 0 0 0-.334-.08zm5.108 0a.675.675 0 0 0-.336.078.661.661 0 0 0-.226.211.91.91 0 0 0-.127.31c-.027.118-.04.242-.04.373s.013.256.04.375a.931.931 0 0 0 .127.313c.058.09.134.162.226.215.093.053.205.08.336.08.13 0 .243-.027.334-.08a.65.65 0 0 0 .224-.215c.058-.09.1-.194.126-.313a1.75 1.75 0 0 0 .04-.375c0-.13-.014-.255-.04-.373a.943.943 0 0 0-.126-.31.657.657 0 0 0-.224-.21.668.668 0 0 0-.334-.08zm-6.658.05-.61.448.227.311.346-.266v1.362h.438v-1.856zm3.068 0-.61.448.227.311.346-.266v1.362h.438v-1.856zm5.108 0-.611.448.228.311.346-.266v1.362h.438v-1.856zm-9.712.322c.058 0 .105.02.14.062a.421.421 0 0 1 .083.151.96.96 0 0 1 .04.196 1.932 1.932 0 0 1 0 .386.954.954 0 0 1-.04.197.421.421 0 0 1-.083.152.176.176 0 0 1-.14.061.18.18 0 0 1-.141-.06.427.427 0 0 1-.085-.153.887.887 0 0 1-.041-.197 1.96 1.96 0 0 1 0-.386.893.893 0 0 1 .04-.196.42.42 0 0 1 .086-.151.181.181 0 0 1 .141-.062zm3.086 0c.058 0 .104.02.14.062a.421.421 0 0 1 .082.151.94.94 0 0 1 .04.196 1.906 1.906 0 0 1 0 .386.93.93 0 0 1-.04.197.421.421 0 0 1-.082.152.176.176 0 0 1-.14.061.18.18 0 0 1-.141-.06.42.42 0 0 1-.086-.153.846.846 0 0 1-.04-.197 1.965 1.965 0 0 1-.011-.195c0-.057.004-.121.01-.191a.849.849 0 0 1 .041-.196.42.42 0 0 1 .086-.151.182.182 0 0 1 .141-.062zm5.108 0c.058 0 .104.02.14.062a.421.421 0 0 1 .082.151.92.92 0 0 1 .04.196 1.963 1.963 0 0 1 0 .386.943.943 0 0 1-.04.197.421.421 0 0 1-.082.152.177.177 0 0 1-.14.061.18.18 0 0 1-.142-.06.437.437 0 0 1-.085-.153.95.95 0 0 1-.04-.197 1.965 1.965 0 0 1-.011-.195c0-.057.004-.121.01-.191a.959.959 0 0 1 .04-.196.47.47 0 0 1 .086-.151.181.181 0 0 1 .142-.062zm-1.684 1.814a.675.675 0 0 0-.336.079.66.66 0 0 0-.227.21.91.91 0 0 0-.127.31 1.731 1.731 0 0 0 0 .748.939.939 0 0 0 .127.314c.059.09.134.162.227.215.093.053.205.08.336.08a.66.66 0 0 0 .334-.08.648.648 0 0 0 .224-.215c.058-.09.1-.195.126-.314a1.737 1.737 0 0 0-.001-.747.928.928 0 0 0-.125-.31.65.65 0 0 0-.224-.211.668.668 0 0 0-.334-.079zm3.063 0a.676.676 0 0 0-.336.079.664.664 0 0 0-.227.21.906.906 0 0 0-.127.31 1.74 1.74 0 0 0 0 .748.936.936 0 0 0 .127.314.66.66 0 0 0 .227.215c.092.053.204.08.336.08a.654.654 0 0 0 .334-.08.648.648 0 0 0 .223-.215c.058-.09.1-.195.126-.314a1.74 1.74 0 0 0 0-.747.928.928 0 0 0-.126-.31.65.65 0 0 0-.223-.211.666.666 0 0 0-.334-.079zm-1.545.05-.611.448.228.312.346-.267v1.363h.438v-1.856zm-1.518.323c.057 0 .104.02.14.061a.42.42 0 0 1 .082.152.91.91 0 0 1 .04.195 1.966 1.966 0 0 1 0 .387.951.951 0 0 1-.04.197.421.421 0 0 1-.082.152.177.177 0 0 1-.14.06.18.18 0 0 1-.142-.06.428.428 0 0 1-.085-.152.914.914 0 0 1-.04-.197 1.96 1.96 0 0 1-.011-.195c0-.058.003-.122.01-.192a.923.923 0 0 1 .041-.195c.02-.06.048-.11.085-.152a.181.181 0 0 1 .142-.061zm3.063 0c.057 0 .104.02.14.061a.42.42 0 0 1 .082.152.94.94 0 0 1 .04.195 1.91 1.91 0 0 1 0 .387.93.93 0 0 1-.04.197.422.422 0 0 1-.083.152.175.175 0 0 1-.14.06.18.18 0 0 1-.141-.06.423.423 0 0 1-.085-.152.907.907 0 0 1-.04-.197 1.95 1.95 0 0 1 0-.387.915.915 0 0 1 .04-.195c.02-.06.048-.11.085-.152a.182.182 0 0 1 .142-.061zm-9.713.185a.465.465 0 0 0-.232.055.456.456 0 0 0-.157.146.627.627 0 0 0-.089.215 1.168 1.168 0 0 0-.027.259c0 .09.009.177.027.26a.648.648 0 0 0 .089.216c.04.063.093.112.157.149a.459.459 0 0 0 .232.056c.09 0 .168-.02.231-.056a.45.45 0 0 0 .156-.149.67.67 0 0 0 .087-.217 1.218 1.218 0 0 0 0-.518.647.647 0 0 0-.087-.215.448.448 0 0 0-.156-.146.458.458 0 0 0-.23-.055zm1.052.035-.423.31.158.217.24-.185v.944h.303v-1.286zm-1.052.224c.04 0 .073.014.097.042a.284.284 0 0 1 .057.105.69.69 0 0 1 .028.136c.004.049.007.092.007.133 0 .04-.003.086-.007.135a.684.684 0 0 1-.028.136.285.285 0 0 1-.057.105.123.123 0 0 1-.097.043.125.125 0 0 1-.098-.043.298.298 0 0 1-.059-.105.612.612 0 0 1-.028-.136 1.39 1.39 0 0 1 0-.268.62.62 0 0 1 .028-.136.297.297 0 0 1 .06-.105.125.125 0 0 1 .097-.042zm3.775 1.394a.463.463 0 0 0-.232.054.452.452 0 0 0-.157.146.621.621 0 0 0-.088.214 1.19 1.19 0 0 0 0 .519.641.641 0 0 0 .088.217.46.46 0 0 0 .157.15.458.458 0 0 0 .232.054.454.454 0 0 0 .232-.055.45.45 0 0 0 .155-.149.664.664 0 0 0 .087-.217 1.189 1.189 0 0 0 0-.519.642.642 0 0 0-.087-.214.446.446 0 0 0-.155-.146.459.459 0 0 0-.232-.054zm1.052.034-.423.31.158.216.24-.185v.945h.303V22.68zm-1.052.223c.04 0 .073.014.098.043a.3.3 0 0 1 .057.105.643.643 0 0 1 .027.135 1.31 1.31 0 0 1 0 .268.654.654 0 0 1-.027.137.307.307 0 0 1-.057.105.124.124 0 0 1-.098.042.125.125 0 0 1-.098-.042.293.293 0 0 1-.059-.105.618.618 0 0 1-.028-.137 1.364 1.364 0 0 1 0-.268.612.612 0 0 1 .028-.135.287.287 0 0 1 .06-.105.123.123 0 0 1 .097-.043z" />
    </svg>
  );
}

function useScramble(text: string) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const scramble = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@$%';
    let progress = 0;

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, index) => (index < progress ? char : chars[Math.floor(Math.random() * chars.length)]))
          .join('')
      );

      progress += 1;
      if (progress > text.length && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, 35);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { display, scramble };
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const particles: Array<{ x: number; y: number; size: number; speedX: number; speedY: number }> = [];
    let frame = 0;
    let animationId = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent?.clientWidth ?? window.innerWidth;
      canvas.height = parent?.clientHeight ?? window.innerHeight;
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (particles.length < 60 && frame % 2 === 0) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() - 0.5,
          speedY: Math.random() - 0.5,
        });
      }

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.size -= 0.004;
        context.fillStyle = '#930000';
        context.fillRect(particle.x, particle.y, particle.size, particle.size);
        if (particle.size <= 0.2) particles.splice(index, 1);
      });

      frame += 1;
      animationId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="physics-canvas" aria-hidden="true" />;
}

function TopNav({
  onSoftwareNavigate,
}: {
  onSoftwareNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#930000] bg-[#0e0e0e]/85 px-4 backdrop-blur-md md:px-8">
      <a href="#bios" className="font-label text-lg font-bold tracking-tight text-[#ffb4a8]">
        SYS_PORTFOLIO_V2.0
      </a>
      <nav className="hidden gap-5 md:flex" aria-label="Primary">
        {navItems.slice(0, 6).map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={
              item.isSoftwareLink ? (event) => onSoftwareNavigate(event, item.href) : undefined
            }
            className="font-label text-xs font-semibold text-[#930000] transition-colors hover:text-[#ffb4a8]"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4 text-[#ffb4a8]">
        <a
          href="https://tryhackme.com/p/TarrunXploit404"
          aria-label="Open TryHackMe profile"
          className="transition-colors hover:text-white"
        >
          <TryHackMeLogo size={20} />
        </a>
        <a
          href="https://github.com/saitarrun"
          aria-label="Open GitHub profile"
          className="transition-colors hover:text-white"
        >
          <Github size={20} />
        </a>
        <a
          href="https://linkedin.com/in/saitarrunpitta"
          aria-label="Open LinkedIn profile"
          className="transition-colors hover:text-white"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="/SaiTarrunPitta_SoftwareEngineer_Resume.pdf"
          aria-label="Download resume"
          className="transition-colors hover:text-white"
        >
          <Download size={20} />
        </a>
      </div>
    </header>
  );
}

function SideNav({
  onSoftwareNavigate,
}: {
  onSoftwareNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  const telemetry = useLiveTelemetry();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[240px] flex-col border-r border-[#930000] bg-[#0e0e0e] pt-20 lg:flex">
      <div className="mb-8 px-6 py-4">
        <div className="font-label text-xl font-bold text-[#ffb4a8]">ROOT_ACCESS</div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#930000]">lvl_99_engineer</div>
      </div>
      <nav className="flex flex-col gap-1" aria-label="Section">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={
                item.isSoftwareLink ? (event) => onSoftwareNavigate(event, item.href) : undefined
              }
              className={`flex items-center gap-4 px-4 py-3 font-label text-xs font-semibold transition-all ${
                index === 0
                  ? 'translate-x-1 border-l-4 border-[#ffb4a8] text-[#ffb4a8]'
                  : 'text-[#930000] hover:bg-[#2a2a2a] hover:text-[#ffb4a8]'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-[#930000] p-6 font-label text-[10px] font-bold uppercase">
        <StatusLine color="bg-[#930000]" label={`CPU_LOAD: ${telemetry.cpuLoad}%`} />
        <StatusLine color="bg-green-500" label="ENCRYPTION: AES-256" bright />
        <StatusLine color="bg-[#ffb4a8]" label={`PING: ${telemetry.ping}ms`} bright />
        <StatusLine color="bg-[#930000]" label={`UPTIME: ${formatUptime(telemetry.uptimeSeconds)}`} />
      </div>
    </aside>
  );
}

function StatusLine({ color, label, bright = false }: { color: string; label: string; bright?: boolean }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className={`status-blink h-2 w-2 ${color}`} />
      <span className={bright ? 'text-[#ffb4a8]' : 'text-[#930000]'}>{label}</span>
    </div>
  );
}

function Hero() {
  const { display, scramble } = useScramble('SAI_TARRUN');

  return (
    <section
      id="bios"
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden border-b border-[#930000] px-4 py-24 md:px-8"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/cyber-hero.png"
          alt=""
          className="h-full w-full object-cover opacity-45 grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/85 to-transparent" />
        <div className="absolute inset-0 bg-[#ffb4a8]/10 mix-blend-multiply" />
      </div>
      <ParticleCanvas />

      <div className="relative z-10 w-full max-w-4xl space-y-8">
        <div className="flex flex-wrap items-center gap-4 font-label text-xs font-semibold">
          <span className="bg-[#930000] px-3 py-1 text-[#0e0e0e]">[SECURE_CONNECTION_ESTABLISHED]</span>
          <span className="pulse-badge inline-flex items-center gap-2 border border-green-500/50 bg-red-950/50 px-3 py-1 text-green-500">
            <span className="status-blink h-2 w-2 rounded-full bg-green-500" />
            AVAILABLE_FOR_WORK
          </span>
        </div>

        <h1 className="font-label text-4xl font-bold leading-tight text-[#ffb4a8] sm:text-5xl md:text-7xl">
          ROOT_ACCESS //
          <br />
          <button type="button" onMouseEnter={scramble} className="hero-glitch-text text-left text-white">
            {display}
          </button>
        </h1>

        <div className="terminal-panel brutalist-border max-w-2xl bg-[#0e0e0e]/45 p-6 font-label text-sm leading-relaxed text-[#ebbbb4] backdrop-blur-sm">
          {terminalLines.map((line, index) => (
            <p
              key={line}
              className="terminal-line mb-2 text-[#ffb4a8]/70"
              style={{ animationDelay: `${index * 180}ms` }}
            >
              {line}
            </p>
          ))}
          <p className="terminal-copy mt-4 text-lg text-[#ffb4a8]">
            Cybersecurity practitioner focused on penetration testing, red-team labs, detection engineering, and
            resilient systems. Building proof-driven security projects from packet capture to executive-ready write-up.
          </p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          <Metric label="Uptime" value="99.9%" />
          <Metric label="Nodes_Secured" value="124" />
          <Metric label="Vulnerabilities_Patched" value="40+" />
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <a href="#uplink" className="hero-action hero-action-primary brutalist-border bg-[#ffb4a8] px-8 py-4 font-label text-sm font-bold uppercase tracking-wider text-[#690100] transition-all hover:bg-[#930000] hover:text-[#ffdad4]">
            INITIALIZE_CONTACT
          </a>
          <a href="/SaiTarrunPitta_SoftwareEngineer_Resume.pdf" className="hero-action border border-[#ffb4a8] px-8 py-4 font-label text-sm font-bold uppercase tracking-wider text-[#ffb4a8] transition-all hover:bg-[#ffb4a8] hover:text-[#690100]">
            DOWNLOAD_MANIFESTO
          </a>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="animated-card brutalist-border bg-[#0e0e0e]/60 p-4 backdrop-blur-sm">
      <div className="mb-1 text-[10px] uppercase text-[#930000]">{label}</div>
      <div className="font-label text-xl font-bold text-[#ffb4a8]">{value}</div>
    </div>
  );
}

function ScrambleText({ text, className }: { text: string; className?: string }) {
  const { display, scramble } = useScramble(text);

  return (
    <button type="button" onMouseEnter={scramble} className={`hero-glitch-text text-left ${className ?? ''}`}>
      {display}
    </button>
  );
}

function SectionHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="mb-16 flex items-center gap-4">
      <h2 className="min-w-0 font-label text-2xl font-bold text-[#ffb4a8] sm:text-3xl">
        <ScrambleText text={title} />
      </h2>
      <div className="h-px flex-1 bg-[#930000]" />
      {meta && <div className="hidden font-label text-xs text-[#930000] md:block">{meta}</div>}
    </div>
  );
}

function Training() {
  return (
    <section id="training" className="bg-[#0e0e0e] px-4 py-24 md:px-8">
      <SectionHeader title="ATTACK_LAB_LOGS" meta="TRYHACKME_PATHS" />
      <a
        href="https://tryhackme.com/share/capability-score/TarrunXploit404"
        className="group mb-8 block overflow-hidden border border-[#930000] bg-[#101722] transition-all hover:border-[#ffb4a8]"
        aria-label="Open TryHackMe capability score"
      >
        <div className="relative min-h-[260px] overflow-hidden px-6 py-10 sm:px-12 lg:px-16">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(circle_at_70%_45%,rgba(255,85,64,0.75),rgba(147,0,0,0.45)_42%,transparent_70%)]" />
          <div className="absolute right-6 top-6 flex items-center gap-3 text-white sm:right-10 sm:top-8 md:right-14">
            <TryHackMeLogo size={68} />
            <span className="font-sans text-2xl font-bold leading-[0.9] sm:text-3xl">
              Try
              <br />
              Hack
              <br />
              Me
            </span>
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="font-sans text-7xl font-black leading-none text-white sm:text-9xl">77</div>
            <h3 className="mt-7 font-sans text-3xl font-bold text-white sm:text-4xl">Capability Score</h3>
            <p className="mt-5 max-w-2xl font-sans text-xl text-white/70 sm:text-2xl">
              TarrunXploit404 is mastering the art of the attack!
            </p>
            <div className="mt-8 inline-flex items-center gap-2 font-label text-xs font-bold uppercase tracking-wider text-[#ffb4a8]">
              VIEW_VERIFIED_SCORE <ArrowRight size={14} />
            </div>
          </div>
          <div className="absolute bottom-8 right-12 hidden h-40 w-40 rotate-45 rounded-3xl border border-[#ffb4a8]/30 bg-[#930000]/80 shadow-[0_0_60px_rgba(255,85,64,0.55)] md:block">
            <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((index) => (
                <span key={index} className="h-10 w-10 rounded-md bg-[#ff3f5f] shadow-[0_0_20px_rgba(255,180,168,0.65)]" />
              ))}
            </div>
          </div>
        </div>
      </a>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {experiences.map((experience, index) => (
          <article key={experience.role} className="animated-card brutalist-border group relative overflow-hidden bg-[#131313] p-8 transition-all hover:bg-[#201f1f]">
            <ShieldAlert className="absolute right-0 top-0 h-24 w-24 text-[#ffb4a8]/5 transition-colors group-hover:text-[#ffb4a8]/10" />
            <div className="mb-4 flex items-center gap-2 font-label text-xs font-bold uppercase text-[#ffb4a8]">
              <span className="h-2 w-2 bg-[#ffb4a8]" />
              {experience.role.replace(' Path', '')}
            </div>
            <p className="mb-6 text-sm leading-relaxed text-[#ebbbb4]">{experience.description[0]}</p>
            <div className="h-1 bg-[#930000]">
              <div className="h-full bg-[#ffb4a8]" style={{ width: `${index === 0 ? 100 : index === 1 ? 85 : 72}%` }} />
            </div>
            <div className="mt-2 flex justify-between font-label text-[10px] uppercase text-[#ffb4a8]">
              <span>Status: {index === 0 ? 'Completed' : index === 1 ? 'Advanced' : 'Operational'}</span>
              <span>{index === 0 ? 100 : index === 1 ? 85 : 72}%</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="border-y border-[#930000] bg-[#131313] px-4 py-24 md:px-8">
      <SectionHeader title="CERTIFICATIONS" meta="TRYHACKME_VERIFIED" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <a
            key={`${certificate.id}-${certificate.name}`}
            href={certificate.href}
            className="animated-card brutalist-border flex min-h-36 flex-col justify-between gap-5 bg-[#0e0e0e] p-5 transition-all hover:border-[#ffb4a8] hover:bg-[#201f1f]"
            aria-label={`Open TryHackMe certificate ${certificate.name}`}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#930000] text-[#ffb4a8]">
                <Award size={24} />
              </div>
              <div>
                <div className="font-label text-sm font-bold uppercase leading-5 text-[#ffb4a8]">
                  {certificate.name}
                </div>
                <div className="mt-2 font-label text-[10px] uppercase tracking-widest text-[#930000]">
                  CERT_ID: {certificate.id}
                </div>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 self-start font-label text-xs font-bold uppercase tracking-wider text-[#ffb4a8]">
              {certificate.action} <ArrowRight size={14} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function SkillsMatrix() {
  return (
    <section id="modules" className="border-b border-[#930000] px-4 py-24 md:px-8">
      <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end">
        <h2 className="font-label text-3xl font-bold leading-none text-[#ffb4a8]">
          <ScrambleText text="SKILLS_MATRIX.v3" />
        </h2>
        <p className="font-label text-xs uppercase tracking-[0.22em] text-[#930000]">[9_CORE_MODULES_DETECTED]</p>
      </div>
      <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 border-b border-[#930000] pb-2 font-label text-sm font-semibold uppercase text-[#ffb4a8]">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.slice(0, 4).map((skill) => (
                <span key={skill} className="border border-[#930000] px-2 py-1 font-label text-[10px] text-[#ebbbb4] transition-colors hover:border-[#ffb4a8] hover:text-[#ffb4a8]">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="nodes" className="bg-[#0e0e0e] px-4 py-24 md:px-8">
      <SectionHeader title="ENCRYPTED_ARCHIVES" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {projects.map((project, index) => {
          const Icon = projectIcons[index] ?? Terminal;
          return (
            <article key={project.title} className="animated-card brutalist-border relative bg-[#1c1b1b] p-8 transition-all hover:bg-[#2a2a2a]">
              <div className="absolute right-0 top-0 p-4 font-label text-[10px] uppercase tracking-widest text-[#ffb4a8]/30">
                Node_0x{index + 1}
              </div>
              <div className="mb-6 flex h-48 items-center justify-center overflow-hidden border border-[#ffb4a8]/20 bg-black">
                <Icon className="h-16 w-16 text-[#ffb4a8]/40 transition-transform duration-500 hover:scale-110" />
              </div>
              <h3 className="mb-4 font-label text-xl font-bold uppercase text-[#ffb4a8]">{project.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-[#ebbbb4]">{project.description}</p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-2">
                  {project.tech.split(' · ').slice(0, 3).map((tech) => (
                    <span key={tech} className="brutalist-border px-2 py-1 font-label text-[10px] uppercase text-[#ebbbb4]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AcademicCore() {
  const degree = education[0];

  return (
    <section className="border-b border-[#930000] bg-[#0e0e0e] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title="ACADEMIC_CORE" />
        <article className="academic-card brutalist-border bg-white p-8 text-black shadow-[10px_10px_0px_#930000] md:p-12">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <h3 className="font-label text-3xl font-bold uppercase">{degree.school}</h3>
              <p className="text-sm font-bold opacity-70">{degree.degree}</p>
            </div>
            <span className="w-fit bg-black px-3 py-1 font-label text-[10px] font-bold text-white">TOP_TIER_CREDENTIAL</span>
          </div>
          <div className="my-8 border-y border-black/10 py-8">
            <a
              href="https://ieeexplore.ieee.org/document/11195049"
              className="mb-4 flex w-fit items-center gap-2 font-label text-lg font-bold text-black underline decoration-[#930000]/40 underline-offset-4 transition-colors hover:text-[#930000]"
              aria-label="Open IEEE Xplore publication"
            >
              <GraduationCap size={22} />
              IEEE_PUBLICATION // RESEARCH_ABSTRACT
            </a>
            <p className="mb-4 text-xl font-bold">Hardware Trojan Detection via ML + Power Side-channels</p>
            <p className="leading-relaxed opacity-80">{degree.description[0]}</p>
          </div>
          <div className="flex flex-col justify-between gap-2 font-label text-[10px] font-bold uppercase opacity-50 sm:flex-row">
            <span>{degree.location}</span>
            <span>{degree.period}</span>
          </div>
        </article>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="uplink" className="border-t border-[#930000] bg-[#0e0e0e] px-4 py-12 md:px-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="font-label text-xs text-[#910904]">© 2026 SECURE_UPLINK. ALL RIGHTS RESERVED.</div>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="mailto:saitarrunpitta@gmail.com" className="uplink-link">
            <Mail size={16} /> EMAIL
          </a>
          <a href="https://github.com/saitarrun" className="uplink-link">
            <Github size={16} /> GITHUB
          </a>
          <a href="https://linkedin.com/in/saitarrunpitta" className="uplink-link">
            <Linkedin size={16} /> LINKEDIN
          </a>
        </div>
        <div className="font-label text-xs text-[#910904] opacity-60">Uptime: 99.9999% // Latency: 4ms</div>
      </div>
    </footer>
  );
}

function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'How can I assist your operation today? I can provide documentation, system status updates, or analyze intercepted packets.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Chat request failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reply = '';

      setMessages([...nextMessages, { role: 'assistant', content: '...' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n')) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;

          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data) as { delta?: string; error?: string };
            if (parsed.delta) reply += parsed.delta;
            if (parsed.error) reply = 'Pulse is temporarily offline. Try the uplink links below.';
          } catch {
            // Ignore malformed stream fragments.
          }

          setMessages([...nextMessages, { role: 'assistant', content: reply || '...' }]);
        }
      }
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content:
            'Pulse could not reach the chat service. You can still contact Sai through the uplink links below.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <aside className="fixed bottom-6 right-6 z-[60] hidden h-96 w-80 translate-y-[calc(100%-40px)] flex-col border-2 border-[#ffb4a8] bg-[#0e0e0e] shadow-2xl transition-transform hover:translate-y-0 md:flex">
      <div className="flex h-10 cursor-pointer items-center justify-between bg-[#930000] px-4">
        <div className="flex items-center gap-2">
          <span className="status-blink h-2 w-2 bg-[#ffb4a8]" />
          <span className="font-label text-[10px] font-bold uppercase tracking-widest text-[#0e0e0e]">AI_CHAT // PULSE</span>
        </div>
        <Activity className="h-4 w-4 text-[#0e0e0e]" />
      </div>
      <div ref={transcriptRef} className="flex-1 space-y-4 overflow-y-auto bg-black/90 p-4 font-label text-[11px]">
        <div className="text-[#ffb4a8]">[SYSTEM] Connection established. Pulse AI online.</div>
        <div className="text-[#ebbbb4]">&gt; Waiting for input...</div>
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === 'user'
                ? 'ml-6 border-r border-[#ffb4a8] bg-[#ffb4a8]/10 p-2 text-right text-[#ffdad4]'
                : 'border-l border-[#ffb4a8] bg-[#930000]/20 p-2 text-white'
            }
          >
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="border-t border-[#930000] p-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="w-full border-none bg-transparent font-label text-[11px] uppercase text-[#ffb4a8] outline-none placeholder:text-[#ffb4a8]/30"
          placeholder={isSending ? 'TRANSMITTING...' : 'CMD_INPUT...'}
          type="text"
          disabled={isSending}
        />
      </form>
    </aside>
  );
}

function SoftwareTransitionOverlay() {
  return (
    <div className="software-transition" role="status" aria-live="assertive" aria-label="Opening software engineering portfolio">
      <div className="software-ide-grid" aria-hidden="true" />
      <div className="software-terminal">
        <div className="software-terminal-titlebar">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 bg-[#930000]" />
            <span className="h-2.5 w-2.5 bg-[#ffb4a8]" />
            <span className="h-2.5 w-2.5 bg-green-500" />
          </div>
          <span>software-engineering.build</span>
        </div>
        <div className="software-terminal-body">
          <div className="software-code-line text-[#930000]">~/SYS_PORTFOLIO_V2.0</div>
          <div className="software-code-line software-type-1">
            <span className="text-[#ffb4a8]">$</span> npm run compile:software
          </div>
          <div className="software-code-line software-type-2">
            <span className="text-[#ffb4a8]">&gt;</span> bundling full-stack modules...
          </div>
          <div className="software-code-line software-type-3">
            <span className="text-[#ffb4a8]">&gt;</span> resolving production route...
          </div>
          <div className="software-progress-shell" aria-hidden="true">
            <div className="software-progress-bar" />
          </div>
          <div className="software-success">
            BUILD SUCCESSFUL<span className="software-cursor" />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isSoftwareTransitioning, setIsSoftwareTransitioning] = useState(false);
  const redirectTimerRef = useRef<number | null>(null);
  const failsafeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) window.clearTimeout(redirectTimerRef.current);
      if (failsafeTimerRef.current) window.clearTimeout(failsafeTimerRef.current);
    };
  }, []);

  const handleSoftwareNavigate = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    if (isSoftwareTransitioning) return;

    setIsSoftwareTransitioning(true);

    redirectTimerRef.current = window.setTimeout(() => {
      window.location.assign(href);
    }, 1500);

    failsafeTimerRef.current = window.setTimeout(() => {
      window.location.replace(href);
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] font-body text-[#e5e2e1] selection:bg-[#930000] selection:text-[#ffdad4]">
      <div className="scanlines" />
      {isSoftwareTransitioning && <SoftwareTransitionOverlay />}
      <TopNav onSoftwareNavigate={handleSoftwareNavigate} />
      <SideNav onSoftwareNavigate={handleSoftwareNavigate} />
      <ChatWidget />
      <main id="main" className="min-h-screen pt-16 lg:ml-[240px]">
        <Hero />
        <Training />
        <Certifications />
        <SkillsMatrix />
        <Projects />
        <AcademicCore />
        <Contact />
      </main>
    </div>
  );
}

export default App;

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string; // Imagen principal
  images?: string[]; // Imágenes adicionales
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: 'web' | 'design' | 'software';
  featured?: boolean; // Si es un proyecto destacado
  completed?: string; // Fecha de finalización
  client?: string; // Cliente (opcional)
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

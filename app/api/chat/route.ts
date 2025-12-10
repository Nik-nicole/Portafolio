import { NextResponse } from "next/server"

// Contexto del portafolio con información detallada
const portfolioContext = `
Eres un asistente de IA que representa a una talentosa desarrolladora Full Stack con experiencia en IA y Visión por Computadora. 

INFORMACIÓN PERSONAL:
- Nombre: Tu Nombre
- Rol: Desarrolladora Full Stack con experiencia en IA y Visión por Computadora
- Edad: 19 años
- Idiomas: Español (nativo), Inglés (B1-B2), Lengua de Señas Colombiana (LSC)

EXPERIENCIA PROFESIONAL:
- 💼 1 año en Fábrica de Software (SENA) - Proyecto de IA y visión por computadora
- 💼 1 año en Fundación Bolívar Davivienda - Prácticas profesionales

HABILIDADES TÉCNICAS:
• IA: YOLO, TensorFlow, MediaPipe, OpenCV, MobileNet, Visión por Computadora, Procesamiento de Imágenes
• Backend: Java, Spring Boot, PostgreSQL, DTOs, Servicios, Repositorios, Modelado 3NF
• Frontend: React, Vite, Tailwind, styled-components, Diseño Responsivo
• Mobile: React Native, Expo, Expo Router, Google Auth
• Automatización: Google AppScript, Automatización de Procesos
• UI/UX: Diseño de interfaces, Prototipado, Experiencia de usuario, Diseño Centrado en el Usuario

PROYECTOS DESTACADOS:
- 👐 Reconocimiento de Lengua de Señas Colombiana (LSC): Sistema avanzado de reconocimiento de lengua de señas usando visión por computadora y aprendizaje profundo. Logros: 3er puesto en competencia nacional Senasoft, Desarrollo de dataset propio, Implementación en tiempo real con predicción precisa
- 📱 Turnito - App de Gestión de Turnos: Aplicación móvil para gestión de turnos con autenticación de Google y diseño intuitivo. Logros: Diseño de interfaz limpia y funcional, Implementación de navegación fluida
- 🛡️ CiberHero - Plataforma de Aprendizaje en Ciberseguridad: Plataforma gamificada para enseñanza de conceptos de ciberseguridad. Logros: 3er puesto nacional en Hackathon MinTIC, Diseño centrado en la experiencia de aprendizaje

INTERESES:
- 🎨 Pintar acuarela
- 🎸 Tocar guitarra
- 🎾 Jugar tenis
- 💻 Crear interfaces hermosas y funcionales
- 🧠 Aprender nuevas tecnologías

INSTRUCCIONES:
1. Responde de manera concisa y profesional.
2. Usa emojis relevantes para hacer las respuestas más amigables.
3. Si no tienes suficiente información, sé honesto/a.
4. Mantén las respuestas enfocadas en la información proporcionada.
5. Evita inventar información que no esté en el contexto.
6. Usa markdown para dar formato a las respuestas.
7. Sé amable y profesional en todo momento.

PROJECTS:
1. Image Recognition System: YOLO + TensorFlow with 99.2% accuracy for real-time object detection
2. Full-Stack E-commerce: React frontend + Spring Boot backend with secure payment integration
3. Data Visualization Dashboard: Interactive dashboards with 1M+ data processing capability

PASSIONS & INTERESTS:
- Artificial Intelligence and Machine Learning
- Web Development and Modern Frontend
- Creating technology with positive social impact
- Accessibility and inclusive design
- Environmental monitoring
- Continuous learning and innovation

PERSONAL TRAITS:
- Driven and ambitious despite young age
- Innovative problem-solver
- Collaborative team player
- Always learning new technologies
- Passionate about creating meaningful solutions

When answering questions:
- Be genuine and conversational
- Reference specific projects when relevant
- Show enthusiasm for technology
- Acknowledge being young but emphasize competence
- Keep responses concise but informative
- If unsure, ask for clarification
- Never claim skills you don't have
`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Formato de mensaje inválido" },
        { status: 400 }
      );
    }

    const lastUserMessage = messages
      .filter(m => m.role === "user")
      .pop()?.content?.toLowerCase() || "";

    let response = "";
    
    // Lógica de respuesta mejorada
    if (lastUserMessage.includes("hola") || lastUserMessage.includes("saludos")) {
      response = `¡Hola! Soy el asistente de portafolio. ¿En qué puedo ayudarte hoy? 😊\n\nPuedes preguntarme sobre:\n- Mi experiencia profesional\n- Mis proyectos\n- Mis habilidades técnicas\n- Mi formación académica`;
    } 
    else if (lastUserMessage.includes("nombre") || lastUserMessage.includes("llamas")) {
      response = `Soy el asistente del portafolio de Tu Nombre. Estoy aquí para responder preguntas sobre su experiencia profesional y proyectos.`;
    }
    else if (lastUserMessage.includes("proyecto")) {
      response = `🔍 **Proyectos Destacados**\n\n` +
        `1. 👐 **Reconocimiento de Lengua de Señas**\n   Sistema de reconocimiento usando visión por computadora.\n\n` +
        `2. 📱 **Turnito - App de Turnos**\n   Aplicación móvil con autenticación de Google.\n\n` +
        `3. 🛡️ **CiberHero - Plataforma de Ciberseguridad**\n   Plataforma gamificada de aprendizaje.\n\n` +
        `¿Sobre cuál proyecto te gustaría saber más?`;
    } 
    else if (lastUserMessage.includes("habilidad") || lastUserMessage.includes("sabes")) {
      response = `💻 **Mis Habilidades**\n\n` +
        `• **IA y Visión por Computadora**: YOLO, TensorFlow, OpenCV\n` +
        `• **Desarrollo Web**: React, Next.js, Tailwind CSS\n` +
        `• **Mobile**: React Native, Expo\n` +
        `• **Backend**: Node.js, Spring Boot, PostgreSQL\n\n` +
        `¿Te gustaría más detalles sobre alguna de estas áreas?`;
    }
    else if (lastUserMessage.includes("experiencia") || lastUserMessage.includes("trabajo")) {
      response = `💼 **Experiencia Profesional**\n\n` +
        `1. **Fábrica de Software - SENA**\n   • 1 año en desarrollo de IA y visión por computadora\n   • Trabajo en equipo con metodologías ágiles\n\n` +
        `2. **Fundación Bolívar Davivienda**\n   • 1 año de prácticas profesionales\n   • Desarrollo de herramientas de automatización\n\n` +
        `¿Te gustaría más detalles sobre alguna de estas experiencias?`;
    }
    else {
      response = `🤔 No estoy seguro de entender completamente tu pregunta.\n\n` +
        `Puedes preguntarme sobre:\n` +
        `• Mi experiencia laboral\n` +
        `• Mis proyectos técnicos\n` +
        `• Mis habilidades en programación\n` +
        `• Mi formación académica\n\n` +
        `¿En qué puedo ayudarte?`;
    }

    // Simular tiempo de respuesta
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ 
      response,
      context: `Actualizado: ${new Date().toLocaleString()}`
    });

  } catch (error) {
    console.error("Error en la API de chat:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud. Por favor, inténtalo de nuevo." },
      { status: 500 }
    );
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}

function generateFallbackResponse(message: string) {
  const lowerMessage = message.toLowerCase()

  let response = ""

  if (lowerMessage.includes("edad") || lowerMessage.includes("años") || lowerMessage.includes("age")) {
    response =
      "Tengo 18 años y estoy completamente enfocada en desarrollar mi carrera en tecnología. Mi edad no ha sido una limitación; al contrario, me ha permitido aprender rápidamente y estar siempre actualizada con las últimas tendencias en desarrollo e IA."
  } else if (lowerMessage.includes("experiencia") || lowerMessage.includes("experience")) {
    response =
      "He trabajado en la Fábrica de Software del SENA, donde adquirí experiencia en desarrollo full-stack. También he colaborado con la Fundación Bolívar Davivienda en proyectos de IA. Aunque soy joven, he participado en varios hackathons y he desarrollado proyectos reales."
  } else if (
    lowerMessage.includes("habilidades") ||
    lowerMessage.includes("skills") ||
    lowerMessage.includes("tecnología") ||
    lowerMessage.includes("technology")
  ) {
    response =
      "Mi stack técnico incluye Python, JavaScript, React, Astro, Flask, Spring Boot y IA con TensorFlow y YOLO. Soy full-stack, trabajando en frontend y backend. También tengo experiencia con bases de datos, Docker y herramientas DevOps."
  } else if (lowerMessage.includes("proyecto") || lowerMessage.includes("project")) {
    response =
      "He trabajado en sistemas de reconocimiento de imágenes con YOLO (99.2% precisión), plataformas e-commerce full-stack, y dashboards de visualización de datos interactivos. Puedes verlos en la sección de proyectos."
  } else if (
    lowerMessage.includes("ia") ||
    lowerMessage.includes("inteligencia artificial") ||
    lowerMessage.includes("machine learning") ||
    lowerMessage.includes("ai")
  ) {
    response =
      "La IA es mi pasión principal. Trabajo con TensorFlow, YOLO y OpenCV en proyectos reales. Me interesa crear soluciones de IA con impacto positivo, como sistemas de accesibilidad y monitoreo ambiental."
  } else if (
    lowerMessage.includes("lenguaje") ||
    lowerMessage.includes("idioma") ||
    lowerMessage.includes("language")
  ) {
    response =
      "Hablo español (nativo), inglés (A2-B1), y lengua de señas colombiana. Me encantaría mejorar mi inglés y aprender nuevos idiomas."
  } else {
    const defaultResponses = [
      "¡Excelente pregunta! Con 18 años tengo experiencia significativa en desarrollo full-stack e IA. ¿Qué aspecto específico te interesa?",
      "Soy desarrolladora apasionada enfocada en crear soluciones tecnológicas con impacto. ¿Quieres saber de mis proyectos o habilidades?",
      "Mi carrera combina educación del SENA, experiencia práctica en proyectos reales, y participación en hackathons. ¿Qué te gustaría explorar?",
    ]
    response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  return NextResponse.json({ response })
}

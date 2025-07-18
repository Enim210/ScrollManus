/**
 * Extensión Scroll to Bottom para SillyTavern
 * Añade un botón flotante para desplazarse rápidamente al final del chat
 * Especialmente útil en dispositivos móviles cuando se pierde la posición al rotar la pantalla
 */

(function() {
    'use strict';
    
    // Configuración de la extensión
    const EXTENSION_NAME = 'scroll-to-bottom';
    const BUTTON_ID = 'scroll-to-bottom-btn';
    
    let scrollButton = null;
    let chatContainer = null;
    let isScrolling = false;
    
    /**
     * Inicializa la extensión
     */
    function init() {
        console.log('[Scroll to Bottom] Inicializando extensión...');
        
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupExtension);
        } else {
            setupExtension();
        }
    }
    
    /**
     * Configura la extensión después de que el DOM esté listo
     */
    function setupExtension() {
        // Buscar el contenedor del chat
        findChatContainer();
        
        // Crear el botón flotante
        createScrollButton();
        
        // Configurar eventos
        setupEventListeners();
        
        console.log('[Scroll to Bottom] Extensión configurada correctamente');
    }
    
    /**
     * Busca el contenedor principal del chat en SillyTavern
     */
    function findChatContainer() {
        // Intentar diferentes selectores comunes en SillyTavern
        const selectors = [
            '#chat',
            '.chat-container',
            '#sheld',
            '.mes_block',
            '#chat-container',
            '.chat-messages',
            '#messages'
        ];
        
        for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                chatContainer = element;
                console.log('[Scroll to Bottom] Contenedor del chat encontrado:', selector);
                break;
            }
        }
        
        // Si no se encuentra un contenedor específico, usar el body como fallback
        if (!chatContainer) {
            chatContainer = document.body;
            console.log('[Scroll to Bottom] Usando body como contenedor del chat');
        }
    }
    
    /**
     * Crea el botón flotante de scroll
     */
    function createScrollButton() {
        // Verificar si el botón ya existe
        if (document.getElementById(BUTTON_ID)) {
            return;
        }
        
        scrollButton = document.createElement('button');
        scrollButton.id = BUTTON_ID;
        scrollButton.title = 'Ir al final del chat';
        scrollButton.setAttribute('aria-label', 'Desplazarse al final del chat');
        
        // Añadir el botón al DOM
        document.body.appendChild(scrollButton);
        
        console.log('[Scroll to Bottom] Botón creado y añadido al DOM');
    }
    
    /**
     * Configura los event listeners
     */
    function setupEventListeners() {
        if (!scrollButton) return;
        
        // Evento click del botón
        scrollButton.addEventListener('click', scrollToBottom);
        
        // Detectar cambios de orientación en móviles
        window.addEventListener('orientationchange', handleOrientationChange);
        
        // Detectar redimensionamiento de ventana
        window.addEventListener('resize', handleResize);
        
        // Observar cambios en el chat para mostrar/ocultar el botón
        observeChatChanges();
    }
    
    /**
     * Función principal para desplazarse al final del chat
     */
    function scrollToBottom() {
        if (isScrolling) return;
        
        isScrolling = true;
        
        try {
            // Método 1: Intentar scroll suave en el contenedor del chat
            if (chatContainer && chatContainer !== document.body) {
                chatContainer.scrollTo({
                    top: chatContainer.scrollHeight,
                    behavior: 'smooth'
                });
            } else {
                // Método 2: Scroll en toda la página
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                });
            }
            
            // Método 3: Fallback para asegurar que llegue al final
            setTimeout(() => {
                if (chatContainer && chatContainer !== document.body) {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                } else {
                    window.scrollTo(0, document.documentElement.scrollHeight);
                }
                isScrolling = false;
            }, 500);
            
            console.log('[Scroll to Bottom] Desplazamiento ejecutado');
            
        } catch (error) {
            console.error('[Scroll to Bottom] Error al desplazarse:', error);
            isScrolling = false;
        }
    }
    
    /**
     * Maneja el cambio de orientación en dispositivos móviles
     */
    function handleOrientationChange() {
        console.log('[Scroll to Bottom] Cambio de orientación detectado');
        
        // Esperar un poco para que la interfaz se ajuste
        setTimeout(() => {
            // Reposicionar el botón si es necesario
            updateButtonPosition();
            
            // Opcional: Auto-scroll al final después del cambio de orientación
            // scrollToBottom();
        }, 300);
    }
    
    /**
     * Maneja el redimensionamiento de la ventana
     */
    function handleResize() {
        updateButtonPosition();
    }
    
    /**
     * Actualiza la posición del botón si es necesario
     */
    function updateButtonPosition() {
        if (!scrollButton) return;
        
        // El CSS ya maneja la posición responsive, pero podemos hacer ajustes adicionales aquí si es necesario
        console.log('[Scroll to Bottom] Posición del botón actualizada');
    }
    
    /**
     * Observa cambios en el chat para mostrar/ocultar el botón inteligentemente
     */
    function observeChatChanges() {
        // Crear un observer para detectar cuando se añaden nuevos mensajes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Se añadieron nuevos elementos (posiblemente mensajes)
                    updateButtonVisibility();
                }
            });
        });
        
        // Observar cambios en el contenedor del chat
        if (chatContainer) {
            observer.observe(chatContainer, {
                childList: true,
                subtree: true
            });
        }
    }
    
    /**
     * Actualiza la visibilidad del botón basándose en la posición del scroll
     */
    function updateButtonVisibility() {
        if (!scrollButton || !chatContainer) return;
        
        const isAtBottom = isScrolledToBottom();
        
        if (isAtBottom) {
            scrollButton.classList.add('hide');
            scrollButton.classList.remove('show');
        } else {
            scrollButton.classList.remove('hide');
            scrollButton.classList.add('show');
        }
    }
    
    /**
     * Verifica si el usuario está al final del chat
     */
    function isScrolledToBottom() {
        if (chatContainer === document.body) {
            return (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;
        } else {
            return chatContainer.scrollTop >= (chatContainer.scrollHeight - chatContainer.clientHeight - 100);
        }
    }
    
    /**
     * Función de limpieza para cuando se desactive la extensión
     */
    function cleanup() {
        if (scrollButton) {
            scrollButton.remove();
            scrollButton = null;
        }
        
        console.log('[Scroll to Bottom] Extensión limpiada');
    }
    
    // Exponer funciones globales para SillyTavern
    window.scrollToBottomExtension = {
        init: init,
        cleanup: cleanup,
        scrollToBottom: scrollToBottom
    };
    
    // Inicializar la extensión automáticamente
    init();
    
})();


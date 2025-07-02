# SillyTavern Scroll to Bottom Extension

Una extensión para SillyTavern que añade un botón flotante para desplazarse rápidamente al final del chat. Especialmente útil en dispositivos móviles cuando se pierde la posición del chat al rotar la pantalla.

## Características

- ✨ Botón flotante elegante y discreto
- 📱 Optimizado para dispositivos móviles
- 🔄 Detección automática de cambios de orientación
- 🎯 Scroll suave al final del chat
- 🎨 Diseño que se integra con SillyTavern
- ⚡ Ligero y eficiente

## Instalación

### Método 1: Instalación desde GitHub (Recomendado)

1. Abre SillyTavern
2. Ve a **Extensiones** (Extensions)
3. En la sección **Install Extension**, pega la siguiente URL:
   ```
   https://github.com/TU_USUARIO/sillytavern-scroll-to-bottom
   ```
4. Haz clic en **Install**
5. La extensión se instalará automáticamente

### Método 2: Instalación Manual

1. Descarga todos los archivos de esta extensión
2. Crea una carpeta llamada `scroll-to-bottom` en:
   - **Windows**: `SillyTavern/data/default-user/extensions/third-party/scroll-to-bottom/`
   - **Linux/Mac**: `SillyTavern/data/default-user/extensions/third-party/scroll-to-bottom/`
3. Coloca todos los archivos (`manifest.json`, `index.js`, `style.css`) en esa carpeta
4. Reinicia SillyTavern
5. Ve a **Extensiones** y activa "Scroll to Bottom"

## Uso

Una vez instalada y activada la extensión:

1. **Botón Flotante**: Aparecerá un botón circular flotante en la esquina inferior derecha
2. **Clic para Scroll**: Haz clic en el botón para desplazarte instantáneamente al final del chat
3. **Auto-detección**: El botón se oculta automáticamente cuando ya estás al final del chat
4. **Responsive**: Se adapta automáticamente a diferentes tamaños de pantalla

## Problemas Comunes

### El botón no aparece
- Verifica que la extensión esté activada en el panel de Extensiones
- Recarga la página de SillyTavern
- Revisa la consola del navegador (F12) para ver errores

### El scroll no funciona correctamente
- La extensión detecta automáticamente el contenedor del chat
- Si tienes problemas, reporta el issue con detalles de tu configuración

### Problemas en móviles
- Asegúrate de que estás usando una versión reciente de SillyTavern
- La extensión está optimizada para pantallas táctiles

## Desarrollo

### Estructura de Archivos

```
scroll-to-bottom/
├── manifest.json    # Configuración de la extensión
├── index.js        # Lógica principal
├── style.css       # Estilos del botón
└── README.md       # Este archivo
```

### Personalización

Puedes personalizar el estilo del botón editando `style.css`:

- **Posición**: Modifica `bottom` y `right` en `#scroll-to-bottom-btn`
- **Colores**: Cambia el `background` gradient
- **Tamaño**: Ajusta `width` y `height`
- **Animaciones**: Modifica las transiciones y keyframes

## Compatibilidad

- ✅ SillyTavern 1.10.0+
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles (Android, iOS)
- ✅ Tablets y pantallas táctiles

## Contribuir

¡Las contribuciones son bienvenidas! Si encuentras un bug o tienes una sugerencia:

1. Abre un Issue describiendo el problema o sugerencia
2. Fork el repositorio
3. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
4. Commit tus cambios (`git commit -am 'Añadir nueva característica'`)
5. Push a la rama (`git push origin feature/nueva-caracteristica`)
6. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Changelog

### v1.0.0
- Lanzamiento inicial
- Botón flotante para scroll al final
- Soporte para dispositivos móviles
- Detección de cambios de orientación
- Diseño responsive

---

**¿Te gusta esta extensión?** ⭐ Dale una estrella al repositorio y compártela con otros usuarios de SillyTavern!


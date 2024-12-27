export function initMouseGlow() {
    document.addEventListener('mousemove', (event) => {
      const { clientX, clientY } = event
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`)
    })
  }
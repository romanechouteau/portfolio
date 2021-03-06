import { gsap } from 'gsap'
import { Color } from 'three'

export const MAIN_BLUE = 0x7287FF
export const SECONDARY_BLUE = 0xBFC8FF
export const LIGHT_BLUE = 0xE8EBFF

export const MAIN_RED = 0xFF7286
export const SECONDARY_RED = 0xFFBFC8
export const LIGHT_RED = 0xFFE8EB

export const MAIN_YELLOW = 0xFFEB72
export const SECONDARY_YELLOW = 0xFFF6BF
export const LIGHT_YELLOW = 0xFFFBE5

export const MAIN_GREEN = 0x3AE983
export const SECONDARY_GREEN = 0xC3F8DA
export const LIGHT_GREEN = 0xE8FCF1

export const INDEX_BLOBS_DATA = [
  [
    {
      scale: [4, 2, 0.5],
      color1: new Color(MAIN_BLUE),
      color2: new Color(SECONDARY_BLUE),
      position: [3, -1, -2]
    },
    {
      scale: [3, 2, 0.5],
      color1: new Color(MAIN_RED),
      color2: new Color(SECONDARY_RED),
      position: [-4, 1, -2]
    },
    {
      scale: [1.3, 1, 0.5],
      color1: new Color(MAIN_YELLOW),
      color2: new Color(SECONDARY_YELLOW),
      position: [5.5, 1, -1]
    },
    {
      scale: [2.2, 1.5, 0.5],
      color1: new Color(MAIN_YELLOW),
      color2: new Color(SECONDARY_YELLOW),
      position: [-2, -2, -1]
    },
    {
      scale: [2, 1.1, 0.5],
      color1: new Color(MAIN_GREEN),
      color2: new Color(SECONDARY_GREEN),
      position: [2, 1.5, -1.5]
    },
    {
      scale: [1, 0.8, 0.5],
      color1: new Color(MAIN_BLUE),
      color2: new Color(SECONDARY_BLUE),
      position: [-0.5, 1.8, 0.5]
    }
  ],
  [
    {
      scale: [2, 3, 0.5],
      position: [5, -1, -2],
      color1: new Color(MAIN_BLUE),
      color2: new Color(SECONDARY_BLUE)
    },
    {
      scale: [3, 1.5, 0.5],
      position: [0, 0, -2],
      color1: new Color(MAIN_RED),
      color2: new Color(SECONDARY_RED)
    },
    {
      scale: [1.4, 1.4, 0.5],
      position: [3, -2, -1],
      color1: new Color(MAIN_YELLOW),
      color2: new Color(SECONDARY_YELLOW)
    },
    {
      scale: [2.2, 1.5, 0.5],
      position: [2, 2, -1],
      color1: new Color(MAIN_YELLOW),
      color2: new Color(SECONDARY_YELLOW)
    },
    {
      scale: [2, 2, 0.5],
      position: [-4, 1, -1.5],
      color1: new Color(MAIN_GREEN),
      color2: new Color(SECONDARY_GREEN)
    },
    {
      scale: [2, 1.5, 0.5],
      position: [-2, -2, 0.5],
      color1: new Color(MAIN_BLUE),
      color2: new Color(SECONDARY_BLUE)
    }
  ],
  [
    {
      scale: [2.5, 1.5, 0.5],
      position: [-3, -3, -2],
      color1: new Color(MAIN_BLUE),
      color2: new Color(SECONDARY_BLUE)
    },
    {
      scale: [2, 2, 0.5],
      position: [3, -2, -2],
      color1: new Color(MAIN_RED),
      color2: new Color(SECONDARY_RED)
    },
    {
      scale: [1.2, 2, 0.5],
      position: [3, 1, 0],
      color1: new Color(MAIN_YELLOW),
      color2: new Color(SECONDARY_YELLOW)
    },
    {
      scale: [1.3, 1.3, 0.5],
      position: [-2, 2, -1],
      color1: new Color(MAIN_YELLOW),
      color2: new Color(SECONDARY_YELLOW)
    },
    {
      scale: [2.5, 2, 0.5],
      position: [-4, 0, -1.5],
      color1: new Color(MAIN_GREEN),
      color2: new Color(SECONDARY_GREEN)
    },
    {
      scale: [1, 1, 0.5],
      position: [1, 2, 0.5],
      color1: new Color(MAIN_BLUE),
      color2: new Color(SECONDARY_BLUE)
    }
  ],
  [
    {
      scale: [1.5, 1.5, 0.5],
      position: [3, 2, -2],
      color1: new Color(MAIN_BLUE),
      color2: new Color(SECONDARY_BLUE)
    },
    {
      scale: [3, 2, 0.5],
      position: [-3, -2, -2],
      color1: new Color(MAIN_RED),
      color2: new Color(SECONDARY_RED)
    },
    {
      scale: [1.2, 1.5, 0.5],
      position: [4, 0, 0],
      color1: new Color(MAIN_YELLOW),
      color2: new Color(SECONDARY_YELLOW)
    },
    {
      scale: [0.8, 0.8, 0.5],
      position: [-3, 1, -1],
      color1: new Color(MAIN_YELLOW),
      color2: new Color(SECONDARY_YELLOW)
    },
    {
      scale: [2, 1, 0.5],
      position: [3, -2, 0.5],
      color1: new Color(MAIN_GREEN),
      color2: new Color(SECONDARY_GREEN)
    },
    {
      scale: [2, 1, 0.5],
      position: [-3, 2, 0.5],
      color1: new Color(MAIN_BLUE),
      color2: new Color(SECONDARY_BLUE)
    }
  ],
  [
    {
      scale: [2, 1.5, 0.5],
      position: [-2, -2, 0.5],
      color1: new Color(MAIN_BLUE),
      color2: new Color(SECONDARY_BLUE)
    },
    {
      scale: [1, 2, 0.5],
      position: [3.5, 0, -0.5],
      color1: new Color(MAIN_RED),
      color2: new Color(SECONDARY_RED)
    },
    {
      scale: [1, 1.5, 0.5],
      position: [-2.5, 2, -1],
      color1: new Color(MAIN_YELLOW),
      color2: new Color(SECONDARY_YELLOW)
    },
    {
      scale: [1.5, 1, 0.5],
      position: [2, -2, -1],
      color1: new Color(MAIN_YELLOW),
      color2: new Color(SECONDARY_YELLOW)
    },
    {
      scale: [1.5, 1.5, 0.5],
      position: [3, 2, -1],
      color1: new Color(MAIN_GREEN),
      color2: new Color(SECONDARY_GREEN)
    },
    {
      scale: [1, 1, 0.5],
      position: [-3.5, 1, 0.5],
      color1: new Color(MAIN_BLUE),
      color2: new Color(SECONDARY_BLUE)
    }
  ]
]

export const IMAGE_PROJECT_SETUP_SCALE = 1.4

export const APPEAR_FROM_BOTTOM_TRANSITION = {
  mode: '',
  appear: true,
  css: false,
  enter (el, done) {
    gsap.fromTo(el.children,
      {
        translateY: '3rem',
        opacity: 0
      },
      {
        delay: 0.5,
        duration: 0.6,
        translateY: '0',
        opacity: 1,
        stagger: 0.2,
        onComplete: done
      })
  },
  leave (el, done) {
    gsap.to(el.children, {
      duration: 0.3,
      translateY: '3rem',
      opacity: 0,
      stagger: 0.1,
      onComplete: done
    })
  }
}

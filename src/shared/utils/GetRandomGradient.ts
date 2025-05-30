export function getRandomGradient() {
  const gradients = [
    'from-blue-400 to-blue-600',
    'from-blue-500 to-indigo-600',
    'from-indigo-400 to-purple-500',
    'from-blue-400 to-purple-400',
    'from-indigo-500 to-purple-600',
  ]
  return gradients[Math.floor(Math.random() * gradients.length)]
} 
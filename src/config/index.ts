interface Config {
  api: {
    baseUrl: string
    timeout: number
  }
  app: {
    name: string
    version: string
  }
}

const config: Config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    timeout: 5000,
  },
  app: {
    name: 'SSGWOO',
    version: '1.0.0',
  },
}

export default config 
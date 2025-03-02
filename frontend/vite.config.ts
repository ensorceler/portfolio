import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    server:{
        allowedHosts:[
            "v9tq6x-ip-117-98-216-186.tunnelmole.net",
            "809xdh-ip-117-98-216-186.tunnelmole.net",
            "ymuurc-ip-122-183-162-111.tunnelmole.net",
            "qnkoaa-ip-139-167-211-131.tunnelmole.net"
        ]
    },
    plugins: [
        react(),
        tailwindcss()
    ],
})

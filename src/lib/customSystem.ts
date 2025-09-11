import {
    createSystem,
    defaultConfig,
    defineConfig,
} from "@chakra-ui/react"

const config = defineConfig({
    preflight: false,
})

export const customSystem = createSystem(defaultConfig, config)
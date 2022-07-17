import {fileURLToPath, URL} from "url";
import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src/components", import.meta.url)),
		},
	},
	server: {
		host: true,
		port: 9090,
	},
	build: {
		lib: {
			entry: resolve(__dirname, "src", "entry.ts"),
			name: "vue3ui",
			formats: ["iife", "es", "umd", "cjs"],
			fileName: (format) => `vue3-ui.${format}.js`,
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ["vue"],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: "Vue",
				},
			},
		},
	},
});

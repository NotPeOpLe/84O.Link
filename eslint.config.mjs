// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt().overrideRules({
  // Your custom configs here
  "vue/max-attributes-per-line": ["warn", { singleline: 5 }],
  "vue/singleline-html-element-content-newline": "off",
  "@stylistic/operator-linebreak": "off",
  "@stylistic/indent-binary-ops": "off",
})

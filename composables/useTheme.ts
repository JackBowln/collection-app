export default () => {
  const colorMode = useColorMode()
  const setTheme = () => {
    colorMode.preference = colorMode.preference === "dark" ? "light" : "dark"
  }
  return {
    colorMode,
    setTheme
  }
}

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import React, { Component } from "react"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Problems from "./components/Problems"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#d32f2f"
    },
    secondary: {
      main: "#039be5"
    }
  }
})

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />

      <Header />

      <main>
        <Hero />
        <Problems min={1} max={10} operators={["+"]} total={10} />
      </main>

      <Footer />
    </MuiThemeProvider>
  )
}

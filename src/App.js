import {Route, Redirect, Switch} from 'react-router-dom'
import {Component} from 'react'
import ThemeContext from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import NotFound from './components/NotFound'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import './App.css'

class App extends Component {
  state = {
    activeTheme: 'light',
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      activeTheme: prevState.activeTheme === 'light' ? 'dark' : 'light',
    }))
  }

  render() {
    const {activeTheme} = this.state
    return (
      <ThemeContext.Provider
        value={{
          activeTheme,
          toggleTheme: this.toggleTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          {/* <ProtectedRoute exact path="/gaming" component={Gaming} /> */}
          {/* <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} /> */}
          {/* <ProtectedRoute exact path="/trending" component={Trending} /> */}
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App

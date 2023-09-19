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
    savedVideosList: [],
  }

  updateSavedVideosList = videoItemDetails => {
    const {savedVideosList} = this.state
    const index = savedVideosList.findIndex(each => each === videoItemDetails)
    if (index === -1) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, videoItemDetails],
      }))
    } else {
      //   const filteredList = savedVideosList.filter(
      //     each => each !== videoItemDetails,
      //   )
      this.setState(prevState => ({
        savedVideosList: prevState.savedVideosList.map(each => {
          if (each !== videoItemDetails) {
            return each
          }
          return null
        }),
      }))
    }
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      activeTheme: prevState.activeTheme === 'light' ? 'dark' : 'light',
    }))
  }

  render() {
    const {activeTheme, savedVideosList} = this.state
    return (
      <ThemeContext.Provider
        value={{
          activeTheme,
          savedVideosList,
          toggleTheme: this.toggleTheme,
          updateSavedVideosList: this.updateSavedVideosList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          {/* <ProtectedRoute exact path="/gaming" component={Gaming} /> */}
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App

import React from 'react';
import {
    Switch,
    Route, BrowserRouter,
} from "react-router-dom";
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import {ProjectList, ProjectDetail} from './components/Project.js'
import ToDoList from './components/ToDo.js'
import axios from 'axios'


const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'Users', href: '/'},
                {name: 'Projects', href: '/projects'},
                {name: 'TODOs', href: '/todos'},
            ],
            users: [],
            projects: [],
            project: {},
            todos: []
        }
    }

    getProject(id) {
        axios.get(get_url(`project/${id}`))
            .then(response => {
                console.log(response.data)
                this.setState({project: response.data})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        axios.get(get_url('usersapp/'))
            .then(response => {
                this.setState({users: response.data.results})
            }).catch(error => console.log(error))


        axios.get(get_url('project/'))
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error))

        axios.get(get_url('todo/'))
            .then(response => {
                this.setState({todos: response.data.results})
            }).catch(error => console.log(error))
    }


    render() {
        return (
            <BrowserRouter>
                <header>
                    <Navbar navbarItems={this.state.navbarItems}/>
                </header>
                <main role="main">
                    <div>
                        <Switch>
                            <Route exact path='/'>
                                <UserList users={this.state.users}/>
                            </Route>
                            <Route exact path='/projects'>
                                <ProjectList items={this.state.projects}/>
                            </Route>
                            <Route exact path='/todos'>
                                <ToDoList items={this.state.todos}/>
                            </Route>
                            <Route path="/projects/:id"
                                   children={<ProjectDetail getProject={(id) => this.getProject(id)}
                                                            item={this.state.project}/>}/>
                        </Switch>
                    </div>
                </main>
                <Footer/>
            </BrowserRouter>
        )
    }
}


export default App;
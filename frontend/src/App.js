
import React, {Component} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Footer from './components/Footer.js';
import Navbar from './components/Menu.js';
import UserList from './components/User.js';
import {ProjectList, ProjectDetail} from './components/Project.js';
import ToDoList from './components/ToDo.js';
import axios from 'axios';


const DOMAIN = 'http://127.0.0.1:8000/api/'
const get_url = (url) => `${DOMAIN}${url}`


class App extends Component {
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
        axios.get(get_url(`project/${id}/`))
            .then(response => {
                console.log('response.data')
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
            <div>
                <BrowserRouter>
                    <Navbar navbarItems={this.state.navbarItems}/>
                    <Routes>
                        <Route path='/' element={<UserList users={this.state.users}/>}/>
                        <Route path='/projects' element={<ProjectList items={this.state.projects}/>}/>
                        <Route path='/todos' element={<ToDoList items={this.state.todos}/>}/>
                        <Route path="/project/:id" element={<ProjectDetail getProject={(id) => this.getProject(id)}
                                                                           item={this.state.project}/>}/>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </Router>


        )
    }
}


export default App;
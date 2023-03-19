import { Posts } from "./Posts";
import { Post } from "./Post";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const App = () => {

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <Posts/>
                    </Route>
                    <Route path="/:item">
                        <Post/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};



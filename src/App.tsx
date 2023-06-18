import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import workflowRoutes from './routes/workflowRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './services/i18n/i18n';
import './assets/style/style.scss';
import './assets/fonts/open-sans.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const finalRoutes = [...workflowRoutes];
const App = (): React.ReactElement => {
    return (
        <div className="workflow-content">
            <Router>
                <>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            {finalRoutes.map((route, index) => (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    component={route.component}
                                    exact={route.exact}
                                />
                            ))}
                        </Switch>
                    </React.Suspense>
                </>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                closeOnClick={true}
            />
        </div>
    );
};

export default App;

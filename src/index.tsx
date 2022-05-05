import reportWebVitals from './reportWebVitals';
import "./index.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Application } from './Application';
import { BodyWidget } from './components/BodyWidget';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const app = new Application();
root.render(
	<BodyWidget app={app} />
);

reportWebVitals();



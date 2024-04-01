import './App.css';
import { Heading } from './components/Heading';
import { Description } from './components/Description';
import { ChatInputForm } from './components/ChatInputForm';
import GetAllIds from './components/GetAllIds';

function App() {
	return (
		<main>
			<article className="l-design-width">
				<Heading />
				<Description />
				<ChatInputForm />
				<GetAllIds />
			</article>
		</main>
	);
}


export default App;

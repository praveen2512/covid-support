import logo from './logo.svg';
import './App.css';
import {wrapper,Title, CalendarContainer} from './Components/StyledComponent/wrapper'
import Home from './Components/CoreComponent/Home'
import Home1 from './Components/CoreComponent/Home1'

function App() {
  return (
  <div style={{overflow: 'hidden'}}>
   {/* <wrapper>
   <CalendarContainer>hello</CalendarContainer>
     <Title> Success Styled Components </Title>

   </wrapper> */}
{/* <Home/> */}
<Home1/>
  </div>
   
  );
}

export default App;

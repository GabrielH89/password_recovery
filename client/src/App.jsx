import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Home from './components/Home';
import RecoveryPasswd from './components/RecoveryPasswd';
import RedefinePasswd from './components/RedefinePasswd';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Cadastro/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/recovery-passwd' element={<RecoveryPasswd/>}></Route>
          <Route path='/recovery-password/redefinir' element={<RedefinePasswd/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import './styles/app.scss';

function App() {
  const [closeModal, setCloseModal] = useState(false);
  return (
    <BrowserRouter>
      <div className="app_wrapper">
          <Header />
          <Content setCloseModal={setCloseModal}/>
      </div>
      <Modal closeModal={closeModal} setCloseModal={setCloseModal}/>
    </BrowserRouter>
  );
}

export default App;

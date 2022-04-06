import { Routes, Route } from 'react-router-dom';
import { fetchTables } from './redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import Home from './components/pages/Home/Home'
import Table from './components/pages/Table/Table';
import NotFound from './components/pages/NotFound/NotFound';

const App = () => {
  const dispatch = useDispatch();

  const [pending, setPending] = useState(true)

  useEffect(() => dispatch(fetchTables(setPending)), [dispatch])
  
  return (
    <Container>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home pending={pending} />} />
        <Route exact path='/table/:id' element={<Table pending={pending} />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  )
}

export default App;

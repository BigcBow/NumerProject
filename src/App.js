import './App.css';
import React, {useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {BrowserRouter, NavLink, Routes, Route} from 'react-router-dom';
import Graphical from './components/Graphical';
import Taylor from './components/Taylor';
import Newton_Rap from './components/Newton_Rap';
import Error from './components/Error';
import Home from './components/Home';
import Bisection from './components/Bisection';
import False from './components/False';
import Cramer from './components/Cramer';
import Regress from './components/Regress';


function App() {
  return (
    
    <div className='App'>
      <BrowserRouter>
        <Navbar>
          <li className='nav-item'>
            <a href='/' className='icon-button'>Home</a>
          </li>
          <NavItem icon="Root Of Equatuins">
            <DropdownMenu></DropdownMenu>
          </NavItem>
          <NavItem icon="Solution Techniques">
            <DropdownMenu2></DropdownMenu2>
          </NavItem>
          <NavItem icon="Interpolation And Extropolation">
            <DropdownMenu3></DropdownMenu3>
          </NavItem>
        </Navbar>
        <h1>ใส่จิตวิญญาณณณณณณ</h1>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Graphical' element={<Graphical/>}/>
          <Route path='/Taylor' element={<Taylor/>}/>
          <Route path='/Newton_Rap' element={<Newton_Rap/>}/>
          <Route path='/Bisection' element={<Bisection/>}/>
          <Route path='/False' element={<False/>}/>
          <Route path='/Cramer' element={<Cramer/>}/>
          <Route path='/Regress' element={<Regress/>}/>
          <Route path='/*' element={<Error/>}></Route>
        </Routes>

      </BrowserRouter>
    
    </div>
  );
}

function Navbar(props){
  return(
    <nav className="navbar">
      <ul className="navbar-nav"> {props.children} </ul>
    </nav>
  );
}

function NavItem(props){

  const [open, setOpen] = useState(false);

  return(
    <li className="nav-item">

      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu(){ 

  const [activeMenu, setActiveMenu] = useState('main'); //settings

  function DropdownItem(props){
    return(
      <a className='menu-item' onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}>
        <span className='icon-button2'>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }
  return(
    <div className='dropdown'>
      <CSSTransition 
        in={activeMenu === 'main'} 
        unmountOnExit 
        timeout={500}
        classNames="menu-primary"
      >
        <div className='menu'>
            <DropdownItem>
              <NavLink to="/Graphical">Graphical</NavLink>
            </DropdownItem>
            <DropdownItem gotoMenu="settings">Iteration</DropdownItem>
            <DropdownItem>
              <NavLink to="/Taylor">Taylor Series</NavLink>
            </DropdownItem>
            <DropdownItem>
              <NavLink to="/Newton_Rap">Newton Raphson</NavLink>
            </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition 
      in={activeMenu === 'settings'} 
      unmountOnExit 
      timeout={500}
      classNames="menu-secondary"
      >
        <div className='menu'>
          <DropdownItem leftIcon="<--" gotoMenu="main"></DropdownItem>
          <DropdownItem><NavLink to="/Bisection">Bisection</NavLink></DropdownItem>
          <DropdownItem><NavLink to="/False">False-Position</NavLink></DropdownItem>
          <DropdownItem>One-Point</DropdownItem>
          <DropdownItem>Secant</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
function DropdownMenu2(){ 

  const [activeMenu, setActiveMenu] = useState('main'); //settings

  function DropdownItem(props){
    return(
      <a href='#' className='menu-item' onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}>
        <span className='icon-button2'>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }
  return(
    <div className='dropdown'>
      <CSSTransition 
        in={activeMenu === 'main'} 
        unmountOnExit 
        timeout={500}
        classNames="menu-primary"
      >
        <div className='menu'>
          <DropdownItem><NavLink to="/Cramer">Cramer's Rule</NavLink></DropdownItem>
          <DropdownItem gotoMenu="settings">Gauss</DropdownItem>
          <DropdownItem >Matrix Inversion</DropdownItem>
          <DropdownItem >LU Decomposition</DropdownItem>
          <DropdownItem >Cholesky Decomposition</DropdownItem>
          <DropdownItem >Jacobi Iteration</DropdownItem>
          <DropdownItem >Conjugate Gradient</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition 
      in={activeMenu === 'settings'} 
      unmountOnExit 
      timeout={500}
      classNames="menu-secondary"
      >
        <div className='menu'>
          <DropdownItem leftIcon="<--" gotoMenu="main"></DropdownItem>
          <DropdownItem>Gauss Elimination</DropdownItem>
          <DropdownItem>Gauss Jordan</DropdownItem>
          <DropdownItem>Gauss Seidel</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
function DropdownMenu3(){ 

  const [activeMenu, setActiveMenu] = useState('main'); //settings

  function DropdownItem(props){
    return(
      <a href='#' className='menu-item' onClick={() => props.gotoMenu && setActiveMenu(props.gotoMenu)}>
        <span className='icon-button2'>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }
  return(
    <div className='dropdown'>
      <CSSTransition 
        in={activeMenu === 'main'} 
        unmountOnExit 
        timeout={500}
        classNames="menu-primary"
      >
        <div className='menu'>

          <DropdownItem gotoMenu="settings1">Newton's Divded-differrences</DropdownItem>
          <DropdownItem gotoMenu="settings2">Lagrange Polynomials</DropdownItem>
          <DropdownItem gotoMenu="settings3">Spline Interpolation</DropdownItem>
          <DropdownItem><NavLink to="/Regress">Linear Regression</NavLink></DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition 
      in={activeMenu === 'settings1'} 
      unmountOnExit 
      timeout={500}
      classNames="menu-secondary"
      >
        <div className='menu'>
          <DropdownItem leftIcon="<--" gotoMenu="main"></DropdownItem>
          <DropdownItem>Linear Interpolation</DropdownItem>
          <DropdownItem>Quadratic Interpolation</DropdownItem>
          <DropdownItem>Polynomial Interpolation</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition 
      in={activeMenu === 'settings2'} 
      unmountOnExit 
      timeout={500}
      classNames="menu-secondary"
      >
        <div className='menu'>
          <DropdownItem leftIcon="<--" gotoMenu="main"></DropdownItem>
          <DropdownItem>Linear Interpolation</DropdownItem>
          <DropdownItem>Quadratic Interpolation</DropdownItem>
          <DropdownItem>Polynomial Interpolation</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition 
      in={activeMenu === 'settings3'} 
      unmountOnExit 
      timeout={500}
      classNames="menu-secondary"
      >
        <div className='menu'>
          <DropdownItem leftIcon="<--" gotoMenu="main"></DropdownItem>
          <DropdownItem>Linear Interpolation</DropdownItem>
          <DropdownItem>Quadratic Interpolation</DropdownItem>
          <DropdownItem>Polynomial Interpolation</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;

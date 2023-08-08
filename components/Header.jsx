// "use client"
import React,{useState} from 'react'
import '../app/globals.css'
import RefineryData from './data.json'
import Link from 'next/link'

const Header = () => {
    

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Chasing Methane</a>
        </li>
      </ul>
      <form class="d-flex" target="_blank">
        <Link href='/faq'><button className="btn btn-outline-success"   type="submit">FAQ Page</button></Link>
        <Link href='/faq' target='_blank'>OpenIt</Link>
      </form>
    </div>
  </div>
</nav>
    )
}

export default Header


// import Link from 'next/link';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';

// function TextLinkExample() {
//   return (
//     <Navbar className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">Chasing Methane</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Navbar.Text>
//             <Link href="/faq">FAQ Page</Link>
//           </Navbar.Text>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default TextLinkExample;
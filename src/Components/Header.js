import React, { useState } from 'react';
import PropTypes from 'prop-types'

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';

import { Link } from 'react-router-dom';
import { useSignOut, useAuthUser } from 'react-auth-kit'

export default function Header({handleSearchEvent}) {
  const [showBasic, setShowBasic] = useState(false);
  const signOut = useSignOut()
  const auth = useAuthUser();
  const [query, setQuery] = useState('');

  // handleSearch("kylie");

  const submitSearch = (e) => {
    e.preventDefault();
    if(query != ''){
      handleSearchEvent(query);
      setQuery('');
    }


  }

  return (

    <MDBNavbar expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand>News Daily</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
            <Link to='/'> <MDBNavbarLink active aria-current='page'>
              Home
              </MDBNavbarLink></Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/'>Categories</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                {auth().name}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link>Settings</MDBDropdownItem>
                  <MDBDropdownItem link onClick={() => signOut()}>Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

          </MDBNavbarNav>

          <form className='d-flex input-group w-auto' onSubmit={submitSearch}>
            <input type='search' className='form-control' placeholder='Type query'
             aria-label='Search' onChange={(e) => setQuery(e.target.value)}                
            value={query} required />
            <button className='btn btn-success' color='success'>Search</button>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

  )
}


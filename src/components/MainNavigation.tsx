import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
    const [showHomeDropdown, setShowHomeDropdown] = useState<boolean>(false);

    const [showTodoDropdown, setShowTodoDropdown] = useState<boolean>(false);
  
    const [showDTOrdDropdown, setShowDTOrdDropdown] = useState<boolean>(false);
  
    const [showOrderLockDropdown, setShowOrderLockDropdown] = useState<boolean>(false);
  
  return (
            <nav className="navbar">
              <div className="dropdown">
                <button className="button" 
                    onClick={() => {  setShowHomeDropdown(!showHomeDropdown); 
                                    setShowTodoDropdown(false);  
                                    setShowOrderLockDropdown(false)}}>
                  Home
                </button>
                {showHomeDropdown && (
                  <div className="dropdown-content">
                     <NavLink to='/' className={({isActive}) => isActive ? 'dropdown-button active' : 'dropdown-button'} end>
                      Reception
                    </NavLink>

                    <NavLink to='/access' className={({isActive}) => isActive ? 'dropdown-button active' : 'dropdown-button'} end>
                    Access
                    </NavLink>

                    <NavLink to='/send-sats' className={({isActive}) => isActive ? 'dropdown-button active' : 'dropdown-button'} end>
                    Send Sats
                    </NavLink>

                  </div>
                )}
              </div>

              <div className="dropdown">
                <button className="button" 
                    onClick={() => {  setShowTodoDropdown(!showTodoDropdown); 
                                    setShowHomeDropdown(false);   
                                    setShowOrderLockDropdown(false)}}>
                  Smart Ord
                </button>
                {showTodoDropdown && (
                  <div className="dropdown-content">

                      <button className="dropdown-button" 
                          onClick={() => {setShowDTOrdDropdown(!showDTOrdDropdown);  
                            setShowOrderLockDropdown(false) }}>
                        1SatOrdinals
                      </button>
                      {showDTOrdDropdown && (
                        <div className="button">

                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto',  marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}}>
                            Create
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}}>
                            Reshape
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}}>
                            Transfer
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}}>
                            Melt
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}}>
                            Details
                          </button>


                        </div>
                      )}



                      <button className="dropdown-button" 
                          onClick={() => {setShowOrderLockDropdown(!showOrderLockDropdown);   
                          setShowDTOrdDropdown(false)}}>
                        Market OnChain
                      </button>
                      {showOrderLockDropdown && (
                        <div className="button">


                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}}>
                            Order Lock
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}}>
                            Cancel
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}}>
                            Buy
                          </button>
                          <button className="dropdown-button-right" style={{ border: '1px solid #fff', marginLeft: 'auto', marginRight: '0', 
                          fontSize: '12px',color: 'white', background: '#323a3c', width: '60%'}}>
                            Details
                          </button>

                        </div>
                      )}
                    
                  </div>
                )}
              </div>

            </nav>
  )
}

export default MainNavigation
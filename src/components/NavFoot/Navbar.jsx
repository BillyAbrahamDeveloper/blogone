'use client';

import Image from 'next/image';
import Link from 'next/link';
import classes from './Navbar.module.css';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const showDropdownHandler = () => setShowDropDown((prev) => true);
  const hideDropdownHandler = () => setShowDropDown((prev) => false);

  const loggedIn = true;
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.left}>
          <Link href='/'>
            Nexus<span className={classes.left_nova}>Nova</span>
          </Link>
        </h2>
        <ul>
          {loggedIn ? (
            <div>
              <Image
                onClick={showDropdownHandler}
                src={
                  'https://images.unsplash.com/photo-1714925298620-8103982a0c51?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                width={45}
                height={40}
              />

              {showDropDown && (
                <div className={classes.dropdown}>
                  <AiOutlineClose
                    className={classes.closeIcon}
                    onClick={hideDropdownHandler}
                  />
                  <button
                    className={classes.logout}
                    onClick={hideDropdownHandler}
                  >
                    Logout
                  </button>
                  <Link
                    className={classes.create}
                    onClick={hideDropdownHandler}
                    href='/'
                  >
                    Create
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div>
              <button className={classes.login}> Log In</button>
              <Link className={classes.login} href='/register'>
                Register
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

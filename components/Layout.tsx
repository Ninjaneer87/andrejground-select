import * as React from 'react';
import { useStorage } from '../hooks/useStorage';
import classes from './Layout.module.scss';

const logoUrl = 'https://andrejground.com/_next/static/media/AG.2b52003b.svg';
const logoDarkUrl = 'https://andrejground.com/_next/static/media/AG-dark.0d4ae089.svg';
const andrejgroundUrl = 'https://andrejground.com/';

const Layout = ({ children }: React.PropsWithChildren) => {
  const [dark, setDark] = useStorage('dark-mode', false);
  
  React.useEffect(() => {
    document.body.classList[dark ? 'add' : 'remove']('dark');
  }, [dark]);

  return (
    <React.Fragment>
      <header className='blur-in'>
        <div className={classes.container}>
          <a href={andrejgroundUrl} target='_blank' className={classes.logo}>
            <div className={classes['logo-img']}>
              <img src={dark ? logoDarkUrl : logoUrl} alt="AndrejGround logo" width={35} height={35} />
            </div>
            <div className={classes['logo-caption']}>
              <span className="color-primary">Andrej</span>Ground
            </div>
          </a>
          
          <button
            className={classes['dark-toggle']}
            onClick={() => setDark(prev => !prev)}
          >
            <span className={dark ? '' : classes.active}>Day</span>
            <span>|</span>
            <span className={dark ? classes.active : ''}>Night</span>
          </button>
        </div>
      </header>

      <main className='blur-in'>{children}</main>
    </React.Fragment>
  );
};

export default Layout;

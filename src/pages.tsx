import React, { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group';
import { useSnapshot } from 'valtio';
import Create from './pages/Create';
import Join from './pages/Join';
import { Results } from './pages/Result';
import { Voting } from './pages/Voting';
import { WaitingRoom } from './pages/WaitingRoom';
import Welcome from './pages/welcome'
import { actions, AppPage, state } from './state';

const routeConfig = {
    [AppPage.Welcome]: Welcome,
    [AppPage.Create]: Create,
    [AppPage.Join]: Join,
    [AppPage.WaitingRoom]: WaitingRoom,
    [AppPage.Voting]: Voting,
    [AppPage.Results]: Results,
  };
  
  const Pages: React.FC = () => {
    const currentState = useSnapshot(state);
    useEffect(() => {
        console.log("accord")
        if (currentState.user?.id &&  currentState.poll && !currentState.poll?.hasStarted) {
          actions.setPage(AppPage.WaitingRoom);
        }
        if (currentState.user?.id && currentState.poll?.hasStarted) {
            actions.setPage(AppPage.Voting);
          }
          if (currentState.user?.id && currentState.hasVoted) {
            actions.setPage(AppPage.Results);
          }  
      }, [currentState.user?.id, currentState.poll?.hasStarted, currentState.hasVoted,]);
    return (
      <>
        {Object.entries(routeConfig).map(([page, Component]) => (
          <CSSTransition
            key={page}
            in={page === currentState.currentPage}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            <div className="page mobile-height max-w-screen-sm mx-auto py-8 px-4 overflow-y-auto">
              <Component />
            </div>
          </CSSTransition>
        ))}
      </>
    );
  };
  
  export default Pages;
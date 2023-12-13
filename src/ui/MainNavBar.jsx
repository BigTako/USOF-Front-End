import { useRef, useState } from 'react';
import { Form as BsForm, Stack } from 'react-bootstrap';
import {
  BsBoxArrowInRight,
  BsBoxArrowRight,
  BsCardList,
  BsDoorOpen,
  BsMoon,
  BsPerson,
  BsSun,
  BsThreeDots,
} from 'react-icons/bs';
import styled from 'styled-components';
import Avatar from './Avatar';
import IconButton from './IconButton';
import { ModalMenu } from './ModalMenu';
import { DarkGreyPillButton, TransparentCircleButton } from './PillButtons';
import { DarkGreyPillContaier } from './PillContainers';
import SearchBar from './SearchBar';
import StyledNavBar from './StyledNavBar';
import StyledTooltipButton from './StyledTooltipButton';
import { Tooltip } from './Tooltip';

import { Link } from 'react-router-dom';
import { useDarkMode } from '../contexts/DarkModeContext';
import { usePostsSelector } from '../contexts/PostsSelectContext';
import AuthenticationForm from '../features/auth/AuthenticationForm';
import { useCurrentUser, useLogout } from '../features/auth/useAuth';
import FullPageSpinner from './FullPageSpinner';
import IconSwitcher from './IconSwitcher';
import TextTruncator from './TextTruncator';

function HeaderMenuTooltip({ target, loggedIn }) {
  const tooltipWindowStyles = {
    position: 'absolute',
    backgroundColor: 'var(--color-grey-0)',
    boxShadow: '0 0 10px 0 rgb(0, 0, 0, 0.3)',
    borderRadius: 'var(--general-border-radius)',
    marginTop: '1.2rem',
  };
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { logout } = useLogout();

  return (
    <div>
      <Tooltip.Open opens={`tooltip-header-menu`}>
        <TransparentCircleButton as="button" ref={target}>
          <h2>
            <BsThreeDots />
          </h2>
        </TransparentCircleButton>
      </Tooltip.Open>
      <Tooltip.Window
        name={`tooltip-header-menu`}
        target={target}
        placement="bottom"
        styles={tooltipWindowStyles}
      >
        <Stack>
          {loggedIn && (
            <StyledTooltipButton variant="" className="d-inline-flex d-xl-none">
              <Link to="/me">
                <IconButton
                  type={'horizontal'}
                  icon={<BsPerson />}
                  text={'Profile'}
                />
              </Link>
            </StyledTooltipButton>
          )}

          <StyledTooltipButton variant="">
            <IconButton
              type={'horizontal'}
              icon={isDarkMode ? <BsSun /> : <BsMoon />}
              text={isDarkMode ? 'Light theme' : 'Dark theme'}
              onClick={toggleDarkMode}
            />
          </StyledTooltipButton>
          {loggedIn ? (
            <StyledTooltipButton variant="">
              <IconButton
                // disabled={isLoading}
                onClick={logout}
                type={'horizontal'}
                icon={<BsBoxArrowRight />}
                text={'Log Out'}
              />
            </StyledTooltipButton>
          ) : (
            <StyledTooltipButton variant="">
              <ModalMenu.Open opens={`modal-login`}>
                <IconButton
                  type={'horizontal'}
                  icon={<BsBoxArrowInRight />}
                  text={'Log In / Sign Up'}
                />
              </ModalMenu.Open>
            </StyledTooltipButton>
          )}
        </Stack>
      </Tooltip.Window>
    </div>
  );
}

const StyledMainNavBar = styled(StyledNavBar)`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
`;

function MainNavBar() {
  const target = useRef(null);

  const {
    user: currentUser,
    isLoading: isLoadingCurrentUser,
    error: currentUserLoadingError,
  } = useCurrentUser();

  const { fields, setTitle } = usePostsSelector();

  const [searchedTitle, setSearchedTitle] = useState('');

  if (isLoadingCurrentUser) {
    return <FullPageSpinner />;
  } else if (currentUserLoadingError) {
    return <div>{currentUserLoadingError}</div>;
  }

  const { id, login, role, profilePicture } = currentUser || {};

  return (
    <StyledMainNavBar>
      <Link to={'/'} onClick={() => setTitle('')}>
        <Stack
          direction="horizontal"
          gap={2}
          className="align-items-center"
          style={{
            color: 'var(--color-grey-950)',
          }}
        >
          <h2>
            <BsDoorOpen />
          </h2>
          <h3
            className="d-none d-md-inline"
            style={{
              paddingTop: '0.2rem',
            }}
          >
            DOOR IS
          </h3>
        </Stack>
      </Link>

      <BsForm
        className="d-flex align-items-center"
        onSubmit={(e) => {
          e.preventDefault(), setTitle(searchedTitle);
        }}
      >
        <SearchBar
          onSearch={() => setTitle(searchedTitle)}
          value={searchedTitle}
          setValue={setSearchedTitle}
          title="Search"
        />
      </BsForm>
      <Stack
        direction="horizontal"
        gap={4}
        className="ms-auto"
        style={{
          color: 'var(--color-grey-950)',
        }}
      >
        {/* {isLoading && <Spinner />} */}
        {currentUser && (
          <Link to="/me">
            <Stack direction="horizontal" gap={4} className="d-none d-xl-flex">
              <DarkGreyPillContaier style={{ padding: '0.4rem 0.8rem' }}>
                {role === 'admin' ? (
                  <Link to="/admin">
                    <IconSwitcher
                      text={'admin panel'}
                      icon={<BsCardList />}
                      breakPoint="xxl"
                    />
                  </Link>
                ) : (
                  role
                )}
              </DarkGreyPillContaier>
              <h5>
                <TextTruncator maxLen={5}>{login}</TextTruncator>
              </h5>
              <Avatar src={profilePicture} />
            </Stack>
          </Link>
        )}
        {!currentUser && (
          <ModalMenu.Open opens={`modal-login`}>
            <DarkGreyPillButton
              as="button"
              className="d-none d-xl-block"
              style={{ padding: '0.8rem 2.4rem' }}
            >
              Log In
            </DarkGreyPillButton>
          </ModalMenu.Open>
        )}

        <HeaderMenuTooltip target={target} loggedIn={id} />
      </Stack>
      {!currentUser && (
        <ModalMenu.Window name="modal-login">
          <AuthenticationForm currentUser={currentUser} />
        </ModalMenu.Window>
      )}
    </StyledMainNavBar>
  );
}

export default MainNavBar;

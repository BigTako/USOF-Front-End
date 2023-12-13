import { Spinner, Stack } from 'react-bootstrap';
import DarkGreyHeadedContainer from './DarkGreyHeadedContainer';
import CircleBackground from './CircleBackground';
import { DarkGreyPillButton, SemiLightGreyPillButton } from './PillButtons';
import IconButton from './IconButton';
import { BsBarChart, BsClock } from 'react-icons/bs';
import Avatar from './Avatar';
import { DarkGreyPillContaier } from './PillContainers';
import { Link } from 'react-router-dom';
import { useUserRating } from '../features/users/useUsers';
import { formatNumber } from '../utils/utils';

function UserProfileSection({ user, isOwn }) {
  const { id, login, email, profilePicture, createdAt, fullName, role } =
    user || {};

  const { isLoading: isLoadingUserRating, data: userRating } =
    useUserRating(id);

  return (
    <DarkGreyHeadedContainer
      containerStyles={{
        marginBottom: 'var(--container-offset)',
      }}
    >
      <Stack
        gap={4}
        style={{
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CircleBackground
            width="10rem"
            height="10rem"
            style={{
              position: 'absolute',
              top: '-4rem',
            }}
          >
            <Avatar src={profilePicture} height="100%" width="100%" />
          </CircleBackground>
        </div>
        <Stack
          gap={3}
          style={{
            marginTop: '4rem',
          }}
        >
          <h3>
            <strong>{fullName}</strong>
          </h3>
          <h5>@{login}</h5>
          <h5>{email}</h5>
        </Stack>
        {isOwn && (
          <Link to="/me/update" style={{ justifyContent: 'center' }}>
            <SemiLightGreyPillButton as="button" style={{ margin: '1rem' }}>
              <h5>Change settings</h5>
            </SemiLightGreyPillButton>
          </Link>
        )}

        <Stack gap={3}>
          <IconButton
            type={'horizontal'}
            icon={<BsClock />}
            text={`With us since: ${new Date(createdAt).toLocaleDateString()}`}
          />
          <IconButton
            type={'horizontal'}
            icon={<BsBarChart />}
            text={
              isLoadingUserRating ? (
                <Spinner />
              ) : (
                `Rating: ${formatNumber(Number(userRating))}`
              )
            }
          />
        </Stack>
        <div
          style={{
            borderTop: '0.2rem solid var(--color-grey-500)',
            padding: '2rem 1rem 0rem 1rem',
          }}
        >
          {isOwn ? (
            <Link to="/posts/create">
              <DarkGreyPillButton as="button" style={{ width: '100%' }}>
                Create post
              </DarkGreyPillButton>
            </Link>
          ) : (
            <DarkGreyPillContaier>{role}</DarkGreyPillContaier>
          )}
        </div>
      </Stack>
    </DarkGreyHeadedContainer>
  );
}

export default UserProfileSection;

import { Col, Container, Row, Spinner, Stack } from 'react-bootstrap';
import { useCurrentUser } from '../features/auth/useAuth';
import UserForm from '../features/users/UserForm';
import {
  useDeleteCurrentUser,
  useUpdateCurrentUserInfo,
  useUpdateCurrentUserPassword,
} from '../features/users/useUsers';
import FullPageSpinner from '../ui/FullPageSpinner';
import PageSection from '../ui/PageSection';
import UserProfileSection from '../ui/UserProfileSection';
import UpdatePasswordForm from '../features/users/UpdatePasswordForm';
import { useState } from 'react';
import { DarkGreyPillButton, SemiLightGreyPillButton } from '../ui/PillButtons';

function UpdateUserInfoForm({ user }) {
  const { isUpdating: isUpdatingUserInfo, updateEntity: updateUserInfo } =
    useUpdateCurrentUserInfo();
  const {
    isUpdating: isUpdatingUserPassword,
    updateEntity: updateUserPassword,
  } = useUpdateCurrentUserPassword();
  const currentUser = { ...user };
  const { isDeleting: isDeletingCurrentUser, deleteCurrentUser } =
    useDeleteCurrentUser();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  return (
    <Stack>
      <UserForm
        user={currentUser}
        selectPicture={true}
        selectRole={user.role === 'admin'}
        label={'Update personal info'}
        onSubmit={(data) =>
          updateUserInfo({ newData: data, id: currentUser.id })
        }
        disabled={isUpdatingUserInfo}
      />
      <UpdatePasswordForm
        onSubmit={(data) =>
          updateUserPassword({ newData: data, id: currentUser.id })
        }
        disabled={isUpdatingUserPassword}
      />

      <div style={{ padding: '2rem' }}>
        <Stack
          direction="horizontal"
          style={{ justifyContent: 'space-between' }}
        >
          <h3>Delete account</h3>
          <DarkGreyPillButton
            as="button"
            onClick={() => setOpenConfirmDelete((v) => !v)}
          >
            delete
          </DarkGreyPillButton>
        </Stack>
      </div>

      {openConfirmDelete && (
        <div style={{ padding: '2rem' }}>
          <Stack
            direction="horizontal"
            style={{ justifyContent: 'space-between' }}
          >
            <h5>Are you sure you want to delete account?</h5>
            <SemiLightGreyPillButton as="button" onClick={deleteCurrentUser}>
              {isDeletingCurrentUser ? <Spinner /> : 'YES'}
            </SemiLightGreyPillButton>
          </Stack>
        </div>
      )}
    </Stack>
  );
}

function UpdateUserPage() {
  const { isLoading, user: currentUser } = useCurrentUser();

  if (isLoading) {
    return <FullPageSpinner />;
  }
  return (
    <Container
      style={{
        height: '100vh',
      }}
      fluid="xl"
    >
      <Row
        style={{
          margin: 'var(--page-layout-offset) 0',
        }}
      >
        <Col md={9}>
          <PageSection>
            <UpdateUserInfoForm user={currentUser} />
          </PageSection>
        </Col>
        {/* Sidebar */}
        <Col md={3} className="d-none d-md-block">
          <UserProfileSection user={currentUser} isOwn={true} />
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateUserPage;

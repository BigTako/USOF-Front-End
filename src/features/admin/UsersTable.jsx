import {
  BooleanView,
  EntityTable,
  FormModal,
  OpenModalFormButton,
} from './EntityTable';
import UserForm from '../users/UserForm';
import { useCreateUser, useDeleteUser, useUpdateUser } from '../users/useUsers';

const headers = [
  '',
  'Profile Picture',
  'Full Name',
  'Login',
  'Email',
  'Role',
  'Active',
  'Activated',
  'Created At',
  <OpenModalFormButton key={`create-user-open`} formName={'create-user'} />,
];

function UsersTable({ users }) {
  const { isCreating, createEntity: createUser } = useCreateUser();
  const { isDeleting, deleteEntity: deleteUser } = useDeleteUser();
  const { isUpdating, updateEntity: updateUser } = useUpdateUser();

  return (
    <>
      <FormModal name={`create-user`}>
        {/* <UserCreateForm /> */}
        <UserForm
          label={'Create user'}
          selectPicture={true}
          selectRole={true}
          onSubmit={createUser}
          disabled={isCreating}
        />
      </FormModal>
      <EntityTable
        entityName={'user'}
        entities={users}
        headers={headers}
        onDelete={deleteUser}
        render={(user) => {
          const {
            id,
            profilePicture,
            fullName,
            login,
            email,
            role,
            active,
            activated,
            createdAt,
          } = user || {};
          return (
            <>
              <div>
                <strong>{id}</strong>
              </div>
              <div>
                <img src={profilePicture} />
              </div>
              <div>{fullName}</div>
              <div>{login}</div>
              <div>{email}</div>
              <div>{role}</div>
              <div>
                <BooleanView value={active} />
              </div>
              <div>
                <BooleanView value={activated} />
              </div>
              <div>{new Date(createdAt).toLocaleString()}</div>
              <FormModal name={`edit-user-${id}`}>
                {/* <UserEditForm user={user} /> */}
                <UserForm
                  user={user}
                  selectPicture={true}
                  selectRole={true}
                  label={'Update user'}
                  onSubmit={(data) =>
                    updateUser({ newData: data, id: user.id })
                  }
                  disabled={isUpdating}
                />
              </FormModal>
            </>
          );
        }}
      />
    </>
  );
}

export default UsersTable;
